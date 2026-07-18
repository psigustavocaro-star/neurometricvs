// Maps Supabase auth errors to i18n keys under `Login.errors.*`
export function mapAuthErrorKey(error: { message?: string } | null): string {
    if (!error) return 'unknown'
    const msg = (error.message || '').toLowerCase()
    if (msg.includes('fetch failed') || msg.includes('network') || msg.includes('failed to fetch')) return 'service_unavailable'
    if (msg.includes('invalid login credentials')) return 'invalid_credentials'
    if (msg.includes('email not confirmed')) return 'email_not_confirmed'
    if (msg.includes('rate limit') || msg.includes('too many')) return 'rate_limited'
    if (msg.includes('already registered')) return 'already_registered'
    if (msg.includes('password should be')) return 'weak_password'
    if (msg.includes('unable to validate email') || msg.includes('invalid email')) return 'invalid_email'
    return 'unknown'
}
