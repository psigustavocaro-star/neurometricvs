
import { getDashboardStats } from "./actions"
import { UnifiedDashboard } from "@/components/dashboard/unified-dashboard"
import { getTranslations } from "next-intl/server"

// Force dynamic rendering and revalidate every 60 seconds
export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function DashboardPage() {
    const t = await getTranslations('Dashboard');
    const stats = await getDashboardStats()
    if (!stats) return <div className="p-10 text-center text-slate-500">{t('loading')}</div>

    return (
        < UnifiedDashboard stats={stats} />
    )
}
