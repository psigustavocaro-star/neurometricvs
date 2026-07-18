'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

interface TiltProps {
    children: React.ReactNode
    className?: string
    /** Max rotation in degrees */
    max?: number
}

/**
 * Pointer-tracking 3D tilt with spring return. Wrap product frames or
 * cards to give them physical depth on hover.
 */
export function Tilt({ children, className, max = 5 }: TiltProps) {
    const ref = useRef<HTMLDivElement>(null)
    const px = useMotionValue(0.5)
    const py = useMotionValue(0.5)
    const sx = useSpring(px, { stiffness: 140, damping: 20 })
    const sy = useSpring(py, { stiffness: 140, damping: 20 })
    const rotateX = useTransform(sy, [0, 1], [max, -max])
    const rotateY = useTransform(sx, [0, 1], [-max, max])
    const reduce = useReducedMotion()

    if (reduce) return <div className={className}>{children}</div>

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
            onPointerMove={(e) => {
                const rect = ref.current?.getBoundingClientRect()
                if (!rect) return
                px.set((e.clientX - rect.left) / rect.width)
                py.set((e.clientY - rect.top) / rect.height)
            }}
            onPointerLeave={() => { px.set(0.5); py.set(0.5) }}
        >
            {children}
        </motion.div>
    )
}
