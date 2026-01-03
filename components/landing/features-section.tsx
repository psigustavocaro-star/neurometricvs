"use client"

import { useTranslations } from "next-intl"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockMobileApp } from "@/components/landing/mocks/mock-mobile-app"
import { MockMedicalCalculators } from "@/components/landing/mocks/mock-medical-calculators"
import { Activity, Sparkles, Bot, TabletSmartphone, Calculator, Check, ArrowRight } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export function FeaturesSection() {
    const t = useTranslations('FeaturesPage')

    const features = [
        {
            key: 'ClinicalRecords',
            icon: Activity,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            component: <MockClinicalRecords />,
            alignment: 'left'
        },
        {
            key: 'TestAutomation',
            icon: Sparkles,
            color: 'text-teal-600',
            bg: 'bg-teal-50',
            component: <MockTestScoring />,
            alignment: 'right'
        },
        {
            key: 'MedicalCalculators',
            icon: Calculator,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            component: <MockMedicalCalculators />,
            alignment: 'left'
        },
        {
            key: 'AICopilot',
            icon: Bot,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            component: <MockAICopilot />,
            alignment: 'right'
        }
    ]

    return (
        <section id="features" className="w-full py-24 bg-transparent relative overflow-hidden">
            {/* Clinical Grid Background - Reduced opacity for fluid BG to shine */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 dark:opacity-10" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                    <ScrollAnimation animation="fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest mb-6 border border-border">
                            Propuesta de Valor Clínica
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight mb-6 text-balance">
                            Herramientas de <span className="text-primary italic">precisión médica</span> para tu consultorio.
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed font-light text-balance">
                            Diseñamos cada módulo pensando en el rigor que exige la práctica de la psicología, psiquiatría y neurología moderna.
                        </p>
                    </ScrollAnimation>
                </div>

                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <div
                            key={feature.key}
                            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${feature.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1 space-y-8">
                                <ScrollAnimation animation={feature.alignment === 'left' ? 'fade-right' : 'fade-left'}>
                                    <div className={`w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm border border-primary/20`}>
                                        <feature.icon className={`w-7 h-7 text-primary`} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-6">
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
                                        <Button asChild variant="outline" className="rounded-xl border-border text-foreground hover:text-primary hover:border-primary/50 px-6 h-12 shadow-sm font-medium">
                                            <Link href="/onboarding">
                                                Explorar módulo <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </ScrollAnimation>
                            </div>

                            <ScrollAnimation
                                animation="fade-up"
                                className="flex-1 w-full bg-slate-50 rounded-[2.5rem] border border-slate-200/50 p-4 md:p-8 flex items-center justify-center relative overflow-hidden group"
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
