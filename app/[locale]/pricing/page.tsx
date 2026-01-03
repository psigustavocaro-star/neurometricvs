"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { PriceDisplay } from "@/components/pricing/price-display"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from "@/lib/config"

export default function PricingPage() {
    const tPricing = useTranslations('Pricing')
    const tFAQ = useTranslations('FAQ')
    const [selectedPlan, setSelectedPlan] = useState<string>('clinical')

    const plans = [
        {
            key: 'free',
            priceUSD: 0,
            period: '/mes',
            priceId: undefined,
            hasExcluded: true,
        },
        {
            key: 'basic',
            priceUSD: 10,
            period: '/mes',
            priceId: PRICE_ID_BASIC,
            hasExcluded: false,
        },
        {
            key: 'clinical',
            priceUSD: 15,
            period: '/mes',
            priceId: PRICE_ID_CLINICAL,
            hasExcluded: false,
            popular: true,
        },
        {
            key: 'pro',
            priceUSD: 65,
            period: '/año',
            priceId: PRICE_ID_PRO,
            hasExcluded: false,
            isAnnual: true,
        },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500/30">
            <VerticalNavbar />
            <main className="flex-1 relative overflow-hidden">
                {/* Background FX */}
                <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/80 via-white to-white">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-100/30 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[100px] mix-blend-multiply opacity-60" />
                </div>

                {/* Hero */}
                <section className="pt-40 pb-20 text-center px-4 relative z-10">
                    <ScrollAnimation animation="fade-up">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
                            Precios Transparentes
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 mb-6 tracking-tight">{tPricing('title')}</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">{tPricing('subtitle')}</p>
                    </ScrollAnimation>
                </section>

                {/* Pricing Cards - 4 Columns */}
                <section className="py-12 px-4 container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                        {plans.map((plan) => {
                            const isSelected = selectedPlan === plan.key
                            const isClinical = plan.key === 'clinical'
                            const isPro = plan.key === 'pro'
                            const isFree = plan.key === 'free'

                            return (
                                <div
                                    key={plan.key}
                                    onClick={() => setSelectedPlan(plan.key)}
                                    className={cn(
                                        "flex flex-col p-6 rounded-[2rem] border transition-all duration-300 relative h-full cursor-pointer",
                                        isSelected
                                            ? "bg-white border-teal-500 shadow-2xl shadow-teal-500/10 scale-[1.02] ring-2 ring-teal-500/20"
                                            : isPro
                                                ? "bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200 shadow-lg"
                                                : "bg-white border-slate-200 hover:border-teal-300 hover:shadow-lg"
                                    )}
                                >
                                    {/* Badge */}
                                    {(plan.popular || isPro) && (
                                        <div className={cn(
                                            "absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wider transition-colors",
                                            isSelected ? "bg-teal-600" : "bg-slate-800"
                                        )}>
                                            {isPro ? tPricing('pro.savings_badge') : (tPricing.has(`${plan.key}.badge`) ? tPricing(`${plan.key}.badge`) : null)}
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className="mb-4">
                                        <h3 className={cn(
                                            "text-lg font-bold",
                                            isPro ? "text-teal-900" : "text-slate-900"
                                        )}>
                                            {tPricing(`${plan.key}.name`)}
                                        </h3>
                                        <p className={cn(
                                            "text-xs mt-1",
                                            isPro ? "text-emerald-600 font-semibold" : "text-slate-500"
                                        )}>
                                            {tPricing(`${plan.key}.description`)}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        {isFree ? (
                                            <div className="text-3xl font-bold text-slate-900">$0<span className="text-sm font-normal text-slate-500">/mes</span></div>
                                        ) : (
                                            <PriceDisplay
                                                amount={plan.priceUSD}
                                                period={plan.period}
                                                priceId={plan.priceId}
                                                className="text-3xl font-bold"
                                            />
                                        )}
                                        {tPricing.has(`${plan.key}.trial`) && (
                                            <div className="text-[10px] font-bold text-teal-600 mt-1">{tPricing(`${plan.key}.trial`)}</div>
                                        )}
                                        {isPro && (
                                            <p className="text-[10px] text-teal-600 mt-1 font-medium" dangerouslySetInnerHTML={{ __html: tPricing.raw('pro.savings_info') }} />
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 flex-1 mb-6">
                                        {tPricing.raw(`${plan.key}.features`).map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                <div className={cn(
                                                    "p-0.5 rounded-full mt-0.5 shrink-0",
                                                    isSelected ? "bg-teal-100 text-teal-600" : "bg-slate-50 text-slate-400"
                                                )}>
                                                    <Check className="h-3 w-3" strokeWidth={3} />
                                                </div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {/* Excluded features for free */}
                                        {plan.hasExcluded && Array.isArray(tPricing.raw(`${plan.key}.excluded`)) && tPricing.raw(`${plan.key}.excluded`).map((feature: string, i: number) => (
                                            <li key={`ex-${i}`} className="flex items-start gap-2 text-sm text-slate-400">
                                                <div className="p-0.5 rounded-full mt-0.5 shrink-0 bg-slate-50 text-slate-300">
                                                    <X className="h-3 w-3" strokeWidth={3} />
                                                </div>
                                                <span className="line-through">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Button
                                        asChild
                                        onClick={(e) => e.stopPropagation()}
                                        className={cn(
                                            "w-full rounded-xl h-12 font-bold transition-all",
                                            isSelected
                                                ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20"
                                                : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200"
                                        )}
                                    >
                                        <Link href={`/onboarding?plan=${plan.key}`}>
                                            {tPricing(`${plan.key}.cta`)}
                                        </Link>
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-white/50 backdrop-blur-sm border-t border-slate-100 relative z-10">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900">{tPricing('faq_title')}</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {tFAQ.raw('items').map((item: any, i: number) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-b border-slate-200">
                                    <AccordionTrigger className="text-left font-medium text-slate-700 hover:text-teal-600 hover:no-underline py-4">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-500 leading-relaxed pb-4">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
