'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scale, Calculator, RotateCcw } from "lucide-react"
import { calculateBMI, BMIResult } from "@/lib/calculators"

interface BMICalculatorProps {
    onInsertToRecord?: (result: BMIResult) => void
}

export function BMICalculator({ onInsertToRecord }: BMICalculatorProps) {
    const [weight, setWeight] = useState<string>('')
    const [height, setHeight] = useState<string>('')
    const [result, setResult] = useState<BMIResult | null>(null)

    const handleCalculate = () => {
        const w = parseFloat(weight)
        const h = parseFloat(height)

        if (w > 0 && h > 0) {
            const bmiResult = calculateBMI(w, h)
            setResult(bmiResult)
        }
    }

    const handleReset = () => {
        setWeight('')
        setHeight('')
        setResult(null)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950">
                        <Scale className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                        <CardTitle>Índice de Masa Corporal (IMC)</CardTitle>
                        <CardDescription>Clasificación OMS del estado nutricional</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="weight">Peso (kg)</Label>
                        <Input
                            id="weight"
                            type="number"
                            placeholder="70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height">Altura (cm)</Label>
                        <Input
                            id="height"
                            type="number"
                            placeholder="175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button onClick={handleCalculate} className="flex-1">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular IMC
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>

                {result && (
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Resultado</span>
                            <Badge variant="outline" className={result.color}>
                                {result.category}
                            </Badge>
                        </div>

                        <div className="text-center">
                            <span className={`text-5xl font-bold ${result.color}`}>
                                {result.value}
                            </span>
                            <span className="text-lg text-muted-foreground ml-2">kg/m²</span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {result.recommendation}
                        </p>

                        {/* BMI Scale Visual */}
                        <div className="relative h-3 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 w-1 h-full bg-white shadow-lg border border-slate-300"
                                style={{
                                    left: `${Math.min(Math.max((result.value - 15) / 30 * 100, 0), 100)}%`
                                }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>15</span>
                            <span>18.5</span>
                            <span>25</span>
                            <span>30</span>
                            <span>40+</span>
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
