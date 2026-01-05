'use client'

import { Suspense } from 'react'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'
import { Loader2 } from 'lucide-react'

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="relative z-10 w-full max-w-5xl">
                <Suspense fallback={<div className="flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-teal-600" /></div>}>
                    <OnboardingFlow />
                </Suspense>
            </div>
        </main>
    )
}
