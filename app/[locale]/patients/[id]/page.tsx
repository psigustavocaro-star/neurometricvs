import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PatientDashboard } from '@/components/clinical/patient-dashboard'

// Mock patient data
const getMockPatient = (id: string) => {
    const mockData: Record<string, any> = {
        'mock-1': {
            id: 'mock-1',
            full_name: 'María González Pérez',
            age: 34,
            gender: 'female',
            birth_date: '1990-03-15',
            email: 'maria.gonzalez@email.com',
            contact_email: 'maria.gonzalez@email.com',
            phone: '+56 9 8765 4321',
            diagnosis: 'Trastorno Depresivo Mayor',
            notes: 'Paciente con episodio depresivo recurrente. Buena adherencia al tratamiento. Muestra mejoría progresiva en últimas sesiones.',
            occupation: 'Profesora de Educación Básica',
            education: 'Universitaria Completa',
            marital_status: 'Casada',
            sessions_count: 24,
            created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
            last_session: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        'mock-2': {
            id: 'mock-2',
            full_name: 'Carlos Rodríguez Silva',
            age: 67,
            gender: 'male',
            birth_date: '1957-08-22',
            email: 'carlos.rodriguez@email.com',
            contact_email: 'carlos.rodriguez@email.com',
            phone: '+56 9 7654 3210',
            diagnosis: 'Deterioro Cognitivo Leve',
            notes: 'Evaluación neuropsicológica completa. Seguimiento trimestral para monitorear evolución cognitiva. Familia muy comprometida.',
            occupation: 'Jubilado (Ex-Ingeniero)',
            education: 'Universitaria Completa',
            marital_status: 'Casado',
            sessions_count: 16,
            created_at: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
            last_session: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        },
        'mock-3': {
            id: 'mock-3',
            full_name: 'Ana Martínez López',
            age: 28,
            gender: 'female',
            birth_date: '1996-11-08',
            email: 'ana.martinez@email.com',
            contact_email: 'ana.martinez@email.com',
            phone: '+56 9 6543 2109',
            diagnosis: 'Trastorno de Ansiedad Generalizada',
            notes: 'Paciente joven con alta motivación al cambio. Responde bien a terapia cognitivo-conductual. Practica técnicas de relajación regularmente.',
            occupation: 'Diseñadora Gráfica',
            education: 'Universitaria Completa',
            marital_status: 'Soltera',
            sessions_count: 12,
            created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            last_session: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        'mock-4': {
            id: 'mock-4',
            full_name: 'Roberto Silva Morales',
            age: 45,
            gender: 'male',
            birth_date: '1979-05-30',
            email: 'roberto.silva@email.com',
            contact_email: 'roberto.silva@email.com',
            phone: '+56 9 5432 1098',
            diagnosis: 'Trastorno por Déficit de Atención (TDAH Adulto)',
            notes: 'Diagnóstico tardío de TDAH. En proceso de ajuste de medicación. Mejora significativa en organización y productividad laboral.',
            occupation: 'Gerente de Proyectos',
            education: 'Universitaria Completa',
            marital_status: 'Divorciado',
            sessions_count: 18,
            created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
            last_session: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        'mock-5': {
            id: 'mock-5',
            full_name: 'Laura Fernández Castro',
            age: 16,
            gender: 'female',
            birth_date: '2008-02-14',
            email: 'laura.fernandez@email.com',
            contact_email: 'laura.fernandez@email.com',
            phone: '+56 9 4321 0987',
            diagnosis: 'Trastorno de Ansiedad Social',
            notes: 'Adolescente con dificultades en interacción social. Asiste con madre. Progreso gradual en exposición a situaciones sociales.',
            occupation: 'Estudiante Secundaria',
            education: 'Secundaria en Curso',
            marital_status: 'Soltera',
            sessions_count: 15,
            created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
            last_session: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        }
    }
    return mockData[id] || null
}

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params

    // 1. Fetch Patient
    const { data: patient } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single()

    // Use mock data if patient doesn't exist
    const patientData = patient || getMockPatient(id)

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

        if (sess) sessions = sess
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
        <div className="container pt-24 pb-10">
            <div className="mb-4">
                <Button variant="ghost" asChild className="mb-2 pl-0 hover:bg-transparent hover:text-teal-600">
                    <Link href="/patients">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Pacientes
                    </Link>
                </Button>
            </div>

            <PatientDashboard
                patient={patientData}
                clinicalRecord={clinicalRecord}
                sessions={sessions}
                testResults={testResults || []}
                testAssignments={testAssignments}
            />
        </div>
    )
}
