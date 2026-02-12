import { SkeletonDashboardCard, Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-10 w-32 rounded-xl" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonDashboardCard key={i} />
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-8 w-24 rounded-lg" />
                            </div>
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-1/3" />
                                            <Skeleton className="h-3 w-1/4" />
                                        </div>
                                        <Skeleton className="h-8 w-20 rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                            <Skeleton className="h-5 w-32 mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                        <div className="flex-1 space-y-1">
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-2 w-2/3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                            <Skeleton className="h-5 w-40 mb-4" />
                            <Skeleton className="h-32 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
