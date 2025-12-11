'use client'

import { StepByStepTestRunner } from '@/components/clinical/step-by-step-test-runner'
import { TestDefinition } from '@/types/test'
import { useSearchParams } from 'next/navigation'

export function TestRunner({ test }: { test: TestDefinition }) {
    const searchParams = useSearchParams()
    const patientId = searchParams.get('patientId')

    return (
        <StepByStepTestRunner
            test={test}
            patientId={patientId || undefined}
        />
    )
}
