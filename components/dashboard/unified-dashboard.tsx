'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, Activity, CalendarDays, Search, Clock, FileText, Plus, TrendingUp,
    ClipboardList, ArrowUpRight, Brain, Zap, ChevronRight
} from "lucide-react"
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion, Variants } from "framer-motion"

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

            {/* Hero Header Section - Clean & Unified */}
            <div className="relative">
                <div className="relative p-6 md:p-8">
                    {/* Welcome Section */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-4">
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-2 px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Sistema Activo</span>
                                </div>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                                Centro de Control
                            </h1>
                            <p className="text-muted-foreground mt-2 flex items-center gap-2 text-sm font-medium">
                                <CalendarDays className="w-4 h-4 opacity-70" />
                                {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex items-center gap-3">
                            <Button asChild variant="outline" className="h-10 px-5 border-border/60 hover:bg-muted/50 hover:text-foreground transition-all rounded-full text-sm font-medium">
                                <Link href="/dashboard/tests">
                                    <Brain className="w-4 h-4 mr-2" />
                                    Explorar Tests
                                </Link>
                            </Button>
                            <Button asChild className="h-10 px-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 border-0 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95">
                                <Link href="/patients/new">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nuevo Paciente
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Stats Cards - Premium Clean Design (60-30-10 Rule) */}
                    {/* Removed bg-primary/5, kept strict borders and clean white/dark backgrounds */}
                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Total Patients */}
                        <motion.div variants={itemVariants} className="group relative bg-card rounded-2xl p-6 border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">Pacientes Totales</p>
                                    <p className="text-4xl font-semibold text-foreground tracking-tight">{stats.totalPatients}</p>
                                    <div className="flex items-center gap-1.5 mt-3">
                                        <div className="px-1.5 py-0.5 rounded bg-primary/10 flex items-center">
                                            <TrendingUp className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">
                                            <span className="text-primary font-bold">+{stats.newThisMonth || 0}</span> este mes
                                        </span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-5 h-5 text-foreground/70" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Active Patients */}
                        <motion.div variants={itemVariants} className="group relative bg-card rounded-2xl p-6 border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">En Tratamiento</p>
                                    <p className="text-4xl font-semibold text-foreground tracking-tight">{stats.activePatients}</p>
                                    <div className="flex items-center gap-1.5 mt-3">
                                        <div className="px-1.5 py-0.5 rounded bg-primary/10 flex items-center">
                                            <Activity className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">Casos activos actualmente</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
                                    <Zap className="w-5 h-5 text-foreground/70" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Tests Completed */}
                        <motion.div variants={itemVariants} className="group relative bg-card rounded-2xl p-6 border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">Tests Realizados</p>
                                    <p className="text-4xl font-semibold text-foreground tracking-tight">{stats.totalTests || 0}</p>
                                    <div className="flex items-center gap-1.5 mt-3">
                                        <div className="px-1.5 py-0.5 rounded bg-primary/10 flex items-center">
                                            <ClipboardList className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">Evaluaciones completadas</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
                                    <ClipboardList className="w-5 h-5 text-foreground/70" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 md:p-8 pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Patient List - Takes 2 columns */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="p-5 border-b border-border/40 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50">
                                        <Users className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-foreground text-base">Pacientes Recientes</h2>
                                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{filteredPatients.length} registros</p>
                                    </div>
                                </div>
                                <Button asChild variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                                    <Link href="/patients">
                                        Ver todos <ChevronRight className="w-3 h-3 ml-1" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Search Bar */}
                            <div className="p-4 border-b border-border/40 bg-muted/10">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Buscar por nombre..."
                                        className="pl-11 h-11 bg-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-muted/20 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                                <div className="col-span-5">Paciente</div>
                                <div className="col-span-2">Estado</div>
                                <div className="col-span-3">Última Actividad</div>
                                <div className="col-span-2 text-right">Acción</div>
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
                                                <p className="text-xs text-muted-foreground">{patient.email || 'Sin email'}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-2">
                                            <Badge variant="outline" className="bg-transparent text-foreground/80 border-border font-medium px-2 py-0.5 text-[10px]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                                                Activo
                                            </Badge>
                                        </div>
                                        <div className="col-span-12 md:col-span-3 text-muted-foreground">
                                            <div className="flex items-center gap-2 text-xs">
                                                <CalendarDays className="w-3.5 h-3.5 opacity-50" />
                                                {new Date(patient.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                                        <p className="text-lg font-medium text-foreground">No se encontraron pacientes</p>
                                        <p className="text-sm text-muted-foreground mt-1">Intenta con otro término de búsqueda</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Sidebar */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
                        {/* Activity Feed */}
                        <div className="group relative bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden transition-all duration-300">
                            <div className="p-5 border-b border-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                        <Activity className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <h3 className="font-bold text-foreground text-sm">Actividad Reciente</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {(stats.recentActivity || []).map((activity: any, i: number) => (
                                    <div key={i} className="flex gap-4 p-2 rounded-xl transition-colors">
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
                                                {format(new Date(activity.date), "d MMM, HH:mm", { locale: es })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {(!stats.recentActivity || stats.recentActivity.length === 0) && (
                                    <div className="py-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-muted/30 mx-auto mb-3 flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-muted-foreground/40" />
                                        </div>
                                        <p className="text-xs text-muted-foreground">Sin actividad reciente</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <Zap className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <h3 className="font-bold text-foreground text-sm">Acciones Rápidas</h3>
                                </div>
                            </div>
                            <div className="p-3 space-y-1">
                                <Button asChild variant="ghost" className="w-full justify-start h-10 text-left hover:bg-muted/50 rounded-lg transition-all text-xs font-medium text-muted-foreground hover:text-foreground">
                                    <Link href="/dashboard/tests" className="flex items-center">
                                        <Search className="w-4 h-4 mr-3 opacity-70" />
                                        Explorar Tests
                                        <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start h-10 text-left hover:bg-muted/50 rounded-lg transition-all text-xs font-medium text-muted-foreground hover:text-foreground">
                                    <Link href="/patients" className="flex items-center">
                                        <Users className="w-4 h-4 mr-3 opacity-70" />
                                        Ver Pacientes
                                        <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start h-10 text-left hover:bg-muted/50 rounded-lg transition-all text-xs font-medium text-muted-foreground hover:text-foreground">
                                    <Link href="/dashboard/subscription" className="flex items-center">
                                        <FileText className="w-4 h-4 mr-3 opacity-70" />
                                        Mi Suscripción
                                        <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
