"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ProfessionalTestReport, TestResults } from '@/components/reports/professional-test-report'
import { TestDefinition } from '@/types/test'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Import all test definitions
import { depressionScale as phq9 } from '@/lib/tests/phq9'
import { snapIV } from '@/lib/tests/snap-iv'
import { gad7 } from '@/lib/tests/gad7'
import { rosenbergSelfEsteem } from '@/lib/tests/rosenberg'
import { bis11 } from '@/lib/tests/bis11'
import { scared } from '@/lib/tests/scared'

const testDefinitions: Record<string, TestDefinition> = {
    'phq-9': phq9,
    'snap-iv': snapIV,
    'gad-7': gad7,
    'rosenberg': rosenbergSelfEsteem,
    'bis-11': bis11,
    'scared': scared
}

interface ReportPageClientProps {
    resultId: string
}

export function ReportPageClient({ resultId }: ReportPageClientProps) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [testResult, setTestResult] = useState<any>(null)
    const [patient, setPatient] = useState<any>(null)
    const [testDef, setTestDef] = useState<TestDefinition | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function loadReport() {
            const supabase = createClient()

            try {
                // Fetch test result
                const { data: result, error: resultError } = await supabase
                    .from('test_results')
                    .select(`
                        *,
                        patients (
                            id,
                            name,
                            age,
                            gender
                        )
                    `)
                    .eq('id', resultId)
                    .single()

                if (resultError) throw resultError
                if (!result) throw new Error('Resultado no encontrado')

                setTestResult(result)
                setPatient(result.patients)

                // Get test definition
                const def = testDefinitions[result.test_id]
                if (!def) {
                    throw new Error(`Definición del test "${result.test_id}" no encontrada`)
                }
                setTestDef(def)

            } catch (err: any) {
                console.error('Error loading report:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadReport()
    }, [resultId])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Cargando informe...</p>
                </div>
            </div>
        )
    }

    if (error || !testResult || !testDef) {
        return (
            <div className="container py-10">
                <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6 text-center space-y-4">
                        <p className="text-red-600">Error: {error || 'No se pudo cargar el informe'}</p>
                        <Button variant="outline" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Build TestResults object from stored data
    const metadata = testResult.metadata || {}
    const score = testResult.score

    // Calculate max possible score
    const maxPossibleScore = testDef.questions.reduce((acc, q) => {
        const maxOpt = q.options ? Math.max(...q.options.map(o => Number(o.value))) : 0
        return acc + maxOpt
    }, 0)

    // Build subscale scores
    let subscaleScores: TestResults['subscaleScores'] = []
    if (metadata.subscales) {
        subscaleScores = metadata.subscales.map((sub: any) => {
            // Find subscale definition to get max score
            const subDef = testDef.subscales?.find(s => s.id === sub.id)
            const maxSubScore = subDef ? subDef.questionIds.reduce((acc, qId) => {
                const q = testDef.questions.find(qu => qu.id === qId)
                const maxOpt = q?.options ? Math.max(...q.options.map(o => Number(o.value))) : 0
                return acc + maxOpt
            }, 0) : 0

            return {
                subscaleId: sub.id,
                subscaleName: sub.name,
                score: sub.score,
                maxScore: maxSubScore,
                rangeLabel: sub.label,
                rangeColor: sub.color,
                description: subDef?.description
            }
        })
    }

    // Find range for description
    const range = testDef.scoring?.ranges?.find(r => score >= r.min && score <= r.max)

    const results: TestResults = {
        testId: testResult.test_id,
        totalScore: score,
        maxPossibleScore,
        percentageScore: (score / maxPossibleScore) * 100,
        rangeLabel: metadata.label || 'Completado',
        rangeColor: metadata.color || 'gray',
        rangeDescription: range?.description,
        subscaleScores,
        responses: metadata.answers || {},
        completedAt: new Date(testResult.created_at)
    }

    return (
        <div className="container py-6">
            <ProfessionalTestReport
                test={testDef}
                results={results}
                patientName={patient?.name || 'Paciente'}
                patientAge={patient?.age}
                patientGender={patient?.gender}
                evaluationDate={new Date(testResult.created_at)}
            />
        </div>
    )
}
