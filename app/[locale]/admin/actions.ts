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
