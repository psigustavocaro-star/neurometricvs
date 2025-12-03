"use client"

import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Printer, Download, Loader2 } from "lucide-react"
import { ReportPDF } from "./report-pdf"

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <Button className="bg-teal-600 hover:bg-teal-700" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparando PDF...
            </Button>
        ),
    }
)

interface ReportActionsProps {
    patient: any;
    profile: any;
    result: any;
    interpretation: string;
    chartData?: any[];
}

export function ReportActions({ patient, profile, result, interpretation, chartData }: ReportActionsProps) {
    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Imprimir
            </Button>

            <PDFDownloadLink
                document={<ReportPDF patient={patient} profile={profile} result={result} interpretation={interpretation} chartData={chartData} />}
                fileName={`Informe_${patient.full_name.replace(/\s+/g, '_')}_${result.test_id}.pdf`}
            >
                {/* @ts-ignore */}
                {({ blob, url, loading, error }) => (
                    <Button className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                        {loading ? 'Generando...' : 'Descargar PDF'}
                    </Button>
                )}
            </PDFDownloadLink>
        </div>
    )
}
