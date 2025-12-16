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
        <div className="min-h-full bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            {/* Hero Header Section */}
            <div className="relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 via-transparent to-indigo-600/5 dark:from-teal-500/10 dark:to-indigo-500/10" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl dark:bg-teal-500/5" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl dark:bg-indigo-500/5" />

                <div className="relative px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/10 dark:bg-teal-500/20 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                                    <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">Sistema Activo</span>
                                </div>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                                Centro de Control
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button asChild variant="outline" className="border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors">
                                <Link href="/dashboard/tests">
                                    <Brain className="w-4 h-4 mr-2" />
                                    Explorar Tests
                                </Link>
                            </Button>
                            <Button asChild className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-lg shadow-teal-500/25 border-0">
                                <Link href="/patients/new">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nuevo Paciente
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards - Premium Glass Design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {/* Total Patients */}
                        <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Pacientes Totales</p>
                                    <p className="text-4xl font-bold text-slate-900 dark:text-white">{stats.totalPatients}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <ArrowUpRight className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                                        <span className="text-xs font-medium text-teal-600 dark:text-teal-400">+{stats.newThisMonth || 0} este mes</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Active Patients */}
                        <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">En Tratamiento</p>
                                    <p className="text-4xl font-bold text-slate-900 dark:text-white">{stats.activePatients}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Activity className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Casos activos</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Tests Completed */}
                        <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Tests Realizados</p>
                                    <p className="text-4xl font-bold text-slate-900 dark:text-white">{stats.totalTests || 0}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <ClipboardList className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                                        <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">Evaluaciones</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                    <ClipboardList className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* AI Insights Card */}

                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Patient List - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden">
                            {/* Header */}
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-slate-900 dark:text-white">Pacientes Recientes</h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{filteredPatients.length} registros</p>
                                    </div>
                                </div>
                                <Button asChild variant="ghost" size="sm" className="text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                                    <Link href="/patients">
                                        Ver todos <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Search Bar */}
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Buscar por nombre..."
                                        className="pl-11 h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
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
                                        <div className="col-span-5 flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-teal-500/20 ring-2 ring-white dark:ring-slate-800 group-hover:ring-teal-500/50 transition-all">
                                                {patient.full_name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{patient.full_name}</p>
                                                <p className="text-xs text-slate-400">{patient.email || 'Sin email'}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                                                Activo
                                            </Badge>
                                        </div>
                                        <div className="col-span-3 text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CalendarDays className="w-4 h-4 text-slate-400" />
                                                {new Date(patient.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <Button size="sm" variant="ghost" asChild className="text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20">
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
                        <div className="group relative bg-white/80 dark:bg-slate-900 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/40 overflow-hidden hover:shadow-2xl hover:shadow-teal-900/20 transition-all duration-300">
                            {/* Decorative gradients from AI card */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent opacity-0 dark:opacity-100 transition-opacity" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 blur-2xl opacity-0 dark:opacity-100" />
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                                        <Activity className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Actividad Reciente</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                                {(stats.recentActivity || []).map((activity: any, i: number) => (
                                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <div className="w-2 h-2 mt-1.5 rounded-full bg-teal-500 shrink-0 ring-4 ring-teal-500/20" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{activity.description}</p>
                                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3" />
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
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                                        <Search className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Acciones Rápidas</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <Button asChild variant="ghost" className="w-full justify-start h-12 text-left hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                    <Link href="/dashboard/tests" className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
                                            <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">Explorar Tests</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start h-12 text-left hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                    <Link href="/patients" className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
                                            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">Ver Pacientes</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start h-12 text-left hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                    <Link href="/dashboard/subscription" className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-3">
                                            <FileText className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">Mi Suscripción</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />
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
