"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, MessageSquare, Plus } from "lucide-react"

export function MockAICopilot() {
    return (
        <div className="w-full h-full bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-2xl shadow-slate-200/50 ring-1 ring-slate-900/5">
            {/* AI Header */}
            <div className="h-20 bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center px-6 justify-between relative shadow-md shrink-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%230f172a' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
                    }}
                />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/20 backdrop-blur-md shadow-inner">
                        <Brain className="h-5 w-5 text-indigo-50" />
                    </div>
                    <div>
                        <span className="text-white text-base font-bold tracking-wide block leading-none mb-1">Co-Piloto IA</span>
                        <span className="text-indigo-200 text-[10px] uppercase tracking-wider font-medium">Asistente Clínico</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-indigo-950/30 px-3 py-1.5 rounded-full border border-indigo-400/30 backdrop-blur-sm relative z-10">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                    <span className="text-[11px] text-indigo-50 font-semibold tracking-wide">En línea</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-8 space-y-8 overflow-hidden relative bg-slate-50/50">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

                {/* User Message */}
                <div className="flex gap-4 justify-end relative z-10">
                    <div className="bg-white text-slate-700 text-sm p-5 rounded-3xl rounded-tr-none max-w-[85%] border border-slate-200 shadow-sm leading-relaxed">
                        Paciente menciona insomnio recurrente y falta de concentración durante el trabajo, lo que afecta su rendimiento.
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0" />
                </div>

                {/* AI Thinking */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4 relative z-10"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30 border-2 border-white">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-4 max-w-[90%]">
                        <motion.div
                            className="bg-white text-slate-600 text-sm p-6 rounded-3xl rounded-tl-none border border-slate-200 shadow-lg shadow-slate-200/50 relative overflow-hidden"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, type: "spring", stiffness: 200 }}
                        >
                            <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                            <p className="font-bold mb-3 text-indigo-700 flex items-center gap-2 text-xs uppercase tracking-wider">
                                <Brain className="w-3.5 h-3.5" /> Análisis Clínico Preliminar
                            </p>
                            <ul className="space-y-3 list-none pl-1">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-100 border border-indigo-300 mt-1.5 shrink-0" />
                                    <span>Síntomas sugieren posible <b>Trastorno de Ansiedad Generalizada (TAG)</b>.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-100 border border-indigo-300 mt-1.5 shrink-0" />
                                    <span>Se recomienda administrar escala <b>GAD-7</b> para objetivar sintomatología.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-100 border border-indigo-300 mt-1.5 shrink-0" />
                                    <span>Evaluar impacto funcional en el ámbito laboral.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Suggestion Chip */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            className="flex gap-2 pl-2"
                        >
                            <button className="bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 hover:border-indigo-200 text-xs px-4 py-2 rounded-full transition-all flex items-center gap-2 font-bold shadow-sm hover:shadow-md">
                                <Plus className="h-3.5 w-3.5" />
                                Agregar al Informe
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
