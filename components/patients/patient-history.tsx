"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { FileText, CheckSquare, Square, ArrowRight, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TestResult {
    id: string
    created_at: string
    test_type: string
    results_json: {
        score: number
        label: string
        color: string
        details?: any[]
    }
}

interface PatientHistoryProps {
    results: TestResult[]
    patientId: string
}

export function PatientHistory({ results, patientId }: PatientHistoryProps) {
    const [selectedTests, setSelectedTests] = useState<Set<string>>(new Set())
    const router = useRouter()

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedTests)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedTests(newSelected)
    }

    const handleGenerateUnifiedReport = () => {
        const ids = Array.from(selectedTests).join(',')
        router.push(`/reports/unified?ids=${ids}&patientId=${patientId}`)
    }

    if (results.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No hay tests realizados aún.
                <div className="mt-4">
                    <Button asChild>
                        <Link href={`/dashboard/tests`}>Realizar Nuevo Test</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500">
                    Selecciona varios tests para generar un informe de progreso.
                </p>
                {selectedTests.size > 1 && (
                    <Button onClick={handleGenerateUnifiedReport} className="bg-teal-600 hover:bg-teal-700 animate-in fade-in">
                        <BarChart className="mr-2 h-4 w-4" />
                        Generar Informe Unificado ({selectedTests.size})
                    </Button>
                )}
            </div>

            <div className="space-y-3">
                {results.map((result) => {
                    const isSelected = selectedTests.has(result.id)
                    const date = new Date(result.created_at)
                    const formattedDate = format(date, "d 'de' MMMM, yyyy", { locale: es })

                    // Map test_type to readable name (simple mapping for now)
                    const testName = result.test_type === 'snap-iv' ? 'SNAP-IV (TDAH)' :
                        result.test_type === 'phq-9' ? 'PHQ-9 (Depresión)' :
                            result.test_type.toUpperCase()

                    return (
                        <div
                            key={result.id}
                            className={cn(
                                "flex items-center p-4 rounded-lg border transition-all cursor-pointer hover:shadow-sm",
                                isSelected ? "border-teal-500 bg-teal-50/30" : "border-slate-200 bg-white hover:border-teal-200"
                            )}
                            onClick={() => toggleSelection(result.id)}
                        >
                            <div className="mr-4 text-slate-400">
                                {isSelected ? (
                                    <CheckSquare className="h-5 w-5 text-teal-600" />
                                ) : (
                                    <Square className="h-5 w-5" />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-slate-900">{testName}</h4>
                                    <span className="text-xs text-slate-500 capitalize">{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "text-xs font-medium px-2 py-0.5 rounded-full",
                                        `bg-${result.results_json.color}-100 text-${result.results_json.color}-700`
                                    )}>
                                        {result.results_json.label}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Puntaje: {result.results_json.score}
                                    </span>
                                </div>
                            </div>

                            <div className="ml-4 pl-4 border-l border-slate-100 flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-400 hover:text-teal-600"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        router.push(`/reports/${result.id}`)
                                    }}
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Ver Informe
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-center">
                <Button asChild variant="outline">
                    <Link href={`/dashboard/tests`}>Realizar Nuevo Test</Link>
                </Button>
            </div>
        </div>
    )
}
