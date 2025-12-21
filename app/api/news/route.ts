import { NextResponse } from 'next/server';

export async function GET() {
    // RSS Feeds: Psychology Today, ScienceDaily (Mind & Brain)
    const RSS_URL = 'https://www.sciencedaily.com/rss/mind_brain/psychology.xml';

    // Use rss2json to convert XML to JSON without external deps
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`, {
            next: { revalidate: 3600 }
        });
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
            const articles = data.items.slice(0, 5).map((item: any) => ({
                title: item.title,
                description: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...', // Strip HTML
                url: item.link,
                urlToImage: item.enclosure?.link,
                source: { name: "ScienceDaily" },
                publishedAt: item.pubDate
            }));

            return NextResponse.json({ articles });
        } else {
            throw new Error('Failed to fetch RSS');
        }
    } catch (error) {
        console.error('RSS Fetch Error:', error);
        // Fallback to mock if RSS fails
        return NextResponse.json({
            articles: [
                {
                    title: "Estudio: La plasticidad cerebral en adultos mayores",
                    description: "Nuevas investigaciones sugieren que el aprendizaje continuo promueve la neurogénesis.",
                    url: "#",
                    source: { name: "NeuroCiencia al Día" },
                    publishedAt: new Date().toISOString()
                },
                {
                    title: "Terapia Cognitivo Conductual y Ansiedad Social",
                    description: "Meta-análisis confirma la eficacia de la TCC online para el tratamiento de fobia social.",
                    url: "#",
                    source: { name: "Psicología Clínica" },
                    publishedAt: new Date().toISOString()
                }
            ]
        });
    }
}
