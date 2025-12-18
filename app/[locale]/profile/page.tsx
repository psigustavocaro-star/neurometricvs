import { createClient } from '@/lib/supabase/server'
import { redirect } from '@/i18n/navigation'
import { ProfileForm } from "./profile-form"

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch Profile Data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Fetch Subscription Data
    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="container max-w-5xl pt-24 pb-12">
                <ProfileForm
                    profile={profile}
                    subscription={subscription}
                    user={user}
                />
            </div>
        </div>
    )
}

