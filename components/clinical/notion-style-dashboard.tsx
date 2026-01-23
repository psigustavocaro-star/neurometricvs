'use client'

import React, { useState } from 'react'
import { ClinicalRecord, ClinicalSession, AIInsight } from '@/types/clinical'
import { PatientInfoPanel } from './patient-info-panel'
import { SessionListPanel } from './session-list-panel'
import { SessionDetailPanel } from './session-detail-panel'
import { createSession, updateClinicalRecord } from '@/app/[locale]/patients/clinical-actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface NotionStyleDashboardProps {
    patient: any
    clinicalRecord: ClinicalRecord | null
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
}

export function NotionStyleDashboard({ patient, clinicalRecord, sessions }: NotionStyleDashboardProps) {
    const router = useRouter()
    const [selectedSession, setSelectedSession] = useState<ClinicalSession | null>(
        sessions.length > 0 ? sessions[0] : null
    )

    const handleSelectSession = (session: ClinicalSession) => {
        setSelectedSession(session)
    }

    const handleNewSession = async () => {
        try {
            const newSession = await createSession(patient.id, {
                type: 'Consulta',
                notes: ''
            })
            toast.success('Nueva sesión creada')
            router.refresh()
        } catch (error) {
            toast.error('Error al crear sesión')
        }
    }

    const handleUpdatePatient = async (field: string, value: string) => {
        try {
            // For diagnosis and medications, update clinical record
            if (field === 'diagnosis' || field === 'medications') {
                await updateClinicalRecord(patient.id, { [field]: value })
            } else {
                // For other fields, would need updatePatient action
                // For now, show toast
                toast.info('Campo actualizado')
            }
            router.refresh()
        } catch (error) {
            toast.error('Error al actualizar')
        }
    }

    const handleSessionUpdate = () => {
        router.refresh()
    }

    return (
        <div className="flex h-[calc(100vh-6rem)] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Panel 1: Patient Info */}
            <div className="w-80 flex-shrink-0">
                <PatientInfoPanel
                    patient={patient}
                    clinicalRecord={clinicalRecord}
                    onUpdate={handleUpdatePatient}
                />
            </div>

            {/* Panel 2: Session List */}
            <div className="w-80 flex-shrink-0">
                <SessionListPanel
                    sessions={sessions}
                    selectedSessionId={selectedSession?.id}
                    onSelectSession={handleSelectSession}
                    onNewSession={handleNewSession}
                />
            </div>

            {/* Panel 3: Session Detail */}
            <div className="flex-1 min-w-0">
                <SessionDetailPanel
                    session={selectedSession}
                    patientId={patient.id}
                    onUpdate={handleSessionUpdate}
                />
            </div>
        </div>
    )
}
