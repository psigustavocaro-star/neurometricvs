'use client'

import { useState } from 'react'
import { ClinicalSession, AIInsight } from '@/types/clinical'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createSession, updateSession, generateAIInsights } from "@/app/[locale]/patients/clinical-actions"
import { FirstSessionForm } from './first-session-form'
import { SessionTimeline } from './session-timeline'
import { ClinicalCopilot } from './clinical-copilot'
import { VoiceRecorder } from './voice-recorder'
import { toast } from "sonner"
import { Loader2, Plus, Calendar, Save, ArrowLeft } from "lucide-react"

interface SessionManagerProps {
    patientId: string
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    patientName: string
    embedded?: boolean
}

export function SessionManager({ patientId, sessions, patientName, embedded }: SessionManagerProps) {
    const [showFirstSessionForm, setShowFirstSessionForm] = useState(sessions.length === 0)
    // Default to 'new' if we have sessions but want to encourage input, OR select latest.
    // User wants to see sessions, so let's default to no selection (overview) or latest.
    // Let's default to 'new' so they can prep the next session immediately, or latest if they are reviewing.
    // Actually user says "see sessions we have to date", implying a view first.
    // So let's select the latest session by default if exists.
    const [selectedSessionId, setSelectedSessionId] = useState<string | 'new' | null>(sessions.length > 0 ? sessions[0].id : 'new')

    const [loading, setLoading] = useState(false)
    const [analyzing, setAnalyzing] = useState(false)

    // Form State
    const [formData, setFormData] = useState<Partial<ClinicalSession>>({
        date: new Date().toISOString().split('T')[0],
        duration: 60,
        type: 'Sesión Regular',
        notes: ''
    })

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
            duration: 60,
            type: 'Sesión Regular',
            notes: ''
        })
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            if (selectedSessionId === 'new') {
                await createSession(patientId, formData)
                toast.success("Sesión creada correctamente")
                // In a real app we'd get the ID back to select it, but revalidation handles UI update
                // We'll keep 'new' mode or reset
                setFormData({ ...formData, notes: '' })
            } else if (selectedSessionId) {
                await updateSession(selectedSessionId, formData)
                toast.success("Sesión actualizada")
            }
        } catch (error) {
            toast.error("Error al guardar sesión")
        } finally {
            setLoading(false)
        }
    }

    const handleAIAnalysis = async (approach: string) => {
        if (!selectedSessionId || selectedSessionId === 'new') {
            toast.error("Guarda la sesión antes de analizar")
            return
        }
        setAnalyzing(true)
        try {
            await generateAIInsights(selectedSessionId, approach)
            toast.success("Análisis IA generado con enfoque " + approach)
        } catch (error) {
            console.error(error)
            toast.error("Error al generar análisis")
        } finally {
            setAnalyzing(false)
        }
    }

    const selectedSession = sessions.find(s => s.id === selectedSessionId)

    const handleFirstSessionComplete = () => {
        setShowFirstSessionForm(false)
        toast.success("¡Primera sesión completada!")
        window.location.reload()
    }

    // Special First Session Flow
    if (showFirstSessionForm) {
        return (
            <div className="h-full overflow-y-auto bg-slate-50/50 p-6">
                <FirstSessionForm
                    patientId={patientId}
                    patientName={patientName}
                    onComplete={handleFirstSessionComplete}
                />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] h-full overflow-hidden bg-slate-50">

            {/* 1. Timeline (Left) */}
            <div className="hidden lg:flex flex-col border-r border-slate-200 bg-white h-full overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
                    <span className="font-bold text-slate-800 text-sm tracking-tight">Línea de Tiempo</span>
                    <Button size="sm" variant="ghost" onClick={handleNewSession} className="h-8 w-8 p-0 hover:bg-teal-50 hover:text-teal-600 rounded-full">
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
            <div className="flex flex-col h-full bg-white overflow-hidden relative shadow-sm z-0">
                {/* Mobile Header for Timeline Toggle could go here */}

                <div className="flex-none px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-20">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {selectedSessionId === 'new' ? `Nueva Sesión` : `Sesión del ${new Date(formData.date!).toLocaleDateString()}`}
                        </h2>
                        {selectedSessionId === 'new' && <p className="text-xs text-slate-500">Registrando evolución</p>}
                    </div>
                    <Button onClick={handleSave} disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all hover:scale-105">
                        {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                        <Save className="w-4 h-4 mr-2" />
                        {selectedSessionId === 'new' ? 'Registrar' : 'Guardar Cambios'}
                    </Button>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-8 max-w-3xl mx-auto space-y-8 pb-32">

                        {/* Editor Config */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Fecha</label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Duración</label>
                                <Input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Tipo</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="Sesión Regular">Sesión Regular</option>
                                    <option value="Evaluación">Evaluación</option>
                                    <option value="Crisis">Crisis</option>
                                    <option value="Cierre">Cierre</option>
                                </select>
                            </div>
                        </div>

                        {/* Note Editor */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-700">Notas de Evolución</label>
                                <div className="scale-90 origin-right">
                                    <VoiceRecorder
                                        onTranscriptionComplete={(text) => setFormData(prev => ({
                                            ...prev,
                                            notes: prev.notes ? `${prev.notes}\n\n${text}` : text
                                        }))}
                                    />
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-teal-50/50 rounded-xl -z-10 group-hover:scale-[1.01] transition-transform duration-500" />
                                <Textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="min-h-[400px] p-6 text-base leading-relaxed border-slate-200 focus:border-teal-400 focus:ring-0 shadow-sm rounded-xl resize-none bg-white"
                                    placeholder="Comienza a escribir o usa el micrófono para transcribir la sesión..."
                                />
                            </div>
                        </div>

                    </div>
                </ScrollArea>
            </div>

            {/* 3. Clinical Copilot (Right) */}
            <div className="hidden lg:block h-full border-l border-slate-200 bg-white z-10 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)]">
                <ClinicalCopilot
                    sessionId={selectedSessionId === 'new' ? undefined : selectedSessionId || undefined}
                    insight={selectedSession?.ai_insights}
                    onAnalyze={handleAIAnalysis}
                    loading={analyzing}
                />
            </div>
        </div>
    )
}
