import { getInvitationByToken, getPatientById } from "@/lib/db"
import { getTestDefinition } from "@/lib/tests-registry"
import { PublicTestRunner } from "@/components/public/public-test-runner"
import { notFound } from "next/navigation"
import { AlertCircle } from "lucide-react"

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params
    const invitation = getInvitationByToken(token)

    if (!invitation) {
        notFound()
    }

    if (invitation.status !== 'pending') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-red-100 text-center">
                    <div className="h-12 w-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-800 mb-2">Enlace no válido</h1>
                    <p className="text-slate-600">
                        Este enlace ya ha sido utilizado o ha expirado. Si crees que es un error, contacta a tu profesional.
                    </p>
                </div>
            </div>
        )
    }

    const test = getTestDefinition(invitation.testId)
    const patient = getPatientById(invitation.patientId)

    if (!test || !patient) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">Error de configuración</h1>
                    <p className="text-slate-600">
                        No se pudo cargar la evaluación. El test o el paciente asociado no existen.
                    </p>
                </div>
            </div>
        )
    }

    // Split name to get just the first name for friendlier UI
    const firstName = patient.full_name.split(' ')[0]

    return (
        <PublicTestRunner
            test={test}
            token={token}
            patientName={firstName}
        />
    )
}
