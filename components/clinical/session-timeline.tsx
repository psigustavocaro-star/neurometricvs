'use client'

import { ClinicalSession, AIInsight } from '@/types/clinical'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, Clock, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SessionTimelineProps {
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
    selectedSessionId: string | 'new' | null
    onSelectSession: (session: ClinicalSession) => void
}

export function SessionTimeline({ sessions, selectedSessionId, onSelectSession }: SessionTimelineProps) {

    if (sessions.length === 0) {
        return (
            <div className="p-8 text-center text-slate-400">
                <p className="text-sm">Aún no hay sesiones registradas.</p>
            </div>
        )
    }

    return (
        <div className="relative pl-6 py-4 space-y-8 before:absolute before:left-2 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
            {sessions.map((session) => {
                const isSelected = selectedSessionId === session.id

                return (
                    <div key={session.id} className="relative group">
                        {/* Timeline Dot */}
                        <div
                            className={cn(
                                "absolute -left-[21px] top-4 w-3 h-3 rounded-full border-2 transition-all z-10",
                                isSelected ? "bg-teal-500 border-teal-500 scale-125" : "bg-white border-slate-300 group-hover:border-teal-400"
                            )}
                        />

                        <div
                            onClick={() => onSelectSession(session)}
                            className={cn(
                                "cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md",
                                isSelected
                                    ? "bg-white border-teal-200 shadow-md ring-1 ring-teal-50"
                                    : "bg-white border-slate-100 hover:border-slate-200"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="space-y-0.5">
                                    <h4 className={cn("font-bold text-sm", isSelected ? "text-teal-700" : "text-slate-700")}>
                                        {format(new Date(session.date), "d 'de' MMMM, yyyy", { locale: es })}
                                    </h4>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-600 border-0 h-5 px-1.5">
                                            {session.type}
                                        </Badge>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {session.duration} min
                                        </span>
                                    </div>
                                </div>
                                {session.ai_insights && (
                                    <div className="bg-indigo-50 p-1 rounded-md text-indigo-600" title="Análisis IA disponible">
                                        <Sparkles className="w-3.5 h-3.5" />
                                    </div>
                                )}
                            </div>

                            {session.notes && (
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {session.notes}
                                </p>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
