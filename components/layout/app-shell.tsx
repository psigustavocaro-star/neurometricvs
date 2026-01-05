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
    ExternalLink,
    BookOpen
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
        { name: t('resources'), href: '/dashboard/resources', icon: BookOpen },
        ...((effectivePlan === 'clinical' || effectivePlan === 'pro') ? [{ name: t("patients"), href: "/patients", icon: Users }] : []),

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

    const handleResize = () => {
        const width = window.innerWidth
        if (width < 768) {
            setIsMobileMenuOpen(false)
        }
        if (width >= 768 && width < 1280) { // Auto-collapse on smaller desktops/tablets
            setIsCollapsed(true)
        }
    }

    useEffect(() => {
        // Initial check
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="flex min-h-screen bg-background transition-colors duration-500 ease-in-out">
            {/* Desktop Sidebar - Visible from md (768px) upwards */}
            <aside className={cn(
                "hidden md:flex flex-col h-screen sticky top-0 bg-sidebar transition-all duration-500 ease-in-out relative z-40 border-r border-slate-200/60 dark:border-slate-800/60 shadow-[1px_0_10px_rgba(0,0,0,0.02)]",
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
                                <div className="relative w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                                    <Image
                                        src="/neurometrics-logo-small.png"
                                        alt="Neurometrics"
                                        width={28}
                                        height={28}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </Link>
                        <div className={cn(
                            "flex flex-col overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap",
                            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100 pl-2"
                        )}>
                            <Link href="/dashboard" className="flex flex-col">
                                <span className="text-[15px] font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors duration-500 ease-in-out">
                                    Neurometrics
                                </span>
                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5 group-hover:text-primary/70 transition-colors">
                                    {t('dashboard')}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Unified Toggle Button - Floating on the border */}
                <button
                    onClick={() => toggleSidebar(!isCollapsed)}
                    className={cn(
                        "absolute -right-4 top-24 w-8 h-8 rounded-xl flex items-center justify-center z-50 group transition-all duration-300",
                        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
                        "shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
                        "hover:border-teal-500/50 hover:shadow-[0_4px_15px_rgba(20,184,166,0.15)]",
                        "active:scale-90"
                    )}
                    title={isCollapsed ? t("expand") : t("collapse")}
                >
                    <div className="absolute inset-0 bg-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 transition-colors" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 transition-colors" />
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
                                "w-5 h-5 shrink-0 transition-all duration-500 ease-in-out",
                                isActive(link.href) ? "text-primary scale-110" : "text-muted-foreground group-hover:text-primary"
                            )} />
                            <span className={cn(
                                "text-sm tracking-tight overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap",
                                isCollapsed ? "w-0 opacity-0 translate-x-4" : "w-auto opacity-100 translate-x-0"
                            )}>{link.name}</span>
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
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all group overflow-hidden whitespace-nowrap",
                            isCollapsed && "justify-center px-2"
                        )}
                        title={t('home')}
                    >
                        <ExternalLink className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                        <span className={cn(
                            "font-medium overflow-hidden transition-all duration-500 ease-in-out",
                            isCollapsed ? "w-0 opacity-0 translate-x-4" : "w-auto opacity-100 translate-x-0"
                        )}>{t('home')}</span>
                    </Link>

                    {/* Theme Toggle */}
                    <div className={cn(
                        "flex items-center group overflow-hidden whitespace-nowrap",
                        isCollapsed ? "justify-center mb-2 px-2" : "justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                    )}>
                        <span className={cn(
                            "text-sm text-muted-foreground group-hover:text-foreground transition-all duration-500 ease-in-out",
                            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                        )}>{t('theme')}</span>
                        <ThemeToggle />
                    </div>

                    {/* Language Toggle */}
                    <button
                        onClick={handleLocaleChange}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all group overflow-hidden whitespace-nowrap",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        <Globe className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                        <span className={cn(
                            "font-medium overflow-hidden transition-all duration-500 ease-in-out",
                            isCollapsed ? "w-0 opacity-0 translate-x-4" : "w-auto opacity-100 translate-x-0"
                        )}>{locale === 'es' ? 'English' : 'Español'}</span>
                    </button>

                    {/* Sign Out */}
                    <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                        className={cn(
                            "w-full justify-start px-3 py-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all group overflow-hidden whitespace-nowrap",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        <LogOut className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        <span className={cn(
                            "ml-3 text-sm font-medium overflow-hidden transition-all duration-500 ease-in-out",
                            isCollapsed ? "w-0 opacity-0 translate-x-4 ml-0" : "w-auto opacity-100 translate-x-0"
                        )}>{isLoggingOut ? t('logging_out') : t('sign_out')}</span>
                    </Button>
                </div>
            </aside>

            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/50 z-50 flex items-center justify-between px-6 shadow-sm">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Image
                            src="/neurometrics-logo-small.png"
                            alt="Neurometrics"
                            width={24}
                            height={24}
                            className="object-contain"
                        />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tracking-tight">Workstation</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-muted active:scale-95 transition-transform"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <div
                        className="absolute top-16 left-0 right-0 bg-background border-b border-border p-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-300 rounded-b-[2rem]"
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
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <link.icon className="w-5 h-5" />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        <div className="border-t border-border pt-3 mt-3">
                            <Button
                                variant="ghost"
                                onClick={handleSignOut}
                                disabled={isLoggingOut}
                                className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                {isLoggingOut ? t('logging_out') : t('sign_out')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 transition-all duration-500 ease-in-out relative min-h-screen overflow-x-hidden",
                    "pt-16 md:pt-0" // Mobile header offset
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
