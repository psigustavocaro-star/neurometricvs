'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { updateClinicalRecord } from "@/app/[locale]/patients/clinical-actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface TreatmentPlanProps {
    patientId: string
    initialDiagnosis?: string
    clinicalRecordId?: string
    embedded?: boolean
}

export function TreatmentPlan({ patientId, initialDiagnosis, embedded }: TreatmentPlanProps) {
    const [diagnosis, setDiagnosis] = useState(initialDiagnosis || '')
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateClinicalRecord(patientId, { diagnosis })
            toast.success("Plan actualizado correctamente")
        } catch (error) {
            toast.error("Error al guardar")
        } finally {
            setSaving(false)
        }
    }

    return (

        <div className={embedded ? "h-full" : ""}>
            {!embedded && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-900">Plan de Tratamiento & Diagnóstico</h2>
                    <p className="text-slate-500">Formulación clínica y objetivos a largo plazo</p>
                </div>
            )}

            <div className="flex justify-end mb-4 absolute top-6 right-6 z-10">
                <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 shadow-sm">
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto pt-4">
                <div className="space-y-2">
                    <Label htmlFor="diagnosis" className="text-base font-semibold text-slate-700">Hipótesis Diagnóstica (DSM-5 / ICD-11)</Label>
                    <Textarea
                        id="diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        className="min-h-[300px] font-mono text-sm bg-white border-slate-200 focus:border-teal-300 shadow-sm p-4 leading-relaxed rounded-md resize-y"
                        placeholder="Escribe aquí la formulación diagnóstica..."
                    />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex items-start gap-3">
                    <div className="mt-0.5">ℹ️</div>
                    <div>
                        <h4 className="font-semibold mb-1">Nota del Sistema:</h4>
                        <p>Las secciones de objetivos terapéuticos detallados estarán disponibles en la próxima actualización.</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
