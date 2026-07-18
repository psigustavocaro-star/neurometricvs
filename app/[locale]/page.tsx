'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check, Play, ShieldCheck, Activity, LockKeyhole, Sparkles } from "lucide-react"
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
import { CinematicClinicalSection } from "@/components/landing/cinematic-clinical-section"
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
        <section id="hero" className="landing-hero w-full pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24 relative isolate">
          <div aria-hidden className="landing-hero__aurora" />
          <div aria-hidden className="landing-grid absolute inset-0 pointer-events-none" />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-5xl flex flex-col items-center text-center">

                <motion.div {...heroItem(0)}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-teal-200/60 dark:border-white/10 bg-white/70 dark:bg-white/[0.055] backdrop-blur-xl text-xs font-semibold text-teal-800 dark:text-teal-200 tracking-wide shadow-[0_8px_30px_rgba(8,145,178,0.08)]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {tHero('badge')}
                  </div>
                </motion.div>

                <h1 className="mt-8 text-[clamp(3rem,7vw,6.8rem)] font-semibold tracking-[-0.055em] text-slate-950 dark:text-white text-balance max-w-5xl leading-[0.92]">
                  <AnimatedWords text={tHero('title')} onMount delay={0.15} />{' '}
                  <motion.span {...heroItem(0.6)} className="inline-block text-gradient-clinical">
                    <ProfessionTextLoop />
                  </motion.span>
                </h1>

                <motion.p {...heroItem(0.45)} className="mt-8 max-w-2xl text-slate-600 dark:text-slate-300/80 text-lg md:text-xl leading-relaxed text-balance">
                  {tHero('subtitle')}
                </motion.p>

                <motion.div {...heroItem(0.6)} className="mt-9">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto items-center">
                    <Magnetic>
                      <Button asChild size="lg" className="bg-slate-950 hover:bg-slate-800 dark:bg-teal-300 dark:hover:bg-teal-200 text-white dark:text-slate-950 rounded-full px-8 h-13 text-base font-semibold shadow-[0_14px_45px_-14px_rgba(15,23,42,0.55)] dark:shadow-[0_14px_45px_-14px_rgba(94,234,212,0.55)] group">
                        <Link href="/onboarding">
                          {tHero('cta_primary')}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </Magnetic>
                    <DemoModal>
                      <Button variant="outline" size="lg" className="border-slate-300/80 dark:border-white/15 bg-white/45 dark:bg-white/[0.04] backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/[0.08] rounded-full px-8 h-13 text-base font-medium cursor-pointer">
                        <Play className="mr-2 h-4 w-4 text-teal-600 dark:text-teal-400 fill-current" />
                        {tHero('cta_secondary')}
                      </Button>
                    </DemoModal>
                  </div>
                </motion.div>

                {trustPoints && trustPoints.length > 0 && (
                  <motion.div {...heroItem(0.75)} className="mt-7">
                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center text-sm text-slate-500 dark:text-slate-400">
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

            <motion.div {...heroItem(0.82)} className="mt-12 md:mt-16 relative max-w-6xl mx-auto">
              <div className="hidden xl:flex absolute -left-20 top-24 z-20 clinical-float-card items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300"><Activity className="size-4" /></span>
                <div><span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">{tHero('monitoring_label')}</span><span className="text-sm font-semibold text-white">{tHero('monitoring_value')}</span></div>
              </div>
              <div className="hidden xl:flex absolute -right-20 bottom-20 z-20 clinical-float-card items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-cyan-400/15 text-cyan-300"><LockKeyhole className="size-4" /></span>
                <div><span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">{tHero('protection_label')}</span><span className="text-sm font-semibold text-white">{tHero('protection_value')}</span></div>
              </div>
              <div className="absolute left-1/2 -top-5 -translate-x-1/2 z-20 hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-[11px] font-semibold text-teal-200 shadow-2xl backdrop-blur-xl">
                <Sparkles className="size-3.5" /> {tHero('platform_label')}
              </div>
              <Parallax offset={28} className="w-full">
                <ProductShowcase />
              </Parallax>
            </motion.div>
          </div>
        </section>

        {/* Metrics */}
        <StatsBand />

        {/* EEG trace drawn by scroll — brand signature */}
        <NeuroDivider />

        {/* Clinical workflow scrollytelling */}
        <WorkflowSection />

        {/* Human layer: original editorial image + real platform capabilities */}
        <CinematicClinicalSection />

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
