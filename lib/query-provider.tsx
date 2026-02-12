'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './query-client'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
    // Crear una instancia única por componente
    const [queryClient] = useState(() => getQueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-right"
                />
            )}
        </QueryClientProvider>
    )
}
