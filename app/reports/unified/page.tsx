import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { UnifiedReportActions } from "@/components/reports/unified-report-actions"

export default async function UnifiedReportPage({ searchParams }: { searchParams: Promise<{ ids: string, patientId: string }> }) {
    const supabase = await createClient()
    const { ids, patientId } = await searchParams

    if (!ids || !patientId) {
        notFound()
    }

    const resultIds = ids.split(',')

    const { data: results } = await supabase
        .from('test_results')
        .select('*')
        .in('id', resultIds)
        .order('created_at', { ascending: true }) // Oldest first for progress

    const { data: patient } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single()

    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

    if (!results || !patient || !profile) {
        notFound()
    }

    const reportDate = format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es })

    // Helper to sanitize legacy labels
    const sanitizeLabel = (label: string) => {
        if (label === 'Normal') return 'Sin Indicadores Clínicos'
        return label
    }

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
                    <UnifiedReportActions />
                </div>

                {/* Report Content */}
                <div className="bg-white shadow-lg p-12 md:p-16 rounded-xl print:shadow-none print:rounded-none">

                    {/* Header */}
                    <div className="border-b border-slate-200 pb-8 mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Informe de Progreso Clínico</h1>
                            <p className="text-slate-500 mt-1">Análisis Evolutivo Integrado</p>
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
                                <span className="font-semibold text-slate-700">Fecha de Emisión:</span>
                                <span className="col-span-2 text-slate-900">{reportDate}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-slate-700">Evaluaciones:</span>
                                <span className="col-span-2 text-slate-900 font-medium">{results.length} registros analizados</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Analysis */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">Análisis de Evolución</h3>

                        <div className="space-y-8">
                            {results.map((result, idx) => {
                                const date = format(new Date(result.created_at), "d 'de' MMMM, yyyy", { locale: es })
                                const testName = result.test_type.toUpperCase()
                                const { score, label, color, details } = result.results_json

                                return (
                                    <div key={result.id} className="relative pl-8 border-l-2 border-slate-200 pb-8 last:pb-0 last:border-0">
                                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-teal-500 border-4 border-white shadow-sm" />

                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-sm font-bold text-slate-400 uppercase">{date}</span>
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{testName}</span>
                                        </div>

                                        <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-bold text-slate-800">Resultados de la Sesión</h4>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-900 font-bold">Total: {score}</span>
                                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color === 'red' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                        {sanitizeLabel(label)}
                                                    </span>
                                                </div>
                                            </div>

                                            {details && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                    {details.map((d: any, i: number) => (
                                                        <div key={i} className="flex justify-between border-b border-slate-200 pb-1 last:border-0">
                                                            <span className="text-slate-600">{d.title}</span>
                                                            <span className="font-medium text-slate-900">{d.score} ({sanitizeLabel(d.label)})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Synthesis */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Síntesis de Progreso</h3>
                        <div className="prose prose-slate max-w-none text-justify text-slate-800 leading-relaxed bg-teal-50/50 p-6 rounded-lg border border-teal-100">
                            <p>
                                El análisis longitudinal de los datos sugiere una trayectoria clínica que debe ser monitoreada.
                                {results.length > 1 ? (
                                    ` Se observan variaciones en los indicadores evaluados a lo largo de ${results.length} sesiones. Es fundamental correlacionar estos cambios psicométricos con la adherencia al tratamiento y eventos vitales significativos reportados en la entrevista clínica.`
                                ) : (
                                    " Al contar con una única evaluación en este reporte, se establece una línea base para futuras comparaciones."
                                )}
                            </p>
                            <p className="mt-2 font-medium text-teal-800">
                                <TrendingUp className="inline-block h-4 w-4 mr-1" />
                                Recomendación: Continuar con el monitoreo periódico para establecer la estabilidad de los cambios observados.
                            </p>
                        </div>
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
                        <p>Informe de Progreso generado automáticamente por Neurometrics Clinical Suite el {reportDate}.</p>
                        <p>Este documento es confidencial y para uso exclusivo del profesional tratante.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
