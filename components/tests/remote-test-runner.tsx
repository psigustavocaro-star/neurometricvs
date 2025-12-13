'use client'

import { useState } from 'react'
import { useRouter } from "@/i18n/navigation"
import { submitRemoteTest } from '@/app/[locale]/tests/remote-actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"

// Simplified Test Definitions (In a real app, import from a shared config)
const TEST_QUESTIONS: Record<string, any> = {
    'phq9': {
        title: 'Cuestionario de Salud del Paciente (PHQ-9)',
        instructions: 'Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?',
        options: [
            { value: 0, label: 'Ningún día' },
            { value: 1, label: 'Varios días' },
            { value: 2, label: 'Más de la mitad de los días' },
            { value: 3, label: 'Casi todos los días' }
        ],
        questions: [
            "Poco interés o placer en hacer cosas",
            "Se ha sentido decaído(a), deprimido(a) o sin esperanzas",
            "Dificultad para quedarse o permanecer dormido(a), o ha dormido demasiado",
            "Se ha sentido cansado(a) o con poca energía",
            "Sin apetito o ha comido en exceso",
            "Se ha sentido mal con usted mismo(a) - o que es un fracaso",
            "Dificultad para concentrarse en cosas, tales como leer el periódico o ver televisión",
            "¿Se ha movido o hablado tan lentamente que otras personas podrían haberlo notado? O lo contrario - muy inquieto(a)",
            "Pensamientos de que estaría mejor muerto(a) o de lastimarse de alguna manera"
        ]
    },
    'gad7': {
        title: 'Escala de Ansiedad Generalizada (GAD-7)',
        instructions: 'Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?',
        options: [
            { value: 0, label: 'Ningún día' },
            { value: 1, label: 'Varios días' },
            { value: 2, label: 'Más de la mitad de los días' },
            { value: 3, label: 'Casi todos los días' }
        ],
        questions: [
            "Sentirse nervioso(a), intranquilo(a) o con los nervios de punta",
            "No poder dejar de preocuparse o no poder controlar la preocupación",
            "Preocuparse demasiado por diferentes cosas",
            "Dificultad para relajarse",
            "Estar tan inquieto(a) que es difícil quedarse quieto(a)",
            "Ponerse fácilmente molesto(a) o irritable",
            "Sentir miedo como si algo terrible fuera a pasar"
        ]
    }
}

export function RemoteTestRunner({ testId, token }: { testId: string, token: string }) {
    const testConfig = TEST_QUESTIONS[testId]
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    if (!testConfig) {
        return <div className="text-center p-8 bg-white rounded-xl shadow">Test no configurado: {testId}</div>
    }

    const allAnswered = testConfig.questions.every((_: any, idx: number) => answers[idx] !== undefined)

    const handleSubmit = async () => {
        if (!allAnswered) return
        setSubmitting(true)

        // Calculate score
        let score = 0
        Object.values(answers).forEach(val => score += val)

        const resultData = {
            answers,
            score,
            date: new Date().toISOString()
        }

        try {
            const res = await submitRemoteTest(token, resultData)
            if (res.error) {
                alert('Error al enviar: ' + res.error)
            } else {
                router.refresh() // Will trigger the 'completed' state in page.tsx
            }
        } catch (e) {
            console.error(e)
            alert('Error de conexión')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Card className="shadow-lg border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle>{testConfig.title}</CardTitle>
                <CardDescription className="text-base mt-2">{testConfig.instructions}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
                {testConfig.questions.map((q: string, idx: number) => (
                    <div key={idx} className="space-y-3 p-4 bg-white rounded-lg border border-slate-100 hover:border-teal-100 transition-colors">
                        <Label className="text-base font-medium text-slate-800 leading-relaxed">
                            {idx + 1}. {q}
                        </Label>
                        <RadioGroup
                            onValueChange={(val) => setAnswers(prev => ({ ...prev, [idx]: parseInt(val) }))}
                            className="flex flex-col sm:flex-row gap-3 mt-2"
                        >
                            {testConfig.options.map((opt: any) => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt.value.toString()} id={`q${idx}-${opt.value}`} />
                                    <Label htmlFor={`q${idx}-${opt.value}`} className="font-normal text-slate-600 cursor-pointer">
                                        {opt.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                ))}

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={!allAnswered || submitting}
                        className="bg-teal-600 hover:bg-teal-700 text-white min-w-[200px]"
                        size="lg"
                    >
                        {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar Respuestas'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
