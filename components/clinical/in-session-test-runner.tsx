'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ClipboardList, Play } from 'lucide-react'
import { TestDefinition } from '@/types/test'
import { StepByStepTestRunner } from './step-by-step-test-runner'

// Import existing tests (This should ideally be dynamic or from a registry)
import { gad7 } from '@/lib/tests/gad7'
import { depressionScale as phq9 } from '@/lib/tests/phq9'
// Add more imports if needed

const AVAILABLE_TESTS: TestDefinition[] = [gad7, phq9] // Example list

interface InSessionTestRunnerProps {
    patientId: string
    sessionId?: string // Optional because session might not be saved yet? ideally we require it
    onTestComplete?: () => void
}

export function InSessionTestRunner({ patientId, sessionId, onTestComplete }: InSessionTestRunnerProps) {
    const [open, setOpen] = useState(false)
    const [selectedTest, setSelectedTest] = useState<TestDefinition | null>(null)

    const handleComplete = () => {
        setOpen(false)
        setSelectedTest(null)
        if (onTestComplete) onTestComplete()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 text-slate-600 border-slate-300 hover:bg-teal-50 hover:text-teal-700">
                    <ClipboardList className="w-4 h-4" />
                    Aplicar Test
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                {!selectedTest ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Seleccionar Test</DialogTitle>
                            <DialogDescription>Elige una evaluación para aplicar en esta sesión.</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {AVAILABLE_TESTS.map(test => (
                                <div
                                    key={test.id}
                                    className="p-4 border border-slate-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 cursor-pointer transition-all group"
                                    onClick={() => setSelectedTest(test)}
                                >
                                    <h4 className="font-semibold text-slate-900 group-hover:text-teal-800">{test.title}</h4>
                                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{test.description}</p>
                                    <div className="flex items-center gap-2 mt-3 text-xs font-medium text-slate-400 group-hover:text-teal-600">
                                        <Play className="w-3 h-3" /> Iniciar
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="py-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTest(null)} className="mb-4 -ml-2 text-slate-400">
                            ← Volver a la lista
                        </Button>
                        <StepByStepTestRunner
                            test={selectedTest}
                            patientId={patientId}
                            sessionId={sessionId}
                            onComplete={handleComplete}
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
