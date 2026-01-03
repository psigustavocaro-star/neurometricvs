'use client'

import { useState, useEffect, Suspense } from 'react'
import { PriceDisplay } from "@/components/pricing/price-display"
import { PADDLE_ENV, PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from '@/lib/config'
import { getPaddle } from '@/lib/paddle-client'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronRight, ChevronLeft, Loader2, ShieldCheck, Clock, Star, X, Zap, Sparkles, Brain, FileText, Calendar, Activity, Lock, FlaskConical, Stethoscope, UserCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { FluidBackground } from '@/components/ui/fluid-background'

function OnboardingContent() {
    const searchParams = useSearchParams()
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({
        goal: '',
        name: '',
        role: '',
        formation: '',
        registryNumber: '',
        country: '',
        patientsPerMonth: '',
        primaryNeed: '',
        email: '',
        password: '',
        confirmPassword: '',
        plan: 'pro'
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [paddle, setPaddle] = useState<any>(null)

    useEffect(() => {
        const planParam = searchParams.get('plan')
        if (planParam && ['free', 'basic', 'clinical', 'pro'].includes(planParam)) {
            setFormData(prev => ({ ...prev, plan: planParam }))
        }
    }, [searchParams])

    useEffect(() => {
        getPaddle().then(instance => {
            if (instance) setPaddle(instance);
        });
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step !== 4) return
        if (!formData.email || !formData.password) {
            setError('Por favor completa todos los campos de la cuenta.')
            return
        }

        setIsLoading(true)
        setError(null)
        const supabase = createClient()

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.name,
                    role: formData.role,
                    formation: formData.formation,
                    registry_number: formData.registryNumber,
                    country: formData.country,
                    patients_per_month: formData.patientsPerMonth,
                    primary_need: formData.primaryNeed,
                    main_goal: formData.goal,
                    plan: formData.plan
                }
            }
        })

        if (signUpError) {
            setError(signUpError.message)
            setIsLoading(false)
            return
        }

        if (formData.plan === 'free') {
            setIsLoading(false)
            setStep(5)
            return
        }

        if (paddle) {
            try {
                let priceId = ''
                if (formData.plan === 'pro') priceId = PRICE_ID_PRO?.trim()
                else if (formData.plan === 'clinical') priceId = PRICE_ID_CLINICAL?.trim()
                else if (formData.plan === 'basic') priceId = PRICE_ID_BASIC?.trim()

                if (priceId) {
                    paddle.Checkout.open({
                        items: [{ priceId, quantity: 1 }],
                        customData: { userId: signUpData.user?.id || '' },
                        customer: { email: formData.email },
                        settings: {
                            displayMode: 'overlay',
                            successUrl: `${window.location.origin}/payment/success`,
                            theme: 'light',
                            allowDiscount: true
                        }
                    })
                    setIsLoading(false)
                } else {
                    setError("ID de precio no configurado para este plan.")
                    setIsLoading(false)
                }
            } catch (err: any) {
                setError(`Error: ${err.message}`)
                setIsLoading(false)
            }
        } else {
            setError("El sistema de pagos no está disponible en este momento. Por favor, asegúrate de que las variables de entorno de Paddle estén configuradas o elige el plan gratuito.")
            setIsLoading(false)
        }
    }

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 20 : -20, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 20 : -20, opacity: 0 })
    }

    return (
        <main className="min-h-screen relative flex flex-col md:flex-row overflow-hidden font-sans">
            <FluidBackground />

            {/* Left Panel: Clinical Branding */}
            <div className="hidden md:flex md:w-[40%] bg-slate-950 relative overflow-hidden flex-col justify-between p-12 lg:p-16 text-white border-r border-white/5 shrink-0">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/v5/onboarding-side.png"
                        alt="Clinical Workstation"
                        fill
                        className="object-cover opacity-20 scale-105"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.15),transparent)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="w-12 h-1.5 bg-teal-500 rounded-full mb-8" />
                    <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
                        No es solo software, es el <span className="text-teal-400 italic font-serif">respaldo</span> que tu profesionalismo merece.
                    </h2>
                    <p className="mt-6 text-slate-400 text-lg leading-relaxed font-light font-sans max-w-sm">
                        Bienvenido a la red más avanzada de especialistas que están transformando la salud mental en Latinoamérica.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {[
                        { icon: <ShieldCheck className="w-5 h-5" />, text: "Cumplimiento HIPAA / GDPR", desc: "Seguridad de grado médico" },
                        { icon: <Activity className="w-5 h-5" />, text: "Baremos Validados", desc: "Rigurosidad científica certificada" },
                        { icon: <Sparkles className="w-5 h-5" />, text: "Inteligencia Clínica", desc: "Optimización basada en evidencia" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + (i * 0.1) }}
                            className="flex items-start gap-4"
                        >
                            <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-teal-400 shadow-xl">{item.icon}</div>
                            <div>
                                <div className="text-sm font-bold text-white">{item.text}</div>
                                <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">{item.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-20 flex items-center justify-between text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <span>Neurometrics Latam</span>
                    <span>v5.2.0 • 2026</span>
                </div>
            </div>

            {/* Right Panel: Form Flow */}
            <div className="flex-1 flex flex-col bg-slate-50/30 overflow-y-auto min-h-screen relative z-30">
                <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col p-6 md:p-12 lg:p-20 relative">
                    {/* Header Mobile */}
                    <div className="md:hidden flex items-center justify-between mb-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-slate-900 p-2 rounded-xl">
                                <Brain className="w-5 h-5 text-teal-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black tracking-tight leading-none text-slate-900">NEURO</span>
                                <span className="text-[10px] font-bold tracking-[0.2em] leading-none text-teal-600">METRICS</span>
                            </div>
                        </Link>
                        <Link href="/" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <X className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="hidden md:flex justify-end absolute top-12 right-12">
                        <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-widest">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0">Cancelar</span>
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors shadow-sm">
                                <X className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>

                    {/* Progress Indicator */}
                    {step > 0 && step < 5 && (
                        <div className="mb-16 pt-4">
                            <div className="flex justify-between text-[9px] font-black text-slate-300 mb-4 uppercase tracking-[0.2em] px-1">
                                <span className={step >= 1 ? "text-teal-600" : ""}>Identidad</span>
                                <span className={step >= 2 ? "text-teal-600" : ""}>Práctica</span>
                                <span className={step >= 3 ? "text-teal-600" : ""}>Workstation</span>
                                <span className={step >= 4 ? "text-teal-600" : ""}>Seguridad</span>
                            </div>
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden flex gap-1 bg-transparent">
                                {[1, 2, 3, 4].map((s) => (
                                    <div key={s} className="flex-1 h-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-teal-600 shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                                            initial={false}
                                            animate={{ width: step >= s ? '100%' : '0%' }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="relative">
                        <AnimatePresence mode='wait' custom={step}>
                            {step === 0 && (
                                <motion.div key="s0" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-12">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-teal-500/20">
                                            <Sparkles className="w-3 h-3" /> Foco Clínico Prioritario
                                        </div>
                                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                                            ¿Cuál de estos desafíos desea <span className="text-teal-600 italic font-serif">resolver</span> primero?
                                        </h1>
                                        <p className="text-xl text-slate-500 font-light max-w-xl leading-relaxed">Personalizaremos su workstation para que su flujo de trabajo sea impecable desde el primer minuto.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5">
                                        {[
                                            { id: 'time', label: 'Precisión y Rapidez en Informes', icon: <FileText className="text-blue-600" />, desc: 'Automatización de corrección de tests y redacción inteligente.' },
                                            { id: 'modernize', label: 'Estandarización de Ficha Clínica', icon: <Activity className="text-teal-600" />, desc: 'Mantenimiento de expedientes digitales con rigor médico global.' },
                                            { id: 'patients', label: 'Experiencia Digital del Paciente', icon: <UserCheck className="text-indigo-600" />, desc: 'Portal para pacientes y aplicación de tests remotos sin fricción.' },
                                            { id: 'ai', label: 'Soporte de Decisión Avanzada', icon: <ShieldCheck className="text-emerald-600" />, desc: 'Copiloto clínico para el análisis de casos complejos.' },
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => { handleInputChange('goal', option.label); nextStep(); }}
                                                className="group relative flex items-center p-6 rounded-[2rem] border-2 border-slate-100 bg-white hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-300 text-left overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 translate-x-16 -translate-y-16" />
                                                <div className="relative z-10 w-14 h-14 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors mr-6 flex items-center justify-center shadow-sm border border-slate-100">
                                                    {option.icon}
                                                </div>
                                                <div className="relative z-10 flex-1">
                                                    <div className="font-bold text-slate-900 text-xl tracking-tight mb-1">{option.label}</div>
                                                    <div className="text-sm text-slate-500 font-light leading-snug">{option.desc}</div>
                                                </div>
                                                <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-teal-600 group-hover:text-white transition-all transform group-hover:scale-110">
                                                    <ChevronRight className="w-5 h-5" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div key="s1" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-10 pb-10">
                                    <div className="space-y-3">
                                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Registro de Identidad Profesional</h2>
                                        <p className="text-slate-500 text-lg font-light leading-relaxed italic">"Su identidad es el primer peldaño de la confianza clínica."</p>
                                    </div>

                                    <div className="grid gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 pl-1">Nombre y Apellidos del Especialista</Label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                                                    <UserCheck className="w-5 h-5" />
                                                </div>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="h-14 pl-12 text-lg border-2 border-slate-100 focus:border-teal-500 focus:ring-0 rounded-[1.2rem] shadow-sm transition-all"
                                                    placeholder="Ej. Dr. Alejandro Rossi"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 pl-1">Especialidad Certificada</Label>
                                                <Select value={formData.role} onValueChange={(val) => handleInputChange('role', val)}>
                                                    <SelectTrigger className="h-14 rounded-[1.2rem] border-2 border-slate-100 focus:ring-0 px-4">
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl border-slate-200">
                                                        <SelectItem value="Psicólogo">Psicólogo Clínico</SelectItem>
                                                        <SelectItem value="Psiquiatra">Psiquiatra</SelectItem>
                                                        <SelectItem value="Neurólogo">Neurólogo</SelectItem>
                                                        <SelectItem value="Neuropsicólogo">Neuropsicólogo</SelectItem>
                                                        <SelectItem value="Otro">Otro Especialista</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 pl-1">N° Registro Médico/Colegiado</Label>
                                                <div className="relative group">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                                                        <Stethoscope className="w-5 h-5" />
                                                    </div>
                                                    <Input
                                                        value={formData.registryNumber}
                                                        onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                        className="h-14 pl-12 rounded-[1.2rem] border-2 border-slate-100 focus:border-teal-500 focus:ring-0"
                                                        placeholder="Ej. 24890-7"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 pl-1">País de Residencia</Label>
                                            <Input
                                                value={formData.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                className="h-14 rounded-[1.2rem] border-2 border-slate-100 focus:border-teal-500 focus:ring-0 px-4"
                                                placeholder="Ej. Chile"
                                            />
                                        </div>
                                    </div>

                                    {/* Clinical Seal Preview */}
                                    <div className="relative p-8 rounded-[2.5rem] bg-slate-900 text-white overflow-hidden shadow-2xl flex items-center gap-6 group">
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                                        <div className="relative z-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="w-8 h-8 text-teal-400" />
                                        </div>
                                        <div className="relative z-10 space-y-1">
                                            <div className="text-xl font-bold tracking-tight">{formData.name || "Especialista Registrado"}</div>
                                            <div className="flex items-center gap-2">
                                                <div className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-md text-[9px] font-black uppercase tracking-widest border border-teal-500/30">
                                                    {formData.role || "Especialidad"}
                                                </div>
                                                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{formData.registryNumber || "Registro Pendiente"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors">
                                            <ChevronLeft className="mr-2 w-5 h-5" /> Regresar
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.name || !formData.role || !formData.registryNumber}
                                            className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02] disabled:opacity-50"
                                        >
                                            Continuar a Práctica <ChevronRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-12 pb-10">
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Análisis de Operativa Clínica</h2>
                                        <p className="text-xl text-slate-500 font-light leading-relaxed">Optimizamos su entorno según la carga y demanda de su consulta especializada.</p>
                                    </div>

                                    <div className="space-y-12">
                                        <div className="space-y-6">
                                            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 pl-1">Volumen de Pacientes Atendidos por Mes</Label>
                                            <RadioGroup value={formData.patientsPerMonth} onValueChange={(val) => handleInputChange('patientsPerMonth', val)} className="grid grid-cols-3 gap-5">
                                                {['1-10', '11-30', '30+'].map((opt) => (
                                                    <div key={opt}>
                                                        <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                        <Label htmlFor={opt} className="flex flex-col items-center justify-center p-6 rounded-[1.5rem] border-2 border-slate-100 bg-white hover:border-teal-400 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:shadow-xl peer-data-[state=checked]:shadow-teal-500/10 cursor-pointer transition-all duration-300">
                                                            <span className="text-2xl font-black text-slate-900 group-hover:scale-110 transition-transform">{opt}</span>
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Pacientes</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-6">
                                            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 pl-1">Principal Fricción Administrativa</Label>
                                            <div className="grid gap-4">
                                                {[
                                                    { id: 'tests', label: 'Estandarización de Pruebas y Baremos', icon: <FlaskConical className="w-5 h-5" /> },
                                                    { id: 'reports', label: 'Generación de Informes y Epicrisis', icon: <FileText className="w-5 h-5" /> },
                                                    { id: 'history', label: 'Seguridad y Trazabilidad de Historias', icon: <ShieldCheck className="w-5 h-5" /> }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => handleInputChange('primaryNeed', opt.label)}
                                                        className={`flex items-center p-6 rounded-2xl border-2 transition-all duration-300 text-left ${formData.primaryNeed === opt.label ? 'border-teal-600 bg-teal-50 shadow-lg shadow-teal-500/5' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                                    >
                                                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl mr-6 transition-colors ${formData.primaryNeed === opt.label ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                                            {opt.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={`text-lg font-bold tracking-tight block ${formData.primaryNeed === opt.label ? 'text-teal-900' : 'text-slate-800'}`}>{opt.label}</span>
                                                        </div>
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.primaryNeed === opt.label ? 'bg-teal-600 border-teal-600 scale-110' : 'border-slate-200'}`}>
                                                            {formData.primaryNeed === opt.label && <Check className="w-4 h-4 text-white" />}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors">
                                            <ChevronLeft className="mr-2 w-5 h-5" /> Regresar
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.patientsPerMonth || !formData.primaryNeed}
                                            className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02] disabled:opacity-50"
                                        >
                                            Configurar Workstation <ChevronRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-12 pb-10">
                                    <div className="text-center space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] font-black tracking-widest uppercase border border-teal-100 mx-auto">
                                            Inversión en su Futuro Clínico
                                        </div>
                                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Seleccione su Configuración de Workstation</h2>
                                        <p className="text-xl text-slate-500 font-light max-w-xl mx-auto leading-relaxed">Elija el nivel de potencia y profundidad que su práctica demanda hoy.</p>
                                    </div>

                                    <div className="grid gap-5">
                                        {[
                                            { id: 'free', name: 'Exploración Limitada', price: 0, desc: 'Solo acceso a biblioteca de tests', period: '', icon: <Star className="text-slate-300" /> },
                                            { id: 'basic', name: 'Plan Esencial', price: 10, desc: 'Tests + Corrección Automatizada', period: '/mes', icon: <Zap className="text-amber-500" />, pid: PRICE_ID_BASIC },
                                            { id: 'clinical', name: 'Clinical Workstation', price: 15, desc: 'Suite Clínica Completa + IA Copilot', period: '/mes', icon: <Brain className="text-blue-500" />, pid: PRICE_ID_CLINICAL, popular: true },
                                            { id: 'pro', name: 'Élite Especializada', price: 65, desc: 'Todo ilimitado + Soporte VIP Prioritario', period: '/año', icon: <Sparkles className="text-teal-500" />, pid: PRICE_ID_PRO, savings: '65% OFF' }
                                        ].map((p) => (
                                            <div
                                                key={p.id}
                                                onClick={() => handleInputChange('plan', p.id)}
                                                className={`group relative flex items-center p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 ${formData.plan === p.id ? 'border-teal-600 bg-white shadow-2xl shadow-teal-500/10 scale-[1.02]' : 'border-slate-100 bg-white hover:border-teal-200'}`}
                                            >
                                                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[9px] font-black px-4 py-1 rounded-full border-2 border-white shadow-xl z-10">RECOMENDACIÓN CLÍNICA</div>}
                                                {p.savings && <div className="absolute top-4 right-16 bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-xl uppercase tracking-tighter">Ahorro Máximo</div>}

                                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mr-6 border border-slate-100 group-hover:bg-white transition-colors">
                                                    {p.icon}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="font-black text-slate-900 text-xl tracking-tight leading-none uppercase">{p.name}</div>
                                                    <div className="text-sm text-slate-500 font-light italic">{p.desc}</div>
                                                </div>
                                                <div className="text-right mr-6">
                                                    {p.price === 0 ? <div className="font-black text-xl">Sin Costo</div> : <PriceDisplay amount={p.price} period={p.period} priceId={p.pid} className="font-black text-2xl text-slate-900" />}
                                                </div>
                                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${formData.plan === p.id ? 'border-teal-600 bg-teal-600 shadow-lg shadow-teal-500/50' : 'border-slate-200 group-hover:border-teal-200'}`}>
                                                    <Check className={`w-5 h-5 text-white transition-opacity ${formData.plan === p.id ? 'opacity-100' : 'opacity-0'}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-slate-900 p-6 rounded-[2rem] flex items-center gap-6 text-white shadow-xl">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                            <Clock className="w-6 h-6 text-teal-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-light">Comience hoy mismo: todos los planes comerciales incluyen un periodo de <strong>7 días de prueba sin compromiso</strong>.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors">
                                            <ChevronLeft className="mr-2 w-5 h-5" /> Regresar
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-14 px-12 rounded-2xl shadow-xl shadow-teal-600/20 transition-all hover:scale-[1.02]"
                                        >
                                            Confirmar Suscripción <ChevronRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="s4" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-12 pb-10">
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Protocolo de Acceso y Seguridad</h2>
                                        <p className="text-xl text-slate-500 font-light leading-relaxed">Su información y la de sus pacientes estarán protegidas bajo estándares globales de ciberseguridad médica.</p>
                                    </div>

                                    <div className="relative p-8 rounded-[2rem] bg-slate-950 text-white overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                                        <div className="relative z-10 flex gap-6">
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl h-fit shadow-inner">
                                                <Lock className="w-8 h-8 text-teal-400" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-xl font-bold tracking-tight">Cifrado Militar AES-256</div>
                                                <p className="text-sm text-slate-400 font-light leading-relaxed">
                                                    Implementamos seguridad punto a punto para garantizar que solo usted tenga acceso a la información clínica sensible. Cumplimos con normativas HIPAA y GDPR.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-sm flex items-center gap-3 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
                                                <X className="w-4 h-4" />
                                            </div>
                                            {error}
                                        </motion.div>
                                    )}

                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] pl-1">Email Profesional (Acceso Principal)</Label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <Input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="h-14 pl-12 border-2 border-slate-100 focus:border-teal-500 focus:ring-0 rounded-[1.2rem] text-lg font-bold"
                                                    placeholder="doctor@clinica.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] pl-1">Contraseña de Protección</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    className="h-14 border-2 border-slate-100 focus:border-teal-500 focus:ring-0 rounded-[1.2rem] px-4"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] pl-1">Validar Contraseña</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                    className={`h-14 border-2 border-slate-100 focus:border-teal-500 focus:ring-0 rounded-[1.2rem] px-4 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-rose-500' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-slate-400 text-center px-10 leading-relaxed font-bold uppercase tracking-widest opacity-60">
                                        Al activar su cuenta, confirma que ha revisado y acepta nuestros <Link href="/legal/terms" className="underline hover:text-teal-600">Términos de Servicio</Link> y el <Link href="/legal/privacy" className="underline hover:text-teal-600">Tratamiento de Datos Médicos</Link>.
                                    </div>

                                    <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors">
                                            <ChevronLeft className="mr-2 w-5 h-5" /> Regresar
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
                                            className="bg-slate-900 hover:bg-slate-800 text-white font-black h-14 px-12 rounded-[1.5rem] shadow-2xl shadow-slate-900/20 transition-all hover:scale-[1.05] min-w-[220px] active:scale-95"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                                <span className="flex items-center gap-3 text-lg">
                                                    Activar Workstation <ChevronRight className="w-5 h-5 text-teal-400" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="s5" variants={variants} initial="enter" animate="center" className="flex-1 flex flex-col items-center justify-center space-y-6 text-center py-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
                                        <div className="relative w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center border-2 border-primary/20">
                                            <Check className="w-8 h-8 text-primary" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-3xl font-black text-foreground tracking-tight">¡Bienvenido!</h2>
                                        <p className="text-muted-foreground text-sm max-w-xs mx-auto font-light">
                                            Enviamos un enlace de activación a:<br /><span className="text-foreground font-black tracking-tight">{formData.email}</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 w-full max-w-xs">
                                        <Button asChild className="h-10 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
                                            <Link href="/login">Ir a mi Workstation</Link>
                                        </Button>
                                        <p className="text-[9px] text-muted-foreground/60 uppercase font-black tracking-[0.2em]">Verifica tu bandeja de Spam</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="w-8 h-8 animate-spin text-teal-600" /></div>}>
            <OnboardingContent />
        </Suspense>
    )
}
