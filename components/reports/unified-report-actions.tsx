"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export function UnifiedReportActions() {
    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Imprimir Informe
            </Button>
        </div>
    )
}
