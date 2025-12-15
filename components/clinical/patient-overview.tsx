'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GenogramBuilder } from './genogram-builder'
import {
    CalendarDays,
    AlertTriangle,
    FileText,
    Brain,
    ArrowRight,
    UserPlus,
    TrendingUp,
    Clock,
    Sparkles,
    ChevronDown,
    ChevronUp,
    Network,
    Lightbulb,
    Target,
    MessageSquare
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface PatientOverviewProps {
    patient: any
    lastSession: any
    diagnosis: string
    onStartSession: () => void
    sessions?: any[]
}

export function PatientOverview({ patient, lastSession, diagnosis, onStartSession, sessions = [] }: PatientOverviewProps) {
    const router = useRouter()
    const [showGenogram, setShowGenogram] = useState(false)

    // Get the most recent sessions with insights
    const recentSessions = sessions.slice(0, 5)

    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4 lg:p-6 space-y-4">

                {/* Top Row: Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Clinical Status Card */}
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-slate-50/50 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                                    <Target className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-semibold text-slate-600">Estado Actual</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-3">
                            <div>
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Diagnóstico / Motivo</p>
                                <p className="font-semibold text-slate-900 text-sm">{diagnosis || 'En proceso de evaluación'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 text-xs px-2 py-0.5">
                                    Bajo / Estable
                                </Badge>
                                <span className="text-[10px] text-slate-400">Riesgo clínico</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Last Session Card */}
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-indigo-50/30 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-semibold text-slate-600">Última Sesión</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            {lastSession ? (
                                <div className="space-y-2">
                                    <p className="font-semibold text-slate-900 text-sm">
                                        {format(new Date(lastSession.date), "d 'de' MMMM, yyyy", { locale: es })}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-indigo-600 bg-indigo-50 border-indigo-200 text-xs px-2 py-0.5">
                                            {lastSession.type || 'Sesión Regular'}
                                        </Badge>
                                        {lastSession.duration && (
                                            <span className="text-[10px] text-slate-400">{lastSession.duration} min</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 italic">Sin sesiones registradas</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Action Card */}
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative group cursor-pointer hover:scale-[1.02] transition-transform duration-200" onClick={onStartSession}>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardContent className="p-4 flex flex-col justify-center h-full">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-teal-500 text-white">
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Nueva Sesión</h4>
                                    <p className="text-xs text-slate-300">Registrar visita</p>
                                </div>
                                <ArrowRight className="w-5 h-5 ml-auto text-slate-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Sessions Timeline - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* AI Suggestions */}
                        <Card className="border-0 shadow-sm bg-gradient-to-r from-indigo-50/80 to-purple-50/50 overflow-hidden">
                            <CardHeader className="pb-2 pt-4 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <CardTitle className="text-sm font-semibold text-indigo-700">Sugerencias IA para Hoy</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex gap-2 items-start p-2 rounded-lg bg-white/60 hover:bg-white transition-colors">
                                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                        <p className="text-sm text-indigo-800">Evaluar adherencia a tarea de registro emocional.</p>
                                    </div>
                                    <div className="flex gap-2 items-start p-2 rounded-lg bg-white/60 hover:bg-white transition-colors">
                                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                        <p className="text-sm text-indigo-800">Explorar conflicto familiar mencionado al cierre.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sessions with Insights */}
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <CardHeader className="pb-2 pt-4 px-4 bg-gradient-to-r from-slate-50 to-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <CardTitle className="text-sm font-semibold text-slate-700">Evolución del Proceso</CardTitle>
                                    </div>
                                    <Badge variant="outline" className="text-slate-500 text-xs">
                                        {sessions.length} sesiones
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {recentSessions.length > 0 ? (
                                    <div className="divide-y divide-slate-100">
                                        {recentSessions.map((session, index) => (
                                            <div
                                                key={session.id}
                                                className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                                onClick={onStartSession}
                                            >
                                                <div className="flex gap-4">
                                                    {/* Timeline indicator */}
                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-teal-500 ring-4 ring-teal-100' : 'bg-slate-300'}`} />
                                                        {index < recentSessions.length - 1 && (
                                                            <div className="w-0.5 flex-1 bg-slate-200 mt-2" />
                                                        )}
                                                    </div>

                                                    {/* Session content */}
                                                    <div className="flex-1 min-w-0 pb-2">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-semibold text-slate-800 text-sm">
                                                                {format(new Date(session.date), "d 'de' MMMM, yyyy", { locale: es })}
                                                            </span>
                                                            <Badge variant="outline" className="text-[10px] bg-white">
                                                                {session.type || 'Sesión'}
                                                            </Badge>
                                                        </div>

                                                        {/* Session notes preview */}
                                                        {session.notes && (
                                                            <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                                                                {session.notes.substring(0, 120)}...
                                                            </p>
                                                        )}

                                                        {/* AI Insights if available */}
                                                        {session.ai_insights && (
                                                            <div className="mt-2 p-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                                                                <div className="flex items-center gap-1.5 mb-1">
                                                                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                                                                    <span className="text-[10px] font-semibold text-amber-700 uppercase">Insight IA</span>
                                                                </div>
                                                                <p className="text-xs text-amber-900 line-clamp-2">
                                                                    {session.ai_insights.summary || session.ai_insights.key_themes || 'Análisis disponible'}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <ArrowRight className="w-4 h-4 text-slate-300 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-3 flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <p className="text-sm text-slate-500 mb-3">Sin sesiones registradas aún</p>
                                        <Button size="sm" onClick={onStartSession} className="bg-teal-600 hover:bg-teal-700">
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Iniciar Primera Sesión
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar - Genogram & Stats */}
                    <div className="space-y-4">

                        {/* Collapsible Genogram */}
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <CardHeader
                                className="pb-2 pt-4 px-4 cursor-pointer hover:bg-slate-50 transition-colors"
                                onClick={() => setShowGenogram(!showGenogram)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                                            <Network className="w-4 h-4" />
                                        </div>
                                        <CardTitle className="text-sm font-semibold text-slate-700">Genograma</CardTitle>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        {showGenogram ? (
                                            <ChevronUp className="w-4 h-4 text-slate-400" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-slate-400" />
                                        )}
                                    </Button>
                                </div>
                                <CardDescription className="text-xs mt-1">Mapa de relaciones familiares</CardDescription>
                            </CardHeader>

                            {showGenogram ? (
                                <CardContent className="p-0">
                                    <div className="h-[250px] border-t">
                                        <GenogramBuilder readOnly={false} />
                                    </div>
                                </CardContent>
                            ) : (
                                <CardContent className="px-4 pb-4 pt-0">
                                    <div
                                        className="h-20 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center cursor-pointer hover:from-purple-50 hover:to-indigo-50 transition-colors group"
                                        onClick={() => setShowGenogram(true)}
                                    >
                                        <div className="text-center">
                                            <Network className="w-6 h-6 text-slate-300 mx-auto mb-1 group-hover:text-purple-400 transition-colors" />
                                            <span className="text-xs text-slate-400 group-hover:text-purple-600 transition-colors">Click para expandir</span>
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Treatment Progress */}
                        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-emerald-50/30">
                            <CardHeader className="pb-2 pt-4 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <CardTitle className="text-sm font-semibold text-slate-700">Progreso</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-500">Sesiones completadas</span>
                                        <span className="font-semibold text-slate-700">{sessions.length}</span>
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                                            style={{ width: `${Math.min((sessions.length / 12) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <div className="text-center p-2 rounded-lg bg-white/60">
                                        <p className="text-lg font-bold text-slate-800">{sessions.length}</p>
                                        <p className="text-[10px] text-slate-500 uppercase">Sesiones</p>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-white/60">
                                        <p className="text-lg font-bold text-slate-800">
                                            {sessions.filter(s => s.ai_insights).length}
                                        </p>
                                        <p className="text-[10px] text-slate-500 uppercase">Con Insights</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}
