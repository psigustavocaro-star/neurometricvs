import { Skeleton, SkeletonText } from "@/components/ui/skeleton"

export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
                {/* Header with Avatar */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex-1 space-y-3 text-center md:text-left">
                        <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                        <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
                        <div className="flex gap-2 justify-center md:justify-start">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-28 rounded-xl" />
                </div>

                {/* Form Sections */}
                <div className="space-y-6">
                    {/* Personal Info Section */}
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <Skeleton className="h-5 w-40" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Professional Info Section */}
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Subscription Section */}
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <Skeleton className="h-5 w-36" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                            <Skeleton className="h-10 w-28 rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Skeleton className="h-12 w-40 rounded-xl" />
                </div>
            </div>
        </div>
    )
}
