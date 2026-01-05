"use client"

import { ThemeProvider } from "next-themes"
import { useState, useEffect, Suspense } from 'react'
import { OnboardingDialog } from "@/components/onboarding/onboarding-dialog"
import { useSearchParams } from 'next/navigation'

function OnboardingManager() {
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get('onboarding') === 'true') {
            setIsOpen(true)
        }
    }, [searchParams])

    const handleClose = () => {
        setIsOpen(false)
        const params = new URLSearchParams(window.location.search)
        params.delete('onboarding')
        const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
        window.history.replaceState({}, '', newUrl)
    }

    return <OnboardingDialog isOpen={isOpen} onClose={handleClose} />
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
            <Suspense fallback={null}>
                <OnboardingManager />
            </Suspense>
        </ThemeProvider>
    )
}
