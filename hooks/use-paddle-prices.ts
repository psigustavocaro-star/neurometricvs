'use client'

import { useState, useEffect } from 'react'
import { getPaddle } from '@/lib/paddle-client'
import { PADDLE_ENV } from '@/lib/config'

interface PaddlePrice {
    currencyCode: string
    amount: string
}

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
                const paddle = await getPaddle();

                if (paddle) {
                    const trimmedId = priceId.trim();
                    console.log(`[Paddle] Fetching price preview for ${trimmedId} in ${PADDLE_ENV}`);

                    const priceData = await paddle.PricePreview({
                        items: [{ priceId: trimmedId, quantity: 1 }],
                        address: { countryCode: 'CL' }
                    })

                    console.log('[Paddle] Price Data:', priceData)
                    const details = priceData.data.details.lineItems[0]
                    let currencyCode = priceData.data.currencyCode as string
                    let rawTotal = parseFloat(details.totals.total)

                    const formatter = new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: currencyCode,
                        minimumFractionDigits: currencyCode === 'CLP' ? 0 : 2,
                        maximumFractionDigits: currencyCode === 'CLP' ? 0 : 2,
                    })

                    setPrice({
                        currencyCode: currencyCode,
                        amount: formatter.format(rawTotal)
                    })
                }
            } catch (error) {
                console.error('[Paddle] Failed to fetch price for ID:', priceId, error)
            } finally {
                setLoading(false)
            }
        }

        fetchPrice()
    }, [priceId])

    return { price, loading }
}
