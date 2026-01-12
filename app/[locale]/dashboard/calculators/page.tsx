import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { CalculatorsClient } from './calculators-client'

export default async function CalculatorsPage() {
    const t = await getTranslations('Calculators')
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    let profession = 'psychologist'

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('profession')
            .eq('id', user.id)
            .single()

        if (profile?.profession) {
            profession = profile.profession
        }
    }

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {t('title')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    {t('subtitle')}
                </p>
            </div>

            <CalculatorsClient profession={profession} />
        </div>
    )
}
