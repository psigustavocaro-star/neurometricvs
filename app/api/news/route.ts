import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'es';

    // Different feeds based on language
    const FEEDS_CONFIG: Record<string, { name: string, url: string, category: string }[]> = {
        es: [
            { name: 'MedlinePlus Salud Mental', url: 'https://medlineplus.gov/feeds/topics/mentalhealthandbehavior.xml', category: 'Salud Mental' },
            { name: 'El País Salud', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/salud/portada', category: 'Salud' },
            { name: 'Investigación y Ciencia', url: 'https://www.investigacionyciencia.es/rss/mente-y-cerebro.xml', category: 'Neurociencia' },
            { name: 'Psiquiatria.com', url: 'https://psiquiatria.com/rss/', category: 'Psiquiatría' }
        ],
        en: [
            { name: 'Psychology Today', url: 'https://www.psychologytoday.com/intl/front/feed', category: 'Psychology' },
            { name: 'ScienceDaily', url: 'https://www.sciencedaily.com/rss/mind_brain/psychology.xml', category: 'Neuroscience' },
            { name: 'Scientific American', url: 'https://www.scientificamerican.com/section/mind-and-brain/?rss=1', category: 'Behavior' },
            { name: 'NIMH News', url: 'https://www.nimh.nih.gov/news/feeds/rss.xml', category: 'Research' }
        ]
    };

    const feeds = FEEDS_CONFIG[lang] || FEEDS_CONFIG.es;

    try {
        const allArticles = await Promise.all(feeds.map(async (feed) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            try {
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`, {
                    next: { revalidate: 3600 },
                    signal: controller.signal
                });
                const data = await response.json();

                if (data.status === 'ok' && data.items) {
                    return data.items.map((item: any) => {
                        // Extract image if available
                        let imageUrl = null;
                        if (item.enclosure && item.enclosure.link) {
                            imageUrl = item.enclosure.link;
                        } else if (item.thumbnail) {
                            imageUrl = item.thumbnail;
                        } else {
                            // Try to parse img from description if applicable
                            const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) imageUrl = imgMatch[1];
                        }

                        // Clean up description
                        let description = item.description || '';
                        description = description.replace(/<[^>]*>/g, '').trim();
                        if (description.length > 120) {
                            description = description.substring(0, 117) + '...';
                        }

                        return {
                            title: item.title,
                            description: description,
                            url: item.link,
                            imageUrl: imageUrl,
                            source: { name: feed.name },
                            category: feed.category,
                            publishedAt: item.pubDate
                        };
                    });
                }
                return [];
            } catch (err) {
                console.error(`Failed to fetch ${feed.name}:`, err);
                return [];
            } finally {
                clearTimeout(timeoutId);
            }
        }));

        const articles = allArticles
            .flat()
            .filter(article => article.title && article.url)
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, 20);

        return NextResponse.json({ articles });
    } catch (error) {
        console.error('RSS Fetch Error:', error);
        return NextResponse.json({ articles: [] }, { status: 500 });
    }
}
