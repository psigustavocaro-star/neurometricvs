import { savePatient, createInvitation, getInvitationByToken, saveResult, getPatientResults } from '@/lib/db'
import { submitRemoteTest } from '@/app/actions/submit-test'

async function run() {
    console.log("--- Starting Remote Flow Verification ---")

    // 1. Create Patient
    const patientId = "test-patient-" + Date.now()
    savePatient({
        id: patientId,
        full_name: "Test Patient",
        birth_date: "1990-01-01",
        contact_email: "test@example.com",
        gender: "Male",
        created_at: new Date().toISOString()
    })
    console.log("1. Patient Created:", patientId)

    // 2. Create Invite
    const invite = createInvitation(patientId, "phq-9")
    console.log("2. Invitation Created:", invite.token)

    // 3. Verify Token Lookup
    const lookedUp = getInvitationByToken(invite.token)
    if (!lookedUp) throw new Error("Invitation lookup failed")
    console.log("3. Invitation Lookup Verified")

    // 4. Submit Result via Action (Simulating Client)
    const result = await submitRemoteTest(invite.token, { q1: 1, q2: 2 }, 3)
    console.log("4. Submission Result:", result)

    if (!result.success) throw new Error("Submission failed")

    // 5. Verify Persistence
    const results = getPatientResults(patientId)
    if (results.length === 0) throw new Error("Result persistence failed")
    console.log("5. Result Persisted:", results[0].scores)

    console.log("--- Verification SUCCESS ---")
}

run().catch(console.error)
