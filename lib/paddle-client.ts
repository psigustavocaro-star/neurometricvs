'use client';

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { PADDLE_CLIENT_TOKEN, PADDLE_ENV } from './config';

let paddlePromise: Promise<Paddle | undefined> | null = null;

export async function getPaddle() {
    if (paddlePromise) {
        return paddlePromise;
    }

    if (typeof window === 'undefined' || !PADDLE_CLIENT_TOKEN) {
        return undefined;
    }

    paddlePromise = new Promise(async (resolve) => {
        try {
            console.log(`[PaddleClient] Initializing in ${PADDLE_ENV} env...`);
            const paddleInstance = await initializePaddle({
                token: PADDLE_CLIENT_TOKEN,
                environment: PADDLE_ENV,
                checkout: {
                    settings: {
                        displayMode: "overlay",
                        theme: "light",
                        allowDiscount: true
                    }
                }
            });
            console.log('[PaddleClient] Initialized successfully');
            resolve(paddleInstance);
        } catch (error) {
            console.error('[PaddleClient] Failed to initialize:', error);
            resolve(undefined);
        }
    });

    return paddlePromise;
}
