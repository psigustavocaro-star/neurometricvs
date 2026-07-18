import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, User } from "lucide-react"
import { PatientList } from "@/components/patients/patient-list"
import { getTranslations } from 'next-intl/server'
import { NewPatientDialog } from '@/components/patients/NewPatientDialog'

export const revalidate = 0 // Always fetch fresh data

export default async function PatientsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const t = await getTranslations('Dashboard.Patients')

    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user?.id)
        .single()

    if (subscription?.plan !== 'clinical' && subscription?.plan !== 'pro') {
        return (
            <div className="container py-20 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-100 p-6 rounded-full mb-6">
                    <User className="h-12 w-12 text-slate-400" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('Access.restricted_title')}</h1>
                <p className="text-slate-500 max-w-md mb-8 text-lg">
                    {t('Access.restricted_desc')}
                </p>
                <div className="flex gap-4">
                    <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                        <Link href="/dashboard/subscription">
                            {t('Access.upgrade_plan')}
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/dashboard">
                            {t('Access.back_to_dashboard')}
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

    const { data: patients } = await supabase
        .from('patients')
        .select('*, clinical_records(*)')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false })

    return (
        <div className="pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <div className="nm-eyebrow">Neurometrics / Patients</div>
                    <h1 className="nm-page-title">{t('List.title')}</h1>
                    <p className="nm-page-subtitle">{t('List.subtitle')}</p>
                </div>
                <NewPatientDialog
                    initialSpecialty={profile?.specialty}
                    trigger={
                        <Button size="lg">
                            <Plus className="mr-2 h-4 w-4" /> {t('List.new_patient')}
                        </Button>
                    }
                />
            </div>

            <PatientList initialPatients={patients || []} />
        </div>
    )
}
