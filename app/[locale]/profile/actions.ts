'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const fullName = formData.get('fullName') as string
    const registryNumber = formData.get('registryNumber') as string
    const specialty = formData.get('specialty') as string
    const signatureUrl = formData.get('signatureUrl') as string

    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            full_name: fullName,
            registry_number: registryNumber,
            specialty: specialty,
            signature_url: signatureUrl,
            updated_at: new Date().toISOString(),
        })

    if (error) {
        console.error('Profile update error:', error)
        return { error: `Could not update profile: ${error.message}` }
    }

    revalidatePath('/profile')
    return { success: true }
}
