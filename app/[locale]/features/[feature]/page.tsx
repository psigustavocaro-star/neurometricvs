import { use } from "react"
import { useTranslations } from "next-intl"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
    UserCheck, Sparkles, Zap, Heart, Shield,
    ArrowLeft, ArrowRight, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockMedicalCalculators } from "@/components/landing/mocks/mock-medical-calculators"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockMobileApp } from "@/components/landing/mocks/mock-mobile-app"

const FEATURE_DATA: Record<string, any> = {
    'clinical-records': {
        icon: UserCheck,
        color: "text-blue-500",
        bg: "bg-blue-50",
        component: <MockClinicalRecords />,
    },
    'test-automation': {
        icon: Sparkles,
        color: "text-teal-500",
        bg: "bg-teal-50",
        component: <MockTestScoring />,
    },
    'medical-calculators': {
        icon: Zap,
        color: "text-rose-500",
        bg: "bg-rose-50",
        component: <MockMedicalCalculators />,
    },
    'ai-copilot': {
        icon: Heart,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        component: <MockAICopilot />,
    },
    'mobile-access': {
        icon: Shield,
        color: "text-teal-500",
        bg: "bg-teal-50",
        component: <MockMobileApp />,
    }
}

export default function FeatureDetailPage({ params }: { params: Promise<{ feature: string, locale: string }> }) {
    const { feature } = use(params)
    const t = useTranslations('FeaturesDetail')
    const data = FEATURE_DATA[feature]

    if (!data) notFound()

    const benefits = [
        t(`${feature}.benefits.0`),
        t(`${feature}.benefits.1`),
        t(`${feature}.benefits.2`)
    ]

    return (
        <div className="min-h-screen bg-background relative selection:bg-teal-500/30">
            {/* Unified Background Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] opacity-50" />
            </div>

            {/* Sticky Navigation */}
            <nav className="fixed top-0 left-0 w-full h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold tracking-tight">{t('common.back_to_home')}</span>
                    </Link>

                    <Button asChild className="bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 text-white rounded-full px-8 font-bold shadow-lg shadow-teal-500/20">
                        <Link href="/onboarding">
                            {t('common.start_free_trial')}
                        </Link>
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-32 pb-24 md:pt-44 md:pb-40 container max-w-7xl px-6">

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
                    <div className="space-y-8">
                        <ScrollAnimation animation="fade-up">
                            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl ${data.bg} border border-slate-100 dark:border-white/5 shadow-sm mb-6`}>
                                <data.icon className={`w-5 h-5 ${data.color}`} />
                                <span className={`text-[11px] font-black uppercase tracking-widest ${data.color}`}>{t(`${feature}.title`)}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-8">
                                {t(`${feature}.emotionalTitle`)}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed text-balance">
                                {t(`${feature}.emotionalDesc`)}
                            </p>
                        </ScrollAnimation>

                        <ScrollAnimation animation="fade-up" delay={200}>
                            <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-lg shadow-xl shadow-teal-600/20 hover:scale-105 transition-all">
                                    <Link href="/onboarding">
                                        {t('common.start_transformation')} <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                            </div>
                        </ScrollAnimation>
                    </div>

                    <ScrollAnimation animation="scale-up" className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-indigo-500/20 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4 md:p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl scale-[1.02]">
                            {data.component}
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Narrative Section */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 py-24 border-t border-slate-100 dark:border-white/5">
                    <ScrollAnimation animation="slide-in-left" className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('common.challenge_title')}</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            {t(`${feature}.problem`)}
                        </p>
                    </ScrollAnimation>
                    <ScrollAnimation animation="slide-in-right" className="space-y-6">
                        <h2 className="text-3xl font-bold text-teal-600">{t('common.solution_title')}</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            {t(`${feature}.solution`)}
                        </p>
                    </ScrollAnimation>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-8 py-24">
                    {benefits.map((benefit: string, idx: number) => (
                        <ScrollAnimation key={idx} animation="fade-up" delay={idx * 100} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Check className="w-6 h-6 text-teal-600" />
                            </div>
                            <p className="text-slate-900 dark:text-white font-bold leading-snug">
                                {benefit}
                            </p>
                        </ScrollAnimation>
                    ))}
                </div>

                {/* Final CTA Banner */}
                <ScrollAnimation animation="fade-up" className="mt-24 bg-slate-900 dark:bg-teal-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t('common.cta_title')}</h2>
                        <p className="text-xl text-white/70 font-light">
                            {t('common.cta_desc')}
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="h-16 px-12 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-black text-xl shadow-2xl transition-all hover:scale-105">
                                <Link href="/onboarding">
                                    {t('common.cta_button')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </ScrollAnimation>

            </main>
        </div>
    )
}
