"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, Sparkles, Shield, Heart, Zap, UserCheck } from "lucide-react"
import { MockClinicalRecords } from "@/components/landing/mocks/mock-clinical-records"
import { MockTestScoring } from "@/components/landing/mocks/mock-test-scoring"
import { MockMedicalCalculators } from "@/components/landing/mocks/mock-medical-calculators"
import { MockAICopilot } from "@/components/landing/mocks/mock-ai-copilot"
import { MockMobileApp } from "@/components/landing/mocks/mock-mobile-app"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { notFound } from "next/navigation"

const FEATURE_DATA: Record<string, any> = {
    'clinical-records': {
        icon: UserCheck,
        color: "text-blue-500",
        bg: "bg-blue-50",
        title: "Ficha Clínica Digital",
        emotionalTitle: "¿Recuerda por qué eligió esta vocación?",
        emotionalDesc: "No fue para llenar formularios interminables ni para luchar con expedientes de papel. Usted cura, escucha y transforma vidas. Neurometrics le devuelve ese tiempo sagrado.",
        problem: "La burocracia consume el 40% del tiempo de una sesión privada, desgastando al profesional y distanciándolo de lo que realmente importa: el paciente.",
        solution: "Nuestra Ficha Clínica Inteligente fluye con usted. Registre evoluciones en segundos, acceda a antecedentes con un clic y deje que la tecnología cuide los detalles administrativos mientras usted cuida de la salud mental.",
        benefits: [
            "Adiós al desorden: Todo centralizado en un solo lugar seguro.",
            "Recuperación de la atención: Menos pantalla, más contacto visual.",
            "Seguridad Ética: Encriptación de grado médico para su tranquilidad."
        ],
        component: <MockClinicalRecords />,
    },
    'test-automation': {
        icon: Sparkles,
        color: "text-teal-500",
        bg: "bg-teal-50",
        title: "Corrección de Tests",
        emotionalTitle: "La precisión que otorga paz mental",
        emotionalDesc: "La duda es el peso más grande en un diagnóstico. Cuando el bienestar de una persona depende de un puntaje, no hay espacio para el error humano.",
        problem: "Corregir tests manualmente es tedioso y propenso a errores que pueden alterar un diagnóstico clínico vital.",
        solution: "Automatización total. Desde el PHQ-9 hasta escalas cognitivas complejas. Obtenga resultados instantáneos con validez científica garantizada, permitiéndole entregar informes impecables en tiempo récord.",
        benefits: [
            "Cero errores: Algoritmos validados que garantizan exactitud total.",
            "Informes instantáneos: De la respuesta al informe en un segundo.",
            "Confianza Clínica: El respaldo técnico que su profesionalismo merece."
        ],
        component: <MockTestScoring />,
    },
    'medical-calculators': {
        icon: Zap,
        color: "text-rose-500",
        bg: "bg-rose-50",
        title: "Calculadoras Médicas",
        emotionalTitle: "Confianza absoluta en el rigor médico",
        emotionalDesc: "En la medicina, los detalles no son pequeños; son fundamentales. Cada dosis, cada riesgo y cada índice es una pieza clave en el rompecabezas de la salud.",
        problem: "Cerrar la brecha entre la observación y la precisión matemática puede ser estresante bajo presión clínica.",
        solution: "Una suite de herramientas de cálculo de alta precisión integradas en su flujo de trabajo. IMC, dosificación pediátrica, riesgos quirúrgicos y más, siempre a su disposición para eliminar cualquier incertidumbre.",
        benefits: [
            "Seguridad en la toma de decisiones: Datos precisos, decisiones seguras.",
            "Agilidad Profesional: Obtenga resultados críticos sin salir de la consulta.",
            "Rigor Científico: Herramientas basadas en fórmulas clínicas universales."
        ],
        component: <MockMedicalCalculators />,
    },
    'ai-copilot': {
        icon: Heart,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        title: "Copiloto Clínico IA",
        emotionalTitle: "Nunca más enfrentará la complejidad en soledad",
        emotionalDesc: "La soledad del consultorio puede ser abrumadora. Hay casos que desafían nuestra experiencia y nos obligan a buscar un segundo punto de vista.",
        problem: "El aislamiento profesional y la carga cognitiva de analizar miles de variables clínicas simultáneamente.",
        solution: "Un asistente de decisión clínica que no descansa. Nuestra IA analiza patrones, sugiere protocolos basados en evidencia y le ayuda a estructurar sus razonamientos, potenciando sus habilidades, no reemplazándolas.",
        benefits: [
            "Aliado Estratégico: Un segundo par de ojos expertos analizando cada caso.",
            "Evidencia al Instante: Sugerencias basadas en miles de protocolos clínicos.",
            "Claridad Mental: Reduzca la fatiga informativa con resúmenes inteligentes."
        ],
        component: <MockAICopilot />,
    },
    'mobile-access': {
        icon: Shield,
        color: "text-teal-500",
        bg: "bg-teal-50",
        title: "Neurometrics Móvil",
        emotionalTitle: "Su compromiso no tiene paredes",
        emotionalDesc: "La salud mental sucede en todas partes, no solo tras un escritorio. La verdadera libertad profesional es poder cuidar sin estar atado a una oficina.",
        problem: "La rigidez de los sistemas tradicionales que solo funcionan en una computadora de escritorio.",
        solution: "Toda la potencia de Neurometrics en su bolsillo. Aplique tests en visitas domiciliarias, revise expedientes en el trayecto y mantenga el control total de su práctica con una interfaz diseñada para ser fluida, móvil y segura.",
        benefits: [
            "Libertad de Movimiento: Su clínica viaja con usted, siempre.",
            "Respuesta Inmediata: Evalúe y decida en el momento clave, esté donde esté.",
            "Flexibilidad Total: Optimice su tiempo entre citas de manera inteligente."
        ],
        component: <MockMobileApp />,
    }
}

export default function FeatureDetailPage({ params }: { params: Promise<{ feature: string, locale: string }> }) {
    const { feature, locale } = use(params)
    const data = FEATURE_DATA[feature]

    if (!data) notFound()

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
                        <span className="text-sm font-bold tracking-tight">Volver al Inicio</span>
                    </Link>

                    <Button asChild className="bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 text-white rounded-full px-8 font-bold shadow-lg shadow-teal-500/20">
                        <Link href="/onboarding">
                            Prueba Neurometrics Gratis
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
                                <span className={`text-[11px] font-black uppercase tracking-widest ${data.color}`}>{data.title}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-8">
                                {data.emotionalTitle}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed text-balance">
                                {data.emotionalDesc}
                            </p>
                        </ScrollAnimation>

                        <ScrollAnimation animation="fade-up" delay={200}>
                            <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-lg shadow-xl shadow-teal-600/20 hover:scale-105 transition-all">
                                    <Link href="/onboarding">
                                        Empieza tu transformación hoy <ArrowRight className="ml-2 w-5 h-5" />
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
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">El desafío de la práctica moderna</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            {data.problem}
                        </p>
                    </ScrollAnimation>
                    <ScrollAnimation animation="slide-in-right" className="space-y-6">
                        <h2 className="text-3xl font-bold text-teal-600">La solución diseñada por colegas</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            {data.solution}
                        </p>
                    </ScrollAnimation>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-8 py-24">
                    {data.benefits.map((benefit: string, idx: number) => (
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
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Anímate a probar Neurometrics y mejora tu práctica</h2>
                        <p className="text-xl text-white/70 font-light">
                            Únase a cientos de especialistas que ya han recuperado su tiempo y precisión. La excelencia clínica está a un clic de distancia.
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="h-16 px-12 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-black text-xl shadow-2xl transition-all hover:scale-105">
                                <Link href="/onboarding">
                                    ¡Comenzar ahora!
                                </Link>
                            </Button>
                        </div>
                    </div>
                </ScrollAnimation>

            </main>
        </div>
    )
}
