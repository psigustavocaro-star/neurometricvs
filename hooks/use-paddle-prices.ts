'use client'

import { useState, useEffect } from 'react'
import { initializePaddle, Paddle } from '@paddle/paddle-js'
import { PADDLE_CLIENT_TOKEN, PADDLE_ENV } from '@/lib/config'

interface PaddlePrice {
    currencyCode: string
    amount: string
}

let paddleInstance: Paddle | undefined = undefined

export function usePaddlePrices(priceId: string | null) {
    const [price, setPrice] = useState<PaddlePrice | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!priceId) {
            setLoading(false)
            return
        }

        const fetchPrice = async () => {
            try {
                if (!paddleInstance) {
                    paddleInstance = await initializePaddle({
                        token: PADDLE_CLIENT_TOKEN,
                        environment: PADDLE_ENV === 'production' ? 'production' : 'sandbox'
                    })
                }

                if (paddleInstance) {
                    const priceData = await paddleInstance.PricePreview({
                        items: [{ priceId, quantity: 1 }]
                    })

                    const details = priceData.data.details.lineItems[0]
                    setPrice({
                        currencyCode: priceData.data.currencyCode,
                        amount: details.formattedTotals.total
                    })
                }
            } catch (error) {
                console.error('[Paddle] Failed to fetch price:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPrice()
    }, [priceId])

    return { price, loading }
}
