'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Thin scroll-progress bar fixed to the top of the viewport,
 * smoothed with a spring. Rendered only on long-form pages.
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
    const reduce = useReducedMotion()

    if (reduce) return null

    return (
        <motion.div
            aria-hidden
            className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500"
            style={{ scaleX }}
        />
    )
}
