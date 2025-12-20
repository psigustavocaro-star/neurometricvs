'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Hand, Ear, Wind, MessageSquare, ChevronRight, RotateCcw, Printer } from 'lucide-react'

export function Grounding54321() {
    const [step, setStep] = useState(0)

    const steps = [
        {
            number: 5,
            title: "Cosas que puedes VER",
            icon: Eye,
            color: "text-blue-500",
            bg: "bg-blue-50",
            border: "border-blue-100",
            instruction: "Mira a tu alrededor. Encuentra 5 detalles en los que no habías reparado antes.",
            examples: "Una sombra, una grieta en la pared, el color de un objeto..."
        },
        {
            number: 4,
            title: "Cosas que puedes SENTIR",
            icon: Hand,
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-100",
            instruction: "Concéntrate en tu piel y tu cuerpo. Nombra 4 sensaciones táctiles.",
            examples: "La ropa sobre tu piel, tus pies en el suelo, la textura de la silla..."
        },
        {
            number: 3,
            title: "Cosas que puedes OÍR",
            icon: Ear,
            color: "text-purple-500",
            bg: "bg-purple-50",
            border: "border-purple-100",
            instruction: "Cierra los ojos un momento si quieres. Identifica 3 sonidos distintos.",
            examples: "El zumbido del aire, el tráfico lejano, tu propia respiración..."
        },
        {
            number: 2,
            title: "Cosas que puedes OLER",
            icon: Wind,
            color: "text-green-500",
            bg: "bg-green-50",
            border: "border-green-100",
            instruction: "Intenta percibir 2 olores. Si no hay ninguno, recuerda tus aromas favoritos.",
            examples: "Café, lluvia, perfume, jabón..."
        },
        {
            number: 1,
            title: "Cosas que puedes SABOREAR",
            icon: MessageSquare,
            color: "text-pink-500",
            bg: "bg-pink-50",
            border: "border-pink-100",
            instruction: "Concéntrate en tu boca. Identifica 1 cosa que puedas saborear.",
            examples: "El sabor del último trago de agua, menta, o simplemente la sensación..."
        }
    ]

    const handlePrint = () => {
        window.print()
    }

    const nextStep = () => {
        if (step < steps.length) {
            setStep(step + 1)
        }
    }

    const reset = () => {
        setStep(0)
    }

    const isComplete = step === steps.length

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header / Intro */}
            <div className="text-center mb-8 print:mb-4">
                <div className="hidden print:flex justify-between items-center mb-6 border-b-2 border-teal-600 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 leading-none">Neurometrics</h1>
                            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mt-1">Mindfulness</p>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Técnica de Grounding 5-4-3-2-1</h2>
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-2 print:hidden">Técnica de Grounding</h2>
                <p className="text-slate-600 print:hidden">Usa esta herramienta guiada para anclarte al presente durante momentos de ansiedad alta.</p>
                <div className="flex justify-end mt-4 print:hidden">
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir Ficha Resumen
                    </Button>
                </div>
            </div>

            {/* Interactive Mode */}
            <div className="min-h-[400px] relative print:hidden">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center"
                        >
                            <div className={`w-20 h-20 ${steps[step].bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                {(() => {
                                    const Icon = steps[step].icon
                                    return <Icon className={`w-10 h-10 ${steps[step].color}`} />
                                })()}
                            </div>

                            <h3 className={`text-6xl font-black mb-2 ${steps[step].color} opacity-20`}>{steps[step].number}</h3>
                            <h4 className="text-2xl font-bold text-slate-800 mb-4">{steps[step].title}</h4>

                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                {steps[step].instruction}
                            </p>

                            <p className="text-sm text-slate-400 italic mb-12">
                                Ej: {steps[step].examples}
                            </p>

                            <Button onClick={nextStep} className={`h-14 px-8 text-lg rounded-full shadow-lg hover:scale-105 transition-transform ${steps[step].color.replace('text-', 'bg-')} hover:opacity-90 text-white`}>
                                Listo, siguiente <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>

                            <div className="mt-8 flex justify-center gap-2">
                                {steps.map((s, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-colors ${i === step ? steps[step].color.replace('text-', 'bg-') : 'bg-slate-200'}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="complete"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-50 rounded-3xl shadow-xl border border-green-100 p-12 text-center"
                        >
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Wind className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-green-800 mb-4">¡Ejercicio Completado!</h3>
                            <p className="text-lg text-green-700 mb-8">
                                Tómate un momento para notar cómo te sientes ahora en comparación con el inicio.
                                Respira profundamente tres veces.
                            </p>
                            <Button onClick={reset} variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Repetir Ejercicio
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Printable Cheatsheet */}
            <div className="hidden print:block space-y-4">
                <p className="text-slate-600 mb-6 italic">Usa tus sentidos para volver al aquí y al ahora.</p>

                {steps.map((s) => (
                    <div key={s.number} className="flex gap-4 p-4 border border-slate-200 rounded-xl items-start break-inside-avoid">
                        <div className={`w-12 h-12 shrink-0 ${s.bg} rounded-full flex items-center justify-center print:border print:border-slate-300`}>
                            <h3 className={`text-2xl font-black ${s.color}`}>{s.number}</h3>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                {s.title}
                            </h4>
                            <p className="text-slate-600 mt-1">{s.instruction}</p>
                            <p className="text-xs text-slate-400 mt-2 italic">Ej: {s.examples}</p>
                        </div>
                    </div>
                ))}

                <div className="text-center text-[10px] text-slate-400 mt-8 pt-4 border-t border-slate-200">
                    Generado por Neurometrics Workstation - Herramientas Clínicas Digitales
                </div>
            </div>
        </div>
    )
}
