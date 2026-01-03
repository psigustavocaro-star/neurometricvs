"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Check, Info, X, ShieldCheck, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { PriceDisplay } from "@/components/pricing/price-display"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from "@/lib/config"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function PricingSection() {
    const t = useTranslations('Pricing')
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [activeDetailsPlan, setActiveDetailsPlan] = useState<string | null>(null)

    const handleCardClick = (planKey: string) => {
        setSelectedPlan(planKey)
    }

    const plans = [
        { key: 'free', priceId: undefined, amount: 0, hasExcluded: true },
        { key: 'basic', priceId: PRICE_ID_BASIC, amount: 10 },
        { key: 'clinical', priceId: PRICE_ID_CLINICAL, amount: 15, popular: true },
        { key: 'pro', priceId: PRICE_ID_PRO, amount: 65, period: '/año' }
    ]

    return (
        <section id="pricing" className="w-full py-24 relative overflow-hidden">
            {/* Clinical Pattern */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <ScrollAnimation animation="fade-up">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4">{t('title')}</h2>
                        <p className="text-lg text-slate-500 font-light italic">
                            {t('subtitle')}
                        </p>
                    </ScrollAnimation>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan, index) => {
                        const isSelected = selectedPlan === plan.key || (!selectedPlan && plan.key === 'clinical')
                        const badgeKey = plan.popular ? `${plan.key}.badge` : (plan.key === 'pro' ? 'pro.savings_badge' : null)
                        const badgeText = (badgeKey && t.has(badgeKey)) ? t(badgeKey) : null

                        return (
                            <ScrollAnimation key={plan.key} delay={index * 100} className="h-full">
                                <div
                                    onClick={() => handleCardClick(plan.key)}
                                    className={cn(
                                        "group relative flex flex-col p-8 rounded-[2rem] border transition-all duration-500 h-full cursor-pointer bg-white",
                                        isSelected ? "border-teal-500 shadow-2xl shadow-teal-900/10 ring-2 ring-teal-500/20 scale-[1.02]" : "border-slate-200 hover:border-teal-200 hover:shadow-lg",
                                        plan.key === 'pro' && !isSelected && "bg-gradient-to-br from-white to-teal-50/50"
                                    )}
                                >
                                    {badgeText && (
                                        <div className={cn(
                                            "absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg transition-colors",
                                            isSelected ? "bg-teal-600" : "bg-slate-800"
                                        )}>
                                            {badgeText}
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{t(`${plan.key}.name`)}</h3>
                                        <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter mb-4">{t(`${plan.key}.description`)}</p>

                                        <div className="flex items-baseline gap-1 mt-2">
                                            {plan.amount === 0 ? (
                                                <span className="text-3xl font-bold text-slate-900">$0</span>
                                            ) : (
                                                <PriceDisplay amount={plan.amount} period={plan.period || '/mes'} priceId={plan.priceId} className="text-3xl font-bold text-slate-900" />
                                            )}
                                        </div>
                                        {t.has(`${plan.key}.trial`) && <div className="text-[10px] font-bold text-teal-600 mt-1">{t(`${plan.key}.trial`)}</div>}
                                        {plan.key === 'pro' && (
                                            <p className="text-[10px] text-teal-600 mt-1 font-medium" dangerouslySetInnerHTML={{ __html: t.raw('pro.savings_info') }} />
                                        )}
                                    </div>

                                    <ul className="space-y-4 flex-1 mb-8">
                                        {Array.isArray(t.raw(`${plan.key}.features`)) && t.raw(`${plan.key}.features`).map((feature: any, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                                <div className={cn(
                                                    "mt-1 p-0.5 rounded-full",
                                                    isSelected ? "bg-teal-100 text-teal-700" : "bg-slate-50 text-slate-400"
                                                )}>
                                                    <Check className="w-3 h-3" strokeWidth={3} />
                                                </div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {/* Excluded features for free */}
                                        {plan.hasExcluded && Array.isArray(t.raw(`${plan.key}.excluded`)) && t.raw(`${plan.key}.excluded`).map((feature: any, i: number) => (
                                            <li key={`ex-${i}`} className="flex items-start gap-3 text-sm text-slate-400">
                                                <div className="mt-1 p-0.5 rounded-full bg-slate-50 text-slate-300">
                                                    <X className="w-3 h-3" strokeWidth={3} />
                                                </div>
                                                <span className="line-through">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-col gap-3">
                                        <Button
                                            asChild
                                            onClick={(e) => e.stopPropagation()}
                                            className={cn(
                                                "w-full rounded-xl h-12 font-bold shadow-sm transition-all",
                                                isSelected ? "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-900/10" : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200"
                                            )}
                                        >
                                            <Link href={`/onboarding?plan=${plan.key}`}>
                                                {t(`${plan.key}.cta`)}
                                            </Link>
                                        </Button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setActiveDetailsPlan(plan.key)
                                                setDetailsOpen(true)
                                            }}
                                            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Info className="w-3 h-3" /> {t('view_details')}
                                        </button>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        )
                    })}
                </div>

                <div className="mt-16 flex items-center justify-center gap-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-teal-600/50" /> <span>Pago Seguro 256-bit</span></div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-teal-600/50" /> <span>Protocolo Clínico</span></div>
                </div>
            </div>

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden border-0 shadow-2xl">
                    <DialogHeader className="p-8 pb-4 bg-slate-950 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <DialogTitle className="text-3xl font-bold tracking-tight mb-2">
                            {activeDetailsPlan && t(`${activeDetailsPlan}.name`)}
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 text-lg font-light leading-relaxed">
                            {activeDetailsPlan && t(`${activeDetailsPlan}.description`)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-8 bg-white">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                            Detalles de Configuración <div className="h-px flex-1 bg-slate-100" />
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeDetailsPlan && Array.isArray(t.raw(`${activeDetailsPlan}.details`)) && t.raw(`${activeDetailsPlan}.details`).map((feat: any, idx: number) => (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 transition-colors group">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 leading-snug">{feat}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inversión Mensual</span>
                                <span className="text-2xl font-black text-slate-900">
                                    {activeDetailsPlan && plans.find(p => p.key === activeDetailsPlan)?.amount === 0 ? "$0" : (activeDetailsPlan && `$${plans.find(p => p.key === activeDetailsPlan)?.amount}${activeDetailsPlan === 'pro' ? '/año' : '/mes'}`)}
                                </span>
                            </div>
                            <Button asChild onClick={() => setDetailsOpen(false)} className="rounded-xl h-12 px-8 bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-lg shadow-teal-900/10">
                                <Link href={`/onboarding?plan=${activeDetailsPlan}`}>
                                    Elegir este Plan
                                </Link>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
