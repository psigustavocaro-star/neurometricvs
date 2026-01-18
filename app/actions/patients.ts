'use server'

import { createClient } from "@/lib/supabase/server"

export async function fetchPatientsList() {
    try {
        const supabase = await createClient()

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return { success: false, error: "Not authenticated" }
        }

        // Fetch patients for the current user (profile_id = user.id)
        const { data: patients, error } = await supabase
            .from('patients')
            .select('id, full_name, birth_date, contact_email')
            .eq('profile_id', user.id)
            .order('full_name', { ascending: true })

        if (error) {
            console.error("Error fetching patients:", error)
            return { success: false, error: "Failed to fetch patients" }
        }

        return { success: true, data: patients || [] }
    } catch (error) {
        console.error("Error fetching patients:", error)
        return { success: false, error: "Failed to fetch patients" }
    }
}
