'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedWords } from '@/components/motion/animated-words'
import { Magnetic } from '@/components/motion/magnetic'

export function CTASection() {
    const t = useTranslations('CTA')

    return (
        <section className="w-full py-20 md:py-32 relative">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-slate-950 px-6 py-20 md:px-16 md:py-32 text-center isolate border border-white/10 shadow-[0_50px_120px_-55px_rgba(13,148,136,0.55)]"
                >
                    {/* Radial glow */}
                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10"
                        style={{
                            background:
                                'radial-gradient(ellipse 60% 55% at 50% 110%, oklch(0.6 0.13 195 / 0.35) 0%, transparent 65%), radial-gradient(ellipse 40% 35% at 85% -10%, oklch(0.55 0.1 220 / 0.2) 0%, transparent 60%)'
                        }}
                    />
                    {/* Hairline ring */}
                    <div aria-hidden className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10 -z-10" />

                    <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-200">
                        <span className="size-1.5 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(94,234,212,0.8)]" /> {t('eyebrow')}
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.05em] text-white text-balance max-w-4xl mx-auto leading-[0.96]">
                        <AnimatedWords text={t('title')} stagger={0.05} />
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed text-balance"
                    >
                        {t('subtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Magnetic>
                            <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-slate-950 rounded-full px-9 h-13 md:h-14 text-base font-semibold shadow-[0_8px_40px_-8px_rgba(255,255,255,0.35)] group">
                                <Link href="/onboarding">
                                    {t('button')}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </Button>
                        </Magnetic>
                        <Link
                            href="/pricing"
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
                        >
                            {t('secondary')}
                        </Link>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="mt-8 text-xs text-slate-500"
                    >
                        {t('note')}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
}
