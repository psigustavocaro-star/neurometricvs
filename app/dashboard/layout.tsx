import Link from "next/link"
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    CreditCard,
    LogOut,
    UserCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">


            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto max-w-6xl pt-24 p-6 md:p-10 md:pt-28">
                    {children}
                </div>
            </main>
        </div>
    )
}
