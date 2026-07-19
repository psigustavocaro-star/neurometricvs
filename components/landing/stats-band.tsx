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
        <section className="w-full border-y border-border/60 bg-background/60 backdrop-blur-sm relative">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/40">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.key}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center justify-center py-10 md:py-14 px-4 text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
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
