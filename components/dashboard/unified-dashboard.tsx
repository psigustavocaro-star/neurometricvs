'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, Activity, CalendarDays, Search, Clock, FileText, Plus, TrendingUp,
    ClipboardList, ArrowUpRight, Brain, Zap, ChevronRight, BookOpen, Calculator
} from "lucide-react"
import Link from 'next/link'
import { es, enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { useLocale, useTranslations, useFormatter } from 'next-intl'
import { motion, Variants } from "framer-motion"
import { ResourcesSection } from './resources-section'
import { WeatherDisplay } from './weather-display'

interface UnifiedDashboardProps {
    stats: any
}

// Animation variants for staggered entrance
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
}

export function UnifiedDashboard({ stats }: UnifiedDashboardProps) {
    const t = useTranslations('Dashboard')
    const locale = useLocale()
    const formatIntl = useFormatter()
    const dateLocale = locale === 'es' ? es : enUS
    const [searchTerm, setSearchTerm] = useState('')

    // Filter patients based on search
    const filteredPatients = (stats.recentPatients || []).filter((p: any) =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-full bg-transparent"
        >

            {/* Condensed Header Section */}
            <div className="relative px-6 md:px-8 pt-6 md:pt-8 pb-2 md:pb-4">
                {/* Welcome Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2 px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('header.system_active')}</span>
                            </div>
                        </div>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm font-medium">
                            <div className="flex items-center gap-1.5">
                                <CalendarDays className="w-3.5 h-3.5 md:w-3 md:h-3 opacity-70" />
                                {format(new Date(), t('header.date_format'), { locale: dateLocale })}
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                            <WeatherDisplay />
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 md:gap-3">
                        <Button asChild variant="outline" className="h-8 md:h-9 px-4 border-border/60 hover:bg-muted/50 hover:text-foreground transition-all rounded-full text-xs font-medium">
                            <Link href="/dashboard/tests">
                                <Brain className="w-3.5 h-3.5 mr-2" />
                                {t('cta.tests')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-8 md:h-9 px-4 border-border/60 hover:bg-muted/50 hover:text-foreground transition-all rounded-full text-xs font-medium">
                            <Link href="/dashboard/calculators">
                                <Calculator className="w-3.5 h-3.5 mr-2" />
                                {t('cta.calculators')}
                            </Link>
                        </Button>
                        <Button asChild className="h-8 md:h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 border-0 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95">
                            <Link href="/patients/new">
                                <Plus className="w-3.5 h-3.5 mr-2" />
                                {t('cta.new')}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 md:p-8 pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">

                    {/* Top Stats Bar - Spans all columns */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 group/stat hover:border-primary/20 transition-all hover:shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users className="w-12 h-12 text-primary" />
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('stats.patients')}</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <h3 className="text-3xl font-bold text-foreground">{stats.totalPatients}</h3>
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-0 text-[10px] font-bold">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +12%
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 group/stat hover:border-primary/20 transition-all hover:shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Activity className="w-12 h-12 text-blue-500" />
                            </div>
                            <p className="text-[10px] font-medium text-foreground/70 uppercase tracking-widest">{t('stats.active')}</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <h3 className="text-3xl font-bold text-foreground">{stats.activePatients}</h3>
                                <span className="text-[10px] text-foreground/60 font-medium">{t('stats.in_treatment')}</span>
                            </div>
                        </div>

                        <div className="relative group bg-card p-5 rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Brain className="w-12 h-12 text-teal-500" />
                            </div>
                            <p className="text-[10px] font-medium text-foreground/70 uppercase tracking-widest">{t('stats.tests')}</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <h3 className="text-3xl font-bold text-foreground">{stats.totalTests || 0}</h3>
                                <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 text-[10px] font-medium">
                                    {t('stats.updated')}
                                </Badge>
                            </div>
                        </div>
                    </motion.div>

                    {/* Patient List - Takes 2 columns */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 group/main"
                    >
                        <div className="relative overflow-hidden bg-card rounded-2xl border border-border/60 shadow-sm">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-muted rounded-xl">
                                            <Users className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-foreground text-sm md:text-base">{t('recent_patients.title')}</h2>
                                            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-foreground/60 font-medium">{t('recent_patients.records_count', { count: filteredPatients.length })}</p>
                                        </div>
                                    </div>
                                    <Button asChild variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground dark:text-foreground/60 hover:text-primary hover:bg-primary/5 transition-colors">
                                        <Link href="/patients">
                                            {t('recent_patients.view_all')} <ChevronRight className="w-3 h-3 ml-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="p-4 border-b border-border/40 bg-muted/10">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder={t('recent_patients.search_placeholder')}
                                        className="pl-11 h-11 bg-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-muted/20 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                                <div className="col-span-5">{t('recent_patients.table.patient')}</div>
                                <div className="col-span-2">{t('recent_patients.table.status')}</div>
                                <div className="col-span-3">{t('recent_patients.table.activity')}</div>
                                <div className="col-span-2 text-right">{t('recent_patients.table.action')}</div>
                            </div>

                            {/* Patient List */}
                            <div className="divide-y divide-border/40">
                                {filteredPatients.map((patient: any) => (
                                    <div key={patient.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 py-4 hover:bg-muted/30 transition-all duration-200 items-center group cursor-pointer">
                                        <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs border border-primary/20 group-hover:scale-105 transition-transform">
                                                {patient.full_name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{patient.full_name}</p>
                                                <p className="text-xs text-muted-foreground">{patient.email || t('recent_patients.no_email')}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-2">
                                            <Badge variant="outline" className="bg-transparent text-foreground/80 border-border font-medium px-2 py-0.5 text-[10px]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                                                {t('recent_patients.status_active')}
                                            </Badge>
                                        </div>
                                        <div className="col-span-12 md:col-span-3 text-muted-foreground">
                                            <div className="flex items-center gap-2 text-xs">
                                                <CalendarDays className="w-3.5 h-3.5 opacity-50" />
                                                {formatIntl.dateTime(new Date(patient.created_at), { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-2 text-right">
                                            <Button size="icon" variant="ghost" asChild className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg">
                                                <Link href={`/patients/${patient.id}`}>
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {filteredPatients.length === 0 && (
                                    <div className="px-5 py-16 text-center">
                                        <div className="w-16 h-16 rounded-full bg-muted/30 mx-auto mb-4 flex items-center justify-center">
                                            <Users className="w-8 h-8 text-muted-foreground/50" />
                                        </div>
                                        <p className="text-lg font-medium text-foreground">{t('recent_patients.not_found')}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{t('recent_patients.not_found_desc')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Sidebar */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1 space-y-6"
                    >

                        {/* News / Resources Section - Real Feed */}
                        <div className="min-h-[450px]">
                            <ResourcesSection />
                        </div>

                        {/* Recent Activity Feed */}
                        <div className="group relative bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <div className="p-5 border-b border-border/40 bg-muted/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                        <Activity className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <h3 className="font-bold text-foreground text-sm">{t('activity.title')}</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar relative z-10">
                                {(stats.recentActivity || []).map((activity: any, i: number) => (
                                    <div key={i} className="flex gap-4 p-2 rounded-xl transition-colors hover:bg-muted/30">
                                        <div className="relative mt-1">
                                            <div className="w-2 h-2 rounded-full bg-primary/40 ring-4 ring-primary/10" />
                                            {i !== (stats.recentActivity.length - 1) && (
                                                <div className="absolute top-3 left-1 w-[1px] h-full bg-border/60" />
                                            )}
                                        </div>
                                        <div className="pb-2">
                                            <p className="text-xs font-medium text-foreground leading-snug">{activity.description}</p>
                                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1.5 font-medium">
                                                <Clock className="w-2.5 h-2.5 opacity-50" />
                                                {format(new Date(activity.date), "d MMM, HH:mm", { locale: dateLocale })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {(!stats.recentActivity || stats.recentActivity.length === 0) && (
                                    <div className="py-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-muted/30 mx-auto mb-3 flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-muted-foreground/40" />
                                        </div>
                                        <p className="text-xs text-muted-foreground">{t('activity.empty')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
