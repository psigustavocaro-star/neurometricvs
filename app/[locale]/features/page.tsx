import { useTranslations } from "next-intl"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockMobileApp } from "@/components/landing/mocks/mock-mobile-app"
import { MockMedicalCalculators } from "@/components/landing/mocks/mock-medical-calculators"
import { MockAlanaSupport } from "@/components/landing/mocks/mock-aura-support"
import { Activity, Sparkles, Bot, TabletSmartphone, Calculator, Check, ArrowRight, ChevronRight, MessageSquareQuote } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export default function FeaturesPage() {
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
            key: 'AlanaSupport',
            slug: 'alana-ia',
            icon: MessageSquareQuote,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            component: <MockAlanaSupport />,
            alignment: 'right'
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-background selection:bg-teal-500/30 overflow-x-hidden">
            <VerticalNavbar />

            <main className="flex-1 relative">
                {/* Unified Background - Same as Landing */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[40%] rounded-full bg-primary/10 blur-[100px] animate-blob" />
                    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-[20%] left-[-15%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[130px] animate-blob animation-delay-4000" />
                </div>

                {/* Hero */}
                <section className="pt-40 pb-20 text-center relative z-10 px-4">
                    <ScrollAnimation animation="fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6 border border-slate-200 dark:border-slate-800">
                            {t('badge')}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-teal-600 italic font-serif">{chunks}</span>
                            })}
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                            {t('subtitle')}
                        </p>
                    </ScrollAnimation>
                </section>

                {/* Features List */}
                <div className="container px-4 py-12 space-y-48 mb-48 relative z-10">
                    {features.map((feature, index) => (
                        <div
                            key={feature.key}
                            className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${feature.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-8">
                                <ScrollAnimation animation={feature.alignment === 'left' ? 'slide-in-left' : 'slide-in-right'}>
                                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-white/5`}>
                                        <feature.icon className={`w-7 h-7 ${feature.color}`} strokeWidth={1.5} />
                                    </div>

                                    <div className="space-y-6">
                                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                                            {t(`${feature.key}.title`)}
                                        </h2>
                                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                                            {t(`${feature.key}.desc`)}
                                        </p>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-teal-600" />
                                            </div>
                                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                                {t(`${feature.key}.benefit`)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-10 flex flex-col sm:flex-row gap-4">
                                        <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold group shadow-xl shadow-teal-500/20">
                                            <Link href={`/features/${feature.slug}`}>
                                                {t('cta_secondary')} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </div>
                                </ScrollAnimation>
                            </div>

                            {/* Visual Display - Reusing the Landing Page Style */}
                            <div className="flex-1 w-full max-w-xl">
                                <ScrollAnimation animation="fade-up">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-4 md:p-8 shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl" />
                                            {feature.component}
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final CTA - Same as Landing CTA vibe */}
                <section className="container px-4 py-24 mb-32 relative overflow-hidden">
                    <ScrollAnimation animation="fade-up">
                        <div className="bg-slate-900 dark:bg-teal-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                                {t.rich('join_today', {
                                    span: (chunks) => <span className="italic font-serif">{chunks}</span>
                                })}
                            </h2>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light">
                                {t('cta_description')}
                            </p>
                            <Button asChild size="lg" className="h-16 px-12 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xl shadow-2xl transition-all hover:scale-105">
                                <Link href="/onboarding">
                                    {t('cta_main')}
                                </Link>
                            </Button>
                        </div>
                    </ScrollAnimation>
                </section>
            </main>

            <Footer />
            {/* Float back hook for continuity */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in animation-delay-500">
                <Link href="#hero" className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg text-slate-400 hover:text-teal-600 transition-colors">
                    <ArrowRight className="-rotate-90 w-5 h-5" />
                </Link>
            </div>
        </div>
    )
}
