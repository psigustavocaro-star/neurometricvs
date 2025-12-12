"use client"

import { motion } from "framer-motion"
import { FileText, Save, Clock, User } from "lucide-react"
import { useEffect, useState } from "react"

export function MockClinicalRecords() {
    const [text, setText] = useState("")
    const fullText = "Patient reports significant improvement in sleep patterns. Anxiety levels have decreased after implementing the breathing exercises..."

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setText(fullText.slice(0, i))
            i++
            if (i > fullText.length) {
                setTimeout(() => { i = 0 }, 2000) // Reset after pause
            }
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
            {/* Toolbar */}
            <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> Juan Pérez</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 14:00</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 font-mono text-sm relative">
                <div className="flex gap-4 mb-6">
                    <div className="w-1/3 space-y-3">
                        <div className="h-2 w-12 bg-slate-800 rounded" />
                        <div className="h-8 w-full bg-slate-800/50 rounded border border-slate-800" />
                        <div className="h-2 w-16 bg-slate-800 rounded mt-4" />
                        <div className="h-8 w-full bg-slate-800/50 rounded border border-slate-800" />
                    </div>
                    <div className="w-2/3 space-y-2">
                        <div className="h-2 w-24 bg-slate-800 rounded" />
                        <div className="w-full h-48 bg-slate-950/50 rounded-lg border border-slate-800 p-4 text-slate-300">
                            {text}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-4 bg-teal-500 ml-1 align-bottom"
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 right-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-900/20"
                    >
                        <Save className="h-3 w-3" /> Save Record
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
