"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="w-[100px] h-9 bg-muted/50 rounded-full animate-pulse" />

    const options = [
        { id: 'light', icon: Sun },
        { id: 'system', icon: Monitor },
        { id: 'dark', icon: Moon },
    ]

    return (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-inner relative overflow-hidden h-9">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={cn(
                        "relative flex-1 flex items-center justify-center px-1 rounded-full transition-colors z-10",
                        theme === option.id
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                    )}
                >
                    <option.icon className="h-4 w-4" />

                    {theme === option.id && (
                        <motion.div
                            layoutId="active-theme"
                            className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm z-[-1]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}
