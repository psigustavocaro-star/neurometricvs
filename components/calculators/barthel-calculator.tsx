'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Accessibility, Calculator, RotateCcw } from "lucide-react"
import { calculateBarthel, BarthelResult } from "@/lib/calculators"

interface BarthelCalculatorProps {
    onInsertToRecord?: (result: BarthelResult) => void
}

const barthelItems = [
    {
        id: 'feeding', label: 'Alimentación', options: [
            { value: 10, label: 'Independiente' },
            { value: 5, label: 'Necesita ayuda' },
            { value: 0, label: 'Dependiente' }
        ]
    },
    {
        id: 'bathing', label: 'Baño', options: [
            { value: 5, label: 'Independiente' },
            { value: 0, label: 'Dependiente' }
        ]
    },
    {
        id: 'grooming', label: 'Aseo personal', options: [
            { value: 5, label: 'Independiente' },
            { value: 0, label: 'Dependiente' }
        ]
    },
    {
        id: 'dressing', label: 'Vestirse', options: [
            { value: 10, label: 'Independiente' },
            { value: 5, label: 'Necesita ayuda' },
            { value: 0, label: 'Dependiente' }
        ]
    },
    {
        id: 'bowels', label: 'Control intestinal', options: [
            { value: 10, label: 'Continente' },
            { value: 5, label: 'Incontinencia ocasional' },
            { value: 0, label: 'Incontinente' }
        ]
    },
    {
        id: 'bladder', label: 'Control vesical', options: [
            { value: 10, label: 'Continente' },
            { value: 5, label: 'Incontinencia ocasional' },
            { value: 0, label: 'Incontinente' }
        ]
    },
    {
        id: 'toilet', label: 'Uso del retrete', options: [
            { value: 10, label: 'Independiente' },
            { value: 5, label: 'Necesita ayuda' },
            { value: 0, label: 'Dependiente' }
        ]
    },
    {
        id: 'transfers', label: 'Transferencias (cama-silla)', options: [
            { value: 15, label: 'Independiente' },
            { value: 10, label: 'Mínima ayuda' },
            { value: 5, label: 'Gran ayuda' },
            { value: 0, label: 'Dependiente' }
        ]
    },
    {
        id: 'mobility', label: 'Deambulación', options: [
            { value: 15, label: 'Independiente 50m' },
            { value: 10, label: 'Con ayuda' },
            { value: 5, label: 'Silla de ruedas' },
            { value: 0, label: 'Inmóvil' }
        ]
    },
    {
        id: 'stairs', label: 'Subir/bajar escaleras', options: [
            { value: 10, label: 'Independiente' },
            { value: 5, label: 'Necesita ayuda' },
            { value: 0, label: 'Incapaz' }
        ]
    }
]

export function BarthelCalculator({ onInsertToRecord }: BarthelCalculatorProps) {
    const [scores, setScores] = useState<Record<string, number>>({})
    const [result, setResult] = useState<BarthelResult | null>(null)

    const handleScoreChange = (itemId: string, value: string) => {
        setScores(prev => ({ ...prev, [itemId]: parseInt(value) }))
    }

    const handleCalculate = () => {
        const allScores = barthelItems.map(item => scores[item.id] ?? -1)
        if (allScores.every(s => s >= 0)) {
            const barthelResult = calculateBarthel(allScores)
            setResult(barthelResult)
        }
    }

    const handleReset = () => {
        setScores({})
        setResult(null)
    }

    const allFilled = barthelItems.every(item => scores[item.id] !== undefined)

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
                        <Accessibility className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <CardTitle>Índice de Barthel</CardTitle>
                        <CardDescription>Evaluación de independencia en AVD</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-4">
                    {barthelItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4">
                            <Label className="text-sm font-medium min-w-[140px]">{item.label}</Label>
                            <Select
                                value={scores[item.id]?.toString()}
                                onValueChange={(v) => handleScoreChange(item.id, v)}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {item.options.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value.toString()}>
                                            {opt.label} ({opt.value})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 pt-4">
                    <Button onClick={handleCalculate} className="flex-1" disabled={!allFilled}>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Barthel
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
                                {result.total}/100
                            </Badge>
                        </div>

                        <div className="text-center">
                            <span className={`text-5xl font-bold ${result.color}`}>
                                {result.total}
                            </span>
                            <span className="text-lg text-muted-foreground ml-2">puntos</span>
                        </div>

                        <div className={`p-3 rounded-lg border ${result.dependencyLevel === 'independent' ? 'bg-green-50 border-green-200 dark:bg-green-950' :
                                result.dependencyLevel === 'mild' ? 'bg-blue-50 border-blue-200 dark:bg-blue-950' :
                                    result.dependencyLevel === 'moderate' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950' :
                                        result.dependencyLevel === 'severe' ? 'bg-orange-50 border-orange-200 dark:bg-orange-950' :
                                            'bg-red-50 border-red-200 dark:bg-red-950'
                            }`}>
                            <p className={`text-sm font-medium ${result.color}`}>
                                {result.interpretation}
                            </p>
                        </div>

                        {/* Visual bar */}
                        <div className="space-y-2">
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all ${result.dependencyLevel === 'independent' ? 'bg-green-500' :
                                            result.dependencyLevel === 'mild' ? 'bg-blue-500' :
                                                result.dependencyLevel === 'moderate' ? 'bg-yellow-500' :
                                                    result.dependencyLevel === 'severe' ? 'bg-orange-500' :
                                                        'bg-red-500'
                                        }`}
                                    style={{ width: `${result.total}%` }}
                                />
                            </div>
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
