import { AppShell } from "@/components/layout/app-shell"
import { createClient } from "@/lib/supabase/server"

export default async function PatientsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch user's plan and profile
    let plan = 'free'
    let profile = null
    if (user) {
        const [subResponse, profileResponse] = await Promise.all([
            supabase.from('subscriptions').select('plan').eq('user_id', user.id).single(),
            supabase.from('profiles').select('*').eq('id', user.id).single()
        ])
        plan = subResponse.data?.plan || 'free'
        profile = profileResponse.data
    }

    return (
        <AppShell user={user} plan={plan} profile={profile}>
            {children}
        </AppShell>
    )
}
