'use client'

import { useState, useEffect } from 'react'
import { Clock, CloudSun } from 'lucide-react'

export function WeatherTimeWidget() {
    const [time, setTime] = useState<string>('')
    const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null)
    const [location, setLocation] = useState<string>('')

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)

        return () => clearInterval(interval)
    }, [])

    // Fetch weather based on user's location
    useEffect(() => {
        const fetchWeather = async (lat: number, lon: number) => {
            try {
                // Using OpenWeatherMap API (free tier)
                const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '8d84876847368e299b013f3c21133aad'
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=es`
                )

                if (response.ok) {
                    const data = await response.json()
                    setWeather({
                        temp: Math.round(data.main.temp),
                        condition: data.weather[0].description
                    })
                    setLocation(data.name)
                }
            } catch (error) {
                // Silently fail - widget will just show time
            }
        }

        // Get user's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude)
                },
                () => {
                    // Silently use Santiago, Chile as fallback
                    fetchWeather(-33.4489, -70.6693)
                }
            )
        } else {
            // Silently use Santiago, Chile as fallback
            fetchWeather(-33.4489, -70.6693)
        }
    }, [])

    return (
        <div className="flex items-center gap-4 text-sm">
            {/* Weather */}
            {weather && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-slate-900 dark:to-slate-950 rounded-full border border-teal-200 dark:border-slate-800 transition-colors">
                    <CloudSun className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-teal-700 dark:text-teal-400">{weather.temp}°C</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{weather.condition}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
