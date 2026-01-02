'use client'

import { useState, useEffect, Suspense } from 'react'
import { PriceDisplay } from "@/components/pricing/price-display"
import { PADDLE_ENV, PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from '@/lib/config'
import { getPaddle } from '@/lib/paddle-client'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronRight, ChevronLeft, Loader2, ShieldCheck, Clock, Star, X, Zap, Sparkles, Brain, FileText, Calendar, Activity, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const getPlanButtonText = (plan: string) => {
    switch (plan) {
        case 'free': return 'Confirmar Plan Gratuito'
        case 'basic': return 'Confirmar Plan Básico'
        case 'clinical': return 'Confirmar Plan Clínico'
        case 'pro': return 'Confirmar Plan Pro'
        default: return 'Confirmar Plan'
    }
}

function OnboardingContent() {
    const searchParams = useSearchParams()
    // Step 0: Vision, 1: Identity, 2: Needs, 3: Plan, 4: Account, 5: Success
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
        plan: 'pro' // Default to Pro
    })

    useEffect(() => {
        const planParam = searchParams.get('plan')
        if (planParam && ['free', 'basic', 'clinical', 'pro'].includes(planParam)) {
            setFormData(prev => ({ ...prev, plan: planParam }))
        }
    }, [searchParams])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    // Initialize Paddle
    const [paddle, setPaddle] = useState<any>(null)

    useEffect(() => {
        getPaddle().then(instance => {
            if (instance) setPaddle(instance);
        });
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Safety: Only allowed to submit at the final account creation step
        if (step !== 4) {
            console.warn('[Onboarding] handleSubmit triggered outside Step 4. Ignoring.');
            return
        }

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
            console.error('[Onboarding] Signup error:', signUpError);
            setError(signUpError.message || 'Error al crear la cuenta. Por favor verifica tus datos.')
            setIsLoading(false)
            return
        }

        if (!signUpData?.user) {
            console.error('[Onboarding] Signup success but no user returned:', signUpData);
            setError('No se pudo crear el usuario. Por favor intenta de nuevo.')
            setIsLoading(false)
            return
        }

        // If free plan, just go to success step
        if (formData.plan === 'free') {
            setIsLoading(false)
            setStep(5)
            return
        }

        // Handle Paddle Checkout
        if (paddle) {
            try {
                let priceId = ''
                if (formData.plan === 'pro') priceId = PRICE_ID_PRO?.trim()
                else if (formData.plan === 'clinical') priceId = PRICE_ID_CLINICAL?.trim()
                else if (formData.plan === 'basic') priceId = PRICE_ID_BASIC?.trim()

                console.log('[Onboarding] Opening checkout for priceId:', priceId);

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
                } else {
                    throw new Error('No se encontró el ID del precio para este plan.')
                }
            } catch (err: any) {
                console.error('[Onboarding] Paddle checkout error:', err);
                setError(`Error en el sistema de pagos: ${err.message || 'Desconocido'}. Por favor contacta a soporte.`)
                setIsLoading(false)
            }
        } else {
            console.error('[Onboarding] Paddle instance not available');
            setError('Error cargando el sistema de pagos. Por favor recarga la página.')
            setIsLoading(false)
        }
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    }

    const getBenefitMessage = (need: string) => {
        switch (need) {
            case 'Corrección manual de tests':
                return {
                    title: "Olvídate de los errores manuales",
                    text: "Obtén correcciones instantáneas y puntuaciones científicamente validadas en segundos.",
                    icon: <Zap className="w-5 h-5 text-amber-500" />
                }
            case 'Redacción de informes':
                return {
                    title: "Informes listos en un click",
                    text: "Genera reportes clínicos completos y profesionales automáticamente, ahorrándote horas de redacción.",
                    icon: <FileText className="w-5 h-5 text-blue-500" />
                }
            case 'Gestión de historias clínicas':
                return {
                    title: "Todo organizado y seguro",
                    text: "Accede al historial completo de tus pacientes desde cualquier lugar, con seguridad de grado clínico.",
                    icon: <Brain className="w-5 h-5 text-purple-500" />
                }
            case 'Gestión de agenda y citas':
                return {
                    title: "Tu tiempo es valioso",
                    text: "Automatiza recordatorios y organiza tu día eficientemente para enfocarte en tus pacientes.",
                    icon: <Calendar className="w-5 h-5 text-green-500" />
                }
            default:
                return {
                    title: "Optimiza tu práctica clínica",
                    text: "Herramientas diseñadas para potenciar tu trabajo profesional.",
                    icon: <Sparkles className="w-5 h-5 text-teal-500" />
                }
        }
    }

    return (
        <main className="min-h-screen relative flex items-center justify-center pt-24 pb-4 px-4 overflow-hidden bg-slate-50 font-sans">
            {/* Bokeh Background */}
            <div className="absolute inset-0 z-0 opacity-70" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-indigo-200/20 rounded-full blur-[80px] animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-4xl z-10">
                {/* Progress Bar (Skipped on Step 0) */}
                {step > 0 && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest px-1">
                            <span className={step >= 1 ? "text-teal-600" : ""}>Identidad</span>
                            <span className={step >= 2 ? "text-teal-600" : ""}>Necesidades</span>
                            <span className={step >= 3 ? "text-teal-600" : ""}>Plan</span>
                            <span className={step >= 4 ? "text-teal-600" : ""}>Cuenta</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                                initial={{ width: '0%' }}
                                animate={{ width: `${(step / 4) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                )}

                <Card className="border-white/40 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-black/5 relative min-h-[600px] flex flex-col">
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 rounded-full" asChild>
                        <Link href="/">
                            <X className="w-5 h-5" />
                        </Link>
                    </Button>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full">
                        <AnimatePresence mode='wait' custom={step}>
                            {/* STEP 0: VISION / GOAL */}
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    custom={step}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4 }}
                                    className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto"
                                >
                                    <div className="mb-6 p-4 bg-teal-50 rounded-full inline-flex">
                                        <Sparkles className="w-8 h-8 text-teal-600" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                                        Lleva tu práctica clínica al <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">siguiente nivel</span>.
                                    </h1>
                                    <p className="text-lg text-slate-600 mb-10 max-w-lg">
                                        Queremos ayudarte a ser el mejor profesional posible. Para empezar, cuéntanos, ¿cuál es tu objetivo principal hoy?
                                    </p>

                                    <div className="grid grid-cols-1 gap-4 w-full text-left">
                                        {[
                                            { id: 'time', label: 'Ahorrar tiempo en tareas administrativas', icon: <Clock /> },
                                            { id: 'precision', label: 'Mayor precisión en mis diagnósticos', icon: <Activity /> },
                                            { id: 'modernize', label: 'Modernizar mi consulta con tecnología', icon: <Zap /> },
                                            { id: 'patients', label: 'Dedicar más tiempo a mis pacientes', icon: <Brain /> },
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => {
                                                    handleInputChange('goal', option.label)
                                                    nextStep()
                                                }}
                                                className="group relative flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50/30 transition-all duration-200"
                                            >
                                                <div className="p-2 bg-white rounded-lg shadow-sm text-slate-500 group-hover:text-teal-600 mr-4 border border-slate-100">
                                                    {option.icon}
                                                </div>
                                                <span className="font-semibold text-slate-700 group-hover:text-teal-900 text-lg">{option.label}</span>
                                                <ChevronRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-transform group-hover:translate-x-1" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 1: IDENTITY */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    custom={step}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex-1 flex flex-col"
                                >
                                    <CardHeader className="px-8 pt-8 pb-4">
                                        <CardTitle className="text-2xl text-slate-900 font-bold">Configuremos tu Perfil Profesional</CardTitle>
                                        <CardDescription className="text-base text-slate-600">
                                            {formData.name ?
                                                <span>Hola, <span className="font-semibold text-teal-600">{formData.name}</span>. Completa estos datos para tu firma digital.</span> :
                                                "Así aparecerán tus datos al pie de cada informe generado."
                                            }
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-8 flex-1 overflow-y-auto custom-scrollbar">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="flex-1 space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Nombre Completo</Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="Ej. Dr. Juan Pérez"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className="h-11 border-slate-200 focus:border-teal-500"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="role">Profesión Base</Label>
                                                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                                                        <SelectTrigger className="h-11 border-slate-200 focus:border-teal-500">
                                                            <SelectValue placeholder="Selecciona tu profesión" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Psicólogo">Psicólogo</SelectItem>
                                                            <SelectItem value="Psiquiatra">Psiquiatra</SelectItem>
                                                            <SelectItem value="Neurólogo">Neurólogo</SelectItem>
                                                            <SelectItem value="Otro">Otro</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="formation">Especialidad / Post-grados (Opcional)</Label>
                                                    <Input
                                                        id="formation"
                                                        placeholder="Ej. Mg. en Neuropsicología Clínica"
                                                        value={formData.formation}
                                                        onChange={(e) => handleInputChange('formation', e.target.value)}
                                                        className="h-11 border-slate-200 focus:border-teal-500"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="registryNumber">N° Registro</Label>
                                                        <Input
                                                            id="registryNumber"
                                                            placeholder="Ej. 12.345"
                                                            value={formData.registryNumber}
                                                            onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                            className="h-11 border-slate-200 focus:border-teal-500"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="country">País</Label>
                                                        <Input
                                                            id="country"
                                                            placeholder="Ej. Chile"
                                                            value={formData.country}
                                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                                            className="h-11 border-slate-200 focus:border-teal-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Preview Card */}
                                            <div className="md:w-80 shrink-0">
                                                <div className="sticky top-0 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
                                                    <div className="absolute top-3 right-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">Vista Previa</div>
                                                    <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-2">
                                                        <span className="text-2xl font-serif">
                                                            {formData.name ? formData.name.charAt(0) : "J"}
                                                        </span>
                                                    </div>
                                                    <div className="font-serif w-full px-2">
                                                        <div className="text-lg font-bold text-slate-900 leading-tight">
                                                            {formData.name || "Dr. Nombre Apellido"}
                                                        </div>
                                                        <div className="text-sm font-medium text-teal-700 mt-1">
                                                            {formData.role || "Profesión"}
                                                        </div>
                                                        <div className="text-xs text-slate-500 mt-0.5">
                                                            {formData.formation || "Especialidad..."}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400 mt-2 font-mono">
                                                            Reg: {formData.registryNumber || '0000'} | {formData.country || 'País'}
                                                        </div>
                                                    </div>
                                                    <div className="w-16 h-0.5 bg-teal-500/20 rounded-full mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="px-8 pb-8 pt-4 justify-between">
                                        <Button type="button" variant="ghost" onClick={prevStep}>
                                            <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                        </Button>
                                        <Button type="button" onClick={nextStep} disabled={!formData.name || !formData.role || !formData.registryNumber || !formData.country} className="bg-teal-600 hover:bg-teal-700 text-white min-w-[140px]">
                                            Continuar <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </CardFooter>
                                </motion.div>
                            )}

                            {/* STEP 2: NEEDS */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    custom={step}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex-1 flex flex-col"
                                >
                                    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
                                        <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar">
                                            <div className="mb-6">
                                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Personaliza tu experiencia</h2>
                                                <p className="text-slate-600">Para ofrecerte las mejores herramientas, cuéntanos tus necesidades.</p>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <Label>¿Cuántos pacientes atiendes al mes?</Label>
                                                    <RadioGroup value={formData.patientsPerMonth} onValueChange={(val) => handleInputChange('patientsPerMonth', val)} className="grid grid-cols-3 gap-3">
                                                        {['1-10', '11-30', '30+'].map((opt) => (
                                                            <div key={opt}>
                                                                <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                                <Label htmlFor={opt} className="flex items-center justify-center rounded-lg border-2 border-slate-100 bg-white p-3 hover:border-teal-400 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:text-teal-900 cursor-pointer transition-all text-center">
                                                                    <span className="text-sm font-semibold">{opt}</span>
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                </div>

                                                <div className="space-y-4">
                                                    <Label className="text-lg font-semibold">¿Qué es lo que más te quita tiempo?</Label>
                                                    <RadioGroup value={formData.primaryNeed} onValueChange={(val) => handleInputChange('primaryNeed', val)} className="space-y-2">
                                                        {[
                                                            'Corrección manual de tests',
                                                            'Redacción de informes',
                                                            'Gestión de historias clínicas',
                                                            'Gestión de agenda y citas'
                                                        ].map((opt) => (
                                                            <div key={opt}>
                                                                <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                                <Label htmlFor={opt} className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 bg-white hover:bg-slate-50 cursor-pointer transition-all peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:bg-teal-50/50 peer-data-[state=checked]:shadow-sm">
                                                                    <span className="font-medium text-slate-700 peer-data-[state=checked]:text-teal-900">{opt}</span>
                                                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-600 flex items-center justify-center">
                                                                        <Check className="w-3 h-3 text-white opacity-0 peer-data-[state=checked]:opacity-100" />
                                                                    </div>
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dynamic Benefit Panel */}
                                        <div className="hidden md:flex w-[320px] bg-slate-50 border-l border-slate-100 flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500" />

                                            <AnimatePresence mode="wait">
                                                {formData.primaryNeed ? (
                                                    <motion.div
                                                        key={formData.primaryNeed}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="space-y-4"
                                                    >
                                                        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg shadow-teal-900/5 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                                            {getBenefitMessage(formData.primaryNeed).icon}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-slate-900">{getBenefitMessage(formData.primaryNeed).title}</h3>
                                                        <p className="text-sm text-slate-600 leading-relaxed">{getBenefitMessage(formData.primaryNeed).text}</p>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="space-y-4 opacity-50"
                                                    >
                                                        <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto" />
                                                        <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
                                                        <div className="h-3 bg-slate-200 rounded w-full mx-auto" />
                                                        <div className="h-3 bg-slate-200 rounded w-5/6 mx-auto" />
                                                        <p className="text-xs text-slate-400 mt-4">Selecciona una opción para ver cómo podemos ayudarte.</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    <div className="p-4 md:px-8 md:pb-8 flex justify-between bg-white border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep}>
                                            <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                        </Button>
                                        <Button type="button" onClick={nextStep} disabled={!formData.patientsPerMonth || !formData.primaryNeed} className="bg-teal-600 hover:bg-teal-700 text-white">
                                            Ver Planes Recomendados <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: PLANS */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    custom={step}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex-1 flex flex-col"
                                >
                                    <CardHeader className="px-6 pt-6 pb-2 text-center">
                                        <CardTitle className="text-2xl text-slate-900 font-bold">Elige tu Plan Profesional</CardTitle>
                                        <CardDescription>
                                            Todos los planes incluyen <strong>7 días de prueba gratis</strong>. Cancela cuando quieras.
                                        </CardDescription>
                                    </CardHeader>

                                    <div className="flex justify-center gap-4 mb-4">
                                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                            <ShieldCheck className="w-3 h-3 text-teal-600" /> Datos Encriptados
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                            <Check className="w-3 h-3 text-teal-600" /> Baremos Validados
                                        </div>
                                    </div>

                                    <CardContent className="px-4 md:px-8 flex-1 overflow-y-auto custom-scrollbar">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
                                            {/* FREE */}
                                            <div
                                                className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col relative ${formData.plan === 'free' ? 'border-teal-600 bg-teal-50/30' : 'border-slate-100 hover:border-teal-200 bg-white'}`}
                                                onClick={() => handleInputChange('plan', 'free')}
                                            >
                                                <div className="font-bold text-slate-900 mb-0.5">Gratuita</div>
                                                <div className="text-[10px] text-slate-500 mb-2">Modo Lectura</div>
                                                <div className="text-2xl font-bold mb-3">$0</div>
                                                <ul className="space-y-1.5 text-xs text-slate-600 mb-4 flex-1">
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> Ver biblioteca de tests</li>
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> Filtrado por profesión</li>
                                                    <li className="text-slate-400"><X className="w-3 h-3 inline mr-1 text-slate-300" /> <span className="line-through">Uso de tests</span></li>
                                                </ul>
                                                <div className={`w-4 h-4 rounded-full border-2 ml-auto ${formData.plan === 'free' ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`} />
                                            </div>

                                            {/* BASIC */}
                                            <div
                                                className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col relative ${formData.plan === 'basic' ? 'border-teal-600 bg-teal-50/30' : 'border-slate-100 hover:border-teal-200 bg-white'}`}
                                                onClick={() => handleInputChange('plan', 'basic')}
                                            >
                                                <div className="font-bold text-slate-900 mb-0.5">Básico</div>
                                                <div className="text-[10px] text-slate-500 mb-2">Para iniciar</div>
                                                <PriceDisplay amount={10} className="text-2xl font-bold mb-3" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC} />
                                                <ul className="space-y-1.5 text-xs text-slate-600 mb-4 flex-1">
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> Acceso total a tests</li>
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> Tabulación automática</li>
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> PDF con firma</li>
                                                </ul>
                                                <div className={`w-4 h-4 rounded-full border-2 ml-auto ${formData.plan === 'basic' ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`} />
                                            </div>

                                            {/* CLINICAL */}
                                            <div
                                                className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col relative ${formData.plan === 'clinical' ? 'border-teal-600 bg-teal-50/30' : 'border-slate-100 hover:border-teal-200 bg-white'}`}
                                                onClick={() => handleInputChange('plan', 'clinical')}
                                            >
                                                <div className="font-bold text-slate-900 mb-0.5">Clínico</div>
                                                <div className="text-[10px] text-slate-500 mb-2">Profesionales</div>
                                                <PriceDisplay amount={15} className="text-2xl font-bold mb-3" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL} />
                                                <ul className="space-y-1.5 text-xs text-slate-600 mb-4 flex-1">
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> Todo lo del Básico</li>
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> Gestión Pacientes</li>
                                                    <li><Check className="w-3 h-3 inline mr-1 text-teal-500" /> Ficha clínica</li>
                                                </ul>
                                                <div className={`w-4 h-4 rounded-full border-2 ml-auto ${formData.plan === 'clinical' ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`} />
                                            </div>

                                            {/* PRO */}
                                            <div
                                                className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col relative overflow-hidden ${formData.plan === 'pro' ? 'border-teal-600 bg-teal-50/50 shadow-md transform scale-[1.02]' : 'border-slate-200 hover:border-teal-300 bg-gradient-to-br from-white to-teal-50/30'}`}
                                                onClick={() => handleInputChange('plan', 'pro')}
                                            >
                                                <div className="absolute top-0 right-0 bg-teal-600 text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">RECOMENDADO</div>
                                                <div className="font-bold text-teal-900 mb-0.5">Pro Anual</div>
                                                <div className="text-[10px] text-emerald-600 font-bold mb-2">Ahorra 65%</div>

                                                <div className="mb-3">
                                                    <PriceDisplay amount={65} period="/año" className="text-2xl font-bold text-slate-900" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO} />
                                                    <div className="text-[10px] text-slate-500">Solo $5.41/mes</div>
                                                </div>

                                                <ul className="space-y-1.5 text-xs text-slate-600 mb-4 flex-1">
                                                    <li><Check className="w-3 h-3 inline mr-1 text-emerald-500" /> Todo lo del Clínico</li>
                                                    <li><Check className="w-3 h-3 inline mr-1 text-emerald-500" /> Soporte VIP</li>
                                                    <li><Check className="w-3 h-3 inline mr-1 text-emerald-500" /> 4 meses gratis</li>
                                                </ul>
                                                <div className={`w-4 h-4 rounded-full border-2 ml-auto ${formData.plan === 'pro' ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`} />
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="px-8 pb-8 pt-4 justify-between bg-white border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep}>
                                            <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                        </Button>
                                        <Button onClick={nextStep} disabled={!formData.plan} className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 shadow-lg shadow-teal-600/20">
                                            {getPlanButtonText(formData.plan)} <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </CardFooter>
                                </motion.div>
                            )}

                            {/* STEP 4: ACCOUNT */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    custom={step}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex-1 flex flex-col"
                                >
                                    <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto custom-scrollbar">
                                        <div className="w-full max-w-md space-y-6">
                                            <div className="text-center">
                                                <h2 className="text-2xl font-bold text-slate-900">Crea tu Cuenta Segura</h2>
                                                <p className="text-slate-600 mt-2">Último paso para transformar tu consulta.</p>
                                            </div>

                                            <div className="bg-teal-50 border border-teal-100 rounded-lg p-3 flex gap-3 text-sm text-teal-800">
                                                <Lock className="w-5 h-5 shrink-0 text-teal-600" />
                                                <div>
                                                    <span className="font-bold">Privacidad Garantizada.</span> Cumplimos con estándares de protección de datos de salud para tú tranquilidad y la de tus pacientes.
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                                                    {error}
                                                </div>
                                            )}

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Correo Electrónico</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="tu@email.com"
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                        className="h-11"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="password">Contraseña</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        value={formData.password}
                                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                                        className="h-11"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                                                    <Input
                                                        id="confirmPassword"
                                                        type="password"
                                                        value={formData.confirmPassword}
                                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                        className={`h-11 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300' : ''}`}
                                                        required
                                                    />
                                                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                                        <p className="text-[10px] text-red-500">Las contraseñas no coinciden.</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-xs text-slate-500 text-center">
                                                Al continuar, aceptas nuestros <Link href="/legal/terms" className="text-teal-600 hover:underline">Términos</Link> y <Link href="/legal/privacy" className="text-teal-600 hover:underline">Política de Privacidad</Link>.
                                            </div>
                                        </div>
                                    </div>

                                    <CardFooter className="px-8 pb-8 pt-4 justify-between bg-white border-t border-slate-100">
                                        <Button type="button" variant="ghost" onClick={prevStep}>
                                            <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading || !formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-8 shadow-xl shadow-teal-600/20 rounded-full min-w-[200px]"
                                        >
                                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <span className="flex items-center">
                                                    {formData.plan === 'free' ? 'Comenzar Gratis' : 'Ir al Pago Seguro'} <ChevronRight className="ml-2 w-4 h-4" />
                                                </span>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </motion.div>
                            )}

                            {/* STEP 5: SUCCESS */}
                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    custom={step}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                        <Check className="w-12 h-12 text-teal-600" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-teal-900 mb-4">¡Revisa tu Correo!</h2>
                                    <p className="text-slate-600 text-lg mb-8 max-w-md">
                                        Hemos enviado un enlace de confirmación a <strong>{formData.email}</strong>.
                                        <br /><br />
                                        Haz clic para activar tu cuenta y comenzar tu prueba gratuita de inmediato.
                                    </p>
                                    <div className="flex flex-col gap-4 w-full max-w-xs">
                                        <Button asChild className="h-12 text-lg bg-teal-600 hover:bg-teal-700 shadow-lg">
                                            <Link href="/login">Ir al Inicio de Sesión</Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={async () => {
                                                const supabase = createClient()
                                                await supabase.auth.resend({ type: 'signup', email: formData.email })
                                                alert('Correo reenviado exitosamente')
                                            }}
                                            className="text-teal-600 hover:bg-teal-50"
                                        >
                                            Reenviar correo
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </Card>
            </div>
        </main>
    )
}

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-teal-600" /></div>}>
            <OnboardingContent />
        </Suspense>
    )
}
