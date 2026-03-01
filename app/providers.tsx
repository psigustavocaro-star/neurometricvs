"use client"

import { ThemeProvider } from "next-themes"
import { useState, useEffect, Suspense } from 'react'
import { OnboardingDialog } from "@/components/onboarding/onboarding-dialog"
import { useSearchParams } from 'next/navigation'
import { PaddleProvider } from "@/components/providers/paddle-provider"
import { toast } from 'sonner'

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

function LoginAlertManager() {
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get('login_alert') === 'existing_account') {
            toast.info('Ya tenías una cuenta', {
                description: 'Hemos detectado que tu cuenta ya estaba creada. Hemos iniciado tu sesión de inmediato.',
                duration: 6000,
            })
            const params = new URLSearchParams(window.location.search)
            params.delete('login_alert')
            const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
            window.history.replaceState({}, '', newUrl)
        }
    }, [searchParams])

    return null
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
            {children}
            <Suspense fallback={null}>
                <OnboardingManager />
                <LoginAlertManager />
            </Suspense>
            <PaddleProvider />
        </ThemeProvider>
    )
}
