'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hourglass } from 'lucide-react'

export default function Template({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Un breve timer que simula el "procesamiento rápido automático" - sensación instantánea
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 400)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="global-loader"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50/60 dark:bg-slate-950/60"
                    >
                        {/* Sand/Hourglass flip animation */}
                        <motion.div
                            animate={{ rotate: [0, 180, 180, 360] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.5, 1] }}
                        >
                            <Hourglass className="w-12 h-12 text-teal-500 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: isLoading ? 0 : 0.1 }}
                className={isLoading ? "pointer-events-none" : ""}
            >
                {children}
            </motion.div>
        </>
    )
}
