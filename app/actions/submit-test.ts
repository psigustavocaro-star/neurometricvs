'use server'

import { getInvitationByToken, markInvitationCompleted, saveResult } from "@/lib/db"

export async function submitRemoteTest(token: string, answers: any, score: number) {
    try {
        const invitation = getInvitationByToken(token)

        if (!invitation) {
            return { success: false, error: "Invitación no válida" }
        }

        if (invitation.status !== 'pending') {
            return { success: false, error: "Esta invitación ya ha sido utilizada o ha expirado" }
        }

        // Save result linked to patient
        saveResult({
            patientId: invitation.patientId,
            testId: invitation.testId,
            date: new Date().toISOString(),
            scores: { total: score }, // Simplification, ideally we pass full score object
            answers: answers,
            invitationId: invitation.id
        })

        // Mark invitation as used
        markInvitationCompleted(invitation.id)

        return { success: true }
    } catch (error) {
        console.error("Error submitting remote test:", error)
        return { success: false, error: "Error al guardar los resultados" }
    }
}
