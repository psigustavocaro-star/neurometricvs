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
        { key: 'free', priceId: undefined, amount: 0 },
        { key: 'basic', priceId: PRICE_ID_BASIC, amount: 10, trial: '7 Días Gratis' },
        { key: 'clinical', priceId: PRICE_ID_CLINICAL, amount: 15, trial: '7 Días Gratis', popular: true },
        { key: 'pro', priceId: PRICE_ID_PRO, amount: 65, period: '/año', savings: '65% OFF' }
    ]

    return (
        <section id="pricing" className="w-full py-24 bg-transparent relative overflow-hidden">
            {/* Clinical Pattern - Reduced opacity */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--primary),transparent_70%)] opacity-[0.05]" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <ScrollAnimation animation="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">{t('title')}</h2>
                        <p className="text-lg text-muted-foreground font-light italic">
                            Inversión transparente para el crecimiento de tu consulta.
                        </p>
                    </ScrollAnimation>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <ScrollAnimation key={plan.key} delay={index * 100} className="h-full">
                            <div
                                onClick={() => handleCardClick(plan.key)}
                                className={cn(
                                    "group relative flex flex-col p-8 rounded-[2rem] border transition-all duration-500 h-full cursor-pointer bg-card/40 backdrop-blur-md",
                                    plan.key === 'clinical' ? "border-primary shadow-2xl shadow-primary/10 ring-1 ring-primary/50 scale-105 z-10" : "border-border hover:border-primary/30 hover:shadow-xl",
                                    plan.key === 'pro' && "bg-gradient-to-br from-card/60 to-primary/5"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                        MÁS POPULAR
                                    </div>
                                )}
                                {plan.savings && (
                                    <div className="absolute top-4 right-4 bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-lg">
                                        {plan.savings}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-foreground mb-1">{t(`${plan.key}.name`)}</h3>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter mb-4">{t(`${plan.key}.description`)}</p>

                                    <div className="flex items-baseline gap-1 mt-2">
                                        {plan.amount === 0 ? (
                                            <span className="text-3xl font-bold text-foreground">$0</span>
                                        ) : (
                                            <PriceDisplay amount={plan.amount} period={plan.period || '/mes'} priceId={plan.priceId} className="text-3xl font-bold text-foreground" />
                                        )}
                                    </div>
                                    {plan.trial && <div className="text-[10px] font-bold text-primary mt-1">{plan.trial}</div>}
                                </div>

                                <ul className="space-y-4 flex-1 mb-8">
                                    {Array.isArray(t.raw(`${plan.key}.features`)) && t.raw(`${plan.key}.features`).map((feature: any, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <div className="mt-1 p-0.5 rounded-full bg-primary/10 text-primary">
                                                <Check className="w-3 h-3" strokeWidth={3} />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    asChild
                                    className={cn(
                                        "w-full rounded-xl h-12 font-bold shadow-sm transition-all",
                                        plan.key === 'clinical' ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-accent hover:bg-accent/80 text-accent-foreground border border-border"
                                    )}
                                >
                                    <Link href={`/onboarding?plan=${plan.key}`}>
                                        {t(`${plan.key}.cta`)}
                                    </Link>
                                </Button>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>

                <div className="mt-16 flex items-center justify-center gap-6 text-muted-foreground">
                    <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary/50" /> <span className="text-xs font-medium uppercase tracking-widest">Pago Seguro 256-bit</span></div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary/50" /> <span className="text-xs font-medium uppercase tracking-widest">Protocolo Clínico</span></div>
                </div>
            </div>
        </section>
    )
}
