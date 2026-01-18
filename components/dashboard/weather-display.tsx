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
                let locationFetched = false

                // Try multiple IP geolocation services in order of reliability
                const locationServices = [
                    {
                        url: 'http://ip-api.com/json/?fields=status,city,lat,lon',
                        parse: (data: { status: string; city: string; lat: number; lon: number }) => {
                            if (data.status === 'success') {
                                return { lat: data.lat, lon: data.lon, city: data.city }
                            }
                            return null
                        }
                    },
                    {
                        url: 'https://ipwho.is/',
                        parse: (data: { success: boolean; latitude: number; longitude: number; city: string }) => {
                            if (data.success) {
                                return { lat: data.latitude, lon: data.longitude, city: data.city }
                            }
                            return null
                        }
                    },
                    {
                        url: 'https://ipapi.co/json/',
                        parse: (data: { latitude: number; longitude: number; city: string }) => {
                            if (data.latitude && data.longitude) {
                                return { lat: data.latitude, lon: data.longitude, city: data.city }
                            }
                            return null
                        }
                    }
                ]

                for (const service of locationServices) {
                    if (locationFetched) break
                    try {
                        const locRes = await fetch(service.url)
                        if (locRes.ok) {
                            const locData = await locRes.json()
                            const result = service.parse(locData)
                            if (result) {
                                lat = result.lat
                                lon = result.lon
                                cityName = result.city || cityName
                                locationFetched = true
                            }
                        }
                    } catch (e) {
                        console.warn(`Location service ${service.url} failed`)
                    }
                }

                // Get weather from Open-Meteo (free, no API key required)
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
                )
                if (!weatherRes.ok) throw new Error('Weather service unavailable')
                const weatherData = await weatherRes.json()

                if (weatherData.current) {
                    setWeather({
                        temp: Math.round(weatherData.current.temperature_2m),
                        city: cityName
                    })
                }
            } catch (error) {
                console.warn('Weather fetch error:', error)
                // Fallback with default values
                setWeather({ temp: 22, city: 'Santiago' })
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
