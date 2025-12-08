'use client'

import { useState, useEffect, Suspense } from 'react'
import { PriceDisplay } from "@/components/pricing/price-display"
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Check, ChevronRight, ChevronLeft, Loader2, ShieldCheck, Clock, Star, X } from 'lucide-react'
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
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
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
        import('@paddle/paddle-js').then(({ initializePaddle }) => {
            const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
            const env = process.env.NEXT_PUBLIC_PADDLE_ENV
            console.log('[Paddle] Initializing with:', {
                token: token ? `${token.substring(0, 5)}...` : 'MISSING',
                env
            })

            if (!token) {
                console.error('[Paddle] Error: Client Token is missing!')
                // V2: Debug timestamp to verify new code is running
                setError(`Error de configuración: Falta el token de pagos. (Rev: ${new Date().toISOString().split('T')[1].substring(0, 5)})`)
                return
            }

            initializePaddle({
                token: token!,
                environment: env === 'production' ? 'production' : 'sandbox',
                eventCallback: (data) => {
                    console.log('[Paddle] Event:', data)
                }
            }).then((paddleInstance) => {
                console.log('[Paddle] Initialized:', !!paddleInstance)
                setPaddle(paddleInstance)
            })
        })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const supabase = createClient()

        // DEBUG: Check if env vars are loaded correctly in the browser
        // console.log('Supabase Config Debug:', { url: process.env.NEXT_PUBLIC_SUPABASE_URL })

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
                    plan: formData.plan
                }
            }
        })

        if (signUpError) {
            setError(signUpError.message)
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
            let priceId = ''
            if (formData.plan === 'pro') priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO!
            else if (formData.plan === 'clinical') priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL!
            else if (formData.plan === 'basic') priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC!

            if (priceId) {
                console.log('[Paddle] Opening checkout for:', {
                    plan: formData.plan,
                    priceId: priceId ? 'FOUND' : 'MISSING', // Masked for security in logs
                    email: formData.email,
                    userId: signUpData.user?.id
                })

                paddle.Checkout.open({
                    items: [{ priceId, quantity: 1 }],
                    customData: { userId: signUpData.user?.id || '' },
                    customer: { email: formData.email },
                    settings: {
                        displayMode: 'overlay',
                        successUrl: `${window.location.origin}/payment/success`,
                        theme: 'light'
                    }
                })
                // We don't stop loading here as the overlay opens
            } else {
                console.error('Missing Price ID for plan:', formData.plan)
                console.log('Available Env Vars:', {
                    basic: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC ? 'SET' : 'MISSING',
                    clinical: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL ? 'SET' : 'MISSING',
                    pro: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO ? 'SET' : 'MISSING'
                })
                setError('Error: No se encontró el ID del precio para este plan. Por favor contacta a soporte.')
                setIsLoading(false)
            }
        } else {
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

    return (
        <main className="min-h-screen relative flex items-center justify-center pt-24 pb-4 px-4 overflow-hidden bg-slate-50">
            {/* Bokeh Background */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-200/20 rounded-full blur-[80px] animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-3xl z-10">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-2 uppercase tracking-widest">
                        <span>Personalización</span>
                        <span>Necesidades</span>
                        <span>Tu Plan</span>
                        <span>Cuenta</span>
                    </div>
                    <div className="h-1.5 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden border border-white/20">
                        <motion.div
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                <Card className="border-white/40 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/50 relative">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 rounded-full" asChild>
                        <Link href="/">
                            <X className="w-5 h-5" />
                        </Link>
                    </Button>
                    <form onSubmit={handleSubmit}>
                        <div className="relative min-h-[500px] flex flex-col">
                            <AnimatePresence mode='wait' custom={step}>
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        custom={step}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex flex-col"
                                    >
                                        <CardHeader className="px-6 pt-6 pb-4 md:px-8 md:pt-8">
                                            <CardTitle className="text-2xl text-teal-900 font-bold tracking-tight">Configura tu Firma Profesional</CardTitle>
                                            <CardDescription className="text-sm text-slate-600">
                                                Así aparecerán tus datos al pie de cada informe generado. <span className="text-teal-600 font-medium">Asegúrate de que tus credenciales estén correctas.</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-6 md:px-8 flex-1 overflow-y-auto custom-scrollbar relative">
                                            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 pb-16 md:pb-0">
                                                {/* Left Column: Form */}
                                                <div className="flex-1 space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nombre Completo</Label>
                                                        <Input
                                                            id="name"
                                                            placeholder="Ej. Dr. Juan Pérez"
                                                            className="h-10 text-sm bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                            value={formData.name}
                                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="role" className="text-sm font-medium text-slate-700">Profesión Base</Label>
                                                        <Input
                                                            id="role"
                                                            placeholder="Ej. Psicólogo, Médico Psiquiatra"
                                                            className="h-10 text-sm bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                            value={formData.role}
                                                            onChange={(e) => handleInputChange('role', e.target.value)}
                                                        />
                                                        <p className="text-[10px] text-slate-500">Tu título principal.</p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="formation" className="text-sm font-medium text-slate-700">Especialidad / Post-grados (Opcional)</Label>
                                                        <Input
                                                            id="formation"
                                                            placeholder="Ej. Mg. en Neuropsicología Clínica"
                                                            className="h-10 text-sm bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                            value={formData.formation}
                                                            onChange={(e) => handleInputChange('formation', e.target.value)}
                                                        />
                                                        <p className="text-[10px] text-slate-500">Se mostrará debajo de tu profesión.</p>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="registryNumber" className="text-sm font-medium text-slate-700">N° Registro</Label>
                                                            <Input
                                                                id="registryNumber"
                                                                placeholder="Ej. 12.345"
                                                                className="h-10 text-sm bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                                value={formData.registryNumber}
                                                                onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="country" className="text-sm font-medium text-slate-700">País</Label>
                                                            <Input
                                                                id="country"
                                                                placeholder="Ej. Chile"
                                                                className="h-10 text-sm bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                                value={formData.country}
                                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column: Signature Preview (Sticky for Desktop) */}
                                                <div className="md:w-[280px] lg:w-[320px] shrink-0 order-first md:order-last mb-4 md:mb-0">
                                                    <div className="md:sticky md:top-0 p-6 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[180px]">
                                                        <div className="w-full flex justify-center mb-1 opacity-50">
                                                            <div className="h-1 w-12 bg-slate-300 rounded-full" />
                                                        </div>
                                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vista Previa Firma</h4>

                                                        <div className="font-serif text-slate-900 w-full px-2">
                                                            <div className="text-lg font-bold text-slate-800 leading-tight">
                                                                {formData.name || <span className="text-slate-300 italic">Nombre Profesional</span>}
                                                            </div>
                                                            <div className="text-sm font-medium text-teal-700 mt-1">
                                                                {formData.role || <span className="text-slate-300 italic">Profesión</span>}
                                                            </div>
                                                            {(formData.formation || (!formData.role && !formData.formation)) && (
                                                                <div className="text-xs text-slate-600 mt-0.5 max-w-[200px] mx-auto leading-tight">
                                                                    {formData.formation || <span className="text-slate-300 italic">Especialidad</span>}
                                                                </div>
                                                            )}
                                                            <div className="text-[10px] text-slate-500 mt-2 font-mono truncate">
                                                                Reg: {formData.registryNumber || '...'} | {formData.country || '...'}
                                                            </div>
                                                        </div>

                                                        <div className="w-full h-px bg-slate-100 mt-2" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Scroll Indicator Overlay (Mobile) */}
                                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none flex items-end justify-center pb-2 md:hidden">
                                                <div className="flex flex-col items-center animate-bounce text-teal-600/80">
                                                    <span className="text-[10px] font-medium mb-1">Desliza</span>
                                                    <ChevronRight className="w-5 h-5 rotate-90" />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-6 pb-6 pt-4 md:px-8 md:pb-8 justify-end bg-white/50 backdrop-blur-sm z-10 border-t border-white/20">
                                            <Button type="button" onClick={nextStep} disabled={!formData.name || !formData.role || !formData.registryNumber || !formData.country} className="h-11 px-6 text-sm font-medium bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:scale-105">
                                                Siguiente <ChevronRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </CardFooter>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        custom={step}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 p-8 flex flex-col"
                                    >
                                        <CardHeader className="px-0 pt-0 pb-6">
                                            <CardTitle className="text-2xl text-teal-900 font-bold tracking-tight">Entendiendo tus necesidades</CardTitle>
                                            <CardDescription className="text-base text-slate-600">Para ofrecerte las mejores herramientas, cuéntanos un poco más.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-6 md:px-8 flex-1 space-y-6 overflow-y-auto custom-scrollbar">
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-700">¿Cuántos pacientes atiendes al mes aprox.?</Label>
                                                <RadioGroup value={formData.patientsPerMonth} onValueChange={(val) => handleInputChange('patientsPerMonth', val)} className="grid grid-cols-3 gap-3">
                                                    {['1-10', '11-30', '30+'].map((opt) => (
                                                        <div key={opt}>
                                                            <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                            <Label
                                                                htmlFor={opt}
                                                                className="flex items-center justify-center rounded-lg border border-slate-200 bg-white/50 p-3 hover:bg-white hover:border-teal-300 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:text-teal-900 cursor-pointer transition-all"
                                                            >
                                                                <span className="text-sm font-semibold">{opt}</span>
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                            <div className="space-y-4">
                                                <Label className="text-lg font-semibold text-slate-800">¿Qué es lo que más te quita tiempo?</Label>
                                                <RadioGroup value={formData.primaryNeed} onValueChange={(val) => handleInputChange('primaryNeed', val)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {[
                                                        'Corrección manual de tests',
                                                        'Redacción de informes',
                                                        'Gestión de historias clínicas',
                                                        'Gestión de agenda y citas',
                                                        'Facturación y cobros'
                                                    ].map((opt) => (
                                                        <div key={opt} className="relative">
                                                            <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                            <Label
                                                                htmlFor={opt}
                                                                className="flex items-center space-x-3 border-2 border-slate-200 bg-white/50 rounded-xl p-4 hover:bg-white hover:border-teal-300 cursor-pointer transition-all peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:shadow-md h-full"
                                                            >
                                                                <span className="text-sm font-medium text-slate-700 peer-data-[state=checked]:text-teal-900">{opt}</span>
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-0 pb-6 pt-4 justify-between mt-auto">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="h-11 px-4 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50">
                                                <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                            </Button>
                                            <Button type="button" onClick={nextStep} disabled={!formData.patientsPerMonth || !formData.primaryNeed} className="h-11 px-6 text-sm font-medium bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:scale-105">
                                                Siguiente <ChevronRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </CardFooter>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        custom={step}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex flex-col"
                                    >
                                        <CardHeader className="px-6 pt-6 pb-4 md:px-8 md:pt-8">
                                            <CardTitle className="text-2xl text-teal-900 font-bold tracking-tight">Elige tu Plan</CardTitle>
                                            <CardDescription className="text-base text-slate-600">Todos incluyen <strong>7 días de prueba gratis</strong>.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-6 md:px-8 flex-1 overflow-y-auto custom-scrollbar">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-4">
                                                {/* Cuenta Gratuita */}
                                                <div
                                                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all flex flex-col h-full bg-white relative ${formData.plan === 'free' ? 'border-teal-600 shadow-lg scale-105 z-10' : 'border-slate-100 hover:border-teal-300 hover:shadow-md opacity-90 hover:opacity-100 text-left'}`}
                                                    onClick={() => handleInputChange('plan', 'free')}
                                                >
                                                    <div className="mb-3">
                                                        <h3 className="font-bold text-base text-slate-900 leading-tight mb-0.5">Gratuita</h3>
                                                        <p className="text-[10px] text-slate-600">Explora el potencial</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <span className="text-2xl font-bold text-slate-900">$0</span>
                                                        <span className="text-[10px] text-slate-600">/mes</span>
                                                    </div>
                                                    <ul className="text-[10px] text-slate-600 space-y-1.5 flex-1">
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Acceso a Tests</span></li>
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Catálogo completo</span></li>
                                                    </ul>
                                                </div>

                                                {/* Plan Básico */}
                                                <div
                                                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all flex flex-col h-full bg-white relative ${formData.plan === 'basic' ? 'border-teal-600 shadow-lg scale-105 z-10' : 'border-slate-100 hover:border-teal-300 hover:shadow-md opacity-90 hover:opacity-100 text-left'}`}
                                                    onClick={() => handleInputChange('plan', 'basic')}
                                                >
                                                    <div className="mb-3">
                                                        <h3 className="font-bold text-base text-slate-900 leading-tight mb-0.5">Básico</h3>
                                                        <p className="text-[10px] text-slate-600">Para iniciar</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <PriceDisplay amount={10} className="text-2xl font-bold text-slate-900" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC} />
                                                    </div>
                                                    <ul className="text-[10px] text-slate-600 space-y-1.5 flex-1">
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Acceso total</span></li>
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">PDFs con firma</span></li>
                                                    </ul>
                                                </div>

                                                {/* Plan Clínico */}
                                                <div
                                                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all flex flex-col h-full bg-white relative ${formData.plan === 'clinical' ? 'border-teal-600 shadow-lg scale-105 z-10' : 'border-slate-100 hover:border-teal-300 hover:shadow-md opacity-90 hover:opacity-100 text-left'}`}
                                                    onClick={() => handleInputChange('plan', 'clinical')}
                                                >
                                                    <div className="mb-3">
                                                        <h3 className="font-bold text-base text-slate-900 leading-tight mb-0.5">Clínico</h3>
                                                        <p className="text-[10px] text-slate-600">Profesionales</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <PriceDisplay amount={15} className="text-2xl font-bold text-slate-900" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL} />
                                                    </div>
                                                    <ul className="text-[10px] text-slate-600 space-y-1.5 flex-1">
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Todo lo del Básico</span></li>
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Gestión Pacientes</span></li>
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Historia clínica</span></li>
                                                    </ul>
                                                </div>

                                                {/* Pro Anual */}
                                                <div
                                                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all flex flex-col h-full bg-gradient-to-br from-teal-50 to-emerald-50 relative ${formData.plan === 'pro' ? 'border-teal-600 shadow-lg scale-105 z-10' : 'border-slate-100 hover:border-teal-300 hover:shadow-md opacity-90 hover:opacity-100 text-left'}`}
                                                    onClick={() => handleInputChange('plan', 'pro')}
                                                >
                                                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">RECOMENDADO</div>

                                                    <div className="mb-3 mt-1">
                                                        <h3 className="font-bold text-base text-teal-900 leading-tight mb-0.5">Pro Anual</h3>
                                                        <p className="text-[10px] text-emerald-600 font-semibold">Ahorra 65%</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <PriceDisplay amount={65} period="/año" className="text-2xl font-bold text-teal-900" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO} />
                                                        <p className="text-[9px] text-teal-600 mt-0.5 font-medium">Solo $5.41/mes</p>
                                                    </div>
                                                    <ul className="text-[10px] text-slate-600 space-y-1.5 flex-1">
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Todo lo del Clínico</span></li>
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">Soporte VIP</span></li>
                                                        <li className="flex gap-1.5 items-start"><Check className="w-3 h-3 text-teal-600 shrink-0" /> <span className="leading-tight">4 meses gratis</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-6 pb-8 pt-4 md:px-8 md:pb-10 justify-between mt-auto">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="h-10 px-6 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50">
                                                <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                            </Button>
                                            <Button type="button" onClick={nextStep} disabled={!formData.plan} className="h-11 px-8 text-sm font-bold bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:scale-105">
                                                {getPlanButtonText(formData.plan)} <ChevronRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </CardFooter>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        custom={step}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 p-8 flex flex-col"
                                    >
                                        <CardHeader className="px-0 pt-0 pb-6 text-center">
                                            <CardTitle className="text-3xl text-teal-900 font-bold tracking-tight mb-2">Crea tu Cuenta</CardTitle>
                                            <CardDescription className="text-sm text-slate-600 max-w-md mx-auto">
                                                Ingresa el correo y contraseña con los que accederás a tu cuenta. <span className="text-teal-600 font-medium">Estos serán tus credenciales de acceso permanente.</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-6 md:px-12 flex-1 space-y-4 overflow-y-auto custom-scrollbar">
                                            <div className="bg-teal-50/50 border border-teal-100 rounded-lg p-2.5 flex items-center gap-3 mb-4">
                                                <ShieldCheck className="w-4 h-4 text-teal-600" />
                                                <p className="text-[11px] text-teal-800 font-medium">Tus datos están protegidos con encriptación de nivel bancario.</p>
                                            </div>
                                            {error && (
                                                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                                                    {error}
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Correo Electrónico</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="tu@email.com"
                                                    className="h-11 text-base bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Contraseña</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    className="h-10 text-base bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    required
                                                />
                                                <p className="text-[10px] text-slate-500">Usa al menos 8 caracteres, una mayúscula y un número.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirmar Contraseña</Label>
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    className={`h-10 text-base bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                    required
                                                />
                                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                                    <p className="text-[10px] text-red-500">Las contraseñas no coinciden.</p>
                                                )}
                                            </div>
                                            <div className="text-[10px] text-slate-500 text-center mt-4">
                                                Al registrarte, aceptas nuestros <Link href="/legal/terms" target="_blank" className="text-teal-600 hover:underline font-medium">Términos</Link> y <Link href="/legal/privacy" target="_blank" className="text-teal-600 hover:underline font-medium">Política de Privacidad</Link>.
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-6 pb-8 pt-4 md:px-8 md:pb-10 justify-between mt-auto">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="h-10 px-6 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50">
                                                <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isLoading || !formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                                                className="h-11 px-8 text-sm font-bold bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all hover:scale-105 rounded-full flex-1 ml-4"
                                            >
                                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                                    <span className="flex items-center">
                                                        {formData.plan === 'free' ? 'Comenzar Gratis' : 'Ir al Pago Seguro'} <ChevronRight className="ml-2 w-4 h-4" />
                                                    </span>
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </motion.div>
                                )}

                                {step === 5 && (
                                    <motion.div
                                        key="step5"
                                        custom={step}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 p-6 md:p-8 flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                            <Check className="w-10 h-10 text-teal-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-teal-900 mb-4">¡Revisa tu Correo!</h2>
                                        <p className="text-slate-600 text-lg mb-8 max-w-md">
                                            Hemos enviado un enlace de confirmación a <strong>{formData.email}</strong>.
                                            <br /><br />
                                            Por favor, haz clic en el enlace para activar tu cuenta y comenzar tu prueba gratuita.
                                        </p>
                                        <div className="flex flex-col gap-4 w-full max-w-xs">
                                            <Button asChild className="h-12 px-8 text-lg bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20">
                                                <Link href="/login">
                                                    Ir al Inicio de Sesión
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={async () => {
                                                    const supabase = createClient()
                                                    await supabase.auth.resend({
                                                        type: 'signup',
                                                        email: formData.email,
                                                    })
                                                    alert('Correo reenviado exitosamente')
                                                }}
                                                className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
                                            >
                                                Reenviar correo
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form >
                </Card >
            </div >
        </main >
    )
}

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-teal-600" /></div>}>
            <OnboardingContent />
        </Suspense>
    )
}
