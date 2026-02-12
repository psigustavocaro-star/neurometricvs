'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from "@/components/layout/navbar"
import { User } from "@supabase/supabase-js"

interface ConditionalNavbarProps {
    user?: User | null
    plan?: string
    profile?: any
}

// Routes where AppShell provides navigation or full-screen experience (hide the top navbar)
const APP_SHELL_ROUTES = ['/dashboard', '/patients', '/profile', '/reports', '/tests', '/onboarding']

export function ConditionalNavbar({ user, plan, profile }: ConditionalNavbarProps) {
    const pathname = usePathname()

    // Check if the current path should show the AppShell instead of the top Navbar
    const isAppShellRoute = APP_SHELL_ROUTES.some(route =>
        pathname === route ||
        pathname.startsWith(`${route}/`) ||
        pathname.includes(`/es${route}`) ||
        pathname.includes(`/en${route}`)
    )

    // Don't render navbar on AppShell routes
    if (isAppShellRoute) {
        return null
    }

    return <Navbar user={user} plan={plan} profile={profile} />
}
