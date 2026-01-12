'use client'

import { useState } from 'react'
import { ClinicalRecord, ClinicalSession, AIInsight } from '@/types/clinical'
import { SessionManager } from './session-manager'
import { PatientOverview } from './patient-overview'
import { PatientHistory } from '@/components/patients/patient-history'
import { AdminTools } from '@/components/admin/admin-tools'
import { useAdminStore } from '@/lib/stores/admin-store'
import { useEffect } from 'react'
import { SentTestsList } from '@/components/patients/sent-tests-list'
import { GuidedGenogramBuilder } from './guided-genogram-builder'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    LayoutDashboard,
    MessageSquare,
    Network,
    Files,
    Plus,
    Search
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useTranslations, useFormatter } from 'next-intl'

interface PatientDashboardProps {
    patient: any
    clinicalRecord: ClinicalRecord | null
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    testResults: any[]
    testAssignments?: any[]
    userProfile?: any
    vitalsLogs?: any[]
    medications?: any[]
}

const LoaderIcon = ({ type }: { type?: string }) => {
    // Simple mapping for icon or just a dot if no icon needed
    if (!type) return <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />

    return (
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {type}
        </span>
    )
}

// Helper for highlighting text
const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
    if (!highlight.trim()) return <span>{text}</span>

    // Escape regex characters
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-slate-900 dark:text-yellow-100 font-medium rounded-sm px-0.5">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
}

type ViewState = 'overview' | 'session_manager' | 'tests' | 'documents' | 'genogram' | 'treatment'

export function PatientDashboard({ patient, clinicalRecord, sessions, testResults, testAssignments = [], userProfile }: PatientDashboardProps) {
    const t = useTranslations('Dashboard.Patients.Dashboard')
    const format = useFormatter()
    const [currentView, setCurrentView] = useState<ViewState>('overview')
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    // Admin / Simulation Logic
    const { currentRole, setRole, isSimulating } = useAdminStore()

    // Effective Specialty: Uses simulation if active, otherwise user profile
    const effectiveSpecialty = isSimulating ? currentRole : (userProfile?.specialty || 'psychologist')
    const isPsychiatrist = effectiveSpecialty === 'psychiatrist' || effectiveSpecialty?.includes('psiquiatra')
    const isNeurologist = effectiveSpecialty === 'neurologist' || effectiveSpecialty?.includes('neurologo')

    // Initialize store with actual user role once
    useEffect(() => {
        if (!isSimulating && userProfile?.specialty) {
            // Map raw specialty to role enum if possible, or just keep string
            // For now we trust the store default or user interaction
        }
    }, [userProfile, isSimulating])

    // Filter sessions based on search
    const filteredSessions = sessions.filter(session => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        const dateStr = format.dateTime(new Date(session.date), {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).toLowerCase()
        return (
            (session.notes && session.notes.toLowerCase().includes(query)) ||
            (session.type && session.type.toLowerCase().includes(query)) ||
            dateStr.includes(query)
        )
    })

    // Helper to switch views
    const handleViewChange = (view: ViewState) => {
        setCurrentView(view)
        setSelectedSessionId(null) // Reset session selection when changing modules
    }

    return (
        <div className="flex h-[calc(100vh-6rem)] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-xl overflow-hidden">

            {/* --- LEFT SIDEBAR: THE CHART (Expediente) --- */}
            <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col flex-none z-20 shadow-sm dark:shadow-xl transition-colors duration-300">

                {/* 1. Patient Identity Card */}
                <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative z-10 group transition-colors duration-300">
                    {/* Subtle Top Brand Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-500 dark:from-cyan-600 dark:to-teal-600"></div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <Avatar className="h-16 w-16 border-4 border-slate-50 dark:border-slate-800 shadow-md ring-1 ring-slate-200 dark:ring-slate-700">
                                <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-cyan-400 font-bold text-xl">
                                    {patient.full_name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {/* Online Status Indicator */}
                            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-bold text-slate-900 dark:text-white leading-tight text-lg truncate tracking-tight">{patient.full_name}</h2>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{t('clinical_record')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                        <div>
                            <span className="block text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-wide">{t('age')}</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                                {patient.birth_date ? `${new Date().getFullYear() - new Date(patient.birth_date).getFullYear()} ${t('age_suffix')}` : '-'}
                            </span>
                        </div>
                        <div>
                            <span className="block text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-wide">{t('diagnosis')}</span>
                            <span className="font-semibold text-teal-600 dark:text-cyan-400 truncate block text-sm" title={clinicalRecord?.diagnosis || t('under_evaluation')}>
                                {clinicalRecord?.diagnosis || t('under_evaluation')}
                            </span>
                        </div>
                    </div>

                    {/* Alerts/Status Tags */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                        <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800/50 text-xs font-medium border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                            {t('sessions_count', { count: sessions.length })}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/10 text-xs font-medium border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
                            {t('active')}
                        </Badge>
                    </div>
                </div>

                {/* 2. Primary Navigation (Modules) */}
                <nav className="p-3 grid grid-cols-2 gap-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                    <Button
                        variant={currentView === 'overview' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-16 gap-1.5 rounded-lg border transition-all duration-200 ${currentView === 'overview'
                            ? 'bg-white dark:bg-slate-800 border-teal-200 dark:border-slate-700 shadow-sm text-teal-700 dark:text-cyan-400'
                            : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                        onClick={() => handleViewChange('overview')}
                        title={t('nav.overview')}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">{t('nav.overview')}</span>
                    </Button>
                    <Button
                        variant={currentView === 'session_manager' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-16 gap-1.5 rounded-lg border transition-all duration-200 ${currentView === 'session_manager'
                            ? 'bg-white dark:bg-slate-800 border-teal-200 dark:border-slate-700 shadow-sm text-teal-700 dark:text-cyan-400'
                            : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                        onClick={() => handleViewChange('session_manager')}
                        title={t('nav.clinical')}
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">{t('nav.clinical')}</span>
                    </Button>
                    <Button
                        variant={currentView === 'tests' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-16 gap-1.5 rounded-lg border transition-all duration-200 ${currentView === 'tests'
                            ? 'bg-white dark:bg-slate-800 border-teal-200 dark:border-slate-700 shadow-sm text-teal-700 dark:text-cyan-400'
                            : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                        onClick={() => handleViewChange('tests')}
                        title={t('nav.tests')}
                    >
                        <Files className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">{t('nav.tests')}</span>
                    </Button>
                    <Button
                        variant={currentView === 'genogram' ? 'default' : 'ghost'}
                        size="sm"
                        className={`flex flex-col h-16 gap-1.5 rounded-lg border transition-all duration-200 ${currentView === 'genogram'
                            ? 'bg-white dark:bg-slate-800 border-teal-200 dark:border-slate-700 shadow-sm text-teal-700 dark:text-cyan-400'
                            : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                        onClick={() => handleViewChange('genogram')}
                        title={t('nav.family')}
                    >
                        <Network className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">{t('nav.family')}</span>
                    </Button>
                </nav>

                {/* 3. The "Chart" Timeline (Historial Clinico) */}
                <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-950/50">
                    <div className="px-5 py-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[10px]">{t('session_history')}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-cyan-400 rounded-full transition-colors"
                                onClick={() => {
                                    handleViewChange('session_manager')
                                    setSelectedSessionId('new')
                                }}
                                title={t('new_session')}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-teal-500 dark:group-focus-within:text-cyan-400 transition-colors" />
                            <Input
                                placeholder={t('search_placeholder')}
                                className="h-9 pl-9 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus-visible:ring-1 focus-visible:ring-teal-500 dark:focus-visible:ring-cyan-500 focus-visible:border-teal-500 dark:focus-visible:border-cyan-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 rounded-lg shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/50 px-2 pb-2">
                            {filteredSessions.map(session => (
                                <button
                                    key={session.id}
                                    onClick={() => {
                                        setSelectedSessionId(session.id)
                                        setCurrentView('session_manager')
                                    }}
                                    className={`w-full text-left p-3 rounded-lg mb-1 transition-all duration-200 group border ${selectedSessionId === session.id ? 'bg-white dark:bg-slate-800 border-teal-200 dark:border-slate-700 shadow-sm' : 'border-transparent hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm'}`}
                                >
                                    <div className="flex justify-between items-start mb-1.5">
                                        <span className={`font-bold text-sm ${selectedSessionId === session.id ? 'text-teal-700 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                            {format.dateTime(new Date(session.date), { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                        <LoaderIcon type={session.type} />
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 truncate pr-2 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors line-clamp-2 leading-relaxed">
                                        {session.notes ? (
                                            <HighlightText text={session.notes} highlight={searchQuery} />
                                        ) : <span className="italic opacity-70">{t('no_notes')}</span>}
                                    </p>
                                </button>
                            ))}
                            {sessions.length === 0 && (
                                <div className="p-8 text-center flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                        <Files className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-500">{t('no_history')}</span>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </aside>

            {/* --- RIGHT: MAIN WORKSPACE --- */}
            <main className="flex-1 bg-slate-100/50 dark:bg-slate-950 relative overflow-hidden flex flex-col min-w-0">

                {/* View Content Switcher */}
                <div className="flex-1 overflow-hidden relative">

                    {/* View: OVERVIEW */}
                    {
                        currentView === 'overview' && (
                            <div className="h-full overflow-y-auto w-full">
                                <PatientOverview
                                    patient={patient}
                                    clinicalRecord={clinicalRecord}
                                    lastSession={sessions[0]}
                                    diagnosis={clinicalRecord?.diagnosis || t('under_evaluation')}
                                    onStartSession={() => handleViewChange('session_manager')}
                                    sessions={sessions}
                                    userSpecialty={effectiveSpecialty} // Pass effective specialty
                                    vitalsLogs={vitalsLogs}
                                    medications={medications}
                                />
                            </div>
                        )
                    }

                    {/* View: CLINICAL SESSION MANAGER */}
                    {
                        currentView === 'session_manager' && (
                            <div className="h-full w-full bg-white dark:bg-slate-950">
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
                                    preSelectedSessionId={selectedSessionId}

                                    userSpecialty={effectiveSpecialty}
                                />
                            </div>
                        )
                    }

                    {/* View: TESTS */}
                    {
                        currentView === 'tests' && (
                            <div className="h-full overflow-y-auto p-8 w-full">
                                <div className="max-w-5xl mx-auto space-y-8">
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                            {t('remote_evaluations')}
                                        </h2>
                                        <SentTestsList assignments={testAssignments} patientId={patient.id} />
                                    </section>
                                    <Separator />
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Files className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                            {t('results_history')}
                                        </h2>
                                        <PatientHistory results={testResults} patientId={patient.id} />
                                    </section>
                                </div>
                            </div>
                        )
                    }

                    {/* View: GENOGRAM */}
                    {
                        currentView === 'genogram' && (
                            <div className="h-full overflow-y-auto bg-white dark:bg-slate-950">
                                <GuidedGenogramBuilder
                                    patientName={patient.full_name}
                                    patientGender={patient.gender || 'male'}
                                    embedded={false} // Full view
                                />
                            </div>
                        )
                    }
                </div>

            </main>

        </div>
    )
}
