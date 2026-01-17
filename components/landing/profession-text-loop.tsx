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
        }, 3000)

        return () => clearInterval(timer)
    }, [professionsList.length])

    const currentText = professionsList[currentIndex]
    const currentGradient = colorMap[currentIndex % Object.keys(colorMap).length]

    return (
        <span className="inline-flex relative h-[1.3em] min-w-[280px] xs:min-w-[320px] sm:min-w-[420px] md:min-w-[600px] lg:min-w-[650px] items-center overflow-visible align-middle px-2">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={currentIndex}
                    initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`absolute inset-0 flex items-center font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r ${currentGradient} filter drop-shadow-[0_4px_12px_rgba(20,184,166,0.15)] whitespace-nowrap px-2`}
                >
                    {currentText}
                </motion.span>
            </AnimatePresence>

            {/* Premium Underline Indicator */}
            <motion.div
                className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r ${currentGradient} opacity-20`}
                initial={false}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: "circOut" }}
                key={`line-${currentIndex}`}
            />
        </span>
    )
}
