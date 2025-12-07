'use client'

import { useState, useEffect } from 'react'

interface ExchangeRates {
    [key: string]: number
}

interface LocalPriceData {
    currency: string
    amount: string
    rate: number
    lastUpdated?: string
}

export function useLocalConverter(amountUSD: number) {
    const [localPrice, setLocalPrice] = useState<LocalPriceData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchConversion = async () => {
            try {
                // 1. Detect User Currency
                // using ipwho.is (free, no key, CORS friendly)
                const ipResponse = await fetch('https://ipwho.is/')
                if (!ipResponse.ok) throw new Error('Failed to detect currency')
                const ipData = await ipResponse.json()

                if (!ipData.success) {
                    console.warn('[Currency] IP Detection failed:', ipData.message)
                    // If we can't detect, defaulting to CLP for this specific user's context/demo 
                    // or throw to fallback. Let's throw to retry/fallback.
                    throw new Error('IP API Error: ' + ipData.message)
                }

                const userCurrency = ipData.currency.code
                console.log('[Currency] Detected:', userCurrency)

                // If user is in USD zone, no need to convert (or we return null)
                // DEBUG: Commented out to force check if API works even for USD (allows seeing flow)
                /* if (userCurrency === 'USD') {
                    setLocalPrice(null)
                    setLoading(false)
                    return
                } */

                // 2. Fetch Exchange Rates
                let rate: number | undefined
                let lastUpdated: string | undefined

                // Special handling for CLP (Chile) to match local expectations (mindicador.cl)
                if (userCurrency === 'CLP') {
                    try {
                        const clpResponse = await fetch('https://mindicador.cl/api')
                        if (clpResponse.ok) {
                            const clpData = await clpResponse.json()
                            if (clpData.dolar && clpData.dolar.valor) {
                                rate = clpData.dolar.valor
                                console.log('[Currency] Using Mindicador.cl rate:', rate)
                                lastUpdated = clpData.dolar.fecha
                            }
                        }
                    } catch (e) {
                        console.warn('[Currency] Mindicador fetch failed, falling back to global API')
                    }
                }

                // Fallback to global API if rate not found yet
                if (!rate) {
                    const ratesResponse = await fetch('https://open.er-api.com/v6/latest/USD')
                    if (!ratesResponse.ok) throw new Error('Failed to fetch rates')
                    const ratesData = await ratesResponse.json()
                    rate = ratesData.rates[userCurrency]
                    console.log('[Currency] Rate for', userCurrency, ':', rate)
                    lastUpdated = ratesData.time_last_update_utc
                }

                if (!rate) throw new Error(`Rate not found for ${userCurrency}`)

                const convertedAmount = amountUSD * rate

                // 3. Format
                const formatter = new Intl.NumberFormat('es-CL', { // Forced locale for testing formatting
                    style: 'currency',
                    currency: userCurrency,
                    minimumFractionDigits: userCurrency === 'CLP' || userCurrency === 'JPY' ? 0 : 2,
                    maximumFractionDigits: userCurrency === 'CLP' || userCurrency === 'JPY' ? 0 : 2,
                })

                setLocalPrice({
                    currency: userCurrency,
                    amount: formatter.format(convertedAmount),
                    rate: rate,
                    lastUpdated: lastUpdated
                })

            } catch (error) {
                console.error('[Currency Converter] Error:', error)
                // Fallback: If everything fails, assume CLP context for this specific project requirements
                // but use a hardcoded reasonable rate if real-time fails.
                const fallbackRate = 975 // Conservative estimate
                setLocalPrice({
                    currency: 'CLP',
                    amount: new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(amountUSD * fallbackRate),
                    rate: fallbackRate,
                    lastUpdated: new Date().toUTCString()
                })
            } finally {
                setLoading(false)
            }
        }

        fetchConversion()
    }, [amountUSD])

    return { localPrice, loading }
}
