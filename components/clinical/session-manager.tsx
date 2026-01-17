'use client'

import { useState, useEffect } from 'react'
import { useAdminStore } from '@/lib/stores/admin-store'
import { ClinicalSession, AIInsight } from '@/types/clinical'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createSession, updateSession, deleteSession } from "@/app/[locale]/patients/clinical-actions"
import { FirstSessionForm } from './first-session-form'
import { SessionTimeline } from './session-timeline'
import { SessionTimer } from './session-timer'
import { toast } from "sonner"
import { InSessionTestRunner } from './in-session-test-runner'
// @ts-ignore
import ClinicalSessionRecorder from './ClinicalSessionRecorder'
import { useTranslations } from 'next-intl'
import { Plus, Save, Loader2, Pill, Brain, Mic, ClipboardList, ChevronDown, Trash2 } from 'lucide-react'

interface SessionManagerProps {
    patientId: string
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    patientName: string
    embedded?: boolean
    preSelectedSessionId?: string | null
    userSpecialty?: string
}

export function SessionManager({ patientId, sessions, patientName, embedded, preSelectedSessionId, userSpecialty = 'psychologist' }: SessionManagerProps) {
    const t = useTranslations('Dashboard.Patients.Sessions')
    const [showFirstSessionForm, setShowFirstSessionForm] = useState(sessions.length === 0)
    // Default to 'new' if we have sessions but want to encourage input, OR select latest.
    // User wants to see sessions, so let's default to no selection (overview) or latest.
    // Let's default to 'new' so they can prep the next session immediately, or latest if they are reviewing.
    // Use preSelectedSessionId if provided, otherwise default logic
    const [selectedSessionId, setSelectedSessionId] = useState<string | 'new' | null>(
        preSelectedSessionId || (sessions.length > 0 ? sessions[0].id : 'new')
    )

    // Sync with prop changes (e.g. when clicking sidebar from outside)
    useEffect(() => {
        if (preSelectedSessionId) {
            const session = sessions.find(s => s.id === preSelectedSessionId)
            if (session) {
                setSelectedSessionId(session.id)
                setFormData({
                    date: new Date(session.date).toISOString().split('T')[0],
                    duration: session.duration,
                    type: session.type,
                    notes: session.notes || ''
                })
            }
        }
    }, [preSelectedSessionId, sessions])

    const [loading, setLoading] = useState(false)
    const [aiReport, setAiReport] = useState<string | null>(null)

    // Load AI report if viewing an existing session
    useEffect(() => {
        if (selectedSessionId && selectedSessionId !== 'new') {
            const session = sessions.find(s => s.id === selectedSessionId)
            if (session?.ai_insights?.analysis) {
                setAiReport(session.ai_insights.analysis)
            } else {
                setAiReport(null)
            }
        } else {
            setAiReport(null)
        }
    }, [selectedSessionId, sessions])

    const [formData, setFormData] = useState<Partial<ClinicalSession>>({
        date: new Date().toISOString().split('T')[0],
        duration: 45,
        type: 'regular',
        notes: ''
    })

    const [showRecorder, setShowRecorder] = useState(false)
    const [showTimeline, setShowTimeline] = useState(true)

    const [showEvaluator, setShowEvaluator] = useState(false)

    const handleSessionAnalysis = (data: { transcription: string, analysis: string, duration: number }) => {
        setAiReport(data.analysis) // Keep AI report separate for view
        setFormData(prev => ({
            ...prev,
            duration: Math.max(prev.duration || 0, Math.ceil(data.duration / 60))
        }))
        setShowRecorder(false)
        toast.success(t('messages.created'))
    }

    // Listen for Admin Mock Injection
    const { fillFormTrigger } = useAdminStore()
    useEffect(() => {
        if (fillFormTrigger > 0 && selectedSessionId === 'new') {
            setFormData({
                ...formData,
                notes: t('mock_notes'),
                duration: 50,
                type: t('types.regular')
            })
        }
    }, [fillFormTrigger])

    // Handle Selection
    const handleSelectSession = (session: ClinicalSession) => {
        setSelectedSessionId(session.id)
        setFormData({
            date: new Date(session.date).toISOString().split('T')[0],
            duration: session.duration,
            type: session.type,
            notes: session.notes || ''
        })
    }

    const handleNewSession = () => {
        setSelectedSessionId('new')
        setFormData({
            date: new Date().toISOString().split('T')[0],
            duration: 45,
            type: t('types.regular'),
            notes: ''
        })
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            if (selectedSessionId === 'new') {
                await createSession(patientId, formData)
                toast.success(t('messages.created'))
                // In a real app we'd get the ID back to select it, but revalidation handles UI update
                // We'll keep 'new' mode or reset
                setFormData({ ...formData, notes: '' })
            } else if (selectedSessionId) {
                await updateSession(selectedSessionId, formData)
                toast.success(t('messages.updated'))
            }
        } catch (error) {
            toast.error(t('messages.error'))
        } finally {
            setLoading(false)
        }
    }


    const selectedSession = sessions.find(s => s.id === selectedSessionId)

    const handleFirstSessionComplete = () => {
        setShowFirstSessionForm(false)
        toast.success(t('messages.first_completed'))
        window.location.reload()
    }

    const handleDelete = async () => {
        if (!selectedSessionId || selectedSessionId === 'new') return

        if (confirm(t('messages.confirm_delete'))) {
            setLoading(true)
            try {
                await deleteSession(selectedSessionId)
                toast.success(t('messages.deleted'))
                handleNewSession() // Reset to new session
            } catch (error) {
                console.error("Error deleting session:", error)
                toast.error(t('messages.error_delete'))
            } finally {
                setLoading(false)
            }
        }
    }

    // Special First Session Flow
    if (showFirstSessionForm) {
        return (
            <div className="h-full overflow-y-auto bg-slate-50/50 dark:bg-slate-950 p-6 transition-colors duration-300">
                <FirstSessionForm
                    patientId={patientId}
                    patientName={patientName}
                    onComplete={handleFirstSessionComplete}
                />
            </div>
        )
    }

    return (
        <div className={`grid grid-cols-1 ${showTimeline ? 'lg:grid-cols-[280px_1fr]' : 'lg:grid-cols-1'} h-full overflow-hidden overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 w-full max-w-full`}>

            {/* 1. Timeline (Left) */}
            {showTimeline && (
                <div className="hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full overflow-hidden transition-colors duration-300 animate-in slide-in-from-left duration-300">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10 shrink-0">
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm tracking-tight">{t('timeline')}</span>
                        <Button size="sm" variant="ghost" onClick={handleNewSession} className="h-8 w-8 p-0 hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-cyan-400 rounded-full transition-colors">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                    <ScrollArea className="flex-1">
                        <SessionTimeline
                            sessions={sessions}
                            selectedSessionId={selectedSessionId}
                            onSelectSession={handleSelectSession}
                        />
                    </ScrollArea>
                </div>
            )}

            {/* 2. Main Workspace (Center) */}
            <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden overflow-x-hidden relative shadow-sm z-0 transition-colors duration-300 w-full max-w-full">
                {/* Mobile Header for Timeline Toggle could go here */}

                <div className="flex-none px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 lg:gap-0 justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowTimeline(!showTimeline)}
                            className="hidden lg:flex h-8 w-8 p-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title={showTimeline ? "Ocultar Línea de Tiempo" : "Mostrar Línea de Tiempo"}
                        >
                            {showTimeline ? <ChevronDown className="w-5 h-5 rotate-90" /> : <ChevronDown className="w-5 h-5 -rotate-90" />}
                        </Button>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                {selectedSessionId === 'new' ? t('new_session') : t('session_date', { date: new Date(formData.date!).toLocaleDateString() })}
                            </h2>
                            {selectedSessionId === 'new' && <p className="text-xs text-slate-500 dark:text-slate-400">{t('registering_evolution')}</p>}
                        </div>
                    </div>

                    {/* Session Timer (Only for new sessions) */}
                    {selectedSessionId === 'new' && (
                        <div className="flex items-center gap-2 mx-4">
                            <SessionTimer
                                initialDurationMinutes={formData.duration}
                                onDurationChange={(mins) => setFormData(prev => ({ ...prev, duration: mins }))}
                            />

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

                            <Button
                                size="sm"
                                variant={showRecorder ? "secondary" : "outline"}
                                className={`gap-2 ${showRecorder ? "bg-indigo-100 text-indigo-700 border-indigo-200" : ""}`}
                                onClick={() => setShowRecorder(!showRecorder)}
                            >
                                <Mic className="w-4 h-4" />
                                <span className="hidden sm:inline">{showRecorder ? t('hide_recording') : t('record_session')}</span>
                            </Button>

                            <Button
                                size="sm"
                                variant={showEvaluator ? "secondary" : "outline"}
                                className={`gap-2 ${showEvaluator ? "bg-blue-100 text-blue-700 border-blue-200" : ""}`}
                                onClick={() => setShowEvaluator(!showEvaluator)}
                            >
                                <ClipboardList className="w-4 h-4" />
                                <span className="hidden sm:inline">{t('perform_evaluation')}</span>
                            </Button>
                        </div>
                    )}

                    <Button onClick={handleSave} disabled={loading} className="bg-teal-600 hover:bg-teal-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white shadow-sm transition-all hover:scale-105 ml-auto">
                        {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                        <Save className="w-4 h-4 mr-2" />
                        {selectedSessionId === 'new' ? t('register') : t('save_changes')}
                    </Button>

                    {selectedSessionId !== 'new' && (
                        <Button onClick={handleDelete} disabled={loading} variant="destructive" className="ml-2 shadow-sm transition-all hover:scale-105">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}

                </div>

                {/* Profession-Specific Mode Banner */}
                {(() => {
                    const specialty = userSpecialty?.toLowerCase() || '';

                    // Check specific professions
                    const isPsychologist = specialty.includes('psychologist') || specialty.includes('psicólog');
                    const isPsychiatrist = specialty.includes('psychiatrist') || specialty.includes('psiquiatra');
                    const isNeurologist = specialty.includes('neurologist') || specialty.includes('neurólog');
                    const isPhysician = specialty.includes('physician') || specialty.includes('médic');
                    const isOccupationalTherapist = specialty.includes('occupational') || specialty.includes('terapeuta ocupacional');
                    const isSpeechTherapist = specialty.includes('speech') || specialty.includes('fonoaudiólog');
                    const isPsychopedagogue = specialty.includes('psychopedagogue') || specialty.includes('psicopedagog');
                    const isNutritionist = specialty.includes('nutritionist') || specialty.includes('nutricionista');

                    // Psychologists don't need a special mode banner - it's the default
                    if (isPsychologist || (!isPsychiatrist && !isNeurologist && !isPhysician && !isOccupationalTherapist && !isSpeechTherapist && !isPsychopedagogue && !isNutritionist)) {
                        return null;
                    }

                    let modeLabel = '';
                    if (isPsychiatrist) modeLabel = t('psychiatry_mode');
                    else if (isNeurologist) modeLabel = t('neurology_mode');
                    else if (isPhysician) modeLabel = 'Modo Médico';
                    else if (isOccupationalTherapist) modeLabel = 'Modo Terapia Ocupacional';
                    else if (isSpeechTherapist) modeLabel = 'Modo Fonoaudiología';
                    else if (isPsychopedagogue) modeLabel = 'Modo Psicopedagogía';
                    else if (isNutritionist) modeLabel = 'Modo Nutrición';

                    const ModeIcon = isPsychiatrist ? Pill : Brain;

                    return (
                        <div className="px-4 lg:px-6 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs transition-colors">
                            <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <ModeIcon className="w-3 h-3" /> {modeLabel}
                            </span>
                        </div>
                    );
                })()}

                <ScrollArea className="flex-1">
                    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8 pb-32 w-full">

                        {/* 0. Tools Area */}
                        {showRecorder && selectedSessionId === 'new' && (
                            <div className="animate-in slide-in-from-top-4 fade-in duration-300 mb-6 relative z-30">
                                <div className="absolute inset-x-0 -top-4 -bottom-4 bg-indigo-50/50 dark:bg-indigo-950/20 -z-10 rounded-2xl blur-xl" />
                                <ClinicalSessionRecorder
                                    patientName={patientName}
                                    onSaveSession={handleSessionAnalysis}
                                />
                            </div>
                        )}

                        {(showEvaluator || userSpecialty) && (
                            <div className={`transition-all duration-300 ${!showEvaluator && !userSpecialty ? 'hidden' : 'block'} mb-6`}>
                                {showEvaluator && (
                                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                                        <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                                            <ClipboardList className="w-4 h-4" />
                                            {t('evaluation_panel')}
                                        </h4>
                                        <InSessionTestRunner
                                            patientId={patientId}
                                            sessionId={selectedSessionId !== 'new' && selectedSessionId !== null ? selectedSessionId : undefined}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Editor Config */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{t('date')}</label>
                                <Input
                                    type="date"
                                    value={formData.date || ''}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{t('duration')}</label>
                                <Input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{t('type')}</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-cyan-500 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="regular">{t('types.regular')}</option>
                                    <option value="evaluation">{t('types.evaluation')}</option>
                                    <option value="crisis">{t('types.crisis')}</option>
                                    <option value="closure">{t('types.closure')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Note Editor */}
                        {/* Split View Editor */}
                        <div className={`grid grid-cols-1 ${aiReport ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-6 transition-all duration-500`}>
                            {/* Left: Manual Notes */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                                    {t('evolution_notes')}
                                    {aiReport && (
                                        <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                            Edición Manual
                                        </span>
                                    )}
                                </label>
                                <div className="relative group h-full">
                                    <div className="absolute inset-0 bg-teal-50/50 dark:bg-cyan-900/10 rounded-xl -z-10 group-hover:scale-[1.01] transition-transform duration-500" />
                                    <Textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="h-full min-h-[600px] p-6 text-lg leading-relaxed border-slate-200 dark:border-slate-800 focus:border-teal-400 dark:focus:border-cyan-500 focus:ring-0 shadow-sm rounded-xl resize-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-normal"
                                        placeholder={t('notes_placeholder')}
                                    />
                                </div>
                            </div>

                            {/* Right: AI Report (Read-only / Reference) */}
                            {aiReport && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <label className="text-sm font-bold text-indigo-700 dark:text-indigo-300 flex justify-between items-center">
                                        <span>Generado por IA</span>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-6 text-xs text-indigo-600 hover:bg-indigo-50"
                                            onClick={() => setFormData(p => ({ ...p, notes: (p.notes ? p.notes + '\n\n' : '') + aiReport }))}
                                        >
                                            Copiar a Notas
                                        </Button>
                                    </label>
                                    <div className="h-full min-h-[500px] p-6 rounded-xl border border-indigo-100 bg-white/80 dark:bg-slate-900/50 shadow-sm overflow-y-auto">
                                        <div className="prose prose-sm max-w-none dark:prose-invert prose-indigo whitespace-pre-wrap text-slate-600">
                                            {aiReport}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* EXPERT FIELDS */}
                        {(userSpecialty?.includes('psychiatrist') || userSpecialty?.includes('psiquiatra')) && (
                            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Pill className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                    {t('pharmacological_notes')}
                                </label>
                                <Textarea
                                    placeholder={t('pharmacological_placeholder')}
                                    className="min-h-[100px] bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/50 focus:border-indigo-400 focus:ring-indigo-100 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                />
                            </div>
                        )}

                        {(userSpecialty?.includes('neurologist') || userSpecialty?.includes('neurologo')) && (
                            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                    {t('neurological_notes')}
                                </label>
                                <Textarea
                                    placeholder={t('neurological_placeholder')}
                                    className="min-h-[100px] bg-blue-50/30 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50 focus:border-blue-400 focus:ring-blue-100 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                />
                            </div>
                        )}

                    </div>
                </ScrollArea>
            </div>


        </div >
    )
}
