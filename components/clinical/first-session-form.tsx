'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createSession, updateClinicalRecord } from "@/app/[locale]/patients/clinical-actions"
import { toast } from "sonner"
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react"
import { VoiceRecorder } from "./voice-recorder"
import { generateAIInsights } from "@/app/[locale]/patients/clinical-actions"

interface FirstSessionFormProps {
    patientId: string
    patientName: string
    onComplete: () => void
}

export function FirstSessionForm({ patientId, patientName, onComplete }: FirstSessionFormProps) {
    const [step, setStep] = useState<'anamnesis' | 'session'>('anamnesis')
    const [saving, setSaving] = useState(false)

    // Anamnesis data
    const [anamnesisData, setAnamnesisData] = useState({
        presentIllness: '',
        personalHistory: '',
        familyHistory: '',
        socialHistory: '',
        educationWork: '',
        habits: '',
        sleep: ''
    })

    // Session data
    const [sessionData, setSessionData] = useState({
        date: new Date().toISOString().split('T')[0],
        duration: 60,
        type: 'Evaluación Inicial',
        notes: ''
    })

    const handleAnamnesisChange = (section: string, value: string) => {
        setAnamnesisData(prev => ({ ...prev, [section]: value }))
    }

    const handleSessionChange = (field: string, value: any) => {
        setSessionData(prev => ({ ...prev, [field]: value }))
    }

    const isAnamnesisComplete = () => {
        return anamnesisData.presentIllness.trim().length > 0 &&
            anamnesisData.personalHistory.trim().length > 0
    }

    const handleSaveAnamnesis = async () => {
        if (!isAnamnesisComplete()) {
            toast.error("Por favor completa al menos el motivo de consulta y antecedentes personales")
            return
        }

        setSaving(true)
        try {
            await updateClinicalRecord(patientId, { anamnesis: anamnesisData })
            toast.success("Anamnesis guardada correctamente")
            setStep('session')
        } catch (error) {
            toast.error("Error al guardar anamnesis")
        } finally {
            setSaving(false)
        }
    }

    const handleSaveSession = async (analyze: boolean = false) => {
        if (sessionData.notes.trim().length === 0) {
            toast.error("Por favor agrega notas de la sesión")
            return
        }

        setSaving(true)
        try {
            const newSession = await createSession(patientId, sessionData)

            if (analyze && newSession?.id) {
                toast.info("Generando análisis inicial con IA...")
                await generateAIInsights(newSession.id, 'Integrativo')
                toast.success("Análisis generado exitosamente")
            } else {
                toast.success("Primera sesión registrada exitosamente")
            }

            onComplete()
        } catch (error) {
            console.error(error)
            toast.error("Error al guardar sesión")
        } finally {
            setSaving(false)
        }
    }

    const anamnesissections = [
        { id: 'presentIllness', title: '1. Motivo de Consulta', placeholder: 'Describe el problema actual, inicio, duración y síntomas...', required: true },
        { id: 'personalHistory', title: '2. Antecedentes Personales', placeholder: 'Diagnósticos previos, hospitalizaciones, traumas...', required: true },
        { id: 'familyHistory', title: '3. Antecedentes Familiares', placeholder: 'Historial psiquiátrico familiar, enfermedades genéticas...', required: false },
        { id: 'socialHistory', title: '4. Historia Social', placeholder: 'Dinámica familiar, relaciones, red de apoyo...', required: false },
        { id: 'educationWork', title: '5. Historia Educativa/Laboral', placeholder: 'Desempeño escolar, empleo actual, estrés laboral...', required: false },
        { id: 'habits', title: '6. Hábitos y Sustancias', placeholder: 'Alcohol, tabaco, drogas, actividad física...', required: false },
        { id: 'sleep', title: '7. Sueño y Apetito', placeholder: 'Patrones de sueño, insomnio, cambios en peso/apetito...', required: false },
    ]

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Alert className="border-teal-200 bg-teal-50">
                <AlertCircle className="h-4 w-4 text-teal-600" />
                <AlertDescription className="text-teal-900">
                    <strong>Primera Sesión de {patientName}</strong>
                    <br />
                    Para comenzar el tratamiento, necesitamos completar la historia clínica del paciente.
                </AlertDescription>
            </Alert>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step === 'anamnesis' ? 'text-teal-600' : 'text-green-600'}`}>
                    {step === 'session' ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center"><span className="text-xs font-bold">1</span></div>}
                    <span className="font-medium">Historia Clínica</span>
                </div>
                <div className="w-16 h-0.5 bg-slate-200"></div>
                <div className={`flex items-center gap-2 ${step === 'session' ? 'text-teal-600' : 'text-slate-400'}`}>
                    <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                    </div>
                    <span className="font-medium">Notas de Sesión</span>
                </div>
            </div>

            {step === 'anamnesis' ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Historia Clínica Inicial</CardTitle>
                        <CardDescription>
                            Completa la información básica del paciente. Los campos marcados con * son obligatorios.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple" defaultValue={['presentIllness', 'personalHistory']} className="w-full space-y-4">
                            {anamnesissections.map((section) => (
                                <div key={section.id} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                                    <AccordionItem value={section.id} className="border-0 px-4">
                                        <AccordionTrigger className="hover:text-teal-600 hover:no-underline font-medium text-slate-800 py-4">
                                            {section.title} {section.required && <span className="text-red-500 ml-1">*</span>}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="pb-4 pt-1">
                                                <Textarea
                                                    value={anamnesisData[section.id as keyof typeof anamnesisData]}
                                                    onChange={(e) => handleAnamnesisChange(section.id, e.target.value)}
                                                    placeholder={section.placeholder}
                                                    className="min-h-[200px] bg-slate-50 border-slate-200 focus:border-teal-300 resize-y"
                                                />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>
                            ))}
                        </Accordion>

                        <div className="flex justify-end mt-6">
                            <Button
                                onClick={handleSaveAnamnesis}
                                disabled={saving || !isAnamnesisComplete()}
                                className="bg-teal-600 hover:bg-teal-700"
                            >
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Continuar a Notas de Sesión
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Notas de la Primera Sesión</CardTitle>
                        <CardDescription>
                            Registra lo ocurrido en esta sesión inicial
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Fecha</Label>
                                <Input
                                    type="date"
                                    value={sessionData.date}
                                    onChange={(e) => handleSessionChange('date', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Duración (min)</Label>
                                <Input
                                    type="number"
                                    value={sessionData.duration}
                                    onChange={(e) => handleSessionChange('duration', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tipo</Label>
                                <Input
                                    value={sessionData.type}
                                    onChange={(e) => handleSessionChange('type', e.target.value)}
                                    disabled
                                    className="bg-slate-50"
                                />
                            </div>
                        </div>


                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label>Notas Clínicas *</Label>
                                <VoiceRecorder
                                    onTranscriptionComplete={(text) => handleSessionChange('notes', sessionData.notes + (sessionData.notes ? '\n\n' : '') + text)}
                                />
                            </div>
                            <Textarea
                                value={sessionData.notes}
                                onChange={(e) => handleSessionChange('notes', e.target.value)}
                                placeholder="Describe el desarrollo de la sesión, observaciones, plan inicial..."
                                className="min-h-[200px]"
                            />
                        </div>

                        <div className="flex justify-between mt-6 pt-4 border-t border-slate-100">
                            <Button
                                variant="ghost"
                                onClick={() => setStep('anamnesis')}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver a Historia
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => handleSaveSession(false)} // Saves without analyzing
                                    disabled={saving}
                                    className="border-teal-200 text-teal-700 hover:bg-teal-50"
                                >
                                    Guardar Borrador
                                </Button>
                                <Button
                                    onClick={() => handleSaveSession(true)}
                                    disabled={saving}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:scale-105 transition-all"
                                >
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Completar & Analizar Situación
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
