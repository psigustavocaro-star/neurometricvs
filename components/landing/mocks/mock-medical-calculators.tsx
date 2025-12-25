"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Activity, ChevronRight, Hash, User, ArrowRight } from 'lucide-react'

export function MockMedicalCalculators() {
    const [activeTab, setActiveTab] = useState('imc')

    return (
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden font-sans scale-90 md:scale-100">
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-bold text-sm">Calculadoras Médicas</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm pr-3">
                    <div className="flex -space-x-1.5">
                        {['female-1.png', 'male-1.png', 'female-2.png'].map((img, i) => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-xl relative group-hover/icon:scale-110 transition-transform duration-300">
                                <img
                                    src={`/assets/v2/${img}`}
                                    alt="Usuario profesional"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${i}&background=random`
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-extrabold text-teal-400 tracking-tight">+500</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <button
                    onClick={() => setActiveTab('imc')}
                    className={`flex-1 py-3 text-xs font-bold transition-all ${activeTab === 'imc' ? 'text-teal-600 border-b-2 border-teal-500 bg-white dark:bg-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    IMC
                </button>
                <button
                    onClick={() => setActiveTab('dosis')}
                    className={`flex-1 py-3 text-xs font-bold transition-all ${activeTab === 'dosis' ? 'text-teal-600 border-b-2 border-teal-500 bg-white dark:bg-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    DOSIS
                </button>
                <button
                    onClick={() => setActiveTab('riesgo')}
                    className={`flex-1 py-3 text-xs font-bold transition-all ${activeTab === 'riesgo' ? 'text-teal-600 border-b-2 border-teal-500 bg-white dark:bg-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    RIESGO
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                <AnimatePresence mode="wait">
                    {activeTab === 'imc' && (
                        <motion.div
                            key="imc"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Peso (kg)</label>
                                    <div className="h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center text-slate-700 dark:text-slate-200 font-bold">
                                        72
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Altura (cm)</label>
                                    <div className="h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center text-slate-700 dark:text-slate-200 font-bold">
                                        175
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase">Resultado IMC</p>
                                    <p className="text-2xl font-black text-teal-900 dark:text-teal-200">23.5</p>
                                </div>
                                <div className="px-3 py-1 bg-teal-500 text-white text-[10px] font-bold rounded-full">
                                    NORMAL
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-400 uppercase">Estado Nutricional</span>
                                    <span className="text-teal-600">Bajo Riesgo</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-amber-400 w-1/4" />
                                    <div className="h-full bg-teal-500 w-1/2 border-x-2 border-white dark:border-slate-900" />
                                    <div className="h-full bg-rose-500 w-1/4" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'dosis' && (
                        <motion.div
                            key="dosis"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                        >
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medicamento</label>
                                <div className="h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Amoxicilina (Jarabe)</span>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Peso Paciente (kg)</label>
                                <div className="h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center text-slate-700 dark:text-slate-200 font-bold">
                                    14.5
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-900 rounded-xl text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Cada 8h</p>
                                    <p className="text-xl font-black text-white">4.8 ml</p>
                                </div>
                                <div className="p-3 bg-slate-900 rounded-xl text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Cada 12h</p>
                                    <p className="text-xl font-black text-white">7.2 ml</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'riesgo' && (
                        <motion.div
                            key="riesgo"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                        >
                            <p className="text-xs text-slate-500 font-medium">Escala de Glasgow (Puntaje)</p>
                            <div className="space-y-3">
                                {[
                                    { label: 'Respuesta Ocular', val: '4/4' },
                                    { label: 'Respuesta Verbal', val: '5/5' },
                                    { label: 'Respuesta Motora', val: '6/6' }
                                ].map((row, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{row.label}</span>
                                        <span className="text-xs font-black text-teal-600">{row.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400">PUNTAJE TOTAL</span>
                                <span className="text-2xl font-black text-slate-900 dark:text-white">15/15</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button className="w-full mt-6 h-12 bg-slate-900 hover:bg-teal-600 text-white font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group">
                    <span>Guardar en Ficha</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    )
}
