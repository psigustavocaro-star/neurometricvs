import { AppShell } from "@/components/layout/app-shell"
import { createClient } from "@/lib/supabase/server"
import { DashboardSetup } from "@/components/dashboard/dashboard-setup"
import { WelcomeTour } from "@/components/dashboard/welcome-tour"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let plan = 'basic'
    let profile = null

    if (user) {
        const [subResponse, profileResponse] = await Promise.all([
            supabase.from('subscriptions').select('plan').eq('user_id', user.id).single(),
            supabase.from('profiles').select('*').eq('id', user.id).single()
        ])

        plan = subResponse.data?.plan || 'basic'
        profile = profileResponse.data
    }

    // Force setup if profile is missing critical professional data
    const isProfileIncomplete = profile && (!profile.specialty || !profile.registry_number)

    if (isProfileIncomplete) {
        return <DashboardSetup user={user} profile={profile} />
    }

    return (
        <AppShell user={user} plan={plan}>
            <WelcomeTour />
            {children}
        </AppShell>
    )
}

