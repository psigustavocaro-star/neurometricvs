'use client'

import { useEffect, useState } from 'react'
import { BookOpen, ExternalLink, RefreshCw, ChevronRight, GitGraph, ClipboardCheck, LayoutGrid, Zap, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLocale, useTranslations, useFormatter } from 'next-intl'
import { es, enUS } from 'date-fns/locale'

interface Article {
    title: string
    description: string
    url: string
    source: { name: string }
    category?: string
    publishedAt: string
}

export function ResourcesSection() {
    const [displayArticles, setDisplayArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const locale = useLocale()
    const t = useTranslations('Dashboard.Toolbox')
    const formatIntl = useFormatter()

    const fetchNews = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/news?lang=${locale}`)
            const data = await res.json()
            if (data.articles) {
                setDisplayArticles(data.articles.slice(0, 5)) // Increased from 2 to 5
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

    return (
        <div className="bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300">
            {/* Toolbox Header */}
            <div className="p-5 border-b border-border/40 bg-muted/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground text-sm tracking-tight">{t('title') || 'Toolbox Clínica'}</h3>
                    </div>
                </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="p-4 grid grid-cols-1 gap-2.5">
                <Button variant="outline" className="w-full justify-start gap-3 h-11 bg-background hover:bg-muted/50 border-border/60 rounded-xl group px-3.5" asChild>
                    <Link href="/genogram">
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <GitGraph className="w-3.5 h-3.5" strokeWidth={2} />
                        </div>
                        <span className="text-[13px] font-bold text-foreground/80">{t('genogram') || 'Generar Genograma'}</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-30" />
                    </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start gap-3 h-11 bg-background hover:bg-muted/50 border-border/60 rounded-xl group px-3.5" asChild>
                    <Link href="/test-bank">
                        <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 group-hover:bg-teal-500/10 transition-colors">
                            <ClipboardCheck className="w-3.5 h-3.5" strokeWidth={2} />
                        </div>
                        <span className="text-[13px] font-bold text-foreground/80">{t('bank') || 'Banco de Tests'}</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-30" />
                    </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start gap-3 h-11 bg-background hover:bg-muted/50 border-border/60 rounded-xl group px-3.5" asChild>
                    <Link href="/clinical-apps">
                        <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 group-hover:bg-blue-500/10 transition-colors">
                            <LayoutGrid className="w-3.5 h-3.5" strokeWidth={2} />
                        </div>
                        <span className="text-[13px] font-bold text-foreground/80">{t('apps') || 'Clinical Apps'}</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-30" />
                    </Link>
                </Button>
            </div>

            {/* Minimalist Clinical News */}
            <div className="mt-2 border-t border-border/30 bg-muted/5 flex-1 min-h-[300px]">
                <div className="px-5 py-3 flex items-center justify-between sticky top-0 bg-muted/5 backdrop-blur-sm z-10">
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{t('news_title') || 'Actualidad Clínica'}</span>
                    <BookOpen className="w-3 h-3 text-muted-foreground/40" />
                </div>

                <div className="divide-y divide-border/20">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="p-4 space-y-2">
                                <div className="h-3 w-full bg-muted animate-pulse rounded" />
                                <div className="h-2 w-2/3 bg-muted animate-pulse rounded" />
                            </div>
                        ))
                    ) : (
                        displayArticles.map((article, i) => (
                            <Link
                                key={i}
                                href={article.url}
                                target="_blank"
                                className="flex flex-col gap-1.5 p-4 hover:bg-muted/30 transition-all group lg:last:pb-8"
                            >
                                <h4 className="text-xs font-bold text-foreground/90 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h4>
                                <p className="text-[10px] text-muted-foreground/70 line-clamp-1">
                                    {article.source.name} • {formatIntl.dateTime(new Date(article.publishedAt), { day: 'numeric', month: 'short' })}
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
