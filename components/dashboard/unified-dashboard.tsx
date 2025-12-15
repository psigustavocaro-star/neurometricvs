'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Activity, CalendarDays, Search, Clock, FileText, Plus, TrendingUp, ClipboardList } from "lucide-react"
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
        <div className="min-h-full bg-slate-50 dark:bg-slate-950">
            {/* Header with Stats */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="px-6 py-6">
                    {/* Welcome Section */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Bienvenido al Workstation
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                            </p>
                        </div>
                        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20">
                            <Link href="/patients/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Nuevo Paciente
                            </Link>
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 text-white shadow-lg shadow-teal-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-teal-100 text-sm font-medium">Pacientes Totales</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalPatients}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg shadow-indigo-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-indigo-100 text-sm font-medium">En Tratamiento</p>
                                    <p className="text-3xl font-bold mt-1">{stats.activePatients}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Activity className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-5 text-white shadow-lg shadow-amber-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-amber-100 text-sm font-medium">Tests Realizados</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalTests || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <ClipboardList className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 text-white shadow-lg shadow-emerald-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium">Este Mes</p>
                                    <p className="text-3xl font-bold mt-1">+{stats.newThisMonth || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Patient List - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            {/* Search Bar */}
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <Input
                                            placeholder="Buscar paciente por nombre..."
                                            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <div className="col-span-5">Paciente</div>
                                <div className="col-span-2">Estado</div>
                                <div className="col-span-3">Última Actividad</div>
                                <div className="col-span-2 text-right">Acción</div>
                            </div>

                            {/* Patient List */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredPatients.map((patient: any) => (
                                    <div key={patient.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors items-center">
                                        <div className="col-span-5 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                                                {patient.full_name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 dark:text-white">{patient.full_name}</p>
                                                <p className="text-xs text-slate-400">{patient.email}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                Activo
                                            </span>
                                        </div>
                                        <div className="col-span-3 text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5 text-sm">
                                                <CalendarDays className="w-4 h-4 text-slate-400" />
                                                {new Date(patient.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <Button size="sm" variant="ghost" asChild className="text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                                                <Link href={`/patients/${patient.id}`}>
                                                    Ver Expediente →
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {filteredPatients.length === 0 && (
                                    <div className="px-4 py-12 text-center text-slate-400">
                                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg font-medium">No se encontraron pacientes</p>
                                        <p className="text-sm mt-1">Intenta con otro término de búsqueda</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed - Takes 1 column */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-teal-500" />
                                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Actividad Reciente</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
                                {(stats.recentActivity || []).map((activity: any, i: number) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-teal-500 shrink-0"></div>
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
                                    <p className="text-sm text-slate-400 text-center py-8">Sin actividad reciente</p>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mt-6">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Acciones Rápidas</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                <Button asChild variant="outline" className="w-full justify-start text-left">
                                    <Link href="/dashboard/tests">
                                        <ClipboardList className="w-4 h-4 mr-2" />
                                        Buscar Tests
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start text-left">
                                    <Link href="/patients">
                                        <Users className="w-4 h-4 mr-2" />
                                        Ver Todos los Pacientes
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start text-left">
                                    <Link href="/dashboard/subscription">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Mi Suscripción
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


