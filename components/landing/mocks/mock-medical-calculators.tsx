"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Activity, ChevronRight, Hash, User, ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function MockMedicalCalculators() {
    const t = useTranslations('Mocks.MedicalCalculators')
    const [activeTab, setActiveTab] = useState('imc')

    return (
        <div className="w-full max-w-xl self-center h-[480px] bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
            {/* Unified Clinical Header */}
            <div className="h-16 md:h-20 bg-slate-900 flex items-center px-6 md:px-8 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                        <span className="text-white text-base font-bold tracking-tight block">{t('title')}</span>
                        <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{t('precision_module')}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <span className="text-[10px] text-emerald-50 font-bold uppercase tracking-widest">{t('active_system', { defaultValue: 'Sistema Activo' })}</span>
                </div>
            </div>

            {/* Segmented Control Tabs */}
            <div className="px-6 md:px-8 pt-6">
                <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md">
                    {['imc', 'dosis', 'riesgo'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "flex-1 py-3 text-[10px] font-extrabold uppercase tracking-widest transition-all rounded-xl",
                                activeTab === tab
                                    ? "bg-white dark:bg-slate-800 text-teal-600 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/5"
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 overflow-hidden flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {activeTab === 'imc' && (
                        <motion.div
                            key="imc"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('weight')}</label>
                                    <div className="h-14 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center text-slate-900 dark:text-white font-black text-xl">
                                        72.5
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('height')}</label>
                                    <div className="h-14 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center text-slate-900 dark:text-white font-black text-xl">
                                        178
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-3xl flex items-center justify-between shadow-lg shadow-teal-500/5">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">{t('bmi')}</p>
                                    <p className="text-4xl font-black text-teal-900 dark:text-white tracking-tighter">22.9</p>
                                </div>
                                <div className="px-4 py-2 bg-teal-500 text-white text-[10px] font-black rounded-xl shadow-lg shadow-teal-500/20 uppercase tracking-widest leading-none">
                                    {t('normal')}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'dosis' && (
                        <motion.div
                            key="dosis"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('medication')}</label>
                                <div className="h-14 px-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between border border-white/5">
                                    <span className="font-bold">Sertralina (PHQ-9)</span>
                                    <ChevronRight className="w-5 h-5 text-teal-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('min_label')}</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">50mg</p>
                                </div>
                                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('max_label')}</p>
                                    <p className="text-2xl font-black text-rose-500">200mg</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'riesgo' && (
                        <motion.div
                            key="riesgo"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl shadow-slate-900/5">
                                <div className="flex justify-between items-center text-sm font-bold border-b border-slate-50 dark:border-slate-800 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[11px]">{t('projected_calc')}</span>
                                    <span className="text-teal-600">{t('clinical_risk')}</span>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex justify-between items-center">
                                            <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                            <div className="h-5 w-8 bg-teal-50 dark:bg-teal-500/10 rounded flex items-center justify-center text-[11px] font-black text-teal-600">{i * 2}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8">
                    <button className="w-full h-14 bg-slate-900 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 group">
                        <span>{t('insert_record')}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    )
}
