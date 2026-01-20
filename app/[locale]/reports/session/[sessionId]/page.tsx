import { getSession, getSessionTests } from '@/app/[locale]/patients/clinical-actions'
import { getPatient } from '@/app/actions/patients'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { PrintButton } from '@/components/print-button'

interface ReportPageProps {
    params: {
        sessionId: string
        locale: string
    }
}

export default async function ReportPage({ params: { sessionId, locale } }: ReportPageProps) {
    const t = await getTranslations({ locale, namespace: 'Dashboard.Patients.Sessions' })
    const session = await getSession(sessionId)

    if (!session) return notFound()

    const patient = await getPatient(session.patient_id)
    const tests = await getSessionTests(sessionId)

    // Helper for safe colors
    const getColorClasses = (color: string) => {
        switch (color) {
            case 'green': return 'text-green-700 bg-green-50 border-green-200'
            case 'yellow': return 'text-yellow-800 bg-yellow-50 border-yellow-200'
            case 'red': return 'text-red-700 bg-red-50 border-red-200'
            case 'blue': return 'text-blue-700 bg-blue-50 border-blue-200'
            default: return 'text-slate-700 bg-slate-50 border-slate-200'
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 print:p-0 print:bg-white flex flex-col items-center">

            {/* Print Controls */}
            <div className="w-[210mm] mb-6 flex justify-between items-center print:hidden">
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">Vista Previa del Informe</h1>
                <PrintButton />
            </div>

            {/* A4 Page */}
            <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-xl print:shadow-none p-[20mm] relative">

                {/* Header */}
                <div className="flex justify-between items-start mb-12 border-b-2 border-slate-100 pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Informe Clínico</h1>
                        <p className="text-sm text-slate-500 mt-1">Generado automáticamente por Neurometrics</p>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                        <p>Fecha de Emisión: {format(new Date(), 'dd/MM/yyyy', { locale: es })}</p>
                        <p>ID Sesión: {sessionId.slice(0, 8)}</p>
                    </div>
                </div>

                {/* Patient Info */}
                {patient && (
                    <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-transparent print:border print:border-slate-200">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Información del Paciente</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <span className="text-sm text-slate-500 block">Nombre Completo</span>
                                <span className="font-semibold text-slate-900">{patient.full_name}</span>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500 block">Fecha de Nacimiento</span>
                                <span className="font-semibold text-slate-900">{patient.birth_date ? format(new Date(patient.birth_date), 'dd/MM/yyyy', { locale: es }) : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Session Details */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-teal-500 pl-3">Detalles de la Sesión</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                            <span className="text-slate-500 block">Fecha</span>
                            <span className="font-medium">{format(new Date(session.date), 'dd/MM/yyyy', { locale: es })}</span>
                        </div>
                        <div>
                            <span className="text-slate-500 block">Duración</span>
                            <span className="font-medium">{session.duration} minutos</span>
                        </div>
                        <div>
                            <span className="text-slate-500 block">Tipo</span>
                            <span className="font-medium capitalize">{session.type}</span>
                        </div>
                    </div>
                    {session.notes && (
                        <div className="mt-4 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
                            {session.notes}
                        </div>
                    )}
                </div>

                {/* Test Results */}
                {tests.length > 0 && (
                    <div className="mb-12 break-inside-avoid">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-indigo-500 pl-3">Evaluaciones Aplicadas</h2>
                        <div className="space-y-4">
                            {tests.map((test: any) => {
                                const details = test.results_json
                                const styles = getColorClasses(details.color)
                                return (
                                    <div key={test.id} className={`p-4 rounded-lg border flex justify-between items-center ${styles} print:border-slate-200 print:bg-slate-50 print:text-slate-900`}>
                                        <div>
                                            <p className="font-bold">{details.testTitle || test.test_type}</p>
                                            <p className="text-sm opacity-80">{details.label}</p>
                                        </div>
                                        <div className="text-2xl font-bold">{details.score}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* AI Analysis (Optional) */}
                {session.ai_insights?.analysis && (
                    <div className="mb-12 break-inside-avoid">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-purple-500 pl-3">Análisis Clínico (IA)</h2>
                        <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap text-justify italic">
                            {session.ai_insights.analysis}
                        </div>
                    </div>
                )}

                {/* Signature Block */}
                <div className="mt-20 break-inside-avoid">
                    <div className="grid grid-cols-2 gap-12">
                        <div className="border-t border-slate-300 pt-4 text-center">
                            <p className="font-bold text-slate-900">Profesional Tratante</p>
                            <p className="text-xs text-slate-500 mt-1">Firma Digital</p>
                        </div>
                        {/* Optional second signature */}
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
                    Este documento es confidencial y para uso exclusivo del paciente y profesionales autorizados.
                </div>

            </div>
        </div>
    )
}
