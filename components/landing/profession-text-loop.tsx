'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const fallbackProfessions = [
    'Psicólogos',
    'Psiquiatras',
    'Neurólogos',
    'Médicos',
    'Terapeutas Ocupacionales',
    'Fonoaudiólogos',
    'Psicopedagogos'
]

export function ProfessionTextLoop() {
    const t = useTranslations('Hero')
    const professionsList = (t.raw('professions') as string[]) || fallbackProfessions
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % professionsList.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [professionsList.length])

    const currentText = professionsList[currentIndex]

    return (
        <span className="inline-flex relative h-[1.2em] items-center overflow-hidden align-middle leading-none">
            {/* Ghost elements to reserve the maximum width - prevents layout shift */}
            <span className="flex flex-col h-0 overflow-hidden invisible pointer-events-none" aria-hidden="true">
                {professionsList.map((p) => (
                    <span key={p} className="whitespace-nowrap font-bold tracking-tight">
                        {p}
                    </span>
                ))}
            </span>

            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={currentIndex}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="absolute inset-0 flex items-center font-bold tracking-tight text-teal-600 dark:text-teal-400 whitespace-nowrap"
                >
                    {currentText}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}
