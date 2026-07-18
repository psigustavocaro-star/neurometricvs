'use client'

import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleCheck,
  LockKeyhole,
  Quote,
} from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/footer"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { PriceDisplay } from "@/components/pricing/price-display"
import { PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from "@/lib/config"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

type PlanKey = "free" | "basic" | "clinical" | "pro"

interface LandingPlan {
  key: PlanKey
  amount: number
  priceId?: string
  featured?: boolean
  annual?: boolean
}

const PLANS: ReadonlyArray<LandingPlan> = [
  { key: "free", amount: 0, priceId: undefined },
  { key: "basic", amount: 10, priceId: PRICE_ID_BASIC },
  { key: "clinical", amount: 15, priceId: PRICE_ID_CLINICAL, featured: true },
  { key: "pro", amount: 65, priceId: PRICE_ID_PRO, annual: true },
]

export default function LandingPage() {
  const t = useTranslations("Landing")
  const tPricing = useTranslations("Pricing")
  const tFaq = useTranslations("FAQ")
  const tWorkflow = useTranslations("Workflow")
  const tTestimonial = useTranslations("TestimonialsList.0")
  const reduceMotion = useReducedMotion()
  const router = useRouter()

  useEffect(() => {
    ;["/onboarding", "/login", "/features", "/pricing"].forEach((route) =>
      router.prefetch(route),
    )
  }, [router])

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.85, delay, ease: EASE },
  })

  const capabilities = t.raw("platform.capabilities") as Array<{
    title: string
    description: string
  }>
  const proof = t.raw("hero.proof") as string[]
  const faqItems = tFaq.raw("items") as Array<{ q: string; a: string }>
  const workflowSteps = tWorkflow.raw("steps") as Array<{
    title: string
    desc: string
  }>

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f2efe7] text-[#101c22]">
      <ScrollProgress />

      <main>
        <section
          id="hero"
          className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#07151b] text-white"
        >
          <motion.div
            aria-hidden
            initial={reduceMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="/neurometrics-observatory-hero.png"
              alt="Profesional clínica usando el dashboard real de Neurometrics"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[66%_center]"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,16,.94)_0%,rgba(3,12,16,.8)_28%,rgba(3,12,16,.18)_67%,rgba(3,12,16,.18)_100%)] max-md:bg-[linear-gradient(0deg,rgba(3,12,16,.96)_0%,rgba(3,12,16,.45)_75%,rgba(3,12,16,.28)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.15),transparent_28%,rgba(0,0,0,.38))]"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-8 pt-36 sm:px-8 md:pb-10 lg:px-14 xl:px-20">
            <div className="max-w-[850px] pb-10 md:pb-14">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8d9cf] sm:text-xs"
              >
                <span className="h-px w-10 bg-[#67d5c1]" />
                {t("hero.eyebrow")}
              </motion.div>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.28, ease: EASE }}
                className="max-w-[780px] text-balance text-[clamp(3.7rem,8vw,8.4rem)] font-medium leading-[0.82] tracking-[-0.065em]"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.48, ease: EASE }}
                className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg md:text-xl"
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.64, ease: EASE }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-none bg-[#b9f4e6] px-7 text-sm font-semibold text-[#07151b] shadow-none transition-colors hover:bg-white"
                >
                  <Link href="/onboarding">
                    {t("hero.primary")}
                    <ArrowRight className="ml-3 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-none border-white/35 bg-transparent px-7 text-sm font-medium text-white shadow-none hover:border-white hover:bg-white hover:text-[#07151b]"
                >
                  <a href="#platform">
                    {t("hero.secondary")}
                    <ArrowDownRight className="ml-3 size-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid border-t border-white/20 sm:grid-cols-3"
            >
              {proof.map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "flex items-center gap-3 border-white/20 py-4 text-xs font-medium uppercase tracking-[0.16em] text-white/65 sm:px-5",
                    index > 0 && "sm:border-l",
                    index === 0 && "sm:pl-0",
                  )}
                >
                  <CircleCheck className="size-4 text-[#67d5c1]" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f2efe7] px-5 py-28 sm:px-8 md:py-40 lg:px-14 xl:px-20">
          <div className="mx-auto max-w-[1460px]">
            <motion.div {...reveal()} className="grid gap-12 lg:grid-cols-[0.34fr_1fr] lg:gap-24">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#567078]">
                  {t("manifesto.index")}
                </p>
              </div>
              <div>
                <p className="mb-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#147c70]">
                  {t("manifesto.eyebrow")}
                </p>
                <h2 className="max-w-[1100px] font-editorial text-[clamp(3.4rem,6.6vw,7.2rem)] font-normal leading-[0.92] tracking-[-0.045em] text-[#10262c]">
                  {t("manifesto.title")}
                </h2>
                <div className="mt-12 grid gap-8 border-t border-[#17343b]/20 pt-8 md:grid-cols-2 md:gap-16">
                  <p className="max-w-xl text-lg leading-relaxed text-[#385159]">
                    {t("manifesto.description")}
                  </p>
                  <p className="max-w-lg text-sm leading-relaxed text-[#5e747a] md:justify-self-end">
                    {t("manifesto.note")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="platform" className="relative bg-[#07151b] px-5 py-28 text-white sm:px-8 md:py-40 lg:px-14 xl:px-20">
          <div aria-hidden className="observatory-orbit observatory-orbit--one" />
          <div aria-hidden className="observatory-orbit observatory-orbit--two" />
          <div className="relative mx-auto max-w-[1460px]">
            <motion.div {...reveal()} className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
                {t("platform.index")}
              </p>
              <div className="max-w-5xl">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#67d5c1]">
                  {t("platform.eyebrow")}
                </p>
                <h2 className="font-editorial text-[clamp(3.6rem,7vw,7.5rem)] font-normal leading-[0.9] tracking-[-0.045em]">
                  {t("platform.title")}
                </h2>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/55">
                  {t("platform.description")}
                </p>
              </div>
            </motion.div>

            <motion.figure {...reveal(0.08)} className="mt-16 md:mt-24">
              <div className="relative overflow-hidden border border-white/15 bg-[#030b10] shadow-[0_60px_160px_-70px_rgba(36,215,190,.38)]">
                <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35 sm:px-6">
                  <span>Neurometrics / Clinical OS</span>
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#67d5c1] shadow-[0_0_12px_rgba(103,213,193,.75)]" />
                    {t("platform.live")}
                  </span>
                </div>
                <Image
                  src="/neurometrics-dashboard-real.png"
                  alt="Dashboard real de Neurometrics"
                  width={1425}
                  height={900}
                  sizes="(max-width: 1536px) 100vw, 1460px"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 flex flex-col justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-white/35 sm:flex-row">
                <span>{t("platform.caption")}</span>
                <span>{t("platform.privacy")}</span>
              </figcaption>
            </motion.figure>

            <div className="mt-20 border-t border-white/15 md:mt-28">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  {...reveal(index * 0.04)}
                  className="group grid gap-5 border-b border-white/15 py-9 transition-colors hover:bg-white/[0.025] md:grid-cols-[120px_0.72fr_1fr] md:items-baseline md:py-12"
                >
                  <span className="font-mono text-xs text-[#67d5c1]">0{index + 1}</span>
                  <h3 className="text-2xl font-medium tracking-[-0.035em] md:text-4xl">
                    {capability.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
                    {capability.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#b9f4e6] px-5 py-28 text-[#0b2428] sm:px-8 md:py-40 lg:px-14 xl:px-20">
          <div className="mx-auto max-w-[1460px]">
            <motion.div {...reveal()} className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#245c5a]">
                {t("workflow.index")}
              </p>
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#147c70]">
                  {t("workflow.eyebrow")}
                </p>
                <h2 className="max-w-5xl font-editorial text-[clamp(3.4rem,6.8vw,7.2rem)] font-normal leading-[0.9] tracking-[-0.045em]">
                  {t("workflow.title")}
                </h2>
              </div>
            </motion.div>

            <div className="mt-20 border-t border-[#0b2428]/25 md:mt-28">
              {workflowSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  {...reveal(index * 0.05)}
                  className="grid gap-5 border-b border-[#0b2428]/25 py-10 md:grid-cols-[120px_0.72fr_1fr] md:items-start md:py-14"
                >
                  <span className="font-mono text-xs text-[#147c70]">0{index + 1}</span>
                  <h3 className="max-w-lg text-3xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                    {step.title}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-[#315c5c] md:text-lg">
                    {step.desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative min-h-[82svh] overflow-hidden bg-[#151d1d] text-white">
          <Image
            src="/neurometrics-clinical-presence.png"
            alt="Profesional clínica conversando con una paciente"
            fill
            sizes="100vw"
            className="object-cover object-[45%_center]"
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,16,17,.06)_20%,rgba(4,16,17,.38)_55%,rgba(4,16,17,.94)_100%)] max-lg:bg-[linear-gradient(0deg,rgba(4,16,17,.94)_0%,rgba(4,16,17,.08)_70%)]" />
          <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-[1600px] items-end justify-end px-5 py-14 sm:px-8 md:py-20 lg:items-center lg:px-14 xl:px-20">
            <motion.div {...reveal()} className="max-w-xl lg:w-[42%]">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9f4e6]">
                {t("presence.eyebrow")}
              </p>
              <h2 className="font-editorial text-[clamp(3.25rem,5.6vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.045em]">
                {t("presence.title")}
              </h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
                {t("presence.description")}
              </p>
              <div className="mt-10 flex items-start gap-4 border-t border-white/25 pt-6 text-xs uppercase tracking-[0.16em] text-white/55">
                <LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#b9f4e6]" />
                {t("presence.note")}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="testimonials" className="bg-[#f2efe7] px-5 py-28 sm:px-8 md:py-40 lg:px-14 xl:px-20">
          <motion.div {...reveal()} className="mx-auto max-w-[1200px] text-center">
            <Quote className="mx-auto size-8 text-[#147c70]" strokeWidth={1.3} />
            <blockquote className="mt-9 font-editorial text-[clamp(2.7rem,5vw,5.6rem)] font-normal leading-[1.02] tracking-[-0.04em] text-[#10262c]">
              “{tTestimonial("text")}”
            </blockquote>
            <div className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#587078]">
              {tTestimonial("name")} · {tTestimonial("role")}
            </div>
          </motion.div>
        </section>

        <section id="pricing" className="bg-[#10262c] px-5 py-28 text-white sm:px-8 md:py-40 lg:px-14 xl:px-20">
          <div className="mx-auto max-w-[1460px]">
            <motion.div {...reveal()} className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/35">
                {t("pricing.index")}
              </p>
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#67d5c1]">
                  {t("pricing.eyebrow")}
                </p>
                <h2 className="max-w-5xl font-editorial text-[clamp(3.4rem,6.8vw,7.2rem)] font-normal leading-[0.9] tracking-[-0.045em]">
                  {t("pricing.title")}
                </h2>
              </div>
            </motion.div>

            <div className="mt-20 grid border-y border-white/15 md:mt-28 md:grid-cols-2 xl:grid-cols-4">
              {PLANS.map((plan, index) => {
                const features = tPricing.raw(`${plan.key}.features`) as string[]
                return (
                  <motion.article
                    key={plan.key}
                    {...reveal(index * 0.05)}
                    className={cn(
                      "relative flex min-h-[520px] flex-col border-white/15 px-6 py-9 md:px-8 md:py-11",
                      index > 0 && "xl:border-l",
                      index % 2 === 1 && "md:border-l",
                      index > 1 && "border-t xl:border-t-0",
                      plan.featured && "bg-[#b9f4e6] text-[#0b2428]",
                    )}
                  >
                    {plan.featured && (
                      <span className="absolute right-6 top-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#147c70]">
                        {tPricing("clinical.badge")}
                      </span>
                    )}
                    <p className={cn("font-mono text-[10px]", plan.featured ? "text-[#147c70]" : "text-white/35")}>
                      0{index + 1}
                    </p>
                    <h3 className="mt-10 text-2xl font-medium tracking-[-0.04em]">
                      {tPricing(`${plan.key}.name`)}
                    </h3>
                    <p className={cn("mt-2 text-sm", plan.featured ? "text-[#315c5c]" : "text-white/45")}>
                      {tPricing(`${plan.key}.description`)}
                    </p>
                    <div className="mt-8 flex items-baseline gap-1">
                      {plan.amount === 0 ? (
                        <span className="text-5xl font-medium tracking-[-0.06em]">$0</span>
                      ) : (
                        <PriceDisplay
                          amount={plan.amount}
                          period={plan.annual ? tPricing("year") : tPricing("month")}
                          priceId={plan.priceId}
                          className="text-5xl font-medium tracking-[-0.06em]"
                        />
                      )}
                    </div>
                    <ul className="mt-10 space-y-4">
                      {features.slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className={cn("flex gap-3 text-sm leading-relaxed", plan.featured ? "text-[#244d4d]" : "text-white/60")}
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-[#36a894]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/onboarding?plan=${plan.key}`}
                      className={cn(
                        "mt-auto flex items-center justify-between border-t pt-5 text-xs font-bold uppercase tracking-[0.16em] transition-colors",
                        plan.featured
                          ? "border-[#0b2428]/20 text-[#0b2428] hover:text-[#147c70]"
                          : "border-white/15 text-white hover:text-[#67d5c1]",
                      )}
                    >
                      {tPricing(`${plan.key}.cta`)}
                      <ArrowRight className="size-4" />
                    </Link>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f2efe7] px-5 py-28 sm:px-8 md:py-40 lg:px-14 xl:px-20">
          <div className="mx-auto max-w-[1460px]">
            <motion.div {...reveal()} className="grid gap-14 lg:grid-cols-[0.55fr_1fr] lg:gap-28">
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#147c70]">
                  {t("faq.eyebrow")}
                </p>
                <h2 className="font-editorial text-[clamp(3.5rem,6vw,6.8rem)] font-normal leading-[0.9] tracking-[-0.045em] text-[#10262c]">
                  {t("faq.title")}
                </h2>
              </div>
              <div className="border-t border-[#17343b]/20">
                {faqItems.slice(0, 6).map((faq, index) => (
                  <details key={faq.q} className="group border-b border-[#17343b]/20 py-6 open:pb-8">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium tracking-[-0.025em] text-[#10262c] marker:hidden md:text-xl">
                      <span className="flex gap-5">
                        <span className="mt-1 font-mono text-[10px] text-[#147c70]">0{index + 1}</span>
                        {faq.q}
                      </span>
                      <span className="mt-1 text-2xl font-light leading-none text-[#147c70] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-2xl pl-10 pt-5 text-sm leading-relaxed text-[#587078] md:text-base">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#b9f4e6] px-5 py-28 text-[#0b2428] sm:px-8 md:py-40 lg:px-14 xl:px-20">
          <div aria-hidden className="observatory-signal" />
          <motion.div {...reveal()} className="relative mx-auto max-w-[1460px]">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#147c70]">
              {t("final.eyebrow")}
            </p>
            <h2 className="max-w-[1250px] font-editorial text-[clamp(4rem,8vw,9rem)] font-normal leading-[0.84] tracking-[-0.055em]">
              {t("final.title")}
            </h2>
            <div className="mt-12 flex flex-col justify-between gap-8 border-t border-[#0b2428]/25 pt-8 md:flex-row md:items-center">
              <p className="max-w-xl text-base leading-relaxed text-[#315c5c] md:text-lg">
                {t("final.description")}
              </p>
              <Button
                asChild
                size="lg"
                className="h-16 shrink-0 rounded-none bg-[#0b2428] px-8 text-sm font-semibold text-white shadow-none hover:bg-[#147c70]"
              >
                <Link href="/onboarding">
                  {t("final.cta")}
                  <ArrowRight className="ml-3 size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
