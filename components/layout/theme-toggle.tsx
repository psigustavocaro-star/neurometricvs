"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
    isCollapsed?: boolean
}

export function ThemeToggle({ isCollapsed }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="w-full h-9 bg-muted/50 rounded-lg animate-pulse" />

    const options = [
        { id: 'light', icon: Sun },
        { id: 'system', icon: Monitor },
        { id: 'dark', icon: Moon },
    ]

    const cycleTheme = () => {
        const currentIndex = options.findIndex(opt => opt.id === theme)
        const nextIndex = (currentIndex + 1) % options.length
        setTheme(options[nextIndex].id)
    }

    if (isCollapsed) {
        const currentOption = options.find(opt => opt.id === theme) || options[0]
        const Icon = currentOption.icon
        return (
            <button
                onClick={cycleTheme}
                className="w-full h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                title="Cambiar tema"
            >
                <Icon className="h-4 w-4" />
            </button>
        )
    }

    return (
        <div className="flex w-full p-1 bg-slate-100 dark:bg-slate-900/40 rounded-lg border border-slate-200/50 dark:border-slate-800/50 shadow-inner relative overflow-hidden h-9">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={cn(
                        "relative flex-1 flex items-center justify-center px-1 rounded-md transition-colors z-10",
                        theme === option.id
                            ? "text-teal-600 dark:text-cyan-400"
                            : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                    )}
                >
                    <option.icon className={cn("transition-all duration-300", theme === option.id ? "h-4 w-4 scale-110" : "h-4 w-4 group-hover:scale-105")} strokeWidth={theme === option.id ? 2.5 : 2} />

                    {theme === option.id && (
                        <motion.div
                            layoutId="active-theme"
                            className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-md shadow-sm ring-1 ring-black/5 dark:ring-white/10 z-[-1]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}
