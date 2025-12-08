import { TestList } from "@/components/tests/test-list"

export default function MyTestsPage() {
    return (
        <div className="space-y-8 container py-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mis Tests</h1>
                <p className="text-slate-500 mt-1">Gestiona tus tests adquiridos y favoritos.</p>
            </div>

            <TestList />
        </div>
    )
}
