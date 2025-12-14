'use client'

import { useState } from 'react'
import { ClinicalRecord, ClinicalSession, AIInsight } from '@/types/clinical'
import { SessionManager } from './session-manager'
import { TreatmentPlan } from './treatment-plan'
import { DocumentsGenerator } from './documents-generator'
import { GuidedGenogramBuilder } from './guided-genogram-builder'
import { PatientOverview } from './patient-overview'
import { PatientHistory } from '@/components/patients/patient-history'
import { SentTestsList } from '@/components/patients/sent-tests-list'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    LayoutDashboard,
    MessageSquare,
    FileText,
    Network,
    Files,
    Settings,
    Calendar,
    Clock,
    AlertCircle,
    ChevronRight,
    Plus
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface PatientDashboardProps {
    patient: any
    clinicalRecord: ClinicalRecord | null
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    testResults: any[]
    testAssignments?: any[]
}

type ViewState = 'overview' | 'session_manager' | 'tests' | 'documents' | 'genogram' | 'treatment'

export function PatientDashboard({ patient, clinicalRecord, sessions, testResults, testAssignments = [] }: PatientDashboardProps) {
    const [currentView, setCurrentView] = useState<ViewState>('overview')
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

    // Helper to switch views
    const handleViewChange = (view: ViewState) => {
        setCurrentView(view)
        setSelectedSessionId(null) // Reset session selection when changing modules
    }

    return (
        <div className="flex h-[calc(100vh-6rem)] bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden">

            {/* --- LEFT SIDEBAR: THE CHART (Expediente) --- */}
            <aside className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col flex-none z-20 shadow-md">

                {/* 1. Patient Identity Card */}
                <div className="p-6 bg-white border-b border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16 border-2 border-white shadow-sm ring-1 ring-slate-100">
                            <AvatarFallback className="bg-slate-800 text-white font-bold text-xl">
                                {patient.full_name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-bold text-slate-900 leading-tight text-lg">{patient.full_name}</h2>
                            <p className="text-xs text-slate-500 font-mono mt-1">ID: {patient.id.substring(0, 8)}...</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                        <div>
                            <span className="block text-slate-400 text-[10px] uppercase font-bold">Edad</span>
                            <span className="font-semibold text-slate-700">
                                {patient.birth_date ? `${new Date().getFullYear() - new Date(patient.birth_date).getFullYear()} años` : '-'}
                            </span>
                        </div>
                        <div>
                            <span className="block text-slate-400 text-[10px] uppercase font-bold">Diagnóstico</span>
                            <span className="font-semibold text-teal-700 truncate block" title={clinicalRecord?.diagnosis || 'En Evaluación'}>
                                {clinicalRecord?.diagnosis || 'En Evaluación'}
                            </span>
                        </div>
                    </div>

                    {/* Alerts/Status Tags */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                        <Badge variant="outline" className="bg-white text-xs font-normal border-slate-200">
                            {sessions.length} Sesiones
                        </Badge>
                        <Badge variant="outline" className="bg-white text-xs font-normal border-slate-200">
                            Activo
                        </Badge>
                    </div>
                </div>

                {/* 2. Primary Navigation (Modules) */}
                <nav className="p-2 grid grid-cols-4 gap-1 border-b border-slate-200 bg-white">
                    <Button
                        variant={currentView === 'overview' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-14 gap-1 rounded-md ${currentView === 'overview' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                        onClick={() => handleViewChange('overview')}
                        title="Resumen"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[9px] font-bold">Resumen</span>
                    </Button>
                    <Button
                        variant={currentView === 'session_manager' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-14 gap-1 rounded-md ${currentView === 'session_manager' ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                        onClick={() => handleViewChange('session_manager')}
                        title="Sesiones"
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-[9px] font-bold">Clínica</span>
                    </Button>
                    <Button
                        variant={currentView === 'tests' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-14 gap-1 rounded-md ${currentView === 'tests' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                        onClick={() => handleViewChange('tests')}
                        title="Evaluaciones"
                    >
                        <Files className="w-5 h-5" />
                        <span className="text-[9px] font-bold">Tests</span>
                    </Button>
                    <Button
                        variant={currentView === 'documents' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-14 gap-1 rounded-md ${currentView === 'documents' ? 'bg-amber-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                        onClick={() => handleViewChange('documents')}
                        title="Documentos"
                    >
                        <FileText className="w-5 h-5" />
                        <span className="text-[9px] font-bold">Docs</span>
                    </Button>
                </nav>

                {/* 3. The "Chart" Timeline (Historial Clinico) */}
                <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
                    <div className="px-4 py-3 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/50">
                        <span>Historial Clínico</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-200 rounded-full" onClick={() => handleViewChange('session_manager')}>
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="divide-y divide-slate-100">
                            {sessions.map(session => (
                                <button
                                    key={session.id}
                                    onClick={() => {
                                        setCurrentView('session_manager')
                                        // We might verify session selection logic later
                                    }}
                                    className="w-full text-left p-4 hover:bg-white transition-colors group relative"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-teal-400 transition-colors" />
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-700 text-sm">
                                            {format(new Date(session.date), "d MMM yyyy", { locale: es })}
                                        </span>
                                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                                            {session.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate pr-4">
                                        {session.notes || "Sin notas registradas..."}
                                    </p>
                                </button>
                            ))}
                            {sessions.length === 0 && (
                                <div className="p-8 text-center text-xs text-slate-400 italic">
                                    No hay historial registrado.
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </aside>

            {/* --- RIGHT: MAIN WORKSPACE --- */}
            <main className="flex-1 bg-slate-100/50 relative overflow-hidden flex flex-col min-w-0">

                {/* View Content Switcher */}
                <div className="flex-1 overflow-hidden relative">

                    {/* View: OVERVIEW */}
                    {currentView === 'overview' && (
                        <div className="h-full overflow-y-auto w-full">
                            <PatientOverview
                                patient={patient}
                                lastSession={sessions[0]}
                                diagnosis={clinicalRecord?.diagnosis || 'En evaluación'}
                                onStartSession={() => handleViewChange('session_manager')}
                            />
                        </div>
                    )}

                    {/* View: CLINICAL SESSION MANAGER */}
                    {currentView === 'session_manager' && (
                        <div className="h-full w-full bg-white">
                            {/* Note: SessionManager already has its own layout. 
                                 We might want to hide its specific sidebar if we use the global one, 
                                 but user requested "Ecosystem" inside.
                                 Let's keep SessionManager as is for now, but ensure it fits. 
                                 Actually, let's embed it fully. 
                              */}
                            <SessionManager
                                patientId={patient.id}
                                sessions={sessions}
                                patientName={patient.full_name}
                                embedded={true}
                            />
                        </div>
                    )}

                    {/* View: TESTS */}
                    {currentView === 'tests' && (
                        <div className="h-full overflow-y-auto p-8 w-full">
                            <div className="max-w-5xl mx-auto space-y-8">
                                <section>
                                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Network className="w-5 h-5 text-indigo-600" />
                                        Evaluaciones Pendientes (Test Remotos)
                                    </h2>
                                    <SentTestsList assignments={testAssignments} patientId={patient.id} />
                                </section>
                                <Separator />
                                <section>
                                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Files className="w-5 h-5 text-slate-600" />
                                        Historial de Resultados
                                    </h2>
                                    <PatientHistory results={testResults} patientId={patient.id} />
                                </section>
                            </div>
                        </div>
                    )}

                    {/* View: DOCUMENTS */}
                    {currentView === 'documents' && (
                        <div className="h-full overflow-y-auto p-6 w-full bg-white">
                            <DocumentsGenerator
                                patientId={patient.id}
                                patientName={patient.full_name}
                            />
                        </div>
                    )}

                </div>

            </main>

        </div>
    )
}
