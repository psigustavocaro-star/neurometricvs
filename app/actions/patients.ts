'use server'

import { getPatients } from "@/lib/db"

export async function fetchPatientsList() {
    try {
        const patients = getPatients()
        return { success: true, data: patients }
    } catch (error) {
        console.error("Error fetching patients:", error)
        return { success: false, error: "Failed to fetch patients" }
    }
}
