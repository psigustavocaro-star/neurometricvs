'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface PriceDisplayProps {
    amount: number
    period?: string
    className?: string
}

export function PriceDisplay({ amount, period = '/mes', className = '' }: PriceDisplayProps) {
    const [localPrice, setLocalPrice] = useState<string | null>(null)
    const [currencyCode, setCurrencyCode] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                // 1. Get User Location & Currency
                const ipRes = await fetch('https://ipapi.co/json/')
                
                if (!ipRes.ok) {
                    // Fail silently for rate limits or other issues, defaulting to USD
                    return
                }

                const ipData = await ipRes.json()
                const userCurrency = ipData.currency

                if (userCurrency && userCurrency !== 'USD') {
                    setCurrencyCode(userCurrency)

                    // 2. Get Exchange Rate
                    const rateRes = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
                    
                    if (!rateRes.ok) return

                    const rateData = await rateRes.json()
                    const rate = rateData.rates[userCurrency]

                    if (rate) {
                        const converted = amount * rate
                        // Format currency
                        const formatter = new Intl.NumberFormat(ipData.languages?.split(',')[0] || 'es-CL', {
                            style: 'currency',
                            currency: userCurrency,
                            maximumFractionDigits: 0
                        })
                        setLocalPrice(formatter.format(converted))
                    }
                }
            } catch {
                // Fail silently and default to USD
                // console.debug('Failed to fetch currency, defaulting to USD')
            } finally {
                setLoading(false)
            }
        }

        fetchCurrency()
    }, [amount])

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">${amount}</span>
                <span className="text-lg font-bold text-slate-500">USD</span>
                <span className="text-slate-500 text-sm ml-1">{period}</span>
            </div>

            {/* Local Currency Conversion */}
            <div className="h-8 mt-2">
                {loading ? (
                    <span className="text-xs text-slate-400 animate-pulse">Cargando conversión...</span>
                ) : localPrice ? (
                    <button
                        className="text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors flex items-center gap-1 border border-teal-200"
                        title="Precio estimado basado en el tipo de cambio actual"
                    >
                        <span className="opacity-70">≈</span> {localPrice} {currencyCode}
                    </button>
                ) : (
                    <span className="text-xs text-slate-400 opacity-0">USD</span>
                )}
            </div>
        </div>
    )
}
