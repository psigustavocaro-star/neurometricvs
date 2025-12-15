"use client"

import { motion } from "framer-motion"
import { Calendar, Bell, ChevronRight, User, Stethoscope, Video, Mic } from "lucide-react"

export function MockMobileApp() {
    return (
        <div className="w-full h-full flex items-center justify-center py-8">
            {/* Mobile Frame - Clean iPhone 15 Pro Style */}
            <div className="w-[300px] h-[620px] bg-black rounded-[55px] border-[8px] border-slate-900 shadow-2xl overflow-hidden relative ring-1 ring-white/20">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-30 flex items-center justify-center pointer-events-none">
                    <div className="w-[80px] h-[20px] bg-black rounded-full grid place-items-center relative">
                        {/* Camera/Sensor indicators */}
                        <div className="absolute right-3 w-3 h-3 rounded-full bg-[#1a1a1a]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                    </div>
                </div>

                {/* Status Bar Overlay */}
                <div className="h-14 w-full absolute top-0 z-20 bg-gradient-to-b from-black/0 to-transparent pointer-events-none" />

                {/* App Content */}
                <div className="w-full h-full bg-slate-50 overflow-hidden flex flex-col font-sans">

                    {/* Header */}
                    <div className="bg-white pt-14 pb-4 px-6 border-b border-slate-100 flex justify-between items-center shadow-sm relative z-10">
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Buenos días,</p>
                            <h3 className="text-slate-900 font-bold text-lg leading-tight">Dr. Gustavo</h3>
                        </div>
                        <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center relative">
                            <img src="/assets/v2/dr-profile.png" alt="Profile" className="w-full h-full object-cover rounded-full opacity-90" />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        </div>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-hidden relative p-4 space-y-4">

                        {/* Latest Assessment Card - Removed Scheduling */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg shadow-indigo-600/20 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <Stethoscope className="w-24 h-24 text-white" />
                            </div>
                            <div className="relative z-10">
                                <span className="inline-block px-2 py-0.5 rounded bg-white/20 text-[10px] font-medium mb-3 backdrop-blur-sm">Último Resultado</span>
                                <h4 className="font-bold text-lg mb-0.5">M. Rodríguez</h4>
                                <p className="text-indigo-200 text-xs mb-4">Evaluación PHQ-9 & GAD-7</p>

                                <div className="flex gap-2">
                                    <div className="flex-1 bg-white/10 rounded-xl p-2 border border-white/10 backdrop-blur-sm">
                                        <p className="text-[10px] text-indigo-200 uppercase tracking-wider font-bold">Depresión</p>
                                        <p className="text-xl font-bold">12 <span className="text-[10px] font-normal opacity-70">Moderado</span></p>
                                    </div>
                                    <div className="flex-1 bg-white/10 rounded-xl p-2 border border-white/10 backdrop-blur-sm">
                                        <p className="text-[10px] text-indigo-200 uppercase tracking-wider font-bold">Ansiedad</p>
                                        <p className="text-xl font-bold">08 <span className="text-[10px] font-normal opacity-70">Leve</span></p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm place-items-start"
                            >
                                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mb-2">
                                    <User className="h-4 w-4 text-teal-600" />
                                </div>
                                <span className="text-2xl font-bold text-slate-800 block">12</span>
                                <span className="text-[10px] text-slate-500 font-medium">Pacientes hoy</span>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm place-items-start"
                            >
                                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-2">
                                    <Stethoscope className="h-4 w-4 text-amber-600" />
                                </div>
                                <span className="text-2xl font-bold text-slate-800 block">5</span>
                                <span className="text-[10px] text-slate-500 font-medium">Tests pendientes</span>
                            </motion.div>
                        </div>

                        {/* Recent Activity */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                        >
                            <div className="p-3 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                <h5 className="text-xs font-bold text-slate-700">Actividad Reciente</h5>
                                <ChevronRight className="w-3 h-3 text-slate-400" />
                            </div>
                            <div className="p-1">
                                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700">LP</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-800 truncate">Luis Pérez completó PHQ-9</p>
                                        <p className="text-[10px] text-slate-500 truncate">Hace 2 minutos • Riesgo Moderado</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">AG</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-800 truncate">Ana García subió documentos</p>
                                        <p className="text-[10px] text-slate-500 truncate">Hace 15 minutos</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Bottom Nav */}
                    <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-4 shrink-0">
                        <div className="flex flex-col items-center gap-1 opacity-100">
                            <div className="w-5 h-5 bg-teal-600 rounded-lg" />
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <div className="w-5 h-5 bg-slate-300 rounded-lg" />
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <div className="w-5 h-5 bg-slate-300 rounded-lg" />
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <div className="w-5 h-5 bg-slate-300 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
