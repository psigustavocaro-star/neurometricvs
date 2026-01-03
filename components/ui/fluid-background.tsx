"use client"

import React, { useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export function FluidBackground() {
    const { scrollYProgress } = useScroll()

    // Smooth out the scroll progress for a silk-like feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    })

    // Transform scroll progress to various visual states
    const rotate1 = useTransform(smoothProgress, [0, 1], [0, 180])
    const rotate2 = useTransform(smoothProgress, [0, 1], [90, 270])
    const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1])
    const scale2 = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 0.9, 1.1])

    // Color transitions based on scroll - using CSS variables defined in globals.css
    const blob1Color = useTransform(
        smoothProgress,
        [0, 0.3, 0.7, 1],
        ["var(--primary)", "var(--chart-2)", "var(--chart-3)", "var(--primary)"]
    )

    const blob2Color = useTransform(
        smoothProgress,
        [0, 0.4, 0.6, 1],
        ["var(--chart-4)", "var(--primary)", "var(--chart-5)", "var(--chart-2)"]
    )

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-background transition-colors duration-1000" />

            {/* SVG Container for the "Silk" blobs */}
            <svg
                className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 blur-[100px]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="fluid-blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="fluid"
                    />
                </filter>

                <g filter="url(#fluid-blur)">
                    <motion.circle
                        cx="20%"
                        cy="30%"
                        r="35%"
                        style={{
                            fill: blob1Color,
                            scale: scale1,
                            rotate: rotate1,
                            originX: "50%",
                            originY: "50%",
                        }}
                    />
                    <motion.circle
                        cx="80%"
                        cy="70%"
                        r="40%"
                        style={{
                            fill: blob2Color,
                            scale: scale2,
                            rotate: rotate2,
                            originX: "50%",
                            originY: "50%",
                        }}
                    />
                    <motion.path
                        d="M 10 10 Q 50 90 90 10"
                        style={{
                            fill: "none",
                            stroke: blob1Color,
                            strokeWidth: "15%",
                            opacity: 0.5,
                            scale: scale1,
                            rotate: rotate2,
                        }}
                    />
                </g>
            </svg>

            {/* Subtle Noise Texture for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay dark:opacity-[0.05]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    )
}
