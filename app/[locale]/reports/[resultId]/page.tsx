import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, Printer, Download } from 'lucide-react'
import { ReportActions } from "@/components/reports/report-actions"
import { ReportChart } from "@/components/reports/report-chart"

export default async function ReportPage({ params }: { params: Promise<{ resultId: string }> }) {
    const supabase = await createClient()
    const { resultId } = await params

    const { data: result } = await supabase
        .from('test_results')
        .select(`
            *,
            patient:patients(*),
            profile:profiles(*)
        `)
        .eq('id', resultId)
        .single()

    if (!result) {
        notFound()
    }

    const { patient, profile, results_json } = result
    const testDate = new Date(result.created_at)
    const formattedDate = format(testDate, "d 'de' MMMM 'de' yyyy", { locale: es })
    const scores = results_json?.scores || {}

    // Helper to sanitize legacy labels
    const sanitizeLabel = (label: string) => {
        if (label === 'Normal') return 'Sin Indicadores Clínicos'
        return label
    }

    // Prepare Chart Data
    const chartData = [
        {
            name: 'Desatención',
            score: scores.inattention || 0,
            label: sanitizeLabel(scores.inattentionLabel || ''),
            color: (scores.inattentionLabel === 'Clínico' || scores.inattentionLabel === 'Atípico') ? '#F87171' : '#4ADE80'
        },
        {
            name: 'Hiperactividad',
            score: scores.hyperactivity || 0,
            label: sanitizeLabel(scores.hyperactivityLabel || ''),
            color: (scores.hyperactivityLabel === 'Clínico' || scores.hyperactivityLabel === 'Atípico') ? '#F87171' : '#4ADE80'
        }
    ]

    // Helper to generate professional text based on score
    const generateInterpretation = (testType: string, score: number, label: string) => {
        const sanitizedLabel = sanitizeLabel(label)

        if (testType === 'snap-iv') {
            const inattentionScore = scores.inattention || 0
            const hyperactivityScore = scores.hyperactivity || 0

            let detailedText = `El análisis cuantitativo de las respuestas proporcionadas en el cuestionario SNAP-IV revela una puntuación total que sitúa al evaluado en el rango "${sanitizedLabel}". Este instrumento ha sido diseñado para detectar síntomas asociados al Trastorno por Déficit de Atención con Hiperactividad (TDAH).\n\n`

            // Inattention Detail
            detailedText += `**1. Subescala de Desatención (Puntaje: ${inattentionScore.toFixed(2)}):**\n`
            if (inattentionScore > 1.8) {
                detailedText += `El puntaje obtenido se encuentra significativamente por encima de lo esperado, indicando una marcada dificultad para mantener la atención sostenida. Se reportan conductas frecuentes como "no escuchar cuando se le habla directamente", "dificultad para organizar tareas" y "evitación de actividades que requieren esfuerzo mental sostenido". Estos indicadores sugieren un perfil con riesgo clínico de inatención que podría afectar el rendimiento académico y la vida diaria.\n\n`
            } else if (inattentionScore > 1.2) {
                detailedText += `El puntaje se sitúa en un rango limítrofe o atípico. Si bien no alcanza niveles críticos, se observan algunas dificultades para concentrarse en tareas poco estimulantes o repetitivas. Es posible que el evaluado cometa errores por descuido o se distraiga con facilidad ante estímulos externos.\n\n`
            } else {
                detailedText += `El desempeño en esta área es adecuado para la edad y etapa del desarrollo. No se evidencian dificultades significativas en la capacidad para iniciar, mantener y terminar tareas, ni en la organización de actividades cotidianas.\n\n`
            }

            // Hyperactivity Detail
            detailedText += `**2. Subescala de Hiperactividad/Impulsividad (Puntaje: ${hyperactivityScore.toFixed(2)}):**\n`
            if (hyperactivityScore > 1.8) {
                detailedText += `Los resultados indican una presencia significativa de conductas de inquietud motora e impulsividad. Se destacan comportamientos como "moverse en exceso", "correr o trepar en situaciones inapropiadas" y "dificultad para esperar su turno". Este patrón sugiere un desafío importante en la autorregulación conductual y la inhibición de respuestas automáticas.\n\n`
            } else if (hyperactivityScore > 1.2) {
                detailedText += `Se observan indicadores moderados de actividad excesiva o impulsividad. El evaluado puede mostrarse inquieto en situaciones que requieren permanecer sentado o tener dificultades ocasionales para jugar tranquilamente. Estos comportamientos podrían ser reactivos a contextos específicos o estresores ambientales.\n\n`
            } else {
                detailedText += `El nivel de actividad motora y control de impulsos se encuentra dentro de los parámetros esperados. El evaluado demuestra capacidad para regular su comportamiento y adaptarse a las normas sociales de su entorno.\n\n`
            }

            detailedText += `**Conclusión Clínica:**\n`
            detailedText += `Considerando el perfil obtenido, ${label === 'Clínico' || label === 'Atípico'
                ? 'se sugiere profundizar en la evaluación diagnóstica, integrando información de múltiples fuentes (escuela, familia) y considerando la derivación a especialistas para descartar comorbilidades y diseñar un plan de apoyo individualizado.'
                : 'no se observan indicadores que sugieran la presencia de un trastorno del neurodesarrollo en este momento. Se recomienda continuar fomentando hábitos de estudio y rutinas estructuradas para potenciar el desarrollo actual.'}
            
            Es fundamental recordar que este informe representa una evaluación psicométrica y debe ser interpretado en el contexto de la historia clínica completa y la observación directa del paciente.`

            return detailedText
        }
        return `El paciente ha obtenido una puntuación de ${score}, lo cual corresponde a una clasificación de "${sanitizedLabel}". Este resultado debe ser interpretado en el contexto de la historia clínica completa.`
    }

    const interpretation = generateInterpretation(result.test_id, result.results_json?.scores?.total || 0, result.results_json?.scores?.totalLabel || '')

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-10 print:bg-white print:py-0">
            <div className="container max-w-4xl mx-auto print:max-w-none print:p-0">

                {/* Actions Bar - Hidden in Print */}
                <div className="mb-8 flex justify-between items-center print:hidden">
                    <Button variant="outline" asChild>
                        <Link href={`/patients/${patient.id}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Ficha
                        </Link>
                    </Button>
                    <ReportActions
                        patient={patient}
                        profile={profile}
                        result={result}
                        interpretation={interpretation}
                        chartData={chartData}
                    />
                </div>

                {/* Report Content */}
                <div className="bg-white shadow-lg p-12 md:p-16 rounded-xl print:shadow-none print:rounded-none">

                    {/* Header */}
                    <div className="border-b border-slate-200 pb-8 mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Informe Clínico Psicométrico</h1>
                            <p className="text-slate-500 mt-1">Confidencial</p>
                        </div>
                        <div className="text-right">
                            <h2 className="font-bold text-slate-900">{profile.full_name || 'Profesional Tratante'}</h2>
                            <p className="text-sm text-slate-500">{profile.specialty || 'Psicología Clínica / Neuropsicología'}</p>
                            <p className="text-sm text-slate-500">{profile.email}</p>
                        </div>
                    </div>

                    {/* Identification */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Identificación del Paciente</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-slate-700">Nombre:</span>
                                <span className="col-span-2 text-slate-900">{patient.full_name}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-slate-700">Fecha de Nacimiento:</span>
                                <span className="col-span-2 text-slate-900">{patient.birth_date}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-slate-700">Fecha de Evaluación:</span>
                                <span className="col-span-2 text-slate-900">{formattedDate}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-slate-700">Instrumento:</span>
                                <span className="col-span-2 text-slate-900 font-medium">{result?.test_id?.toUpperCase() || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">Resultados Cuantitativos</h3>

                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                            {Array.isArray(results_json.details) ? (
                                <div className="space-y-4">
                                    {results_json.details.map((detail: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center border-b border-slate-200 last:border-0 pb-3 last:pb-0">
                                            <span className="font-medium text-slate-700">{detail.title}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-slate-900 font-bold">{detail.score}</span>
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${detail.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {sanitizeLabel(detail.label)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-slate-700">Puntuación Total</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-slate-900 font-bold text-lg">{results_json.score}</span>
                                        <span className="text-sm font-semibold bg-slate-200 px-3 py-1 rounded-full text-slate-700">
                                            {sanitizeLabel(results_json.label)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chart Section */}
                    <ReportChart data={chartData} />

                    {/* Interpretation */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Interpretación Clínica</h3>
                        <div className="prose prose-slate max-w-none text-justify text-slate-800 leading-relaxed whitespace-pre-wrap">
                            {interpretation}
                        </div>
                        <p className="mt-4 text-sm text-slate-600 italic">
                            La presente evaluación constituye un corte transversal del funcionamiento del paciente. Se sugiere considerar estos resultados como indicadores de apoyo a la hipótesis diagnóstica, debiendo ser contrastados con la evolución clínica y otros antecedentes relevantes.
                        </p>
                    </div>

                    {/* Signature */}
                    <div className="mt-24 flex justify-center">
                        <div className="text-center max-w-lg w-full">
                            <div className="h-20 mb-4"></div> {/* Space for manual signature */}
                            <div className="border-t border-slate-900 pt-4">
                                <p className="font-bold text-slate-900 text-lg mb-1">{profile.full_name}</p>

                                <div className="text-sm text-slate-800 space-y-1 mb-3">
                                    <p>{profile.specialty || 'Psicólogo Clínico'}</p>
                                    {profile.registry_number && <p>Nº Registro {profile.registry_number}</p>}
                                </div>

                                {profile.signature_url && (
                                    <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                                        {profile.signature_url}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
                        <p>Informe generado automáticamente por Neurometrics Clinical Suite el {formattedDate}.</p>
                        <p>Este documento es confidencial y para uso exclusivo del profesional tratante.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
