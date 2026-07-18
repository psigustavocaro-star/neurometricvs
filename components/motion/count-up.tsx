'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
    value: number
    suffix?: string
    className?: string
    /** Animation length in seconds */
    duration?: number
}

/** Counts from 0 to `value` with an expo-out ease when scrolled into view. */
export function CountUp({ value, suffix = '', className, duration = 1.8 }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const reduce = useReducedMotion()
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (!inView) return
        if (reduce) { setDisplay(value); return }
        let raf: number
        const start = performance.now()
        const tick = (now: number) => {
            const p = Math.min((now - start) / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - p, 5)
            setDisplay(Math.round(eased * value))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [inView, value, reduce, duration])

    return <span ref={ref} className={className}>{display}{suffix}</span>
}
