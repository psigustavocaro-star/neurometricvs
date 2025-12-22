"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Check, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { PriceDisplay } from "@/components/pricing/price-display"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
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

    const handleTitleClick = (e: React.MouseEvent, planKey: string) => {
        e.stopPropagation()
        setActiveDetailsPlan(planKey)
        setDetailsOpen(true)
    }

    const plans = [
        {
            key: 'free',
            priceId: undefined,
            amount: 0,
            highlight: false,
            color: 'slate',
            hasExcluded: true,
        },
        {
            key: 'basic',
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC,
            amount: 10,
            highlight: false,
            color: 'slate'
        },
        {
            key: 'clinical',
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL,
            amount: 15,
            highlight: true,
            color: 'teal'
        },
        {
            key: 'pro',
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO,
            amount: 65,
            period: '/año',
            highlight: false,
            color: 'emerald'
        }
    ]

    return (
        <section id="pricing" className="w-full py-12 md:py-24 pb-24 md:pb-32 bg-transparent relative overflow-hidden transition-colors duration-300">
            <div className="container px-4 md:px-6 relative z-10">
                <ScrollAnimation>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-white">{t('title')}</h2>
                            <p className="max-w-[900px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </ScrollAnimation>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-6 items-stretch max-w-7xl mx-auto">
                    {plans.map((plan, index) => {
                        const isSelected = selectedPlan === plan.key
                        const isClinical = plan.key === 'clinical'
                        const isPro = plan.key === 'pro'
                        const isFree = plan.key === 'free'

                        return (
                            <ScrollAnimation key={plan.key} delay={index * 100} className="h-full">
                                <div
                                    onClick={() => handleCardClick(plan.key)}
                                    className={cn(
                                        "flex flex-col p-6 rounded-2xl border transition-all duration-300 ease-out relative h-full cursor-pointer group",
                                        "bg-white shadow-lg hover:shadow-xl",
                                        "dark:bg-slate-900 dark:shadow-none",
                                        isSelected
                                            ? "border-teal-500 dark:border-teal-500 ring-1 ring-teal-500 z-20"
                                            : cn(
                                                "border-slate-200 dark:border-slate-800",
                                                "hover:border-teal-300 dark:hover:border-slate-700 hover:-translate-y-1"
                                            ),
                                        isPro && "bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border-teal-200"
                                    )}
                                >
                                    {isPro && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                                            {t('pro.savings_badge')}
                                        </div>
                                    )}

                                    <div className="space-y-2 text-left mb-4">
                                        <div
                                            onClick={(e) => handleTitleClick(e, plan.key)}
                                            className="group/title inline-flex items-center gap-2 cursor-help transition-opacity hover:opacity-80"
                                        >
                                            <h3 className={cn(
                                                "text-lg font-bold transition-colors",
                                                isPro ? "text-teal-900 dark:text-teal-400" : "text-slate-900 dark:text-white"
                                            )}>
                                                {t(`${plan.key}.name`)}
                                            </h3>
                                            <Info className="w-4 h-4 text-slate-400 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                                        </div>
                                        <p className={cn(
                                            "text-xs",
                                            isPro ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-500 dark:text-slate-400"
                                        )}>
                                            {t(`${plan.key}.description`)}
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        {isFree ? (
                                            <div className="text-3xl font-bold text-slate-900 dark:text-white">$0<span className="text-sm font-normal text-slate-500">/mes</span></div>
                                        ) : (
                                            <PriceDisplay amount={plan.amount} period={plan.period} priceId={plan.priceId} className="text-3xl font-bold" />
                                        )}
                                        {isPro && (
                                            <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1" dangerouslySetInnerHTML={{ __html: t.raw('pro.savings_info') }} />
                                        )}
                                        {!isFree && !isPro && (
                                            <p className="text-xs text-teal-600 font-bold mt-1 uppercase tracking-wide">
                                                {t(`${plan.key}.trial`)}
                                            </p>
                                        )}
                                    </div>

                                    <ul className="space-y-3 flex-1 mb-6">
                                        {t.raw(`${plan.key}.features`).map((feature: any, i: number) => (
                                            <li
                                                key={i}
                                                className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                                            >
                                                <Check className={cn(
                                                    "h-4 w-4 mt-0.5 mr-2 shrink-0",
                                                    isPro ? "text-emerald-500" : "text-teal-500"
                                                )} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {/* Excluded features for free plan */}
                                        {plan.hasExcluded && t.raw(`${plan.key}.excluded`)?.map((feature: any, i: number) => (
                                            <li
                                                key={`ex-${i}`}
                                                className="flex items-start text-sm text-slate-400 dark:text-slate-500"
                                            >
                                                <X className="h-4 w-4 mt-0.5 mr-2 shrink-0 text-slate-300 dark:text-slate-600" />
                                                <span className="line-through">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto">
                                        <Button
                                            asChild
                                            className={cn(
                                                "w-full rounded-lg h-10 transition-all shadow-sm hover:shadow-md font-medium",
                                                isClinical
                                                    ? "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20"
                                                    : isPro
                                                        ? "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800"
                                                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 hover:border-teal-300"
                                            )}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Link href={`/onboarding?plan=${plan.key}`}>
                                                {t(`${plan.key}.cta`)}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        )
                    })}
                </div>
            </div>

            {/* Plan Details Modal */}
            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                            {activeDetailsPlan && t(`${activeDetailsPlan}.name`)}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-slate-400">
                            {activeDetailsPlan && t(`${activeDetailsPlan}.description`)}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-6">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Check className="w-5 h-5 text-teal-500" />
                                {t('whats_included')}
                            </h4>
                            <ul className="grid grid-cols-1 gap-3">
                                {activeDetailsPlan && t.raw(`${activeDetailsPlan}.features`).map((feature: any, i: number) => (
                                    <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 mr-3 shrink-0" />
                                        <span className="flex-1">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                                {t('close')}
                            </Button>
                            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                                <Link href={`/onboarding?plan=${activeDetailsPlan}`}>
                                    {activeDetailsPlan && t(`${activeDetailsPlan}.cta`)}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
