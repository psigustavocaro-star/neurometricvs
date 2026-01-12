'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function SubscriptionStatusAlert() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const t = useTranslations('Dashboard.Subscription.Status')
    const status = searchParams.get('status')

    useEffect(() => {
        if (status === 'success') {
            toast.success(t('success_title'), {
                description: t('success_desc')
            })
            // Clean URL
            router.replace('/dashboard/subscription')
        } else if (status === 'failure') {
            toast.error(t('failure_title'), {
                description: t('failure_desc')
            })
        } else if (status === 'pending') {
            toast.info(t('pending_title'), {
                description: t('pending_desc')
            })
        }
    }, [status, router, t])

    return null
}
