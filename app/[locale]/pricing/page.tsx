
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, HelpCircle } from "lucide-react"
import { PriceDisplay } from "@/components/pricing/price-display"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PricingPage() {
    const tPricing = useTranslations('Pricing')
    const tFAQ = useTranslations('FAQ')

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30">
            <VerticalNavbar />
            <main className="flex-1 relative overflow-hidden">
                {/* Background FX */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] mix-blend-screen" />
                </div>

                {/* Hero */}
                <section className="pt-32 pb-16 text-center px-4 relative z-10 border-b border-white/5">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-teal-400">
                        Transparent Pricing
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{tPricing('title')}</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">{tPricing('subtitle')}</p>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 px-4 container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {/* Basic */}
                        <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 group">
                            <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{tPricing('basic.name')}</h3>
                            <p className="text-slate-400 mt-2">{tPricing('basic.description')}</p>
                            <div className="my-6">
                                <div className="text-slate-200 font-bold">$10<span className="text-sm font-normal text-slate-500">/mo</span></div>
                                <p className="text-sm text-teal-400 font-medium mt-1">{tPricing('basic.trial')}</p>
                            </div>
                            <Button asChild variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                <Link href="/onboarding?plan=basic">{tPricing('basic.cta')}</Link>
                            </Button>
                            <ul className="mt-8 space-y-4">
                                {tPricing.raw('basic.features').map((f: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-400">
                                        <Check className="h-5 w-5 text-slate-600 shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Clinical (Highlight) */}
                        <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border-2 border-teal-500/50 shadow-2xl shadow-teal-900/20 relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-teal-900/50 border border-teal-400">
                                {tPricing('clinical.badge')}
                            </div>
                            <h3 className="text-xl font-bold text-white">{tPricing('clinical.name')}</h3>
                            <p className="text-slate-400 mt-2">{tPricing('clinical.description')}</p>
                            <div className="my-6">
                                <div className="text-white font-bold text-4xl">$15<span className="text-lg font-normal text-slate-500">/mo</span></div>
                                <p className="text-sm text-teal-400 font-medium mt-1">{tPricing('clinical.trial')}</p>
                            </div>
                            <Button asChild className="w-full bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/30 border-none">
                                <Link href="/onboarding?plan=clinical">{tPricing('clinical.cta')}</Link>
                            </Button>
                            <ul className="mt-8 space-y-4">
                                {tPricing.raw('clinical.features').map((f: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-300 font-medium">
                                        <Check className="h-5 w-5 text-teal-500 shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pro */}
                        <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{tPricing('pro.name')}</h3>
                                    <p className="text-slate-400 mt-2">{tPricing('pro.description')}</p>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2 py-1 rounded">
                                    {tPricing('pro.savings_badge')}
                                </span>
                            </div>
                            <div className="my-6">
                                <div className="text-slate-200 font-bold">$65<span className="text-sm font-normal text-slate-500">/yr</span></div>
                                <p className="text-sm text-emerald-400 font-medium mt-1" dangerouslySetInnerHTML={{ __html: tPricing.raw('pro.savings_info') }}></p>
                            </div>
                            <Button asChild variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                <Link href="/onboarding?plan=pro">{tPricing('pro.cta')}</Link>
                            </Button>
                            <ul className="mt-8 space-y-4">
                                {tPricing.raw('pro.features').map((f: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-400">
                                        <Check className="h-5 w-5 text-emerald-600 shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-slate-950 border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white">{tPricing('faq_title')}</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {tFAQ.raw('items').map((item: any, i: number) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                                    <AccordionTrigger className="text-left font-medium text-slate-300 hover:text-teal-400 hover:no-underline py-4">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-400 leading-relaxed pb-4">
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
