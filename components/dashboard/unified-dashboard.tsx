'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, Activity, CalendarDays, Search, Clock, FileText, Plus, TrendingUp,
    ClipboardList, ArrowUpRight, Brain, Sparkles, ChevronRight, Zap
} from "lucide-react"
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface UnifiedDashboardProps {
    stats: any
}

export function UnifiedDashboard({ stats }: UnifiedDashboardProps) {
    const [searchTerm, setSearchTerm] = useState('')

    // Filter patients based on search
    const filteredPatients = (stats.recentPatients || []).filter((p: any) =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-full bg-transparent">

            {/* Hero Header Section - Clean & Unified */}
            <div className="relative">
                {/* No background tint for total unification with sidebar */}

                <div className="relative p-6 md:p-8">
                    {/* Welcome Section */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Sistema Activo</span>
                                </div>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                                Centro de Control
                            </h1>
                            <p className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                                <CalendarDays className="w-4 h-4 opacity-50" />
                                {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button asChild variant="outline" className="border-border hover:bg-accent hover:text-foreground transition-all">
                                <Link href="/dashboard/tests">
                                    <Brain className="w-4 h-4 mr-2" />
                                    Explorar Tests
                                </Link>
                            </Button>
                            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 border-0">
                                <Link href="/patients/new">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nuevo Paciente
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards - Premium Glass Design */}
                    {/* Stats Cards - Elegant Workstation Design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Total Patients */}
                        <div className="group relative bg-primary/5 rounded-2xl p-6 border border-primary/10 transition-all duration-300 hover:border-primary/30">
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Pacientes Totales</p>
                                    <p className="text-4xl font-bold text-foreground">{stats.totalPatients}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <TrendingUp className="w-3 h-3 text-primary" />
                                        <span className="text-xs font-medium text-primary">+{stats.newThisMonth || 0} este mes</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Active Patients */}
                        <div className="group relative bg-primary/5 rounded-2xl p-6 border border-primary/10 transition-all duration-300 hover:border-primary/30">
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">En Tratamiento</p>
                                    <p className="text-4xl font-bold text-foreground">{stats.activePatients}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Activity className="w-3 h-3 text-primary" />
                                        <span className="text-xs font-medium text-primary">Casos activos</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all">
                                    <Zap className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Tests Completed */}
                        <div className="group relative bg-primary/5 rounded-2xl p-6 border border-primary/10 transition-all duration-300 hover:border-primary/30">
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Tests Realizados</p>
                                    <p className="text-4xl font-bold text-foreground">{stats.totalTests || 0}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <ClipboardList className="w-3 h-3 text-primary" />
                                        <span className="text-xs font-medium text-primary">Evaluaciones</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all">
                                    <ClipboardList className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Patient List - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="p-5 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                                        <Users className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-foreground">Pacientes Recientes</h2>
                                        <p className="text-xs text-muted-foreground">{filteredPatients.length} registros</p>
                                    </div>
                                </div>
                                <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                                    <Link href="/patients">
                                        Ver todos <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Search Bar */}
                            <div className="p-4 border-b border-border bg-muted/30">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Buscar por nombre..."
                                        className="pl-11 h-11 bg-card border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50/80 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <div className="col-span-5">Paciente</div>
                                <div className="col-span-2">Estado</div>
                                <div className="col-span-3">Última Actividad</div>
                                <div className="col-span-2 text-right">Acción</div>
                            </div>

                            {/* Patient List */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {filteredPatients.map((patient: any) => (
                                    <div key={patient.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 py-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all duration-200 items-center group">
                                        <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                {patient.full_name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{patient.full_name}</p>
                                                <p className="text-xs text-muted-foreground">{patient.email || 'Sin email'}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-2">
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-medium px-2 py-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 shadow-[0_0_5px_rgba(var(--primary),0.5)]" />
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
                                            <Button size="sm" variant="ghost" asChild className="text-primary hover:bg-primary/10 group-hover:bg-primary/10">
                                                <Link href={`/patients/${patient.id}`}>
                                                    Ver <ArrowUpRight className="w-4 h-4 ml-1" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {filteredPatients.length === 0 && (
                                    <div className="px-5 py-16 text-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto mb-4 flex items-center justify-center">
                                            <Users className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No se encontraron pacientes</p>
                                        <p className="text-sm text-slate-400 mt-1">Intenta con otro término de búsqueda</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Activity Feed */}
                        <div className="group relative bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl overflow-hidden transition-all duration-300">
                            {/* Decorative gradients from AI card */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent opacity-0 dark:opacity-100 transition-opacity" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 blur-2xl opacity-0 dark:opacity-100" />
                            <div className="p-5 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <Activity className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-foreground">Actividad Reciente</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                                {(stats.recentActivity || []).map((activity: any, i: number) => (
                                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted transition-colors border border-transparent hover:border-border">
                                        <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{activity.description}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3 opacity-50" />
                                                {format(new Date(activity.date), "d MMM, HH:mm", { locale: es })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {(!stats.recentActivity || stats.recentActivity.length === 0) && (
                                    <div className="py-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto mb-3 flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <p className="text-sm text-slate-400">Sin actividad reciente</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <Plus className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-foreground">Acciones Rápidas</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <Button asChild variant="ghost" className="w-full justify-start h-12 text-left hover:bg-muted rounded-xl border border-transparent hover:border-border transition-all">
                                    <Link href="/dashboard/tests" className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                                            <Search className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-medium text-foreground text-sm">Explorar Tests</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start h-12 text-left hover:bg-muted rounded-xl border border-transparent hover:border-border transition-all">
                                    <Link href="/patients" className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                                            <Users className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-medium text-foreground text-sm">Ver Pacientes</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start h-12 text-left hover:bg-muted rounded-xl border border-transparent hover:border-border transition-all">
                                    <Link href="/dashboard/subscription" className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                                            <FileText className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-medium text-foreground text-sm">Mi Suscripción</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
