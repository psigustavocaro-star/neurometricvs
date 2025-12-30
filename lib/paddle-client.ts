'use client';

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { PADDLE_CLIENT_TOKEN, PADDLE_ENV } from './config';

let paddleInstance: Paddle | undefined;

/**
 * Get or initialize the Paddle.js instance.
 * Centralizing this ensures we don't have multiple initializations
 * and provides a single place for debugging.
 */
export async function getPaddle() {
    if (paddleInstance) return paddleInstance;

    if (typeof window === 'undefined') return undefined;

    if (!PADDLE_CLIENT_TOKEN) {
        console.error('[PaddleClient] Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN');
        return undefined;
    }

    try {
        console.log(`[PaddleClient] Initializing in ${PADDLE_ENV} env...`);
        paddleInstance = await initializePaddle({
            token: PADDLE_CLIENT_TOKEN,
            environment: PADDLE_ENV,
        });
        console.log('[PaddleClient] Initialized successfully');
        return paddleInstance;
    } catch (error) {
        console.error('[PaddleClient] Failed to initialize:', error);
        return undefined;
    }
}
