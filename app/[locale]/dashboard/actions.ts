'use server'

import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Today range for sessions
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStart = today.toISOString()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const todayEnd = tomorrow.toISOString()

    // Execute all queries in parallel for better performance
    const [
        { data: allPatients },
        { count: totalPatients },
        { data: recentTests },
        { data: subscription },
        { data: userProfile },
        { count: sessionsToday },
        { count: testsToReview }
    ] = await Promise.all([
        // 1. Fetch ALL recent patients
        supabase
            .from('patients')
            .select('*')
            .eq('profile_id', user.id)
            .order('created_at', { ascending: false }),

        // 2. Fetch total patients count
        supabase
            .from('patients')
            .select('*', { count: 'exact', head: true })
            .eq('profile_id', user.id),

        // 3. Fetch recent test results
        supabase
            .from('test_results')
            .select('id, test_type, created_at, patient_id, patients(full_name)')
            .eq('profile_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10),

        // 4. Fetch subscription status
        supabase
            .from('subscriptions')
            .select('plan')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .maybeSingle(),

        // 5. Get User Profile
        supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', user.id)
            .single(),

        // 6. Sessions Today
        supabase
            .from('clinical_sessions')
            .select('*', { count: 'exact', head: true })
            .gte('date', todayStart)
            .lt('date', todayEnd),

        // 7. Tests to Review (Completed assignments)
        supabase
            .from('test_assignments')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completed')
    ])

    const profile = userProfile as any

    return {
        totalPatients: totalPatients || 0,
        recentPatients: allPatients || [],
        allPatients: allPatients || [],
        recentTests: recentTests || [],
        subscriptionPlan: subscription?.plan || 'basic',
        user_name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
        avatar_url: profile?.avatar_url,
        sessionsToday: sessionsToday || 0,
        testsToReview: testsToReview || 0
    }
}

