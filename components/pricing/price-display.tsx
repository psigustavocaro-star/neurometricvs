'use client'

import { useLocalConverter } from '@/hooks/use-local-converter'
import { usePaddlePrices } from '@/hooks/use-paddle-prices'
import { Loader2 } from 'lucide-react'

interface PriceDisplayProps {
    amount: number
    period?: string
    className?: string
    priceId?: string
}

export function PriceDisplay({ amount, period = '/mes', className = '', priceId }: PriceDisplayProps) {
    // Keep Paddle hook for initialization/checkout readiness (optional, or remove if handled elsewhere)
    usePaddlePrices(priceId || null)

    // New Reference Converter
    const { localPrice, loading: conversionLoading } = useLocalConverter(amount)

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">${amount}</span>
                <span className="text-lg font-bold text-slate-500">USD</span>
                <span className="text-slate-500 text-sm ml-1">{period}</span>
            </div>

            {/* Reference Price Badge */}
            <div className="min-h-[24px] mt-2 flex items-center justify-center">
                {conversionLoading ? (
                    <span className="text-xs text-slate-400 animate-pulse flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                    </span>
                ) : localPrice ? (
                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-1 duration-300">
                        <span className="text-sm font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 shadow-sm flex items-center gap-1 group relative cursor-help">
                            ~ {localPrice.amount} <span className="text-xs font-normal text-teal-600 ml-0.5">{localPrice.currency}</span>
                            <span className="ml-1 text-[10px] mobile-hidden font-normal text-teal-500/80">(aprox.)</span>

                            {/* Tooltip with rate */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                1 USD ≈ {new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(localPrice.rate)} {localPrice.currency}
                            </div>
                        </span>
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}
