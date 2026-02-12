'use client'

import Image from "next/image"
import { useState } from 'react'
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { NeurometricaSupportBot } from "@/components/support/neurometrica-support-bot"
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
} from "lucide-react"

interface AppShellProps {
    children: React.ReactNode
    user?: User | null
    plan?: string
}

export function AppShell({ children, user, plan }: AppShellProps) {
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
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Image
                            src="/neurometrics-logo-small.png"
                            alt="Neurometrics"
                            width={32}
                            height={32}
                            className="object-contain drop-shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm tracking-tight leading-none group-hover:text-primary transition-colors">Neurometrics</span>
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Workstation</span>
                    </div>
                </Link>

                {/* Center: Navigation */}
                <nav className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
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
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Image src="/neurometrics-logo-small.png" alt="Logo" width={32} height={32} />
                    <span className="font-bold text-lg">Neurometrics</span>
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
            <div className="fixed bottom-4 right-4 z-[40]">
                <NeurometricaSupportBot />
            </div>
            <AdminTools />
        </div>
    )
}
