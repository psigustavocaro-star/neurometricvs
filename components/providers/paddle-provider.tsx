'use client'

import { useEffect } from 'react'
import { getPaddle } from '@/lib/paddle-client'

export function PaddleProvider() {
    useEffect(() => {
        // Pre-initialize and cache the paddle instance as soon as the app loads
        getPaddle().catch(console.error)
    }, [])

    return null
}
