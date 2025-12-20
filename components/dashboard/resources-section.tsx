'use client'

import { useEffect, useState } from 'react'
import { BookOpen, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Article {
    title: string
    description: string
    url: string
    urlToImage: string
    source: { name: string }
    publishedAt: string
}

export function ResourcesSection() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news')
                const data = await res.json()
                if (data.articles) {
                    setArticles(data.articles.slice(0, 4)) // Limit to 4 items
                }
            } catch (error) {
                console.error("Failed to fetch news", error)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    return (
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-border/40">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">Recursos y Actualidad</h3>
                </div>
            </div>

            <div className="p-0 flex-1">
                {loading ? (
                    <div className="p-8 flex justify-center items-center text-muted-foreground gap-2 text-xs">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Cargando noticias...
                    </div>
                ) : (
                    <div className="divide-y divide-border/40">
                        {articles.map((article, i) => (
                            <Link
                                key={i}
                                href={article.url}
                                target="_blank"
                                className="flex gap-3 p-4 hover:bg-muted/30 transition-colors group"
                            >
                                <div className="h-16 w-16 md:h-12 md:w-12 shrink-0 rounded-lg overflow-hidden bg-muted relative border border-border/40">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={article.urlToImage || '/placeholder.png'}
                                        alt={article.source.name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80'
                                        }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                            {article.source.name}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">
                                            {format(new Date(article.publishedAt), "d MMM", { locale: es })}
                                        </span>
                                    </div>
                                    <h4 className="text-xs font-semibold text-foreground leading-snug line-clamp-2 md:line-clamp-1 group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h4>
                                    <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                        {article.description}
                                    </p>
                                </div>
                                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-border/40 bg-muted/5">
                <Button variant="ghost" size="sm" className="w-full text-xs font-medium h-8 text-muted-foreground" asChild>
                    <Link href="/dashboard/resources">
                        Ver biblioteca completa
                    </Link>
                </Button>
            </div>
        </div>
    )
}
