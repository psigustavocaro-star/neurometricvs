"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
    children: React.ReactNode
    className?: string
    animation?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left" | "scale-up" | "fade-right" | "fade-left"
    delay?: number
    duration?: number
    viewport?: { once?: boolean; margin?: string; amount?: "some" | "all" | number }
}

export function ScrollAnimation({
    children,
    className,
    animation = "fade-up",
    delay = 0,
    duration = 0.5,
    viewport = { once: true, margin: "-50px" }
}: ScrollAnimationProps) {

    const getVariants = () => {
        switch (animation) {
            case "fade-up":
                return {
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                }
            case "fade-in":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                }
            case "fade-right":
                return {
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0 }
                }
            case "fade-left":
                return {
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0 }
                }
            case "slide-in-right":
                return {
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 }
                }
            case "slide-in-left":
                return {
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 }
                }
            case "scale-up":
                return {
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                }
            default:
                return {
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                }
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={getVariants()}
            transition={{
                duration: duration,
                delay: delay / 1000,
                ease: "easeOut"
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}
