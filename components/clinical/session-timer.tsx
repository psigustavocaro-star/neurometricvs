'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Clock, Pause, Play, RotateCcw, Monitor, Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"

interface SessionTimerProps {
    initialDurationMinutes?: number
    onDurationChange?: (minutes: number) => void
}

export function SessionTimer({ initialDurationMinutes = 45, onDurationChange }: SessionTimerProps) {
    const [duration, setDuration] = useState(initialDurationMinutes)
    const [timeLeft, setTimeLeft] = useState(initialDurationMinutes * 60)
    const [isRunning, setIsRunning] = useState(true)
    const [isPaused, setIsPaused] = useState(false)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Sync if initialDuration changes externally (e.g. form load)
    useEffect(() => {
        setDuration(initialDurationMinutes)
        setTimeLeft(initialDurationMinutes * 60)
        setIsRunning(true)
        setIsPaused(false)
    }, [initialDurationMinutes])

    useEffect(() => {
        if (isRunning && !isPaused && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!)
                        setIsRunning(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isRunning, isPaused, timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleDurationSelect = (mins: number) => {
        setDuration(mins)
        setTimeLeft(mins * 60)
        setIsRunning(true)
        setIsPaused(false)
        if (onDurationChange) onDurationChange(mins)
    }

    const togglePause = () => setIsPaused(!isPaused)

    const resetTimer = () => {
        setTimeLeft(duration * 60)
        setIsRunning(true)
        setIsPaused(false)
    }

    // Color logic
    const getStatusColor = () => {
        const percentage = timeLeft / (duration * 60)
        if (timeLeft === 0) return "text-red-500 bg-red-100 dark:bg-red-900/20"
        if (timeLeft < 120) return "text-red-600 animate-pulse bg-red-50 dark:bg-red-900/10" // < 2 mins
        if (percentage < 0.25) return "text-orange-500 bg-orange-50 dark:bg-orange-900/10" // last quarter
        return "text-teal-600 bg-teal-50 dark:bg-teal-900/10"
    }

    return (
        <div className={cn(
            "flex items-center gap-3 px-3 py-1.5 rounded-lg border transition-colors",
            getStatusColor(),
            "border-transparent"
        )}>
            <div className="flex items-center gap-2 mr-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xl font-bold tracking-wider">
                    {formatTime(timeLeft)}
                </span>
            </div>

            <div className="h-6 w-px bg-current opacity-20 mx-1" />

            {/* Controls */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10 text-current"
                    onClick={togglePause}
                    title={isPaused ? "Reanudar" : "Pausar"}
                >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10 text-current"
                    onClick={resetTimer}
                    title="Reiniciar"
                >
                    <RotateCcw className="w-3 h-3" />
                </Button>
            </div>

            <div className="h-6 w-px bg-current opacity-20 mx-1" />

            {/* Presets */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-6 px-2 text-[10px] font-bold uppercase transition-all hover:bg-black/10 dark:hover:bg-white/10 text-current",
                        duration === 45 && "bg-black/10 dark:bg-white/10"
                    )}
                    onClick={() => handleDurationSelect(45)}
                    title="Modo Psicología (45 min)"
                >
                    <span className="hidden sm:inline mr-1">Psico</span>
                    45m
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-6 px-2 text-[10px] font-bold uppercase transition-all hover:bg-black/10 dark:hover:bg-white/10 text-current",
                        duration === 15 && "bg-black/10 dark:bg-white/10"
                    )}
                    onClick={() => handleDurationSelect(15)}
                    title="Modo Neuro/Psiq (15 min)"
                >
                    <span className="hidden sm:inline mr-1">Médico</span>
                    15m
                </Button>
            </div>
        </div>
    )
}
