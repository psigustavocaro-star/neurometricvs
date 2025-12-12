"use client"

import { motion } from "framer-motion"
import { Check, ClipboardList, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export function MockTestScoring() {
    const [step, setStep] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full h-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-teal-500" />
                    <span className="text-slate-200 text-sm font-bold">PHQ-9 Assessment</span>
                </div>
                <div className="text-xs text-slate-500">Auto-Score Mode</div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-center">
                {step === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                                <div className="h-2 w-32 bg-slate-700 rounded" />
                                <div className="flex gap-1">
                                    {[0, 1, 2, 3].map(opt => (
                                        <motion.div
                                            key={opt}
                                            initial={{ scale: 0.8 }}
                                            animate={{
                                                scale: opt === 2 ? [1, 1.2, 1] : 1,
                                                backgroundColor: opt === 2 ? '#0d9488' : '#334155'
                                            }}
                                            transition={{ delay: i * 0.2 + 0.5 }}
                                            className="w-6 h-6 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center space-y-4"
                    >
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                <motion.path
                                    className="text-teal-500"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray="100, 100" // Full circle
                                    initial={{ strokeDasharray: "0, 100" }}
                                    animate={{ strokeDasharray: "75, 100" }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-2xl font-bold text-white">18</span>
                                <span className="text-[10px] text-slate-400">POINTS</span>
                            </div>
                        </div>
                        <div className="text-teal-400 font-medium text-sm">Processing Results...</div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800/80 p-4 rounded-xl border border-teal-500/30"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-red-500/20 text-red-500 p-2 rounded-lg">
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Moderate-Severe Depression</h4>
                                <p className="text-xs text-slate-400">Interpretation based on DSM-5</p>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-teal-500 to-red-500"
                                initial={{ width: 0 }}
                                animate={{ width: "70%" }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
