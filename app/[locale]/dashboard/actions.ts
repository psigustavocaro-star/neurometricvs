'use server'

import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Execute all queries in parallel for better performance
    const [
        { data: allPatients },
        { count: totalPatients },
        { data: recentTests },
        { data: subscription }
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

        // 4. Get Subscription Plan
        supabase
            .from('subscriptions')
            .select('plan')
            .eq('user_id', user.id)
            .single()
    ])

    return {
        totalPatients: totalPatients || 0,
        recentPatients: allPatients || [],
        allPatients: allPatients || [],
        recentTests: recentTests || [],
        subscriptionPlan: subscription?.plan || 'basic',
        user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'
    }
}
