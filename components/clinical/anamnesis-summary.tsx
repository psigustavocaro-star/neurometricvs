'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Calendar, User, Heart, Briefcase, Home, Pill } from "lucide-react"

interface AnamnesisSummaryProps {
    clinicalRecord: any
    sessions: any[]
    patient: any
}

export function AnamnesisSummary({ clinicalRecord, sessions, patient }: AnamnesisSummaryProps) {
    const anamnesis = clinicalRecord?.anamnesis || {}
    const hasData = Object.keys(anamnesis).some(key => anamnesis[key])

    // Generate automatic summary from sessions
    const generateAutoSummary = () => {
        if (!sessions || sessions.length === 0) {
            return {
                sessionCount: 0,
                firstSession: null,
                lastSession: null,
                mainThemes: [],
                progress: 'Sin sesiones registradas aún'
            }
        }

        const sortedSessions = [...sessions].sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        return {
            sessionCount: sessions.length,
            firstSession: sortedSessions[0],
            lastSession: sortedSessions[sortedSessions.length - 1],
            mainThemes: extractThemes(sessions),
            progress: analyzeProgress(sessions)
        }
    }

    const extractThemes = (sessions: any[]) => {
        // Simple keyword extraction from session notes
        const keywords = ['ansiedad', 'depresión', 'estrés', 'familia', 'trabajo', 'sueño', 'relaciones']
        const themes: string[] = []

        sessions.forEach(session => {
            if (session.notes) {
                keywords.forEach(keyword => {
                    if (session.notes.toLowerCase().includes(keyword) && !themes.includes(keyword)) {
                        themes.push(keyword)
                    }
                })
            }
        })

        return themes.slice(0, 5) // Top 5 themes
    }

    const analyzeProgress = (sessions: any[]) => {
        if (sessions.length < 3) return 'Proceso inicial de evaluación'
        if (sessions.length < 8) return 'Fase de establecimiento terapéutico'
        if (sessions.length < 15) return 'Proceso terapéutico activo'
        return 'Fase avanzada de tratamiento'
    }

    const autoSummary = generateAutoSummary()

    const sections = [
        {
            id: 'presentIllness',
            title: 'Motivo de Consulta',
            icon: FileText,
            content: anamnesis.presentIllness || 'No registrado'
        },
        {
            id: 'personalHistory',
            title: 'Antecedentes Personales',
            icon: User,
            content: anamnesis.personalHistory || 'No registrado'
        },
        {
            id: 'familyHistory',
            title: 'Antecedentes Familiares',
            icon: Heart,
            content: anamnesis.familyHistory || 'No registrado'
        },
        {
            id: 'socialHistory',
            title: 'Historia Social',
            icon: Home,
            content: anamnesis.socialHistory || 'No registrado'
        },
        {
            id: 'educationWork',
            title: 'Historia Educativa/Laboral',
            icon: Briefcase,
            content: anamnesis.educationWork || 'No registrado'
        },
        {
            id: 'habits',
            title: 'Hábitos y Sustancias',
            icon: Pill,
            content: anamnesis.habits || 'No registrado'
        },
    ]

    return (
        <div className="space-y-6">
            {/* Auto-generated Summary Card */}
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-teal-900">
                        <Calendar className="w-5 h-5" />
                        Resumen Automático del Tratamiento
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <p className="text-2xl font-bold text-teal-700">{autoSummary.sessionCount}</p>
                            <p className="text-xs text-slate-600 mt-1">Sesiones Totales</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <p className="text-sm font-semibold text-slate-900">
                                {autoSummary.firstSession
                                    ? new Date(autoSummary.firstSession.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
                                    : 'N/A'}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">Primera Sesión</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <p className="text-sm font-semibold text-slate-900">
                                {autoSummary.lastSession
                                    ? new Date(autoSummary.lastSession.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
                                    : 'N/A'}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">Última Sesión</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <p className="text-xs font-medium text-teal-700 uppercase">{autoSummary.progress}</p>
                            <p className="text-xs text-slate-600 mt-1">Estado</p>
                        </div>
                    </div>

                    {autoSummary.mainThemes.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold text-slate-700 mb-2">Temas Principales:</p>
                            <div className="flex flex-wrap gap-2">
                                {autoSummary.mainThemes.map(theme => (
                                    <Badge key={theme} variant="secondary" className="bg-white text-teal-700 border-teal-200">
                                        {theme}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Anamnesis Sections */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Historia Clínica Detallada</h3>
                    {!hasData && (
                        <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                            Pendiente de completar en primera sesión
                        </Badge>
                    )}
                </div>

                {sections.map((section, index) => {
                    const Icon = section.icon
                    return (
                        <Card key={section.id} className="border-slate-200 hover:border-teal-200 transition-colors">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-teal-600" />
                                    {section.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {section.content}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
