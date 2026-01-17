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
                let lat = -33.4489 // Default Santiago
                let lon = -70.6693
                let cityName = 'Santiago'

                try {
                    // 1. Try IP location (ipwho.is is a bit more generous with free usage and HTTPS)
                    const locRes = await fetch('https://ipwho.is/')
                    if (locRes.ok) {
                        const locData = await locRes.json()
                        if (locData.success) {
                            lat = locData.latitude
                            lon = locData.longitude
                            cityName = locData.city || cityName
                        }
                    }
                } catch (e) {
                    console.warn('Primary location fetch failed, trying secondary')
                    try {
                        const locRes = await fetch('https://ipapi.co/json/')
                        if (locRes.ok) {
                            const locData = await locRes.json()
                            if (locData.latitude && locData.longitude) {
                                lat = locData.latitude
                                lon = locData.longitude
                                cityName = locData.city || cityName
                            }
                        }
                    } catch (e2) {
                        console.warn('All location fetches failed')
                    }
                }

                // 2. Get weather
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=auto`)
                if (!weatherRes.ok) throw new Error('Weather service unavailable')
                const weatherData = await weatherRes.json()

                if (weatherData.current) {
                    setWeather({
                        temp: Math.round(weatherData.current.temperature_2m),
                        city: cityName
                    })
                }
            } catch (error) {
                console.warn('Weather fetch suppressed:', error)
                setWeather({ temp: 20, city: 'Santiago' })
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
                <span className="whitespace-nowrap">{weather.city}</span>
            </div>
            <div className="w-px h-3 bg-border/50" />
            <div className="flex items-center gap-1.5 text-xs text-foreground dark:text-white font-bold">
                <CloudSun className="w-3.5 h-3.5 text-primary opacity-80" />
                <span>{weather.temp}°C</span>
            </div>
        </div>
    )
}
