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
import { DemoModal } from "@/components/landing/demo-modal"
import { FeaturesSection } from "@/components/landing/features-section"
import { PricingSection } from "@/components/landing/pricing-section"

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

      <main className="flex-1 relative bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* Unified Background Grid - Continuous Flow */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-5" />
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-200/20 dark:bg-teal-900/10 blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-normal filter" />
          <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/20 dark:bg-indigo-900/10 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-normal filter" />
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 dark:bg-slate-800/10 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-normal filter" />
        </div>

        {/* Hero Section */}
        <section id="hero" className="w-full pt-10 md:pt-14 lg:pt-20 pb-24 md:pb-28 overflow-hidden relative bg-transparent transition-colors duration-300">
          <div className="container px-4 md:px-6 relative z-10">

            <div className="grid gap-12 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_700px] items-center">
              <div className="flex flex-col justify-center space-y-8 mt-8 md:-mt-12 lg:-mt-20 items-center text-center lg:items-start lg:text-left">


                <ScrollAnimation animation="fade-up" delay={100}>
                  <h1 className="text-4xl font-extrabold dark:font-bold tracking-tight sm:text-5xl xl:text-7xl/none text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] text-balance max-w-3xl">
                    <span dangerouslySetInnerHTML={{ __html: tHero.raw('title') }} />
                  </h1>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={200}>
                  <p className="max-w-[650px] text-slate-600 dark:text-slate-400 md:text-xl leading-relaxed text-balance mx-auto lg:mx-0 font-medium dark:font-light">
                    {tHero('subtitle')}
                  </p>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={300}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
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
        <section id="testimonials" className="w-full py-12 md:py-24 pb-24 md:pb-32 bg-transparent relative overflow-hidden">
          {/* Floating Background Elements - Kept for vibe but transparent wrapper */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-white/40 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-50/40 rounded-full blur-3xl opacity-60"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900 dark:text-white">{tTests('title')}</h2>
                <p className="mt-4 text-slate-500 dark:text-slate-400 md:text-lg">{tTests('subtitle')}</p>
              </div>
            </ScrollAnimation>
            <div className="mt-12">
              <TestimonialsMarquee />
            </div>
          </div>
        </section>



        {/* Pricing Section */}
        <PricingSection />
        {/* FAQ Section */}
        <section id="faq" className="w-full pt-12 md:pt-24 pb-48 md:pb-64 bg-transparent relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900 dark:text-white">{tFAQ('title')}</h2>
                <p className="mt-4 text-slate-500 dark:text-slate-400 md:text-lg">{tFAQ('subtitle')}</p>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto perspective-1000">
              {tFAQ.raw('items').map((faq: any, i: number) => (
                <ScrollAnimation key={i} delay={i * 50}>
                  <Card className="border border-slate-100 dark:border-slate-800 shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:z-50 hover:bg-white dark:hover:bg-slate-900 hover:border-teal-200 dark:hover:border-teal-800 relative group h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">{faq.q}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          {/* Trust Section (Moved) */}
          <section id="trust" className="w-full pt-12 md:pt-16 pb-24 md:pb-28 bg-transparent relative overflow-hidden">
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
