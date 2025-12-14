'use client'

import { useState } from 'react'
import { AIInsight, CulturalRecommendation } from '@/types/clinical'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Sparkles, Film, Book, Loader2, Music, Tv, Activity, Lightbulb } from "lucide-react"

interface ClinicalCopilotProps {
    sessionId?: string
    insight?: AIInsight | null
    onAnalyze: (approach: string) => Promise<void>
    loading: boolean
}

export function ClinicalCopilot({ sessionId, insight, onAnalyze, loading }: ClinicalCopilotProps) {
    const [approach, setApproach] = useState('TCC')

    const approaches = [
        { value: 'TCC', label: 'Terapia Cognitivo-Conductual' },
        { value: 'DBT', label: 'Dialéctico-Conductual (DBT)' },
        { value: 'ACT', label: 'Aceptación y Compromiso (ACT)' },
        { value: 'Sistemica', label: 'Sistémica Familiar' },
        { value: 'Psicoanalisis', label: 'Psicodinámica / Analítica' },
        { value: 'Humanista', label: 'Humanista / Existencial' },
        { value: 'EMDR', label: 'EMDR (Trauma)' },
    ]

    const getIconForRec = (type: string) => {
        switch (type) {
            case 'movie': return <Film className="w-4 h-4 text-indigo-500" />
            case 'book': return <Book className="w-4 h-4 text-amber-500" />
            case 'series': return <Tv className="w-4 h-4 text-pink-500" />
            case 'music': return <Music className="w-4 h-4 text-cyan-500" />
            default: return <Sparkles className="w-4 h-4 text-slate-500" />
        }
    }

    return (
        <div className="h-full flex flex-col bg-slate-50/50 border-l border-slate-200">
            {/* Header / Controls */}
            <div className="p-4 border-b border-slate-200 bg-white space-y-4">
                <div className="flex items-center gap-2 text-indigo-600">
                    <Brain className="w-5 h-5" />
                    <h3 className="font-bold text-sm uppercase tracking-wider">Copiloto Clínico</h3>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500">Marco Teórico para Análisis</label>
                    <Select value={approach} onValueChange={setApproach}>
                        <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Selecciona..." />
                        </SelectTrigger>
                        <SelectContent>
                            {approaches.map(a => (
                                <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all group"
                    onClick={() => onAnalyze(approach)}
                    disabled={loading || !sessionId || sessionId === 'new'}
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />}
                    {loading ? 'Analizando Contexto...' : 'Generar Análisis & Recetas'}
                </Button>

                {(!sessionId || sessionId === 'new') && (
                    <p className="text-[10px] text-amber-600 text-center bg-amber-50 p-2 rounded">
                        Guarda la sesión para habilitar el análisis
                    </p>
                )}
            </div>

            {/* Results Area */}
            <ScrollArea className="flex-1 p-4">
                {!insight ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-4 text-center p-4">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center shadow-inner">
                            <Brain className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-sm">
                            Selecciona un enfoque y genera análisis para recibir herramientas y recetas culturales.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

                        {/* 1. Clinical Analysis */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                <Activity className="w-3 h-3" /> Análisis ({approach})
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                {insight.analysis}
                            </p>
                        </div>

                        {/* 2. Therapeutic Tools */}
                        {insight.therapeutic_tools && insight.therapeutic_tools.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                    <Lightbulb className="w-3 h-3 text-amber-500" /> Herramientas Sugeridas
                                </h4>
                                <div className="grid gap-2">
                                    {insight.therapeutic_tools.map((tool, idx) => (
                                        <div key={idx} className="bg-amber-50/50 border border-amber-100 p-2.5 rounded-md text-sm text-slate-700 flex gap-2">
                                            <span className="text-amber-500 font-bold">•</span>
                                            {tool}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. Cultural Prescriptions */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                <Film className="w-3 h-3 text-pink-500" /> Recetas Culturales
                            </h4>
                            <div className="grid gap-3">
                                {insight.recommendations.map((rec, idx) => (
                                    <div key={idx} className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-200 p-3 rounded-lg transition-all shadow-sm">
                                        <div className="flex justify-between items-start mb-1">
                                            <Badge variant="outline" className="bg-slate-50 gap-1 text-[10px] h-5">
                                                {getIconForRec(rec.type)}
                                                {rec.type.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <h5 className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">
                                            {rec.title}
                                        </h5>
                                        <p className="text-xs text-slate-500 mt-1 leading-snug">
                                            {rec.reason}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Path Suggestions */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-500 uppercase">Focos Futuros</h4>
                            <ul className="space-y-1">
                                {insight.clinical_path_suggestions.map((path, idx) => (
                                    <li key={idx} className="text-xs text-slate-600 flex gap-2">
                                        <span className="text-teal-500">→</span> {path}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
