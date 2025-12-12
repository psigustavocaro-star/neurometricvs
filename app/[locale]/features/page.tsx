
import { useTranslations } from "next-intl"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockPatientPortal } from "@/components/landing/mocks/mock-patient-portal"
import { Zap, Brain, FileText, Users, CheckCircle2 } from "lucide-react"

export default function FeaturesPage() {
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
            key: 'PatientPortal',
            icon: Users,
            color: 'text-teal-400',
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/20',
            component: <MockPatientPortal />,
            alignment: 'right'
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500/30">
            <VerticalNavbar />
            <main className="flex-1 relative overflow-hidden">
                {/* Background Gradients (Futuristic Light) */}
                <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/80 via-white to-white">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-100/30 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
                </div>

                {/* Hero */}
                <section className="pt-40 pb-20 text-center relative z-10 px-4">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white border border-teal-100 text-xs font-semibold text-teal-600 shadow-sm">
                        Feature Tour
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 mb-6 tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </section>

                {/* Features List */}
                <div className="container px-4 py-12 space-y-32 mb-32 relative z-10">
                    {features.map((feature, index) => (
                        <div key={feature.key} className={`flex flex-col lg:flex-row items-center gap-16 ${feature.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <div className="flex-1 space-y-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgColor} border ${feature.borderColor} shadow-lg shadow-teal-900/5`}>
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-4xl font-bold text-slate-800 tracking-tight">
                                        {t(`${feature.key}.title`)}
                                    </h2>
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
                            <div className="flex-1 w-full perspective-1000">
                                <div className={`
                                    relative aspect-video rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden
                                    transform transition-all duration-700 hover:scale-[1.02] hover:border-teal-200 hover:shadow-teal-900/10
                                    group
                                `}>
                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-50 pointer-events-none z-20" />

                                    {/* Component */}
                                    <div className="w-full h-full p-6 flex items-center justify-center relative z-10">
                                        {feature.component}
                                    </div>

                                    {/* Grid Background inside card */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-0" />
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
