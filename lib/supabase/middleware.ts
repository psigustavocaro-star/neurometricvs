import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/config'

export async function updateSession(request: NextRequest, response?: NextResponse) {
    let supabaseResponse = response ?? NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const { data } = await supabase.auth.getUser()
    const user = data?.user

    // Normalize path to handle locales (strip /es or /en)
    let path = request.nextUrl.pathname
    if (path.startsWith('/es/') || path === '/es') path = path.replace(/^\/es/, '') || '/'
    else if (path.startsWith('/en/') || path === '/en') path = path.replace(/^\/en/, '') || '/'

    // Admin Security Check
    if (path.startsWith('/admin')) {
        if (!user || user.email !== 'psi.gustavocaro@gmail.com') {
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    // Redirect authenticated users away from Auth pages (Login, Onboarding)
    if (user && (path.startsWith('/login') || path.startsWith('/onboarding'))) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    if (
        !user &&
        !path.startsWith('/login') &&
        !path.startsWith('/auth') &&
        !path.startsWith('/onboarding') &&
        !path.startsWith('/api') &&
        !path.startsWith('/payment') &&

        !path.startsWith('/integrations') &&
        !path.startsWith('/updates') &&
        !path.startsWith('/about') &&
        !path.startsWith('/careers') &&
        !path.startsWith('/blog') &&
        !path.startsWith('/contact') &&
        !path.startsWith('/press') &&
        !path.startsWith('/legal') &&
        !path.startsWith('/features') &&
        !path.startsWith('/pricing') &&
        !path.startsWith('/testimonials') &&
        !path.startsWith('/invite') &&
        path !== '/'
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
