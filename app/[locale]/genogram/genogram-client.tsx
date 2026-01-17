'use client'

import { useState } from 'react'
import { GuidedGenogramBuilder } from '@/components/clinical/guided-genogram-builder'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, GitGraph, UserPlus } from "lucide-react"
import Link from "next/link"
import { NewPatientDialog } from '@/components/patients/NewPatientDialog'

interface Patient {
    id: string
    first_name: string
    last_name: string
    full_name: string
    gender: 'male' | 'female' | 'other'
}

interface GenogramClientPageProps {
    patients: Patient[]
}

export function GenogramClientPage({ patients }: GenogramClientPageProps) {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

    const handlePatientSelect = (patientId: string) => {
        const patient = patients.find(p => p.id === patientId)
        if (patient) {
            setSelectedPatient(patient)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-20">
            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="ghost" size="sm" asChild className="gap-2 text-slate-600 dark:text-slate-400">
                        <Link href="/dashboard">
                            <ArrowLeft className="w-4 h-4" />
                            Volver al Dashboard
                        </Link>
                    </Button>
                </div>

                {!selectedPatient ? (
                    // Patient Selection View
                    <Card className="max-w-lg mx-auto">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                                <GitGraph className="w-8 h-8 text-teal-600" />
                            </div>
                            <CardTitle className="text-2xl">Generador de Genograma</CardTitle>
                            <CardDescription>
                                Selecciona un paciente para crear o editar su genograma familiar
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Seleccionar Paciente
                                </label>
                                <Select onValueChange={handlePatientSelect}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder={patients.length === 0 ? "No hay pacientes" : "Elige un paciente"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {patients.length === 0 ? (
                                            <div className="p-4 text-center text-sm text-muted-foreground">
                                                No hay pacientes registrados
                                            </div>
                                        ) : (
                                            patients.map((patient) => (
                                                <SelectItem key={patient.id} value={patient.id}>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-slate-400" />
                                                        {patient.full_name}
                                                    </div>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-xs text-center text-muted-foreground mb-3">
                                    ¿No encuentras al paciente?
                                </p>
                                <NewPatientDialog
                                    trigger={
                                        <Button variant="outline" className="w-full gap-2">
                                            <UserPlus className="w-4 h-4" />
                                            Crear Nuevo Paciente
                                        </Button>
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    // Genogram Builder View
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-4 border shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-teal-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">
                                        {selectedPatient.full_name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Genograma Familiar</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                                Cambiar Paciente
                            </Button>
                        </div>

                        <GuidedGenogramBuilder
                            patientName={selectedPatient.full_name}
                            patientGender={selectedPatient.gender === 'female' ? 'female' : 'male'}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
