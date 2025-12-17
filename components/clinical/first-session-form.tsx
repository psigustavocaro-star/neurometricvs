'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createSession, updateClinicalRecord } from "@/app/[locale]/patients/clinical-actions"
import { toast } from "sonner"
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft, Sparkles, ClipboardList } from "lucide-react"

interface FirstSessionFormProps {
    patientId: string
    patientName: string
    onComplete: () => void
}

export function FirstSessionForm({ patientId, patientName, onComplete }: FirstSessionFormProps) {
    const [saving, setSaving] = useState(false)
    const { resolvedTheme } = useTheme() // Assuming useTheme is imported, if not I need to adding it. 
    // Wait, useTheme wasn't in original imports. I should check if I need it or just use Tailwind dark classes.
    // Original code used dark: classes. I'll stick to that.

    // Unified Session Data
    const [notes, setNotes] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [duration, setDuration] = useState(60)

    const handleSave = async (isComplete: boolean = false) => {
        if (!notes.trim()) {
            toast.error("Por favor escribe algunas notas de la sesión")
            return
        }

        setSaving(true)
        try {
            // 1. Save Session
            const sessionData = {
                date,
                duration,
                type: 'Evaluación Inicial',
                notes: notes,
                status: (isComplete ? 'completed' : 'scheduled') as 'completed' | 'scheduled' | 'cancelled'
            }
            await createSession(patientId, sessionData)

            // 2. Update Anamnesis (History) with the initial interview notes
            // We treat the first session notes as the "Present Illness" / History
            await updateClinicalRecord(patientId, {
                anamnesis: {
                    presentIllness: notes, // Map notes to history
                    personalHistory: 'Ver notas de sesión inicial', // Placeholder
                }
            })

            toast.success(isComplete ? "Sesión completada exitosamente" : "Borrador guardado")
            onComplete()
        } catch (error: any) {
            console.error("Error saving session:", error)
            toast.error(`Error al guardar: ${error.message || 'Desconocido'}`)
        } finally {
            setSaving(false)
        }
    }

    const interviewGuide = [
        { title: 'Motivo de Consulta', questions: ['¿Qué lo/la trae por aquí hoy?', '¿Desde cuándo se siente así?', '¿Ha ocurrido algo específico recientemente?'] },
        { title: 'Antecedentes', questions: ['¿Ha ido al psicólogo antes?', '¿Toma alguna medicación?', '¿Hay enfermedades importantes en la familia?'] },
        { title: 'Dinámica Familiar', questions: ['¿Con quién vive?', '¿Cómo es la relación con sus padres/pareja?', '¿Hay conflictos frecuentes?'] },
        { title: 'Vida Social y Laboral', questions: ['¿A qué se dedica?', '¿Cómo se lleva con sus compañeros?', '¿Tiene amigos cercanos?'] },
        { title: 'Habitos y Rutina', questions: ['¿Cómo duerme?', '¿Hace ejercicio?', '¿Consume alcohol o tabaco?'] },
    ]

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Alert className="border-teal-200 dark:border-teal-900/50 bg-teal-50 dark:bg-teal-950/20">
                <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <AlertDescription className="text-teal-900 dark:text-teal-200">
                    <strong>Primera Sesión de {patientName}</strong>
                    <br />
                    Para comenzar el tratamiento, necesitamos completar la historia clínica del paciente.
                </AlertDescription>
            </Alert>

            {/* Progress Indicator - REMOVED for freeform layout */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Editor Area (2 columns) */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <CardTitle className="text-slate-800 dark:text-slate-200 flex justify-between items-center text-base">
                                <span>Notas de Sesión</span>
                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-32 h-8 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                                    />
                                    <div className="flex items-center gap-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2 h-8">
                                        <Input
                                            type="number"
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value))}
                                            className="w-12 h-6 text-xs border-0 p-0 focus-visible:ring-0 text-right bg-transparent text-slate-700 dark:text-slate-300"
                                        />
                                        <span className="text-xs text-slate-500">min</span>
                                    </div>
                                </div>
                            </CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Espacio libre para registrar la narrativa del paciente durante la evaluación inicial.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Comienza escribiendo aquí... Puedes usar la guía de la derecha para orientar la entrevista."
                                className="min-h-[500px] border-0 rounded-none resize-none p-6 text-base leading-relaxed focus-visible:ring-0 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Interview Guide Sidebar (1 column) */}
                <div className="space-y-4">
                    <Card className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <ClipboardList className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                Guía de Entrevista
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Accordion type="single" collapsible className="w-full">
                                {interviewGuide.map((section, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-200 dark:border-slate-800">
                                        <AccordionTrigger className="text-sm font-medium text-slate-600 dark:text-slate-400 py-3 hover:text-indigo-600 dark:hover:text-indigo-400 hover:no-underline">
                                            {section.title}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-2 pl-2">
                                                {section.questions.map((q, qIdx) => (
                                                    <li key={qIdx} className="text-xs text-slate-500 dark:text-slate-500 italic flex gap-2">
                                                        <span className="text-indigo-400">•</span>
                                                        {q}
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                            <div className="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <strong>Tip:</strong> No es necesario hacer todas las preguntas. Deja que el paciente hable libremente y guía la conversación suavemente hacia las áreas no cubiertas.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button
                    variant="ghost"
                    onClick={() => handleSave(false)}
                    disabled={saving}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                    Guardar Borrador
                </Button>
                <Button
                    onClick={() => handleSave(true)}
                    disabled={saving}
                    className="bg-teal-600 hover:bg-teal-700 text-white min-w-[200px]"
                >
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Finalizar Primera Sesión
                </Button>
            </div>
        </div>
    )
}
