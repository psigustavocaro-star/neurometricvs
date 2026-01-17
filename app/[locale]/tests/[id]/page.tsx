import { standardTests } from '@/lib/tests-registry'
import { TestRunner } from '@/components/test-runner'
import { CarasRTestRunner } from '@/components/tests/caras-r-runner'
import { notFound } from 'next/navigation'

// Tests especiales con componentes propios
const specialTests = ['caras-r']

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Verificar si es un test especial
    if (id === 'caras-r') {
        return (
            <div className="container py-10">
                <CarasRTestRunner patientAge={10} patientName="Evaluado" />
            </div>
        )
    }

    // Tests estándar
    const test = standardTests[id as keyof typeof standardTests]

    if (!test) {
        notFound()
    }

    return (
        <div className="container py-10">
            <TestRunner test={test} />
        </div>
    )
}

