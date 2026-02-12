"use client"

import { motion } from "framer-motion"
import { Bot, User, Send, Check, ShieldCheck, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

export function MockAlanaSupport() {
    const t = useTranslations('Mocks.AlanaSupport')

    return (
        <div className="w-full max-w-xl self-center h-[380px] sm:h-[420px] md:h-[500px] bg-white dark:bg-slate-950 rounded-2xl md:rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col shadow-lg overflow-hidden relative">
            {/* Clinical Header */}
            <div className="h-20 bg-slate-900 flex items-center px-8 justify-between shrink-0 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                        <span className="text-white text-base font-bold tracking-tight block">{t('title')}</span>
                        <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{t('subtitle')}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 bg-teal-500/10 px-4 py-2 rounded-full border border-teal-500/20 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest leading-none">{t('active_system')}</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden relative bg-slate-50/50 dark:bg-slate-900/10">
                {/* User query 1 */}
                <div className="flex gap-2 sm:gap-3 justify-end relative z-10">
                    <div className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs p-3 sm:p-4 rounded-2xl rounded-tr-none max-w-[85%] border border-slate-200 dark:border-slate-800 shadow-sm leading-relaxed">
                        {t('query_1')}
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                    </div>
                </div>

                {/* Aura response 1 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-2 sm:gap-3 relative z-10"
                >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0 shadow-md transform -translate-y-1 sm:-translate-y-2">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div className="bg-teal-600 text-white text-[10px] sm:text-xs p-4 sm:p-5 rounded-2xl rounded-tl-none max-w-[90%] shadow-lg shadow-teal-500/10 border border-teal-500/20 leading-relaxed relative">
                        {t('response_1')}
                        <div className="mt-3 flex gap-2">
                            <span className="px-2 py-1 rounded bg-white/10 text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1">
                                <ShieldCheck className="w-2.5 h-2.5" /> HIPAA Ready
                            </span>
                            <span className="px-2 py-1 rounded bg-white/10 text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5" /> Real-time
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* User query 2 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex gap-3 justify-end relative z-10"
                >
                    <div className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs p-4 rounded-2xl rounded-tr-none max-w-[80%] border border-slate-200 dark:border-slate-800 shadow-sm leading-relaxed">
                        {t('query_2')}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-slate-400" />
                    </div>
                </motion.div>

                {/* Input simulator */}
                <div className="absolute bottom-4 left-6 right-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-between shadow-lg">
                        <span className="text-xs text-slate-400 ml-2">Responder a Alana IA...</span>
                        <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center">
                            <Send className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 24/7 Badge Floating */}
            <div className="absolute bottom-20 right-8 z-20 overflow-hidden">
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-slate-900 text-white px-4 py-2 rounded-full border border-white/20 shadow-2xl flex items-center gap-2"
                >
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    <span className="text-[10px] font-black tracking-widest uppercase">Support 24/7</span>
                </motion.div>
            </div>
        </div>
    )
}
