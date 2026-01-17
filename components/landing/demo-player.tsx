'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { UserPlus, FileText, Check, Download, Users, Activity, Settings, Menu, Calendar, Search, Bell, Sparkles } from 'lucide-react'
import { useTranslations } from "next-intl"

export function DemoPlayer() {
    const t = useTranslations('DemoPlayer');
    const [step, setStep] = useState(0)

    // Animation sequence loop
    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 4) // 4 steps loop
        }, 5000) // Change step every 5 seconds for more readability
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full h-[500px] bg-slate-50 relative rounded-xl overflow-hidden border border-slate-200 shadow-inner flex font-sans">
            {/* Sidebar (High Fidelity) */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 gap-2 z-10 shrink-0 hidden md:flex">
                <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="h-6 w-6 bg-teal-600 rounded-md flex items-center justify-center">
                        <Activity className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm tracking-tight">Neurometrics</span>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-3 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm">
                        <Activity className="h-4 w-4" /> Dashboard
                    </div>
                    <div className="flex items-center gap-3 text-teal-700 bg-teal-50 px-3 py-2 rounded-lg font-medium text-sm border border-teal-100">
                        <Users className="h-4 w-4" /> {t('patients')}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm">
                        <Calendar className="h-4 w-4" /> Agenda
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm">
                        <FileText className="h-4 w-4" /> {t('reports')}
                    </div>
                </div>

                <div className="mt-auto border-t border-slate-100 pt-4 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{t('dr_name')}</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-teal-600 font-bold uppercase tracking-tighter bg-teal-50 px-1 rounded">{t('specialty', { defaultValue: 'Especialista' })}</span>
                                <span className="text-[10px] text-slate-500">• {t('plan_name')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
                {/* Topbar */}
                <div className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
                    <h2 className="font-semibold text-slate-800 text-sm">
                        {step === 0 && t('patients')}
                        {step === 1 && t('new_patient')}
                        {step === 2 && t('analysis_in_progress')}
                        {step === 3 && t('results')}
                    </h2>
                    <div className="flex items-center gap-4">
                        <Search className="h-4 w-4 text-slate-400" />
                        <Bell className="h-4 w-4 text-slate-400" />
                    </div>
                </div>

                <div className="flex-1 p-6 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6 max-w-4xl mx-auto"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="space-x-2">
                                        <h3 className="text-xl font-bold text-slate-900">{t('patient_list')}</h3>
                                        <p className="text-xs text-slate-500">{t('active_count', { count: 32 })}</p>
                                    </div>
                                    <motion.button
                                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ delay: 2, duration: 0.3 }}
                                    >
                                        <UserPlus className="h-4 w-4" /> {t('new')}
                                    </motion.button>
                                </div>

                                {/* Real-looking Table */}
                                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                                    <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        <div className="w-8"></div>
                                        <div>{t('name_label')}</div>
                                        <div>{t('status_label')}</div>
                                    </div>
                                    {[
                                        { name: "Ana Martínez", status: t('patient_status_active'), color: "bg-green-100 text-green-700" },
                                        { name: "Carlos López", status: t('patient_status_pending'), color: "bg-amber-100 text-amber-700" },
                                        { name: "María Rodríguez", status: t('patient_status_eval'), color: "bg-blue-100 text-blue-700" }
                                    ].map((p, i) => (
                                        <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b border-slate-50 items-center hover:bg-slate-50 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                                {p.name.charAt(0)}
                                            </div>
                                            <div className="font-medium text-slate-700 text-sm">{p.name}</div>
                                            <div className={`text-[10px] px-2 py-1 rounded-full font-bold ${p.color}`}>
                                                {p.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cursor Simulation */}
                                <motion.div
                                    className="absolute top-0 left-0 pointer-events-none z-50 drop-shadow-md"
                                    initial={{ x: "80%", y: "80%", opacity: 0 }}
                                    animate={{
                                        x: ["80%", "85%", "85%"],
                                        y: ["80%", "15%", "15%"],
                                        opacity: 1
                                    }}
                                    transition={{ duration: 1.5, times: [0, 0.8, 1], ease: "easeInOut" }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" fill="black" stroke="white" strokeWidth="2" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm"
                            >
                                <div className="border-b border-slate-100 pb-4 mb-4">
                                    <h3 className="text-xl font-bold text-slate-900">{t('new_patient')}</h3>
                                    <p className="text-sm text-slate-500">{t('complete_basic_info')}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase">{t('full_name')}</label>
                                        <motion.div
                                            className="h-10 w-full bg-white border border-slate-300 rounded-lg flex items-center px-3 text-sm text-slate-900 shadow-sm"
                                            initial={{ width: "0%", border: "1px solid #cbd5e1" }}
                                            animate={{ width: "100%", border: "1px solid #0d9488" }} // Highlight border on focus
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <span className="animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-teal-500 pr-1">
                                                {t('placeholder_name')}
                                            </span>
                                        </motion.div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase">{t('email')}</label>
                                        <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase">{t('phone')}</label>
                                        <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase">{t('birth_date')}</label>
                                        <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-lg" />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <motion.div
                                        className="h-10 px-6 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md"
                                        initial={{ scale: 0.95 }}
                                        animate={{ scale: 1 }}
                                    >
                                        {t('save_record')}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="test"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full space-y-8"
                            >
                                <div className="relative">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-slate-100 z-10 relative">
                                        <Sparkles className="h-10 w-10 text-teal-600" />
                                    </div>
                                    {/* Ripples */}
                                    <motion.div
                                        className="absolute inset-0 bg-teal-500/20 rounded-full z-0"
                                        animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-indigo-500/20 rounded-full z-0"
                                        animate={{ scale: [1, 1.3, 1.8], opacity: [0.5, 0] }}
                                        transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }}
                                    />
                                </div>

                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-slate-800">{t('analyzing')}</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto text-sm">{t('processing')}</p>
                                </div>

                                <div className="w-64 space-y-2">
                                    <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase">
                                        <span>{t('processing_data')}</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-teal-500 to-indigo-600"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "85%" }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full"
                            >
                                <div className="bg-white p-0 rounded-xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
                                    {/* Header of Report */}
                                    <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center gap-3">
                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 border border-green-200">
                                            <Check className="h-5 w-5 text-green-700" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{t('report_generated')}</h4>
                                            <p className="text-xs text-slate-500">{t('generated_moment')}</p>
                                        </div>
                                    </div>

                                    {/* Body Preview */}
                                    <div className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <div className="h-4 w-3/4 bg-slate-200 rounded" />
                                            <div className="h-2 w-full bg-slate-100 rounded" />
                                            <div className="h-2 w-full bg-slate-100 rounded" />
                                            <div className="h-2 w-2/3 bg-slate-100 rounded" />
                                        </div>
                                        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-start gap-3">
                                            <Sparkles className="h-4 w-4 text-indigo-600 mt-0.5" />
                                            <div className="space-y-1">
                                                <div className="h-2 w-20 bg-indigo-200 rounded" />
                                                <div className="h-1.5 w-40 bg-indigo-200/50 rounded" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                                        <motion.button
                                            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 rounded-lg flex items-center justify-center gap-2 text-sm font-bold shadow-md transition-all"
                                            whileHover={{ scale: 1.02 }}
                                            animate={{ scale: [1, 1.02, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        >
                                            <Download className="h-4 w-4" /> {t('download_pdf')}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
