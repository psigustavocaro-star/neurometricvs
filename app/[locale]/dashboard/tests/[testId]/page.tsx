import { PatientSelectorDialog } from "@/components/tests/patient-selector-dialog"
import { getTranslations } from "next-intl/server"
import { standardTests } from "@/lib/tests-registry"
import { notFound } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Activity, FileText } from "lucide-react"

// Category mapping from internal to display names (Should be shared but minimal here)
const categoryMap: Record<string, string> = {
    'psychology': 'Psicología',
    'psychiatry': 'Psiquiatría',
    'neurology': 'Neurología',
    'pediatrics': 'Pediatría',
    'geriatrics': 'Geriatría',
    'speech': 'Fonoaudiología',
    'occupational': 'Terapia Ocupacional',
    'addiction': 'Adicciones',
    'other': 'General'
}

const inferAgeRange = (title: string, category: string): string => {
    const lowerTitle = title.toLowerCase()
    const lowerCat = category.toLowerCase()

    if (lowerTitle.includes('gds') || lowerTitle.includes('pfeiffer') || lowerTitle.includes('mini-cog') || lowerTitle.includes('demencia')) return 'Adulto Mayor (65+)'
    if (lowerCat === 'pediatrics' || lowerTitle.includes('m-chat') || lowerTitle.includes('vanderbilt') || lowerTitle.includes('prolec')) return 'Infantil/Adolescentes (6-18)'
    return 'Todas las edades'
}

export default async function TestDetailsPage({ params }: { params: Promise<{ testId: string }> }) {
    const t = await getTranslations('Pricing.Dashboard.Tests')
    const { testId } = await params

    // Direct lookup in registry
    const testDef = standardTests[testId as keyof typeof standardTests]

    if (!testDef) {
        notFound()
    }

    const rawCategory = testDef.category || 'other'
    const displayCategory = categoryMap[rawCategory] || rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1)

    // Map definition to display format
    const test = {
        id: testId,
        name: testDef.title,
        description: testDef.description,
        category: displayCategory,
        type: 'Test Estandarizado',
        duration: testDef.duration || 'Variable',
        questions: testDef.questions?.filter((q: any) => q.type !== 'info').length || 0,
        ageRange: inferAgeRange(testDef.title || '', rawCategory)
    }

    return (
        <div className="container py-10 max-w-4xl">
            <div className="mb-6">
                <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                    <Link href="/dashboard/tests">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('back_to_catalog')}
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
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors bg-slate-100 text-slate-600 border-transparent">
                                {test.ageRange}
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{test.name}</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            {test.description}
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('about_test')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-slate-600 dark:text-slate-400">
                                {t('disclaimer')} Esta herramienta es un apoyo al diagnóstico clínico y no reemplaza el juicio profesional. Asegúrese de revisar la validez para su población específica.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                    <div className="bg-white dark:bg-slate-950 p-2 rounded-full shadow-sm">
                                        <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">{t('estimated_duration')}</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{test.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                    <div className="bg-white dark:bg-slate-950 p-2 rounded-full shadow-sm">
                                        <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">{t('items_label')}</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {test.questions > 0 ? t('questions_count', { count: test.questions }) : t('variable_questions')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>{t('actions_title')}</CardTitle>
                            <CardDescription>{t('actions_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <PatientSelectorDialog testId={test.id} testName={test.name} />

                            <Button variant="outline" className="w-full justify-start" disabled>
                                <FileText className="mr-2 h-4 w-4" />
                                {t('view_report_sample')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
