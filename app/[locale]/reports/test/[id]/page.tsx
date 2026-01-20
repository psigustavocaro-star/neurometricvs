import { ReportPageClient } from './report-client'

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return <ReportPageClient resultId={id} />
}
