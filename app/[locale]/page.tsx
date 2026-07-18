'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check, Play, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { TestimonialsMarquee } from "@/components/landing/testimonials-marquee"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { DemoModal } from "@/components/landing/demo-modal"
import { FeaturesSection } from "@/components/landing/features-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { StatsBand } from "@/components/landing/stats-band"
import { CTASection } from "@/components/landing/cta-section"
import { NeuroDivider } from "@/components/landing/neuro-divider"
import { WorkflowSection } from "@/components/landing/workflow-section"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { NeurometricaSupportBot } from "@/components/support/neurometrica-support-bot"
import { ProfessionTextLoop } from "@/components/landing/profession-text-loop"
import { AnimatedWords } from "@/components/motion/animated-words"
import { Magnetic } from "@/components/motion/magnetic"
import { Parallax } from "@/components/motion/parallax"

const EASE = [0.16, 1, 0.3, 1] as const

export default function LandingPage() {
  const tHero = useTranslations('Hero');
  const tTests = useTranslations('Testimonials');
  const tFAQ = useTranslations('FAQ');
  const reduce = useReducedMotion()
  const router = useRouter()

  useEffect(() => {
    // Prefetch critical routes for instant navigation
    const routesToPrefetch = ['/onboarding', '/login', '/features', '/pricing', '/testimonials'];
    routesToPrefetch.forEach(route => router.prefetch(route));
  }, [router]);

  const trustPoints = tHero.raw('trust_points') as string[] | undefined

  // Orchestrated hero entrance
  const heroItem = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 28, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: EASE }
  })

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">
      <ScrollProgress />
      <VerticalNavbar />

      <main className="flex-1 relative bg-transparent">

        {/* Hero Section */}
        <section id="hero" className="w-full pt-32 md:pt-40 lg:pt-44 pb-20 md:pb-28 relative">
          {/* Hairline dot grid, fades out towards edges */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_30%,transparent_75%)]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(100 116 139 / 0.25) 1px, transparent 0)', backgroundSize: '28px 28px' }}
          />

          <div className="container px-4 md:px-6 relative z-10">

            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-8 items-center text-center lg:items-start lg:text-left">

                <motion.div {...heroItem(0)}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-teal-700 dark:text-teal-300 tracking-wide">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {tHero('badge')}
                  </div>
                </motion.div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white text-balance max-w-3xl leading-[1.08]">
                  <AnimatedWords text={tHero('title')} onMount delay={0.15} />{' '}
                  <motion.span {...heroItem(0.6)} className="inline-block">
                    <ProfessionTextLoop />
                  </motion.span>
                </h1>

                <motion.p {...heroItem(0.45)} className="max-w-[600px] text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed text-balance mx-auto lg:mx-0">
                  {tHero('subtitle')}
                </motion.p>

                <motion.div {...heroItem(0.6)}>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto items-center">
                    <Magnetic>
                      <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-slate-900/10 dark:shadow-white/10 group">
                        <Link href="/onboarding">
                          {tHero('cta_primary')}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </Magnetic>
                    <DemoModal>
                      <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-full px-8 h-12 text-base font-medium cursor-pointer">
                        <Play className="mr-2 h-4 w-4 text-teal-600 dark:text-teal-400 fill-current" />
                        {tHero('cta_secondary')}
                      </Button>
                    </DemoModal>
                  </div>
                </motion.div>

                {trustPoints && trustPoints.length > 0 && (
                  <motion.div {...heroItem(0.75)}>
                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-slate-500 dark:text-slate-400">
                      {trustPoints.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" strokeWidth={2.5} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              <Parallax offset={36} className="w-full">
                <ProductShowcase />
              </Parallax>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <StatsBand />

        {/* EEG trace drawn by scroll — brand signature */}
        <NeuroDivider />

        {/* Clinical workflow scrollytelling */}
        <WorkflowSection />

        {/* Features Section (What We Offer) */}
        <FeaturesSection />

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-28 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                  <AnimatedWords text={tTests('title')} />
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{tTests('subtitle')}</p>
              </div>
            </ScrollAnimation>
            <TestimonialsMarquee />
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-28 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollAnimation>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                  <AnimatedWords text={tFAQ('title')} />
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{tFAQ('subtitle')}</p>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {Array.isArray(tFAQ.raw('items')) && tFAQ.raw('items').map((faq: any, i: number) => (
                <ScrollAnimation key={i} delay={i * 50}>
                  <motion.div whileHover={reduce ? undefined : { y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="h-full">
                    <Card className="border border-border/60 shadow-sm bg-card transition-colors hover:border-primary/40 h-full">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection />
      </main>
      <Footer />
      <NeurometricaSupportBot />
    </div>
  )
}
