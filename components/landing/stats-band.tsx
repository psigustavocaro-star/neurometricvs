'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CountUp } from '@/components/motion/count-up'

const stats = [
    { key: 'tests', value: 63, suffix: '' },
    { key: 'calculators', value: 17, suffix: '' },
    { key: 'specialties', value: 7, suffix: '' },
    { key: 'languages', value: 2, suffix: '' },
]

export function StatsBand() {
    const t = useTranslations('Stats')

    return (
        <section className="w-full relative px-4 md:px-6 -mt-1">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-[1.75rem] border border-slate-200/70 dark:border-white/10 bg-white/65 dark:bg-white/[0.035] backdrop-blur-2xl shadow-[0_20px_70px_-35px_rgba(15,23,42,0.25)] divide-x divide-slate-200/60 dark:divide-white/10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.key}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex flex-col items-center justify-center py-9 md:py-12 px-4 text-center relative"
                        >
                            <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-transparent via-teal-400 to-transparent transition-transform duration-500" />
                            <div className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white tabular-nums">
                                <CountUp value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="mt-2 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                {t(stat.key)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
