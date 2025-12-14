"use client"

import { motion } from "framer-motion"
import { Check, ClipboardList, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export function MockTestScoring() {
    const [step, setStep] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3)
        }, 3500)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full h-full bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-2xl shadow-slate-200/50 request-animation ring-1 ring-slate-900/5">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md relative z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="bg-teal-50 p-2.5 rounded-xl border border-teal-100 shadow-sm">
                        <ClipboardList className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                        <span className="text-slate-900 text-lg font-bold block leading-tight">Evaluación PHQ-9</span>
                        <span className="text-slate-500 text-xs font-medium">Cuestionario de Salud del Paciente</span>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-teal-100/50 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    Auto-Correction
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-center relative z-10 min-h-0 bg-slate-50/30">
                {step === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-teal-200 transition-all duration-300">
                                <div className="space-y-2">
                                    <div className="h-2 w-48 bg-slate-100 rounded-full" />
                                    <div className="h-1.5 w-32 bg-slate-50 rounded-full" />
                                </div>
                                <div className="flex gap-3 pl-4">
                                    {[0, 1, 2, 3].map(opt => (
                                        <motion.div
                                            key={opt}
                                            initial={{ scale: 0.8 }}
                                            animate={{
                                                scale: opt === 2 ? [1, 1.15, 1] : 1,
                                                backgroundColor: opt === 2 ? '#0d9488' : '#f1f5f9',
                                                borderColor: opt === 2 ? '#99f6e4' : 'transparent'
                                            }}
                                            transition={{ delay: i * 0.2 + 0.5 }}
                                            className="w-6 h-6 rounded-full border-2 transition-colors"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center space-y-8 py-4"
                    >
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
                                <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <motion.path
                                    className="text-teal-500"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="100, 100"
                                    initial={{ strokeDasharray: "0, 100" }}
                                    animate={{ strokeDasharray: "75, 100" }}
                                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-6xl font-bold text-slate-900 tracking-tighter">18</span>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Puntos</span>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <div className="text-slate-600 font-medium text-sm">Analizando resultados...</div>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-white p-8 rounded-2xl border border-teal-100 shadow-xl shadow-teal-900/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                            <TrendingUp className="w-32 h-32 text-teal-900" />
                        </div>

                        <div className="flex items-start gap-5 mb-8 relative z-10">
                            <div className="bg-red-50 text-red-600 p-3.5 rounded-2xl border border-red-100 ring-4 ring-red-50/50 shadow-sm shrink-0">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-slate-900 font-bold text-lg leading-tight mb-1">Depresión Moderada-Severa</h4>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Puntaje sugiere sintomatología clínicamente significativa. Se recomienda evaluación psiquiátrica.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <span>Normal</span>
                                <span>Severo</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-teal-400 via-amber-400 to-red-500 relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: "70%" }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/50" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
