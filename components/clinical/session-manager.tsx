'use client'

import { useState } from 'react'
import { ClinicalSession, AIInsight } from '@/types/clinical'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createSession, updateSession, generateAIInsights } from "@/app/[locale]/patients/clinical-actions"
import { AIInsightsDisplay } from './ai-insights-display'
import { FirstSessionForm } from './first-session-form'
import { toast } from "sonner"
import { Loader2, Plus, Calendar, Clock, Sparkles, FileText } from "lucide-react"

interface SessionManagerProps {
    patientId: string
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    patientName: string
    embedded?: boolean
}

export function SessionManager({ patientId, sessions, patientName, embedded }: SessionManagerProps) {
    const [showFirstSessionForm, setShowFirstSessionForm] = useState(sessions.length === 0)
    const [selectedSessionId, setSelectedSessionId] = useState<string | 'new' | null>(sessions.length > 0 ? sessions[0].id : null)
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
                // Reset to show list? Usually we'd select the new one, but revalidation happens.
                // For simplified UX, we just wait for revalidation or reset.
                setSelectedSessionId(null)
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

    const handleAIAnalysis = async () => {
        if (!selectedSessionId || selectedSessionId === 'new') return
        setAnalyzing(true)
        try {
            await generateAIInsights(selectedSessionId)
            toast.success("Análisis IA completado")
        } catch (error) {
            toast.error("Error al generar análisis")
        } finally {
            setAnalyzing(false)
        }
    }

    const selectedSession = sessions.find(s => s.id === selectedSessionId)

    const handleFirstSessionComplete = () => {
        setShowFirstSessionForm(false)
        toast.success("¡Primera sesión completada! Recargando...")
        // Refresh the page to show the new session
        window.location.reload()
    }

    // Show first session form if no sessions exist
    if (showFirstSessionForm) {
        return (
            <FirstSessionForm
                patientId={patientId}
                patientName={patientName}
                onComplete={handleFirstSessionComplete}
            />
        )
    }

    return (
        <div className={`grid md:grid-cols-[300px_1fr] h-full ${embedded ? '' : 'gap-6 h-[600px]'}`}>
            {/* Left: Session List Sidebar */}
            <div className="flex flex-col border-r border-slate-200 bg-slate-50/50 h-full">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                    <span className="font-semibold text-slate-700 text-sm">Historial</span>
                    <Button size="sm" variant="ghost" onClick={handleNewSession} className="h-8 w-8 p-0 hover:bg-teal-50 hover:text-teal-600 rounded-full">
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <ScrollArea className="flex-1">
                    <div className="divide-y divide-slate-100">
                        {sessions.length === 0 && <div className="p-8 text-xs text-slate-400 text-center">Sin historial.</div>}
                        {sessions.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => handleSelectSession(session)}
                                className={`w-full text-left px-4 py-3 hover:bg-white transition-all border-l-2 text-sm relative group ${selectedSessionId === session.id
                                    ? 'bg-white border-teal-500 shadow-sm z-10'
                                    : 'bg-transparent border-transparent text-slate-500'
                                    }`}
                            >
                                <div className={`font-medium mb-0.5 ${selectedSessionId === session.id ? 'text-teal-700' : 'text-slate-700'}`}>
                                    {new Date(session.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs opacity-80 truncate max-w-[120px]">{session.type}</span>
                                    {session.ai_insights && <Sparkles className="w-3 h-3 text-indigo-400" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Right: Editor / Details Area */}
            <div className="flex flex-col h-full bg-white overflow-hidden relative">
                {selectedSessionId ? (
                    <>
                        {/* Toolbar */}
                        <div className="flex-none p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div>
                                <h3 className="font-bold text-slate-800">{selectedSessionId === 'new' ? 'Nueva Sesión' : 'Detalles de Sesión'}</h3>
                                <p className="text-xs text-slate-400">{patientName}</p>
                            </div>
                            <div className="flex gap-2">
                                {selectedSessionId !== 'new' && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAIAnalysis}
                                        disabled={analyzing}
                                        className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 h-8 text-xs"
                                    >
                                        {analyzing ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Sparkles className="w-3 h-3 mr-1.5" />}
                                        {analyzing ? 'Analizando...' : 'Analizar (IA)'}
                                    </Button>
                                )}
                                <Button size="sm" onClick={handleSave} disabled={loading} className="bg-teal-600 hover:bg-teal-700 h-8 text-xs px-4 shadow-sm">
                                    {loading && <Loader2 className="w-3 h-3 animate-spin mr-1.5" />}
                                    Guardar
                                </Button>
                            </div>
                        </div>

                        {/* Content Scroll */}
                        <ScrollArea className="flex-1">
                            <div className="p-8 max-w-3xl mx-auto space-y-8">
                                {/* Metadata Row */}
                                <div className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="space-y-1 flex-1">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</label>
                                        <Input
                                            type="date"
                                            value={formData.date}
                                            className="bg-white border-slate-200 h-9 transition-colors focus:border-teal-300"
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1 w-24">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mins.</label>
                                        <Input
                                            type="number"
                                            value={formData.duration}
                                            className="bg-white border-slate-200 h-9 transition-colors focus:border-teal-300"
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value)
                                                setFormData({ ...formData, duration: isNaN(val) ? 0 : val })
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-1 w-40">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipo</label>
                                        <select
                                            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-300"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="Sesión Regular">Regular</option>
                                            <option value="Evaluación">Evaluación</option>
                                            <option value="Crisis">Crisis</option>
                                            <option value="Cierre">Cierre</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Editor */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-slate-400" /> Notas Clínicas
                                    </label>
                                    <Textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="min-h-[300px] font-mono text-sm leading-relaxed p-4 bg-white border-slate-200 focus:border-teal-300 focus:ring-0 shadow-sm rounded-md resize-y"
                                        placeholder="Escribe aquí el desarrollo de la sesión... (Soporta Markdown básico)"
                                    />
                                </div>

                                {/* AI Results */}
                                {selectedSession?.ai_insights && (
                                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Sparkles className="w-5 h-5 text-indigo-500" />
                                            <h3 className="text-lg font-bold text-slate-800">Insights de Inteligencia Artificial</h3>
                                        </div>
                                        <AIInsightsDisplay insight={selectedSession.ai_insights} />
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Calendar className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="font-medium text-slate-400">Selecciona una sesión para ver detalles</p>
                    </div>
                )}
            </div>
        </div>
    )
}
