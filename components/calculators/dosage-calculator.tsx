'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pill, Calculator, RotateCcw, AlertTriangle } from "lucide-react"
import { calculateDosage, DosageResult } from "@/lib/calculators"

interface DosageCalculatorProps {
    onInsertToRecord?: (result: DosageResult & { medication: string }) => void
}

const commonMedications = [
    { id: 'amoxicillin', name: 'Amoxicilina', dosePerKg: 50, unit: 'mg', frequency: 3 },
    { id: 'ibuprofen', name: 'Ibuprofeno', dosePerKg: 10, unit: 'mg', frequency: 3 },
    { id: 'paracetamol', name: 'Paracetamol', dosePerKg: 15, unit: 'mg', frequency: 4 },
    { id: 'azithromycin', name: 'Azitromicina', dosePerKg: 10, unit: 'mg', frequency: 1 },
    { id: 'sertraline', name: 'Sertralina', dosePerKg: 1.5, unit: 'mg', frequency: 1 },
    { id: 'fluoxetine', name: 'Fluoxetina', dosePerKg: 0.5, unit: 'mg', frequency: 1 },
    { id: 'risperidone', name: 'Risperidona', dosePerKg: 0.02, unit: 'mg', frequency: 2 },
    { id: 'custom', name: 'Personalizado', dosePerKg: 0, unit: 'mg', frequency: 1 }
]

export function DosageCalculator({ onInsertToRecord }: DosageCalculatorProps) {
    const [weight, setWeight] = useState<string>('')
    const [selectedMed, setSelectedMed] = useState<string>('')
    const [customDose, setCustomDose] = useState<string>('')
    const [customFreq, setCustomFreq] = useState<string>('3')
    const [result, setResult] = useState<(DosageResult & { medication: string }) | null>(null)

    const handleCalculate = () => {
        const w = parseFloat(weight)
        const med = commonMedications.find(m => m.id === selectedMed)

        if (w > 0 && med) {
            const dose = med.id === 'custom' ? parseFloat(customDose) : med.dosePerKg
            const freq = med.id === 'custom' ? parseInt(customFreq) : med.frequency

            if (dose > 0) {
                const dosageResult = calculateDosage(w, dose, freq)
                setResult({
                    ...dosageResult,
                    medication: med.name
                })
            }
        }
    }

    const handleReset = () => {
        setWeight('')
        setSelectedMed('')
        setCustomDose('')
        setCustomFreq('3')
        setResult(null)
    }

    const selectedMedData = commonMedications.find(m => m.id === selectedMed)

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950">
                        <Pill className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                        <CardTitle>Calculadora de Dosis</CardTitle>
                        <CardDescription>Cálculo de dosis según peso corporal</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="med-select">Medicamento</Label>
                    <Select value={selectedMed} onValueChange={setSelectedMed}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar medicamento..." />
                        </SelectTrigger>
                        <SelectContent>
                            {commonMedications.map((med) => (
                                <SelectItem key={med.id} value={med.id}>
                                    {med.name} {med.id !== 'custom' && `(${med.dosePerKg} ${med.unit}/kg/día)`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="weight">Peso del paciente (kg)</Label>
                    <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>

                {selectedMed === 'custom' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="customDose">Dosis (mg/kg/día)</Label>
                            <Input
                                id="customDose"
                                type="number"
                                placeholder="10"
                                value={customDose}
                                onChange={(e) => setCustomDose(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customFreq">Frecuencia (veces/día)</Label>
                            <Select value={customFreq} onValueChange={setCustomFreq}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 vez/día</SelectItem>
                                    <SelectItem value="2">2 veces/día</SelectItem>
                                    <SelectItem value="3">3 veces/día</SelectItem>
                                    <SelectItem value="4">4 veces/día</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        onClick={handleCalculate}
                        className="flex-1"
                        disabled={!weight || !selectedMed || (selectedMed === 'custom' && !customDose)}
                    >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Dosis
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>

                {result && (
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Medicamento</span>
                            <Badge variant="outline">{result.medication}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border">
                                <p className="text-xs text-muted-foreground">Dosis por toma</p>
                                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                                    {result.totalDose} mg
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border">
                                <p className="text-xs text-muted-foreground">Dosis diaria total</p>
                                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                                    {result.dailyDose} mg
                                </p>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800">
                            <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
                                Administrar {result.totalDose} mg {result.frequency}
                            </p>
                        </div>

                        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                                {result.notes}
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
