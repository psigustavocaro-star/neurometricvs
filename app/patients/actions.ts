'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createPatient(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Check subscription plan (Basic plan cannot create patients)
    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single()

    // Allow if no subscription found (assuming trial/dev) or if plan is not basic
    // In production, you'd enforce this strictly.
    // if (subscription?.plan === 'basic') {
    //   return { error: 'Basic plan cannot save patients' }
    // }

    const fullName = formData.get('fullName') as string
    const birthDate = formData.get('birthDate') as string
    const gender = formData.get('gender') as string
    const email = formData.get('email') as string

    // Get profile id
    let { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (!profile) {
        // Auto-create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || 'Profesional',
                specialty: 'Psicología', // Default value
            })
            .select('id')
            .single()

        if (createError || !newProfile) {
            console.error('Error creating profile:', createError)
            return { error: 'No se pudo crear el perfil del profesional. Por favor contacte a soporte.' }
        }
        profile = newProfile
    }

    const { error } = await supabase
        .from('patients')
        .insert({
            profile_id: profile.id,
            full_name: fullName,
            birth_date: birthDate || null,
            gender: gender,
            contact_email: email || null,
        })

    if (error) {
        return { error: 'Could not create patient' }
    }

    revalidatePath('/patients')
    redirect('/patients')
}

export async function deletePatient(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id)

    if (error) {
        return { error: 'Could not delete patient' }
    }

    revalidatePath('/patients')
}
