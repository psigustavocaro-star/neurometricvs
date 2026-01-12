"use client"

import { motion } from "framer-motion"
import { FileText, Save, Clock, User, Mic } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

export function MockClinicalRecords() {
    const t = useTranslations('Mocks.ClinicalRecords')
    const [text, setText] = useState("")
    const fullText = t('placeholder_text')

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setText(fullText.slice(0, i))
            i++
            if (i > fullText.length) {
                setTimeout(() => { i = 0 }, 5000)
            }
        }, 40)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full max-w-xl self-center h-[480px] bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
            {/* Unified Clinical Header */}
            <div className="h-16 md:h-20 bg-slate-900 flex items-center px-6 md:px-8 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                        <span className="text-white text-base font-bold tracking-tight block">{t('title')}</span>
                        <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{t('subtitle')}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <span className="text-[10px] text-emerald-50 font-bold uppercase tracking-widest">{t('active_system')}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 flex flex-col bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                            <User className="h-4 w-4 text-slate-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{t('patient_label')}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{t('last_session')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                            <Mic className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden shadow-inner group">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-50 dark:border-slate-800">
                        <div className="flex gap-2">
                            <div className="h-1.5 w-12 bg-slate-100 dark:bg-slate-800 rounded-full" />
                            <div className="h-1.5 w-8 bg-slate-50 dark:bg-slate-800 rounded-full" />
                        </div>
                        <span className="text-[9px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-500/10 px-2 py-0.5 rounded uppercase border border-teal-100 dark:border-teal-500/20">Auto-Save</span>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium text-base">
                        {text}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-0.5 h-5 bg-teal-500 ml-1 align-middle shadow-[0_0_8px_rgba(20,184,166,0.4)]"
                        />
                    </p>

                    {/* Editor UI Accents */}
                    <div className="absolute bottom-4 left-6 flex gap-4">
                        <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-slate-900 dark:bg-teal-600 dark:hover:bg-teal-500 text-white px-8 py-3.5 rounded-xl text-xs font-bold flex items-center gap-3 shadow-xl shadow-slate-900/10 transition-all border border-slate-800 dark:border-teal-500/30"
                    >
                        <Save className="h-4 w-4" /> {t('finish_button')}
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
