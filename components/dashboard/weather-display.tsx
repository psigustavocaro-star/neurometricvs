'use client'

import { useEffect, useState } from 'react'
import { CloudSun, Loader2 } from 'lucide-react'

export function WeatherDisplay() {
    const [temp, setTemp] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch weather for Santiago, Chile (default)
        // Latitude: -33.4489, Longitude: -70.6693
        fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.4489&longitude=-70.6693&current=temperature_2m&timezone=auto')
            .then(res => res.json())
            .then(data => {
                if (data.current) {
                    setTemp(Math.round(data.current.temperature_2m))
                }
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) return <Loader2 className="w-4 h-4 animate-spin opacity-50" />
    if (temp === null) return null

    return (
        <div className="flex items-center gap-2 pl-4 border-l border-border/60">
            <CloudSun className="w-4 h-4 opacity-70" />
            <span>{temp}°C</span>
        </div>
    )
}
