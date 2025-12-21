'use client'

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

interface GenericResourceViewerProps {
    title: string
    description: string
    category: string
    content?: string // In real app, this would be the full article text
}

export function GenericResourceViewer({ title, description, category, content }: GenericResourceViewerProps) {

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Action Bar (Hidden in Print) */}
            <div className="flex justify-end print:hidden">
                <Button onClick={handlePrint} className="bg-teal-600 hover:bg-teal-700">
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir / Guardar como PDF
                </Button>
            </div>

            {/* Document Body */}
            <div className="prose prose-slate max-w-none text-slate-800">
                <div className="not-prose mb-6">
                    <span className="text-xs font-bold tracking-wider text-teal-600 uppercase mb-2 block">{category}</span>
                    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">{description}</p>
                </div>

                <div className="my-8 border-t border-slate-200" />

                {content ? (
                    <div
                        className="space-y-4 text-justify resource-content"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                ) : (
                    <div className="space-y-4 text-justify text-muted-foreground italic">
                        <p>El contenido de este recurso está siendo actualizado.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
