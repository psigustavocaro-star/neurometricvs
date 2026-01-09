'use client'

import { useEffect, useState } from 'react'
import { BookOpen, ExternalLink, RefreshCw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { es, enUS } from "date-fns/locale"
import { useLocale, useTranslations } from 'next-intl'

interface Article {
    title: string
    description: string
    url: string
    source: { name: string }
    category?: string
    publishedAt: string
}

export function ResourcesSection() {
    const [fullPool, setFullPool] = useState<Article[]>([])
    const [displayArticles, setDisplayArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const locale = useLocale()
    const t = useTranslations('Dashboard')
    const dateLocale = locale === 'es' ? es : enUS

    const shuffleAndSet = (pool: Article[]) => {
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        setDisplayArticles(shuffled.slice(0, 5));
    };

    const fetchNews = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/news?lang=${locale}`)
            const data = await res.json()
            if (data.articles) {
                setFullPool(data.articles);
                shuffleAndSet(data.articles);
            }
        } catch (error) {
            console.error("Failed to fetch news", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [locale])

    if (loading) {
        return (
            <div className="bg-card rounded-3xl border border-border/40 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
                <div className="p-6 border-b border-border/40 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                            <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground tracking-tight text-sm">Recursos y Actualidad</h3>
                    </div>
                </div>
                <div className="p-0 overflow-hidden">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-5 border-b border-border/20 last:border-0 space-y-2">
                            <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-full bg-muted animate-pulse rounded" />
                            <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-card rounded-3xl border border-border/40 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300">
            <div className="p-6 border-b border-border/40 flex justify-between items-center bg-muted/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                        <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground tracking-tight text-sm">Recursos y Actualidad</h3>
                        <p className="text-[10px] text-muted-foreground/70 font-medium">Contenido profesional seleccionado</p>
                    </div>
                </div>
                <RefreshCw
                    className="w-4 h-4 text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => shuffleAndSet(fullPool)}
                />
            </div>

            <div className="p-0 flex-1">
                <div className="divide-y divide-border/20">
                    {displayArticles.map((article, i) => (
                        <Link
                            key={i}
                            href={article.url}
                            target="_blank"
                            className="flex flex-col gap-1 p-5 hover:bg-muted/30 transition-all duration-300 group relative last:border-0"
                        >
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[9px] font-bold tracking-wider text-primary uppercase bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                                    {article.category || article.source.name}
                                </span>
                                <span className="text-[9px] font-medium text-muted-foreground/60 whitespace-nowrap">
                                    {format(new Date(article.publishedAt), "d MMM", { locale: dateLocale })}
                                </span>
                            </div>
                            <h4 className="text-[13px] font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {article.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground/80 line-clamp-2 leading-relaxed">
                                {article.description}
                            </p>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                <ChevronRight className="w-4 h-4 text-primary" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-border/40 bg-muted/5">
                <Button variant="ghost" size="sm" className="w-full text-xs font-semibold h-9 text-muted-foreground hover:text-primary gap-2 transition-all rounded-xl" asChild>
                    <Link href="/dashboard/resources">
                        Explorar biblioteca
                        <ExternalLink className="w-3 h-3" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
