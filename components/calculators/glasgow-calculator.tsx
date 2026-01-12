'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, Calculator, RotateCcw } from "lucide-react"
import { calculateGlasgow, GlasgowResult } from "@/lib/calculators"

interface GlasgowCalculatorProps {
    onInsertToRecord?: (result: GlasgowResult) => void
}

const eyeOptions = [
    { value: 4, label: 'Espontánea' },
    { value: 3, label: 'A la orden verbal' },
    { value: 2, label: 'Al dolor' },
    { value: 1, label: 'Sin respuesta' }
]

const verbalOptions = [
    { value: 5, label: 'Orientado' },
    { value: 4, label: 'Confuso' },
    { value: 3, label: 'Palabras inapropiadas' },
    { value: 2, label: 'Sonidos incomprensibles' },
    { value: 1, label: 'Sin respuesta' }
]

const motorOptions = [
    { value: 6, label: 'Obedece órdenes' },
    { value: 5, label: 'Localiza el dolor' },
    { value: 4, label: 'Retira al dolor' },
    { value: 3, label: 'Flexión anormal' },
    { value: 2, label: 'Extensión anormal' },
    { value: 1, label: 'Sin respuesta' }
]

export function GlasgowCalculator({ onInsertToRecord }: GlasgowCalculatorProps) {
    const [eye, setEye] = useState<number>(0)
    const [verbal, setVerbal] = useState<number>(0)
    const [motor, setMotor] = useState<number>(0)
    const [result, setResult] = useState<GlasgowResult | null>(null)

    const handleCalculate = () => {
        if (eye > 0 && verbal > 0 && motor > 0) {
            const glasgowResult = calculateGlasgow(eye, verbal, motor)
            setResult(glasgowResult)
        }
    }

    const handleReset = () => {
        setEye(0)
        setVerbal(0)
        setMotor(0)
        setResult(null)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950">
                        <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <CardTitle>Escala de Coma de Glasgow</CardTitle>
                        <CardDescription>Evaluación del nivel de consciencia</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Eye Response */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Respuesta Ocular (E)</Label>
                    <RadioGroup
                        value={eye.toString()}
                        onValueChange={(v) => setEye(parseInt(v))}
                        className="grid grid-cols-2 gap-2"
                    >
                        {eyeOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value.toString()} id={`eye-${option.value}`} />
                                <Label htmlFor={`eye-${option.value}`} className="text-sm cursor-pointer">
                                    <span className="font-medium">{option.value}.</span> {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Verbal Response */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Respuesta Verbal (V)</Label>
                    <RadioGroup
                        value={verbal.toString()}
                        onValueChange={(v) => setVerbal(parseInt(v))}
                        className="grid grid-cols-2 gap-2"
                    >
                        {verbalOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value.toString()} id={`verbal-${option.value}`} />
                                <Label htmlFor={`verbal-${option.value}`} className="text-sm cursor-pointer">
                                    <span className="font-medium">{option.value}.</span> {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Motor Response */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Respuesta Motora (M)</Label>
                    <RadioGroup
                        value={motor.toString()}
                        onValueChange={(v) => setMotor(parseInt(v))}
                        className="grid grid-cols-2 gap-2"
                    >
                        {motorOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value.toString()} id={`motor-${option.value}`} />
                                <Label htmlFor={`motor-${option.value}`} className="text-sm cursor-pointer">
                                    <span className="font-medium">{option.value}.</span> {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="flex gap-2">
                    <Button onClick={handleCalculate} className="flex-1" disabled={!eye || !verbal || !motor}>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Glasgow
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>

                {result && (
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Puntaje Total</span>
                            <Badge variant="outline" className={result.color}>
                                GCS {result.total}/15
                            </Badge>
                        </div>

                        <div className="text-center space-y-2">
                            <span className={`text-5xl font-bold ${result.color}`}>
                                {result.total}
                            </span>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                E{eye} + V{verbal} + M{motor}
                            </p>
                        </div>

                        <div className={`p-3 rounded-lg border ${result.severity === 'mild' ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' :
                                result.severity === 'moderate' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800' :
                                    'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                            }`}>
                            <p className={`text-sm font-medium ${result.color}`}>
                                {result.interpretation}
                            </p>
                        </div>

                        {onInsertToRecord && (
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={() => onInsertToRecord(result)}
                            >
                                Insertar en Ficha Clínica
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
