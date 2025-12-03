'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveTestResult(patientId: string, testId: string, score: number, result: any) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    // Get profile id
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (!profile) return { error: 'Profile not found' }

    const { data: newResult, error } = await supabase
        .from('test_results')
        .insert({
            patient_id: patientId,
            profile_id: profile.id,
            test_type: testId,
            results_json: { score, ...result },
        })
        .select('id')
        .single()

    if (error) {
        console.error(error)
        return { error: 'Could not save test result' }
    }

    revalidatePath(`/patients/${patientId}`)
    return { success: true, id: newResult.id }
}
