'use client'

import { useState, useEffect } from 'react'
import { useAdminStore } from '@/lib/stores/admin-store'
import { ClinicalSession, AIInsight } from '@/types/clinical'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createSession, updateSession } from "@/app/[locale]/patients/clinical-actions"
import { FirstSessionForm } from './first-session-form'
import { SessionTimeline } from './session-timeline'
import { SessionTimer } from './session-timer'
import { toast } from "sonner"
import { InSessionTestRunner } from './in-session-test-runner'
import { useTranslations } from 'next-intl'

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

    const [formData, setFormData] = useState<Partial<ClinicalSession>>({
        date: new Date().toISOString().split('T')[0],
        duration: 45,
        type: 'regular',
        notes: ''
    })

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
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] h-full overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

            {/* 1. Timeline (Left) */}
            <div className="hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full overflow-hidden transition-colors duration-300">
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

            {/* 2. Main Workspace (Center) */}
            <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden relative shadow-sm z-0 transition-colors duration-300">
                {/* Mobile Header for Timeline Toggle could go here */}

                <div className="flex-none px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-20">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {selectedSessionId === 'new' ? t('new_session') : t('session_date', { date: new Date(formData.date!).toLocaleDateString() })}
                        </h2>
                        {selectedSessionId === 'new' && <p className="text-xs text-slate-500 dark:text-slate-400">{t('registering_evolution')}</p>}
                    </div>

                    {/* Session Timer (Only for new sessions) */}
                    {selectedSessionId === 'new' && (
                        <div className="hidden md:block mx-4">
                            <SessionTimer
                                initialDurationMinutes={formData.duration}
                                onDurationChange={(mins) => setFormData(prev => ({ ...prev, duration: mins }))}
                            />
                        </div>
                    )}

                    <Button onClick={handleSave} disabled={loading} className="bg-teal-600 hover:bg-teal-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white shadow-sm transition-all hover:scale-105">
                        {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                        <Save className="w-4 h-4 mr-2" />
                        {selectedSessionId === 'new' ? t('register') : t('save_changes')}
                    </Button>

                </div>

                {/* Expert Mode Banner */}
                {userSpecialty !== 'psychologist' && (
                    <div className="px-6 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs transition-colors">
                        <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            {userSpecialty === 'psychiatrist' ? <><Pill className="w-3 h-3" /> {t('psychiatry_mode')}</> : <><Brain className="w-3 h-3" /> {t('neurology_mode')}</>}
                        </span>
                        <InSessionTestRunner
                            patientId={patientId}
                            sessionId={selectedSessionId !== 'new' ? selectedSessionId : undefined}
                        />
                    </div>
                )}

                <ScrollArea className="flex-1">
                    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-32">

                        {/* Editor Config */}
                        <div className="grid grid-cols-3 gap-6">
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
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('evolution_notes')}</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-teal-50/50 dark:bg-cyan-900/10 rounded-xl -z-10 group-hover:scale-[1.01] transition-transform duration-500" />
                                <Textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="min-h-[400px] p-6 text-base leading-relaxed border-slate-200 dark:border-slate-800 focus:border-teal-400 dark:focus:border-cyan-500 focus:ring-0 shadow-sm rounded-xl resize-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder={t('notes_placeholder')}
                                />
                            </div>
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
