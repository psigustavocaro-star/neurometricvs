import { SkeletonPatientCard, Skeleton } from "@/components/ui/skeleton"

export default function PatientsLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-64 rounded-xl" />
                        <Skeleton className="h-10 w-36 rounded-xl" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-9 w-24 rounded-full" />
                    ))}
                </div>

                {/* Patient Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <SkeletonPatientCard key={i} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 pt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-10 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    )
}
