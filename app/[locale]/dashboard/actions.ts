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
            .order('created_at', { ascending: false })
            .limit(100),

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

    // 8. Fetch detailed pending items (tests to review)
    const { data: pendingTests } = await supabase
        .from('test_assignments')
        .select('id, test_type, patient_id, patients(full_name), updated_at')
        .eq('status', 'completed')
        .limit(5)

    // 9. Fetch recent sessions for activity feed
    const { data: recentSessions } = await supabase
        .from('clinical_sessions')
        .select('id, type, date, patient_id, patients(full_name)')
        .order('date', { ascending: false })
        .limit(5)

    const profile = userProfile as any

    // Safe helper for patient name
    const getPatientName = (p: any) => {
        if (!p) return 'Paciente'
        if (Array.isArray(p)) return p[0]?.full_name || 'Paciente'
        return p.full_name || 'Paciente'
    }

    // Aggregate Activity
    const activityRaw = [
        ...(recentTests || []).map((t: any) => ({
            type: 'test_result',
            date: t.created_at,
            description: `Test ${t.test_type} completado - ${getPatientName(t.patients)}`,
            patientName: getPatientName(t.patients),
            id: t.id
        })),
        ...(recentSessions || []).map((s: any) => ({
            type: 'session',
            date: s.date,
            description: `Sesión ${s.type} - ${getPatientName(s.patients)}`,
            patientName: getPatientName(s.patients),
            id: s.id
        }))
    ].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)

    const pendingItems = (pendingTests || []).map((t: any) => ({
        id: t.id,
        title: `Revisar: ${t.test_type}`,
        subtitle: getPatientName(t.patients),
        date: t.updated_at,
        type: 'test_review'
    }))

    return {
        totalPatients: totalPatients || 0,
        recentPatients: allPatients || [],
        allPatients: allPatients || [],
        recentTests: recentTests || [],
        subscriptionPlan: subscription?.plan || 'basic',
        user_name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
        avatar_url: profile?.avatar_url,
        sessionsToday: sessionsToday || 0,
        testsToReview: testsToReview || 0,
        recentActivity: activityRaw,
        pendingItems: pendingItems
    }
}

