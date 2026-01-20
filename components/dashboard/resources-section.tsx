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

            {/* Enhanced Clinical News */}
            <div className="mt-4 border-t border-border/30 bg-gradient-to-b from-muted/20 to-transparent flex-1 flex flex-col min-h-[300px]">
                <div className="px-6 py-5 flex items-center gap-3 sticky top-0 backdrop-blur-sm z-10 border-b border-border/10">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                        <BookOpen className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h4 className="text-sm font-extrabold text-foreground tracking-tight uppercase">{t('news_title') || 'Actualidad Clínica'}</h4>
                        <p className="text-[10px] text-muted-foreground font-medium">Últimas actualizaciones científicas</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="p-5 mx-2 rounded-xl bg-muted/20 border border-border/20 space-y-3">
                                <div className="h-4 w-3/4 bg-muted/40 animate-pulse rounded-md" />
                                <div className="h-3 w-1/2 bg-muted/40 animate-pulse rounded-md" />
                            </div>
                        ))
                    ) : (
                        displayArticles.map((article, i) => (
                            <Link
                                key={i}
                                href={article.url}
                                target="_blank"
                                className="flex gap-4 p-4 mx-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-muted/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="shrink-0 mt-1">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                                        <Activity className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5 relative z-10">
                                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700">
                                            {article.source.name}
                                        </span>
                                        <span>•</span>
                                        <span>{formatIntl.dateTime(new Date(article.publishedAt), { day: 'numeric', month: 'short' })}</span>
                                    </div>
                                </div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                    <ExternalLink className="w-4 h-4 text-indigo-400" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
