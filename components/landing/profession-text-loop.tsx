'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

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

    return (
        <span className="inline-flex items-center align-middle mx-1 sm:mx-2 min-h-[1.5em]">
            <span className="relative flex items-center bg-slate-100/50 dark:bg-slate-800/40 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm overflow-hidden min-w-[180px] xs:min-w-[220px] sm:min-w-[280px] md:min-w-[340px] lg:min-w-[420px] justify-center transition-all duration-500">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentIndex}
                        initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                            scale: 0.95
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${currentGradient} whitespace-nowrap text-center`}
                    >
                        {currentText}
                    </motion.span>
                </AnimatePresence>

                {/* Dynamic accent dot */}
                <motion.div
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${currentGradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    key={`line-${currentIndex}`}
                />
            </span>
        </span>
    )
}
