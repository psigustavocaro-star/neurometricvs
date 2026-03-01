'use client'

import Image from "next/image"
import { useState } from 'react'
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { cn, getUserDisplayData } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { NeurometricaSupportBot } from "@/components/support/neurometrica-support-bot"
import { WelcomeTour } from "@/components/dashboard/welcome-tour"
import { UpgradePopup } from "@/components/dashboard/upgrade-popup"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { AdminTools } from '@/components/admin/admin-tools'
import { useAdminStore } from '@/lib/stores/admin-store'
import { useAggressivePrefetch, usePrefetchOnHover } from '@/lib/hooks/use-prefetch'
import { useInstantTransition, InstantLink } from '@/lib/hooks/use-instant-transition'

import {
    LayoutDashboard,
    Users,
    Search,
    BookOpen,
    UserCircle,
    LogOut,
    Menu,
    X,
    Globe,
    HelpCircle,
} from "lucide-react"

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

    // Estados
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    // 🚀 Optimizaciones de rendimiento
    useAggressivePrefetch()
    const { handleMouseEnter } = usePrefetchOnHover()
    const { navigate } = useInstantTransition()

    // Admin Simulation
    const { currentPlan, isSimulating } = useAdminStore()
    const effectivePlan = isSimulating ? currentPlan : plan

    const displayData = getUserDisplayData(user, profile)

    const navLinks = [
        { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
        { name: t("search_tests"), href: "/dashboard/tests", icon: Search },
        { name: t('resources'), href: '/dashboard/resources', icon: BookOpen },
        ...((effectivePlan === 'clinical' || effectivePlan === 'pro') ? [{ name: t("patients"), href: "/patients", icon: Users }] : []),
        { name: t("profile"), href: "/profile", icon: UserCircle },
    ]

    const handleSignOut = async () => {
        setIsLoggingOut(true)
        await supabase.auth.signOut()
        navigate('/')
        router.refresh()
    }

    const isActive = (href: string) => {
        if (href === '/dashboard' && pathname === '/dashboard') return true
        if (href !== '/dashboard' && pathname.startsWith(href)) return true
        return false
    }

    return (
        <div className="flex min-h-screen flex-col bg-background/50">

            {/* 🚀 TOP NAVBAR (Desktop) */}
            <header
                className={cn(
                    "hidden md:flex items-center justify-between",
                    "fixed top-4 left-4 right-4 z-50 h-16 px-4",
                    "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10",
                    "rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20",
                    "transition-all duration-300"
                )}
            >
                {/* Left: Logo */}
                <Link href="/dashboard" className="flex items-center gap-3.5 group">
                    <div className="relative w-10 h-10 shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Image
                            src="/neurometrics-logo-small.png"
                            alt="Neurometrics"
                            width={40}
                            height={40}
                            className="object-contain drop-shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-foreground text-base tracking-tight leading-none group-hover:text-primary transition-colors">Neurometrics</span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-500 font-extrabold uppercase tracking-widest mt-0.5">Workstation</span>
                    </div>
                </Link>

                {/* Center: Navigation */}
                <nav className="hidden lg:flex items-center gap-1.5 mx-auto">
                    {navLinks.map((link) => (
                        <InstantLink
                            key={link.href}
                            href={link.href}
                            onMouseEnter={() => handleMouseEnter(link.href)}
                            className={cn(
                                "flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-300 relative group overflow-hidden",
                                isActive(link.href)
                                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <link.icon className={cn(
                                "w-4 h-4 shrink-0 transition-transform duration-300",
                                isActive(link.href) ? "scale-105" : "group-hover:scale-105"
                            )} />
                            <span className="text-xs">{link.name}</span>
                        </InstantLink>
                    ))}
                </nav>

                {/* Right: User Actions */}
                <div className="flex items-center gap-3">

                    {/* User Greeting (Desktop) */}
                    {user && (
                        <div className="hidden xl:flex items-center gap-2.5 mr-1 pr-4 border-r border-border/40 min-w-max">
                            <div className="flex flex-col items-end pt-0.5">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-widest leading-none mb-0.5">
                                    BIENVENIDO
                                </span>
                                <span className="text-sm font-extrabold text-foreground tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-teal-500 dark:from-teal-400 dark:to-cyan-400">
                                    {displayData.displayName}
                                </span>
                            </div>

                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-md ring-2 ring-teal-500/20 dark:ring-teal-400/20 relative">
                                {displayData.avatarUrl ? (
                                    <Image
                                        src={displayData.avatarUrl}
                                        alt={displayData.displayName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-[15px] font-black text-teal-600 dark:text-cyan-400 tracking-tighter">
                                        {displayData.initials}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <Link href="/">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors rounded-xl px-3 h-9"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Web Principal</span>
                        </Button>
                    </Link>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.dispatchEvent(new Event('start-tour'))}
                        className="text-muted-foreground hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors rounded-xl px-2 h-9"
                        title={t('start_tour') || "Iniciar Tour"}
                    >
                        <HelpCircle className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center gap-1 bg-muted/30 dark:bg-muted/10 rounded-xl p-1 border border-border/20">
                        <ThemeToggle />
                        <div className="w-px h-3 bg-border/40" />
                        <LanguageToggle />
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-colors rounded-xl px-2 h-9"
                        title={t('sign_out')}
                    >
                        <LogOut className={cn("w-4 h-4", isLoggingOut && "animate-pulse")} />
                    </Button>
                </div>
            </header>

            {/* Mobile Header (Visible only on small screens) */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 z-50 flex items-center justify-between px-4">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <Image src="/neurometrics-logo-small.png" alt="Logo" width={36} height={36} />
                    <span className="font-extrabold text-xl tracking-tight">Neurometrics</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b p-4 space-y-4 shadow-xl animate-in slide-in-from-top-4" onClick={e => e.stopPropagation()}>
                        {navLinks.map(link => (
                            <InstantLink
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                                    isActive(link.href) ? "bg-primary/10 text-primary font-bold" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </InstantLink>
                        ))}

                        <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />

                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                        >
                            <Globe className="w-5 h-5" />
                            Web Principal
                        </Link>

                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                window.dispatchEvent(new Event('start-tour'));
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                        >
                            <HelpCircle className="w-5 h-5" />
                            {t('start_tour') || "Iniciar Tour"}
                        </button>

                        <div className="pt-4 border-t flex items-center justify-between">
                            <div className="flex gap-2">
                                <ThemeToggle />
                                <LanguageToggle />
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-red-500">
                                <LogOut className="w-4 h-4 mr-2" />
                                {t('sign_out')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className={cn(
                "flex-1 w-full max-w-7xl mx-auto transition-all duration-300 relative",
                "pt-20 md:pt-28 pb-8 px-4 md:px-8", /* Adjusted padding for top navbar */
                "min-h-screen"
            )}>
                {children}
            </main>

            {/* Floating Tools */}
            <WelcomeTour />
            <div className="fixed bottom-4 right-4 z-[60]">
                <NeurometricaSupportBot />
            </div>
            <UpgradePopup plan={effectivePlan ?? ''} />
            <AdminTools />
        </div>
    )
}
