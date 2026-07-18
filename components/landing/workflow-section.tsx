'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ClipboardList, Cpu, FileCheck2, Check, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

interface Step { title: string; desc: string }

/**
 * Apple-style sticky scrollytelling: the visual card pins to the viewport
 * while the reader scrolls through the three real stages of the clinical
 * workflow. Each stage swaps in an animated vignette built from actual
 * product content (PHQ-9 items, scoring, report).
 */
export function WorkflowSection() {
    const t = useTranslations('Workflow')
    const containerRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(0)
    const reduce = useReducedMotion()

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.6', 'end 0.75'] })
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        const next = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2
        if (next !== active) setActive(next)
    })

    const steps = (t.raw('steps') as Step[]) || []
    const icons = [ClipboardList, Cpu, FileCheck2]
    const vignettes = [<VignetteEvaluate key="v0" />, <VignetteScore key="v1" />, <VignetteReport key="v2" />]

    return (
        <section id="workflow" className="w-full py-20 md:py-28 relative">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.div
                        initial={reduce ? undefined : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-teal-700 dark:text-teal-300 tracking-wide mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('badge')}
                    </motion.div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white text-balance">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{t('subtitle')}</p>
                </div>

                <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
                    {/* Pinned visual (desktop) */}
                    <div className="hidden lg:block sticky top-28 h-[480px]">
                        <div className="relative w-full h-full rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden">
                            {/* Stage progress strip */}
                            <div className="absolute top-0 inset-x-0 h-1 flex z-10">
                                {steps.map((_, i) => (
                                    <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-800">
                                        <motion.div
                                            className="h-full bg-teal-500"
                                            animate={{ width: i < active ? '100%' : i === active ? '100%' : '0%' }}
                                            transition={{ duration: 0.5, ease: EASE }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={active}
                                    initial={reduce ? undefined : { opacity: 0, y: 24, scale: 0.985 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={reduce ? undefined : { opacity: 0, y: -24, scale: 0.985 }}
                                    transition={{ duration: 0.45, ease: EASE }}
                                    className="absolute inset-0 p-8 pt-10"
                                >
                                    {vignettes[active]}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Steps rail */}
                    <div className="flex flex-col gap-10 lg:gap-0">
                        {steps.map((step, i) => {
                            const Icon = icons[i]
                            const isActive = active === i
                            return (
                                <div key={i} className="lg:min-h-[420px] flex flex-col justify-center">
                                    <motion.div
                                        initial={reduce ? undefined : { opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.7, ease: EASE }}
                                        className={cn(
                                            "relative pl-14 transition-opacity duration-500",
                                            !isActive && "lg:opacity-40"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-500",
                                            isActive
                                                ? "bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400"
                                                : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
                                        )}>
                                            <Icon className="w-5 h-5" strokeWidth={1.8} />
                                        </div>
                                        <div className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest mb-2">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                            {step.desc}
                                        </p>
                                        {/* Mobile inline vignette */}
                                        <div className="lg:hidden mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 h-[340px] relative overflow-hidden">
                                            {vignettes[i]}
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ---------- Stage 1: Evaluate — PHQ-9 items answering themselves ---------- */
function VignetteEvaluate() {
    const t = useTranslations('Workflow.vignettes.evaluate')
    const items = (t.raw('items') as string[]) || []
    return (
        <div className="h-full flex flex-col">
            <VignetteHeader label="PHQ-9" sub={t('label')} />
            <div className="flex items-center gap-3 mt-5 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                    <div className="h-2.5 w-28 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800 rounded-full mt-1.5" />
                </div>
            </div>
            <div className="space-y-3 flex-1">
                {items.map((q, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.18, duration: 0.5, ease: EASE }}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                    >
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{q}</span>
                        <div className="flex gap-1.5 shrink-0">
                            {[0, 1, 2, 3].map((opt) => (
                                <motion.span
                                    key={opt}
                                    initial={false}
                                    animate={{
                                        scale: opt === (i % 3) + 1 ? [1, 1.35, 1] : 1,
                                        backgroundColor: opt === (i % 3) + 1 ? 'oklch(0.65 0.14 195)' : 'oklch(0.9 0.01 200 / 0.6)'
                                    }}
                                    transition={{ delay: 0.7 + i * 0.25, duration: 0.35 }}
                                    className="w-4 h-4 rounded-full"
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

/* ---------- Stage 2: Score — automatic scoring animating in ---------- */
function VignetteScore() {
    const t = useTranslations('Workflow.vignettes.score')
    const scales = (t.raw('scales') as { name: string; pct: number }[]) || []
    return (
        <div className="h-full flex flex-col">
            <VignetteHeader label={t('label')} sub="PHQ-9 · GAD-7 · BIS-11" />
            <div className="flex items-end gap-3 mt-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 16 }}
                    className="text-6xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums"
                >
                    14
                </motion.div>
                <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                    className="mb-2 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest"
                >
                    {t('severity')}
                </motion.span>
            </div>
            <div className="space-y-5 flex-1">
                {scales.map((s, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                            <span>{s.name}</span>
                            <span className="tabular-nums">{s.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: `${s.pct}%` }}
                                transition={{ delay: 0.4 + i * 0.15, duration: 0.9, ease: EASE }}
                                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ---------- Stage 3: Report — clinical report assembling itself ---------- */
function VignetteReport() {
    const t = useTranslations('Workflow.vignettes.report')
    const widths = ['100%', '92%', '78%', '96%', '64%', '88%', '45%']
    return (
        <div className="h-full flex flex-col">
            <VignetteHeader label={t('label')} sub={t('sub')} />
            <div className="flex-1 mt-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-3 w-32 bg-slate-300 dark:bg-slate-600 rounded-full" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest"
                    >
                        <Check className="w-3 h-3" strokeWidth={3} /> {t('ready')}
                    </motion.div>
                </div>
                <div className="space-y-2.5">
                    {widths.map((w, i) => (
                        <motion.div
                            key={i}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.14, duration: 0.5, ease: EASE }}
                            style={{ width: w, originX: 0 }}
                            className={cn("h-2 rounded-full", i === 3 ? "bg-teal-200 dark:bg-teal-500/30" : "bg-slate-200 dark:bg-slate-700")}
                        />
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
                    className="mt-5 p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center gap-2"
                >
                    <Sparkles className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
                </motion.div>
            </div>
        </div>
    )
}

function VignetteHeader({ label, sub }: { label: string; sub: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold tracking-wide">
                    {label}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{sub}</span>
            </div>
            <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            </div>
        </div>
    )
}
