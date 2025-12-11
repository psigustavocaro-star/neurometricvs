'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { updateClinicalRecord } from "@/app/[locale]/patients/clinical-actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface AnamnesisFormProps {
    patientId: string
    initialData: any
    clinicalRecordId?: string
    embedded?: boolean
}

export function AnamnesisForm({ patientId, initialData, clinicalRecordId, embedded }: AnamnesisFormProps) {
    const [data, setData] = useState(initialData)
    const [saving, setSaving] = useState(false)

    const handleChange = (section: string, value: string) => {
        setData((prev: any) => ({ ...prev, [section]: value }))
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateClinicalRecord(patientId, { anamnesis: data })
            toast.success("Anamnesis actualizada correctamente")
        } catch (error) {
            toast.error("Error al guardar")
        } finally {
            setSaving(false)
        }
    }

    const sections = [
        { id: 'presentIllness', title: '1. Motivo de Consulta & Enfermedad Actual', placeholder: 'Describe el problema actual, inicio, duración y síntomas...' },
        { id: 'personalHistory', title: '2. Antecedentes Personales (Médicos/Psiquiátricos)', placeholder: 'Diagnósticos previos, hospitalizaciones, traumas...' },
        { id: 'familyHistory', title: '3. Antecedentes Familiares', placeholder: 'Historial psiquiátrico familiar, enfermedades genéticas...' },
        { id: 'socialHistory', title: '4. Historia Social & Familiar', placeholder: 'Dinámica familiar, relaciones, red de apoyo...' },
        { id: 'educationWork', title: '5. Historia Educativa & Laboral', placeholder: 'Desempeño escolar, hitos, empleo actual, estrés laboral...' },
        { id: 'habits', title: '6. Hábitos & Sustancias', placeholder: 'Alcohol, tabaco, drogas, actividad física...' },
        { id: 'sleep', title: '7. Sueño & Apetito', placeholder: 'Patrones de sueño, insomnio, cambios en peso/apetito...' },
    ]

    return (
        <div className={embedded ? "h-full" : ""}>
            {!embedded && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-900">Anamnesis Clínica</h2>
                    <p className="text-slate-500">Registro detallado de la historia del paciente</p>
                </div>
            )}

            <div className="flex justify-end mb-4 absolute top-6 right-6 z-10">
                <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 shadow-sm">
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={['presentIllness']} className="w-full space-y-4">
                {sections.map((section) => (
                    <div key={section.id} className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm hover:border-teal-200 transition-colors">
                        <AccordionItem value={section.id} className="border-0 px-4">
                            <AccordionTrigger className="hover:text-teal-600 hover:no-underline font-medium text-slate-800 py-4">
                                {section.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="pb-4 pt-1">
                                    <Textarea
                                        value={data[section.id] || ''}
                                        onChange={(e) => handleChange(section.id, e.target.value)}
                                        placeholder={section.placeholder}
                                        className="min-h-[120px] bg-slate-50 border-0 focus-visible:ring-1 focus-visible:ring-teal-200 resize-y rounded-md text-base"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </div>
                ))}
            </Accordion>
        </div>
    )
}
