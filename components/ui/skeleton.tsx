import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800",
                className
            )}
            {...props}
        />
    )
}

// Specific skeleton components for common patterns
function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4", className)}>
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    )
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex gap-4 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 px-4 py-3 items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
        </div>
    )
}

function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizes = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-14 w-14"
    }
    return <Skeleton className={cn("rounded-full", sizes[size])} />
}

function SkeletonText({ lines = 3, className }: { lines?: number, className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
                />
            ))}
        </div>
    )
}

function SkeletonButton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizes = {
        sm: "h-8 w-20",
        md: "h-10 w-28",
        lg: "h-12 w-36"
    }
    return <Skeleton className={cn("rounded-xl", sizes[size])} />
}

function SkeletonDashboardCard() {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-3 w-full" />
        </div>
    )
}

function SkeletonPatientCard() {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
    )
}

export {
    Skeleton,
    SkeletonCard,
    SkeletonTable,
    SkeletonAvatar,
    SkeletonText,
    SkeletonButton,
    SkeletonDashboardCard,
    SkeletonPatientCard
}
