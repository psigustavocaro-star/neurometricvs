'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Brand signature divider: an EEG/ECG trace that draws itself as the
 * user scrolls through the section. Scroll-linked, so it never runs
 * idle — it is literally driven by the reader's progress.
 */
export function NeuroDivider() {
    const ref = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.35'] })
    const rawLength = useTransform(scrollYProgress, [0, 1], [0, 1])
    const pathLength = useSpring(rawLength, { stiffness: 90, damping: 26, restDelta: 0.001 })
    const traceOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0, 1, 1])
    const glowOpacity = useTransform(traceOpacity, (v) => v * 0.25)

    // Flatline → QRS spike → alpha-wave burst → flatline: a clinical trace
    const tracePath =
        'M0,100 H150 l14,-8 14,8 H260 l10,-22 8,44 8,-56 10,34 8,-14 8,14 H400 ' +
        'q10,-34 20,0 q10,34 20,0 q10,-34 20,0 q10,34 20,0 q10,-34 20,0 H580 ' +
        'l12,-10 12,10 H700 l10,-26 8,52 8,-64 10,38 8,-14 8,14 H880 ' +
        'q10,-28 20,0 q10,28 20,0 q10,-28 20,0 H1030 l14,-8 14,8 H1200'

    return (
        <div ref={ref} aria-hidden className="w-full py-10 md:py-16 overflow-hidden select-none">
            <div className="container px-4 md:px-6">
                <div className="relative">
                    {/* Measurement grid */}
                    <div
                        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18] [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, rgb(100 116 139 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(100 116 139 / 0.12) 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}
                    />
                    <svg
                        viewBox="0 0 1200 200"
                        fill="none"
                        className="w-full h-[110px] md:h-[150px] relative"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="neuro-stroke" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="oklch(0.65 0.14 195)" stopOpacity="0.15" />
                                <stop offset="0.15" stopColor="oklch(0.65 0.14 195)" />
                                <stop offset="0.85" stopColor="oklch(0.7 0.13 210)" />
                                <stop offset="1" stopColor="oklch(0.7 0.13 210)" stopOpacity="0.15" />
                            </linearGradient>
                        </defs>

                        {/* Ghost baseline of the full trace */}
                        <path
                            d={tracePath}
                            stroke="currentColor"
                            className="text-slate-300/50 dark:text-slate-700/50"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                        />

                        {reduce ? (
                            <path
                                d={tracePath}
                                stroke="url(#neuro-stroke)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                        ) : (
                            <>
                                {/* Soft glow underlay, drawn with the same scroll progress */}
                                <motion.path
                                    d={tracePath}
                                    stroke="oklch(0.65 0.14 195)"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    vectorEffect="non-scaling-stroke"
                                    className="blur-[6px]"
                                    style={{ pathLength, opacity: glowOpacity }}
                                />
                                <motion.path
                                    d={tracePath}
                                    stroke="url(#neuro-stroke)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    vectorEffect="non-scaling-stroke"
                                    style={{ pathLength, opacity: traceOpacity }}
                                />
                            </>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    )
}
