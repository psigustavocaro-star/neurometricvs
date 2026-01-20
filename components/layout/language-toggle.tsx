"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
    isCollapsed?: boolean
}

export function LanguageToggle({ isCollapsed }: LanguageToggleProps) {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

    const options = [
        { id: 'es', label: 'ES' },
        { id: 'en', label: 'EN' },
    ]

    const toggleLocale = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es'
        router.replace(pathname, { locale: nextLocale as any })
    }

    if (isCollapsed) {
        return (
            <button
                onClick={toggleLocale}
                className="w-full h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-xs font-black tracking-wide uppercase text-slate-600 dark:text-slate-400"
                title="Cambiar idioma"
            >
                {locale === 'es' ? 'ES' : 'EN'}
            </button>
        )
    }

    return (
        <div className="flex w-full p-1 bg-slate-100 dark:bg-slate-900/40 rounded-lg border border-slate-200/50 dark:border-slate-800/50 shadow-inner relative overflow-hidden h-9">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => router.replace(pathname, { locale: option.id as any })}
                    className={cn(
                        "relative flex-1 flex items-center justify-center rounded-md transition-colors z-10 text-[10px] font-bold tracking-wide uppercase",
                        locale === option.id
                            ? "text-teal-700 dark:text-cyan-400"
                            : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                    )}
                >
                    {option.label}

                    {locale === option.id && (
                        <motion.div
                            layoutId="active-locale"
                            className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-md shadow-sm ring-1 ring-black/5 dark:ring-white/10 z-[-1]"
                            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}
