'use client'

import { useEffect, useState } from 'react'
import { CloudSun, MapPin, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WeatherData {
    temp: number
    city: string
}

interface WeatherDisplayProps {
    className?: string
    showCity?: boolean
}

export function WeatherDisplay({ className, showCity = true }: WeatherDisplayProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // 1. Get location via IP (more reliable for "clinical" feel than browser prompt)
                const locRes = await fetch('https://ipapi.co/json/')
                if (!locRes.ok) throw new Error('Location service unavailable')
                const locData = await locRes.json()

                if (!locData.latitude || !locData.longitude) throw new Error('Location not found')

                const { latitude, longitude, city } = locData

                // 2. Get weather for those coordinates
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`)
                if (!weatherRes.ok) throw new Error('Weather service unavailable')
                const weatherData = await weatherRes.json()

                if (weatherData.current) {
                    setWeather({
                        temp: Math.round(weatherData.current.temperature_2m),
                        city: city || 'Local'
                    })
                }
            } catch (error) {
                // Silent catch: We don't want to break the dashboard if weather fails
                console.warn('Weather fetch suppressed:', error)
                setWeather(null)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [])

    if (loading) return <div className={cn("flex items-center gap-2", className)}><Loader2 className="w-3 h-3 animate-spin opacity-50 text-foreground" /></div>
    if (!weather) return null

    return (
        <div className={cn("flex items-center gap-2 transition-all duration-300", className)}>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground dark:text-foreground/70 font-medium">
                <MapPin className="w-3 h-3 opacity-60" />
                <span className="truncate max-w-[80px]">{weather.city}</span>
            </div>
            <div className="w-px h-3 bg-border/50" />
            <div className="flex items-center gap-1.5 text-xs text-foreground dark:text-white font-bold">
                <CloudSun className="w-3.5 h-3.5 text-primary opacity-80" />
                <span>{weather.temp}°C</span>
            </div>
        </div>
    )
}
