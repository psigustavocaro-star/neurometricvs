export default function TestLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // This layout removes the navbar for a distraction-free test experience
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {children}
        </div>
    )
}
