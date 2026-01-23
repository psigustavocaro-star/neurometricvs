'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Maximize2,
    Minimize2,
    Paperclip,
    MessageSquare,
    Save,
    X,
    Loader2,
    FileText
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useFormatter, useTranslations } from 'next-intl'
import { ClinicalSession } from '@/types/clinical'
import { updateSession } from '@/app/[locale]/patients/clinical-actions'
import { toast } from 'sonner'

interface SessionDetailPanelProps {
    session: ClinicalSession | null
    patientId: string
    onClose?: () => void
    onUpdate?: () => void
}

export function SessionDetailPanel({ session, patientId, onClose, onUpdate }: SessionDetailPanelProps) {
    const format = useFormatter()
    const t = useTranslations('Dashboard.Patients.Session')

    const [isExpanded, setIsExpanded] = useState(false)
    const [notes, setNotes] = useState(session?.notes || '')
    const [isSaving, setIsSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        setNotes(session?.notes || '')
        setHasChanges(false)
    }, [session?.id])

    const handleNotesChange = (value: string) => {
        setNotes(value)
        setHasChanges(value !== (session?.notes || ''))
    }

    const handleSave = async () => {
        if (!session) return

        setIsSaving(true)
        try {
            await updateSession(session.id, { notes })
            toast.success('Notas guardadas')
            setHasChanges(false)
            onUpdate?.()
        } catch (error) {
            toast.error('Error al guardar notas')
        } finally {
            setIsSaving(false)
        }
    }

    if (!session) {
        return (
            <div className="h-full flex items-center justify-center bg-slate-950 text-slate-500">
                <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-sm">Selecciona una sesión para ver los detalles</p>
                </div>
            </div>
        )
    }

    const ExpandedView = () => (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">
                    {format.dateTime(new Date(session.date), {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </h1>
                <div className="flex items-center gap-2">
                    {hasChanges && (
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Guardar
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(false)}
                        className="text-slate-400 hover:text-white"
                    >
                        <Minimize2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Metadata */}
            <div className="px-6 py-4 border-b border-slate-800/50 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Paperclip className="w-4 h-4" />
                    <span>Documentos adj...</span>
                    <span className="text-slate-600">Vacío</span>
                </div>
                <button className="text-sm text-slate-500 hover:text-slate-400">
                    + Añadir una propiedad
                </button>
            </div>

            {/* Comments section */}
            <div className="px-6 py-4 border-b border-slate-800/50">
                <p className="text-xs font-medium text-slate-500 mb-2">Comentarios</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-6 h-6 rounded-full bg-slate-700" />
                    <span>Añadir un comentario...</span>
                </div>
            </div>

            {/* Notes area - expanded */}
            <div className="flex-1 p-6 overflow-hidden">
                <Textarea
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    placeholder="Escribe las notas de la sesión aquí...

• Observaciones clínicas
• Intervenciones realizadas
• Plan de seguimiento
• Tests aplicados"
                    className="h-full w-full resize-none bg-transparent border-none text-slate-200 text-base leading-relaxed placeholder:text-slate-600 focus-visible:ring-0 p-0"
                />
            </div>
        </div>
    )

    if (isExpanded) {
        return <ExpandedView />
    }

    return (
        <div className="h-full bg-slate-950 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">
                    {format.dateTime(new Date(session.date), {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </h2>
                <div className="flex items-center gap-2">
                    {hasChanges && (
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-teal-600 hover:bg-teal-700 text-white h-8"
                        >
                            {isSaving ? (
                                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            ) : (
                                <Save className="w-3.5 h-3.5 mr-1.5" />
                            )}
                            Guardar
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(true)}
                        className="text-slate-400 hover:text-white h-8 w-8"
                        title="Expandir"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Scrollable content */}
            <ScrollArea className="flex-1">
                <div className="p-6 space-y-4">
                    {/* Metadata */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Paperclip className="w-4 h-4" />
                            <span>Documentos adj...</span>
                            <span className="text-slate-600">Vacío</span>
                        </div>
                        <button className="text-sm text-slate-500 hover:text-slate-400">
                            + Añadir una propiedad
                        </button>
                    </div>

                    {/* Comments section */}
                    <div className="pt-4 border-t border-slate-800/50">
                        <p className="text-xs font-medium text-slate-500 mb-2">Comentarios</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <div className="w-6 h-6 rounded-full bg-slate-700" />
                            <span>Añadir un comentario...</span>
                        </div>
                    </div>

                    {/* Notes area */}
                    <div className="pt-4 border-t border-slate-800/50">
                        <Textarea
                            value={notes}
                            onChange={(e) => handleNotesChange(e.target.value)}
                            placeholder="Escribe las notas de la sesión aquí...

• Observaciones clínicas
• Intervenciones realizadas  
• Plan de seguimiento
• Tests aplicados"
                            className="min-h-[300px] w-full resize-none bg-slate-900/50 border-slate-800 text-slate-200 text-sm leading-relaxed placeholder:text-slate-600 focus-visible:ring-teal-500/50"
                        />
                    </div>

                    {/* Session type badge */}
                    {session.type && (
                        <div className="pt-4">
                            <Badge variant="outline" className="text-slate-400 border-slate-700">
                                {session.type}
                            </Badge>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
