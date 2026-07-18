'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { mapAuthErrorKey } from '@/lib/auth-errors'

export async function loginAction(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login error:', error)
        return { errorKey: mapAuthErrorKey(error) }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function signupAction(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Signup error:', error)
        return { errorKey: mapAuthErrorKey(error) }
    }

    revalidatePath('/', 'layout')
    return { success: true, messageKey: 'check_email' }
}

export async function resendAction(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
    })

    if (error) {
        return { errorKey: mapAuthErrorKey(error) }
    }

    return { success: true, messageKey: 'confirmation_resent' }
}
