import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'es';

    // Different feeds based on language
    const FEEDS_CONFIG: Record<string, { name: string, url: string, category: string }[]> = {
        es: [
            { name: 'El País Salud', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/salud/portada', category: 'Salud Mental' },
            { name: 'ABC Salud', url: 'https://www.abc.es/rss/2.0/salud/', category: 'Salud' },
            { name: 'Mente y Cerebro', url: 'https://www.investigacionyciencia.es/rss/mente-y-cerebro.xml', category: 'Neurociencia' },
            { name: 'Psicología y Mente', url: 'https://psicologiaymente.com/rss.xml', category: 'Psicología' }
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
