import { usePaddlePrices } from '@/hooks/use-paddle-prices'
import { Loader2 } from 'lucide-react'

interface PriceDisplayProps {
    amount: number
    period?: string
    className?: string
    priceId?: string
}

export function PriceDisplay({ amount, period = '/mes', className = '', priceId }: PriceDisplayProps) {
    const { price, loading } = usePaddlePrices(priceId || null)

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="flex items-baseline gap-1">
                {priceId && price ? (
                    <>
                        <span className="text-4xl font-extrabold text-teal-700 animate-in fade-in duration-500">
                            {price.amount}
                        </span>
                        {/* Period is usually included in formatted price, or we append it */}
                        <span className="text-slate-500 text-sm ml-1">{period}</span>
                    </>
                ) : (
                    <>
                        <span className="text-4xl font-extrabold text-slate-900">${amount}</span>
                        <span className="text-lg font-bold text-slate-500">USD</span>
                        <span className="text-slate-500 text-sm ml-1">{period}</span>
                    </>
                )}
            </div>

            {/* Loading / Conversion Indicator */}
            <div className="h-6 mt-2 flex items-center justify-center">
                {priceId && loading ? (
                    <span className="text-xs text-slate-400 animate-pulse flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Calculando precio local...
                    </span>
                ) : priceId && price ? (
                    <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                        Precio local detectado
                    </span>
                ) : (
                    <span className="text-xs text-slate-400 opacity-60">Precio en dólares</span>
                )}
            </div>
        </div>
    )
}
