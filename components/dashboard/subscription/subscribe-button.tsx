'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

interface SubscribeButtonProps {
    planId: string
    price: number
    planName: string
    currentPlan: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    className?: string
}

export function SubscribeButton({ planId, price, planName, currentPlan, variant = 'default', className }: SubscribeButtonProps) {
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Dashboard.Subscription')

    const isActive = currentPlan === planId

    const handleSubscribe = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/mercadopago/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planId, price, title: planName }),
            })

            const data = await response.json()

            if (data.init_point) {
                window.location.href = data.init_point
            } else {
                toast.error("Error al iniciar el pago")
            }
        } catch (error) {
            console.error(error)
            toast.error("Ocurrió un error inesperado")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant={isActive ? 'outline' : variant}
            disabled={isActive || loading}
            className={className}
            onClick={handleSubscribe}
        >
            {loading ? 'Procesando...' : (isActive ? t('current_plan') : `${t('change_plan')} ${planName}`)}
        </Button>
    )
}
