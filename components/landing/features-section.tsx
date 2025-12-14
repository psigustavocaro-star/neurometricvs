"use client"

import { useTranslations } from "next-intl"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockMobileApp } from "@/components/landing/mocks/mock-mobile-app"
import { Zap, Brain, FileText, Smartphone, CheckCircle2 } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function FeaturesSection() {
    const t = useTranslations('FeaturesPage')

    const features = [
        {
            key: 'ClinicalRecords',
            icon: FileText,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            component: <MockClinicalRecords />,
            alignment: 'left'
        },
        {
            key: 'TestAutomation',
            icon: Zap,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
            component: <MockTestScoring />,
            alignment: 'right'
        },
        {
            key: 'AICopilot',
            icon: Brain,
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20',
            component: <MockAICopilot />,
            alignment: 'left'
        },
        {
            key: 'MobileAccess',
            icon: Smartphone,
            color: 'text-teal-400',
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/20',
            component: <MockMobileApp />,
            alignment: 'right'
        }
    ]

    return (
        <section id="features" className="w-full py-24 bg-white relative overflow-hidden">

            {/* Section Header */}
            <div className="container px-4 md:px-6 mb-20 relative z-10 text-center">
                <ScrollAnimation>
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs font-semibold text-teal-600 shadow-sm">
                        {t('title')} {/* Reuse title as badge or header */}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                        Todo lo que necesitas para tu consulta
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </ScrollAnimation>
            </div>

            <div className="container px-4 relative z-10 space-y-32">
                {features.map((feature, index) => (
                    <ScrollAnimation key={feature.key}>
                        <div className={`flex flex-col lg:flex-row items-center gap-16 ${feature.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <div className="flex-1 space-y-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgColor} border ${feature.borderColor} shadow-lg shadow-teal-900/5`}>
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-4xl font-bold text-slate-800 tracking-tight">
                                        {t(`${feature.key}.title`)}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed border-l-2 border-teal-100 pl-6">
                                        {t(`${feature.key}.desc`)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                                    <span className="font-semibold text-teal-700 text-sm tracking-wide bg-teal-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm">
                                        {t(`${feature.key}.benefit`)}
                                    </span>
                                </div>
                            </div>

                            {/* Visual Display */}
                            <div className="flex-1 w-full perspective-1000 flex justify-center">
                                {feature.key === 'MobileAccess' ? (
                                    <div className="transform transition-transform duration-700 hover:scale-[1.05] hover:rotate-y-6">
                                        {feature.component}
                                    </div>
                                ) : (
                                    <div className={`
                                    relative aspect-video rounded-2xl border border-slate-200 bg-slate-50/50 shadow-2xl overflow-hidden
                                    transform transition-all duration-700 hover:scale-[1.02] hover:border-teal-200 hover:shadow-teal-900/10
                                    group
                                `}>
                                        <div className="w-full h-full p-6 flex items-center justify-center relative z-10">
                                            {feature.component}
                                        </div>
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-0" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollAnimation>
                ))}
            </div>
        </section>
    )
}
