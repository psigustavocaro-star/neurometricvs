'use server'

import { createInvitation } from "@/lib/db"

export async function generateInvitationLink(patientId: string, testId: string) {
    try {
        const invitation = createInvitation(patientId, testId)
        // In dev/prod, this should be an env var. For now constructing based on standard local/vercel
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        return {
            success: true,
            link: `${baseUrl}/invite/${invitation.token}`,
            token: invitation.token
        }
    } catch (error) {
        console.error("Error generating invitation:", error)
        return { success: false, error: "Failed to generate invitation" }
    }
}
