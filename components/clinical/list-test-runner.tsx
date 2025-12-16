'use client'

import React, { useState } from 'react'
import { TestDefinition } from '@/types/test'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Save, Shuffle, ArrowLeft, X } from 'lucide-react'
import { toast } from 'sonner'
import { saveTestResult } from '@/app/[locale]/tests/actions'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ListTestRunnerProps {
    test: TestDefinition
    patientId?: string
    onComplete?: () => void
}

export function ListTestRunner({ test, patientId, onComplete }: ListTestRunnerProps) {
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [finalScore, setFinalScore] = useState<any>(null)
    const [resultId, setResultId] = useState<string | null>(null)
    const router = useRouter()

    const totalQuestions = test.questions.length
    const answeredCount = Object.keys(answers).length
    const progress = (answeredCount / totalQuestions) * 100

    // Generate random answers for all questions (for testing purposes)
    const fillRandomData = () => {
        const randomAnswers: Record<string, number> = {}
        test.questions.forEach((question) => {
            if (question.options && question.options.length > 0) {
                const randomIndex = Math.floor(Math.random() * question.options.length)
                randomAnswers[question.id] = Number(question.options[randomIndex].value)
            }
        })
        setAnswers(randomAnswers)
        toast.success("Datos aleatorios generados")
    }

    const handleAnswer = (questionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }))
    }

    const calculateAndSave = async () => {
        // Calculate total score
        let totalScore = 0
        Object.values(answers).forEach(v => totalScore += v)

        // Check subscales if they exist
        let subscaleResults: any[] = []
        if (test.subscales) {
            subscaleResults = test.subscales.map(subscale => {
                const subscaleSum = subscale.questionIds.reduce((acc, qId) => acc + (answers[qId] || 0), 0)
                const subscaleScore = subscale.scoringType === 'average'
                    ? subscaleSum / subscale.questionIds.length
                    : subscaleSum
                const range = subscale.ranges?.find(r => subscaleScore >= r.min && subscaleScore <= r.max)
                return {
                    id: subscale.id,
                    name: subscale.name,
                    score: Math.round(subscaleScore * 100) / 100,
                    label: range?.label || 'Sin clasificar',
                    color: range?.color || 'gray'
                }
            })
        }

        // Simple range check for total
        const ranges = test.scoring?.ranges || []
        const range = ranges.find(r => totalScore >= r.min && totalScore <= r.max)

        const resultData = {
            score: totalScore,
            label: range?.label || 'Completado',
            color: range?.color || 'gray',
            subscales: subscaleResults
        }

        setFinalScore(resultData)
        setIsSubmitting(true)

        if (patientId) {
            try {
                const result = await saveTestResult(patientId, test.id, resultData.score, {
                    label: resultData.label,
                    color: resultData.color,
                    subscales: subscaleResults,
                    answers: answers
                })
                if (result.id) {
                    setResultId(result.id)
                }
                toast.success("Resultados guardados correctamente")
                setIsCompleted(true)
                if (onComplete) onComplete()
            } catch (e) {
                toast.error("Error al guardar resultados")
            } finally {
                setIsSubmitting(false)
            }
        } else {
            setIsCompleted(true)
            setIsSubmitting(false)
        }
    }

    // Get unique options from first question (assuming all questions have same options)
    const commonOptions = test.questions[0]?.options || []

    if (isCompleted && finalScore) {
        // Calculate max possible score
        const maxPossibleScore = test.questions.reduce((acc, q) => {
            const maxOpt = q.options ? Math.max(...q.options.map(o => Number(o.value))) : 0
            return acc + maxOpt
        }, 0)
        const percentageScore = Math.round((finalScore.score / maxPossibleScore) * 100)

        return (
            <Card className="w-full max-w-4xl mx-auto text-center py-10">
                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <CheckCircle2 className="w-16 h-16 text-teal-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Evaluación Completada</h2>
                        <p className="text-slate-500 dark:text-slate-400">Los resultados han sido registrados.</p>
                    </div>

                    {/* Score Summary */}
                    <div className={cn(
                        "max-w-sm mx-auto p-6 rounded-xl border-2",
                        finalScore.color === 'green' && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                        finalScore.color === 'red' && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
                        finalScore.color === 'yellow' && "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
                        finalScore.color === 'orange' && "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800",
                    )}>
                        <p className="text-4xl font-bold text-slate-800 dark:text-white">{finalScore.score}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">de {maxPossibleScore} puntos ({percentageScore}%)</p>
                        <p className={cn(
                            "text-lg font-semibold mt-2",
                            finalScore.color === 'green' && "text-green-600 dark:text-green-400",
                            finalScore.color === 'red' && "text-red-600 dark:text-red-400",
                            finalScore.color === 'yellow' && "text-yellow-600 dark:text-yellow-400",
                            finalScore.color === 'orange' && "text-orange-600 dark:text-orange-400",
                        )}>{finalScore.label}</p>
                    </div>

                    {/* Subscale Results */}
                    {finalScore.subscales && finalScore.subscales.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            {finalScore.subscales.map((sub: any) => (
                                <div
                                    key={sub.id}
                                    className={cn(
                                        "p-4 rounded-xl border-2",
                                        sub.color === 'green' && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                                        sub.color === 'red' && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
                                        sub.color === 'yellow' && "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
                                        sub.color === 'orange' && "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800",
                                    )}
                                >
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-1">{sub.name}</p>
                                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{sub.score}</p>
                                    <p className={cn(
                                        "text-sm font-semibold mt-1",
                                        sub.color === 'green' && "text-green-600 dark:text-green-400",
                                        sub.color === 'red' && "text-red-600 dark:text-red-400",
                                    )}>{sub.label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-center gap-4 pt-4">
                        <Button variant="outline" onClick={() => router.push(`/patients/${patientId}`)}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al Paciente
                        </Button>
                        <Button
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                            onClick={() => resultId && router.push(`/reports/${resultId}`)}
                            disabled={!resultId}
                        >
                            Ver Informe Profesional
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }


    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 py-6 px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-4 z-10">
                <div className="flex items-start gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="shrink-0 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{test.title}</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{test.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-teal-600">{answeredCount}</span> / {totalQuestions} respondidas
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fillRandomData}
                        className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Datos aleatorios
                    </Button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div
                    className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Questions Table */}
            <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-200 min-w-[300px]">
                                    Pregunta
                                </th>
                                {commonOptions.map((opt) => (
                                    <th
                                        key={opt.value}
                                        className="p-4 font-medium text-slate-600 dark:text-slate-300 text-center whitespace-nowrap min-w-[100px]"
                                    >
                                        {opt.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {test.questions.map((question, index) => (
                                <tr
                                    key={question.id}
                                    className={cn(
                                        "border-b border-slate-100 dark:border-slate-800 transition-colors",
                                        index % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-800/30",
                                        answers[question.id] !== undefined && "bg-teal-50/50 dark:bg-teal-900/10"
                                    )}
                                >
                                    <td className="p-4 text-slate-700 dark:text-slate-200">
                                        {question.text}
                                    </td>
                                    {(question.options || commonOptions).map((opt) => (
                                        <td key={opt.value} className="p-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleAnswer(question.id, Number(opt.value))}
                                                className={cn(
                                                    "w-6 h-6 rounded-full border-2 transition-all mx-auto flex items-center justify-center",
                                                    answers[question.id] === opt.value
                                                        ? "border-teal-600 bg-teal-600 text-white"
                                                        : "border-slate-300 dark:border-slate-600 hover:border-teal-400"
                                                )}
                                            >
                                                {answers[question.id] === opt.value && (
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                )}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end sticky bottom-4">
                <Button
                    onClick={calculateAndSave}
                    disabled={answeredCount !== totalQuestions || isSubmitting}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 shadow-lg"
                    size="lg"
                >
                    {isSubmitting ? 'Guardando...' : 'Finalizar Evaluación'}
                    <Save className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )
}
