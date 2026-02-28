'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const fullName = formData.get('fullName') as string
    const registryNumber = formData.get('registryNumber') as string
    const specialty = formData.get('specialty') as string
    const phone = formData.get('phone') as string
    const signatureUrl = formData.get('signatureUrl') as string
    const avatarUrl = formData.get('avatarUrl') as string

    // Auth Updates
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const currentPassword = formData.get('currentPassword') as string

    const updates: any = {}

    // Email update
    if (email && email !== user.email) {
        updates.email = email
    }

    // Password update with verification
    if (password && password.length > 0) {
        if (!currentPassword) {
            return { error: 'Debes ingresar tu contraseña actual para establecer una nueva.' }
        }

        // Verify old password by attempting a sign in (without establishing session)
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email!,
            password: currentPassword
        })

        if (signInError) {
            return { error: 'La contraseña actual es incorrecta.' }
        }

        updates.password = password
    }

    if (avatarUrl !== undefined && avatarUrl !== null) {
        updates.avatar_url = avatarUrl === '' ? null : avatarUrl
    }

    if (Object.keys(updates).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(updates)
        if (authError) {
            return { error: `Error updating account: ${authError.message}` }
        }
    }

    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            full_name: fullName,
            registry_number: registryNumber,
            specialty: specialty,
            phone: phone,
            signature_url: signatureUrl,
            avatar_url: avatarUrl === '' ? null : avatarUrl,
            updated_at: new Date().toISOString(),
        })

    if (error) {
        console.error('Profile update error:', error)
        return { error: `Could not update profile: ${error.message}` }
    }

    revalidatePath('/profile')
    return { success: true, emailChanged: !!updates.email }
}

export async function deleteAccount() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'No autorizado' }
    }

    // Here we could try to call Paddle API if there's a stored active subscription 
    // to cancel it securely, but Paddle doesn't have native cancel-by-email cleanly without subscription ID. 
    // In many cases, Paddle manages recurring billing via the webhooks, or we notify manual cancel.
    // For now, destroying the supabase user will break app access, so we do it with admin.

    const adminAuthClient = createAdminClient()
    const { error } = await adminAuthClient.auth.admin.deleteUser(user.id)

    if (error) {
        return { error: error.message }
    }

    // Sign out to clean up local cookies
    await supabase.auth.signOut()
    return { success: true }
}
