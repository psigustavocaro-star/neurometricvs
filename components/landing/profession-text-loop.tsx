'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Brain, HeartPulse, Activity, Stethoscope, Puzzle, GraduationCap, Apple, Mic2 } from 'lucide-react'

const professions = [
    'Psicólogos',
    'Psiquiatras',
    'Neurólogos',
    'Médicos',
    'Terapeutas Ocupacionales',
    'Fonoaudiólogos',
    'Psicopedagogos',
    'Nutricionistas'
]

const iconMap: Record<number, any> = {
    0: Brain,
    1: HeartPulse,
    2: Activity,
    3: Stethoscope,
    4: Puzzle,
    5: Mic2,
    6: GraduationCap,
    7: Apple
}

const colorMap: Record<number, string> = {
    0: 'from-teal-500 to-emerald-500',   // Psicólogos
    1: 'from-purple-500 to-indigo-500', // Psiquiatras
    2: 'from-blue-500 to-cyan-500',     // Neurólogos
    3: 'from-teal-600 to-teal-400',     // Médicos
    4: 'from-cyan-500 to-blue-600',     // Terapeutas Ocupacionales
    5: 'from-emerald-500 to-teal-600',  // Fonoaudiólogos
    6: 'from-indigo-500 to-purple-600', // Psicopedagogos
    7: 'from-cyan-600 to-emerald-500'   // Nutricionistas
}

const borderMap: Record<number, string> = {
    0: 'border-teal-500/20 dark:border-teal-500/30',
    1: 'border-purple-500/20 dark:border-purple-500/30',
    2: 'border-blue-500/20 dark:border-blue-500/30',
    3: 'border-teal-400/20 dark:border-teal-400/30',
    4: 'border-cyan-500/20 dark:border-cyan-500/30',
    5: 'border-emerald-500/20 dark:border-emerald-500/30',
    6: 'border-indigo-500/20 dark:border-indigo-500/30',
    7: 'border-emerald-400/20 dark:border-emerald-400/30'
}

export function ProfessionTextLoop() {
    const t = useTranslations('Hero')
    const professionsList = t.raw('professions') as string[] || professions
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % professionsList.length)
        }, 3500)

        return () => clearInterval(timer)
    }, [professionsList.length])

    const currentText = professionsList[currentIndex]
    const currentGradient = colorMap[currentIndex % Object.keys(colorMap).length]
    const currentBorder = borderMap[currentIndex % Object.keys(borderMap).length]
    const CurrentIcon = iconMap[currentIndex % Object.keys(iconMap).length]

    return (
        <span className="inline-flex items-center align-middle mx-1 sm:mx-2 min-h-[1.5em] group">
            <span className={`relative flex items-center gap-2.5 bg-white/70 dark:bg-slate-900/60 px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl border ${currentBorder} shadow-lg shadow-black/[0.03] dark:shadow-white/[0.02] backdrop-blur-xl transition-all duration-700 ease-in-out min-w-[200px] xs:min-w-[250px] sm:min-w-[320px] md:min-w-[380px] lg:min-w-[480px] justify-center overflow-hidden`}>

                {/* Premium Shimmer Effect */}
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skew-x-[-20deg] pointer-events-none"
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -15, scale: 0.95, filter: 'blur(5px)' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3 relative z-10"
                    >
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${currentGradient} shadow-sm flex items-center justify-center shrink-0`}>
                            <CurrentIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${currentGradient} whitespace-nowrap`}>
                            {currentText}
                        </span>
                    </motion.div>
                </AnimatePresence>

                {/* Sophisticated loading bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-200/30 dark:bg-slate-700/30 overflow-hidden">
                    <motion.div
                        className={`h-full bg-gradient-to-r ${currentGradient} shadow-[0_0_10px_rgba(20,184,166,0.5)]`}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        key={`bar-${currentIndex}`}
                    />
                </div>
            </span>
        </span>
    )
}
