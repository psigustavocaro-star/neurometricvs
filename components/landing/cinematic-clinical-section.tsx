'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { BrainCircuit, ClipboardCheck, FileChartColumn, Sparkles } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

export function CinematicClinicalSection() {
    const t = useTranslations('CinematicClinical')
    const reduce = useReducedMotion()
    const capabilities = [
        { key: 'records', icon: BrainCircuit },
        { key: 'tests', icon: ClipboardCheck },
        { key: 'reports', icon: FileChartColumn },
        { key: 'ai', icon: Sparkles },
    ]

    return (
        <section className="w-full px-4 md:px-6 py-20 md:py-32 relative overflow-hidden">
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 50, scale: 0.975 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: EASE }}
                className="relative max-w-[1440px] mx-auto min-h-[680px] md:min-h-[780px] rounded-[2.25rem] md:rounded-[3.5rem] overflow-hidden isolate bg-slate-950 shadow-[0_60px_140px_-60px_rgba(2,6,23,0.8)]"
            >
                <motion.div
                    aria-hidden
                    initial={reduce ? false : { scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: EASE }}
                    className="absolute inset-0 -z-20"
                >
                    <Image
                        src="/neurometrics-clinical-intelligence.png"
                        alt="Especialista clínica trabajando con información neuropsicológica en Neurometrics"
                        fill
                        sizes="(max-width: 768px) 100vw, 1440px"
                        className="object-cover object-[65%_center] md:object-center"
                    />
                </motion.div>
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/72 to-slate-950/15 md:via-slate-950/35" />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />

                <div className="relative min-h-[680px] md:min-h-[780px] flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20">
                    <div className="max-w-xl pt-6 md:pt-10">
                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-200 backdrop-blur-xl"
                        >
                            <span className="size-1.5 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(94,234,212,0.85)]" />
                            {t('eyebrow')}
                        </motion.div>
                        <motion.h2
                            initial={reduce ? false : { opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                            className="mt-7 text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[0.96] tracking-[-0.055em] text-white text-balance"
                        >
                            {t('title')}
                        </motion.h2>
                        <motion.p
                            initial={reduce ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                            className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-slate-300"
                        >
                            {t('description')}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mt-14">
                        {capabilities.map(({ key, icon: Icon }, index) => (
                            <motion.div
                                key={key}
                                initial={reduce ? false : { opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.65, delay: 0.18 + index * 0.08, ease: EASE }}
                                whileHover={reduce ? undefined : { y: -5 }}
                                className="group rounded-2xl border border-white/10 bg-slate-950/55 p-4 md:p-5 backdrop-blur-2xl transition-colors hover:bg-slate-950/75"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="grid size-9 place-items-center rounded-xl bg-teal-300/10 text-teal-200 ring-1 ring-inset ring-teal-200/15">
                                        <Icon className="size-4" strokeWidth={1.8} />
                                    </span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500">0{index + 1}</span>
                                </div>
                                <h3 className="mt-4 text-sm md:text-base font-semibold text-white">{t(`capabilities.${key}.title`)}</h3>
                                <p className="mt-1 text-xs md:text-sm leading-relaxed text-slate-400">{t(`capabilities.${key}.description`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
