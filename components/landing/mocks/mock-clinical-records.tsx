"use client"

import { motion } from "framer-motion"
import { FileText, Save, Clock, User, Mic } from "lucide-react"
import { useEffect, useState } from "react"

export function MockClinicalRecords() {
    const [text, setText] = useState("")
    const fullText = "Paciente reporta una mejora significativa en sus patrones de sueño. Los niveles de ansiedad han disminuido tras implementar los ejercicios de respiración..."

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setText(fullText.slice(0, i))
            i++
            if (i > fullText.length) {
                setTimeout(() => { i = 0 }, 4000) // Reset after pause
            }
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col shadow-2xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-900/5 dark:ring-white/5">
            {/* Toolbar */}
            <div className="h-16 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700 flex items-center px-8 justify-between shrink-0 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-400/80 shadow-sm" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80 shadow-sm" />
                    <div className="h-3 w-3 rounded-full bg-green-400/80 shadow-sm" />
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
                    <span className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-lg border border-slate-200/60 shadow-sm">
                        <User className="h-3.5 w-3.5 text-teal-600" />
                        <span className="text-slate-700">Juan Pérez</span>
                    </span>
                    <span className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-lg border border-slate-200/60 shadow-sm">
                        <Clock className="h-3.5 w-3.5 text-indigo-600" /> 14:00
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 font-sans text-sm relative bg-white flex flex-col">
                <div className="flex gap-8 h-full">
                    {/* Sidebar / Context */}
                    <div className="w-1/3 space-y-6">
                        <div className="space-y-3">
                            <div className="h-3 w-20 bg-slate-100 rounded-full" />
                            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3">
                                <div className="h-2 w-full bg-slate-200 rounded-full" />
                                <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-3 w-24 bg-slate-100 rounded-full" />
                            <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50 space-y-3">
                                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                                    <Mic className="w-3.5 h-3.5" /> Transcripción
                                </div>
                                <div className="h-2 w-full bg-indigo-100 rounded-full" />
                                <div className="h-2 w-2/3 bg-indigo-100 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="w-2/3 space-y-3 flex flex-col">
                        <div className="flex justify-between items-center mb-2 shrink-0">
                            <div className="h-3 w-32 bg-slate-100 rounded-full" />
                            <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-100">GUARDADO RECIENTE</span>
                        </div>
                        <div className="w-full h-full bg-slate-50/30 rounded-2xl border border-slate-100 p-6 text-slate-600 leading-loose shadow-inner text-base overflow-hidden">
                            {text}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-0.5 h-5 bg-teal-500 ml-1 align-middle"
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all border border-slate-700"
                    >
                        <Save className="h-4 w-4" /> Guardar Ficha
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
