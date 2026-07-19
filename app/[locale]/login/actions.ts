'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { mapAuthErrorKey } from '@/lib/auth-errors'
import { getLocale } from 'next-intl/server'

export async function login(formData: FormData) {
    const supabase = await createClient()
    const locale = await getLocale()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login error:', error)
        redirect(`/${locale}/login?error=${mapAuthErrorKey(error)}`)
    }

    revalidatePath(`/${locale}`, 'layout')
    redirect(`/${locale}/dashboard`)
}

export async function signup(formData: FormData) {
    const supabase = await createClient()
    const locale = await getLocale()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Signup error:', error)
        redirect(`/${locale}/login?error=${mapAuthErrorKey(error)}`)
    }

    revalidatePath(`/${locale}`, 'layout')
    redirect(`/${locale}/login?message=check_email`)
}

export async function resendConfirmation(formData: FormData) {
    const supabase = await createClient()
    const locale = await getLocale()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
    })

    if (error) {
        redirect(`/${locale}/login?error=${mapAuthErrorKey(error)}`)
    }

    redirect(`/${locale}/login?message=confirmation_resent`)
}
