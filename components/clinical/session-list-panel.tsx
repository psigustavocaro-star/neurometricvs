'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, FileText, Paperclip } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useFormatter } from 'next-intl'
import { ClinicalSession } from '@/types/clinical'

interface SessionListPanelProps {
    sessions: ClinicalSession[]
    selectedSessionId?: string | null
    onSelectSession: (session: ClinicalSession) => void
    onNewSession: () => void
}

export function SessionListPanel({
    sessions,
    selectedSessionId,
    onSelectSession,
    onNewSession
}: SessionListPanelProps) {
    const format = useFormatter()

    return (
        <div className="h-full bg-slate-900 border-r border-slate-800 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <h3 className="font-bold text-white text-sm">Registro de sesiones y notas clínicas</h3>
                </div>

                {/* View toggles and controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" className="h-7 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300">
                            Default view
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500 hover:text-slate-300">
                            Lista
                        </Button>
                    </div>
                    <Button
                        onClick={onNewSession}
                        size="sm"
                        className="h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                    >
                        Nuevo
                    </Button>
                </div>
            </div>

            {/* Table header */}
            <div className="px-4 py-2 border-b border-slate-800/50 flex items-center text-xs text-slate-500 font-medium">
                <div className="flex-1">Aa Fecha</div>
                <div className="flex-1 flex items-center gap-1">
                    <Paperclip className="w-3 h-3" />
                    <span>Documentos adjuntos</span>
                </div>
            </div>

            {/* Session list */}
            <ScrollArea className="flex-1">
                <div className="divide-y divide-slate-800/30">
                    {sessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => onSelectSession(session)}
                            className={cn(
                                "w-full px-4 py-3 flex items-center text-left hover:bg-slate-800/50 transition-colors",
                                selectedSessionId === session.id && "bg-slate-800/70 border-l-2 border-l-blue-500"
                            )}
                        >
                            <div className="flex-1 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-500" />
                                <span className={cn(
                                    "text-sm",
                                    selectedSessionId === session.id ? "text-white font-medium" : "text-slate-300"
                                )}>
                                    {format.dateTime(new Date(session.date), {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex-1 text-slate-600 text-sm">
                                {/* Placeholder for attachments */}
                            </div>
                        </button>
                    ))}

                    {/* Add new entry */}
                    <button
                        onClick={onNewSession}
                        className="w-full px-4 py-3 flex items-center gap-2 text-left text-slate-500 hover:text-slate-400 hover:bg-slate-800/30 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Nueva página</span>
                    </button>
                </div>
            </ScrollArea>

            {/* Footer with count */}
            <div className="px-4 py-2 border-t border-slate-800/50 text-xs text-slate-600">
                RECUENTO {sessions.length}
            </div>
        </div>
    )
}
