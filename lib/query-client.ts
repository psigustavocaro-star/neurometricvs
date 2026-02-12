import { QueryClient } from '@tanstack/react-query'

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Configuración para sentirse instantáneo
                staleTime: 1000 * 60 * 5, // 5 minutos - datos se consideran frescos
                gcTime: 1000 * 60 * 30, // 30 minutos - garbage collection
                refetchOnWindowFocus: false, // No refetch al cambiar de ventana
                refetchOnReconnect: true, // Sí refetch al reconectar
                retry: 2, // 2 reintentos en caso de error
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
                // Cache hits instantáneos
                networkMode: 'offlineFirst', // Priorizar cache
            },
            mutations: {
                // Mutations instantáneas con optimistic updates
                retry: 1,
                networkMode: 'online',
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: siempre crear nuevo query client
        return makeQueryClient()
    } else {
        // Browser: reutilizar query client singleton
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}
