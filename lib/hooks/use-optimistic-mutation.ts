'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type OptimisticUpdateConfig<TData, TVariables> = {
    mutationFn: (variables: TVariables) => Promise<TData>
    queryKey: string[]
    getOptimisticData: (variables: TVariables, oldData: any) => any
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: TData) => void
    onError?: (error: Error) => void
}

/**
 * Hook para mutaciones con Optimistic UI Updates
 * Actualiza la UI INSTANTÁNEAMENTE antes de que el servidor responda
 */
export function useOptimisticMutation<TData = unknown, TVariables = unknown>({
    mutationFn,
    queryKey,
    getOptimisticData,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
}: OptimisticUpdateConfig<TData, TVariables>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,

        // 🚀 OPTIMISTIC UPDATE - Se ejecuta ANTES de la llamada al servidor
        onMutate: async (variables) => {
            // Cancelar queries en curso para evitar sobreescritura
            await queryClient.cancelQueries({ queryKey })

            // Snapshot del estado anterior (para rollback)
            const previousData = queryClient.getQueryData(queryKey)

            // ⚡ ACTUALIZACIÓN INSTANTÁNEA - UI se actualiza AHORA
            queryClient.setQueryData(queryKey, (old: any) => {
                return getOptimisticData(variables, old)
            })

            // Retornar contexto para rollback
            return { previousData }
        },

        // ✅ Éxito - Actualizar con datos reales del servidor
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey })
            if (successMessage) {
                toast.success(successMessage)
            }
            onSuccess?.(data)
        },

        // ❌ Error - Revertir al estado anterior (rollback)
        onError: (error: Error, _variables, context: any) => {
            if (context?.previousData) {
                queryClient.setQueryData(queryKey, context.previousData)
            }

            console.error('Mutation error:', error)

            if (errorMessage) {
                toast.error(errorMessage)
            }

            onError?.(error)
        },

        // 🔄 Siempre refrescar después de completar (éxito o error)
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })
}

/**
 * Hook de ejemplo para crear una sesión con optimistic update
 */
export function useCreateSessionOptimistic() {
    return useOptimisticMutation({
        mutationFn: async (sessionData: any) => {
            // Simular llamada al servidor
            const response = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionData),
            })
            return response.json()
        },
        queryKey: ['sessions'],
        getOptimisticData: (newSession, oldSessions) => {
            // Agregar la sesión INMEDIATAMENTE a la lista (con ID temporal)
            return [
                {
                    ...newSession,
                    id: `temp-${Date.now()}`,
                    created_at: new Date().toISOString(),
                    status: 'pending', // Indicador de que está pendiente
                },
                ...(oldSessions || []),
            ]
        },
        successMessage: 'Sesión creada',
        errorMessage: 'Error al crear sesión',
    })
}

/**
 * Hook para actualizar paciente con optimistic update
 */
export function useUpdatePatientOptimistic() {
    return useOptimisticMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await fetch(`/api/patients/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            return response.json()
        },
        queryKey: ['patients'],
        getOptimisticData: ({ id, data }, oldPatients) => {
            // Actualizar el paciente INMEDIATAMENTE en la lista
            return (oldPatients || []).map((patient: any) =>
                patient.id === id ? { ...patient, ...data } : patient
            )
        },
        successMessage: 'Paciente actualizado',
        errorMessage: 'Error al actualizar paciente',
    })
}

/**
 * Hook para eliminar con optimistic update
 */
export function useDeleteOptimistic<T = any>(entity: string) {
    return useOptimisticMutation<T, { id: string }>({
        mutationFn: async ({ id }) => {
            const response = await fetch(`/api/${entity}/${id}`, {
                method: 'DELETE',
            })
            return response.json()
        },
        queryKey: [entity],
        getOptimisticData: ({ id }, oldData) => {
            // Eliminar INMEDIATAMENTE de la lista
            return (oldData || []).filter((item: any) => item.id !== id)
        },
        successMessage: `${entity} eliminado`,
        errorMessage: `Error al eliminar ${entity}`,
    })
}
