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
    MessageSquare,
    Pill,
    Brain,
    Activity
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
    userSpecialty?: string
}

export function PatientOverview({ patient, lastSession, diagnosis, onStartSession, sessions = [], userSpecialty = 'psychologist' }: PatientOverviewProps) {
    const router = useRouter()
    const [showGenogram, setShowGenogram] = useState(false)

    // Get the most recent sessions with insights
    const recentSessions = sessions.slice(0, 5)

    return (
        <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="p-4 lg:p-6 space-y-6">

                {/* Top Row: Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Clinical Status Card */}
                    <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden relative group transition-all duration-300 hover:shadow-md">
                        <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                                    <Target className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Estado Actual</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-3">
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Diagnóstico Principal</p>
                                <p className="font-bold text-slate-900 dark:text-white text-base leading-tight">{diagnosis || 'En proceso de evaluación'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800/50 text-xs px-2 py-0.5 font-medium">
                                    Estable
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Last Session Card */}
                    <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden relative group transition-all duration-300 hover:shadow-md">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Última Sesión</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            {lastSession ? (
                                <div className="space-y-2">
                                    <p className="font-bold text-slate-900 dark:text-white text-base">
                                        {format(new Date(lastSession.date), "d 'de' MMMM, yyyy", { locale: es })}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/50 text-xs px-2 py-0.5 font-medium">
                                            {lastSession.type || 'Sesión Regular'}
                                        </Badge>
                                        {lastSession.duration && (
                                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{lastSession.duration} min</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">Sin sesiones registradas</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Action Card (Hero) */}
                    <Card
                        className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden relative group cursor-pointer hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-300"
                        onClick={onStartSession}
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 dark:bg-slate-700 group-hover:bg-teal-500 transition-colors"></div>
                        <CardContent className="p-4 flex flex-col justify-center h-full relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 transition-colors pointer-events-none">
                                    <UserPlus className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Nueva Sesión</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Registrar visita clínica</p>
                                </div>
                                <ArrowRight className="w-5 h-5 ml-auto text-slate-300 dark:text-slate-600 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Sessions Timeline - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* EXPERT CARDS: Psychiatry */}
                        {(userSpecialty?.includes('psychiatrist') || userSpecialty?.includes('psiquiatra')) && (
                            <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-sm bg-indigo-50/30 dark:bg-indigo-950/20">
                                <CardHeader className="pb-2 pt-4 px-4 bg-transparent border-b border-indigo-100 dark:border-indigo-900/30">
                                    <div className="flex items-center gap-2">
                                        <Pill className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                        <CardTitle className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Tratamiento Farmacológico</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 py-3">
                                    <div className="flex gap-2 flex-wrap">
                                        {['Sertralina 50mg', 'Quetiapina 25mg (SOS)'].map((med, i) => (
                                            <Badge key={i} variant="secondary" className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800 text-slate-700 dark:text-indigo-300 hover:bg-white cursor-default">
                                                {med}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* EXPERT CARDS: Neurology */}
                        {(userSpecialty?.includes('neurologist') || userSpecialty?.includes('neurologo')) && (
                            <Card className="border border-blue-100 dark:border-blue-900/50 shadow-sm bg-blue-50/30 dark:bg-blue-950/20">
                                <CardHeader className="pb-2 pt-4 px-4 bg-transparent border-b border-blue-100 dark:border-blue-900/30">
                                    <div className="flex items-center gap-2">
                                        <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        <CardTitle className="text-sm font-bold text-blue-900 dark:text-blue-200">Evolución Cognitiva</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 py-3">
                                    <div className="flex items-end gap-2 h-16 w-full max-w-xs">
                                        {[24, 25, 26, 26, 27].map((score, i) => (
                                            <div key={i} className="flex-1 bg-blue-100 dark:bg-blue-900/40 rounded-t-sm relative group">
                                                <div
                                                    className="absolute bottom-0 w-full bg-blue-500 dark:bg-blue-500 rounded-t-sm transition-all duration-500"
                                                    style={{ height: `${(score / 30) * 100}%` }}
                                                />
                                                <div className="absolute -top-6 w-full text-center text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 font-bold">
                                                    {score}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wide">Tendencia MMSE: Ascendente</p>
                                </CardContent>
                            </Card>
                        )}



                        {/* Sessions with Insights */}
                        <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                            <CardHeader className="pb-3 pt-4 px-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                        <CardTitle className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide">Historial de Sesiones</CardTitle>
                                    </div>
                                    <Badge variant="outline" className="text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-[10px] px-2">
                                        Total: {sessions.length}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {recentSessions.length > 0 ? (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                        {recentSessions.map((session, index) => (
                                            <div
                                                key={session.id}
                                                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                                onClick={onStartSession}
                                            >
                                                <div className="flex gap-4">
                                                    {/* Timeline indicator */}
                                                    <div className="flex flex-col items-center pt-1">
                                                        <div className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                                        {index < recentSessions.length - 1 && (
                                                            <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-1" />
                                                        )}
                                                    </div>

                                                    {/* Session content */}
                                                    <div className="flex-1 min-w-0 pb-2">
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                                                {format(new Date(session.date), "d 'de' MMMM, yyyy", { locale: es })}
                                                            </span>
                                                            <Badge variant="secondary" className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                                                {session.type || 'Sesión'}
                                                            </Badge>
                                                        </div>

                                                        {/* Session notes preview */}
                                                        {session.notes && (
                                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                                                                {session.notes}
                                                            </p>
                                                        )}

                                                        {/* AI Insights if available */}
                                                        {session.ai_insights && (
                                                            <div className="p-3 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
                                                                <div className="flex items-center gap-1.5 mb-1.5">
                                                                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                                                                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Insight AI</span>
                                                                </div>
                                                                <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                                                                    "{session.ai_insights.summary || session.ai_insights.key_themes || 'Análisis disponible'}"
                                                                </p>
                                                            </div>
                                                        )}

                                                        <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <span className="text-xs font-medium text-teal-600 dark:text-teal-400 flex items-center gap-1">Ver detalles <ArrowRight className="w-3 h-3" /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 mx-auto mb-3 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                            <MessageSquare className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">No hay sesiones registradas</p>
                                        <Button size="sm" onClick={onStartSession} className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Iniciar Primera Sesión
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar - Stats */}
                    <div className="space-y-4">
                        {/* Treatment Progress */}
                        <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader className="pb-2 pt-4 px-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Progreso</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 py-4 space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Continuidad</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{Math.min((sessions.length / 12) * 100, 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-teal-500 dark:bg-teal-400 transition-all duration-500"
                                            style={{ width: `${Math.min((sessions.length / 12) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <p className="text-2xl font-bold text-slate-800 dark:text-white mb-0.5">{sessions.length}</p>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Sesiones</p>
                                    </div>
                                    <div className="text-center p-3 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <p className="text-2xl font-bold text-slate-800 dark:text-white mb-0.5">
                                            {sessions.filter(s => s.ai_insights).length}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Con Análisis</p>
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
