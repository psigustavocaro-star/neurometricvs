import { TestCatalog } from "@/components/tests/test-catalog"

export default function SearchTestsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="nm-eyebrow">Neurometrics / Assessment library</div>
                <h1 className="nm-page-title">Catálogo de Tests</h1>
                <p className="nm-page-subtitle">Explora nuestra biblioteca completa de evaluaciones psicológicas y neuropsicológicas.</p>
            </div>

            <TestCatalog />
        </div>
    )
}

