'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Assigns a test to a patient, generating a unique token/link.
 * Only authenticated professionals can call this.
 */
export async function assignTest(patientId: string, testId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    // Check if patient exists AND belongs to user (using the RLS policy indirectly or explicit check)
    // We also need the Email to send the link
    const { data: patient } = await supabase
        .from('patients')
        .select('id, contact_email, full_name, profile_id')
        .eq('id', patientId)
        .single()

    // Explicit security check (redundant with RLS but good for logic)
    if (!patient || patient.profile_id !== user.id) {
        return { error: 'Patient not found or unauthorized' }
    }

    // Create assignment
    const { data: assignment, error } = await supabase
        .from('test_assignments')
        .insert({
            patient_id: patientId,
            test_id: testId,
            status: 'pending'
        })
        .select('token') // Return the generated UUID token
        .single()

    if (error || !assignment) {
        console.error(error)
        return { error: 'Could not create assignment' }
    }

    revalidatePath(`/patients/${patientId}`)
    return { success: true, token: assignment.token }
}

/**
 * Retrieves assignment details by token. Public/Anonymous access.
 * Uses the security definer function 'get_assignment_by_token' to bypass strict RLS safely.
 */
export async function getRemoteTest(token: string) {
    const supabase = await createClient()

    // Use RPC function defined in migration
    const { data, error } = await supabase
        .rpc('get_assignment_by_token', { lookup_token: token })
        .single()

    if (error || !data) {
        return { error: 'Test not found or invalid token' }
    }

    const assignment = data as any

    if (assignment.status === 'completed') {
        return { error: 'This test has already been completed.' }
    }

    return { success: true, data }
}

/**
 * Submits results for a remote test.
 * Uses RPC 'submit_assignment_results'.
 * Also triggers the creation of a 'test_results' record for historical consistency?
 * Wait, my plan said "Unified Report" which reads from `test_assignments` or maybe I should sync it to `test_results`?
 * The table 'test_results' is what the dashboard uses for charts/history.
 * Ideally, when 'test_assignments' is completed, we ALSO insert into 'test_results'.
 * I will do that here in the action logic or updating the RPC.
 * Doing it here: easier to manage logic.
 */
export async function submitRemoteTest(token: string, resultData: any) {
    const supabase = await createClient()

    // 1. Get assignment to verify and get patient_id
    const { data: assignmentData, error: fetchError } = await supabase
        .rpc('get_assignment_by_token', { lookup_token: token })
        .single()

    const assignment = assignmentData as any

    if (fetchError || !assignment) return { error: 'Invalid token' }
    if (assignment.status === 'completed') return { error: 'Already completed' }

    // 2. Insert into the MAIN test_results table so it shows up in history/reports automatically
    // We need the profile_id (professional). We can get it from the patient record.
    const { data: patientData } = await supabase
        .from('patients')
        .select('profile_id')
        .eq('id', assignment.patient_id)
        .single()

    if (patientData) {
        await supabase
            .from('test_results')
            .insert({
                patient_id: assignment.patient_id,
                profile_id: patientData.profile_id,
                test_type: assignment.test_id,
                results_json: resultData,
                // Add a flag or metadata to say "Remote"?
            })
    }

    // 3. Mark assignment as completed via RPC
    const { error: submitError } = await supabase
        .rpc('submit_assignment_results', {
            lookup_token: token,
            new_results: resultData
        })

    if (submitError) return { error: 'Failed to submit' }

    return { success: true }
}
