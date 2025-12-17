import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { PatientDashboard } from '@/components/clinical/patient-dashboard'





export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch User Profile for role-based features
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

    // 1. Fetch Patient
    const { data: patient } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single()

    // Use mock data if patient doesn't exist
    const patientData = patient

    if (!patientData) {
        return (
            <div className="container pt-24 pb-10">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Paciente no encontrado</h1>
                    <Button asChild>
                        <Link href="/patients">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Pacientes
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    // 2. Fetch Tests
    const { data: testResults } = await supabase
        .from('test_results')
        .select('*')
        .eq('patient_id', id)
        .order('created_at', { ascending: false })

    // 3. Fetch Clinical Data (Safely, in case migration isn't run yet)
    let clinicalRecord = null
    let sessions: any[] = []

    try {
        const { data: record } = await supabase
            .from('clinical_records')
            .select('*')
            .eq('patient_id', id)
            .single()
        clinicalRecord = record
    } catch (e) {
        console.warn('Clinical Record fetch failed (likely migration missing)')
    }

    try {
        const { data: sess } = await supabase
            .from('clinical_sessions')
            .select(`
                *,
                ai_insights (*)
            `)
            .eq('patient_id', id)
            .order('date', { ascending: false })

        if (sess) {
            sessions = sess
        }
    } catch (e) {
        console.warn('Clinical Sessions fetch failed')
    }


    // 4. Fetch Remote Test Assignments (Safely)
    let testAssignments: any[] = []
    try {
        const { data: assignments } = await supabase
            .from('test_assignments')
            .select('*')
            .eq('patient_id', id)
            .order('created_at', { ascending: false })

        if (assignments) testAssignments = assignments
    } catch (e) {
        console.warn('Test Assignments fetch failed (migration missing?)')
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="container py-4">
                <Button variant="ghost" asChild className="mb-4 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 -ml-2">
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
                    </Link>
                </Button>
            </div>

            <div className="container py-6">
                <PatientDashboard
                    patient={patientData}
                    clinicalRecord={clinicalRecord}
                    sessions={sessions}
                    testResults={testResults || []}
                    testAssignments={testAssignments}
                    userProfile={profile}
                />
            </div>
        </div>
    )
}
