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
        <div className="w-full flex flex-col items-center gap-5" style={{ perspective: 1600 }}>
            {/* Tab Switcher with sliding pill */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/75 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5" role="tablist">
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
                className="relative w-full max-w-5xl will-change-transform rounded-[1.75rem] md:rounded-[2.25rem] border border-white/10 bg-slate-950 p-2.5 md:p-4 shadow-[0_45px_110px_-40px_rgba(2,6,23,0.75)]"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <Tilt max={4}>
                    <div aria-hidden className="absolute inset-0 rounded-[1.75rem] md:rounded-[2.25rem] bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.12),transparent_42%)] pointer-events-none" />
                    <div className="relative flex items-center justify-between px-3 md:px-4 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        <span>Neurometrics / Clinical OS</span>
                        <span className="flex items-center gap-2"><i className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" /> Online</span>
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 14, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -14, scale: 0.99 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full flex justify-center rounded-[1.25rem] md:rounded-[1.6rem] overflow-hidden ring-1 ring-white/10 bg-white dark:bg-slate-900"
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
