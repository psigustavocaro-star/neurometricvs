"use client"

import { useState } from "react"
import { TestDefinition } from "@/types/test"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { submitRemoteTest } from "@/app/actions/submit-test"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface PublicTestRunnerProps {
    test: TestDefinition
    token: string
    patientName: string // To personalize: "Hola, Juan"
}

export function PublicTestRunner({ test, token, patientName }: PublicTestRunnerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [completed, setCompleted] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const questions = test.questions
    const currentQuestion = questions[currentIndex]
    const progress = ((currentIndex) / questions.length) * 100

    const handleAnswer = async (value: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value }
        setAnswers(newAnswers)

        // auto-advance
        if (currentIndex < questions.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 250)
        } else {
            console.log("Test finished locally")
        }
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        // Calculate basic sum score for now
        const score = Object.values(answers).reduce((a, b) => a + b, 0)

        const result = await submitRemoteTest(token, answers, score)

        if (result.success) {
            setCompleted(true)
        } else {
            alert("Hubo un error al enviar tus respuestas. Por favor intenta de nuevo.")
            setSubmitting(false)
        }
    }

    if (completed) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center space-y-4 shadow-xl border-teal-100">
                    <div className="h-16 w-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">¡Gracias!</h1>
                    <p className="text-slate-600">
                        Tus respuestas han sido enviadas correctamente. Ya puedes cerrar esta ventana.
                    </p>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b px-4 py-4 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-slate-800">{test.title}</h1>
                        <p className="text-sm text-slate-500">Evaluación para {patientName}</p>
                    </div>
                    <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {currentIndex + 1} / {questions.length}
                    </div>
                </div>
                <Progress value={progress} className="h-1 mt-4 max-w-3xl mx-auto" />
            </header>

            <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:py-8 flex flex-col justify-center">
                <Card className="p-6 md:p-8 shadow-lg border-0 md:border">
                    <div className="space-y-6">
                        <h2 className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">
                            {currentQuestion.text}
                        </h2>

                        <RadioGroup
                            onValueChange={(val) => handleAnswer(Number(val))}
                            className={cn(
                                "grid gap-3 pt-4",
                                test.uiType === 'blocks' || questions.length < 5
                                    ? "grid-cols-1 md:grid-cols-2"
                                    : "grid-cols-1"
                            )}
                        >
                            {currentQuestion.options?.map((option) => (
                                <div key={option.value} className="relative">
                                    <RadioGroupItem
                                        value={option.value.toString()}
                                        id={`opt-${option.value}`}
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={`opt-${option.value}`}
                                        className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-300 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:text-teal-900 cursor-pointer transition-all"
                                    >
                                        <span className="text-base font-medium">{option.label}</span>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </Card>

                {currentIndex === questions.length - 1 && Object.keys(answers).length === questions.length && (
                    <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-4">
                        <Button
                            size="lg"
                            className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-lg px-8 py-6 h-auto shadow-lg shadow-teal-600/20"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? "Enviando..." : "Finalizar y Enviar"}
                            {!submitting && <ArrowRight className="ml-2 h-5 w-5" />}
                        </Button>
                    </div>
                )}

                {currentIndex > 0 && !completed && (
                    <div className="mt-6 flex justify-between">
                        <Button variant="ghost" onClick={() => setCurrentIndex(prev => prev - 1)}>
                            Anterior
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}
