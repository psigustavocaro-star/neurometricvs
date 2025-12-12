
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import { PriceDisplay } from "@/components/pricing/price-display"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PricingPage() {
    const tPricing = useTranslations('Pricing')
    const tFAQ = useTranslations('FAQ')

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <VerticalNavbar />
            <main className="flex-1">
                {/* Hero */}
                <section className="pt-32 pb-16 text-center px-4 bg-white border-b border-slate-100">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{tPricing('title')}</h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">{tPricing('subtitle')}</p>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 px-4 container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {/* Basic */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900">{tPricing('basic.name')}</h3>
                            <p className="text-slate-500 mt-2">{tPricing('basic.description')}</p>
                            <div className="my-6">
                                <PriceDisplay amount={10} priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC} />
                                <p className="text-sm text-teal-600 font-medium mt-1">{tPricing('basic.trial')}</p>
                            </div>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/onboarding?plan=basic">{tPricing('basic.cta')}</Link>
                            </Button>
                            <ul className="mt-8 space-y-4">
                                {tPricing.raw('basic.features').map((f: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                                        <Check className="h-5 w-5 text-green-500 shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Clinical (Highlight) */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-teal-500 relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                {tPricing('clinical.badge')}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{tPricing('clinical.name')}</h3>
                            <p className="text-slate-500 mt-2">{tPricing('clinical.description')}</p>
                            <div className="my-6">
                                <PriceDisplay amount={15} priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL} />
                                <p className="text-sm text-teal-600 font-medium mt-1">{tPricing('clinical.trial')}</p>
                            </div>
                            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                                <Link href="/onboarding?plan=clinical">{tPricing('clinical.cta')}</Link>
                            </Button>
                            <ul className="mt-8 space-y-4">
                                {tPricing.raw('clinical.features').map((f: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-700 font-medium">
                                        <Check className="h-5 w-5 text-teal-600 shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pro */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{tPricing('pro.name')}</h3>
                                    <p className="text-slate-500 mt-2">{tPricing('pro.description')}</p>
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                    {tPricing('pro.savings_badge')}
                                </span>
                            </div>
                            <div className="my-6">
                                <PriceDisplay amount={65} period="/yr" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO} />
                                <p className="text-sm text-teal-600 font-medium mt-1" dangerouslySetInnerHTML={{ __html: tPricing.raw('pro.savings_info') }}></p>
                            </div>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/onboarding?plan=pro">{tPricing('pro.cta')}</Link>
                            </Button>
                            <ul className="mt-8 space-y-4">
                                {tPricing.raw('pro.features').map((f: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                                        <Check className="h-5 w-5 text-green-500 shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-white border-t border-slate-100">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900">{tPricing('faq_title')}</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {tFAQ.raw('items').map((item: any, i: number) => (
                                <AccordionItem key={i} value={`item-${i}`}>
                                    <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-teal-600">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 leading-relaxed">
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
