'use client'

import React, { useState } from 'react'
import { TestDefinition } from '@/types/test'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, CheckCircle2, Save, Shuffle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { saveTestResult } from '@/app/[locale]/tests/actions'
import { useRouter } from 'next/navigation'

interface StepByStepTestRunnerProps {
    test: TestDefinition
    patientId?: string
    sessionId?: string
    onComplete?: () => void
}

export function StepByStepTestRunner({ test, patientId, sessionId, onComplete }: StepByStepTestRunnerProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [finalScore, setFinalScore] = useState<any>(null)
    const router = useRouter()

    const totalSteps = test.questions.length
    const progress = ((currentStep) / totalSteps) * 100

    const currentQuestion = test.questions[currentStep]

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
        setCurrentStep(totalSteps - 1) // Go to last question
        toast.success("Datos aleatorios generados. Revisa y finaliza la evaluación.")
    }

    const handleAnswer = (val: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: parseInt(val) }))
        // Auto-advance after short delay for better flow
        setTimeout(() => {
            if (currentStep < totalSteps - 1) {
                setCurrentStep(prev => prev + 1)
            }
        }, 250)
    }

    const handleNext = () => {
        if (currentStep < totalSteps - 1) setCurrentStep(prev => prev + 1)
    }

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1)
    }

    const calculateAndSave = async () => {
        // Calculation logic
        let totalScore = 0
        Object.values(answers).forEach(v => totalScore += v)

        // Simple range check
        const ranges = test.scoring?.ranges || []
        const range = ranges.find(r => totalScore >= r.min && totalScore <= r.max)

        const resultData = {
            score: totalScore,
            label: range?.label || 'Completado',
            color: range?.color || 'gray'
        }

        setFinalScore(resultData)
        setIsSubmitting(true)

        if (patientId) {
            try {
                const response = await saveTestResult(patientId, test.id, resultData.score, {
                    label: resultData.label,
                    color: resultData.color,
                    answers: answers
                }, sessionId)
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

    if (isCompleted) {
        return (
            <Card className="w-full max-w-2xl mx-auto text-center py-10">
                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <CheckCircle2 className="w-16 h-16 text-teal-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Evaluación Completada</h2>
                        <p className="text-slate-500">Los resultados han sido registrados.</p>
                    </div>
                    {finalScore && (
                        <div className={`inline-block px-6 py-3 rounded-xl bg-${finalScore.color || 'slate'}-50 border border-${finalScore.color || 'slate'}-100`}>
                            <p className="text-3xl font-bold text-slate-800">{finalScore.score}</p>
                            <p className={`text-sm font-semibold text-${finalScore.color || 'slate'}-600 uppercase`}>{finalScore.label}</p>
                        </div>
                    )}
                    <div className="flex justify-center gap-4 pt-4">
                        <Button variant="outline" onClick={() => router.push(`/patients/${patientId}`)}>
                            Volver al Paciente
                        </Button>
                        <Button className="bg-slate-900 text-white hover:bg-slate-800">
                            Generar Informe
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Header / Progress */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <span>{test.title}</span>
                    <span>Pregunta {currentStep + 1} de {totalSteps}</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Random Data Generator Button */}
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={fillRandomData}
                    className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Generar datos aleatorios
                </Button>
            </div>

            {/* Question Card */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="border-t-4 border-t-teal-500 shadow-sm min-h-[300px] flex flex-col justify-center">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed text-center">
                                {currentQuestion.text}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 pb-10 flex justify-center">
                            {/* Single Choice Render */}
                            <RadioGroup
                                value={answers[currentQuestion.id]?.toString()}
                                onValueChange={handleAnswer}
                                className="grid gap-3 w-full max-w-md"
                            >
                                {currentQuestion.options?.map((opt) => (
                                    <div key={opt.value} className="relative">
                                        <RadioGroupItem
                                            value={opt.value.toString()}
                                            id={`opt-${opt.value}`}
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor={`opt-${opt.value}`}
                                            className="flex items-center justify-between px-4 py-3 bg-white border-2 border-slate-100 rounded-xl cursor-pointer hover:border-teal-500 hover:bg-teal-50 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 transition-all"
                                        >
                                            <span className="text-base font-medium text-slate-700 peer-data-[state=checked]:text-teal-800">{opt.label}</span>
                                            <div className="w-4 h-4 rounded-full border border-slate-300 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-600" />
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-wrap gap-y-4 justify-between items-center pt-4">
                <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="text-slate-400 hover:text-slate-600"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
                </Button>

                {currentStep === totalSteps - 1 ? (
                    <Button
                        onClick={calculateAndSave}
                        disabled={Object.keys(answers).length !== totalSteps || isSubmitting}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-8"
                    >
                        {isSubmitting ? 'Guardando...' : 'Finalizar Evaluación'} <Save className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion.id]}
                        className="bg-slate-900 text-white hover:bg-slate-800 px-8"
                    >
                        Siguiente <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    )
}

