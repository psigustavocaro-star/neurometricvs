'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/auth/login-modal"
import { LayoutDashboard, Users, CreditCard, UserCircle, LogOut, Search, FileText, Home } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

export function Navbar({ user, plan }: { user?: User | null, plan?: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/patients') || pathname?.startsWith('/profile')

    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null | undefined>(user)
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true)
        // Sync initial user prop
        setCurrentUser(user)
    }, [user])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
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
                router.push('/') // Redirect to home with transition
                router.refresh()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router])

    const handleSignOut = async () => {
        setIsLoggingOut(true)
        // Artificial delay for visual feedback
        await new Promise(resolve => setTimeout(resolve, 600))
        await supabase.auth.signOut()
        // Router push handled by onAuthStateChange
    }

    const landingLinks = [
        { name: "Características", href: "/#features" },
        { name: "Relatos", href: "/#testimonials" },
        { name: "Precios", href: "/#pricing" },
        { name: "FAQ", href: "/#faq" },
    ]

    const dashboardLinks = [
        { name: "Inicio", href: "/", icon: Home },
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Mis tests", href: "/dashboard/my-tests", icon: FileText }, // Using Search icon as placeholder or maybe FileText if imported
        { name: "Buscar Tests", href: "/dashboard/tests", icon: Search },
        ...((plan === 'clinical' || plan === 'pro') ? [{ name: "Pacientes", href: "/patients", icon: Users }] : []),
        { name: "Suscripción", href: "/dashboard/subscription", icon: CreditCard },
        { name: "Perfil", href: "/profile", icon: UserCircle },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 shadow-sm py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 md:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-400 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <img src="/logo.png?v=3" alt="Neurometrics Logo" className="h-10 w-auto relative z-10 transition-transform group-hover:scale-105" />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {currentUser ? (
                            <>
                                {dashboardLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                                            pathname === link.href
                                                ? "bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-200"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="h-6 w-px bg-slate-200 mx-2" />
                                <div className="flex items-center gap-3 pl-2">
                                    <span className="text-sm font-medium text-slate-700">
                                        {currentUser.email?.split('@')[0]}
                                    </span>
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
                            </>
                        ) : (
                            <>
                                <Link href="/#features" className="text-slate-600 hover:text-teal-600 font-medium px-4 py-2 transition-colors">
                                    Características
                                </Link>
                                <Link href="/#pricing" className="text-slate-600 hover:text-teal-600 font-medium px-4 py-2 transition-colors">
                                    Precios
                                </Link>
                                <Link href="/#faq" className="text-slate-600 hover:text-teal-600 font-medium px-4 py-2 transition-colors">
                                    FAQ
                                </Link>
                                <div className="ml-4 flex items-center gap-2">
                                    <LoginModal>
                                        <Button variant="ghost" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors rounded-full hover:bg-teal-50">
                                            Ingresar
                                        </Button>
                                    </LoginModal>
                                    <Link href="/onboarding">
                                        <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all hover:scale-105 text-sm font-medium px-6">
                                            Regístrate
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {currentUser ? (
                            <>
                                <div className="px-3 py-3 border-b border-slate-100 mb-2">
                                    <p className="text-sm font-medium text-slate-900">Conectado como</p>
                                    <p className="text-sm text-slate-500 truncate">{currentUser.email}</p>
                                </div>
                                {dashboardLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "block px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-3",
                                            pathname === link.href
                                                ? "bg-teal-50 text-teal-700"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <link.icon className="h-5 w-5" />
                                        {link.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        handleSignOut()
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md flex items-center gap-3 mt-4"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-4 pt-4">
                                <Link
                                    href="/#features"
                                    className="text-slate-600 text-sm font-medium px-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Características
                                </Link>
                                <Link
                                    href="/#pricing"
                                    className="text-slate-600 text-sm font-medium px-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Precios
                                </Link>
                                <div className="px-2 flex flex-col gap-2">
                                    <LoginModal>
                                        <Button variant="ghost" className="w-full justify-start text-slate-600 text-sm font-medium px-2 hover:text-teal-700 hover:bg-teal-50">
                                            Ingresar
                                        </Button>
                                    </LoginModal>
                                    <Link href="/onboarding" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full justify-center rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
                                            Regístrate
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
