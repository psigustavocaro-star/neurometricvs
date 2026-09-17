'use client'

import { ArrowRight, FileText, Users, Activity, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/auth/login-modal'
import { FeaturesSection } from '@/components/landing/features-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsMarquee } from '@/components/landing/testimonials-marquee'
import { Footer } from '@/components/layout/footer'
import { NeurometricaSupportBot } from '@/components/support/neurometrica-support-bot'

function ClinicalPreview() {
  return <div className="relative mx-auto w-full max-w-[640px]">
    <div className="absolute -left-5 top-16 hidden h-28 w-28 rounded-full border border-[#b9cbbf] lg:block" />
    <div className="absolute -right-6 bottom-12 hidden h-20 w-20 bg-[#d7a35d] lg:block" />
    <div className="relative overflow-hidden border border-[#1e342f] bg-[#16352f] p-3 shadow-[14px_16px_0_#d7a35d] sm:p-4">
      <div className="flex items-center justify-between border-b border-white/15 pb-3 text-[#f7f4ed]"><div className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"><span className="h-2 w-2 rounded-full bg-[#d7a35d]" /> Neurometrics</div><span className="text-[10px] tracking-widest text-white/55 uppercase">Ficha clínica</span></div>
      <div className="grid gap-3 pt-3 sm:grid-cols-[.9fr_1.5fr]">
        <aside className="bg-[#20453d] p-4 text-[#e7eee9]"><p className="text-[10px] font-bold tracking-[0.16em] text-[#d7a35d] uppercase">Paciente</p><div className="mt-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#d7a35d] text-sm font-bold text-[#16352f]">MG</div><div><p className="text-sm font-semibold">María G.</p><p className="text-xs text-white/55">34 años</p></div></div><div className="mt-7 space-y-3 border-t border-white/10 pt-4 text-xs"><p className="flex items-center justify-between"><span className="text-white/55">Próxima sesión</span><span>Hoy, 16:30</span></p><p className="flex items-center justify-between"><span className="text-white/55">Profesional</span><span>Dra. Rivera</span></p></div><button className="mt-7 flex w-full items-center justify-between border border-white/20 px-3 py-2 text-left text-xs font-medium">Ver perfil <ChevronRight className="h-3.5 w-3.5" /></button></aside>
        <section className="bg-[#f7f4ed] p-4 sm:p-5"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold tracking-[0.15em] text-[#6b776e] uppercase">Sesión 08</p><h3 className="mt-1 font-serif text-xl text-[#16352f]">Seguimiento clínico</h3></div><span className="border border-[#b9cbbf] px-2 py-1 text-[10px] font-semibold text-[#315a50]">EN CURSO</span></div><div className="mt-5 grid grid-cols-3 gap-2">{[['Estado de ánimo', 'Estable'], ['Sueño', '6.5 h'], ['Ansiedad', 'Baja']].map(([label, value]) => <div key={label} className="border-t border-[#b9cbbf] pt-2"><p className="text-[9px] text-[#6b776e]">{label}</p><p className="mt-1 text-xs font-semibold text-[#16352f]">{value}</p></div>)}</div><div className="mt-6 border-t border-[#d5d4ca] pt-4"><p className="text-xs font-semibold text-[#16352f]">Notas de la sesión</p><p className="mt-2 text-xs leading-5 text-[#53635d]">Se observa mayor regulación emocional. Se acuerda continuar con registro de pensamientos y revisar patrones de sueño.</p></div><div className="mt-5 flex gap-2"><span className="bg-[#dce8df] px-2 py-1 text-[10px] font-medium text-[#315a50]">Plan activo</span><span className="bg-[#efe4d2] px-2 py-1 text-[10px] font-medium text-[#89612a]">1 tarea pendiente</span></div></section>
      </div>
    </div>
    <p className="mt-7 text-right text-xs font-medium tracking-[0.14em] text-[#56685f] uppercase">Una jornada clínica, en orden</p>
  </div>
}

export default function LandingPage() {
  const router = useRouter()
  const tHero = useTranslations('Hero')
  const tTests = useTranslations('Testimonials')
  useEffect(() => { ['/onboarding', '/login', '/features', '/pricing'].forEach((route) => router.prefetch(route)) }, [router])

  return <div className="min-h-screen overflow-x-hidden bg-[#f7f4ed] text-[#16352f]"><main>
    <section className="relative overflow-hidden border-b border-[#cfd6cf] pt-32 pb-20 md:pt-40 md:pb-28"><div className="absolute left-0 top-0 h-full w-[34%] border-r border-[#d9ded8]" /><div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_.95fr] lg:items-center lg:px-10"><div className="max-w-2xl"><p className="mb-7 flex items-center gap-3 text-[11px] font-bold tracking-[0.19em] text-[#756342] uppercase"><span className="h-px w-10 bg-[#d7a35d]" /> Plataforma clínica integral</p><h1 className="font-serif text-5xl leading-[.98] tracking-[-0.045em] text-[#16352f] sm:text-6xl lg:text-7xl">{tHero('title')} <em className="font-normal text-[#a66f2c]">personas.</em></h1><p className="mt-8 max-w-xl text-lg leading-8 text-[#506057]">{tHero('subtitle')}</p><div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-13 rounded-none bg-[#16352f] px-7 text-sm font-semibold text-[#f7f4ed] shadow-none hover:bg-[#285044]"><Link href="/onboarding">{tHero('cta_primary')} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><LoginModal><Button variant="outline" size="lg" className="h-13 rounded-none border-[#7b9388] bg-transparent px-7 text-sm font-semibold text-[#16352f] hover:bg-[#e8ece5]">Ingresar a mi espacio</Button></LoginModal></div><div className="mt-12 grid max-w-lg grid-cols-3 border-y border-[#cfd6cf] py-5">{[['50+', 'tests clínicos'], ['1', 'ficha integrada'], ['100%', 'tu información']].map(([number, label]) => <div key={label} className="border-r border-[#cfd6cf] px-3 first:pl-0 last:border-0"><p className="font-serif text-2xl text-[#16352f]">{number}</p><p className="mt-1 text-[10px] font-semibold tracking-[.1em] text-[#687870] uppercase">{label}</p></div>)}</div></div><ClinicalPreview /></div></section>
    <section className="border-b border-[#cfd6cf] bg-[#e7ece4] py-7"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 lg:px-10"><p className="text-xs font-bold tracking-[.15em] text-[#506057] uppercase">Diseñado para la práctica, no para la pantalla</p><div className="flex items-center gap-6 text-xs font-semibold text-[#506057]"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#a66f2c]" /> Registro claro</span><span className="flex items-center gap-2"><Users className="h-4 w-4 text-[#a66f2c]" /> Atención cercana</span><span className="flex items-center gap-2"><Activity className="h-4 w-4 text-[#a66f2c]" /> Decisiones informadas</span></div></div></section>
    <div className="bg-[#f7f4ed]"><FeaturesSection /></div>
    <section id="testimonials" className="border-y border-[#cfd6cf] bg-[#16352f] py-20 text-[#f7f4ed]"><div className="mx-auto max-w-7xl px-6 lg:px-10"><p className="text-[11px] font-bold tracking-[.18em] text-[#d7a35d] uppercase">La práctica primero</p><div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl">{tTests('title')}</h2><p className="max-w-sm text-sm leading-6 text-white/65">{tTests('subtitle')}</p></div><div className="mt-12"><TestimonialsMarquee /></div></div></section>
    <div className="bg-[#f7f4ed]"><PricingSection /></div>
    <section className="bg-[#d7a35d] px-6 py-16 text-[#16352f]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end lg:px-4"><div><p className="text-[11px] font-bold tracking-[.18em] uppercase">Tu consulta merece tiempo</p><h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Vuelve a centrarte en tus pacientes.</h2></div><Button asChild size="lg" className="h-13 rounded-none bg-[#16352f] px-7 text-[#f7f4ed] hover:bg-[#285044]"><Link href="/onboarding">Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></section>
  </main><Footer /><NeurometricaSupportBot /></div>
}
