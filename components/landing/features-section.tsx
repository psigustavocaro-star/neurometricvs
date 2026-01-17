"use client"

import { useTranslations } from "next-intl"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockMobileApp } from "@/components/landing/mocks/mock-mobile-app"
import { MockMedicalCalculators } from "@/components/landing/mocks/mock-medical-calculators"
import { MockAuraSupport } from "@/components/landing/mocks/mock-aura-support"
import { Activity, Sparkles, Bot, TabletSmartphone, Calculator, Check, ArrowRight, MessageSquareQuote } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Button } from "@/components/ui/button"
import { FeatureDetailModal } from "@/components/landing/feature-detail-modal"

export function FeaturesSection() {
    const t = useTranslations('FeaturesPage')

    const features = [
        {
            key: 'ClinicalRecords',
            slug: 'clinical-records',
            icon: Activity,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            component: <MockClinicalRecords />,
            alignment: 'left'
        },
        {
            key: 'TestAutomation',
            slug: 'test-automation',
            icon: Sparkles,
            color: 'text-teal-600',
            bg: 'bg-teal-50',
            component: <MockTestScoring />,
            alignment: 'right'
        },
        {
            key: 'MedicalCalculators',
            slug: 'medical-calculators',
            icon: Calculator,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            component: <MockMedicalCalculators />,
            alignment: 'left'
        },
        {
            key: 'AICopilot',
            slug: 'ai-copilot',
            icon: Bot,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            component: <MockAICopilot />,
            alignment: 'right'
        },
        {
            key: 'MobileAccess',
            slug: 'mobile-access',
            icon: TabletSmartphone,
            color: 'text-teal-600',
            bg: 'bg-teal-50',
            component: <MockMobileApp />,
            alignment: 'left'
        },
        {
            key: 'AuraSupport',
            slug: 'aura-support',
            icon: MessageSquareQuote,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            component: <MockAuraSupport />,
            alignment: 'right'
        }
    ]

    return (
        <section id="features" className="w-full py-24 relative overflow-hidden">
            {/* Clinical Grid Background - Hidden in dark mode */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-0" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                    <ScrollAnimation animation="fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest mb-6 border border-border">
                            {t('hero_badge')}
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t.raw('hero_title') }} />
                        <p className="text-lg text-muted-foreground leading-relaxed font-light text-balance">
                            {t('hero_description')}
                        </p>
                    </ScrollAnimation>
                </div>

                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <div
                            key={feature.key}
                            id={feature.key}
                            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${feature.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1 space-y-8">
                                <ScrollAnimation animation={feature.alignment === 'left' ? 'slide-in-left' : 'slide-in-right'}>
                                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} dark:bg-slate-800 flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700`}>
                                        <feature.icon className={`w-7 h-7 ${feature.color}`} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                                        {t(`${feature.key}.title`)}
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        {t(`${feature.key}.desc`)}
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 p-0.5 rounded-full bg-primary/20 text-primary italic font-bold">
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="font-semibold text-foreground">{t(`${feature.key}.benefit`)}</span>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <FeatureDetailModal
                                            featureKey={feature.key}
                                            icon={feature.icon}
                                            iconColor={feature.color}
                                            iconBg={feature.bg}
                                        >
                                            <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-700 px-6 h-12 shadow-sm">
                                                {t('explore_module')} <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </FeatureDetailModal>
                                    </div>
                                </ScrollAnimation>
                            </div>

                            <ScrollAnimation
                                animation="fade-up"
                                className="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800 p-4 md:p-8 flex items-center justify-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />
                                <div className="relative z-10 w-full transform group-hover:scale-[1.02] transition-transform duration-500">
                                    {feature.component}
                                </div>
                            </ScrollAnimation>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
