'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Users, FileText, FlaskConical, Bot, CheckCircle2, ChevronRight, X } from 'lucide-react'

const TOUR_STEPS = [
    {
        title: "¡Bienvenido a Neurometrics!",
        description: "Tu nueva central clínica está lista. Te daremos un recorrido rapidísimo de 3 pasos para que aprendas a usarla al máximo.",
        icon: <Bot className="w-12 h-12 text-teal-500" />
    },
    {
        title: "1. Agrega a tus pacientes",
        description: "En la sección 'Pacientes' puedes registrar a las personas que atiendes. Toda su historia, documentos y tests vivirán ahí de forma segura y centralizada.",
        icon: <Users className="w-12 h-12 text-blue-500" />
    },
    {
        title: "2. Evaluaciones Validadas",
        description: "Ve a 'Tests' para ver el catálogo de pruebas psicométricas. Puedes enviar links para que los llenen en casa o aplicarlos tú mismo en la consulta.",
        icon: <FlaskConical className="w-12 h-12 text-purple-500" />
    },
    {
        title: "3. Informes Automáticos",
        description: "Neurometrics analiza los resultados en segundos y redacta informes pre-completados con Inteligencia Artificial. ¡Solo debes firmar!",
        icon: <FileText className="w-12 h-12 text-amber-500" />
    }
]

export function WelcomeTour() {
    const [isOpen, setIsOpen] = useState(false)
    const [step, setStep] = useState(0)

    useEffect(() => {
        // Solo mostrar si nunca se ha visto
        const tourDone = localStorage.getItem('neurometrics_tour_done')
        if (tourDone !== 'true') {
            const timer = setTimeout(() => setIsOpen(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleNext = () => {
        if (step < TOUR_STEPS.length - 1) {
            setStep(s => s + 1)
        } else {
            handleComplete()
        }
    }

    const handleComplete = () => {
        localStorage.setItem('neurometrics_tour_done', 'true')
        setIsOpen(false)
    }

    if (!isOpen) return null

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) handleComplete()
            setIsOpen(open)
        }}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-transparent border-none shadow-none" showCloseButton={false}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800 flex">
                        {TOUR_STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-full flex-1 transition-all duration-500 ${i <= step ? 'bg-teal-500' : 'bg-transparent'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleComplete}
                        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center space-y-6"
                            >
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                    {TOUR_STEPS[step].icon}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold dark:text-white">
                                        {TOUR_STEPS[step].title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                                        {TOUR_STEPS[step].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                        <Button
                            onClick={handleNext}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] transition-transform h-12 text-base shadow-xl"
                        >
                            {step === TOUR_STEPS.length - 1 ? (
                                <><CheckCircle2 className="w-5 h-5 mr-2" /> Comenzar a trabajar</>
                            ) : (
                                <>Siguiente paso <ChevronRight className="w-5 h-5 ml-2" /></>
                            )}
                        </Button>
                        {step < TOUR_STEPS.length - 1 && (
                            <button
                                onClick={handleComplete}
                                className="w-full text-center mt-4 text-sm text-slate-500 font-medium hover:text-slate-700 dark:hover:text-slate-300"
                            >
                                Saltar el recorrido
                            </button>
                        )}
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
