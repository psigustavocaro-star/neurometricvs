"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
    href: string
    className?: string
    dark?: boolean
}

export function ScrollIndicator({ href, className, dark = false }: ScrollIndicatorProps) {
    return (
        <div className={cn("absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20", className)}>
            <Link href={href} className="group relative flex items-center justify-center w-12 h-12">
                {/* Ripple Effect */}
                <span className={cn(
                    "absolute inset-0 rounded-full opacity-0 group-hover:animate-ping",
                    dark ? "bg-white/30" : "bg-teal-500/30"
                )}></span>

                {/* Circle Background */}
                <div className={cn(
                    "absolute inset-0 rounded-full backdrop-blur-sm border transition-all duration-300 group-hover:scale-110",
                    dark
                        ? "bg-slate-900/10 border-slate-900/20 group-hover:bg-slate-900/20 group-hover:border-slate-900/40"
                        : "bg-white/50 border-white/60 group-hover:bg-white/80 group-hover:border-teal-200"
                )}></div>

                {/* Animated Arrow */}
                <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative z-10"
                >
                    <ChevronDown className={cn(
                        "h-6 w-6 transition-colors duration-300",
                        dark ? "text-slate-700 group-hover:text-slate-900" : "text-teal-600 group-hover:text-teal-700"
                    )} />
                </motion.div>
            </Link>
        </div>
    )
}
