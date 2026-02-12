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
import { getCurrentCountry, getNormsText } from '@/lib/utils/location'
import { Info } from 'lucide-react'

interface ListTestRunnerProps {
    test: TestDefinition
    patientId?: string
    sessionId?: string
    onComplete?: () => void
}

export function ListTestRunner({ test, patientId, sessionId, onComplete }: ListTestRunnerProps) {
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [finalScore, setFinalScore] = useState<any>(null)
    const [resultId, setResultId] = useState<string | null>(null)
    const router = useRouter()

    const totalQuestions = test.questions.length
    const answeredCount = Object.keys(answers).length
    const progress = (answeredCount / totalQuestions) * 100

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
        let totalScore = 0
        Object.values(answers).forEach(v => totalScore += v)

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
                    answers: answers,
                    reference: test.reference
                }, sessionId)
                if (result.id) {
                    setResultId(result.id)
                }
                toast.success("Resultados guardados correctamente")
                setIsCompleted(true)
                if (onComplete) onComplete()
            } catch (error) {
                toast.error("Error al guardar los resultados")
                console.error(error)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    if (isCompleted && finalScore) {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <Card className="border-2 border-green-500/20 bg-green-50/10 dark:bg-green-950/10">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl">¡Evaluación Completada!</CardTitle>
                        <CardDescription>
                            Los resultados han sido procesados y guardados de forma segura.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full max-w-sm">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Puntuación Total</div>
                            <div className="text-5xl font-black text-primary mb-2">{finalScore.score}</div>
                            <div className={cn(
                                "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase",
                                finalScore.color === 'red' && "bg-red-100 text-red-700",
                                finalScore.color === 'yellow' && "bg-yellow-100 text-yellow-700",
                                finalScore.color === 'green' && "bg-green-100 text-green-700",
                                finalScore.color === 'gray' && "bg-slate-100 text-slate-700",
                            )}>
                                {finalScore.label}
                            </div>
                        </div>

                        <div className="flex gap-4 w-full mt-4">
                            <Button
                                className="flex-1"
                                variant="outline"
                                onClick={() => router.push(`/dashboard/patients/${patientId}`)}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver al Perfil
                            </Button>
                            {resultId && (
                                <Button
                                    className="flex-1"
                                    onClick={() => router.push(`/reports/test/${resultId}`)}
                                >
                                    Ver Informe APA
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const isBlocksUI = test.uiType === 'blocks'
    const commonOptions = test.questions[0]?.options || []

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Professional Sticky Header */}
            <div className="sticky top-4 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">{test.title}</h1>
                        <div className="flex items-center gap-2">
                            <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                {answeredCount} de {totalQuestions} completados
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={fillRandomData} className="text-xs h-8 border-dashed">
                        <Shuffle className="mr-2 h-3 w-3" />
                        Simular Datos
                    </Button>
                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />
                    <Button
                        disabled={answeredCount < totalQuestions || isSubmitting}
                        onClick={calculateAndSave}
                        className="h-8 text-xs font-bold px-6 shadow-lg shadow-primary/20"
                    >
                        {isSubmitting ? "Procesando..." : "Finalizar Protocolo"}
                        <Save className="ml-2 h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* Country Norms Info Banner */}
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center flex-shrink-0">
                    <Info className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                    <p className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-0.5">Baremo Aplicado</p>
                    <p className="text-sm text-teal-700 dark:text-teal-400">
                        {getNormsText(getCurrentCountry())} Esta evaluación ha sido calibrada con las normas clínicas vigentes para su región.
                    </p>
                </div>
            </div>

            {/* Questions Interface */}
            {isBlocksUI ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {test.questions.map((question, index) => (
                        <Card key={question.id} className={cn(
                            "transition-all duration-300 border-none shadow-sm overflow-hidden",
                            answers[question.id] !== undefined ? "ring-2 ring-primary/20 bg-primary/5" : "bg-white dark:bg-slate-950"
                        )}>
                            <div className="p-5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-500">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                        {question.text}
                                    </h3>
                                </div>
                                <RadioGroup
                                    value={answers[question.id]?.toString()}
                                    onValueChange={(v) => handleAnswer(question.id, parseInt(v))}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {question.options?.map((option) => (
                                        <div key={option.value} className="relative">
                                            <RadioGroupItem
                                                value={option.value.toString()}
                                                id={`${question.id}-${option.value}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`${question.id}-${option.value}`}
                                                className={cn(
                                                    "flex flex-col items-center justify-center p-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-slate-50 dark:hover:bg-slate-800",
                                                    "text-center text-xs font-bold h-full min-h-[60px]"
                                                )}
                                            >
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                    <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest min-w-[300px]">Ítem / Reactivo</th>
                                    {commonOptions.map((opt) => (
                                        <th key={opt.value} className="p-4 text-center text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                            {opt.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {test.questions.map((question, idx) => {
                                    if (question.type === 'info') {
                                        return (
                                            <tr key={question.id} className="bg-slate-50 dark:bg-slate-800/50">
                                                <td colSpan={commonOptions.length + 1} className="p-4 text-center">
                                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                                        {question.text}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    return (
                                        <tr key={question.id} className={cn(
                                            "group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
                                            answers[question.id] !== undefined && "bg-primary/5"
                                        )}>
                                            <td className="p-4">
                                                <div className="flex gap-3 items-center">
                                                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-primary transition-colors">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                        {question.text}
                                                    </span>
                                                </div>
                                            </td>
                                            {commonOptions.map((opt) => (
                                                <td key={opt.value} className="p-4 text-center">
                                                    <div className="flex justify-center">
                                                        <RadioGroup
                                                            value={answers[question.id]?.toString()}
                                                            onValueChange={(v) => handleAnswer(question.id, parseInt(v))}
                                                        >
                                                            <RadioGroupItem
                                                                value={opt.value.toString()}
                                                                className="h-5 w-5 border-2 border-slate-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                                            />
                                                        </RadioGroup>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    )
}
