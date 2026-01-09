"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

    const options = [
        { id: 'es', label: 'ES' },
        { id: 'en', label: 'EN' },
    ]

    return (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-inner relative overflow-hidden h-9 w-24">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => router.replace(pathname, { locale: option.id as any })}
                    className={cn(
                        "relative flex-1 flex items-center justify-center rounded-full transition-colors z-10 text-[10px] font-bold tracking-tight",
                        locale === option.id
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                    )}
                >
                    {option.label}

                    {locale === option.id && (
                        <motion.div
                            layoutId="active-locale"
                            className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm z-[-1]"
                            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}
