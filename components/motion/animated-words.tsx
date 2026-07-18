'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedWordsProps {
    text: string
    className?: string
    /** Base delay in seconds before the first word animates */
    delay?: number
    /** Per-word stagger in seconds */
    stagger?: number
    /** Animate on mount (hero) instead of on scroll into view */
    onMount?: boolean
}

/**
 * Keynote-style headline reveal: each word slides up from behind an
 * invisible mask with an expo-out ease.
 */
export function AnimatedWords({ text, className, delay = 0, stagger = 0.055, onMount = false }: AnimatedWordsProps) {
    const reduce = useReducedMotion()
    const words = text.split(' ')

    if (reduce) return <span className={className}>{text}</span>

    const animationProps = onMount
        ? { animate: { y: 0, opacity: 1 } }
        : { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: '-60px' } }

    return (
        <span className={cn('inline', className)}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                    <motion.span
                        className="inline-block will-change-transform"
                        initial={{ y: '110%', opacity: 0.001 }}
                        {...animationProps}
                        transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 ? ' ' : null}
                </span>
            ))}
        </span>
    )
}
