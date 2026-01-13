import { getDashboardStats } from '@/app/[locale]/dashboard/actions'
import { GenogramClientPage } from './genogram-client'
import { redirect } from 'next/navigation'

export default async function GenogramPage() {
    const stats = await getDashboardStats()

    if (!stats) {
        redirect('/login')
    }

    const patients = stats.allPatients.map((p: any) => ({
        id: p.id,
        first_name: p.first_name || p.full_name?.split(' ')[0] || '',
        last_name: p.last_name || p.full_name?.split(' ').slice(1).join(' ') || '',
        full_name: p.full_name || `${p.first_name || ''} ${p.last_name || ''}`.trim(),
        gender: p.gender || 'male'
    }))

    return <GenogramClientPage patients={patients} />
}
