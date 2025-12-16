'use client'

import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    source: { name: string };
    publishedAt: string;
}

export default function BlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (data.articles) {
                    setArticles(data.articles);
                }
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Blog Neurometrics</h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300">Últimas noticias sobre neurociencia, psicometría y salud mental.</p>
                        <p className="text-sm text-slate-400 mt-2">Actualizado diariamente desde fuentes globales.</p>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 bg-slate-100 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {articles.map((article, index) => (
                                <Link href={article.url} key={index} target="_blank" className="group">
                                    <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 flex flex-col overflow-hidden">
                                        <div className="h-48 bg-slate-100 w-full object-cover relative overflow-hidden">
                                            {article.urlToImage ? (
                                                <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 flex items-center justify-center text-slate-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <CardHeader>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-medium text-teal-600 truncate max-w-[70%]">{article.source.name}</span>
                                                <span className="text-xs text-slate-400">{new Date(article.publishedAt).toLocaleDateString()}</span>
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-teal-700 transition-colors line-clamp-2">{article.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3">
                                                {article.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
