import { NextResponse } from 'next/server';

export async function GET() {
    // RSS Feeds: Psychology Today, ScienceDaily (Mind & Brain), El País (Salud/Psicología)
    const FEEDS = [
        { name: 'ScienceDaily', url: 'https://www.sciencedaily.com/rss/mind_brain/psychology.xml' },
        { name: 'Psychology Today', url: 'https://www.psychologytoday.com/intl/front/feed' },
        { name: 'El País Salud', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/salud/portada' }
    ];

    try {
        const allArticles = await Promise.all(FEEDS.map(async (feed) => {
            try {
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`, {
                    next: { revalidate: 3600 }
                });
                const data = await response.json();

                if (data.status === 'ok' && data.items) {
                    return data.items.map((item: any) => {
                        // Extract image from enclosure or description if needed
                        let imageUrl = item.enclosure?.link || item.thumbnail;

                        if (!imageUrl && item.description) {
                            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) imageUrl = imgMatch[1];
                        }

                        return {
                            title: item.title,
                            description: item.description?.replace(/<[^>]*>/g, '').substring(0, 150).trim() + '...',
                            url: item.link,
                            urlToImage: imageUrl,
                            source: { name: feed.name },
                            publishedAt: item.pubDate
                        };
                    });
                }
                return [];
            } catch (err) {
                console.error(`Failed to fetch ${feed.name}:`, err);
                return [];
            }
        }));

        // Flatten, sort by date, and take top 6
        const articles = allArticles
            .flat()
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, 6);

        return NextResponse.json({ articles });
    } catch (error) {
        console.error('RSS Fetch Error:', error);
        return NextResponse.json({ articles: [] }, { status: 500 });
    }
}
