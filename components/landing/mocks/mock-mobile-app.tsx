"use client"

import { motion } from "framer-motion"
import { Calendar, Bell, ChevronRight, User, Stethoscope, Video, Mic } from "lucide-react"

export function MockMobileApp() {
    return (
        <div className="w-full h-full flex items-center justify-center py-8">
            {/* Mobile Frame - Clean iPhone 15 Pro Style */}
            <div className="w-[300px] h-[620px] bg-slate-950 rounded-[55px] border-[8px] border-slate-900 shadow-2xl overflow-hidden relative ring-1 ring-white/20">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-30 flex items-center justify-center pointer-events-none">
                    <div className="w-[80px] h-[20px] bg-black rounded-full grid place-items-center relative">
                        <div className="absolute right-3 w-3 h-3 rounded-full bg-[#1a1a1a]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500/20" />
                    </div>
                </div>

                {/* Status Bar Overlay */}
                <div className="h-14 w-full absolute top-0 z-20 bg-gradient-to-b from-slate-950/20 to-transparent pointer-events-none" />

                {/* App Content */}
                <div className="w-full h-full bg-slate-50 dark:bg-slate-950 overflow-hidden flex flex-col font-sans">

                    {/* Header */}
                    <div className="bg-slate-900 pt-14 pb-5 px-6 border-b border-white/5 flex justify-between items-center shadow-lg relative z-10">
                        <div>
                            <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest mb-1">Bienvenido</p>
                            <h3 className="text-white font-bold text-lg leading-tight tracking-tight">Dr. Gustavo</h3>
                        </div>
                        <div className="w-11 h-11 bg-teal-500/10 rounded-2xl border border-teal-500/20 flex items-center justify-center relative overflow-hidden">
                            <User className="w-6 h-6 text-teal-400" />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                        </div>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-hidden relative p-5 space-y-5 bg-slate-50 dark:bg-slate-900/40">

                        {/* Status Pulse Banner */}
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-black uppercase tracking-widest">Sincronización en Tiempo Real</span>
                        </div>

                        {/* Recent Result Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 rounded-3xl p-5 text-white shadow-2xl relative overflow-hidden border border-white/5"
                        >
                            <div className="absolute -right-4 -top-4 p-3 opacity-5">
                                <Stethoscope className="w-32 h-32 text-teal-400" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-black text-xl tracking-tight">M. Rodríguez</h4>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">PHQ-9 Completado</p>
                                    </div>
                                    <div className="bg-teal-500 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase">Nuevo</div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5 backdrop-blur-md">
                                        <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Depresión</p>
                                        <p className="text-lg font-black text-teal-400 leading-none">12</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5 backdrop-blur-md">
                                        <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Ansiedad</p>
                                        <p className="text-lg font-black text-indigo-400 leading-none">08</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl flex flex-col items-center gap-2"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600">
                                    <Video className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Teleconsulta</span>
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl flex flex-col items-center gap-2"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Alertas</span>
                            </motion.div>
                        </div>

                    </div>

                    {/* Bottom Nav */}
                    <div className="h-20 bg-slate-900 border-t border-white/5 flex justify-around items-center px-6 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                        <div className="w-11 h-11 bg-teal-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="w-11 h-11 text-slate-500 rounded-2xl flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="w-11 h-11 text-slate-500 rounded-2xl flex items-center justify-center">
                            <Mic className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
