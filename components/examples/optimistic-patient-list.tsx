'use client'

/**
 * 🚀 EJEMPLO DE USO: Patient List con Optimistic Updates
 * 
 * Este componente demuestra cómo usar:
 * - useOptimisticMutation para updates instantáneos
 * - usePrefetch para precargar datos
 * - InstantLink para navegación fluida
 */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useOptimisticMutation, useDeleteOptimistic } from '@/lib/hooks/use-optimistic-mutation'
import { usePrefetchOnHover } from '@/lib/hooks/use-prefetch'
import { InstantLink } from '@/lib/hooks/use-instant-transition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Trash2, UserPlus } from 'lucide-react'
import { toast } from 'sonner'

export function OptimisticPatientList() {
    const [newPatientName, setNewPatientName] = useState('')
    const { handleMouseEnter } = usePrefetchOnHover()

    // ✅ Obtener lista de pacientes con cache automático
    const { data: patients = [], isLoading } = useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            const response = await fetch('/api/patients')
            return response.json()
        },
    })

    // 🚀 Crear paciente con OPTIMISTIC UPDATE
    const createPatient = useOptimisticMutation({
        mutationFn: async (name: string) => {
            const response = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            })
            if (!response.ok) throw new Error('Failed to create patient')
            return response.json()
        },
        queryKey: ['patients'],
        // ⚡ Esta función se ejecuta INMEDIATAMENTE (0ms)
        getOptimisticData: (name, oldPatients) => {
            return [
                {
                    id: `temp-${Date.now()}`,
                    name,
                    created_at: new Date().toISOString(),
                    status: 'pending', // Indicador visual de que está pendiente
                },
                ...(oldPatients || []),
            ]
        },
        successMessage: '✅ Paciente creado',
        errorMessage: '❌ Error al crear paciente',
    })

    // 🗑️ Eliminar paciente con feedback instantáneo
    const deletePatient = useDeleteOptimistic('patients')

    // 📝 Actualizar paciente con optimistic update
    const updatePatient = useOptimisticMutation({
        mutationFn: async ({ id, name }: { id: string; name: string }) => {
            const response = await fetch(`/api/patients/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            })
            return response.json()
        },
        queryKey: ['patients'],
        getOptimisticData: ({ id, name }, oldPatients) => {
            // Actualizar INMEDIATAMENTE en la lista
            return (oldPatients || []).map((patient: any) =>
                patient.id === id ? { ...patient, name } : patient
            )
        },
        successMessage: '✅ Paciente actualizado',
    })

    const handleCreate = () => {
        if (!newPatientName.trim()) {
            toast.error('Ingresa un nombre')
            return
        }

        // ⚡ UI se actualiza INSTANTÁNEAMENTE (sin esperar servidor)
        createPatient.mutate(newPatientName)
        setNewPatientName('')
    }

    if (isLoading) {
        return <div className="p-8">Cargando...</div>
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">📋 Pacientes (Optimistic UI)</h1>

            {/* Formulario de creación */}
            <Card className="p-6">
                <div className="flex gap-4">
                    <Input
                        value={newPatientName}
                        onChange={(e) => setNewPatientName(e.target.value)}
                        placeholder="Nombre del paciente"
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                        className="flex-1"
                    />
                    <Button
                        onClick={handleCreate}
                        disabled={createPatient.isPending}
                        className="gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        {createPatient.isPending ? 'Creando...' : 'Crear'}
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    💡 La UI se actualiza <strong>instantáneamente</strong> antes de confirmar con el servidor
                </p>
            </Card>

            {/* Lista de pacientes */}
            <div className="space-y-3">
                {patients.map((patient: any) => (
                    <Card
                        key={patient.id}
                        className={`p-4 transition-all ${patient.status === 'pending' ? 'opacity-60' : 'opacity-100'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center flex-1">
                                {/* Link con prefetch on hover y transición instantánea */}
                                <InstantLink
                                    href={`/patients/${patient.id}`}
                                    className="font-medium hover:text-primary transition-colors"
                                    onMouseEnter={() => {
                                        // Precargar datos del paciente al hacer hover
                                        handleMouseEnter(
                                            `/patients/${patient.id}`,
                                            {
                                                queryKey: ['patient', patient.id],
                                                fetcher: () =>
                                                    fetch(`/api/patients/${patient.id}`).then((r) => r.json()),
                                            }
                                        )
                                    }}
                                >
                                    {patient.name}
                                    {patient.status === 'pending' && (
                                        <span className="ml-2 text-xs text-muted-foreground">
                                            (guardando...)
                                        </span>
                                    )}
                                </InstantLink>

                                <span className="text-xs text-muted-foreground">
                                    {new Date(patient.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Botón de eliminar con optimistic update */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    // ⚡ UI se actualiza INMEDIATAMENTE
                                    deletePatient.mutate({ id: patient.id })
                                }}
                                disabled={deletePatient.isPending}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {patients.length === 0 && (
                <Card className="p-12 text-center text-muted-foreground">
                    <p>No hay pacientes. Crea uno para comenzar.</p>
                </Card>
            )}

            {/* Indicadores de estado */}
            <div className="text-xs text-muted-foreground space-y-1">
                <p>
                    ✅ <strong>Optimistic Updates:</strong> La UI se actualiza antes de confirmar
                </p>
                <p>
                    🔄 <strong>Auto Rollback:</strong> Si falla, se revierte automáticamente
                </p>
                <p>
                    ⚡ <strong>Prefetch on Hover:</strong> Datos precargados al pasar el mouse
                </p>
                <p>
                    🎬 <strong>Instant Transitions:</strong> Navegación sin parpadeos
                </p>
            </div>
        </div>
    )
}
