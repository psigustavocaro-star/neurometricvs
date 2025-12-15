"use client"

import { useTranslations } from "next-intl"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockMobileApp } from "@/components/landing/mocks/mock-mobile-app"
import { Zap, Brain, FileText, Smartphone, CheckCircle2, Activity, Sparkles, Bot, TabletSmartphone } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function FeaturesSection() {
    const t = useTranslations('FeaturesPage')

    const features = [
        {
            key: 'ClinicalRecords',
            icon: Activity,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            component: <MockClinicalRecords />,
            alignment: 'left'
        },
        {
            key: 'TestAutomation',
            icon: Sparkles,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
            component: <MockTestScoring />,
            alignment: 'right'
        },
        {
            key: 'AICopilot',
            icon: Bot,
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20',
            component: <MockAICopilot />,
            alignment: 'left'
        },
        {
            key: 'MobileAccess',
            icon: TabletSmartphone,
            color: 'text-teal-400',
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/20',
            component: <MockMobileApp />,
            alignment: 'right'
        }
    ]

    return (
        <section id="features" className="w-full py-16 md:py-32 bg-transparent dark:bg-background/50 relative overflow-hidden transition-colors duration-300">
            {/* Top Gradient Mask for Smooth Entry */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white dark:to-background/50 z-20 pointer-events-none"></div>

            {/* Background Atmosphere - Futuristic Glows (Dark Mode Only) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-950/30 rounded-full blur-[120px] pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-teal-900/10 rounded-full blur-[100px] pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />
            {/* Global grid handles light mode pattern, this is for dark mode vibe if needed, but safe to keep or remove. Keeping for dark mode texture if configured for it. */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 dark:opacity-10 transition-opacity duration-500" />

            {/* Section Header */}
            <div className="container px-4 md:px-6 mb-12 md:mb-24 relative z-10 text-center">
                <ScrollAnimation>
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs font-bold dark:font-medium uppercase tracking-[0.2em] text-teal-600 dark:text-cyan-400 shadow-sm dark:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] backdrop-blur-sm">
                        {t('title')} {/* Reuse title as badge or header */}
                    </div>
                    <h2 className="text-3xl md:text-7xl font-bold dark:font-light text-slate-900 dark:text-white tracking-tight dark:tracking-tighter mb-4 md:mb-8 leading-tight">
                        Todo lo que necesitas <br />
                        <span className="font-extrabold dark:font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:via-cyan-400 dark:to-indigo-400">para tu consulta</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium dark:font-light dark:tracking-wide">
                        {t('subtitle')}
                    </p>
                </ScrollAnimation>
            </div>

            <div className="container px-4 relative z-10 space-y-20 md:space-y-40">
                {features.map((feature, index) => (
                    <ScrollAnimation key={feature.key} viewport={{ once: false, margin: "-100px" }}>
                        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${feature.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Text Content - Futuristic Typography */}
                            <div className="flex-1 space-y-6 md:space-y-10">
                                <div className="relative">
                                    {/* Icon Container with "Nano" aesthetic: Glass + Gradient + Glow */}
                                    <div className="relative group/icon inline-flex">
                                        <div className="absolute -inset-4 bg-teal-500/20 blur-xl rounded-full opacity-50 dark:opacity-20 group-hover/icon:opacity-100 transition-opacity duration-500" />

                                        <div className="w-16 h-16 rounded-2xl relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-white/50 dark:border-slate-700 shadow-xl shadow-teal-900/5 transition-transform duration-300 group-hover/icon:scale-105 group-hover/icon:rotate-3">
                                            {/* Inner Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity" />

                                            <feature.icon
                                                className={`h-7 w-7 ${feature.color} relative z-10 transition-colors duration-300`}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <h3 className="text-2xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                                        {t(`${feature.key}.title`)}
                                    </h3>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                                        {t(`${feature.key}.desc`)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 group cursor-default">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-slate-800/50 border border-teal-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/20 transition-all duration-300">
                                        <CheckCircle2 className="h-5 w-5 text-teal-600 dark:text-teal-400" strokeWidth={2} />
                                    </div>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm tracking-wide uppercase">
                                        {t(`${feature.key}.benefit`)}
                                    </span>
                                </div>
                            </div>

                            {/* Visual Display - Embedded Integration */}
                            <div className="flex-1 w-full perspective-1000 flex justify-center items-center py-6 md:py-10 h-[350px] md:h-[500px] bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border border-slate-100 dark:border-white/5 backdrop-blur-sm">
                                {feature.component}
                            </div>
                        </div>
                    </ScrollAnimation>
                ))}
            </div>
        </section>
    )
}

