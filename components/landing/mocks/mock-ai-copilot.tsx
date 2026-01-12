"use client"

import { motion } from "framer-motion"
import { FileText, ClipboardList, Plus, Bot, User, Sparkles, Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function MockAICopilot() {
    const t = useTranslations('Mocks.AICopilot')
    return (
        <div className="w-full max-w-xl self-center h-[500px] bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
            {/* Unified Clinical Header */}
            <div className="h-20 bg-slate-900 flex items-center px-8 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-teal-400" />
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

            {/* Chat Area */}
            <div className="flex-1 p-8 space-y-8 overflow-hidden relative bg-slate-50/50 dark:bg-slate-900/10">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

                {/* User Message */}
                <div className="flex gap-4 justify-end relative z-10">
                    <div className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm p-5 rounded-3xl rounded-tr-none max-w-[85%] border border-slate-200 dark:border-slate-800 shadow-sm leading-relaxed font-medium">
                        {t('user_note')}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950 shadow-sm shrink-0 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-500" />
                    </div>
                </div>

                {/* System Output */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4 relative z-10"
                >
                    <div className="w-10 h-10 rounded-2xl bg-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20 border-2 border-white dark:border-slate-950">
                        <ClipboardList className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-4 w-full">
                        <div className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm p-6 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 relative overflow-hidden">
                            <div className="absolute left-0 top-0 w-1.5 h-full bg-teal-500" />
                            <p className="font-black mb-4 text-teal-700 dark:text-teal-400 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                                <Sparkles className="w-3.5 h-3.5" /> {t('predictive_analysis')}
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center border border-teal-100 dark:border-teal-500/20 mt-0.5">
                                        <Check className="w-3 h-3 text-teal-600" />
                                    </div>
                                    <span>{t('tag_match')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center border border-teal-100 dark:border-teal-500/20 mt-0.5">
                                        <Check className="w-3 h-3 text-teal-600" />
                                    </div>
                                    <span>{t('action_gad7')}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Suggestion Chip */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="flex gap-2"
                        >
                            <button className="bg-slate-900 dark:bg-teal-600 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10">
                                <Plus className="h-3.5 w-3.5" />
                                {t('add_to_diagnosis')}
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
