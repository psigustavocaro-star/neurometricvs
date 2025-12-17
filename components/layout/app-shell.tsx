'use client'

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
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {/* Logo Area */}
                <div className={cn(
                    "h-20 flex items-center border-b border-slate-100 dark:border-slate-800",
                    isCollapsed ? "justify-center px-2" : "px-5"
                )}>
                    <div className="flex items-center gap-3 group">
                        <Link href="/dashboard">
                            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105 cursor-pointer">
                                {/* Calypso Backlight/Glow Effect */}
                                <div className="absolute inset-0 bg-cyan-500/40 blur-lg rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Main Container */}
                                <div className="relative w-full h-full bg-slate-950 border border-cyan-500/30 rounded-xl flex items-center justify-center shadow-inner shadow-cyan-900/50 backdrop-blur-sm z-10">
                                    {/* Colored Logo using Mask */}
                                    <div
                                        className="w-9 h-9 bg-gradient-to-br from-white via-cyan-400 to-teal-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
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
                                    <span className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                                        Neurometrics Latam
                                    </span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-0.5 group-hover:text-cyan-600/70 dark:group-hover:text-cyan-400/70 transition-colors">
                                        Workstation
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <button
                            onClick={() => toggleSidebar(true)}
                            className="ml-auto p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Expand Button (when collapsed) */}
                {isCollapsed && (
                    <button
                        onClick={() => toggleSidebar(false)}
                        className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-50"
                    >
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </button>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                isActive(link.href)
                                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-medium"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                                isCollapsed && "justify-center px-2"
                            )}
                        >
                            <link.icon className={cn(
                                "w-5 h-5 shrink-0",
                                isActive(link.href) ? "text-teal-600 dark:text-teal-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                            )} />
                            {!isCollapsed && <span>{link.name}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className={cn(
                    "p-4 border-t border-slate-100 dark:border-slate-800 space-y-3",
                    isCollapsed && "flex flex-col items-center"
                )}>
                    {/* Language Toggle */}
                    <button
                        onClick={handleLocaleChange}
                        className={cn(
                            "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        <Globe className="w-4 h-4" />
                        {!isCollapsed && <span>{locale === 'es' ? 'English' : 'Español'}</span>}
                    </button>

                    {/* Theme Toggle */}
                    <div className={cn(
                        "flex items-center",
                        isCollapsed ? "justify-center" : "justify-between px-3"
                    )}>
                        {!isCollapsed && (
                            <span className="text-sm text-slate-500 dark:text-slate-400">Tema</span>
                        )}
                        <ThemeToggle />
                    </div>

                    {/* Landing Page Link */}
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        <ExternalLink className="w-4 h-4" />
                        {!isCollapsed && <span>Landing Page</span>}
                    </a>

                    {/* Sign Out */}
                    <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                        className={cn(
                            "w-full text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
                            isCollapsed && "px-2"
                        )}
                    >
                        <LogOut className="w-4 h-4" />
                        {!isCollapsed && <span className="ml-2">{isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}</span>}
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png?v=3" alt="Logo" className="h-8 w-auto dark:brightness-0 dark:invert" />
                    <span className="font-bold text-slate-900 dark:text-white">Workstation</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
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
                                        ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-medium"
                                        : "text-slate-600 dark:text-slate-400"
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
                    "flex-1 transition-all duration-300",
                    "md:ml-64", // Default expanded
                    isCollapsed && "md:ml-20",
                    "pt-16 md:pt-0" // Mobile header offset
                )}
            >
                <div className="p-6 md:p-8">
                    {children}
                </div>
            </main>

            {/* Floating Support Assistant */}
            <NeurometricaSupportBot />
            <AdminTools />
        </div>
    )
}
