import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { ArrowRight, Check, ChevronDown, Menu, X, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoginModal } from "@/components/auth/login-modal"
import { HeroCarousel } from "@/components/landing/hero-carousel"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { TestimonialsMarquee } from "@/components/landing/testimonials-marquee"
import { InstitutionsMarquee } from "@/components/landing/institutions-marquee"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { PriceDisplay } from "@/components/pricing/price-display"
import { DemoModal } from "@/components/landing/demo-modal"
import { FeaturesSection } from "@/components/landing/features-section"

export default function LandingPage() {
  const tHero = useTranslations('Hero');
  const tMobile = useTranslations('MobileSection');
  const tTests = useTranslations('Testimonials');
  const tTrust = useTranslations('Trust');
  const tPricing = useTranslations('Pricing');
  const tFAQ = useTranslations('FAQ');
  const tNav = useTranslations('Navbar');
  const tGeneral = useTranslations('General');


  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">
      <VerticalNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="w-full pt-10 md:pt-14 lg:pt-20 pb-24 md:pb-28 overflow-hidden relative">
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white">
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-teal-100/40 blur-[120px] animate-mesh mix-blend-multiply"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-100/40 blur-[100px] animate-mesh animation-delay-2000 mix-blend-multiply"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">

            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-6 xl:grid-cols-[1fr_700px] items-center">
              <div className="flex flex-col justify-center space-y-4 mt-8 md:-mt-24 lg:-mt-32 items-center text-center lg:items-start lg:text-left">


                <ScrollAnimation animation="fade-up" delay={100}>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none text-slate-900 drop-shadow-sm text-balance">
                    <span dangerouslySetInnerHTML={{ __html: tHero.raw('title') }} />
                  </h1>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={200}>
                  <p className="max-w-[700px] text-slate-600 md:text-xl leading-relaxed text-balance mx-auto lg:mx-0">
                    {tHero('subtitle')}
                  </p>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={300}>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button asChild size="lg" className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-lg shadow-teal-700/20 rounded-full px-8 h-12 text-base group">
                      <Link href="/onboarding">
                        <span className="relative z-10 flex items-center">{tHero('cta_primary')} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                      </Link>
                    </Button>
                    <DemoModal>
                      <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-teal-50 rounded-full px-8 h-12 text-base hover:border-teal-200 transition-all cursor-pointer">
                        {tHero('cta_secondary')}
                      </Button>
                    </DemoModal>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={400}>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-4 justify-center lg:justify-start">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/female-1.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/male-1.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/female-2.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-teal-100 transition-all hover:scale-110 hover:z-10">
                        <img src="/assets/v2/male-2.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <p className="font-medium text-slate-600">{tHero('trusted_by')}</p>
                  </div>
                </ScrollAnimation>
              </div>

              <div className="mx-auto lg:mr-0 relative h-[500px] md:h-[800px] w-full max-w-[800px] flex items-center justify-center mt-8 lg:mt-0">
                <ScrollAnimation animation="scale-up" delay={200} duration={0.8} className="w-full h-full flex items-center justify-center">
                  <div className="scale-75 md:scale-90 xl:scale-100 transition-transform origin-center">
                    <HeroCarousel />
                  </div>
                </ScrollAnimation>
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-[60px] md:blur-[100px] opacity-20 z-0 pointer-events-none"></div>
              </div>
            </div>
          </div>
          <div className="w-full z-20 flex flex-col items-center justify-center gap-2 mt-12 md:absolute md:bottom-8 md:mt-0">
            <span className="text-sm md:text-base font-medium text-slate-500 animate-pulse text-center px-4">
              {tGeneral('discover_services')}
            </span>
          </div>
        </section>

        {/* Features Section (What We Offer) */}
        <FeaturesSection />

        {/* Testimonials Section (Relatos) */}
        <section id="testimonials" className="w-full py-12 md:py-24 pb-24 md:pb-32 bg-slate-50/50 relative overflow-hidden">
          {/* Floating Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-white rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">{tTests('title')}</h2>
                <p className="mt-4 text-slate-500 md:text-lg">{tTests('subtitle')}</p>
              </div>
            </ScrollAnimation>
            <div className="mt-12">
              <TestimonialsMarquee />
            </div>
          </div>
        </section>



        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 pb-24 md:pb-32 bg-slate-50/50 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">{tPricing('title')}</h2>
                  <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {tPricing('subtitle')}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-start max-w-5xl mx-auto perspective-1000">
              {/* Plan Básico */}
              <ScrollAnimation delay={0} className="h-full">
                <div className="flex flex-col p-6 bg-white shadow-lg rounded-2xl border border-slate-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-50 hover:border-teal-200 relative h-full group">
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{tPricing('basic.name')}</h3>
                    <p className="text-slate-500 text-sm">{tPricing('basic.description')}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <PriceDisplay amount={10} priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC} />
                    <p className="text-xs text-teal-600 font-semibold mt-1">{tPricing('basic.trial')}</p>
                  </div>
                  <ul className="mt-8 space-y-4 flex-1">
                    {tPricing.raw('basic.features').map((feature: any, i: number) => (
                      <li key={i} className="flex items-center text-sm text-slate-600">
                        <div className="bg-green-100 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-green-600" /></div> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl h-12 transition-all shadow-md hover:shadow-lg">
                      <Link href="/onboarding?plan=basic">{tPricing('basic.cta')}</Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Plan Clínico */}
              <ScrollAnimation delay={150} className="h-full z-10">
                <div className="flex flex-col p-6 bg-white shadow-2xl rounded-2xl border-2 border-teal-600 transform md:-translate-y-4 relative z-10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_20px_50px_rgba(15,118,110,0.2)] hover:z-50 h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    {tPricing('clinical.badge')}
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-900">{tPricing('clinical.name')}</h3>
                    <p className="text-slate-500 text-sm">{tPricing('clinical.description')}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <PriceDisplay amount={15} priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL} />
                    <p className="text-xs text-teal-600 font-semibold mt-1">{tPricing('clinical.trial')}</p>
                  </div>
                  <ul className="mt-8 space-y-4 flex-1">
                    {tPricing.raw('clinical.features').map((feature: any, i: number) => (
                      <li key={i} className="flex items-center text-sm text-slate-700 font-medium">
                        <div className="bg-teal-50 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-teal-700" /></div> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white border-none rounded-xl h-12 shadow-lg shadow-teal-600/30 relative overflow-hidden group">
                      <Link href="/onboarding?plan=clinical">
                        <span className="relative z-10">{tPricing('clinical.cta')}</span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Plan Pro */}
              <ScrollAnimation delay={300} className="h-full">
                <div className="flex flex-col p-6 bg-white shadow-lg rounded-2xl border border-slate-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-50 hover:border-teal-200 relative h-full group">
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{tPricing('pro.name')}</h3>
                    <p className="text-slate-500 text-sm">{tPricing('pro.description')}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <PriceDisplay amount={65} period="/año" priceId={process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO} />
                    <p className="text-xs text-teal-600 font-semibold mt-1"> <span dangerouslySetInnerHTML={{ __html: tPricing.raw('pro.savings_info') }} /></p>
                  </div>
                  <div className="text-center text-xs text-green-600 font-bold mt-2 bg-green-50 inline-block mx-auto px-2 py-1 rounded-md">
                    {tPricing('pro.savings_badge')}
                  </div>
                  <ul className="mt-8 space-y-4 flex-1">
                    {tPricing.raw('pro.features').map((feature: any, i: number) => (
                      <li key={i} className="flex items-center text-sm text-slate-600">
                        <div className="bg-green-100 p-1 rounded-full mr-3"><Check className="h-3 w-3 text-green-600" /></div> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 rounded-xl h-12 transition-all shadow-sm hover:shadow-md">
                      <Link href="/onboarding?plan=pro">{tPricing('pro.cta')}</Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section id="faq" className="w-full pt-12 md:pt-24 pb-48 md:pb-64 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">{tFAQ('title')}</h2>
                <p className="mt-4 text-slate-500 md:text-lg">{tFAQ('subtitle')}</p>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto perspective-1000">
              {tFAQ.raw('items').map((faq: any, i: number) => (
                <ScrollAnimation key={i} delay={i * 50}>
                  <Card className="border border-slate-100 shadow-md bg-slate-50 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:z-50 hover:bg-white hover:border-teal-200 relative group h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          {/* Trust Section (Moved) */}
          <section id="trust" className="w-full pt-12 md:pt-16 pb-24 md:pb-28 bg-white relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
              <ScrollAnimation animation="fade-in">
                <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
                  {tTrust('label')}
                </p>
                <div className="mt-8">
                  <InstitutionsMarquee />
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* Back to Top Indicator */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center z-20">
            <Link
              href="#hero"
              className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-14 w-14 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center group-hover:border-teal-300 group-hover:shadow-teal-100/50 transition-all">
                <ArrowUp className="h-6 w-6 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
              <span className="text-xs font-medium text-slate-400 group-hover:text-teal-600 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                {tGeneral('back_to_top')}
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
