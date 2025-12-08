'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { UserPlus, FileText, Check, Download, Users, Activity, Settings, Menu } from 'lucide-react'

import { useTranslations } from "next-intl"

export function DemoPlayer() {
    const t = useTranslations('DemoPlayer');
    const [step, setStep] = useState(0)

    // Animation sequence loop
    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 4) // 4 steps loop
        }, 4000) // Change step every 4 seconds
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full h-[400px] bg-slate-50 relative rounded-xl overflow-hidden border border-slate-200 shadow-inner flex">
            {/* Sidebar (Static) */}
            <div className="w-16 md:w-48 bg-white border-r border-slate-200 flex flex-col p-4 gap-4 z-10">
                <div className="h-6 w-6 md:w-24 bg-teal-100 rounded mb-4" />
                <div className="flex items-center gap-3 text-teal-600 bg-teal-50 p-2 rounded-lg">
                    <Users className="h-4 w-4" />
                    <div className="hidden md:block h-2 w-20 bg-teal-200 rounded" />
                </div>
                <div className="flex items-center gap-3 text-slate-400 p-2">
                    <Activity className="h-4 w-4" />
                    <div className="hidden md:block h-2 w-16 bg-slate-100 rounded" />
                </div>
                <div className="flex items-center gap-3 text-slate-400 p-2">
                    <FileText className="h-4 w-4" />
                    <div className="hidden md:block h-2 w-14 bg-slate-100 rounded" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 relative">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800">{t('patients')}</h3>
                                <motion.div
                                    className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 shadow-md"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ delay: 2, duration: 0.3 }}
                                >
                                    <UserPlus className="h-4 w-4" /> {t('new')}
                                </motion.div>
                            </div>
                            {/* List */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-12 w-full bg-white border border-slate-100 rounded-lg shadow-sm flex items-center px-4 gap-4">
                                    <div className="h-8 w-8 bg-slate-100 rounded-full" />
                                    <div className="h-2 w-32 bg-slate-100 rounded" />
                                    <div className="ml-auto h-2 w-16 bg-teal-50 rounded" />
                                </div>
                            ))}

                            {/* Cursor Simulation */}
                            <motion.div
                                className="absolute top-0 left-0 pointer-events-none"
                                initial={{ x: 100, y: 100, opacity: 0 }}
                                animate={{
                                    x: ["20%", "80%", "82%"],
                                    y: ["50%", "10%", "12%"],
                                    opacity: 1
                                }}
                                transition={{ duration: 2, times: [0, 0.8, 1] }}
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
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-bold text-slate-800 mb-6">{t('new_patient')}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="h-2 w-12 bg-slate-200 rounded" />
                                    <motion.div
                                        className="h-10 w-full bg-white border border-slate-200 rounded-lg flex items-center px-2 text-sm text-slate-700"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        Juan Pérez
                                    </motion.div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-12 bg-slate-200 rounded" />
                                    <motion.div
                                        className="h-10 w-full bg-white border border-slate-200 rounded-lg"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    />
                                </div>
                            </div>
                            <motion.div
                                className="w-32 h-10 bg-teal-600 rounded-lg ml-auto mt-4"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            />
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="test"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full space-y-4"
                        >
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                                <Activity className="h-8 w-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{t('analyzing')}</h3>
                            <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-teal-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </div>
                            <div className="text-sm text-slate-500">{t('processing')}</div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white p-6 rounded-xl border border-slate-100 shadow-lg w-full max-w-sm mx-auto"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{t('report_ready')}</h4>
                                    <p className="text-xs text-slate-500">{t('generated_moment')}</p>
                                </div>
                            </div>
                            <div className="h-32 bg-slate-50 rounded-lg border border-dashed border-slate-200 mb-4 flex items-center justify-center">
                                <FileText className="h-12 w-12 text-slate-300" />
                            </div>
                            <motion.button
                                className="w-full bg-slate-900 text-white h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
                                whileHover={{ scale: 1.02 }}
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Download className="h-4 w-4" /> {t('download_pdf')}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {[0, 1, 2, 3].map(i => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-6 bg-teal-500' : 'w-1.5 bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
    )
}
