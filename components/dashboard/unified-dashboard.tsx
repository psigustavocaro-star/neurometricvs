'use client'

import { useState } from "react"
import Link from "next/link"
import {
    Users,
    Activity,
    Settings,
    Brain,
    Plus,
    Search,
    Clock,
    CheckCircle2,
    ChevronRight,
    TrendingUp,
    Calendar,
    FileText,
    Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PatientList } from "@/components/patients/patient-list"
import { DashboardTestCatalog } from "@/components/dashboard/dashboard-test-catalog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DashboardStats {
    user_name: string
    allPatients: any[]
    recentPatients: any[]
    totalPatients: number
    recentTests: any[]
    subscriptionPlan: string
    upcomingSessions: any[]
    todaySessions?: any[]
}

interface UnifiedDashboardProps {
    stats: DashboardStats
}

type ViewState = 'overview' | 'patients' | 'tests' | 'settings'

export function UnifiedDashboard({ stats }: UnifiedDashboardProps) {
    const [activeView, setActiveView] = useState<ViewState>('overview')
    const [patientSearch, setPatientSearch] = useState('')

    const plan = stats.subscriptionPlan
    const isBasicPlan = plan === 'free' || !plan

    // Aesthetic Helpers
    const getInitials = (name: string) => name ? name.substring(0, 2).toUpperCase() : 'PA'
    const currentDate = new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })

    const renderContent = () => {
        switch (activeView) {
            case 'patients':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Gestión de Pacientes</h2>
                                <p className="text-slate-500">Administración completa de expedientes clínicos</p>
                            </div>
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 rounded-xl px-6">
                                <Link href="/patients/new" className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> Nuevo Paciente
                                </Link>
                            </Button>
                        </div>
                        <PatientList initialPatients={stats.allPatients} />
                    </div>
                )
            case 'tests':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <h2 className="text-3xl font-bold mb-2 relative z-10">Catálogo de Evaluaciones</h2>
                            <p className="text-slate-300 relative z-10">Biblioteca estandarizada de instrumentos clínicos.</p>
                        </div>
                        <DashboardTestCatalog />
                    </div>
                )
            case 'settings':
                return (
                    <div className="flex items-center justify-center h-[50vh] text-slate-400 animate-in fade-in zoom-in duration-500">
                        <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-md">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Settings className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Configuración</h3>
                            <p className="mb-6 text-slate-500">Gestiona tu cuenta y preferencias.</p>
                            <Button variant="outline" className="w-full rounded-xl" asChild>
                                <Link href="/dashboard/subscription">Gestionar Suscripción</Link>
                            </Button>
                        </div>
                    </div>
                )
            case 'overview':
            default:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* 1. Modern Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 border-b border-slate-100">
                            <div>
                                <p className="text-sm font-semibold text-teal-600 mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                                    {currentDate}
                                </p>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                    Hola, <span className="text-slate-900">Dr. {stats.user_name}</span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    onClick={() => setActiveView('patients')}
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    Pacientes
                                </Button>
                                <Button
                                    className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10"
                                    onClick={() => setActiveView('tests')}
                                >
                                    <Brain className="w-4 h-4 mr-2" />
                                    Nueva Evaluación
                                </Button>
                            </div>
                        </div>

                        {/* 2. Key Metrics - Pro Style */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                {
                                    label: 'Total Pacientes',
                                    value: stats.totalPatients,
                                    icon: Users,
                                    color: 'text-blue-600',
                                    bg: 'bg-blue-50',
                                    trend: '+12% este mes'
                                },
                                {
                                    label: 'Evaluaciones Hoy',
                                    value: stats.recentTests.length,
                                    icon: Activity,
                                    color: 'text-teal-600',
                                    bg: 'bg-teal-50',
                                    trend: 'Actividad normal'
                                },
                                {
                                    label: 'Tests Disponibles',
                                    value: '150+',
                                    icon: Brain,
                                    color: 'text-violet-600',
                                    bg: 'bg-violet-50',
                                    trend: 'Catálogo actualizado'
                                },
                                {
                                    label: 'Plan Actual',
                                    value: stats.subscriptionPlan.toUpperCase(),
                                    icon: Zap,
                                    color: 'text-amber-600',
                                    bg: 'bg-amber-50',
                                    trend: 'Renueva en 15 días'
                                },
                            ].map((stat, i) => (
                                <Card key={i} className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                                            </div>
                                            <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-slate-50 text-slate-500")}>
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                                            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* 3. Main Dashboard Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column: Recent Patients & Activity (2/3) */}
                            <div className="lg:col-span-2 space-y-8">

                                {/* Quick Access Section */}
                                <Card className="border-slate-100 shadow-sm overflow-hidden">
                                    <CardHeader className="bg-white border-b border-slate-100 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-5 h-5 text-teal-600" />
                                                <CardTitle className="text-lg font-bold text-slate-800">Pacientes Recientes</CardTitle>
                                            </div>
                                            <Link href="/patients" onClick={(e) => { e.preventDefault(); setActiveView('patients') }} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                                                Ver directorio completo
                                            </Link>
                                        </div>
                                    </CardHeader>
                                    <div className="p-0">
                                        <div className="divide-y divide-slate-50">
                                            {stats.allPatients.slice(0, 5).map((patient) => (
                                                <div key={patient.id} className="group flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                                                            {getInitials(patient.full_name)}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                                                                {patient.full_name}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                                <span>ID: #{patient.id.slice(0, 6)}</span>
                                                                <span>•</span>
                                                                <span>{patient.age ? `${patient.age} años` : 'Edad N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" variant="ghost" className="h-8 text-slate-400 hover:text-teal-600" asChild>
                                                            <Link href={`/patients/${patient.id}`}>
                                                                Expediente <ChevronRight className="w-3 h-3 ml-1" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {stats.allPatients.length === 0 && (
                                                <div className="text-center py-12">
                                                    <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                                    <p className="text-slate-500">No hay pacientes registrados</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>

                                {/* Recent Activity Log */}
                                <Card className="border-slate-100 shadow-sm">
                                    <CardHeader className="py-4">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-slate-400" />
                                            <CardTitle className="text-lg font-bold text-slate-800">Última Actividad</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                            {stats.recentTests.length > 0 ? stats.recentTests.slice(0, 4).map((test, i) => (
                                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                        <CheckCircle2 className="w-5 h-5 text-teal-500" />
                                                    </div>

                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                                            <div className="font-bold text-slate-900">Evaluación Completada</div>
                                                            <time className="font-caveat font-medium text-xs text-slate-500">
                                                                {new Date(test.created_at).toLocaleDateString()}
                                                            </time>
                                                        </div>
                                                        <div className="text-slate-500 text-sm">
                                                            El paciente <span className="font-medium text-slate-900">{test.patients?.full_name}</span> completó el test {test.test_id}.
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-center py-8 pl-8">
                                                    <p className="text-slate-400 text-sm">No hay actividad reciente registrada.</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>

                            {/* Right Column: Quick Tools & Status (1/3) */}
                            <div className="space-y-6">

                                {/* Action Card */}
                                <Card className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white border-0 shadow-lg shadow-teal-600/20">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Acciones Rápidas</h3>
                                        <p className="text-teal-100 text-sm mb-6">
                                            Inicia una nueva evaluación o gestiona tu agenda clínica.
                                        </p>
                                        <div className="space-y-3">
                                            <Button className="w-full bg-white text-teal-700 hover:bg-teal-50 border-0" onClick={() => setActiveView('tests')}>
                                                <Brain className="w-4 h-4 mr-2" /> Iniciar Test
                                            </Button>
                                            <Button variant="outline" className="w-full border-teal-500 text-white hover:bg-teal-700 bg-transparent">
                                                <Calendar className="w-4 h-4 mr-2" /> Ver Agenda
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Mini Catalog Preview */}
                                <Card className="border-slate-100 shadow-sm">
                                    <CardHeader className="py-4 border-b border-slate-50">
                                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Tests Populares</h3>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-slate-50">
                                            {[
                                                { name: 'PHQ-9', desc: 'Depresión', color: 'bg-blue-100 text-blue-700' },
                                                { name: 'GAD-7', desc: 'Ansiedad', color: 'bg-indigo-100 text-indigo-700' },
                                                { name: 'M-CHAT-R', desc: 'Autismo', color: 'bg-teal-100 text-teal-700' },
                                                { name: 'SNAP-IV', desc: 'TDAH', color: 'bg-amber-100 text-amber-700' },
                                            ].map((test, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => setActiveView('tests')}>
                                                    <div className="flex items-center gap-3">
                                                        <span className={cn("text-xs font-bold px-2 py-1 rounded-md", test.color)}>
                                                            {test.name}
                                                        </span>
                                                        <span className="text-sm text-slate-600 font-medium">{test.desc}</span>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 border-t border-slate-50">
                                            <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500 hover:text-teal-600" onClick={() => setActiveView('tests')}>
                                                Ver catálogo completo
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* System Status */}
                                <Card className="border-slate-100 shadow-sm bg-slate-50/50">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span className="text-sm font-medium text-slate-600">Sistema Operativo</span>
                                        </div>
                                        <span className="text-xs text-slate-400">v2.4.0</span>
                                    </CardContent>
                                </Card>

                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen bg-slate-50/30">
            <main className="w-full p-4 md:p-8 max-w-[1400px] mx-auto">
                {renderContent()}
            </main>
        </div>
    )
}
