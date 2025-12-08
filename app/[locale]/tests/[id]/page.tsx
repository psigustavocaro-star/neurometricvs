import { depressionScale } from '@/lib/tests/phq9'
import { snapIV } from '@/lib/tests/snap-iv'
import { TestRunner } from '@/components/test-runner'
import { notFound } from 'next/navigation'

// In a real app, we would fetch this from a DB or a registry of tests
const tests = {
    'phq-9': depressionScale,
    'snap-iv': snapIV
}

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const test = tests[id as keyof typeof tests]

    if (!test) {
        notFound()
    }

    return (
        <div className="container py-10">
            <TestRunner test={test} />
        </div>
    )
}
