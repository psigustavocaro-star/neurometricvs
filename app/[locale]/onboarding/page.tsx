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
            <div className="hidden md:flex md:w-[45%] bg-slate-900 dark:bg-slate-950 relative overflow-hidden flex-col justify-between p-12 text-white border-r border-white/5">
                <div className="absolute inset-0 z-0 scale-110 opacity-40 dark:opacity-25 grayscale-[0.5] mix-blend-soft-light">
                    <Image
                        src="/assets/v5/onboarding-side.png"
                        alt="Clinical Workstation"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/60 to-slate-900/90 dark:from-background/20 dark:via-background/60 dark:to-background z-10" />

                <div className="relative z-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-all shadow-lg shadow-primary/30 border border-primary/50">
                            <Brain className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white dark:text-foreground">NEURO METRICS</span>
                    </Link>
                </div>

                <div className="relative z-20 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] text-white">
                            Diseñado por y para <span className="text-primary italic">especialistas</span>.
                        </h2>
                        <p className="mt-6 text-slate-300 dark:text-muted-foreground text-lg font-light leading-relaxed max-w-md">
                            Únete a la red más avanzada de profesionales de la salud mental y neurociencias en Latinoamérica.
                        </p>
                    </motion.div>

                    <div className="space-y-5">
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
                                className="flex items-center gap-4 text-slate-100 dark:text-muted-foreground"
                            >
                                <div className="p-2 bg-white/10 dark:bg-primary/10 text-primary rounded-xl border border-white/10 dark:border-primary/20 backdrop-blur-sm">{item.icon}</div>
                                <span className="text-sm font-medium tracking-wide">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative z-20 text-slate-400 dark:text-muted-foreground/60 text-xs font-medium tracking-widest">
                    © 2026 NEUROMETRICS LATAM
                </div>
            </div>

            {/* Right Panel: Form Flow */}
            <div className="flex-1 flex flex-col bg-background/50 dark:bg-background/80 backdrop-blur-md overflow-hidden min-h-screen relative z-30">
                <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16">

                    {/* Header Mobile */}
                    <div className="md:hidden flex items-center justify-between mb-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Brain className="w-5 h-5 text-primary" />
                            <span className="text-base font-bold text-foreground">NEURO METRICS</span>
                        </Link>
                        <Link href="/" className="p-1.5 rounded-full hover:bg-accent text-muted-foreground"><X className="w-4 h-4" /></Link>
                    </div>

                    {/* Top Bar Layout */}
                    <div className="flex items-center justify-between mb-8">
                        {/* Progress Indicator - Integrated */}
                        <div className="flex-1 mr-8">
                            {step > 0 && step < 5 && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-extrabold text-muted-foreground uppercase tracking-[0.2em] opacity-60">
                                        <span className={step >= 1 ? "text-primary opacity-100" : ""}>Perfil</span>
                                        <span className={step >= 2 ? "text-primary opacity-100" : ""}>Práctica</span>
                                        <span className={step >= 3 ? "text-primary opacity-100" : ""}>Plan</span>
                                        <span className={step >= 4 ? "text-primary opacity-100" : ""}>Acceso</span>
                                    </div>
                                    <div className="h-1 bg-muted-foreground/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                                            animate={{ width: `${(step / 4) * 100}%` }}
                                            transition={{ duration: 0.5, ease: "circOut" }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop Close/Back */}
                        <Link href="/" className="shrink-0 text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-accent/20 hover:bg-accent px-3 py-1.5 rounded-lg border border-border/40">
                            Cerrar <X className="w-3 h-3" />
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="relative">
                        <AnimatePresence mode='wait' custom={step}>
                            {step === 0 && (
                                <motion.div key="s0" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                                    <div className="space-y-2 text-center md:text-left">
                                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[9px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md mb-2">
                                            <Sparkles className="w-3 h-3" /> Bienvenido a la Élite
                                        </div>
                                        <h1 className="text-2xl md:text-4xl font-black text-foreground tracking-tight leading-[1.1]">
                                            ¿Cuál es tu enfoque <span className="text-primary italic glow-text">prioritario</span>?
                                        </h1>
                                        <p className="text-sm text-muted-foreground font-light text-balance leading-snug">Selecciona tu meta para personalizar tu workstation clínica.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: 'time', label: 'Eficiencia IA', icon: <Zap className="w-5 h-5" />, color: 'from-blue-500/20 to-indigo-500/20', text: 'text-blue-500', desc: 'Automatización de tests.' },
                                            { id: 'precision', label: 'Precisión', icon: <Activity className="w-5 h-5" />, color: 'from-emerald-500/20 to-teal-500/20', text: 'text-emerald-500', desc: 'Reportes de alta fidelidad.' },
                                            { id: 'modernize', label: 'Digital', icon: <FileText className="w-5 h-5" />, color: 'from-amber-500/20 to-orange-500/20', text: 'text-amber-500', desc: 'Clínica en la nube segura.' },
                                            { id: 'patients', label: 'Conexión', icon: <Brain className="w-5 h-5" />, color: 'from-purple-500/20 to-pink-500/20', text: 'text-purple-500', desc: 'Más tiempo para el paciente.' },
                                        ].map((option, idx) => (
                                            <motion.button
                                                key={option.id}
                                                type="button"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + (idx * 0.05) }}
                                                onClick={() => { handleInputChange('goal', option.label); nextStep(); }}
                                                className="group relative flex flex-col p-4 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-lg hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all text-left overflow-hidden h-32"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                                <div className={`relative z-10 p-2.5 rounded-xl bg-background shadow-md mb-auto group-hover:scale-110 group-hover:-rotate-3 transition-transform w-fit border border-border/50 ${option.text}`}>
                                                    {option.icon}
                                                </div>

                                                <div className="relative z-10">
                                                    <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors leading-tight">
                                                        {option.label}
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground mt-1 font-light leading-tight line-clamp-2">{option.desc}</div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div key="s1" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-black text-foreground">Credenciales Profesionales</h2>
                                        <p className="text-muted-foreground text-sm font-light italic">"La excelencia clínica comienza con una identidad sólida."</p>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/70 ml-1">Nombre Profesional</Label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="h-10 text-base border-border/40 bg-card/30 focus:ring-primary rounded-xl"
                                                placeholder="Ej. Dr. Alejandro Rossi"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <Label className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/70 ml-1">Especialidad</Label>
                                                <Select value={formData.role} onValueChange={(val) => handleInputChange('role', val)}>
                                                    <SelectTrigger className="h-10 rounded-xl border-border/40 bg-card/30">
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Psicólogo">Psicólogo Clínico</SelectItem>
                                                        <SelectItem value="Psiquiatra">Psiquiatra</SelectItem>
                                                        <SelectItem value="Neurólogo">Neurólogo</SelectItem>
                                                        <SelectItem value="Neuropsicólogo">Neuropsicólogo</SelectItem>
                                                        <SelectItem value="Otro">Otro Especialista</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/70 ml-1">N° Registro/Colegiado</Label>
                                                <Input
                                                    value={formData.registryNumber}
                                                    onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                    className="h-10 rounded-xl border-border/40 bg-card/30"
                                                    placeholder="Ej. 24890-7"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/70 ml-1">País de Residencia</Label>
                                            <Input
                                                value={formData.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                className="h-10 rounded-xl border-border/40 bg-card/30"
                                                placeholder="Ej. Chile"
                                            />
                                        </div>
                                    </div>

                                    {/* Compact Signature Preview */}
                                    <div className="p-4 rounded-xl bg-primary/5 backdrop-blur-md border border-primary/20 border-dashed flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shrink-0">
                                            <Stethoscope className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs font-black text-foreground truncate">{formData.name || "Tu Nombre Profesional"}</div>
                                            <div className="text-[9px] text-muted-foreground uppercase tracking-widest truncate">
                                                {formData.role || "Especialidad"} <span className="mx-1 opacity-30">•</span> {formData.registryNumber || "Registro"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4 border-t border-border/40">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-10 rounded-xl text-xs font-bold uppercase tracking-widest px-6 hover:bg-accent/50">Atrás</Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.name || !formData.role || !formData.registryNumber}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-10 px-10 rounded-xl shadow-lg shadow-primary/20 text-xs uppercase tracking-widest"
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-black text-foreground">Dinámica de Consulta</h2>
                                        <p className="text-muted-foreground text-sm font-light">Personalizamos tu workstation según tu volumen de trabajo.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <Label className="text-[9px] font-black text-muted-foreground/70 uppercase tracking-widest ml-1">Pacientes mensuales</Label>
                                            <RadioGroup value={formData.patientsPerMonth} onValueChange={(val) => handleInputChange('patientsPerMonth', val)} className="grid grid-cols-3 gap-3">
                                                {['1-10', '11-30', '30+'].map((opt) => (
                                                    <div key={opt}>
                                                        <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                        <Label htmlFor={opt} className="flex items-center justify-center h-10 rounded-xl border border-border/40 bg-card/30 backdrop-blur-lg hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-xs font-bold">
                                                            {opt}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-[9px] font-black text-muted-foreground/70 uppercase tracking-widest ml-1">Tu mayor desafío:</Label>
                                            <div className="grid gap-2">
                                                {[
                                                    { id: 'tests', label: 'Tabulación de Tests', icon: <FileText className="w-4 h-4" /> },
                                                    { id: 'reports', label: 'Estructurar Informes', icon: <Brain className="w-4 h-4" /> },
                                                    { id: 'history', label: 'Gestión de Fichas', icon: <Lock className="w-4 h-4" /> }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => handleInputChange('primaryNeed', opt.label)}
                                                        className={`flex items-center p-3 rounded-xl border transition-all text-left group ${formData.primaryNeed === opt.label ? 'border-primary bg-primary/10' : 'border-border/40 bg-card/30 hover:border-primary/30'}`}
                                                    >
                                                        <div className={`p-2 rounded-lg mr-3 shadow-sm ${formData.primaryNeed === opt.label ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground group-hover:bg-accent'}`}>
                                                            {opt.icon}
                                                        </div>
                                                        <span className={`text-[10px] uppercase font-black tracking-widest ${formData.primaryNeed === opt.label ? 'text-primary' : 'text-muted-foreground'}`}>{opt.label}</span>
                                                        {formData.primaryNeed === opt.label && <Check className="ml-auto w-4 h-4 text-primary" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4 border-t border-border/40">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-10 rounded-xl text-xs font-bold uppercase tracking-widest px-6 hover:bg-accent/50">Atrás</Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.patientsPerMonth || !formData.primaryNeed}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-10 px-10 rounded-xl shadow-lg shadow-primary/20 text-xs uppercase tracking-widest"
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                                    <div className="text-center space-y-1">
                                        <h2 className="text-2xl font-black text-foreground">Tu Suite Especializada</h2>
                                        <p className="text-muted-foreground text-sm font-light">Selecciona el nivel de automatización clínica.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: 'free', name: 'Exploración', price: 0, desc: 'Consultas', period: '', icon: <Star className="w-4 h-4 text-slate-300" /> },
                                            { id: 'basic', name: 'Esencial', price: 10, desc: 'Tests + IA', period: '/mes', icon: <Zap className="w-4 h-4 text-amber-500" />, pid: PRICE_ID_BASIC },
                                            { id: 'clinical', name: 'Clinical', price: 15, desc: 'Suite Full', period: '/mes', icon: <Brain className="w-4 h-4 text-blue-500" />, pid: PRICE_ID_CLINICAL, popular: true },
                                            { id: 'pro', name: 'Élite', price: 65, desc: 'Soporte VIP', period: '/año', icon: <Sparkles className="w-4 h-4 text-teal-500" />, pid: PRICE_ID_PRO, savings: '-65%' }
                                        ].map((p) => (
                                            <div
                                                key={p.id}
                                                onClick={() => handleInputChange('plan', p.id)}
                                                className={`group relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${formData.plan === p.id ? 'border-primary bg-primary/10' : 'border-border/40 bg-card/30 hover:border-primary/30'}`}
                                            >
                                                {p.popular && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[8px] font-black px-2 py-0.5 rounded-full border border-background">POPULAR</div>}
                                                {p.savings && <div className="absolute top-1 right-1 bg-emerald-500/20 text-emerald-500 text-[8px] font-black px-1.5 py-0.5 rounded-md border border-emerald-500/30">{p.savings}</div>}

                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 bg-background/50 rounded-lg shadow-sm border border-border/40 group-hover:scale-110 transition-transform shrink-0">
                                                        {p.icon}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-black text-[10px] uppercase tracking-widest mt-1 text-foreground truncate">{p.name}</div>
                                                        <div className="text-[9px] text-muted-foreground truncate">{p.desc}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto flex items-end justify-between gap-1">
                                                    <div>
                                                        {p.price === 0 ? <div className="font-black text-sm text-foreground">Gratis</div> : <PriceDisplay amount={p.price} period={p.period} priceId={p.pid} className="font-black text-sm text-foreground" />}
                                                    </div>
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${formData.plan === p.id ? 'border-primary bg-primary' : 'border-border/40'}`}>
                                                        <Check className={`w-2.5 h-2.5 text-primary-foreground transition-opacity ${formData.plan === p.id ? 'opacity-100' : 'opacity-0'}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-primary/5 p-3 rounded-xl flex items-center gap-2.5 text-[10px] text-muted-foreground border border-primary/10">
                                        <div className="p-1 bg-primary/10 rounded-full shrink-0"><Clock className="w-3 h-3 text-primary" /></div>
                                        <span>Planes de pago incluyen <strong>7 días de prueba gratuita</strong>.</span>
                                    </div>

                                    <div className="flex justify-between pt-4 border-t border-border/40">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-10 rounded-xl text-xs font-bold uppercase tracking-widest px-6 hover:bg-accent/50">Atrás</Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-10 px-10 rounded-xl shadow-lg shadow-primary/20 text-xs uppercase tracking-widest"
                                        >
                                            Confirmar
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="s4" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-black text-foreground">Acceso Seguro</h2>
                                        <p className="text-muted-foreground text-sm font-light">Tus datos están protegidos bajo protocolos AES-256.</p>
                                    </div>

                                    {error && <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest"><X className="w-3 h-3" /> {error}</div>}

                                    <div className="space-y-4">
                                        <div className="grid gap-1.5">
                                            <Label className="text-[9px] uppercase font-black text-muted-foreground/70 tracking-widest pl-1">Email Profesional</Label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="h-10 border-border/40 bg-card/30 rounded-xl"
                                                placeholder="doctor@clinica.com"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="grid gap-1.5">
                                                <Label className="text-[9px] uppercase font-black text-muted-foreground/70 tracking-widest pl-1">Contraseña</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    className="h-10 border-border/40 bg-card/30 rounded-xl"
                                                />
                                            </div>
                                            <div className="grid gap-1.5">
                                                <Label className="text-[9px] uppercase font-black text-muted-foreground/70 tracking-widest pl-1">Confirmar</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                    className={`h-10 border-border/40 bg-card/30 rounded-xl ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-destructive' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-[9px] text-muted-foreground/60 text-center px-4 leading-relaxed uppercase tracking-widest font-bold">
                                        Al finalizar, aceptas nuestros <Link href="/legal/terms" className="underline hover:text-primary">Términos</Link> y <Link href="/legal/privacy" className="underline hover:text-primary">Privacidad</Link>.
                                    </div>

                                    <div className="flex justify-between pt-4 border-t border-border/40">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="h-10 rounded-xl text-xs font-bold uppercase tracking-widest px-6 hover:bg-accent/50">Atrás</Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-10 px-8 rounded-xl shadow-lg shadow-primary/20 text-xs uppercase tracking-widest min-w-[160px]"
                                        >
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                                <span className="flex items-center gap-2">
                                                    Finalizar <ChevronRight className="w-3.5 h-3.5" />
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
