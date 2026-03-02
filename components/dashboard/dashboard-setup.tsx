'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Brain, Activity, Sparkles, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from "@/i18n/navigation"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from '@/lib/config'
import { getPaddle } from '@/lib/paddle-client'

export function DashboardSetup({ user, profile }: { user: any, profile: any }) {
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [paddle, setPaddle] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [isComplete, setIsComplete] = useState(false)

    const [formData, setFormData] = useState({
        name: profile?.full_name || user?.user_metadata?.full_name || '',
        specialty: profile?.specialty || '',
        registryNumber: profile?.registry_number || '',
        phone: profile?.phone || '',
        plan: 'pro'
    })

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

    const handleCancelSetup = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step !== 1) return

        setIsLoading(true)
        setError(null)
        const supabase = createClient()

        // 1. Update Profile in Supabase
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                full_name: formData.name,
                specialty: formData.specialty,
                registry_number: formData.registryNumber,
                phone: formData.phone
            })
            .eq('id', user.id)

        if (profileError) {
            console.error("Profile update error", profileError)
            setError("Tuvimos un problema guardando tu perfil. Por favor intenta de nuevo.")
            setIsLoading(false)
            return
        }

        // 2. Open Paddle Checkout if not free plan
        if (paddle && formData.plan !== 'free') {
            try {
                let priceId = '';
                if (formData.plan === 'pro') priceId = PRICE_ID_PRO?.trim()
                else if (formData.plan === 'clinical') priceId = PRICE_ID_CLINICAL?.trim()
                else if (formData.plan === 'basic') priceId = PRICE_ID_BASIC?.trim()

                if (priceId) {
                    paddle.Checkout.open({
                        items: [{ priceId, quantity: 1 }],
                        customData: { userId: user.id },
                        customer: { email: user.email },
                        settings: {
                            displayMode: 'overlay',
                            successUrl: `${window.location.origin}/dashboard`,
                            theme: 'light'
                        }
                    })
                    setIsLoading(false)
                    return
                }
            } catch (err: any) {
                console.error("Paddle Open Error", err)
            }
        }

        // If free plan or no paddle, just jump into dashboard
        setIsComplete(true)
        setTimeout(() => {
            window.location.href = '/dashboard'
        }, 1500)
    }

    // Force reloading the page to get inside dashboard real appshell after finish
    if (isComplete) {
        return (
            <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 z-50">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-teal-100 dark:bg-teal-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h2 className="text-3xl font-bold dark:text-white">¡Todo Listo!</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
                        Tu perfil de especialista ha sido configurado. Redirigiéndote a tu estación de trabajo...
                    </p>
                </motion.div>
            </div>
        )
    }

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 10 : -10, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 10 : -10, opacity: 0 })
    }

    return (
        <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 overflow-y-auto flex items-center justify-center p-4 z-50 py-12">
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center my-auto">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden w-full relative max-w-lg">

                    {/* Header */}
                    <div className="px-8 pt-8 pb-4 text-center">
                        <div className="flex justify-center mb-6">
                            <Image
                                src="/neurometrics-logo-small.png"
                                alt="Neurometrics"
                                width={56}
                                height={56}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {step === 0 ? "Completa tu Identidad Médica" : "Selecciona tu Plan de Neurometrics"}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {step === 0 ? "Estos datos se utilizarán para la firma automatizada de todos tus informes." : "Optimiza tu flujo de trabajo clínico con nuestras herramientas de Inteligencia Artificial."}
                        </p>
                    </div>

                    <div className="px-8 pb-8">
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait" custom={step}>
                                {step === 0 && (
                                    <motion.div key="s0" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-5 mt-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Nombre Completo (Con grado académico)</Label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-950/50"
                                                    placeholder="Ej. Dr. Juan Pérez"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Especialidad / Profesión</Label>
                                                <Select value={formData.specialty} onValueChange={(val) => handleInputChange('specialty', val)}>
                                                    <SelectTrigger className="bg-slate-50 dark:bg-slate-950/50">
                                                        <SelectValue placeholder="Selecciona tu especialidad" />
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
                                                <Label>Número de Registro / Colegiatura</Label>
                                                <Input
                                                    value={formData.registryNumber}
                                                    onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-950/50"
                                                    placeholder="Ej. CMP 12345"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Celular o Teléfono Consulta</Label>
                                                <Input
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-950/50"
                                                    placeholder="Ej. +56 9 1234 5678"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                                            <Button
                                                type="button"
                                                onClick={handleCancelSetup}
                                                variant="outline"
                                                className="px-6 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                Volver
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!formData.name || !formData.specialty || !formData.registryNumber}
                                                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold"
                                            >
                                                Continuar <ChevronRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div key="s1" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-5 mt-4">
                                        <div className="grid gap-4">
                                            {[
                                                { id: 'free', name: 'Gratis', desc: 'Modo Lectura / Exploración', price: '0 / mes', icon: <Brain className="w-5 h-5 text-slate-500" /> },
                                                { id: 'basic', name: 'Básico', desc: 'Acceso completo para comenzar', price: '10 / mes', icon: <CheckCircle2 className="w-5 h-5 text-teal-500" /> },
                                                { id: 'clinical', name: 'Plan Clínico', desc: 'Tests guiados y análisis avanzado', price: '15 / mes', icon: <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" /> },
                                                { id: 'pro', name: 'Plan Pro Anual (Más Popular)', desc: 'IA completa, informes automáticos y soporte prioritario', price: '65 / año', icon: <Sparkles className="w-5 h-5 text-amber-500" /> }
                                            ].map((p) => (
                                                <div
                                                    key={p.id}
                                                    onClick={() => handleInputChange('plan', p.id)}
                                                    className={cn(
                                                        "group relative p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4",
                                                        formData.plan === p.id
                                                            ? "border-teal-500 bg-teal-50/50 shadow-sm shadow-teal-500/10 dark:bg-teal-500/10"
                                                            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700"
                                                    )}
                                                >
                                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors", formData.plan === p.id ? "bg-white border-teal-200 dark:bg-slate-900 dark:border-teal-900" : "bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800")}>
                                                        {p.icon}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">{p.name}</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.desc}</div>
                                                    </div>
                                                    <div className="font-black text-sm text-slate-900 dark:text-white shrink-0 ml-4">
                                                        ${p.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {error && (
                                            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium">
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="ghost"
                                                disabled={isLoading}
                                                className="px-6 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                Retroceder
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold h-10 shadow-lg shadow-teal-600/20"
                                            >
                                                {isLoading ? "Procesando..." : (formData.plan === 'free' ? "Finalizar Configuración" : "Proceder al Pago")}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 
