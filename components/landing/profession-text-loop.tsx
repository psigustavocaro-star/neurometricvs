'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
const professions = [
    'Psicólogos',
    'Psiquiatras',
    'Neurólogos',
    'Médicos',
    'Terapeutas',
    'Fonoaudiólogos',
    'Nutricionistas'
]

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

    // Refined clinical colors for text only
    const clinicalColors: Record<number, string> = {
        0: 'text-teal-600 dark:text-teal-400',
        1: 'text-indigo-600 dark:text-indigo-400',
        2: 'text-blue-600 dark:text-blue-400',
        3: 'text-teal-500 dark:text-teal-300',
        4: 'text-cyan-600 dark:text-cyan-400',
        5: 'text-emerald-600 dark:text-emerald-400',
        6: 'text-violet-600 dark:text-violet-400',
        7: 'text-slate-700 dark:text-slate-300'
    }

    const currentAccent = clinicalColors[currentIndex % 8]

    return (
        <span className="relative inline-flex items-center align-middle mx-1 sm:mx-2 h-[1.1em] min-w-[120px] sm:min-w-[150px] lg:min-w-[300px] xl:min-w-[380px]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentText}
                    initial={{
                        opacity: 0,
                        filter: 'blur(12px)',
                        scale: 0.9,
                        y: 2
                    }}
                    animate={{
                        opacity: 1,
                        filter: 'blur(0px)',
                        scale: 1,
                        y: 0
                    }}
                    exit={{
                        opacity: 0,
                        filter: 'blur(15px)',
                        scale: 1.1,
                        transition: { duration: 0.8, ease: "easeIn" }
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.2, 0.8, 0.2, 1]
                    }}
                    className={`absolute left-0 font-extrabold tracking-tight ${currentAccent} whitespace-nowrap`}
                >
                    {currentText}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}
