'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { getPaddle } from '@/lib/paddle-client'
import { PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from '@/lib/config'

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
    const [paddle, setPaddle] = useState<any>()
    const t = useTranslations('Dashboard.Subscription')

    const isActive = currentPlan === planId

    useEffect(() => {
        getPaddle().then(instance => {
            if (instance) setPaddle(instance)
        })
    }, [])

    const handleSubscribe = async () => {
        if (!paddle) {
            toast.error("El sistema de pagos se está cargando...")
            return
        }

        const priceId = planId === 'pro' ? PRICE_ID_PRO :
            planId === 'clinical' ? PRICE_ID_CLINICAL :
                planId === 'basic' ? PRICE_ID_BASIC : ''

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
                    theme: 'light',
                    allowDiscount: true
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
