'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, Activity, CalendarDays, Search, Clock, FileText, Plus, TrendingUp,
    ClipboardList, ArrowUpRight, Brain, Zap, ChevronRight, BookOpen, Calculator,
    Play, GitGraph, ClipboardCheck, Check
} from "lucide-react"
import { Link } from '@/i18n/navigation'
import { es, enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { useLocale, useTranslations, useFormatter } from 'next-intl'
import { motion, Variants } from "framer-motion"
import { ResourcesSection } from './resources-section'


import { Patient } from '@/types/patient'
import { StartSessionDialog } from './start-session-dialog'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LanguageToggle } from '@/components/layout/language-toggle'

interface UnifiedDashboardProps {
    stats: {
        totalPatients: number
        recentPatients: Patient[]
        allPatients: Patient[]
        recentTests: any[]
        subscriptionPlan: string
        user_name: string
        avatar_url?: string
        recentActivity?: any[]
        totalTests?: number
        activePatients?: number
        sessionsToday?: number
        testsToReview?: number
        pendingItems?: any[]
        subscriptionStatus?: string
    }
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
        p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-full overflow-hidden"
        >

            {/* Condensed Header Section */}
            <div className="relative px-6 md:px-8 pt-6 md:pt-8 pb-4">
                {/* Welcome & Actions Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <motion.div variants={itemVariants} className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-2.5 py-1 bg-primary/10 rounded-full border border-primary/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('header.system_active')}</span>
                            </div>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-3 text-xs md:text-sm font-medium">
                            <CalendarDays className="w-3.5 h-3.5 opacity-70" />
                            {format(new Date(), t('header.date_format'), { locale: dateLocale })}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Button asChild variant="outline" className="h-9 px-4 border-border/60 hover:bg-muted/50 rounded-full text-xs font-medium bg-background/50">
                                <Link href="/dashboard/tests">
                                    <Brain className="w-3.5 h-3.5 mr-2" />
                                    {t('cta.tests')}
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-9 px-4 border-border/60 hover:bg-muted/50 rounded-full text-xs font-medium bg-background/50">
                                <Link href="/dashboard/calculators">
                                    <Calculator className="w-3.5 h-3.5 mr-2" />
                                    {t('cta.calculators')}
                                </Link>
                            </Button>
                        </div>
                        <StartSessionDialog />
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-8 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

                    {/* Top Stats Bar - Spans all columns */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 shadow-sm p-5 group hover:border-blue-500/30 transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Activity className="w-12 h-12 text-blue-500" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <CalendarDays className="w-3.5 h-3.5" />
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-[0.15em]">{t('stats.today_sessions') || 'Sesiones de Hoy'}</p>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-3xl font-extrabold text-foreground tracking-tight">{stats.sessionsToday || 0}</h3>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">{t('stats.on_schedule') || 'En agenda'}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 shadow-sm p-5 group hover:border-teal-500/30 transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <ClipboardList className="w-12 h-12 text-teal-500" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                                    <ClipboardCheck className="w-3.5 h-3.5" />
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-[0.15em]">{t('stats.tests_to_review') || 'Tests por Revisar'}</p>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-3xl font-extrabold text-foreground tracking-tight">{stats.testsToReview || 0}</h3>
                                {stats.testsToReview && stats.testsToReview > 0 ? (
                                    <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-[9px] font-bold uppercase tracking-wider px-2 py-0">
                                        {t('stats.urgent') || 'Pendiente'}
                                    </Badge>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-border/50">
                                        <Check className="w-3 h-3 text-slate-400" />
                                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{t('stats.all_clear') || 'Al día'}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Patient List - Takes 2 columns */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 group/main container-type-inline-size">
                        <div className="relative overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 shadow-sm h-full flex flex-col">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-muted/50 rounded-xl border border-border/50">
                                            <Users className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-foreground text-sm md:text-base">{t('recent_patients.title')}</h2>
                                            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-foreground/60 font-medium whitespace-nowrap">{t('recent_patients.records_count', { count: filteredPatients.length })}</p>
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
                            <div className="px-6 pb-4">
                                <div className="relative group/search">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 w-4 h-4 transition-colors group-focus-within/search:text-primary" />
                                    <Input
                                        placeholder={t('recent_patients.search_placeholder')}
                                        className="pl-11 h-11 bg-background/50 border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table Header - Desktop Only */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-muted/30 text-[9px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em] border-y border-border/30">
                                <div className="col-span-4 flex items-center gap-2">
                                    <Users className="w-3 h-3 opacity-50" />
                                    {t('recent_patients.table.patient')}
                                </div>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Brain className="w-3 h-3 opacity-50" />
                                    {t('recent_patients.table.focus') || 'Foco Clínico'}
                                </div>
                                <div className="col-span-2 text-center flex items-center justify-center gap-2">
                                    <Activity className="w-3 h-3 opacity-50" />
                                    {t('recent_patients.table.status') || 'Estado'}
                                </div>
                                <div className="col-span-3 text-right">{t('recent_patients.table.action') || 'Acciones'}</div>
                            </div>

                            {/* Patient List */}
                            <div className="divide-y divide-border/30 overflow-y-auto max-h-[500px] flex-1">
                                {filteredPatients.map((patient: Patient) => (
                                    <Link
                                        key={patient.id}
                                        href={`/patients/${patient.id}`}
                                        className="block group"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/40 transition-all duration-200 items-center border-l-[3px] border-transparent hover:border-primary">

                                            {/* Patient Info */}
                                            <div className="col-span-12 md:col-span-4 flex items-center justify-between md:justify-start gap-4">
                                                <div className="flex items-center gap-4 w-full">
                                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/5 flex items-center justify-center font-bold text-primary text-xs border border-primary/10 group-hover:bg-primary/10 transition-colors shadow-sm">
                                                        {(patient.full_name || 'NN').substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div className="space-y-0.5 min-w-0 flex-1">
                                                        <p className="font-bold text-foreground text-[13px] md:text-sm group-hover:text-primary transition-colors leading-tight tracking-tight truncate">
                                                            {patient.full_name || 'Paciente Sin Nombre'}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider bg-muted/80 px-1.5 rounded-sm truncate">
                                                                {patient.id_clinico || `ID-${(patient.id || '').substring(0, 4).toUpperCase()}`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* Mobile Arrow */}
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground/30 md:hidden" />
                                                </div>
                                            </div>

                                            {/* Diagnosis Info */}
                                            <div className="col-span-12 md:col-span-3 pl-[3.5rem] md:pl-0 mt-[-0.5rem] md:mt-0">
                                                <div className="flex flex-col">
                                                    <p className="text-[11px] text-foreground/80 font-semibold truncate leading-normal">
                                                        {patient.diagnostico_principal || t('recent_patients.no_diagnosis') || 'Sin diagnóstico'}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground/60 font-medium">
                                                        Ingreso: {format(new Date(patient.created_at || new Date()), "d MMM", { locale: dateLocale })}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className="col-span-12 md:col-span-2 flex items-center md:justify-center pl-[3.5rem] md:pl-0 mt-[-0.5rem] md:mt-0">
                                                {patient.stats_intervencion?.tests_pendientes ? (
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20" title="Tests pendientes">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                                        <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400">{patient.stats_intervencion.tests_pendientes} pending</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                                                        <Check className="w-2.5 h-2.5 text-emerald-500" strokeWidth={3} />
                                                        <span className="text-[9px] font-bold text-emerald-600/70">OK</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Desktop Action Arrow */}
                                            <div className="hidden md:flex md:col-span-3 justify-end items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-md">
                                                    Ver ficha <ChevronRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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

                    {/* Right Sidebar - 1 Column */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">

                        {/* News / Resources Section */}
                        <div className="min-h-[400px]">
                            <ResourcesSection />
                        </div>

                        {/* Updated Pending Items Widget */}
                        {stats.pendingItems && stats.pendingItems.length > 0 && (
                            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 shadow-sm overflow-hidden group">
                                <div className="p-4 border-b border-border/40 bg-orange-50/50 dark:bg-orange-900/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-orange-100 dark:bg-orange-800/30 flex items-center justify-center">
                                            <ClipboardList className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <h3 className="font-bold text-foreground text-sm">Pendientes</h3>
                                    </div>
                                </div>
                                <div className="p-2 space-y-1">
                                    {stats.pendingItems.map((item, i) => (
                                        <div key={item.id || i} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg group transition-colors cursor-pointer border border-transparent hover:border-border/50">
                                            <div className="flex items-center gap-3 w-full overflow-hidden">
                                                <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-orange-500 animate-pulse" />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                                                    <p className="text-[10px] text-muted-foreground truncate">{item.subtitle}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Activity Feed */}
                        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 shadow-sm overflow-hidden group hover:shadow-md transition-all">
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
                                    <div key={activity.id || i} className="flex gap-4 p-2 rounded-xl transition-colors hover:bg-muted/30">
                                        <div className="relative mt-1">
                                            <div className="w-2 h-2 rounded-full bg-primary/40 ring-4 ring-primary/10" />
                                            {stats.recentActivity && i !== (stats.recentActivity.length - 1) && (
                                                <div className="absolute top-3 left-1 w-[1px] h-full bg-border/60" />
                                            )}
                                        </div>
                                        <div className="pb-2 min-w-0 flex-1">
                                            <p className="text-xs font-medium text-foreground leading-snug break-words">{activity.description}</p>
                                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1.5 font-medium">
                                                <Clock className="w-2.5 h-2.5 opacity-50" />
                                                {activity.date ? format(new Date(activity.date), "d MMM, HH:mm", { locale: dateLocale }) : '---'}
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
