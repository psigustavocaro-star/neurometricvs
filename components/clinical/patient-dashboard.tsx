'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClinicalRecord, ClinicalSession, AIInsight } from '@/types/clinical'
import { PatientHistory } from '@/components/patients/patient-history'
import { EditPatientSheet } from '@/components/patients/edit-patient-sheet'
import { AnamnesisForm } from './anamnesis-form'
import { SessionManager } from './session-manager'
import { TreatmentPlan } from './treatment-plan'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, Activity, FileText, Files } from 'lucide-react'

import { DocumentsGenerator } from './documents-generator'
import { PatientOverview } from './patient-overview'
import { GuidedGenogramBuilder } from './guided-genogram-builder'
import { AnamnesisSummary } from './anamnesis-summary'

interface PatientDashboardProps {
    patient: any // Typed from Supabase
    clinicalRecord: ClinicalRecord | null
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    testResults: any[] // Typed from Supabase
}

export function PatientDashboard({ patient, clinicalRecord, sessions, testResults }: PatientDashboardProps) {
    const [activeTab, setActiveTab] = useState('summary')

    return (

        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Unified Header */}
            <div className="flex-none p-6 border-b border-slate-100 bg-white">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border border-slate-100">
                            <AvatarFallback className="bg-teal-50 text-teal-700 font-bold text-lg">
                                {patient.full_name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{patient.full_name}</h1>
                            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mt-1">
                                <span className="flex items-center gap-1">
                                    <CalendarDays className="w-3.5 h-3.5" />
                                    {patient.birth_date || 'Fecha N/A'}
                                </span>
                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                <span>{patient.gender === 'male' ? 'Masculino' : 'Femenino'}</span>
                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                <span>{patient.contact_email || 'Sin Email'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <EditPatientSheet patient={patient} />
                        <div className="h-6 w-px bg-slate-200 mx-1"></div>
                        <Badge variant="secondary" className="bg-slate-50 text-slate-600 border-slate-100">
                            {sessions.length} Sesiones
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-50 text-slate-600 border-slate-100">
                            {testResults.length} Tests
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Integrated Tabs */}
            <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden" onValueChange={setActiveTab}>
                <div className="flex-none border-b border-slate-100 px-6 bg-slate-50/50">
                    <TabsList className="h-12 w-full justify-start gap-6 bg-transparent p-0">
                        <TabsTrigger
                            value="overview"
                            className="h-12 rounded-none border-b-2 border-transparent px-0 pb-0 pt-0 font-medium text-slate-500 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none bg-transparent hover:text-slate-700 transition"
                        >
                            Resumen Clínico
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="h-12 rounded-none border-b-2 border-transparent px-0 pb-0 pt-0 font-medium text-slate-500 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none bg-transparent hover:text-slate-700 transition"
                        >
                            Historia & Anamnesis
                        </TabsTrigger>
                        <TabsTrigger
                            value="sessions"
                            className="h-12 rounded-none border-b-2 border-transparent px-0 pb-0 pt-0 font-medium text-slate-500 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none bg-transparent hover:text-slate-700 transition"
                        >
                            Sesiones
                        </TabsTrigger>
                        <TabsTrigger
                            value="tests"
                            className="h-12 rounded-none border-b-2 border-transparent px-0 pb-0 pt-0 font-medium text-slate-500 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none bg-transparent hover:text-slate-700 transition"
                        >
                            Evaluaciones
                        </TabsTrigger>
                        <TabsTrigger
                            value="plan"
                            className="h-12 rounded-none border-b-2 border-transparent px-0 pb-0 pt-0 font-medium text-slate-500 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none bg-transparent hover:text-slate-700 transition"
                        >
                            Plan & Tratamiento
                        </TabsTrigger>
                        <TabsTrigger
                            value="documents"
                            className="h-12 rounded-none border-b-2 border-transparent px-0 pb-0 pt-0 font-medium text-slate-500 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none bg-transparent hover:text-slate-700 transition"
                        >
                            Documentos IA
                        </TabsTrigger>
                        <TabsTrigger
                            value="genogram"
                            className="h-12 rounded-none border-b-2 border-transparent px-0 pb-0 pt-0 font-medium text-slate-500 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none bg-transparent hover:text-slate-700 transition"
                        >
                            Genograma
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 overflow-hidden bg-white relative">
                    <TabsContent value="overview" className="h-full m-0 p-0 outline-none data-[state=active]:flex flex-col">
                        <div className="h-full overflow-y-auto p-0">
                            <PatientOverview
                                patient={patient}
                                lastSession={sessions[0]} // Most recent
                                diagnosis={clinicalRecord?.diagnosis || 'En evaluación'}
                                onStartSession={() => setActiveTab('sessions')}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="history" className="h-full m-0 p-0 outline-none data-[state=active]:flex flex-col">
                        <div className="h-full overflow-y-auto p-6">
                            <AnamnesisSummary
                                clinicalRecord={clinicalRecord}
                                sessions={sessions}
                                patient={patient}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="sessions" className="h-full m-0 p-0 outline-none data-[state=active]:flex flex-col">
                        <div className="h-full overflow-hidden p-0">
                            {/* Session Manager needs to handle its own full height */}
                            <SessionManager
                                patientId={patient.id}
                                sessions={sessions}
                                patientName={patient.full_name}
                                embedded={true}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="tests" className="h-full m-0 p-0 outline-none data-[state=active]:flex flex-col">
                        <div className="h-full overflow-y-auto p-6">
                            <PatientHistory results={testResults} patientId={patient.id} />
                        </div>
                    </TabsContent>

                    <TabsContent value="plan" className="h-full m-0 p-0 outline-none data-[state=active]:flex flex-col">
                        <div className="h-full overflow-y-auto p-6">
                            <TreatmentPlan
                                patientId={patient.id}
                                initialDiagnosis={clinicalRecord?.diagnosis}
                                clinicalRecordId={clinicalRecord?.id}
                                embedded={true}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="documents" className="h-full m-0 p-0 outline-none data-[state=active]:flex flex-col">
                        <div className="h-full overflow-y-auto p-6">
                            <DocumentsGenerator
                                patientId={patient.id}
                                patientName={patient.full_name}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="genogram" className="h-full m-0 p-0 outline-none data-[state=active]:flex flex-col">
                        <div className="h-full overflow-hidden p-6">
                            <GuidedGenogramBuilder
                                patientName={patient.full_name}
                                patientGender={patient.gender}
                                onSave={(data) => {
                                    // TODO: Save genogram data to Supabase
                                    console.log('Genogram saved:', data)
                                }}
                            />
                        </div>
                    </TabsContent>
                </div>
            </Tabs >
        </div >
    )
}
