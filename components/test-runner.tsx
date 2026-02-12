'use client'

import { ListTestRunner } from '@/components/clinical/list-test-runner'
import { TestDefinition } from '@/types/test'
import { useSearchParams } from 'next/navigation'

export function TestRunner({ test }: { test: TestDefinition }) {
    const searchParams = useSearchParams()
    const patientId = searchParams.get('patientId')
    const sessionId = searchParams.get('sessionId')

    return (
        <ListTestRunner
            test={test}
            patientId={patientId || undefined}
            sessionId={sessionId || undefined}
        />
    )
}

