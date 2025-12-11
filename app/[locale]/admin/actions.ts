'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Helper to generate random string
const randomString = (length: number) => Math.random().toString(36).substring(2, 2 + length)

// Helper to generate random date within last N years
const randomDate = (yearsBack: number) => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - Math.floor(Math.random() * yearsBack))
    date.setMonth(Math.floor(Math.random() * 12))
    date.setDate(Math.floor(Math.random() * 28))
    return date.toISOString().split('T')[0]
}

export async function generateMockPatients(count: number = 5) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== 'psi.gustavocaro@gmail.com') {
        return { error: 'Unauthorized' }
    }

    // Get or create profile
    let { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (!profile) {
        const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || 'Profesional',
                specialty: 'Psicología',
            })
            .select('id')
            .single()

        if (createError || !newProfile) {
            return { error: 'Could not create profile' }
        }
        profile = newProfile
    }

    const firstNames = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Sofia', 'Carlos', 'Lucía', 'Diego', 'Valentina']
    const lastNames = ['González', 'Muñoz', 'Rojas', 'Díaz', 'Pérez', 'Soto', 'Contreras', 'Silva', 'Martínez', 'Sepúlveda']

    const patients = Array.from({ length: count }).map(() => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        return {
            profile_id: profile.id,
            full_name: `${firstName} ${lastName}`,
            contact_email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${randomString(4)}@example.com`,
            birth_date: randomDate(50),
            gender: Math.random() > 0.5 ? 'Masculino' : 'Femenino',
        }
    })

    const { error } = await supabase.from('patients').insert(patients)

    if (error) {
        console.error('Error creating mock patients:', error)
        return { error: error.message }
    }

    revalidatePath('/dashboard/patients')
    return { success: true, count }
}

export async function generateMockTestResult(patientId?: string, testId: string = 'snap-iv') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== 'psi.gustavocaro@gmail.com') {
        return { error: 'Unauthorized' }
    }

    let targetPatientId = patientId

    if (!targetPatientId) {
        const { data: patients } = await supabase.from('patients').select('id').limit(10)
        if (patients && patients.length > 0) {
            targetPatientId = patients[Math.floor(Math.random() * patients.length)].id
        } else {
            return { error: 'No patients found' }
        }
    }

    // Mock SNAP-IV results
    const score = Math.floor(Math.random() * 30) // 0-30 range roughly
    const label = score < 13 ? 'Sin Indicadores Clínicos' : 'Indicadores Clínicos Significativos'

    // Generate random answers for 18 items (0-3)
    const answers: Record<string, number> = {}
    for (let i = 1; i <= 18; i++) {
        answers[`q${i}`] = Math.floor(Math.random() * 4)
    }

    const { data, error } = await supabase.from('test_results').insert({
        profile_id: user.id, // profile_id is same as user.id
        patient_id: targetPatientId,
        test_type: testId,
        results_json: {
            score: score,
            label: label,
            date: new Date().toISOString(),
            details: {
                answers,
                subscales: {
                    inattention: { score: Math.floor(Math.random() * 27), label: 'N/A' },
                    hyperactivity: { score: Math.floor(Math.random() * 27), label: 'N/A' }
                }
            },
            scores: {
                total: score,
                totalLabel: label,
                inattention: Math.floor(Math.random() * 3), // Mock average score
                inattentionLabel: Math.random() > 0.5 ? 'Normal' : 'Clínico',
                hyperactivity: Math.floor(Math.random() * 3),
                hyperactivityLabel: Math.random() > 0.5 ? 'Normal' : 'Clínico'
            }
        }
    }).select().single()

    if (error) {
        console.error('Error creating mock result:', error)
        return { error: error.message }
    }

    revalidatePath(`/patients/${targetPatientId}`)
    return { success: true, id: data.id, patientId: targetPatientId }
}

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL } from '@/lib/config'

export async function setSubscriptionPlan(plan: 'basic' | 'clinical' | 'pro') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== 'psi.gustavocaro@gmail.com') {
        return { error: 'Unauthorized' }
    }

    let adminSupabase = supabase
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        adminSupabase = createSupabaseClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }) as any
    }

    // Check for existing subscription(s)
    const { data: existingSubs } = await adminSupabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user.id)

    if (existingSubs && existingSubs.length > 0) {
        // Update the first one
        const { error } = await adminSupabase
            .from('subscriptions')
            .update({
                plan: plan,
                status: 'active',
                current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            })
            .eq('id', existingSubs[0].id)

        if (error) return { error: error.message }

        // Delete duplicates if any
        if (existingSubs.length > 1) {
            const idsToDelete = existingSubs.slice(1).map(s => s.id)
            await adminSupabase.from('subscriptions').delete().in('id', idsToDelete)
        }
    } else {
        // Insert new
        const { error } = await adminSupabase.from('subscriptions').insert({
            user_id: user.id,
            plan: plan,
            status: 'active',
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        if (error) return { error: error.message }
    }

    revalidatePath('/', 'layout') // Revalidate RootLayout (Navbar)
    revalidatePath('/profile')    // Revalidate Profile Page
    revalidatePath('/dashboard')  // Revalidate Dashboard
    return { success: true, plan }
}

// Generate comprehensive mock data for testing all features
export async function generateCompleteMockData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== 'psi.gustavocaro@gmail.com') {
        return { error: 'Unauthorized' }
    }

    try {
        // 1. Create 5 patients with complete profiles
        const mockPatients = [
            {
                full_name: 'María González Pérez',
                age: 34,
                gender: 'female',
                birth_date: '1990-03-15',
                email: 'maria.gonzalez@email.com',
                contact_email: 'maria.gonzalez@email.com',
                phone: '+56 9 8765 4321',
                profile_id: user.id,
                diagnosis: 'Trastorno Depresivo Mayor',
                notes: 'Paciente con episodio depresivo recurrente. Buena adherencia al tratamiento.',
                occupation: 'Profesora',
                education: 'Universitaria',
                marital_status: 'Casada',
            },
            {
                full_name: 'Carlos Rodríguez Silva',
                age: 67,
                gender: 'male',
                birth_date: '1957-08-22',
                email: 'carlos.rodriguez@email.com',
                contact_email: 'carlos.rodriguez@email.com',
                phone: '+56 9 7654 3210',
                profile_id: user.id,
                diagnosis: 'Deterioro Cognitivo Leve',
                notes: 'Evaluación neuropsicológica completa.',
                occupation: 'Jubilado',
                education: 'Universitaria',
                marital_status: 'Casado',
            },
            {
                full_name: 'Ana Martínez López',
                age: 28,
                gender: 'female',
                birth_date: '1996-11-08',
                email: 'ana.martinez@email.com',
                contact_email: 'ana.martinez@email.com',
                phone: '+56 9 6543 2109',
                profile_id: user.id,
                diagnosis: 'Trastorno de Ansiedad',
                notes: 'Alta motivación al cambio.',
                occupation: 'Diseñadora',
                education: 'Universitaria',
                marital_status: 'Soltera',
            },
            {
                full_name: 'Roberto Silva Morales',
                age: 45,
                gender: 'male',
                birth_date: '1979-05-30',
                email: 'roberto.silva@email.com',
                contact_email: 'roberto.silva@email.com',
                phone: '+56 9 5432 1098',
                profile_id: user.id,
                diagnosis: 'TDAH Adulto',
                notes: 'En proceso de ajuste.',
                occupation: 'Gerente',
                education: 'Universitaria',
                marital_status: 'Divorciado',
            },
            {
                full_name: 'Laura Fernández Castro',
                age: 16,
                gender: 'female',
                birth_date: '2008-02-14',
                email: 'laura.fernandez@email.com',
                contact_email: 'laura.fernandez@email.com',
                phone: '+56 9 4321 0987',
                profile_id: user.id,
                diagnosis: 'Ansiedad Social',
                notes: 'Progreso gradual.',
                occupation: 'Estudiante',
                education: 'Secundaria',
                marital_status: 'Soltera',
            },
        ]

        const { data: createdPatients, error: patientsError } = await supabase
            .from('patients')
            .insert(mockPatients)
            .select()

        if (patientsError) throw patientsError

        let totalSessions = 0
        let totalTests = 0
        let totalRecords = 0
        let totalGenograms = 0

        // 2. Create sessions, tests, and records for each patient
        for (const patient of createdPatients || []) {
            // Create 3-5 sessions per patient
            const sessionCount = 3 + Math.floor(Math.random() * 3)
            const sessions = []
            for (let i = 0; i < sessionCount; i++) {
                sessions.push({
                    patient_id: patient.id,
                    profile_id: user.id,
                    session_date: new Date(Date.now() - (sessionCount - i) * 14 * 24 * 60 * 60 * 1000).toISOString(),
                    duration: 50,
                    session_type: 'individual',
                    notes: `Sesión ${i + 1}: Trabajando en objetivos terapéuticos. ${patient.diagnosis}`,
                    mood_rating: 3 + Math.floor(Math.random() * 3),
                })
            }
            await supabase.from('sessions').insert(sessions)
            totalSessions += sessions.length

            // Create clinical record
            await supabase.from('clinical_records').insert({
                patient_id: patient.id,
                profile_id: user.id,
                motivo_consulta: `Consulta por ${patient.diagnosis}`,
                antecedentes_personales: 'Sin antecedentes relevantes',
                antecedentes_familiares: 'Familia sin antecedentes psiquiátricos',
                diagnostico_inicial: patient.diagnosis,
                plan_tratamiento: 'Terapia semanal',
            })
            totalRecords++

            // Create genogram
            await supabase.from('genograms').insert({
                patient_id: patient.id,
                profile_id: user.id,
                data: {
                    nodes: [
                        { id: 'patient', name: patient.full_name, gender: patient.gender, x: 400, y: 300 },
                        { id: 'mother', name: 'Madre', gender: 'female', x: 350, y: 150 },
                        { id: 'father', name: 'Padre', gender: 'male', x: 450, y: 150 },
                    ],
                    edges: []
                }
            })
            totalGenograms++

            // Create 2 test results per patient
            const tests = [
                {
                    patient_id: patient.id,
                    profile_id: user.id,
                    test_type: 'PHQ-9',
                    results_json: {
                        score: 10 + Math.floor(Math.random() * 10),
                        label: 'Moderado',
                        date: new Date().toISOString()
                    }
                },
                {
                    patient_id: patient.id,
                    profile_id: user.id,
                    test_type: 'GAD-7',
                    results_json: {
                        score: 8 + Math.floor(Math.random() * 10),
                        label: 'Leve-Moderado',
                        date: new Date().toISOString()
                    }
                }
            ]
            await supabase.from('test_results').insert(tests)
            totalTests += tests.length
        }

        revalidatePath('/dashboard')
        revalidatePath('/patients')

        return {
            success: true,
            message: `✓ Datos generados: ${createdPatients?.length} pacientes, ${totalSessions} sesiones, ${totalTests} tests, ${totalRecords} registros clínicos, ${totalGenograms} genogramas`
        }
    } catch (error: any) {
        console.error('Error generating mock data:', error)
        return { success: false, error: error.message }
    }
}

export async function clearAllMockData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== 'psi.gustavocaro@gmail.com') {
        return { error: 'Unauthorized' }
    }

    try {
        // Delete in reverse order of dependencies
        await supabase.from('genograms').delete().eq('profile_id', user.id)
        await supabase.from('test_results').delete().eq('profile_id', user.id)
        await supabase.from('clinical_records').delete().eq('profile_id', user.id)
        await supabase.from('sessions').delete().eq('profile_id', user.id)
        await supabase.from('patients').delete().eq('profile_id', user.id)

        revalidatePath('/dashboard')
        revalidatePath('/patients')

        return { success: true, message: '✓ Todos los datos han sido eliminados' }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}
