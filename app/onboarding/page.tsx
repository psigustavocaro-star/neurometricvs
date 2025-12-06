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
            initializePaddle({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
                environment: process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ? 'production' : 'sandbox'
            }).then(setPaddle)
        })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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
                paddle.Checkout.open({
                    items: [{ priceId, quantity: 1 }],
                    customData: { userId: signUpData.user?.id },
                    customer: { email: formData.email },
                    settings: {
                        displayMode: 'overlay',
                        successUrl: `${window.location.origin}/payment/success`, // You might want to create this page
                    }
                })
                // We don't stop loading here as the overlay opens
            } else {
                setError('Error de configuración del plan. Contacta soporte.')
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
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
            {/* Bokeh Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-200/20 rounded-full blur-[80px] animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-2xl z-10">
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
                        <div className="relative min-h-[520px]">
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
                                            <CardTitle className="text-2xl text-teal-900 font-bold tracking-tight">Bienvenido a Neurometrics</CardTitle>
                                            <CardDescription className="text-sm text-slate-600">
                                                Completa tu perfil profesional. <span className="text-teal-600 font-medium">Esta información aparecerá automáticamente en tus informes.</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-6 md:px-8 flex-1 space-y-4 overflow-y-auto custom-scrollbar">
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
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="formation" className="text-sm font-medium text-slate-700">Formación / Título</Label>
                                                    <Input
                                                        id="formation"
                                                        placeholder="Ej. Psicólogo Clínico"
                                                        className="h-10 text-sm bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                        value={formData.formation}
                                                        onChange={(e) => handleInputChange('formation', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="registryNumber" className="text-sm font-medium text-slate-700">N° Registro / Colegiatura</Label>
                                                    <Input
                                                        id="registryNumber"
                                                        placeholder="Ej. 123456"
                                                        className="h-10 text-sm bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                        value={formData.registryNumber}
                                                        onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                    />
                                                </div>
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
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-slate-700">Soy...</Label>
                                                <RadioGroup value={formData.role} onValueChange={(val) => handleInputChange('role', val)} className="grid grid-cols-3 gap-2">
                                                    {['Psicólogo', 'Psiquiatra', 'Neurólogo'].map((role) => (
                                                        <div key={role}>
                                                            <RadioGroupItem value={role} id={role} className="peer sr-only" />
                                                            <Label
                                                                htmlFor={role}
                                                                className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white/50 p-2 hover:bg-white hover:border-teal-300 hover:shadow-sm peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:text-teal-900 cursor-pointer transition-all h-full"
                                                            >
                                                                <span className="text-xs font-semibold">{role}</span>
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-6 pb-6 pt-4 md:px-8 md:pb-8 justify-end">
                                            <Button type="button" onClick={nextStep} disabled={!formData.name || !formData.role || !formData.formation || !formData.registryNumber || !formData.country} className="h-11 px-6 text-sm font-medium bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:scale-105">
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
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-700">¿Qué es lo que más te quita tiempo?</Label>
                                                <RadioGroup value={formData.primaryNeed} onValueChange={(val) => handleInputChange('primaryNeed', val)} className="space-y-2">
                                                    {[
                                                        'Corrección manual de tests',
                                                        'Redacción de informes',
                                                        'Gestión de historias clínicas',
                                                        'Gestión de agenda y citas',
                                                        'Facturación y cobros'
                                                    ].map((opt) => (
                                                        <div key={opt} className="flex items-center space-x-3 border border-slate-200 bg-white/50 rounded-lg p-3 hover:bg-white hover:border-teal-300 cursor-pointer transition-all has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50 has-[:checked]:shadow-sm">
                                                            <RadioGroupItem value={opt} id={opt} className="text-teal-600" />
                                                            <Label htmlFor={opt} className="flex-1 cursor-pointer text-sm text-slate-700 font-medium">{opt}</Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-0 pb-0 pt-4 justify-between mt-auto">
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
                                            <div className="grid grid-cols-1 gap-4">
                                                {/* Cuenta Gratuita */}
                                                <div
                                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.plan === 'free' ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
                                                    onClick={() => handleInputChange('plan', 'free')}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-slate-900">Cuenta Gratuita</h3>
                                                            <p className="text-[10px] text-slate-500">Explora el catálogo</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="font-bold text-slate-900">$0</span>
                                                            <span className="text-[10px] text-slate-500 block">/mes</span>
                                                        </div>
                                                    </div>
                                                    <ul className="text-xs text-slate-600 space-y-1">
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Acceso a la Sección de Tests</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Ver catálogo completo</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Ver ejemplos de informes</li>
                                                    </ul>
                                                </div>

                                                {/* Plan Básico */}
                                                <div
                                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.plan === 'basic' ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
                                                    onClick={() => handleInputChange('plan', 'basic')}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-slate-900">Plan Básico</h3>
                                                            <p className="text-[10px] text-slate-500">Para uso personal</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <PriceDisplay amount={10} />
                                                        </div>
                                                    </div>
                                                    <ul className="text-xs text-slate-600 space-y-1">
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Acceso a todos los tests</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> PDFs con firma</li>
                                                    </ul>
                                                </div>

                                                {/* Plan Clínico */}
                                                <div
                                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.plan === 'clinical' ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
                                                    onClick={() => handleInputChange('plan', 'clinical')}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-slate-900">Plan Clínico</h3>
                                                            <p className="text-[10px] text-slate-500">Para profesionales</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <PriceDisplay amount={15} />
                                                        </div>
                                                    </div>
                                                    <ul className="text-xs text-slate-600 space-y-1">
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Todo lo del Básico</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Gestión de Pacientes</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Historial clínico</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Envíos automáticos</li>
                                                    </ul>
                                                </div>

                                                {/* Pro Anual */}
                                                <div
                                                    className={`relative border rounded-xl p-4 cursor-pointer transition-all ${formData.plan === 'pro' ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
                                                    onClick={() => handleInputChange('plan', 'pro')}
                                                >
                                                    <div className="absolute top-0 right-0 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg">RECOMENDADO</div>
                                                    <div className="absolute top-8 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">65% OFF</div>

                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-teal-900">Pro Anual</h3>
                                                            <p className="text-[10px] text-slate-500">Ahorro inteligente</p>
                                                        </div>
                                                        <div className="text-right mt-1">
                                                            <PriceDisplay amount={65} period="/año" />
                                                        </div>
                                                    </div>
                                                    <ul className="text-xs text-slate-600 space-y-1 mt-2">
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> <strong>Paga 4 meses, recibe 12</strong></li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Ahorra 65% vs Plan Clínico</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Solo $5.41 mensuales</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Todo lo del Clínico</li>
                                                        <li className="flex gap-2"><Check className="w-3 h-3 text-teal-600" /> Soporte VIP</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-0 pb-0 pt-4 justify-between mt-auto">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="h-11 px-4 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50">
                                                <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                            </Button>
                                            <Button type="button" onClick={nextStep} className="h-11 px-6 text-sm font-medium bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:scale-105">
                                                Confirmar {formData.plan === 'pro' ? 'Plan Pro' : formData.plan === 'clinical' ? 'Plan Clínico' : formData.plan === 'basic' ? 'Plan Básico' : 'Cuenta Gratuita'} <ChevronRight className="ml-2 w-4 h-4" />
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
                                        <CardHeader className="px-0 pt-0 pb-6">
                                            <CardTitle className="text-2xl text-teal-900 font-bold tracking-tight">Crea tu Cuenta</CardTitle>
                                            <CardDescription className="text-base text-slate-600">Estás a un paso de transformar tu práctica clínica.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-6 md:px-8 flex-1 space-y-6 overflow-y-auto custom-scrollbar">
                                            <div className="bg-teal-50/50 border border-teal-100 rounded-lg p-3 flex items-center gap-3 mb-4">
                                                <ShieldCheck className="w-5 h-5 text-teal-600" />
                                                <p className="text-xs text-teal-800 font-medium">Tus datos están seguros y encriptados.</p>
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
                                                    className="h-11 text-base bg-white/50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="text-xs text-slate-500 text-center mt-4">
                                                Al registrarte, aceptas nuestros <Link href="#" className="text-teal-600 hover:underline font-medium">Términos</Link> y <Link href="#" className="text-teal-600 hover:underline font-medium">Política de Privacidad</Link>.
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-0 pb-0 pt-4 justify-between mt-auto">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="h-11 px-4 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50">
                                                <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
                                            </Button>
                                            <Button type="submit" disabled={isLoading || !formData.email || !formData.password} className="h-11 px-8 text-sm font-medium bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:scale-105 w-full md:w-auto">
                                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Comenzar Prueba Gratis'}
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
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-teal-600" /></div>}>
            <OnboardingContent />
        </Suspense>
    )
}
