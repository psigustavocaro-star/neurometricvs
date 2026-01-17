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
        <div className="relative inline-block w-full text-left">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{
                        opacity: 0,
                        x: -20,
                        filter: 'blur(10px)'
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        filter: 'blur(0px)'
                    }}
                    exit={{
                        opacity: 0,
                        x: 20,
                        filter: 'blur(10px)'
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`inline-block font-black tracking-tightest bg-clip-text text-transparent bg-gradient-to-r ${currentGradient} py-2`}
                >
                    {currentText}
                    <motion.div
                        layoutId="active-underline"
                        className={`absolute -bottom-1 left-0 h-1.5 w-1/3 rounded-full bg-gradient-to-r ${currentGradient} opacity-40 shadow-[0_0_20px_rgba(20,184,166,0.3)]`}
                        initial={{ width: 0 }}
                        animate={{ width: '40%' }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
