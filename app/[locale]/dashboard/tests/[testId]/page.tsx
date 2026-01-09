import { testsCatalog as mockTests } from "@/lib/data/tests-catalog"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Clock, Activity, FileText, ArrowLeft, Play } from "lucide-react"
import Link from "next/link"
import { PatientSelectorDialog } from "@/components/tests/patient-selector-dialog"

export default async function TestDetailsPage({ params }: { params: Promise<{ testId: string }> }) {
    const { testId } = await params
    const test = mockTests.find(t => t.id === testId)

    if (!test) {
        notFound()
    }

    return (
        <div className="container py-10 max-w-4xl">
            <div className="mb-6">
                <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                    <Link href="/dashboard/tests">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al Catálogo
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-teal-50 text-teal-700 border-transparent">
                                {test.category}
                            </div>
                            {test.type && (
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors bg-slate-100 text-slate-600 border-transparent">
                                    {test.type}
                                </div>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{test.name}</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            {test.description}
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Acerca de este test</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-slate-600 dark:text-slate-400">
                                Este instrumento está diseñado para ser aplicado en el contexto clínico y educativo.
                                Asegúrese de contar con el consentimiento informado del paciente antes de proceder.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                    <div className="bg-white dark:bg-slate-950 p-2 rounded-full shadow-sm">
                                        <Clock className="h-5 w-5 text-teal-600 dar:text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Duración Estimada</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{test.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                    <div className="bg-white dark:bg-slate-950 p-2 rounded-full shadow-sm">
                                        <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Items</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{test.questions > 0 ? test.questions : 'Variable'} preguntas</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Acciones</CardTitle>
                            <CardDescription>Opciones disponibles para este test</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <PatientSelectorDialog testId={test.id} testName={test.name} />

                            <Button variant="outline" className="w-full justify-start" disabled>
                                <FileText className="mr-2 h-4 w-4" />
                                Ver Muestra de Informe
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
