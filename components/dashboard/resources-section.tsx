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
                                className="flex gap-4 p-5 hover:bg-primary/5 transition-all duration-300 group relative border-b last:border-0 border-border/40"
                            >
                                <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-muted relative border border-border/40 shadow-sm group-hover:shadow-md transition-all">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={article.urlToImage || '/placeholder.png'}
                                        alt={article.source.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${article.source.name === 'ScienceDaily' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' :
                                            article.source.name === 'Psychology Today' ? 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' :
                                                'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                                            }`}>
                                            {article.source.name}
                                        </span>
                                        <span className="text-[10px] font-medium text-muted-foreground/60 flex items-center gap-1">
                                            <RefreshCw className="w-2.5 h-2.5 opacity-50" />
                                            {format(new Date(article.publishedAt), "d MMM", { locale: es })}
                                        </span>
                                    </div>
                                    <h4 className="text-[13px] font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
                                        {article.title}
                                    </h4>
                                    <p className="text-[11px] text-muted-foreground/80 line-clamp-2 leading-relaxed">
                                        {article.description}
                                    </p>
                                </div>
                                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                                </div>
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
