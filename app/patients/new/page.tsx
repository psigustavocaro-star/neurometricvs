import { NewPatientForm } from './patient-form'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { User, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function NewPatientPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user?.id)
        .single()

    if (subscription?.plan !== 'clinical' && subscription?.plan !== 'pro') {
        return (
            <div className="container py-20 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-100 p-6 rounded-full mb-6">
                    <Lock className="h-12 w-12 text-slate-400" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Acceso Restringido</h1>
                <p className="text-slate-500 max-w-md mb-8 text-lg">
                    La creación de pacientes está disponible exclusivamente para los planes <span className="font-semibold text-teal-700">Clínico</span> y <span className="font-semibold text-teal-700">Pro</span>.
                </p>
                <div className="flex gap-4">
                    <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                        <Link href="/dashboard/subscription">
                            Actualizar Plan
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/dashboard">
                            Volver al Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-10 flex justify-center">
            <NewPatientForm />
        </div>
    )
}
