'use client'

import Image from "next/image"

import { useState, useEffect } from 'react'
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { NeurometricaSupportBot } from "@/components/support/neurometrica-support-bot"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { AdminTools } from '@/components/admin/admin-tools'
import { useAdminStore } from '@/lib/stores/admin-store'
import {
    LayoutDashboard,
    Users,
    Search,
    CreditCard,
    UserCircle,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Globe,
    ExternalLink
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

    // Persistent Sidebar State
    const [isCollapsed, setIsCollapsed] = useState(false)

    // Load state from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('sidebar-collapsed')
        if (stored) {
            setIsCollapsed(JSON.parse(stored))
        }
    }, [])

    // Save state to local storage on change
    const toggleSidebar = (collapsed: boolean) => {
        setIsCollapsed(collapsed)
        localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed))
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    // Admin Simulation
    const { currentPlan, isSimulating } = useAdminStore()
    const effectivePlan = isSimulating ? currentPlan : plan

    const handleLocaleChange = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es'
        router.replace(pathname, { locale: nextLocale })
    }

    const navLinks = [
        { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
        { name: t("search_tests"), href: "/dashboard/tests", icon: Search },
        ...((effectivePlan === 'clinical' || effectivePlan === 'pro') ? [{ name: t("patients"), href: "/patients", icon: Users }] : []),
        { name: t("subscription"), href: "/dashboard/subscription", icon: CreditCard },
        { name: t("profile"), href: "/profile", icon: UserCircle },
    ]

    const handleSignOut = async () => {
        setIsLoggingOut(true)
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard'
        }
        return pathname.startsWith(href)
    }

    return (
        <div className="flex min-h-screen bg-background transition-colors duration-300">
            {/* Desktop Sidebar */}
            <aside className={cn(
                "hidden lg:flex flex-col h-screen sticky top-0 bg-sidebar transition-all duration-300 ease-in-out relative z-40",
                isCollapsed ? 'w-[70px]' : 'w-[260px]'
            )}>
                {/* Logo Area */}
                <div className={cn(
                    "h-20 flex items-center shrink-0",
                    isCollapsed ? "justify-center px-2" : "px-5"
                )}>
                    <div className="flex items-center gap-3 group">
                        <Link href="/dashboard">
                            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 cursor-pointer">
                                {/* Calipso Glow Effect */}
                                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Main Container - Professional Brand Icon */}
                                <div className="relative w-full h-full bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 z-10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-teal-500/50">
                                    {/* Logo White */}
                                    <div
                                        className="w-7 h-7 bg-white"
                                        style={{
                                            maskImage: 'url(/neurometrics-logo-small.png)',
                                            maskSize: 'contain',
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                            WebkitMaskImage: 'url(/neurometrics-logo-small.png)',
                                            WebkitMaskSize: 'contain',
                                            WebkitMaskRepeat: 'no-repeat',
                                            WebkitMaskPosition: 'center'
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <Link href="/dashboard" className="flex flex-col">
                                    <span className="text-[15px] font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors duration-300">
                                        Neurometrics Latam
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5 group-hover:text-primary/70 transition-colors">
                                        Workstation
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Unified Toggle Button - Floating on the border */}
                <button
                    onClick={() => toggleSidebar(!isCollapsed)}
                    className="absolute -right-3 top-24 w-6 h-6 bg-primary text-primary-foreground border border-primary/20 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(var(--primary),0.3)] hover:scale-110 transition-all z-50 group hover:shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                    title={isCollapsed ? "Expandir" : "Colapsar"}
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    ) : (
                        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    )}
                </button>

                {/* Navigation Links */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                isActive(link.href)
                                    ? "bg-primary/10 text-primary font-bold shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                isCollapsed && "justify-center px-2"
                            )}
                        >
                            <link.icon className={cn(
                                "w-5 h-5 shrink-0 transition-all duration-300",
                                isActive(link.href) ? "text-primary scale-110" : "text-muted-foreground group-hover:text-primary"
                            )} />
                            {!isCollapsed && <span className="text-sm tracking-tight">{link.name}</span>}
                            {isActive(link.href) && (
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className={cn(
                    "p-4 border-t border-border flex flex-col gap-1",
                    isCollapsed && "items-center"
                )}>
                    {/* Back to Landing */}
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all group",
                            isCollapsed && "justify-center"
                        )}
                        title={t('home')}
                    >
                        <ExternalLink className="w-4 h-4 group-hover:text-primary transition-colors" />
                        {!isCollapsed && <span className="font-medium">{t('home')}</span>}
                    </Link>

                    {/* Theme Toggle */}
                    <div className={cn(
                        "flex items-center group",
                        isCollapsed ? "justify-center mb-2" : "justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                    )}>
                        {!isCollapsed && (
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Tema</span>
                        )}
                        <ThemeToggle />
                    </div>

                    {/* Language Toggle */}
                    <button
                        onClick={handleLocaleChange}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all group",
                            isCollapsed && "justify-center"
                        )}
                    >
                        <Globe className="w-4 h-4 group-hover:text-primary transition-colors" />
                        {!isCollapsed && <span className="font-medium">{locale === 'es' ? 'English' : 'Español'}</span>}
                    </button>

                    {/* Sign Out */}
                    <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                        className={cn(
                            "w-full justify-start px-3 py-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all group",
                            isCollapsed && "justify-center"
                        )}
                    >
                        <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        {!isCollapsed && <span className="ml-3 text-sm font-medium">{isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}</span>}
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border/50 z-40 flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={100} height={32} className="h-8 w-auto dark:brightness-0 dark:invert" />
                    <span className="font-bold text-foreground">Workstation</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-muted"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
                    <div
                        className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    isActive(link.href)
                                        ? "bg-primary/10 text-primary font-bold shadow-[0_0_10px_rgba(var(--primary),0.1)]"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <link.icon className="w-5 h-5" />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
                            <Button
                                variant="ghost"
                                onClick={handleSignOut}
                                disabled={isLoggingOut}
                                className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                {isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 transition-all duration-300 relative min-h-screen",
                    "pt-16 lg:pt-0" // Mobile header offset
                )}
            >
                {children}
            </main>

            {/* Floating Support Assistant */}
            <NeurometricaSupportBot />
            <AdminTools />
        </div>
    )
}
