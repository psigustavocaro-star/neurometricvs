'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { paddle } from '@/lib/paddle'

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

    try {
        // Fetch current subscription from DB to see if they have Paddle recurrent billing
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (subscription && subscription.stripe_subscription_id) {
            // Attempt to proactively cancel the subscription in Paddle
            try {
                await paddle.subscriptions.cancel(subscription.stripe_subscription_id, {
                    effectiveFrom: 'immediately'
                })
            } catch (paddleError) {
                console.error("Failed to cancel paddle subscription automatically during account deletion:", paddleError)
                // Continue with deletion even if Paddle fails, to not trap the user. 
                // In production, this might trigger manual review.
            }
        }
    } catch (e) {
        console.error("Error reading subscription for cancellation:", e)
    }

    const adminAuthClient = createAdminClient()
    const { error } = await adminAuthClient.auth.admin.deleteUser(user.id)

    if (error) {
        return { error: error.message }
    }

    // Sign out to clean up local cookies
    await supabase.auth.signOut()
    return { success: true }
}

export async function cancelSubscription() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'No autorizado' }
    }

    try {
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (!subscription || !subscription.stripe_subscription_id) {
            return { error: 'No se encontró una suscripción activa.' }
        }

        // Cancel the subscription in Paddle effectively at the end of the billing period
        await paddle.subscriptions.cancel(subscription.stripe_subscription_id, {
            effectiveFrom: 'next_billing_period'
        })

        // Update local DB to reflect status intent. Wait for webhook to fully downgrade.
        await supabase
            .from('subscriptions')
            .update({ status: 'canceled' })
            .eq('user_id', user.id)

        revalidatePath('/profile')
        return { success: true }

    } catch (e: any) {
        console.error("Error canceling subscription:", e)
        return { error: e.message || 'Error al cancelar la suscripción. Por favor contacta a soporte.' }
    }
}
