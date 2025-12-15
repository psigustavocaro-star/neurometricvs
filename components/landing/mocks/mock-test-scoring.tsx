"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Brain, Activity, FileText, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function MockTestScoring() {
    const [step, setStep] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3)
        }, 4000) // Faster cycle for more engagement
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full h-full bg-transparent overflow-hidden flex flex-col request-animation relative group transition-colors duration-300 font-sans">
            {/* Removed internal background to blend with page */}

            {/* Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-50 dark:bg-teal-500/10 p-2 rounded-lg border border-teal-100 dark:border-teal-500/20">
                        <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                        <span className="text-slate-900 dark:text-slate-100 text-sm font-bold block">Evaluación #429</span>
                        <span className="text-slate-500 dark:text-slate-500 text-[10px] font-medium uppercase tracking-wider">PHQ-9 • Depresión</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className={cn("w-1.5 h-1.5 rounded-full transition-colors duration-300", step === 1 ? "bg-amber-500 animate-pulse" : "bg-teal-500")} />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        {step === 0 ? "Input" : step === 1 ? "AI Analysis" : "Done"}
                    </span>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/20 flex flex-col justify-center items-center">
                <div className="scale-125 origin-center w-full flex justify-center p-6">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                className="space-y-4 w-full max-w-[280px]"
                            >
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center"
                                    >
                                        <div className="space-y-2">
                                            <div className="h-2.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                            <div className="h-2 w-20 bg-slate-50 dark:bg-slate-800/50 rounded-full" />
                                        </div>
                                        <div className="flex gap-2">
                                            {[0, 1, 2, 3].map(opt => (
                                                <div key={opt} className={cn(
                                                    "w-4 h-4 rounded-full border border-slate-200 dark:border-slate-700 transition-colors duration-500",
                                                    opt === 2 ? "bg-teal-500 border-teal-500 dark:bg-teal-500 dark:border-teal-500 scale-110" : "bg-transparent"
                                                )} />
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                                {/* Cursor Ghost Animation */}
                                <motion.div
                                    className="absolute pointer-events-none"
                                    animate={{
                                        x: [240, 240, 240],
                                        y: [40, 100, 160],
                                        scale: [1, 0.9, 1]
                                    }}
                                    transition={{ duration: 1.5, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 1 }}
                                >
                                    <div className="w-6 h-6 bg-slate-900/20 dark:bg-white/20 rounded-full blur-sm" />
                                </motion.div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm z-20"
                            >
                                <div className="relative w-full max-w-[240px]">
                                    <motion.div
                                        className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
                                        <div className="flex justify-center">
                                            <div className="relative">
                                                <Brain className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                                                <motion.div
                                                    className="absolute inset-0 overflow-hidden"
                                                    initial={{ height: "0%" }}
                                                    animate={{ height: "100%" }}
                                                    transition={{ duration: 2, ease: "linear" }}
                                                >
                                                    <Brain className="w-16 h-16 text-teal-600 dark:text-teal-400" />
                                                </motion.div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-teal-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2 }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                <span>Scanning</span>
                                                <span>Processing</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-teal-100 dark:border-teal-500/30 shadow-xl shadow-teal-900/5 dark:shadow-black/50 relative overflow-hidden w-full max-w-[320px]"
                            >
                                <motion.div
                                    className="absolute -right-4 -top-4 bg-teal-50 dark:bg-teal-900/20 w-32 h-32 rounded-full blur-2xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                <div className="relative z-10 text-center space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border border-teal-100 dark:border-teal-500/20">
                                        <Sparkles className="w-4 h-4" />
                                        <span>Severidad: Moderada</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                                            14<span className="text-2xl text-slate-400 dark:text-slate-500 font-medium">/27</span>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Puntuación Total</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-left">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                            <div className="text-[10px] text-slate-400 font-bold uppercase">Sintomas</div>
                                            <div className="text-slate-700 dark:text-slate-200 font-semibold text-base">Físicos</div>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                            <div className="text-[10px] text-slate-400 font-bold uppercase">Tendencia</div>
                                            <div className="text-teal-600 dark:text-teal-400 font-semibold text-base flex items-center gap-1">
                                                <Activity className="w-4 h-4" /> Estable
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Scanline Effect overlay for "Input" phase to look digital */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] z-30 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        </div>
    )
}
