'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, LayoutGrid, List } from 'lucide-react'
import { PatientDashboard } from '@/components/clinical/patient-dashboard'
import { NotionStyleDashboard } from '@/components/clinical/notion-style-dashboard'
import { ClinicalRecord, ClinicalSession, AIInsight } from '@/types/clinical'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PatientPageClientProps {
    patient: any
    clinicalRecord: ClinicalRecord | null
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    testResults: any[]
    testAssignments: any[]
    userProfile: any
    vitalsLogs: any[]
    medications: any[]
}

type ViewMode = 'classic' | 'notion'

export function PatientPageClient({
    patient,
    clinicalRecord,
    sessions,
    testResults,
    testAssignments,
    userProfile,
    vitalsLogs,
    medications
}: PatientPageClientProps) {
    const t = useTranslations('Dashboard.Patients.Detail')
    const [viewMode, setViewMode] = useState<ViewMode>('notion')

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header with back button and view toggle */}
            <div className="container py-4 flex items-center justify-between">
                <Button
                    variant="ghost"
                    asChild
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 -ml-2"
                >
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {t('back_to_dashboard')}
                    </Link>
                </Button>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode('notion')}
                        className={cn(
                            "h-8 px-3 gap-2 rounded-md",
                            viewMode === 'notion'
                                ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        <List className="w-4 h-4" />
                        <span className="text-xs font-medium">Notion</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode('classic')}
                        className={cn(
                            "h-8 px-3 gap-2 rounded-md",
                            viewMode === 'classic'
                                ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        <LayoutGrid className="w-4 h-4" />
                        <span className="text-xs font-medium">Clásico</span>
                    </Button>
                </div>
            </div>

            {/* Content based on view mode */}
            <div className="container py-6">
                {viewMode === 'notion' ? (
                    <NotionStyleDashboard
                        patient={patient}
                        clinicalRecord={clinicalRecord}
                        sessions={sessions}
                    />
                ) : (
                    <PatientDashboard
                        patient={patient}
                        clinicalRecord={clinicalRecord}
                        sessions={sessions}
                        testResults={testResults}
                        testAssignments={testAssignments}
                        userProfile={userProfile}
                        vitalsLogs={vitalsLogs}
                        medications={medications}
                    />
                )}
            </div>
        </div>
    )
}
