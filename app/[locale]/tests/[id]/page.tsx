import { depressionScale } from '@/lib/tests/phq9'
import { snapIV } from '@/lib/tests/snap-iv'
import { gad7 } from '@/lib/tests/gad7'
import { rosenbergSelfEsteem } from '@/lib/tests/rosenberg'
import { bis11 } from '@/lib/tests/bis11'
import { scared } from '@/lib/tests/scared'
import { TestRunner } from '@/components/test-runner'
import { CarasRTestRunner } from '@/components/tests/caras-r-runner'
import { notFound } from 'next/navigation'

// Tests estándar que usan el TestRunner genérico
const standardTests = {
    'phq-9': depressionScale,
    'snap-iv': snapIV,
    'gad-7': gad7,
    'rosenberg': rosenbergSelfEsteem,
    'bis-11': bis11,
    'scared': scared
}

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

