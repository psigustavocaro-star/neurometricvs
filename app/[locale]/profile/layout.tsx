import { AppShell } from "@/components/layout/app-shell"
import { createClient } from "@/lib/supabase/server"

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch user's plan
    let plan = 'basic'
    if (user) {
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('plan')
            .eq('user_id', user.id)
            .single()
        plan = subscription?.plan || 'basic'
    }

    return (
        <AppShell user={user} plan={plan}>
            {children}
        </AppShell>
    )
}
