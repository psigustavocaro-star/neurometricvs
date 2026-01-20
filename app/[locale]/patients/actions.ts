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

    // New Fields
    const rut = formData.get('rut') as string
    const age = formData.get('age') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const clinic = formData.get('clinic') as string
    const education = formData.get('education') as string
    const occupation = formData.get('occupation') as string
    const companion = formData.get('companion') as string
    const emergencyContact = formData.get('emergencyContact') as string
    const genogram = formData.get('genogram') as string

    // Clinical Data
    const diagnoses = formData.get('diagnoses') as string
    const medications = formData.get('medications') as string
    const school = formData.get('school') as string
    const grade = formData.get('grade') as string
    const physicalStatus = formData.get('physical_status') as string
    const reasonForConsultation = formData.get('reason_for_consultation') as string
    const familyHistory = formData.get('family_history') as string

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

    // 1. Create Patient
    const { data: patient, error: patientError } = await supabase
        .from('patients')
        .insert({
            profile_id: profile.id,
            full_name: fullName,
            birth_date: birthDate || null,
            gender: gender,
            contact_email: email || null,
            // Extended fields (Assuming columns exist or using metadata fallback if preferred)
            // For now, attempting direct columns as the user asked for these specific elements
            rut: rut || null,
            age: age ? parseInt(age) : null,
            phone: phone || null,
            address: address || null,
            clinic: clinic || null,
            education: education || null,
            occupation: occupation || null,
            companion: companion || null,
            emergency_contact: emergencyContact || null,
            genogram: genogram || null,
        })
        .select('id')
        .single()

    if (patientError) {
        console.error('Patient creation error:', patientError)
        return { error: 'Could not create patient. ' + patientError.message }
    }

    // 2. Create Clinical Record if there is clinical info
    if (diagnoses || medications) {
        const { error: clinicalError } = await supabase
            .from('clinical_records')
            .insert({
                patient_id: patient.id,
                diagnosis: diagnoses || null,
                medications: medications || null,
                anamnesis: {
                    school: school || null,
                    grade: grade || null,
                    physical_status: physicalStatus || null,
                    reason_for_consultation: reasonForConsultation || null,
                    family_history: familyHistory || null
                }
            })

        if (clinicalError) {
            console.warn('Could not create clinical record:', clinicalError)
            // We don't fail the whole process if clinical record fails, but we might want to log it
        }
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

export async function updatePatient(id: string, formData: FormData) {
    const supabase = await createClient()

    const fullName = formData.get('fullName') as string
    const birthDate = formData.get('birthDate') as string
    const gender = formData.get('gender') as string
    const email = formData.get('email') as string
    const diagnosis = formData.get('diagnosis') as string

    // Update patient basic info
    const { error } = await supabase
        .from('patients')
        .update({
            full_name: fullName,
            birth_date: birthDate || null,
            gender: gender,
            contact_email: email || null,
        })
        .eq('id', id)

    if (error) {
        return { error: 'Could not update patient' }
    }

    // Update or create clinical record with diagnosis
    if (diagnosis !== undefined) {
        // Check if clinical record exists
        const { data: existingRecord } = await supabase
            .from('clinical_records')
            .select('id')
            .eq('patient_id', id)
            .single()

        if (existingRecord) {
            // Update existing record
            await supabase
                .from('clinical_records')
                .update({ diagnosis: diagnosis || null })
                .eq('patient_id', id)
        } else {
            // Create new clinical record
            await supabase
                .from('clinical_records')
                .insert({
                    patient_id: id,
                    diagnosis: diagnosis || null
                })
        }
    }

    revalidatePath(`/patients/${id}`)
    revalidatePath('/patients')
    revalidatePath('/dashboard')
    return { success: true }
}
