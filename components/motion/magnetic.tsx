'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticProps {
    children: React.ReactNode
    className?: string
    /** 0–1: how strongly the element follows the cursor */
    strength?: number
}

/**
 * Magnetic hover wrapper: the child is gently attracted to the cursor
 * with spring physics and snaps back on leave.
 */
export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
    const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
    const reduce = useReducedMotion()

    if (reduce) return <div className={className}>{children}</div>

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x: springX, y: springY, display: 'inline-block' }}
            onPointerMove={(e) => {
                const rect = ref.current?.getBoundingClientRect()
                if (!rect) return
                x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
                y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
            }}
            onPointerLeave={() => { x.set(0); y.set(0) }}
            whileTap={{ scale: 0.97 }}
        >
            {children}
        </motion.div>
    )
}
