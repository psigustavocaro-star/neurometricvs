'use client'

import { ArrowRight, ChevronRight, FileText, HeartPulse, ShieldCheck, Users } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/auth/login-modal'
import { FeaturesSection } from '@/components/landing/features-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsMarquee } from '@/components/landing/testimonials-marquee'
import { Footer } from '@/components/layout/footer'
import { NeurometricaSupportBot } from '@/components/support/neurometrica-support-bot'

const ease = [0.22, 1, 0.36, 1] as const

function PatientCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`overflow-hidden border border-white/10 bg-[#10342e] shadow-2xl ${compact ? 'w-64' : 'w-full max-w-[660px]'}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[#f4f1e9]">
        <span className="flex items-center gap-2 text-[10px] font-bold tracking-[.18em] uppercase"><i className="h-1.5 w-1.5 rounded-full bg-[#e4af63]" /> Neurometrics</span>
        <span className="text-[9px] tracking-[.15em] text-white/45 uppercase">Sesión clínica</span>
      </div>
      <div className={`grid gap-px bg-white/10 ${compact ? 'grid-cols-1' : 'sm:grid-cols-[.82fr_1.45fr]'}`}>
        <aside className="bg-[#1b443b] p-5 text-[#ecf1eb]">
          <p className="text-[9px] font-bold tracking-[.18em] text-[#e4af63] uppercase">Paciente</p>
          <div className="mt-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e4af63] text-xs font-bold text-[#16342e]">MG</span><div><p className="text-sm font-semibold">María González</p><p className="text-[11px] text-white/50">34 años · Sesión 08</p></div></div>
          <div className="mt-8 space-y-3 border-t border-white/10 pt-4 text-[11px]"><p className="flex justify-between"><span className="text-white/50">Próxima sesión</span><span>Hoy, 16:30</span></p><p className="flex justify-between"><span className="text-white/50">Profesional</span><span>Dra. Rivera</span></p></div>
        </aside>
        <section className="bg-[#f7f4ed] p-5 text-[#14342e] sm:p-6"><div className="flex justify-between"><div><p className="text-[9px] font-bold tracking-[.16em] text-[#6e7b73] uppercase">Seguimiento</p><h3 className="mt-1 font-editorial text-2xl">Una sesión, en contexto.</h3></div><span className="h-fit border border-[#bac7be] px-2 py-1 text-[9px] font-bold text-[#315a50]">EN CURSO</span></div><div className="mt-6 grid grid-cols-3 gap-3">{[['Ánimo', 'Estable'], ['Sueño', '6.5 h'], ['Ansiedad', 'Baja']].map(([label, value]) => <div key={label} className="border-t border-[#cad4cb] pt-2"><p className="text-[9px] text-[#75837a]">{label}</p><p className="mt-1 text-xs font-semibold">{value}</p></div>)}</div><p className="mt-6 border-t border-[#d9ddd7] pt-4 text-xs leading-5 text-[#57665e]">Se observa mayor regulación emocional. Se acuerda continuar con el registro de pensamientos y revisar patrones de sueño.</p><div className="mt-5 flex gap-2"><span className="bg-[#dce8df] px-2 py-1 text-[9px] font-medium text-[#315a50]">Plan activo</span><span className="bg-[#f0e5d2] px-2 py-1 text-[9px] font-medium text-[#8b622c]">1 tarea pendiente</span></div></section>
      </div>
    </div>
  )
}

function ScrollNarrative() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const cardY = useTransform(scrollYProgress, [0, 0.38, 0.75], [80, 0, -52])
  const cardScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.86, 1, 0.94])
  const firstOpacity = useTransform(scrollYProgress, [0, 0.18, 0.31], [1, 1, 0])
  const secondOpacity = useTransform(scrollYProgress, [0.28, 0.45, 0.62], [0, 1, 0])
  const thirdOpacity = useTransform(scrollYProgress, [0.58, 0.75, 1], [0, 1, 1])
  const auraOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.25])
  const insightX = useTransform(scrollYProgress, [0.28, 0.5], [80, 0])
  const shieldX = useTransform(scrollYProgress, [0.58, 0.76], [-80, 0])

  return <section ref={sectionRef} className="relative h-[280vh] bg-[#102f2a] text-[#f7f4ed]">
    <div className="sticky top-0 flex h-screen items-center overflow-hidden">
      <motion.div style={reduceMotion ? undefined : { opacity: auraOpacity }} className="absolute -left-[20vw] top-[8vh] h-[46vw] w-[46vw] rounded-full border border-[#e4af63]/20" />
      <div className="absolute right-0 top-0 h-full w-[35%] border-l border-white/10" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
        <div className="relative min-h-[280px]">
          <motion.div style={reduceMotion ? undefined : { opacity: firstOpacity }} className="absolute inset-0"><p className="text-[11px] font-bold tracking-[.2em] text-[#e4af63] uppercase">01 — Empieza por escuchar</p><h2 className="mt-5 max-w-md font-editorial text-5xl leading-[.94] sm:text-6xl">Menos pestañas. Más presencia.</h2><p className="mt-6 max-w-sm text-base leading-7 text-white/65">Todo lo importante de una persona aparece en el momento justo, sin convertir la consulta en una hoja de cálculo.</p></motion.div>
          <motion.div style={reduceMotion ? undefined : { opacity: secondOpacity }} className="absolute inset-0"><p className="text-[11px] font-bold tracking-[.2em] text-[#e4af63] uppercase">02 — El contexto se ordena</p><h2 className="mt-5 max-w-md font-editorial text-5xl leading-[.94] sm:text-6xl">La historia toma forma.</h2><p className="mt-6 max-w-sm text-base leading-7 text-white/65">Fichas, sesiones, instrumentos y evolución se conectan en un único recorrido clínico.</p></motion.div>
          <motion.div style={reduceMotion ? undefined : { opacity: thirdOpacity }} className="absolute inset-0"><p className="text-[11px] font-bold tracking-[.2em] text-[#e4af63] uppercase">03 — Decide con claridad</p><h2 className="mt-5 max-w-md font-editorial text-5xl leading-[.94] sm:text-6xl">El tiempo vuelve a ser tuyo.</h2><p className="mt-6 max-w-sm text-base leading-7 text-white/65">Automatiza lo repetitivo para dedicar atención a lo que ninguna plataforma puede reemplazar.</p></motion.div>
        </div>
        <div className="relative flex min-h-[400px] items-center justify-center lg:min-h-[520px]">
          <motion.div style={reduceMotion ? undefined : { y: cardY, scale: cardScale }} className="relative z-10 w-full"><PatientCard /></motion.div>
          <motion.div style={reduceMotion ? undefined : { opacity: secondOpacity, x: insightX }} className="absolute -right-5 bottom-6 z-20 hidden w-56 border border-[#d1dfd1] bg-[#f7f4ed] p-5 text-[#16342e] shadow-[14px_14px_0_#e4af63] md:block"><p className="text-[9px] font-bold tracking-[.16em] text-[#8b622c] uppercase">Evolución</p><p className="mt-3 font-editorial text-2xl leading-tight">Una lectura que acompaña.</p><div className="mt-5 flex items-end gap-1">{[35, 48, 41, 70, 58, 82].map((height, index) => <span key={index} className="w-5 bg-[#315a50]" style={{ height }} />)}</div></motion.div>
          <motion.div style={reduceMotion ? undefined : { opacity: thirdOpacity, x: shieldX }} className="absolute -left-5 top-8 z-20 hidden border border-white/15 bg-[#1b443b] px-5 py-4 text-sm shadow-xl md:block"><span className="flex items-center gap-2 text-[#e4af63]"><ShieldCheck className="h-4 w-4" /> Información protegida</span></motion.div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[.2em] text-white/45 uppercase">Desliza para explorar</div>
    </div>
  </section>
}

export default function LandingPage() {
  const router = useRouter()
  const tHero = useTranslations('Hero')
  const tTests = useTranslations('Testimonials')
  const reduceMotion = useReducedMotion()
  useEffect(() => { ['/onboarding', '/login', '/features', '/pricing'].forEach((route) => router.prefetch(route)) }, [router])

  return <div className="min-h-screen overflow-x-hidden bg-[#f7f4ed] text-[#16342e]"><main>
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#eef1eb] pt-28">
      <motion.div animate={reduceMotion ? undefined : { y: [0, -20, 0], rotate: [0, 2, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-[18vw] top-[8vh] h-[65vw] w-[65vw] rounded-full bg-[#d9e6dc]" />
      <motion.div animate={reduceMotion ? undefined : { x: [0, 30, 0], y: [0, 16, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-[12vw] bottom-[-32vw] h-[56vw] w-[56vw] rounded-full border border-[#b8cbbd]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1fr_.92fr] lg:items-center lg:px-10 lg:pb-28">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease }} className="max-w-2xl"><p className="flex items-center gap-3 text-[11px] font-bold tracking-[.2em] text-[#856534] uppercase"><span className="h-px w-10 bg-[#d7a35d]" /> Plataforma clínica integral</p><h1 className="mt-7 font-editorial text-6xl leading-[.9] tracking-[-.045em] sm:text-7xl lg:text-[5.7rem]">{tHero('title')} <em className="font-normal text-[#a56f2d]">personas.</em></h1><p className="mt-8 max-w-xl text-lg leading-8 text-[#55655d]">{tHero('subtitle')}</p><div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-13 rounded-none bg-[#16342e] px-7 text-[#f7f4ed] shadow-none transition-transform hover:-translate-y-1 hover:bg-[#285147]"><Link href="/onboarding">{tHero('cta_primary')} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><LoginModal><Button variant="outline" size="lg" className="h-13 rounded-none border-[#769085] bg-transparent px-7 text-[#16342e] transition-colors hover:bg-white">Ingresar a mi espacio</Button></LoginModal></div></motion.div>
        <motion.div initial={{ opacity: 0, scale: .94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1, delay: .18, ease }} className="relative lg:justify-self-end"><PatientCard /><div className="absolute -bottom-8 -left-4 hidden max-w-56 bg-[#e4af63] p-5 text-[#16342e] shadow-xl sm:block"><HeartPulse className="h-5 w-5" /><p className="mt-4 font-editorial text-xl leading-tight">Una interfaz que baja el ruido.</p></div></motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#c9d4ca]"><div className="mx-auto flex max-w-7xl flex-wrap gap-x-9 gap-y-3 px-6 py-5 text-[10px] font-bold tracking-[.15em] text-[#53665d] uppercase lg:px-10"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#a56f2d]" /> Registro claro</span><span className="flex items-center gap-2"><Users className="h-4 w-4 text-[#a56f2d]" /> Atención cercana</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#a56f2d]" /> Privacidad primero</span></div></div>
    </section>
    <ScrollNarrative />
    <div className="bg-[#f7f4ed]"><FeaturesSection /></div>
    <section id="testimonials" className="bg-[#16342e] py-24 text-[#f7f4ed]"><div className="mx-auto max-w-7xl px-6 lg:px-10"><p className="text-[11px] font-bold tracking-[.2em] text-[#e4af63] uppercase">La práctica primero</p><div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="max-w-xl font-editorial text-5xl leading-[.95] sm:text-6xl">{tTests('title')}</h2><p className="max-w-sm text-sm leading-6 text-white/60">{tTests('subtitle')}</p></div><div className="mt-14"><TestimonialsMarquee /></div></div></section>
    <div className="bg-[#f7f4ed]"><PricingSection /></div>
    <section className="bg-[#e4af63] px-6 py-20 text-[#16342e]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[11px] font-bold tracking-[.18em] uppercase">Tu consulta merece tiempo</p><h2 className="mt-4 max-w-xl font-editorial text-5xl leading-[.95] sm:text-6xl">Vuelve a centrarte en tus pacientes.</h2></div><Button asChild size="lg" className="h-13 rounded-none bg-[#16342e] px-7 text-[#f7f4ed] hover:bg-[#285147]"><Link href="/onboarding">Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></section>
  </main><Footer /><NeurometricaSupportBot /></div>
}
