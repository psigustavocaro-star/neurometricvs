'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FileText, Sparkles, Calculator } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Tilt } from '@/components/motion/tilt'
import { MockClinicalRecords } from '@/components/landing/mocks/mock-clinical-records'
import { MockTestScoring } from '@/components/landing/mocks/mock-test-scoring'
import { MockMedicalCalculators } from '@/components/landing/mocks/mock-medical-calculators'

const ROTATION_MS = 9000

export function ProductShowcase() {
    const t = useTranslations('ProductShowcase')
    const [active, setActive] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const reduce = useReducedMotion()

    const tabs = [
        { key: 'records', icon: FileText, component: <MockClinicalRecords /> },
        { key: 'tests', icon: Sparkles, component: <MockTestScoring /> },
        { key: 'calculators', icon: Calculator, component: <MockMedicalCalculators /> },
    ]

    useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % tabs.length)
        }, ROTATION_MS)
        return () => clearInterval(timer)
    }, [isAutoPlaying, tabs.length])

    return (
        <div className="w-full flex flex-col items-center gap-6" style={{ perspective: 1400 }}>
            {/* Tab Switcher with sliding pill */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-sm" role="tablist">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.key}
                        role="tab"
                        aria-selected={active === i}
                        onClick={() => { setActive(i); setIsAutoPlaying(false) }}
                        className={cn(
                            "relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors",
                            active === i
                                ? "text-white dark:text-slate-900"
                                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        {active === i && (
                            <motion.span
                                layoutId="showcase-tab-pill"
                                className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                            />
                        )}
                        <tab.icon className="w-3.5 h-3.5 relative z-10" />
                        <span className="hidden sm:inline relative z-10">{t(`tabs.${tab.key}`)}</span>
                    </button>
                ))}
            </div>

            {/* Product Frame: perspective entrance + pointer tilt */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 48, rotateX: 16, scale: 0.94, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-xl will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <Tilt max={4}>
                    {/* Soft ground shadow */}
                    <div aria-hidden className="absolute -inset-x-6 -bottom-8 h-16 bg-slate-900/10 dark:bg-black/40 blur-2xl rounded-full -z-10" />
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 14, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -14, scale: 0.99 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full flex justify-center"
                        >
                            {tabs[active].component}
                        </motion.div>
                    </AnimatePresence>
                </Tilt>
            </motion.div>

            {/* Progress dots tied to auto-rotation */}
            <div className="flex items-center gap-3">
                {tabs.map((_, i) => (
                    <button
                        key={i}
                        aria-label={t(`tabs.${tabs[i].key}`)}
                        onClick={() => { setActive(i); setIsAutoPlaying(false) }}
                        className="relative h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 transition-all"
                        style={{ width: active === i ? 28 : 10 }}
                    >
                        {active === i && isAutoPlaying && !reduce && (
                            <motion.span
                                key={`progress-${active}`}
                                className="absolute inset-y-0 left-0 bg-teal-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: ROTATION_MS / 1000, ease: 'linear' }}
                            />
                        )}
                        {active === i && (!isAutoPlaying || reduce) && (
                            <span className="absolute inset-0 bg-teal-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium -mt-2">
                {t('caption')}
            </p>
        </div>
    )
}
