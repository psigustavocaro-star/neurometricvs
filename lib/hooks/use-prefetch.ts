'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Hook para prefetch agresivo de rutas y datos
 * Precarga datos antes de que el usuario los necesite
 */
export function usePrefetch() {
    const queryClient = useQueryClient()
    const router = useRouter()

    const prefetchRoute = (route: string) => {
        // Prefetch de la ruta en Next.js
        router.prefetch(route)
    }

    const prefetchData = async (queryKey: string[], fetcher: () => Promise<any>) => {
        // Prefetch de datos con React Query
        await queryClient.prefetchQuery({
            queryKey,
            queryFn: fetcher,
            staleTime: 1000 * 60 * 5, // 5 minutos
        })
    }

    return { prefetchRoute, prefetchData }
}

/**
 * Hook que prefetcha automáticamente rutas comunes
 */
export function useAggressivePrefetch() {
    const { prefetchRoute } = usePrefetch()

    useEffect(() => {
        // Prefetch rutas críticas inmediatamente
        const criticalRoutes = [
            '/dashboard',
            '/patients',
            '/test-bank',
            '/profile',
        ]

        criticalRoutes.forEach((route) => {
            prefetchRoute(route)
        })
    }, [prefetchRoute])
}

/**
 * Hook para prefetch on hover
 * Precarga cuando el usuario hace hover sobre un link
 */
export function usePrefetchOnHover() {
    const { prefetchRoute, prefetchData } = usePrefetch()

    const handleMouseEnter = (route: string, dataFetcher?: { queryKey: string[]; fetcher: () => Promise<any> }) => {
        // Prefetch de la ruta
        prefetchRoute(route)

        // Si hay datos asociados, prefetchearlos también
        if (dataFetcher) {
            prefetchData(dataFetcher.queryKey, dataFetcher.fetcher)
        }
    }

    return { handleMouseEnter }
}

/**
 * Hook para prefetch de pacientes y sus datos relacionados
 */
export function usePrefetchPatient(patientId?: string) {
    const { prefetchData } = usePrefetch()

    useEffect(() => {
        if (!patientId) return

        // Prefetch datos del paciente
        prefetchData(
            ['patient', patientId],
            async () => {
                const response = await fetch(`/api/patients/${patientId}`)
                return response.json()
            }
        )

        // Prefetch sesiones del paciente
        prefetchData(
            ['sessions', patientId],
            async () => {
                const response = await fetch(`/api/patients/${patientId}/sessions`)
                return response.json()
            }
        )

        // Prefetch tests del paciente
        prefetchData(
            ['tests', patientId],
            async () => {
                const response = await fetch(`/api/patients/${patientId}/tests`)
                return response.json()
            }
        )
    }, [patientId, prefetchData])
}

/**
 * Hook para invalidar y refrescar datos en tiempo real
 */
export function useRealtimeInvalidation(queryKeys: string[][]) {
    const queryClient = useQueryClient()

    const invalidate = () => {
        queryKeys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: key })
        })
    }

    useEffect(() => {
        // Opcional: Configurar WebSocket o polling para invalidación en tiempo real
        const interval = setInterval(invalidate, 30000) // Cada 30 segundos

        return () => clearInterval(interval)
    }, [])

    return { invalidate }
}
