'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

interface ParallaxProps {
    children: React.ReactNode
    className?: string
    /** Max vertical travel in px over the element's scroll range */
    offset?: number
}

/**
 * Scroll-linked parallax: translates the child from +offset to -offset
 * as it crosses the viewport, smoothed with a spring.
 */
export function Parallax({ children, className, offset = 48 }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const raw = useTransform(scrollYProgress, [0, 1], [offset, -offset])
    const y = useSpring(raw, { stiffness: 90, damping: 28, mass: 0.6 })
    const reduce = useReducedMotion()

    if (reduce) return <div ref={ref} className={className}>{children}</div>

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}
