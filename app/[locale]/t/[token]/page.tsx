import { getRemoteTest, submitRemoteTest } from '@/app/[locale]/tests/remote-actions'
import { notFound } from 'next/navigation'
import { RemoteTestRunner } from '@/components/tests/remote-test-runner'
import { CheckCircle2 } from 'lucide-react'

// This component will handle the public view.
export default async function RemoteTestPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params
    const { data: assignmentData, error } = await getRemoteTest(token)

    // Explicit cast to avoid type errors without full generated types
    const assignment = assignmentData as any

    if (error || !assignment) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-slate-200">
                    <h1 className="text-xl font-bold text-slate-900 mb-2">Enlace no válido</h1>
                    <p className="text-slate-600 mb-6">{error || 'El test que buscas no existe o ha expirado.'}</p>
                </div>
            </div>
        )
    }

    if (assignment.status === 'completed') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-slate-200">
                    <CheckCircle2 className="h-16 w-16 text-teal-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Test Completado</h1>
                    <p className="text-slate-600 mb-6">Gracias. Tus respuestas han sido enviadas exitosamente a tu profesional.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Evaluación Remota</h1>
                    <p className="text-slate-500">Responde con sinceridad. Tus datos son confidenciales.</p>
                </div>

                {/* We render a Client Component to handle the form state and submission */}
                <RemoteTestRunner
                    testId={assignment.test_id}
                    token={token}
                />
            </div>
        </div>
    )
}
