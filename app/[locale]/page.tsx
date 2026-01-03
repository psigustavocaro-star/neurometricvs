import Image from "next/image"
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
import { NeurometricaSupportBot } from "@/components/support/neurometrica-support-bot"
import { FluidBackground } from "@/components/ui/fluid-background"

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

      <main className="flex-1 relative transition-colors duration-500">
        <FluidBackground />

        {/* Hero Section */}
        <section id="hero" className="w-full pt-32 md:pt-40 lg:pt-48 pb-24 md:pb-28 overflow-hidden relative bg-transparent transition-colors duration-300">
          <div className="container px-4 md:px-6 relative z-10">

            <div className="grid gap-12 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_700px] items-center">
              <div className="flex flex-col justify-center space-y-8 mt-8 md:-mt-12 lg:-mt-20 items-center text-center lg:items-start lg:text-left">


                <ScrollAnimation animation="fade-up" delay={100}>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl text-foreground drop-shadow-sm text-balance max-w-4xl leading-[1.1]">
                    Ecosistema digital <span className="text-primary italic font-serif">avanzado</span> para <span className="underline decoration-primary/30">especialistas</span> de la salud.
                  </h1>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={200}>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl leading-relaxed text-balance mx-auto lg:mx-0 font-light mt-4">
                    La workstation definitiva para psicólogos, psiquiatras y neurólogos. Centraliza tu práctica clínica con herramientas de precisión y automatización científica.
                  </p>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={300}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
                    <Button asChild size="lg" className="relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-8 h-12 text-base group border-0 transition-all">
                      <Link href="/onboarding">
                        <span className="relative z-10 flex items-center">{tHero('cta_primary')} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                      </Link>
                    </Button>
                    <DemoModal>
                      <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-accent rounded-full px-8 h-12 text-base hover:border-primary/50 transition-all cursor-pointer">
                        {tHero('cta_secondary')}
                      </Button>
                    </DemoModal>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={400}>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 justify-center lg:justify-start">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-primary/50 transition-all hover:scale-110 hover:z-10 relative">
                        <Image src="/assets/v2/female-1.png" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-primary/50 transition-all hover:scale-110 hover:z-10 relative">
                        <Image src="/assets/v2/male-1.png" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-primary/50 transition-all hover:scale-110 hover:z-10 relative">
                        <Image src="/assets/v2/female-2.png" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md ring-2 ring-transparent hover:ring-primary/50 transition-all hover:scale-110 hover:z-10 relative">
                        <Image src="/assets/v2/male-2.png" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <p className="font-medium text-muted-foreground">{tHero('trusted_by')}</p>
                  </div>
                </ScrollAnimation>
              </div>

              <div className="mx-auto lg:mr-0 relative h-[500px] md:h-[600px] w-full max-w-[800px] flex items-center justify-center mt-8 lg:mt-0">
                <ScrollAnimation animation="scale-up" delay={200} duration={0.8} className="w-full h-full flex items-center justify-center">
                  <div className="scale-75 md:scale-75 lg:scale-90 xl:scale-100 transition-transform origin-center">
                    <HeroCarousel />
                  </div>
                </ScrollAnimation>
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-[60px] md:blur-[100px] opacity-20 z-0 pointer-events-none"></div>
              </div>
            </div>
          </div>
          <div className="w-full z-20 flex flex-col items-center justify-center gap-2 mt-12 md:absolute md:bottom-8 md:mt-0">
            <span className="text-sm md:text-base font-medium text-muted-foreground animate-pulse text-center px-4">
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
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">{tTests('title')}</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">{tTests('subtitle')}</p>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">{tFAQ('title')}</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">{tFAQ('subtitle')}</p>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto perspective-1000">
              {Array.isArray(tFAQ.raw('items')) && tFAQ.raw('items').map((faq: any, i: number) => (
                <ScrollAnimation key={i} delay={i * 50}>
                  <Card className="border border-border/50 shadow-md bg-card/80 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:z-50 hover:bg-card hover:border-primary/30 relative group h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{faq.q}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
                <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
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
              <div className="h-14 w-14 rounded-full bg-card border border-border shadow-lg flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all">
                <ArrowUp className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                {tGeneral('back_to_top')}
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <NeurometricaSupportBot />
    </div>
  )
}
