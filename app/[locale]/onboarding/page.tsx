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
import { Check, ChevronRight, ChevronLeft, Loader2, ShieldCheck, Clock, Star, X, Zap, Sparkles, Brain, FileText, Calendar, Activity, Lock, FlaskConical, Stethoscope } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

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
                }
            } catch (err: any) {
                setError(`Error: ${err.message}`)
                setIsLoading(false)
            }
        }
    }

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 20 : -20, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 20 : -20, opacity: 0 })
    }

    return (
        <main className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans">
            {/* Left Panel: Clinical Branding */}
            <div className="hidden md:flex md:w-[40%] bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                <Image
                    src="/assets/v5/onboarding-side.png"
                    alt="Clinical Workstation"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90 z-10" />

                <div className="relative z-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <Brain className="w-6 h-6 text-teal-600" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">NEURO METRICS</span>
                    </Link>
                </div>

                <div className="relative z-20 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl font-bold leading-tight">
                            Diseñado por y para <span className="text-teal-400">especialistas</span>.
                        </h2>
                        <p className="mt-4 text-slate-300 text-lg leading-relaxed">
                            Únete a la red más avanzada de profesionales de la salud mental y neurociencias en Latinoamérica.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {[
                            { icon: <ShieldCheck className="w-5 h-5" />, text: "Cumplimiento HIPAA / GDPR" },
                            { icon: <Activity className="w-5 h-5" />, text: "Baremos validados científicamente" },
                            { icon: <FlaskConical className="w-5 h-5" />, text: "Suite clínica integral" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="flex items-center gap-3 text-slate-200"
                            >
                                <div className="p-1.5 bg-white/10 rounded-full">{item.icon}</div>
                                <span className="text-sm font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative z-20 text-slate-400 text-sm">
                    © 2026 NeuroMetrics Latam. Todos los derechos reservados.
                </div>
            </div>

            {/* Right Panel: Form Flow */}
            <div className="flex-1 flex flex-col bg-white overflow-y-auto min-h-screen">
                <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col p-6 md:p-12 lg:p-20">

                    {/* Header Mobile */}
                    <div className="md:hidden flex items-center justify-between mb-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Brain className="w-6 h-6 text-teal-600" />
                            <span className="text-lg font-bold">NEURO METRICS</span>
                        </Link>
                        <Link href="/" className="text-slate-400"><X /></Link>
                    </div>

                    {/* Desktop Close */}
                    <div className="hidden md:flex justify-end mb-8">
                        <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-medium">
                            Volver al sitio <X className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Progress Indicator */}
                    {step > 0 && step < 5 && (
                        <div className="mb-12">
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
                                <span className={step >= 1 ? "text-teal-600" : ""}>Perfil</span>
                                <span className={step >= 2 ? "text-teal-600" : ""}>Práctica</span>
                                <span className={step >= 3 ? "text-teal-600" : ""}>Plan</span>
                                <span className={step >= 4 ? "text-teal-600" : ""}>Acceso</span>
                            </div>
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-teal-600"
                                    animate={{ width: `${(step / 4) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                        <AnimatePresence mode='wait' custom={step}>
                            {step === 0 && (
                                <motion.div key="s0" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold tracking-wide uppercase">
                                            <Sparkles className="w-3 h-3" /> Bienvenido a la Élite Clínica
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                            ¿Cuál es tu enfoque <span className="text-teal-600">prioritario</span> hoy?
                                        </h1>
                                        <p className="text-lg text-slate-500">Selecciona el área que deseas optimizar primero en tu consulta.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { id: 'time', label: 'Optimización de tiempos administrativos', icon: <Clock className="text-blue-500" />, desc: 'Corrección de tests y redacción automática.' },
                                            { id: 'precision', label: 'Precisión diagnóstica avanzada', icon: <Activity className="text-emerald-500" />, desc: 'Baremos actualizados y reportes detallados.' },
                                            { id: 'modernize', label: 'Digitalización de la práctica', icon: <Zap className="text-amber-500" />, desc: 'Ficha clínica en la nube y acceso remoto.' },
                                            { id: 'patients', label: 'Calidad de atención al paciente', icon: <Brain className="text-purple-500" />, desc: 'Más tiempo para la terapia, menos para el papel.' },
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => { handleInputChange('goal', option.label); nextStep(); }}
                                                className="group flex items-start p-5 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 transition-all text-left"
                                            >
                                                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors mr-4 shadow-sm border border-slate-100">
                                                    {option.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-slate-800 group-hover:text-teal-900 text-lg leading-snug">{option.label}</div>
                                                    <div className="text-sm text-slate-500 mt-1">{option.desc}</div>
                                                </div>
                                                <ChevronRight className="ml-2 w-5 h-5 text-slate-300 group-hover:text-teal-500 self-center transition-transform group-hover:translate-x-1" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div key="s1" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8 pb-10">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold text-slate-900">Credenciales Profesionales</h2>
                                        <p className="text-slate-500 text-lg italic">"La excelencia clínica comienza con una identidad sólida."</p>
                                    </div>

                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Nombre Completo (Como aparece en tu título)</Label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="h-12 text-lg border-slate-200 focus:ring-teal-500 rounded-xl"
                                                placeholder="Ej. Dr. Alejandro Rossi"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Especialidad Principal</Label>
                                                <Select value={formData.role} onValueChange={(val) => handleInputChange('role', val)}>
                                                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Psicólogo">Psicólogo Clínico</SelectItem>
                                                        <SelectItem value="Psiquiatra">Médico Psiquiatra</SelectItem>
                                                        <SelectItem value="Neurólogo">Médico Neurólogo</SelectItem>
                                                        <SelectItem value="Neuropsicólogo">Neuropsicólogo</SelectItem>
                                                        <SelectItem value="Otro">Otro Especialista</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">N° Registro Médico/Colegiado</Label>
                                                <Input
                                                    value={formData.registryNumber}
                                                    onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                    className="h-12 rounded-xl border-slate-200"
                                                    placeholder="Ej. 24890-7"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">País de Residencia</Label>
                                            <Input
                                                value={formData.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                className="h-12 rounded-xl border-slate-200"
                                                placeholder="Ej. Chile"
                                            />
                                        </div>
                                    </div>

                                    {/* Signature Preview */}
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 border-dashed flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 shrink-0">
                                            <Stethoscope className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{formData.name || "Tu Nombre Profesional"}</div>
                                            <div className="text-xs text-slate-500 uppercase tracking-tighter">
                                                {formData.role || "Especialidad"} • {formData.registryNumber || "Registro"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-6 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="rounded-xl">Atrás</Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.name || !formData.role || !formData.registryNumber}
                                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-8 rounded-xl"
                                        >
                                            Siguiente Paso
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold text-slate-900">Dinámica de Consulta</h2>
                                        <p className="text-slate-500 text-lg">Personalizamos tu workstation según tu volumen de trabajo.</p>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <Label className="text-sm font-bold text-slate-700">¿Cuál es tu volumen mensual de pacientes?</Label>
                                            <RadioGroup value={formData.patientsPerMonth} onValueChange={(val) => handleInputChange('patientsPerMonth', val)} className="grid grid-cols-3 gap-4">
                                                {['1-10', '11-30', '30+'].map((opt) => (
                                                    <div key={opt}>
                                                        <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                        <Label htmlFor={opt} className="flex items-center justify-center h-14 rounded-xl border-2 border-slate-100 bg-white hover:border-teal-400 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:text-teal-900 cursor-pointer transition-all">
                                                            <span className="font-bold">{opt}</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-sm font-bold text-slate-700">Dificultad administrativa predominante:</Label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: 'tests', label: 'Tabulación manual de escalas y tests', icon: <FileText className="w-5 h-5" /> },
                                                    { id: 'reports', label: 'Estructuración de informes de evolución', icon: <Brain className="w-5 h-5" /> },
                                                    { id: 'history', label: 'Mantenimiento de historias clínicas', icon: <Lock className="w-5 h-5" /> }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => handleInputChange('primaryNeed', opt.label)}
                                                        className={`flex items-center p-4 rounded-xl border-2 transition-all text-left ${formData.primaryNeed === opt.label ? 'border-teal-600 bg-teal-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                                    >
                                                        <div className={`p-2 rounded-lg mr-4 ${formData.primaryNeed === opt.label ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                            {opt.icon}
                                                        </div>
                                                        <span className={`font-medium ${formData.primaryNeed === opt.label ? 'text-teal-900' : 'text-slate-700'}`}>{opt.label}</span>
                                                        {formData.primaryNeed === opt.label && <Check className="ml-auto w-5 h-5 text-teal-600" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-6 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="rounded-xl">Atrás</Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.patientsPerMonth || !formData.primaryNeed}
                                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-8 rounded-xl"
                                        >
                                            Configurar Plan
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8 pb-10">
                                    <div className="text-center space-y-2">
                                        <h2 className="text-3xl font-bold text-slate-900">Tu Suite Especializada</h2>
                                        <p className="text-slate-500">Selecciona el nivel de automatización para tu práctica.</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {[
                                            { id: 'free', name: 'Exploración', price: 0, desc: 'Solo consulta de biblioteca', period: '', icon: <Star className="text-slate-300" /> },
                                            { id: 'basic', name: 'Esencial', price: 10, desc: 'Tests + Corrección automática', period: '/mes', icon: <Zap className="text-amber-500" />, pid: PRICE_ID_BASIC },
                                            { id: 'clinical', name: 'Workstation', price: 15, desc: 'Suite Clínica Completa', period: '/mes', icon: <Brain className="text-blue-500" />, pid: PRICE_ID_CLINICAL, popular: true },
                                            { id: 'pro', name: 'Élite Anual', price: 65, desc: 'Todo incluido + Soporte VIP', period: '/año', icon: <Sparkles className="text-teal-500" />, pid: PRICE_ID_PRO, savings: '65% OFF' }
                                        ].map((p) => (
                                            <div
                                                key={p.id}
                                                onClick={() => handleInputChange('plan', p.id)}
                                                className={`group relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.plan === p.id ? 'border-teal-600 bg-teal-50/30' : 'border-slate-100 bg-white hover:border-teal-200'}`}
                                            >
                                                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[9px] font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">MÁS POPULAR</div>}
                                                {p.savings && <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-lg">{p.savings}</div>}

                                                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform mr-4">
                                                    {p.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-slate-900">{p.name}</div>
                                                    <div className="text-xs text-slate-500">{p.desc}</div>
                                                </div>
                                                <div className="text-right mr-4">
                                                    {p.price === 0 ? <div className="font-bold">Gratis</div> : <PriceDisplay amount={p.price} period={p.period} priceId={p.pid} className="font-bold text-lg" />}
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.plan === p.id ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`}>
                                                    <Check className={`w-4 h-4 text-white transition-opacity ${formData.plan === p.id ? 'opacity-100' : 'opacity-0'}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3 text-xs text-slate-500">
                                        <Clock className="w-4 h-4 text-teal-600" />
                                        Todos los planes de pago incluyen <strong>7 días de prueba gratuita</strong>.
                                    </div>

                                    <div className="flex justify-between pt-6 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="rounded-xl">Atrás</Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-teal-600/20"
                                        >
                                            Confirmar Plan
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="s4" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold text-slate-900">Acceso Seguro</h2>
                                        <p className="text-slate-500">Tus datos clínicos estarán protegidos bajo los más altos estándares.</p>
                                    </div>

                                    <div className="bg-slate-900 p-6 rounded-2xl text-white flex gap-4">
                                        <div className="p-3 bg-white/10 rounded-xl h-fit"><Lock className="w-6 h-6 text-teal-400" /></div>
                                        <div className="space-y-1">
                                            <div className="font-bold">Cifrado de Grado Médico</div>
                                            <p className="text-xs text-slate-400">Implementamos protocolos AES-256 para asegurar la total privacidad de tus pacientes.</p>
                                        </div>
                                    </div>

                                    {error && <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2"><X className="w-4 h-4" /> {error}</div>}

                                    <div className="space-y-5">
                                        <div className="grid gap-2">
                                            <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest pl-1">Email Profesional</Label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="h-12 border-slate-200 rounded-xl"
                                                placeholder="doctor@clinica.com"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest pl-1">Nueva Contraseña</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    className="h-12 border-slate-200 rounded-xl"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest pl-1">Confirmar</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                    className={`h-12 border-slate-200 rounded-xl ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-slate-400 text-center px-8 leading-relaxed">
                                        Al finalizar el registro, aceptas nuestros <Link href="/legal/terms" className="underline">Términos y Condiciones</Link> y nuestra <Link href="/legal/privacy" className="underline">Política de Privacidad de Datos Médicos</Link>.
                                    </div>

                                    <div className="flex justify-between pt-6 border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="rounded-xl">Atrás</Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-indigo-600/20 min-w-[180px]"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin" /> : (
                                                <span className="flex items-center gap-2">
                                                    Finalizar y Activar <ChevronRight className="w-4 h-4" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="s5" variants={variants} initial="enter" animate="center" className="flex-1 flex flex-col items-center justify-center space-y-8 text-center py-20">
                                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center animate-bounce">
                                        <Check className="w-10 h-10 text-teal-600" />
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">¡Bienvenido Colega!</h2>
                                        <p className="text-slate-500 text-lg max-w-sm mx-auto">
                                            Hemos enviado un enlace de activación a <strong>{formData.email}</strong>. Por favor, verifica tu bandeja de entrada.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 w-full max-w-xs">
                                        <Button asChild className="h-12 rounded-xl bg-slate-900 text-white text-lg">
                                            <Link href="/login">Ir a mi Workstation</Link>
                                        </Button>
                                        <p className="text-xs text-slate-400">¿No recibiste el correo? Revisa tu carpeta de Spam.</p>
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
