'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { resources } from '@/lib/resources'
import { CBTThoughtRecord } from '@/components/resources/interactive/thought-record'
import { DBTChainAnalysis } from '@/components/resources/interactive/chain-analysis'
import { Grounding54321 } from '@/components/resources/interactive/grounding-exercise'
import { PrintableHeader } from '@/components/resources/printable-header'

export default function ResourceViewerPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const resource = resources.find(r => r.id === id || r.url.endsWith(id))

    if (!resource) {
        return <div className="p-8 text-center text-slate-500">Recurso no encontrado.</div>
    }

    const renderTool = () => {
        switch (id) {
            case 'cbt-thought-record':
                return <CBTThoughtRecord />
            case 'dbt-chain-analysis':
                return <DBTChainAnalysis />
            case 'grounding-54321':
                return <Grounding54321 />
            default:
                return <div className="text-center py-12">Herramienta en desarrollo.</div>
        }
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto print:max-w-none print:p-0">
            {/* Header (Hidden when printing) */}
            <div className="flex items-center gap-4 print:hidden">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{resource.title}</h1>
                    <p className="text-sm text-slate-500">{resource.description}</p>
                </div>
            </div>

            {/* Tool Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[600px] p-6 md:p-8 print:border-0 print:shadow-none print:p-0">
                <PrintableHeader />
                {renderTool()}
            </div>
        </div>
    )
}
