'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { User } from '@supabase/supabase-js'
import {
    Activity, BookOpen, ChevronRight, CircleHelp, Command, Globe2,
    LayoutDashboard, LogOut, Menu, Search, UserCircle, Users, X,
} from 'lucide-react'
import { cn, getUserDisplayData } from '@/lib/utils'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LanguageToggle } from '@/components/layout/language-toggle'
import { NeurometricaSupportBot } from '@/components/support/neurometrica-support-bot'
import { WelcomeTour } from '@/components/dashboard/welcome-tour'
import { UpgradePopup } from '@/components/dashboard/upgrade-popup'
import { createClient } from '@/lib/supabase/client'
import { AdminTools } from '@/components/admin/admin-tools'
import { useAdminStore } from '@/lib/stores/admin-store'
import { useAggressivePrefetch, usePrefetchOnHover } from '@/lib/hooks/use-prefetch'
import { useInstantTransition, InstantLink } from '@/lib/hooks/use-instant-transition'

interface AppShellProps {
    children: React.ReactNode
    user?: User | null
    profile?: any
    plan?: string
}

export function AppShell({ children, user, profile, plan }: AppShellProps) {
    const t = useTranslations('Navbar')
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    useAggressivePrefetch()
    const { handleMouseEnter } = usePrefetchOnHover()
    const { navigate } = useInstantTransition()
    const { currentPlan, isSimulating } = useAdminStore()
    const effectivePlan = isSimulating ? currentPlan : plan
    const displayData = getUserDisplayData(user, profile)
    const copy = locale === 'es'
        ? { workspace: 'Espacio clínico', website: 'Sitio público', help: 'Ayuda y recorrido', today: 'Sistema clínico operativo', plan: 'Plan' }
        : { workspace: 'Clinical workspace', website: 'Public site', help: 'Help and tour', today: 'Clinical system online', plan: 'Plan' }

    const navLinks = [
        { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard, code: '01' },
        { name: t('search_tests'), href: '/dashboard/tests', icon: Search, code: '02' },
        { name: t('resources'), href: '/dashboard/resources', icon: BookOpen, code: '03' },
        ...((effectivePlan === 'clinical' || effectivePlan === 'pro')
            ? [{ name: t('patients'), href: '/patients', icon: Users, code: '04' }]
            : []),
        { name: t('profile'), href: '/profile', icon: UserCircle, code: '05' },
    ]

    const isActive = (href: string) => href === '/dashboard'
        ? pathname === '/dashboard'
        : pathname.startsWith(href)

    const current = navLinks.find(link => isActive(link.href)) || navLinks[0]

    const signOut = async () => {
        setIsLoggingOut(true)
        await supabase.auth.signOut()
        navigate('/')
        router.refresh()
    }

    const navigation = (
        <>
            <div className="px-3 pb-3 pt-2 text-[9px] font-bold uppercase tracking-[0.24em] text-slate-600">
                {copy.workspace}
            </div>
            <nav className="space-y-1.5">
                {navLinks.map(link => (
                    <InstantLink
                        key={link.href}
                        href={link.href}
                        onMouseEnter={() => handleMouseEnter(link.href)}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                            'group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-300',
                            isActive(link.href)
                                ? 'bg-white/[0.09] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                                : 'text-slate-400 hover:bg-white/[0.045] hover:text-slate-100'
                        )}
                    >
                        {isActive(link.href) && <span className="absolute -left-1 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-teal-300 shadow-[0_0_18px_rgba(94,234,212,0.7)]" />}
                        <span className={cn(
                            'grid size-9 place-items-center rounded-xl border transition-all',
                            isActive(link.href)
                                ? 'border-teal-300/20 bg-teal-300/10 text-teal-200'
                                : 'border-white/[0.06] bg-white/[0.025] text-slate-500 group-hover:text-slate-300'
                        )}>
                            <link.icon className="size-[17px]" strokeWidth={1.8} />
                        </span>
                        <span className="min-w-0 flex-1 truncate font-medium">{link.name}</span>
                        <span className="text-[9px] font-bold tracking-widest text-slate-700 group-hover:text-slate-500">{link.code}</span>
                    </InstantLink>
                ))}
            </nav>
        </>
    )

    return (
        <div className="min-h-screen bg-[#eef4f3] text-slate-950 dark:bg-[#050a12] dark:text-white">
            <aside className="fixed inset-y-3 left-3 z-50 hidden w-[264px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#07111f] text-white shadow-[0_30px_90px_-30px_rgba(2,6,23,0.9)] md:flex">
                <div aria-hidden className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_20%_0%,rgba(45,212,191,0.16),transparent_68%)]" />
                <Link href="/dashboard" className="relative flex items-center gap-3 px-5 pb-7 pt-6">
                    <div className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-inner">
                        <Image src="/neurometrics-logo-small.png" alt="Neurometrics" width={34} height={34} className="object-contain" />
                    </div>
                    <div>
                        <div className="text-[15px] font-semibold tracking-[-0.025em]">Neurometrics</div>
                        <div className="mt-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-teal-300">
                            <Activity className="size-3" /> Clinical OS
                        </div>
                    </div>
                </Link>

                <div className="relative flex-1 overflow-y-auto px-3">{navigation}</div>

                <div className="relative space-y-2 p-3">
                    <button onClick={() => window.dispatchEvent(new Event('start-tour'))} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-medium text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-white">
                        <CircleHelp className="size-4" /> {copy.help}
                    </button>
                    <Link href="/" className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-medium text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-white">
                        <Globe2 className="size-4" /> {copy.website}
                    </Link>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <div className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-teal-300/10 text-sm font-bold text-teal-200 ring-1 ring-inset ring-teal-200/15">
                                {displayData.avatarUrl ? <Image src={displayData.avatarUrl} alt={displayData.displayName} fill className="object-cover" /> : displayData.initials}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-semibold text-white">{displayData.displayName}</p>
                                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">{copy.plan} {effectivePlan || 'free'}</p>
                            </div>
                            <button onClick={signOut} disabled={isLoggingOut} aria-label={t('sign_out')} className="grid size-8 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-rose-400/10 hover:text-rose-300">
                                <LogOut className={cn('size-4', isLoggingOut && 'animate-pulse')} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/70 bg-[#f5f9f8]/85 px-4 backdrop-blur-2xl dark:border-white/[0.06] dark:bg-[#050a12]/85 md:left-[288px] md:h-20 md:px-7">
                <div className="flex items-center gap-3">
                    <button onClick={() => setMobileOpen(true)} className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white md:hidden dark:border-white/10 dark:bg-white/5"><Menu className="size-5" /></button>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                            <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" /> {copy.today}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white"><span>Neurometrics</span><ChevronRight className="size-3.5 text-slate-400" /><span className="text-slate-500 dark:text-slate-400">{current.name}</span></div>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2 md:hidden"><Image src="/neurometrics-logo-small.png" alt="Neurometrics" width={32} height={32} /><span className="font-semibold">Neurometrics</span></Link>
                </div>
                <div className="flex items-center gap-2">
                    <div className="hidden items-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-[10px] font-semibold text-slate-500 shadow-sm lg:flex dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400"><Command className="size-3.5" /> Clinical workspace</div>
                    <div className="flex items-center rounded-xl border border-slate-200/70 bg-white/70 p-1 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]"><ThemeToggle /><span className="h-4 w-px bg-slate-200 dark:bg-white/10" /><LanguageToggle /></div>
                </div>
            </header>

            {mobileOpen && (
                <div className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
                    <div className="h-full w-[86%] max-w-[320px] bg-[#07111f] p-4 text-white shadow-2xl" onClick={event => event.stopPropagation()}>
                        <div className="mb-7 flex items-center justify-between px-1"><div className="flex items-center gap-2.5"><Image src="/neurometrics-logo-small.png" alt="Neurometrics" width={34} height={34} /><span className="font-semibold">Neurometrics</span></div><button onClick={() => setMobileOpen(false)} className="grid size-9 place-items-center rounded-xl bg-white/5"><X className="size-5" /></button></div>
                        {navigation}
                    </div>
                </div>
            )}

            <main className="nm-app-canvas min-h-screen px-4 pb-10 pt-24 md:ml-[288px] md:px-7 md:pt-28 xl:px-10">
                <div className="mx-auto w-full max-w-[1540px]">{children}</div>
            </main>

            <WelcomeTour />
            <div className="fixed bottom-4 right-4 z-[60]"><NeurometricaSupportBot /></div>
            <UpgradePopup plan={effectivePlan ?? ''} />
            <AdminTools />
        </div>
    )
}
