import { Skeleton } from "@/components/ui/skeleton"

export default function TestBankLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-56" />
                        <Skeleton className="h-4 w-80" />
                    </div>
                    <Skeleton className="h-10 w-72 rounded-xl" />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-28 rounded-full shrink-0" />
                    ))}
                </div>

                {/* Test Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
                            <div className="flex items-start justify-between">
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-2/3" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                            <Skeleton className="h-9 w-full rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
