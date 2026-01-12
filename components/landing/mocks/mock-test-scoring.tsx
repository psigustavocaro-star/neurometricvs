"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Brain, Activity, FileText, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function MockTestScoring() {
    const t = useTranslations('Mocks.TestScoring')
    const [step, setStep] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full max-w-xl self-center h-[500px] bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
            {/* Unified Clinical Header */}
            <div className="h-20 bg-slate-900 flex items-center px-8 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                        <span className="text-white text-base font-bold tracking-tight block">{t('title')}</span>
                        <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{t('subtitle')}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    <div className={cn("w-2 h-2 rounded-full transition-all duration-500", step === 1 ? "bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-emerald-400")} />
                    <span className="text-[10px] text-emerald-50 font-bold uppercase tracking-widest">
                        {step === 1 ? t('processing') : t('active_system')}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/20 flex flex-col items-center justify-center p-8">
                <AnimatePresence mode="wait" initial={false}>
                    {step === 0 && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                            className="w-full h-full flex flex-col justify-center gap-6"
                        >
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center"
                                    >
                                        <div className="space-y-2">
                                            <div className="h-2.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                            <div className="h-1.5 w-20 bg-slate-50 dark:bg-slate-800 rounded-full" />
                                        </div>
                                        <div className="flex gap-2.5">
                                            {[0, 1, 2, 3].map(opt => (
                                                <div key={opt} className={cn(
                                                    "w-4 h-4 rounded-full border border-slate-200 dark:border-slate-700 transition-all duration-300",
                                                    opt === (i === 2 ? 1 : 2) ? "bg-teal-500 border-teal-500 scale-110 shadow-lg shadow-teal-500/20" : "bg-slate-50 dark:bg-slate-800"
                                                )} />
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-4 p-4 bg-slate-900/5 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center gap-2">
                                <div className="h-2 w-48 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('syncing')}</p>
                            </div>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center space-y-8"
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute -inset-8 bg-teal-500/10 dark:bg-teal-400/5 rounded-full blur-2xl"
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="relative w-24 h-24 bg-white dark:bg-slate-900 rounded-3xl border border-teal-100 dark:border-teal-500/30 flex items-center justify-center shadow-2xl">
                                    <Brain className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 bg-teal-500/20 h-0"
                                        animate={{ height: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                            </div>
                            <div className="text-center space-y-3">
                                <h4 className="text-slate-900 dark:text-white font-bold text-lg">{t('analyzing')}</h4>
                                <div className="h-1.5 w-48 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mx-auto">
                                    <motion.div
                                        className="h-full bg-teal-500"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
                            className="w-full space-y-6"
                        >
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-teal-500/20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <Sparkles className="w-8 h-8 text-teal-500/10" />
                                </div>
                                <div className="text-center space-y-4">
                                    <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded-full border border-amber-100 dark:border-amber-500/20 uppercase tracking-widest">{t('severity_moderate')}</span>
                                    <div className="relative inline-block">
                                        <h3 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">14</h3>
                                        <span className="absolute -right-10 bottom-2 text-2xl text-slate-400 dark:text-slate-500 font-bold">/27</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium italic">{t('tag_concordant')}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50 dark:border-slate-800">
                                    <div className="text-center">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t('precision_label')}</p>
                                        <p className="text-slate-900 dark:text-slate-100 font-bold">99.9%</p>
                                    </div>
                                    <div className="text-center border-l border-slate-50 dark:border-slate-800">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t('tempo_label')}</p>
                                        <p className="text-slate-900 dark:text-slate-100 font-bold">0.4s</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
