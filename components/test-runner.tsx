'use client'

import { useState } from 'react'
import { TestDefinition } from '@/types/test'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { saveTestResult } from '@/app/tests/actions'
import { useSearchParams, useRouter } from 'next/navigation'

export function TestRunner({ test }: { test: TestDefinition }) {
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [results, setResults] = useState<{ title: string; score: number; label: string; color: string }[] | null>(null)
    const [resultId, setResultId] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const searchParams = useSearchParams()
    const router = useRouter()
    const patientId = searchParams.get('patientId')

    function handleAnswer(questionId: string, value: string) {
        setAnswers(prev => ({
            ...prev,
            [questionId]: parseInt(value)
        }))
    }

    async function calculateScore() {
        const calculatedResults: { title: string; score: number; label: string; color: string }[] = []

        // Helper to calculate score for a set of questions
        const calc = (questionIds: string[], type: 'sum' | 'average' = 'sum', ranges: any[]) => {
            let total = 0
            let count = 0
            questionIds.forEach(id => {
                if (answers[id] !== undefined) {
                    total += answers[id]
                    count++
                }
            })

            const finalScore = type === 'average' ? (count > 0 ? total / count : 0) : total
            // Round to 2 decimals if average
            const roundedScore = type === 'average' ? Math.round(finalScore * 100) / 100 : finalScore

            const range = ranges.find(r => roundedScore >= r.min && roundedScore <= r.max)
            return {
                score: roundedScore,
                label: range?.label || 'Desconocido',
                color: range?.color || 'gray'
            }
        }

        // 1. Global Score (if defined)
        if (test.scoring) {
            const allQuestionIds = test.questions.map(q => q.id)
            const res = calc(allQuestionIds, test.scoring.type, test.scoring.ranges)
            calculatedResults.push({ title: 'Total', ...res })
        }

        // 2. Subscales (if defined)
        if (test.subscales) {
            test.subscales.forEach(sub => {
                const res = calc(sub.questionIds, sub.scoringType, sub.ranges)
                calculatedResults.push({ title: sub.name, ...res })
            })
        }

        setResults(calculatedResults)

        if (patientId) {
            setSaving(true)
            // Save the primary result (first one) or a summary. 
            // For now, we'll save the first result's score/label but maybe we need to update the save action to support detailed results.
            // Assuming saveTestResult takes a single score/label for now, we might need to update it later.
            // We'll save the first result as the "main" one.
            const mainResult = calculatedResults[0]
            const response = await saveTestResult(patientId, test.id, mainResult.score, {
                label: mainResult.label,
                color: mainResult.color,
                details: calculatedResults // We can pass the full details if the backend supports it
            })

            if (response && response.id) {
                setResultId(response.id)
            }
            setSaving(false)
        }
    }

    if (results) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Resultados: {test.title}</CardTitle>
                    <CardDescription>Resumen de puntuaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        {results.map((res, idx) => (
                            <div key={idx} className="p-4 rounded-lg border bg-slate-50 flex flex-col items-center text-center">
                                <h4 className="font-medium text-slate-600 mb-1">{res.title}</h4>
                                <div className="text-3xl font-bold mb-1">{res.score}</div>
                                <div className={`text-sm font-semibold text-${res.color}-600 px-2 py-0.5 rounded-full bg-${res.color}-50`}>
                                    {res.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {patientId && (
                        <p className="text-sm text-green-600 font-medium text-center">
                            {saving ? 'Guardando...' : 'Resultado guardado en la ficha del paciente.'}
                        </p>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    {patientId && resultId && (
                        <Button onClick={() => router.push(`/reports/${resultId}`)} className="w-full bg-teal-600 hover:bg-teal-700">
                            Ir al Informe
                        </Button>
                    )}
                    {patientId ? (
                        <Button onClick={() => router.push(`/patients/${patientId}`)} className="w-full" variant="outline">
                            Volver a la Ficha del Paciente
                        </Button>
                    ) : (
                        <Button onClick={() => { setResults(null); setAnswers({}) }} variant="outline" className="w-full">
                            Realizar otro test
                        </Button>
                    )}
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {test.questions.map((q) => (
                    <div key={q.id} className="space-y-3 pb-4 border-b border-slate-100 last:border-0">
                        <h3 className="font-medium text-base text-slate-800">{q.text}</h3>
                        {q.type === 'scale' && (
                            <RadioGroup onValueChange={(val) => handleAnswer(q.id, val)} className="flex flex-wrap gap-4 pt-2">
                                {q.options?.map((opt) => (
                                    <div key={opt.label} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt.value.toString()} id={`${q.id}-${opt.value}`} />
                                        <Label htmlFor={`${q.id}-${opt.value}`} className="font-normal text-slate-600 cursor-pointer">{opt.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                        {q.type === 'single_choice' && (
                            <RadioGroup onValueChange={(val) => handleAnswer(q.id, val)}>
                                {q.options?.map((opt) => (
                                    <div key={opt.label} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt.value.toString()} id={`${q.id}-${opt.value}`} />
                                        <Label htmlFor={`${q.id}-${opt.value}`}>{opt.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={calculateScore}
                    className="w-full"
                    disabled={Object.keys(answers).length !== test.questions.length}
                >
                    Finalizar Test
                </Button>
            </CardFooter>
        </Card>
    )
}
