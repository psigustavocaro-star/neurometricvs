'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GenogramBuilder } from './genogram-builder'
import { CalendarDays, AlertTriangle, FileText, Brain, ArrowRight, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PatientOverviewProps {
    patient: any
    lastSession: any
    diagnosis: string
    onStartSession: () => void
}

export function PatientOverview({ patient, lastSession, diagnosis, onStartSession }: PatientOverviewProps) {
    const router = useRouter()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-6 bg-slate-50/50">
            {/* Left Column: Context & Risks */}
            <div className="space-y-6 lg:col-span-1">
                {/* Immediate Clinical Snapshot */}
                <Card className="border-l-4 border-l-teal-500 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-slate-800">Estado Actual</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Diagnóstico / Motivo</p>
                            <p className="font-semibold text-slate-900">{diagnosis || 'En proceso de evaluación'}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Riesgo Clínico</p>
                            {/* Logic to determine risk could be complex, hardcoding Safe/Low for now */}
                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 px-3 py-1">
                                Bajo / Estable
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Suggestions for Today */}
                <Card className="bg-indigo-50/50 border-indigo-100 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-indigo-700 text-base">
                            <Brain className="w-5 h-5" />
                            Sugerencias para Hoy
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-indigo-900 leading-relaxed">
                            {lastSession?.date
                                ? `Basado en tu última sesión (${new Date(lastSession.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}), te sugerimos profundizar en:`
                                : 'Para tu próxima sesión, considera explorar:'}
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-indigo-800">
                            <li className="flex gap-2 items-start">
                                <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                Evaluar adherencia a tarea de registro emocional.
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                Explorar conflicto familiar mencionado al cierre.
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Center/Right: Genogram & Activity */}
            <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
                {/* Interactive Genogram Area */}
                <div className="flex-1 min-h-[400px]">
                    <GenogramBuilder
                        // Hook up to real data later
                        readOnly={false}
                    />
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Últimas Sesiones</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Placeholder list */}
                            <div className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded transition cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="bg-teal-100 p-1.5 rounded text-teal-700"><FileText className="w-4 h-4" /></div>
                                    <div>
                                        <p className="font-medium">Sesión de Seguimiento</p>
                                        <p className="text-slate-500 text-xs">Ayer</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-center items-center p-6 space-y-4 border-dashed border-2">
                        <div className="text-center space-y-2">
                            <h4 className="font-medium text-slate-900">Nueva Sesión</h4>
                            <p className="text-sm text-slate-500">Registrar visita del paciente.</p>
                        </div>
                        <Button className="w-full bg-slate-900 hover:bg-teal-600 transition-colors" onClick={onStartSession}>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Iniciar Sesión
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
