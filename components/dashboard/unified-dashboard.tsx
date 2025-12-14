'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Activity, CalendarDays, Search, Clock, FileText, Settings, Plus, LayoutGrid, List } from "lucide-react"
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface UnifiedDashboardProps {
    stats: any
}

export function UnifiedDashboard({ stats }: UnifiedDashboardProps) {
    const [searchTerm, setSearchTerm] = useState('')

    // Filter patients based on search
    const filteredPatients = stats.recentPatients.filter((p: any) =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
            {/* Top Bar - Professional Header */}
            <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-none z-10">
                <div className="flex items-center gap-4">
                    <div className="bg-teal-600 text-white p-1 rounded-sm">
                        <Activity className="w-5 h-5" />
                    </div>
                    <h1 className="text-lg font-bold text-slate-800 tracking-tight">Neurometrics <span className="text-slate-400 font-normal">| Workstation</span></h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button size="sm" variant="ghost" className="text-slate-500">
                        <Settings className="w-4 h-4" />
                    </Button>
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        DR
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">

                {/* LEFT: Agenda & Quick Actions (Time-based scan) */}
                <aside className="col-span-2 border-r border-slate-200 bg-white flex flex-col">
                    <div className="p-4 border-b border-slate-100">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Agenda del Día</h2>
                        <div className="text-sm font-medium text-slate-800 mb-1">
                            {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
                        </div>
                        <div className="text-xs text-slate-500">
                            3 Pacientes programados
                        </div>
                    </div>

                    {/* Mock Agenda - In real app, this would be computed */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        <div className="group flex gap-3 p-2 hover:bg-slate-50 rounded-md cursor-pointer border-l-2 border-transparent hover:border-teal-500 transition-all">
                            <div className="text-center w-10 shrink-0">
                                <span className="block text-xs font-bold text-slate-700">09:00</span>
                                <span className="block text-[10px] text-slate-400">AM</span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-800 truncate">Juan Pérez</p>
                                <p className="text-[10px] text-teal-600">Evaluación Inicial</p>
                            </div>
                        </div>
                        <div className="group flex gap-3 p-2 hover:bg-slate-50 rounded-md cursor-pointer border-l-2 border-transparent hover:border-indigo-500 transition-all bg-indigo-50/30">
                            <div className="text-center w-10 shrink-0">
                                <span className="block text-xs font-bold text-indigo-700">11:30</span>
                                <span className="block text-[10px] text-slate-400">AM</span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-800 truncate">María González</p>
                                <p className="text-[10px] text-indigo-600">Sesión de Seguimiento</p>
                            </div>
                        </div>
                        <div className="group flex gap-3 p-2 hover:bg-slate-50 rounded-md cursor-pointer border-l-2 border-transparent hover:border-amber-500 transition-all">
                            <div className="text-center w-10 shrink-0">
                                <span className="block text-xs font-bold text-slate-700">15:00</span>
                                <span className="block text-[10px] text-slate-400">PM</span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-800 truncate">Carlos Ruiz</p>
                                <p className="text-[10px] text-amber-600">Devolución Test</p>
                            </div>
                        </div>
                    </div>

                    {/* Pending Tasks */}
                    <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                        <div className="flex items-center gap-2 mb-3">
                            <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
                            <h3 className="text-xs font-bold text-slate-500 uppercase">Pendientes</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-white border border-slate-200 p-2 rounded text-xs flex justify-between items-center">
                                <span className="text-slate-600">Informes por firmar</span>
                                <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px] font-bold">2</span>
                            </div>
                            <div className="bg-white border border-slate-200 p-2 rounded text-xs flex justify-between items-center">
                                <span className="text-slate-600">Tests sin revisar</span>
                                <span className="bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full text-[10px] font-bold">5</span>
                            </div>
                        </div>
                    </div>
                </aside>


                {/* CENTER: Patient Census (The main list) */}
                <main className="col-span-7 flex flex-col bg-slate-50/30">
                    {/* Stats Ribbon */}
                    <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-200 bg-white shadow-sm z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-teal-50 rounded-md">
                                <Users className="w-5 h-5 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800 leading-none">{stats.totalPatients}</p>
                                <p className="text-xs font-medium text-slate-400 mt-1">Pacientes Totales</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-md">
                                <Activity className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800 leading-none">{stats.activePatients}</p>
                                <p className="text-xs font-medium text-slate-400 mt-1">En Tratamiento</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white shadow-md">
                                <Link href="/patients/new">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nuevo Paciente
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Search & Toolbar */}
                    <div className="p-4 flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="Buscar paciente por nombre, rut o diagnóstico..."
                                className="pl-10 bg-white border-slate-200 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-md">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-slate-100 text-slate-700"><List className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"><LayoutGrid className="w-4 h-4" /></Button>
                        </div>
                    </div>

                    {/* Patient List Table */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Paciente</th>
                                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Estado</th>
                                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Última Actividad</th>
                                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredPatients.map((patient: any) => (
                                        <tr key={patient.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs border border-slate-200">
                                                        {patient.full_name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{patient.full_name}</p>
                                                        <p className="text-[10px] text-slate-400">{patient.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                    Activo
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-500">
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                                                    {new Date(patient.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Button size="sm" variant="ghost" asChild className="h-7 text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                                                    <Link href={`/patients/${patient.id}`}>
                                                        Ver Expediente →
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredPatients.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                                                No se encontraron pacientes
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>


                {/* RIGHT: Feed & Notifications */}
                <aside className="col-span-3 border-l border-slate-200 bg-white flex flex-col">
                    <div className="p-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-slate-400" />
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Feed Clínico Global</h3>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Feed Items (Simulated from all activities) */}
                        <div className="relative pl-4 border-l border-slate-200 space-y-6">

                            {stats.recentActivity.map((activity: any, i: number) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full border-2 border-white ring-1 ring-slate-200 bg-slate-400"></div>
                                    <p className="text-xs font-medium text-slate-800 mb-0.5">{activity.description}</p>
                                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {format(new Date(activity.date), "d MMM, HH:mm", { locale: es })}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </aside>

            </div>
        </div>
    )
}
