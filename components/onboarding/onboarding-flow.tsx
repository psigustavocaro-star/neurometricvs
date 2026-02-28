'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Brain, Home, CheckCircle2, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Link, useRouter } from "@/i18n/navigation"
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"
import { PADDLE_ENV, PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from '@/lib/config'
import { getPaddle } from '@/lib/paddle-client'
import { GoogleLoginButton } from '@/components/auth/google-login-button'

interface OnboardingFlowProps {
    onComplete?: () => void;
    onClose?: () => void;
}

export function OnboardingFlow({ onComplete, onClose }: OnboardingFlowProps) {
    const t = useTranslations('Onboarding')
    const router = useRouter()
    const [step, setStep] = useState(0)

    // Core Data
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        registryNumber: '',
        country: '',
        email: '',
        password: '',
        plan: 'pro'
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [paddle, setPaddle] = useState<any>(null)

    useEffect(() => {
        getPaddle().then(instance => {
            if (instance) setPaddle(instance);
        });
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setError(null)
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step !== 2) return

        if (!formData.email || !formData.password) {
            setError(t('errors.empty_fields'))
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
                    registry_number: formData.registryNumber,
                    country: formData.country,
                    plan: formData.plan
                }
            }
        })

        if (signUpError) {
            setError(signUpError.message)
            setIsLoading(false)
            return
        }

        // Open paddle if user selected plan and paid
        if (paddle && formData.plan !== 'free') {
            try {
                let priceId = PRICE_ID_PRO?.trim()
                if (formData.plan === 'clinical') priceId = PRICE_ID_CLINICAL?.trim()
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
                    return
                }
            } catch (err: any) {
                console.error("Paddle Open Error", err)
            }
        }

        // Fallback or free plan complete
        setIsLoading(false)
        setStep(3)
        onComplete?.()
    }

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 10 : -10, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 10 : -10, opacity: 0 })
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden relative">

                {/* Header Section */}
                <div className="px-8 pt-8 pb-4 text-center">
                    <div className="flex justify-center mb-6">
                        <Link href="/">
                            <Image
                                src="/neurometrics-logo-small.png"
                                alt="Neurometrics Logo"
                                width={56}
                                height={56}
                                className="object-contain hover:scale-105 transition-transform"
                            />
                        </Link>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {step === 0 && "Crea tu cuenta clínica"}
                        {step === 1 && "Verifica tu profesión"}
                        {step === 2 && "Asegura tu cuenta"}
                        {step === 3 && "¡Cuenta creada!"}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {step === 0 && "Únete a la plataforma elegida por expertos en salud mental."}
                        {step === 1 && "Cuéntanos sobre tu práctica para adaptar la plataforma."}
                        {step === 2 && "Configura tus credenciales de acceso seguro."}
                        {step === 3 && "Revisa tu correo para verificar tu cuenta."}
                    </p>
                </div>

                {/* Progress Bar */}
                {step < 3 && (
                    <div className="px-8 pt-2 pb-6">
                        <div className="flex gap-2 w-full h-1.5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-full flex-1 transition-all duration-500",
                                        step >= i ? "bg-teal-500" : "bg-transparent"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait" custom={step}>
                            {step === 0 && (
                                <motion.div key="s0" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-5">
                                    <GoogleLoginButton
                                        label="Registrarse con Google"
                                        className="w-full h-11 bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 font-semibold shadow-sm"
                                    />

                                    <div className="relative py-2 hidden">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase uppercase">
                                            <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">o por correo</span>
                                        </div>
                                    </div>

                                    <div className="relative py-3">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 font-medium">Registro con Correo Electrónico</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Nombre Completo</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="bg-slate-50 dark:bg-slate-950/50"
                                                placeholder="Ej. Dr. Juan Pérez"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.name}
                                        className="w-full h-11 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                                    >
                                        Continuar <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>

                                    <div className="text-center pt-2">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            ¿Ya tienes cuenta? <Link href="/login" className="text-teal-600 dark:text-teal-400 font-medium hover:underline">Iniciar Sesión</Link>
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div key="s1" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-5">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 dark:text-slate-300">Profesión / Especialidad</Label>
                                        <Select value={formData.role} onValueChange={(val) => handleInputChange('role', val)}>
                                            <SelectTrigger className="bg-slate-50 dark:bg-slate-950/50">
                                                <SelectValue placeholder="Selecciona tu rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="physician">Médico General</SelectItem>
                                                <SelectItem value="psychologist">Psicólogo Clínico</SelectItem>
                                                <SelectItem value="psychiatrist">Psiquiatra</SelectItem>
                                                <SelectItem value="neurologist">Neurólogo</SelectItem>
                                                <SelectItem value="neuropsychologist">Neuropsicólogo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700 dark:text-slate-300">Número de Registro / Colegiatura</Label>
                                        <Input
                                            value={formData.registryNumber}
                                            onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-950/50"
                                            placeholder="Ej. CMP 12345"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700 dark:text-slate-300">País de Ejercicio</Label>
                                        <Input
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-950/50"
                                            placeholder="Ej. Chile, México, España"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            type="button"
                                            onClick={prevStep}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Paso Anterior
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.role || !formData.registryNumber || !formData.country}
                                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-5">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 dark:text-slate-300">Correo Electrónico</Label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-950/50"
                                            placeholder="tu@correo.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 dark:text-slate-300">Contraseña Segura</Label>
                                        <PasswordInput
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-950/50"
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            type="button"
                                            onClick={prevStep}
                                            variant="outline"
                                            className="w-full"
                                            disabled={isLoading}
                                        >
                                            Atrás
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={!formData.email || !formData.password || isLoading}
                                            className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20"
                                        >
                                            {isLoading ? "Creando..." : "Crear mi cuenta"}
                                        </Button>
                                    </div>

                                    <p className="text-xs text-center text-slate-500 pt-2">
                                        Al crear una cuenta aceptas los Términos de Servicio y la Política de Privacidad de Neurometrics.
                                    </p>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="text-center space-y-6 py-6">
                                    <div className="w-16 h-16 bg-teal-100 dark:bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Verifica tu correo electrónico</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Hemos enviado un enlace de confirmación a <span className="font-semibold">{formData.email}</span>.
                                        Haz clic en él para activar tu cuenta y acceder a Neurometrics.
                                    </p>
                                    <Button asChild className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 mt-6">
                                        <Link href="/login">Ir a Iniciar Sesión</Link>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    )
} 
