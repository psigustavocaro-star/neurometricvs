'use client'

import { AIInsight } from '@/types/clinical'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Film, Book, PlayCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'

export function AIInsightsDisplay({ insight }: { insight: AIInsight }) {
    if (!insight) return null

    const getIcon = (type: string) => {
        switch (type) {
            case 'movie': return <Film className="w-4 h-4" />
            case 'book': return <Book className="w-4 h-4" />
            case 'series': return <PlayCircle className="w-4 h-4" />
            default: return <CheckCircle2 className="w-4 h-4" />
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Analysis Section */}
            <Card className="border-indigo-100 bg-indigo-50/30">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-indigo-700">
                        <Brain className="w-5 h-5" />
                        <CardTitle className="text-lg">Análisis Clínico (IA)</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {insight.analysis}
                    </p>

                    {insight.risk_assessment && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex gap-2 items-start">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">Evaluación de Riesgo</h4>
                                <p className="text-sm text-amber-900">{insight.risk_assessment}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Suggestions & Recommendations Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Clinical Paths */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Sugerencias Terapéuticas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {insight.clinical_path_suggestions?.map((suggestion, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                                    <span className="text-teal-500 font-bold">•</span>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Cultural Prescriptions */}
                <Card className="overflow-hidden border-pink-100">
                    <CardHeader className="pb-2 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
                        <CardTitle className="text-sm font-semibold text-pink-700 uppercase tracking-wider flex items-center gap-2">
                            Recetas Culturales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-pink-100">
                            {insight.recommendations?.map((rec, idx) => (
                                <div key={idx} className="p-4 hover:bg-pink-50/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="secondary" className="bg-white border-pink-200 text-pink-700 gap-1 pl-1.5 shadow-sm">
                                            {getIcon(rec.type)}
                                            {rec.type === 'movie' ? 'Película' : rec.type === 'book' ? 'Libro' : 'Serie'}
                                        </Badge>
                                        <span className="font-semibold text-slate-800">{rec.title}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 italic pl-1">
                                        "{rec.reason}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
