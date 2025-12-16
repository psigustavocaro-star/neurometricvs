'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GuidedGenogramBuilder } from './guided-genogram-builder'
import {
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
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400">
                                    <Target className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">Estado Actual</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-3">
                            <div>
                                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Diagnóstico / Motivo</p>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">{diagnosis || 'En proceso de evaluación'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-xs px-2 py-0.5">
                                    Bajo / Estable
                                </Badge>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">Riesgo clínico</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Last Session Card */}
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-950/30 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">Última Sesión</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            {lastSession ? (
                                <div className="space-y-2">
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                        {format(new Date(lastSession.date), "d 'de' MMMM, yyyy", { locale: es })}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-xs px-2 py-0.5">
                                            {lastSession.type || 'Sesión Regular'}
                                        </Badge>
                                        {lastSession.duration && (
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{lastSession.duration} min</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">Sin sesiones registradas</p>
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



                        {/* Sessions with Insights */}
                        <Card className="border-0 shadow-sm overflow-hidden dark:bg-slate-800">
                            <CardHeader className="pb-2 pt-4 px-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Evolución del Proceso</CardTitle>
                                    </div>
                                    <Badge variant="outline" className="text-slate-500 dark:text-slate-400 dark:border-slate-600 text-xs">
                                        {sessions.length} sesiones
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {recentSessions.length > 0 ? (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {recentSessions.map((session, index) => (
                                            <div
                                                key={session.id}
                                                className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group"
                                                onClick={onStartSession}
                                            >
                                                <div className="flex gap-4">
                                                    {/* Timeline indicator */}
                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-teal-500 ring-4 ring-teal-100 dark:ring-teal-900' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                                        {index < recentSessions.length - 1 && (
                                                            <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-600 mt-2" />
                                                        )}
                                                    </div>

                                                    {/* Session content */}
                                                    <div className="flex-1 min-w-0 pb-2">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                                                                {format(new Date(session.date), "d 'de' MMMM, yyyy", { locale: es })}
                                                            </span>
                                                            <Badge variant="outline" className="text-[10px] bg-white dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600">
                                                                {session.type || 'Sesión'}
                                                            </Badge>
                                                        </div>

                                                        {/* Session notes preview */}
                                                        {session.notes && (
                                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                                                                {session.notes.substring(0, 120)}...
                                                            </p>
                                                        )}

                                                        {/* AI Insights if available */}
                                                        {session.ai_insights && (
                                                            <div className="mt-2 p-2 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/30 border border-teal-100 dark:border-teal-800">
                                                                <div className="flex items-center gap-1.5 mb-1">
                                                                    <Lightbulb className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                                                    <span className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 uppercase">Observación Clave</span>
                                                                </div>
                                                                <p className="text-xs text-teal-900 dark:text-teal-200 line-clamp-2">
                                                                    {session.ai_insights.summary || session.ai_insights.key_themes || 'Análisis disponible'}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-500 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mx-auto mb-3 flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Sin sesiones registradas aún</p>
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



                        {/* Treatment Progress */}
                        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800 dark:to-emerald-950/30">
                            <CardHeader className="pb-2 pt-4 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Progreso</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-500 dark:text-slate-400">Sesiones completadas</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{sessions.length}</span>
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                                            style={{ width: `${Math.min((sessions.length / 12) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <div className="text-center p-2 rounded-lg bg-white/60 dark:bg-slate-700/60">
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">{sessions.length}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Sesiones</p>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-white/60 dark:bg-slate-700/60">
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">
                                            {sessions.filter(s => s.ai_insights).length}
                                        </p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Con Notas</p>
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
