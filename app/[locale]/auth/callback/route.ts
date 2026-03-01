import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data?.user) {
            let finalNext = next
            const intent = searchParams.get('intent')

            if (intent === 'signup') {
                const createdAt = new Date(data.user.created_at).getTime()
                const now = new Date().getTime()

                // If created more than 1 minute ago, it means the account already existed
                if ((now - createdAt) > 60000) {
                    finalNext += finalNext.includes('?') ? '&login_alert=existing_account' : '?login_alert=existing_account'
                }
            }

            const baseRedirectUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;
            return NextResponse.redirect(`${baseRedirectUrl}${finalNext}`)
        }
    }

    // Return the user to an error page with some instructions
    const baseRedirectUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;
    return NextResponse.redirect(`${baseRedirectUrl}/login?error=Could not authenticate user`)
}
