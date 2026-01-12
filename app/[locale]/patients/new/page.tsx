import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { NewPatientForm } from "./patient-form"

export default async function NewPatientPage() {
    const t = await getTranslations('Pricing.Patients.Access')
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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('restricted_title')}</h1>
                <p className="text-slate-500 max-w-md mb-8 text-lg">
                    {t('restricted_desc')}
                </p>
                <div className="flex gap-4">
                    <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                        <Link href="/dashboard/subscription">
                            {t('upgrade_plan')}
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/dashboard">
                            {t('back_to_dashboard')}
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('specialty')
        .eq('id', user?.id)
        .single()

    return (
        <div className="container pt-24 pb-10 flex justify-center">
            <NewPatientForm initialSpecialty={profile?.specialty} />
        </div>
    )
}
