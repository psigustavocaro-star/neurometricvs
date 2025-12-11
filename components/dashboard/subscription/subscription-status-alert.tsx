'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function SubscriptionStatusAlert() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const status = searchParams.get('status')

    useEffect(() => {
        if (status === 'success') {
            toast.success("¡Suscripción exitosa!", {
                description: "Tu plan ha sido actualizado correctamente."
            })
            // Clean URL
            router.replace('/dashboard/subscription')
        } else if (status === 'failure') {
            toast.error("Error en el pago", {
                description: "No se pudo procesar tu suscripción. Intenta nuevamente."
            })
        } else if (status === 'pending') {
            toast.info("Pago pendiente", {
                description: "Estamos procesando tu pago. Te avisaremos cuando se complete."
            })
        }
    }, [status, router])

    return null
}
