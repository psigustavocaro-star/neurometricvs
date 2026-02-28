import { createClient } from '@/lib/supabase/server'
import { redirect } from '@/i18n/navigation'
import { ProfileForm } from "./profile-form"

export default async function ProfilePage(
    props: { params: Promise<{ locale: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
    const { locale } = await props.params
    const searchParams = await props.searchParams
    const initialTab = typeof searchParams?.tab === 'string' ? searchParams.tab : 'profile'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect({ href: '/login', locale })
        return null
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
        <div className="min-h-screen bg-transparent">
            <div className="p-4 md:p-8">
                <ProfileForm
                    profile={profile}
                    subscription={subscription}
                    user={user}
                    initialTab={initialTab}
                />
            </div>
        </div>
    )
}
