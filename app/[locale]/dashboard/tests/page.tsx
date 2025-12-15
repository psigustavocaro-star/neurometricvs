import { TestCatalog } from "@/components/tests/test-catalog"

export default function SearchTestsPage() {
    return (
        <div className="space-y-8 container py-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Catálogo de Tests</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Explora nuestra biblioteca completa de evaluaciones psicológicas y neuropsicológicas.</p>
            </div>

            <TestCatalog />
        </div>
    )
}

