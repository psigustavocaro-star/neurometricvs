"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Check, Info } from "lucide-react"
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
            color: 'slate'
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

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-start max-w-5xl mx-auto perspective-1000">
                    {plans.map((plan, index) => {
                        const isSelected = selectedPlan === plan.key
                        const isClinical = plan.key === 'clinical'

                        return (
                            <ScrollAnimation key={plan.key} delay={index * 150} className="h-full">
                                <div
                                    onClick={() => handleCardClick(plan.key)}
                                    className={cn(
                                        "flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-300 ease-out relative h-full cursor-pointer group",
                                        // Light Mode
                                        "bg-white shadow-xl hover:shadow-2xl",
                                        // Dark Mode: 100% Solid to hide background artifacts
                                        "dark:bg-slate-900 dark:shadow-none",
                                        isSelected
                                            ? "border-teal-500 dark:border-teal-500 ring-1 ring-teal-500 dark:ring-teal-500 z-30"
                                            : cn(
                                                "border-slate-200 dark:border-slate-800",
                                                "hover:border-teal-300 dark:hover:border-slate-700 hover:-translate-y-1"
                                            ),
                                        // Clinical Card tweaks
                                        isClinical && !isSelected && "border-teal-100 dark:border-teal-900/30 md:-translate-y-4 z-10"
                                    )}
                                >
                                    {isClinical && (
                                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-lg border border-teal-400/50 uppercase tracking-wider">
                                            {t('clinical.badge')}
                                        </div>
                                    )}

                                    <div className="space-y-3 text-center mb-6 pt-2">
                                        <div
                                            onClick={(e) => handleTitleClick(e, plan.key)}
                                            className="group/title inline-flex items-center gap-2 justify-center cursor-help transition-opacity hover:opacity-80"
                                        >
                                            <h3 className={cn(
                                                "text-xl font-bold uppercase tracking-wide transition-colors",
                                                isClinical ? "text-2xl text-slate-900 dark:text-white" : "text-slate-800 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400"
                                            )}>
                                                {t(`${plan.key}.name`)}
                                            </h3>
                                            <Info className="w-4 h-4 text-slate-400 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                            {t(`${plan.key}.description`)}
                                        </p>
                                    </div>

                                    <div className={cn("mt-2 text-center pb-8 border-b", isClinical ? "border-teal-50 dark:border-teal-900/30" : "border-slate-50 dark:border-slate-800")}>
                                        <PriceDisplay amount={plan.amount} period={plan.period} priceId={plan.priceId} />
                                        <p className="text-xs text-teal-600 font-bold mt-2 uppercase tracking-wide">
                                            {plan.key === 'pro' ? <span dangerouslySetInnerHTML={{ __html: t.raw('pro.savings_info') }} /> : t(`${plan.key}.trial`)}
                                        </p>
                                    </div>

                                    {plan.key === 'pro' && (
                                        <div className="text-center text-[10px] text-emerald-700 font-extrabold mt-3 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 inline-block mx-auto px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800 uppercase tracking-widest">
                                            {t('pro.savings_badge')}
                                        </div>
                                    )}

                                    <ul className="mt-8 space-y-4 flex-1">
                                        {t.raw(`${plan.key}.features`).map((feature: any, i: number) => (
                                            <li
                                                key={i}
                                                onClick={(e) => { e.stopPropagation(); handleCardClick(plan.key) }}
                                                className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                                            >
                                                {isClinical ? (
                                                    <div className="bg-teal-100/50 dark:bg-teal-900/50 p-0.5 rounded-full mr-3 shrink-0">
                                                        <Check className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
                                                    </div>
                                                ) : (
                                                    <Check className={cn("h-4 w-4 mt-0.5 mr-3 shrink-0", plan.key === 'pro' ? "text-emerald-500" : "text-teal-500")} />
                                                )}
                                                <span className="flex-1">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8">
                                        <Button
                                            asChild
                                            className={cn(
                                                "w-full rounded-xl h-12 transition-all shadow-md hover:shadow-lg font-medium relative overflow-hidden",
                                                isClinical
                                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white border-none shadow-lg shadow-teal-600/20"
                                                    : plan.key === 'pro'
                                                        ? "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
                                                        : "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700"
                                            )}
                                            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
                                        >
                                            <Link href={`/onboarding?plan=${plan.key}`}>
                                                {isClinical ? (
                                                    <>
                                                        <span className="relative z-10 font-bold tracking-wide">{t(`${plan.key}.cta`)}</span>
                                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                                                    </>
                                                ) : t(`${plan.key}.cta`)}
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
