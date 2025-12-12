
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
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30">
            <VerticalNavbar />
            <main className="flex-1 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-900/10 to-transparent" />
                    <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl mix-blend-screen" />
                    <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl mix-blend-screen" />
                </div>

                {/* Hero */}
                <section className="pt-40 pb-20 text-center relative z-10 px-4">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-teal-400 shadow-lg shadow-teal-900/20">
                        Feature Tour
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </section>

                {/* Features List */}
                <div className="container px-4 py-12 space-y-32 mb-32 relative z-10">
                    {features.map((feature, index) => (
                        <div key={feature.key} className={`flex flex-col lg:flex-row items-center gap-16 ${feature.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <div className="flex-1 space-y-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgColor} border ${feature.borderColor} shadow-lg shadow-black/20`}>
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">
                                        {t(`${feature.key}.title`)}
                                    </h2>
                                    <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-6">
                                        {t(`${feature.key}.desc`)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                                    <span className="font-semibold text-teal-400 text-sm tracking-wide bg-teal-950/30 px-3 py-1 rounded-full border border-teal-500/20 shadow-glow">
                                        {t(`${feature.key}.benefit`)}
                                    </span>
                                </div>
                            </div>

                            {/* Visual Display */}
                            <div className="flex-1 w-full perspective-1000">
                                <div className={`
                                    relative aspect-video rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden
                                    transform transition-all duration-700 hover:scale-[1.02] hover:border-slate-700 hover:shadow-teal-900/10
                                    group
                                `}>
                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 pointer-events-none z-20" />

                                    {/* Component */}
                                    <div className="w-full h-full p-6 flex items-center justify-center relative z-10">
                                        {feature.component}
                                    </div>

                                    {/* Grid Background inside card */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] z-0" />
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
