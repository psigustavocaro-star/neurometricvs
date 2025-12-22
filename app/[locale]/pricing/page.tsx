
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { PriceDisplay } from "@/components/pricing/price-display"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export default function PricingPage() {
    const tPricing = useTranslations('Pricing')
    const tFAQ = useTranslations('FAQ')

    const plans = [
        {
            key: 'free',
            priceUSD: 0,
            period: '/mes',
            priceId: undefined,
            highlight: false,
            hasExcluded: true,
        },
        {
            key: 'basic',
            priceUSD: 10,
            period: '/mes',
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC,
            highlight: false,
            hasExcluded: false,
        },
        {
            key: 'clinical',
            priceUSD: 15,
            period: '/mes',
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL,
            highlight: true,
            hasExcluded: false,
        },
        {
            key: 'pro',
            priceUSD: 65,
            period: '/año',
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO,
            highlight: false,
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
                <section className="pt-32 pb-16 text-center px-4 relative z-10">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white border border-teal-100 text-xs font-semibold text-teal-600 shadow-sm">
                        Precios Transparentes
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-6">{tPricing('title')}</h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">{tPricing('subtitle')}</p>
                </section>

                {/* Pricing Cards - 4 Columns */}
                <section className="py-12 px-4 container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                        {plans.map((plan) => {
                            const isClinical = plan.key === 'clinical'
                            const isPro = plan.key === 'pro'
                            const isFree = plan.key === 'free'

                            return (
                                <div
                                    key={plan.key}
                                    className={cn(
                                        "flex flex-col p-6 rounded-2xl border transition-all duration-300 relative h-full",
                                        isClinical
                                            ? "bg-white border-teal-500 shadow-xl shadow-teal-500/10"
                                            : isPro
                                                ? "bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200 shadow-lg"
                                                : "bg-white border-slate-200 hover:border-teal-300 hover:shadow-lg"
                                    )}
                                >
                                    {/* Badge */}
                                    {isPro && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                                            {tPricing('pro.savings_badge')}
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
                                        {isPro && (
                                            <p className="text-xs text-teal-600 mt-1 font-medium" dangerouslySetInnerHTML={{ __html: tPricing.raw('pro.savings_info') }} />
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 flex-1 mb-6">
                                        {tPricing.raw(`${plan.key}.features`).map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                <Check className={cn(
                                                    "h-4 w-4 mt-0.5 shrink-0",
                                                    isPro ? "text-emerald-500" : "text-teal-500"
                                                )} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {/* Excluded features for free */}
                                        {plan.hasExcluded && tPricing.raw(`${plan.key}.excluded`)?.map((feature: string, i: number) => (
                                            <li key={`ex-${i}`} className="flex items-start gap-2 text-sm text-slate-400">
                                                <X className="h-4 w-4 mt-0.5 shrink-0 text-slate-300" />
                                                <span className="line-through">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Button
                                        asChild
                                        className={cn(
                                            "w-full",
                                            isClinical
                                                ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20"
                                                : isPro
                                                    ? "bg-slate-900 hover:bg-slate-800 text-white"
                                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-teal-300"
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
