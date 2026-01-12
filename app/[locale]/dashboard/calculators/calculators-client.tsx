'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Brain, Accessibility, Pill, Heart, Footprints } from "lucide-react"
import { BMICalculator, GlasgowCalculator, BarthelCalculator, DosageCalculator } from "@/components/calculators"
import { getCalculatorsForProfession, Profession, Calculator } from "@/lib/calculators"

interface CalculatorsClientProps {
    profession: string
}

const iconMap: Record<string, React.ReactNode> = {
    Scale: <Scale className="h-5 w-5" />,
    Brain: <Brain className="h-5 w-5" />,
    Accessibility: <Accessibility className="h-5 w-5" />,
    Pill: <Pill className="h-5 w-5" />,
    Heart: <Heart className="h-5 w-5" />,
    Footprints: <Footprints className="h-5 w-5" />
}

const colorMap: Record<string, string> = {
    general: 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
    pharmacology: 'bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
    neurological: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    functional: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    risk: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
}

export function CalculatorsClient({ profession }: CalculatorsClientProps) {
    const availableCalculators = getCalculatorsForProfession(profession as Profession)
    const [activeCalculator, setActiveCalculator] = useState<string>(availableCalculators[0]?.id || 'bmi')

    const renderCalculator = (calculatorId: string) => {
        switch (calculatorId) {
            case 'bmi':
                return <BMICalculator />
            case 'glasgow':
                return <GlasgowCalculator />
            case 'barthel':
                return <BarthelCalculator />
            case 'dosage':
                return <DosageCalculator />
            default:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Próximamente</CardTitle>
                            <CardDescription>Esta calculadora estará disponible pronto.</CardDescription>
                        </CardHeader>
                    </Card>
                )
        }
    }

    return (
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            {/* Sidebar with calculator list */}
            <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border">
                    <p className="text-xs text-muted-foreground mb-1">Tu especialidad</p>
                    <Badge variant="secondary" className="capitalize">
                        {profession.replace('_', ' ')}
                    </Badge>
                </div>

                <div className="space-y-2">
                    {availableCalculators.map((calc) => (
                        <button
                            key={calc.id}
                            onClick={() => setActiveCalculator(calc.id)}
                            className={`w-full p-4 rounded-lg border text-left transition-all ${activeCalculator === calc.id
                                    ? 'bg-white dark:bg-slate-800 border-teal-500 shadow-md'
                                    : 'bg-slate-50 dark:bg-slate-900/50 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${colorMap[calc.category]}`}>
                                    {iconMap[calc.icon]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                                        {calc.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                        {calc.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {availableCalculators.length === 0 && (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground">
                                No hay calculadoras disponibles para tu especialidad.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Main calculator area */}
            <div>
                {renderCalculator(activeCalculator)}
            </div>
        </div>
    )
}
