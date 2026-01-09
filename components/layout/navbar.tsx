'use client'

import Image from "next/image"

import { useState, useEffect } from 'react'
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { cn, getUserDisplayData } from "@/lib/utils"
// ... imports
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/auth/login-modal"
import { WeatherTimeWidget } from "@/components/layout/weather-time-widget"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { LayoutDashboard, Users, CreditCard, UserCircle, LogOut, Search, FileText, Home, Globe, ChevronDown } from "lucide-react"
import { LocationWithFlag } from '@/components/ui/location-with-flag'
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar({ user, plan, profile }: { user?: User | null, plan?: string, profile?: any }) {
    const t = useTranslations('Navbar')
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null | undefined>(user)
    const [currentProfile, setCurrentProfile] = useState<any>(profile)
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true)
        setCurrentUser(user)

        // Double-check session on mount
        const checkSession = async () => {
            const { data: { user: sessionUser } } = await supabase.auth.getUser()
            if (sessionUser) {
                setCurrentUser(sessionUser)
                const { data: profileData } = await supabase.from('profiles').select('*').eq('id', sessionUser.id).single()
                if (profileData) setCurrentProfile(profileData)
            }
        }
        checkSession()
    }, [user, profile, supabase])

    useEffect(() => {
        const handleScroll = () => {
            // Use a small threshold for initial "sticky" feel, but 20px for the full transition
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setCurrentUser(session?.user)
                setIsLoggingOut(false)
                router.refresh()
            } else if (event === 'SIGNED_OUT') {
                setCurrentUser(null)
                setIsLoggingOut(false)
                router.push('/')
                router.refresh()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router])

    const handleSignOut = async () => {
        setIsLoggingOut(true)
        await new Promise(resolve => setTimeout(resolve, 600))
        await supabase.auth.signOut()
    }

    const handleLocaleChange = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es';
        router.replace(pathname, { locale: nextLocale });
    }

    // Simplified navbar links - detailed navigation is in the Workstation sidebar
    const navLinks = [
        { name: t("home"), href: "/", icon: Home },
        { name: "Workstation", href: "/dashboard", icon: LayoutDashboard },
    ]

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                scrolled
                    ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-200/50 dark:border-slate-800/50 py-1"
                    : "bg-transparent py-4 shadow-none border-b-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={cn(
                    "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    scrolled ? "h-14" : "h-20"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-400 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <Image src="/logo.png" alt="Neurometrics Logo" width={150} height={48} className="h-12 w-auto relative z-10 transition-transform group-hover:scale-105 dark:brightness-0 dark:invert" priority />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {currentUser ? (
                            <>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                                            pathname === link.href
                                                ? "bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:ring-teal-800"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                        )}
                                    >
                                        <span className="truncate">{link.name}</span>
                                    </Link>
                                ))}
                                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                            </>
                        ) : (
                            <>
                                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 px-4 py-2 transition-colors">
                                    {t('home')}
                                </Link>
                                <Link href="/features" className="text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 px-4 py-2 transition-colors">
                                    {t('features')}
                                </Link>
                                <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 px-4 py-2 transition-colors">
                                    {t('pricing')}
                                </Link>
                                <Link href="/testimonials" className="text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 px-4 py-2 transition-colors">
                                    {t('testimonials')}
                                </Link>
                            </>
                        )}

                        <ThemeToggle />
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

                        <LanguageToggle />

                        {/* Weather Widget */}
                        {currentUser && <WeatherTimeWidget />}

                        {/* Auth Buttons */}
                        {currentUser ? (
                            <div className="flex items-center gap-3 pl-2">
                                <Link href="/profile" className="flex items-center gap-2 hover:bg-slate-50 rounded-full pr-3 pl-1 py-1 transition-colors group">
                                    <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 bg-teal-50 flex items-center justify-center relative">
                                        {currentUser.user_metadata?.avatar_url ? (
                                            <Image
                                                src={currentUser.user_metadata?.avatar_url}
                                                alt="Avatar"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold text-teal-700">
                                                {getUserDisplayData(currentUser, currentProfile).initials}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700 max-w-[150px] truncate">
                                        {getUserDisplayData(currentUser, currentProfile).displayName}
                                    </span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleSignOut}
                                    className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Cerrar sesión"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                            <div className="ml-4 flex items-center gap-2">
                                <LoginModal>
                                    <Button variant="ghost" suppressHydrationWarning={true} className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors rounded-full hover:bg-teal-50">
                                        {t('login')}
                                    </Button>
                                </LoginModal>
                                <Link href="/onboarding">
                                    <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all hover:scale-105 text-sm font-medium px-6">
                                        {t('register')}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button - Keeping simplified for now */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-slate-900 p-2 rounded-md focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content (Simplified re-implementation) */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-lg absolute w-full top-full left-0 animate-in slide-in-from-top-5">
                    <div className="px-4 py-6 space-y-4 flex flex-col">
                        <Link href="/" className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            {t('home')}
                        </Link>
                        <Link href="/features" className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            {t('features')}
                        </Link>
                        <Link href="/pricing" className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            {t('pricing')}
                        </Link>
                        <Link href="/testimonials" className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            {t('testimonials')}
                        </Link>

                        <div className="px-4 py-2 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ajustes</span>
                            <div className="flex items-center gap-3">
                                <ThemeToggle />
                                <LanguageToggle />
                            </div>
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />

                        {currentUser ? (
                            <>
                                <Link href="/dashboard" className="px-4 py-3 text-sm font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                    <LayoutDashboard className="w-4 h-4" />
                                    Workstation
                                </Link>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        handleSignOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="justify-start px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    {t('logout') || "Cerrar Sesión"}
                                </Button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3 mt-2">
                                <LoginModal>
                                    <Button variant="outline" className="w-full justify-center rounded-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
                                        {t('login')}
                                    </Button>
                                </LoginModal>
                                <Link href="/onboarding" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md">
                                        {t('register')}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
