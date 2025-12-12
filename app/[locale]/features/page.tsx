
import { useTranslations } from "next-intl"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, Zap, Brain, FileText, Users, Clock } from "lucide-react"

export default function FeaturesPage() {
    const t = useTranslations('FeaturesPage')
    const tCommon = useTranslations('General')

    const features = [
        {
            key: 'ClinicalRecords',
            icon: FileText,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            direction: 'ltr'
        },
        {
            key: 'TestAutomation',
            icon: Zap,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-50',
            direction: 'rtl'
        },
        {
            key: 'AICopilot',
            icon: Brain,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
            direction: 'ltr'
        },
        {
            key: 'PatientPortal',
            icon: Users,
            color: 'text-teal-500',
            bgColor: 'bg-teal-50',
            direction: 'rtl'
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <VerticalNavbar />
            <main className="flex-1">
                {/* Hero */}
                <section className="pt-32 pb-20 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                    <div className="container px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </div>
                </section>

                {/* Features List */}
                <div className="container px-4 py-12 space-y-24 mb-24">
                    {features.map((feature, index) => (
                        <div key={feature.key} className={`flex flex-col md:flex-row items-center gap-12 ${feature.direction === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
                            {/* Text Content */}
                            <div className="flex-1 space-y-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bgColor}`}>
                                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900">
                                    {t(`${feature.key}.title`)}
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {t(`${feature.key}.desc`)}
                                </p>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm w-fit">
                                    <Clock className="h-5 w-5 text-teal-600" />
                                    <span className="font-medium text-teal-800 text-sm">
                                        {t(`${feature.key}.benefit`)}
                                    </span>
                                </div>
                            </div>

                            {/* Visual Placeholder (Mockup) */}
                            <div className="flex-1 w-full">
                                <div className="relative aspect-video bg-gradient-to-tr from-slate-100 to-slate-200 rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <feature.icon className={`h-24 w-24 text-slate-300 group-hover:scale-110 transition-transform duration-500`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
