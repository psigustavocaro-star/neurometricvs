import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.NEWS_API_KEY;

    // Mock data in case API key is missing or request fails
    const mockNews = [
        {
            title: "Advances in Brain-Computer Interfaces: A New Era",
            description: "Recent developments in BCI technology are enabling more precise communication for patients with motor disabilities.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
            source: { name: "NeuroScience Today" },
            publishedAt: new Date().toISOString()
        },
        {
            title: "The Role of Sleep in Memory Consolidation",
            description: "New study reveals the specific neural mechanisms active during REM sleep that solidify long-term memories.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&q=80",
            source: { name: "Mind & Brain" },
            publishedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
            title: "Dopamine and Decision Making: Beyond Reward",
            description: "Researchers find that dopamine levels influence risk assessment more than previously thought.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
            source: { name: "Cognitive Weekly" },
            publishedAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
            title: "Non-Invasive Brain Stimulation for Depression",
            description: "Clinical trials show promising results for new TMS protocols in treating treatment-resistant depression.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
            source: { name: "Mental Health Tech" },
            publishedAt: new Date(Date.now() - 259200000).toISOString()
        }
    ];

    if (!apiKey) {
        return NextResponse.json({ articles: mockNews });
    }

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=neuroscience OR neurology OR psychology&language=en&sortBy=publishedAt&pageSize=6&apiKey=${apiKey}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        const data = await response.json();

        if (data.status === 'ok' && data.articles.length > 0) {
            return NextResponse.json({ articles: data.articles });
        } else {
            return NextResponse.json({ articles: mockNews });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ articles: mockNews });
    }
}
