
import { getDashboardStats } from "./actions"
import { UnifiedDashboard } from "@/components/dashboard/unified-dashboard"

// Force dynamic rendering and revalidate every 60 seconds
export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function DashboardPage() {
    const stats = await getDashboardStats()
    if (!stats) return <div className="p-10 text-center text-slate-500">Cargando centro de operaciones...</div>

    return (
        < UnifiedDashboard stats={stats} />
    )
}
