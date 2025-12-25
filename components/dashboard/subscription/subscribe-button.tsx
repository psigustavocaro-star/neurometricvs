'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { initializePaddle, Paddle } from '@paddle/paddle-js'

interface SubscribeButtonProps {
    planId: string
    price: number
    planName: string
    currentPlan: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    className?: string
    userId?: string
}

export function SubscribeButton({ planId, price, planName, currentPlan, variant = 'default', className, userId }: SubscribeButtonProps) {
    const [loading, setLoading] = useState(false)
    const [paddle, setPaddle] = useState<Paddle | undefined>()
    const t = useTranslations('Dashboard.Subscription')

    const isActive = currentPlan === planId

    useEffect(() => {
        const init = async () => {
            const paddleInstance = await initializePaddle({
                environment: process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ? 'production' : 'sandbox',
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
            })
            setPaddle(paddleInstance)
        }
        init()
    }, [])

    const handleSubscribe = async () => {
        if (!paddle) {
            toast.error("El sistema de pagos se está cargando...")
            return
        }

        const priceId = planId === 'pro' ? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO :
            planId === 'clinical' ? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL :
                planId === 'basic' ? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC : ''

        if (!priceId) {
            toast.error("Configuración de precio no encontrada para este plan.")
            return
        }

        try {
            setLoading(true)
            paddle.Checkout.open({
                items: [{ priceId, quantity: 1 }],
                customData: { userId: userId || '' },
                settings: {
                    displayMode: 'overlay',
                    theme: 'light'
                }
            })
        } catch (error) {
            console.error("Paddle Checkout Error:", error)
            toast.error("Error al iniciar la suscripción.")
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
