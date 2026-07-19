'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, LockKeyhole } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

const BACKGROUNDS = [
  '#061116',
  '#e2dcd5',
  '#d7e5df',
  '#09181d',
  '#c2eee3',
  '#e2dcd5',
  '#07151b',
  '#b9f4e6',
]

const DARK_SECTIONS = new Set([0, 3, 6])

const CANVAS_STATES = [
  { x: '-18%', y: '-48%', scale: 0.72, rotate: -5 },
  { x: '-22%', y: '-50%', scale: 0.78, rotate: -3 },
  { x: '-19%', y: '-47%', scale: 0.94, rotate: 0 },
  { x: '-11%', y: '-35%', scale: 1.24, rotate: 0 },
  { x: '-15%', y: '-62%', scale: 1.42, rotate: 0 },
  { x: '-80%', y: '-48%', scale: 1.02, rotate: 2 },
  { x: '-8%', y: '-66%', scale: 1.55, rotate: 0 },
  { x: '-50%', y: '-46%', scale: 0.7, rotate: 0 },
]

const TARGET_STATES = [
  { left: '50%', top: '50%' },
  { left: '50%', top: '13%' },
  { left: '29%', top: '54%' },
  { left: '74%', top: '43%' },
  { left: '51%', top: '23%' },
  { left: '86%', top: '77%' },
  { left: '93%', top: '11%' },
  { left: '50%', top: '50%' },
]

interface SnapSection {
  id: string
  index: string
  eyebrow: string
  title: string
  accent: string
  description: string
  metricLabel?: string
  metricValue?: string
  detail?: string
  align?: 'left' | 'right'
}

export default function LandingPage() {
  const t = useTranslations('SnapLanding')
  const sections = t.raw('sections') as SnapSection[]
  const [activeSection, setActiveSection] = useState(0)
  const scrollRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const router = useRouter()

  useEffect(() => {
    ;['/onboarding', '/login', '/pricing', '/features'].forEach((route) =>
      router.prefetch(route),
    )
  }, [router])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-snap-section]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveSection(Number((visible.target as HTMLElement).dataset.snapSection))
        }
      },
      { root, threshold: [0.45, 0.6, 0.75] },
    )

    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (index: number) => {
    const root = scrollRef.current
    const target = root?.querySelector<HTMLElement>(`[data-snap-section="${index}"]`)
    target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  const activeIsDark = DARK_SECTIONS.has(activeSection)
  const canvasState = CANVAS_STATES[activeSection]
  const targetState = TARGET_STATES[activeSection]

  return (
    <motion.div
      animate={{ backgroundColor: BACKGROUNDS[activeSection] }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
      className="relative h-[100svh] w-screen overflow-hidden text-[#13272c]"
    >
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex h-24 items-center justify-between px-5 transition-colors duration-500 sm:px-8 lg:px-12',
          activeIsDark ? 'text-white' : 'text-[#13272c]',
        )}
      >
        <nav className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-[0.24em] md:flex" aria-label={t('nav.label')}>
          <button onClick={() => scrollToSection(0)} className="transition-opacity hover:opacity-55">{t('nav.home')}</button>
          <button onClick={() => scrollToSection(1)} className="transition-opacity hover:opacity-55">{t('nav.system')}</button>
          <button onClick={() => scrollToSection(6)} className="transition-opacity hover:opacity-55">{t('nav.security')}</button>
        </nav>

        <button
          onClick={() => scrollToSection(0)}
          className="absolute left-5 translate-x-0 font-editorial text-lg font-medium tracking-[-0.04em] sm:left-1/2 sm:-translate-x-1/2 sm:text-3xl"
          aria-label="Neurometrics"
        >
          NEUROMETRICS
        </button>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/login" className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-55 sm:block">
            {t('nav.login')}
          </Link>
          <Button
            asChild
            variant="outline"
            className={cn(
              'h-11 rounded-none bg-transparent px-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-none',
              activeIsDark
                ? 'border-white/45 text-white hover:bg-white hover:text-[#07151b]'
                : 'border-[#13272c]/50 text-[#13272c] hover:bg-[#13272c] hover:text-white',
            )}
          >
            <Link href="/onboarding">{t('nav.cta')}</Link>
          </Button>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
        <motion.div
          initial={false}
          animate={{ opacity: activeSection === 0 ? 1 : 0, scale: activeSection === 0 ? 1 : 1.05 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src="/neurometrics-observatory-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[64%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,16,.94)_0%,rgba(3,12,16,.7)_36%,rgba(3,12,16,.08)_72%)]" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: activeSection > 0 && activeSection < 7 ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(19,39,44,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(19,39,44,.14)_1px,transparent_1px)] [background-size:72px_72px]" />
          <motion.div
            initial={false}
            animate={canvasState}
            transition={{ duration: reduceMotion ? 0 : 0.95, ease: EASE }}
            className="absolute left-1/2 top-1/2 aspect-[1425/900] w-[94vw] md:w-[70vw] xl:w-[66vw]"
            style={{ transformPerspective: 1500, transformStyle: 'preserve-3d' }}
          >
            <div className={cn(
              'absolute inset-0 overflow-hidden border shadow-[0_60px_140px_-45px_rgba(3,12,16,.58)]',
              activeIsDark ? 'border-white/20' : 'border-[#13272c]/25',
            )}>
              <Image
                src="/neurometrics-dashboard-real.png"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 94vw, 70vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              <motion.div
                initial={false}
                animate={{ left: targetState.left, top: targetState.top }}
                transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
                className="absolute size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#78ffe3]/80 shadow-[0_0_0_10px_rgba(120,255,227,.08),0_0_35px_rgba(120,255,227,.42)]"
              >
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#78ffe3]/35" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#78ffe3]/35" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <aside className={cn(
        'fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 transition-colors duration-500 md:flex',
        activeIsDark ? 'text-white' : 'text-[#13272c]',
      )} aria-label={t('progress')}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className="group flex items-center gap-3"
            aria-label={section.eyebrow}
            aria-current={activeSection === index ? 'step' : undefined}
          >
            <span className="text-[8px] font-mono opacity-0 transition-opacity group-hover:opacity-60">0{index + 1}</span>
            <span className={cn(
              'block rounded-full transition-all duration-500',
              activeSection === index ? 'h-7 w-1 bg-current' : 'size-1 bg-current opacity-35',
            )} />
          </button>
        ))}
      </aside>

      <main
        ref={scrollRef}
        className="relative z-20 h-full w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth overscroll-y-contain"
      >
        {sections.map((section, index) => {
          const isDark = DARK_SECTIONS.has(index)
          const alignRight = section.align === 'right'
          const isFinal = index === sections.length - 1

          return (
            <section
              key={section.id}
              id={section.id}
              data-snap-section={index}
              className={cn(
                'relative flex min-h-[100svh] snap-start items-center px-5 pb-12 pt-28 sm:px-8 lg:px-14 xl:px-20',
                isDark ? 'text-white' : 'text-[#13272c]',
                alignRight && 'justify-end',
              )}
            >
              <motion.div
                animate={activeSection === index ? { opacity: 1, y: 0 } : { opacity: 0.12, y: activeSection > index ? -36 : 36 }}
                transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
                className={cn(
                  'relative z-30 w-full max-w-xl lg:max-w-[610px]',
                  index > 0 && index < 7 && !alignRight && 'md:max-w-[40vw]',
                  alignRight && 'md:max-w-[39vw]',
                  isFinal && 'max-w-5xl md:max-w-6xl',
                )}
              >
                <div className="mb-7 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.28em] opacity-60">
                  <span>{section.index}</span>
                  <span className="h-px w-10 bg-current" />
                  <span>{section.eyebrow}</span>
                </div>

                <h1 className={cn(
                  'text-balance leading-[0.86] tracking-[-0.065em]',
                  index === 0 || isFinal
                    ? 'text-[clamp(4rem,8.5vw,9.5rem)]'
                    : 'text-[clamp(3.7rem,7vw,7.6rem)]',
                )}>
                  <span className="block font-sans font-black">{section.title}</span>
                  <span className="block font-editorial font-normal italic tracking-[-0.045em]">{section.accent}</span>
                </h1>

                <p className={cn(
                  'mt-8 max-w-lg text-base leading-relaxed sm:text-lg',
                  isDark ? 'text-white/58' : 'text-[#314e54]/72',
                )}>
                  {section.description}
                </p>

                {section.metricValue && (
                  <div className={cn(
                    'mt-10 border-t pt-5',
                    isDark ? 'border-white/20' : 'border-[#13272c]/20',
                  )}>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-55">{section.metricLabel}</div>
                    <div className="mt-2 text-[clamp(3.7rem,7vw,7rem)] font-black leading-none tracking-[-0.07em]">{section.metricValue}</div>
                    {section.detail && <p className="mt-3 max-w-sm text-xs uppercase tracking-[0.15em] opacity-50">{section.detail}</p>}
                  </div>
                )}

                {index === 0 && (
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="h-14 rounded-none bg-[#b9f4e6] px-7 text-xs font-bold uppercase tracking-[0.17em] text-[#07151b] hover:bg-white">
                      <Link href="/onboarding">{t('heroCta')}<ArrowRight className="ml-3 size-4" /></Link>
                    </Button>
                    <button onClick={() => scrollToSection(1)} className="flex h-14 items-center justify-center border border-white/35 px-7 text-xs font-bold uppercase tracking-[0.17em] text-white transition-colors hover:bg-white hover:text-[#07151b]">
                      {t('discover')}<ArrowDown className="ml-3 size-4" />
                    </button>
                  </div>
                )}

                {isFinal && (
                  <div className="mt-10 flex flex-col gap-8 border-t border-[#13272c]/25 pt-7 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#315c5c]">
                      {(t.raw('finalProof') as string[]).map((item) => (
                        <span key={item} className="flex items-center gap-2"><Check className="size-3.5" />{item}</span>
                      ))}
                    </div>
                    <Button asChild className="h-16 shrink-0 rounded-none bg-[#0b2428] px-8 text-xs font-bold uppercase tracking-[0.17em] text-white hover:bg-[#147c70]">
                      <Link href="/onboarding">{t('finalCta')}<ArrowRight className="ml-3 size-4" /></Link>
                    </Button>
                  </div>
                )}
              </motion.div>

              {index === 6 && (
                <div className="absolute bottom-10 right-8 hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45 lg:flex">
                  <LockKeyhole className="size-4 text-[#78ffe3]" />
                  {t('securityNote')}
                </div>
              )}
            </section>
          )
        })}
      </main>
    </motion.div>
  )
}
