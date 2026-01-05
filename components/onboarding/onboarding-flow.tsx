'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronRight, ChevronLeft, Loader2, ShieldCheck, Clock, Star, X, Zap, Sparkles, Brain, FileText, Calendar, Activity, Lock, FlaskConical, Stethoscope, UserCheck, Cpu, Globe, Database, Sun, Moon, ArrowLeft, Home } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Link, useRouter } from "@/i18n/navigation"
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"
import { PriceDisplay } from "@/components/pricing/price-display"
import { PADDLE_ENV, PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from '@/lib/config'
import { getPaddle } from '@/lib/paddle-client'

interface OnboardingFlowProps {
    onComplete?: () => void;
    onClose?: () => void;
}

export function OnboardingFlow({ onComplete, onClose }: OnboardingFlowProps) {
    const t = useTranslations('Onboarding')
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
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
        getPaddle().then(instance => {
            if (instance) setPaddle(instance);
        });
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step !== 4) return
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
            onComplete?.()
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
            setError(t('errors.payment_unavailable'))
            setIsLoading(false)
        }
    }

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 20 : -20, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 20 : -20, opacity: 0 })
    }

    return (
        <div className={cn(
            "w-full max-w-5xl mx-auto min-h-[600px] flex flex-col relative transition-colors duration-500",
            theme === 'dark' ? "text-white" : "text-slate-900"
        )}>
            {/* Header / Navigation Top Bar */}
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="rounded-full gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-all"
                    >
                        <Link href="/">
                            <Home className="w-3.5 h-3.5" />
                            {t('back_to_landing')}
                        </Link>
                    </Button>
                    {step > 0 && step < 5 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={prevStep}
                            className="rounded-full gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-all border border-white/5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            {t('back')}
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "p-2 rounded-full border transition-all hover:scale-110 active:scale-95",
                            theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-slate-100 border-slate-200 text-slate-600"
                        )}
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    {onClose && (
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
                            <X className="w-5 h-5 opacity-50 hover:opacity-100" />
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Card */}
            <div className={cn(
                "flex-1 rounded-[2rem] border transition-all duration-700 overflow-hidden relative flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.3)]",
                theme === 'dark' ? "bg-slate-950/40 backdrop-blur-2xl border-white/5" : "bg-white border-slate-200"
            )}>
                {/* Visual Accent - Background Realistic Image */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                    <Image
                        src="/brain/73d5cd2b-e558-473c-a0dd-285d09e0566c/modern_clinical_reception_realistic_1767561220730.png"
                        alt="Clinical"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

                <div className="p-8 md:p-12 relative z-10 flex-1 flex flex-col">
                    {/* Progress Indicator - Minimalist */}
                    {step > 0 && step < 5 && (
                        <div className="mb-10 w-full max-w-md mx-auto">
                            <div className="flex justify-between text-[7px] font-black uppercase tracking-[0.4em] mb-4 opacity-30 px-1">
                                <span className={cn(step >= 1 && "text-teal-500 opacity-100")}>01. {t('steps.identity')}</span>
                                <span className={cn(step >= 2 && "text-teal-500 opacity-100")}>02. {t('steps.practice')}</span>
                                <span className={cn(step >= 3 && "text-teal-500 opacity-100")}>03. {t('steps.workstation')}</span>
                                <span className={cn(step >= 4 && "text-teal-500 opacity-100")}>04. {t('steps.security')}</span>
                            </div>
                            <div className={cn("h-[1.5px] w-full rounded-full overflow-hidden", theme === 'dark' ? "bg-white/5" : "bg-slate-100")}>
                                <motion.div
                                    className="h-full bg-teal-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / 4) * 100}%` }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
                        <AnimatePresence mode='wait' custom={step}>
                            {step === 0 && (
                                <motion.div key="s0" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-12">
                                    <div className="text-center space-y-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-4 py-1 rounded-full text-[9px] font-black tracking-[0.3em] uppercase border",
                                            theme === 'dark' ? "bg-teal-500/10 text-teal-400 border-teal-500/20" : "bg-teal-50 text-teal-700 border-teal-100"
                                        )}>
                                            <Brain className="w-3.5 h-3.5" /> {t('step_0_badge')}
                                        </div>
                                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] max-w-3xl mx-auto">
                                            {t.rich('step_0_heading', {
                                                prioritario: (chunks) => <span className="text-teal-500 italic font-normal font-serif">{chunks}</span>
                                            })}
                                        </h1>
                                        <p className="text-base font-medium opacity-40 max-w-lg mx-auto">
                                            {t('step_0_subtext')}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
                                        {[
                                            { id: 'time', label: t('goal_efficiency_label'), icon: <Zap className="w-5 h-5" />, desc: t('goal_efficiency_desc') },
                                            { id: 'modernize', label: t('goal_precision_label'), icon: <Activity className="w-5 h-5" />, desc: t('goal_precision_desc') },
                                            { id: 'patients', label: t('goal_digital_label'), icon: <FileText className="w-5 h-5" />, desc: t('goal_digital_desc') },
                                            { id: 'ai', label: t('goal_connection_label'), icon: <Brain className="w-5 h-5" />, desc: t('goal_connection_desc') },
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => { handleInputChange('goal', option.label); nextStep(); }}
                                                className={cn(
                                                    "group flex items-center p-6 rounded-3xl border transition-all duration-500 text-left",
                                                    theme === 'dark'
                                                        ? "bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60"
                                                        : "bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-white"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mr-6 transition-all border",
                                                    theme === 'dark' ? "bg-slate-950 border-white/5 group-hover:bg-teal-500 group-hover:text-black" : "bg-white border-slate-200 group-hover:bg-slate-900 group-hover:text-white"
                                                )}>
                                                    {option.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-xs uppercase tracking-widest mb-0.5">{option.label}</div>
                                                    <div className="text-[9px] opacity-30 font-bold uppercase tracking-widest">{option.desc}</div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div key="s1" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-10 max-w-2xl mx-auto w-full px-4">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-black tracking-tighter">{t('step1_title')}</h2>
                                        <p className="border-l-2 border-teal-500 pl-6 py-1 italic opacity-40 text-sm font-medium leading-relaxed">{t('step1_quote')}</p>
                                    </div>

                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 ml-1">{t('step1_label_name')}</Label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={cn(
                                                    "h-12 rounded-2xl font-bold transition-all px-6 text-base border",
                                                    theme === 'dark' ? "bg-slate-950 border-white/5 focus:border-teal-500/50" : "bg-white border-slate-200 focus:border-slate-900"
                                                )}
                                                placeholder={t('step1_placeholder_name')}
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 ml-1">{t('step1_label_role')}</Label>
                                                <Select value={formData.role} onValueChange={(val) => handleInputChange('role', val)}>
                                                    <SelectTrigger className={cn(
                                                        "h-12 rounded-2xl font-bold px-6 border",
                                                        theme === 'dark' ? "bg-slate-950 border-white/5" : "bg-white border-slate-200"
                                                    )}>
                                                        <SelectValue placeholder={t('step1_placeholder_role')} />
                                                    </SelectTrigger>
                                                    <SelectContent className={theme === 'dark' ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"}>
                                                        <SelectItem value="psychologist">{t('professions.psychologist')}</SelectItem>
                                                        <SelectItem value="psychiatrist">{t('professions.psychiatrist')}</SelectItem>
                                                        <SelectItem value="neurologist">{t('professions.neurologist')}</SelectItem>
                                                        <SelectItem value="neuropsychologist">{t('professions.neuropsychologist')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 ml-1">{t('step1_label_registry')}</Label>
                                                <Input
                                                    value={formData.registryNumber}
                                                    onChange={(e) => handleInputChange('registryNumber', e.target.value)}
                                                    className={cn(
                                                        "h-12 rounded-2xl font-bold px-6 border",
                                                        theme === 'dark' ? "bg-slate-950 border-white/5" : "bg-white border-slate-200"
                                                    )}
                                                    placeholder={t('step1_placeholder_registry')}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 ml-1">{t('step1_label_country')}</Label>
                                            <Input
                                                value={formData.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                className={cn(
                                                    "h-12 rounded-2xl font-bold px-6 border",
                                                    theme === 'dark' ? "bg-slate-950 border-white/5" : "bg-white border-slate-200"
                                                )}
                                                placeholder={t('step1_placeholder_country')}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.name || !formData.role || !formData.registryNumber}
                                            className={cn(
                                                "transition-all font-black text-[10px] uppercase tracking-widest h-11 px-12 rounded-2xl",
                                                theme === 'dark' ? "bg-white text-black hover:bg-teal-500" : "bg-slate-900 text-white hover:bg-teal-600"
                                            )}
                                        >
                                            {t('step1_btn_next')} <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-12 max-w-2xl mx-auto w-full px-4 text-center">
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-black tracking-tighter">{t('step2_title')}</h2>
                                        <p className="text-sm font-medium opacity-30 max-w-sm mx-auto">{t('step2_subtext')}</p>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <Label className="text-[8px] uppercase tracking-[0.6em] font-black opacity-20 block mb-6">{t('step2_label_volume')}</Label>
                                            <RadioGroup value={formData.patientsPerMonth} onValueChange={(val) => handleInputChange('patientsPerMonth', val)} className="flex justify-center gap-4">
                                                {['1-10', '11-30', '30+'].map((opt) => (
                                                    <div key={opt} className="relative w-28 h-28">
                                                        <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                                        <Label htmlFor={opt} className={cn(
                                                            "flex flex-col items-center justify-center h-full rounded-2xl border transition-all cursor-pointer",
                                                            theme === 'dark'
                                                                ? "border-white/5 bg-slate-900/40 peer-data-[state=checked]:border-teal-500/50 peer-data-[state=checked]:bg-teal-500/10"
                                                                : "border-slate-100 bg-slate-50 peer-data-[state=checked]:border-slate-900 peer-data-[state=checked]:bg-white"
                                                        )}>
                                                            <span className="text-2xl font-black tracking-tighter">{opt}</span>
                                                            <span className="text-[7px] font-black uppercase tracking-[0.3em] mt-1 opacity-30">{t('step2_unit_patients')}</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-6 max-w-md mx-auto">
                                            <Label className="text-[8px] uppercase tracking-[0.6em] font-black opacity-20 block mb-4">{t('step2_label_friction')}</Label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: 'tests', label: t('needs.tests'), icon: <FlaskConical className="w-4 h-4" /> },
                                                    { id: 'reports', label: t('needs.reports'), icon: <FileText className="w-4 h-4" /> },
                                                    { id: 'digital', label: t('needs.digital'), icon: <ShieldCheck className="w-4 h-4" /> }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => handleInputChange('primaryNeed', opt.label)}
                                                        className={cn(
                                                            "group flex items-center p-5 rounded-2xl border transition-all",
                                                            formData.primaryNeed === opt.label
                                                                ? (theme === 'dark' ? "border-teal-500/50 bg-teal-500/10 text-white" : "border-slate-900 bg-white")
                                                                : (theme === 'dark' ? "border-white/5 bg-slate-900/40 opacity-40 hover:opacity-100" : "border-slate-100 bg-slate-50 opacity-40 hover:opacity-100")
                                                        )}
                                                    >
                                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mr-6", formData.primaryNeed === opt.label ? "bg-teal-500 text-black" : "bg-white/5 text-slate-400")}>{opt.icon}</div>
                                                        <span className="text-xs font-bold uppercase tracking-widest text-left flex-1">{opt.label}</span>
                                                        {formData.primaryNeed === opt.label && <Check className="w-4 h-4 text-teal-500" strokeWidth={3} />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-center">
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!formData.patientsPerMonth || !formData.primaryNeed}
                                            className={cn(
                                                "transition-all font-black text-[10px] uppercase tracking-widest h-11 px-12 rounded-2xl",
                                                theme === 'dark' ? "bg-white text-black hover:bg-teal-500" : "bg-slate-900 text-white hover:bg-teal-600"
                                            )}
                                        >
                                            {t('step2_btn_next')} <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-12 max-w-5xl mx-auto w-full px-4 text-center">
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-black tracking-tighter">{t('step3_title')}</h2>
                                        <p className="text-sm font-medium opacity-30 max-w-lg mx-auto">{t('step3_subtext')}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { id: 'free', name: t('plans_details.free_name'), price: 0, desc: t('plans_details.free_desc'), period: '', icon: <Star className="w-5 h-5" /> },
                                            { id: 'basic', name: t('plans_details.basic_name'), price: 10, desc: t('plans_details.basic_desc'), period: '/mes', icon: <Activity className="w-5 h-5" />, pid: PRICE_ID_BASIC },
                                            { id: 'clinical', name: t('plans_details.clinical_name'), price: 15, desc: t('plans_details.clinical_desc'), period: '/mes', icon: <Brain className="w-5 h-5" />, pid: PRICE_ID_CLINICAL, popular: true },
                                            { id: 'pro', name: t('plans_details.pro_name'), price: 65, desc: t('plans_details.pro_desc'), period: '/año', icon: <Sparkles className="w-5 h-5" />, pid: PRICE_ID_PRO, savings: '65% OFF' }
                                        ].map((p) => (
                                            <div
                                                key={p.id}
                                                onClick={() => handleInputChange('plan', p.id)}
                                                className={cn(
                                                    "group relative p-8 rounded-3xl border transition-all cursor-pointer flex flex-col items-center",
                                                    formData.plan === p.id
                                                        ? (theme === 'dark' ? "border-teal-500/50 bg-teal-500/10 ring-1 ring-teal-500/20" : "border-slate-900 bg-white ring-1 ring-slate-900/5")
                                                        : (theme === 'dark' ? "border-white/5 bg-slate-900/40 hover:bg-slate-900/60" : "border-slate-100 bg-slate-50 hover:bg-white")
                                                )}
                                            >
                                                {p.popular && <div className="absolute -top-2 inset-x-0 mx-auto w-fit bg-teal-500 text-black text-[6px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{t('step3_recommendation')}</div>}

                                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-all", formData.plan === p.id ? "bg-teal-500 text-black" : "bg-white/5 text-slate-500")}>
                                                    {p.icon}
                                                </div>

                                                <div className="flex-1 space-y-4">
                                                    <div className="space-y-1">
                                                        <div className="font-bold text-[11px] uppercase tracking-widest">{p.name}</div>
                                                        <div className="text-[8px] opacity-20 font-bold uppercase tracking-tighter leading-tight line-clamp-2">{p.desc}</div>
                                                    </div>
                                                    <div className="py-2">
                                                        {p.price === 0 ? <div className="font-black text-2xl">0.00</div> : <PriceDisplay amount={p.price} period={p.period} priceId={p.pid} className="font-black text-2xl" />}
                                                    </div>
                                                </div>

                                                <div className={cn(
                                                    "mt-6 w-full py-2.5 rounded-xl border flex items-center justify-center font-black text-[8px] uppercase tracking-[0.2em] transition-all",
                                                    formData.plan === p.id
                                                        ? (theme === 'dark' ? "bg-teal-500 border-teal-500 text-black" : "bg-slate-900 border-slate-900 text-white")
                                                        : "border-white/10 text-slate-500 opacity-50 group-hover:opacity-100"
                                                )}>
                                                    {formData.plan === p.id ? t('step3_btn_next') : "SELECCIONAR"}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 flex justify-center">
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className={cn(
                                                "transition-all font-black text-[10px] uppercase tracking-widest h-11 px-12 rounded-2xl",
                                                theme === 'dark' ? "bg-white text-black hover:bg-teal-500" : "bg-slate-900 text-white hover:bg-teal-600"
                                            )}
                                        >
                                            {t('step3_btn_next')} <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="s4" custom={step} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-10 max-w-xl mx-auto w-full px-4 text-center">
                                    <div className="space-y-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-4 py-1 rounded-full text-[9px] font-black tracking-[0.3em] uppercase border",
                                            theme === 'dark' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-100"
                                        )}>
                                            <Lock className="w-3.5 h-3.5" /> {t('step4_badge')}
                                        </div>
                                        <h2 className="text-4xl font-black tracking-tighter">{t('step4_title')}</h2>
                                        <p className="text-sm font-medium opacity-30 max-w-md mx-auto">{t('step4_subtext')}</p>
                                    </div>

                                    <div className="grid gap-6 text-left">
                                        <div className="space-y-2">
                                            <Label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 ml-1">{t('step4_label_email')}</Label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={cn(
                                                    "h-12 rounded-2xl font-bold px-6 text-base border",
                                                    theme === 'dark' ? "bg-slate-950 border-white/5" : "bg-white border-slate-200"
                                                )}
                                                placeholder={t('step4_placeholder_email')}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 ml-1">{t('step4_label_password')}</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    className={cn(
                                                        "h-12 rounded-2xl font-bold px-6 border",
                                                        theme === 'dark' ? "bg-slate-950 border-white/5" : "bg-white border-slate-200"
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 ml-1">{t('step4_label_confirm')}</Label>
                                                <Input
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                    className={cn(
                                                        "h-12 rounded-2xl font-bold px-6 border transition-colors",
                                                        formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-rose-500/50" : (theme === 'dark' ? "bg-slate-950 border-white/5" : "bg-white border-slate-200")
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest">
                                            {error}
                                        </div>
                                    )}

                                    <div className="pt-6 flex flex-col items-center gap-6">
                                        <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-20 max-w-xs leading-relaxed">
                                            {t.rich('step4_legal_info', {
                                                terms: (chunks) => <span className="underline">{chunks}</span>,
                                                privacy: (chunks) => <span className="underline">{chunks}</span>
                                            })}
                                        </p>
                                        <Button
                                            type="submit"
                                            disabled={isLoading || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
                                            className={cn(
                                                "transition-all font-black text-[10px] uppercase tracking-widest h-12 px-16 rounded-2xl w-full max-w-xs",
                                                theme === 'dark' ? "bg-white text-black hover:bg-teal-500" : "bg-slate-900 text-white hover:bg-teal-600"
                                            )}
                                        >
                                            {isLoading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : (
                                                <span className="flex items-center gap-2">
                                                    {t('step4_btn_submit')} <Check className="w-4 h-4" strokeWidth={4} />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="s5" variants={variants} initial="enter" animate="center" className="flex-1 flex flex-col items-center justify-center space-y-10 text-center py-12 px-6">
                                    <div className={cn(
                                        "w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-1000",
                                        theme === 'dark' ? "bg-teal-500/10 border-teal-500/50" : "bg-teal-50 border-teal-600"
                                    )}>
                                        <Check className={cn("w-10 h-10", theme === 'dark' ? "text-teal-400" : "text-teal-600")} strokeWidth={5} />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-5xl font-black tracking-tighter uppercase">{t('step5_welcome')}</h2>
                                        <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-30">{t('step5_activation_link')}</p>
                                        <div className="text-teal-500 text-2xl font-black tracking-tighter">{formData.email}</div>
                                    </div>
                                    <Button asChild className={cn(
                                        "h-14 w-full max-w-sm rounded-2xl transition-all font-black text-[11px] uppercase tracking-widest",
                                        theme === 'dark' ? "bg-white text-black hover:bg-teal-500" : "bg-slate-900 text-white hover:bg-teal-600"
                                    )}>
                                        <Link href="/login">{t('step5_btn_dashboard')}</Link>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {/* Footer - Branding */}
                <div className={cn(
                    "p-6 border-t flex flex-col items-center gap-3",
                    theme === 'dark' ? "border-white/5 bg-slate-950/20" : "border-slate-100 bg-slate-50/30"
                )}>
                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                        <Brain className={cn("w-4 h-4", theme === 'dark' ? "text-teal-400" : "text-teal-600")} />
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase">NEUROMETRICS</span>
                    </div>
                    <div className="flex items-center gap-4 text-[7px] font-bold uppercase tracking-[0.2em] opacity-20">
                        <span>AES-256 SECURED</span>
                        <span className="w-1 h-1 rounded-full bg-current opacity-30" />
                        <span>HIPAA COMPLIANT</span>
                        <span className="w-1 h-1 rounded-full bg-current opacity-30" />
                        <span>CLINICAL AI SYSTEMS</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
