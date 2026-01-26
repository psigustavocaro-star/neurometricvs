'use client'

import React, { useState, useEffect } from 'react'
import { ClinicalRecord, ClinicalSession, AIInsight } from '@/types/clinical'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { createSession, updateSession } from '@/app/[locale]/patients/clinical-actions'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useFormatter } from 'next-intl'
import {
    User,
    Calendar,
    IdCard,
    Clock,
    MapPin,
    Phone,
    Mail,
    Building2,
    GraduationCap,
    Briefcase,
    Users,
    Heart,
    Network,
    Stethoscope,
    Pill,
    FileText,
    Plus,
    Save,
    Maximize2,
    X,
    RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PatientNotionViewProps {
    patient: any
    clinicalRecord: ClinicalRecord | null
    sessions: (ClinicalSession & { ai_insights?: AIInsight | null })[]
}

// Patient Data Row Component
function DataRow({ icon: Icon, label, value, badge, badgeColor }: {
    icon: any
    label: string
    value?: string | null
    badge?: boolean
    badgeColor?: string
}) {
    return (
        <div className="flex items-start gap-3 py-2.5 px-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-md transition-colors">
            <Icon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                {badge && value ? (
                    <Badge className={cn("mt-0.5 text-xs", badgeColor || "bg-teal-600 text-white")}>
                        {value}
                    </Badge>
                ) : (
                    <p className={cn(
                        "text-sm font-medium mt-0.5",
                        value ? "text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-500 italic"
                    )}>
                        {value || 'Vacío'}
                    </p>
                )}
            </div>
        </div>
    )
}

export function PatientNotionView({ patient, clinicalRecord, sessions: initialSessions }: PatientNotionViewProps) {
    const router = useRouter()
    const format = useFormatter()
    const supabase = createClient()

    // Local sessions state for realtime updates
    const [sessions, setSessions] = useState(initialSessions)
    const [selectedSession, setSelectedSession] = useState<ClinicalSession | null>(
        sessions.length > 0 ? sessions[0] : null
    )
    const [notes, setNotes] = useState(selectedSession?.notes || '')
    const [isSaving, setIsSaving] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isRealtime, setIsRealtime] = useState(false)

    // Supabase Realtime subscription for live sync
    useEffect(() => {
        console.log('Setting up realtime subscription for patient:', patient.id)

        const channel = supabase
            .channel(`sessions-${patient.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'clinical_sessions',
                    filter: `patient_id=eq.${patient.id}`
                },
                (payload: any) => {
                    console.log('Realtime payload received:', payload)

                    if (payload.eventType === 'INSERT') {
                        const newSession = payload.new as ClinicalSession
                        setSessions(prev => {
                            // Avoid duplicates
                            if (prev.some(s => s.id === newSession.id)) return prev
                            return [newSession, ...prev]
                        })
                        toast.info('Nueva sesión agregada por otro usuario', { duration: 3000 })
                    }
                    else if (payload.eventType === 'UPDATE') {
                        const updatedSession = payload.new as ClinicalSession
                        setSessions(prev => prev.map(s =>
                            s.id === updatedSession.id ? { ...s, ...updatedSession } : s
                        ))

                        // Update selected session and notes if it matches
                        setSelectedSession(prev => {
                            if (prev?.id === updatedSession.id) {
                                // Only update local notes if the change is external
                                if (updatedSession.notes !== notes) {
                                    setNotes(updatedSession.notes || '')
                                }
                                return { ...prev, ...updatedSession }
                            }
                            return prev
                        })
                    }
                    else if (payload.eventType === 'DELETE') {
                        const deletedId = payload.old.id
                        setSessions(prev => prev.filter(s => s.id !== deletedId))
                        setSelectedSession(prev => {
                            if (prev?.id === deletedId) {
                                setNotes('')
                                return null
                            }
                            return prev
                        })
                    }

                    setIsRealtime(true)
                    setTimeout(() => setIsRealtime(false), 2000)
                }
            )
            .subscribe((status) => {
                console.log('Realtime subscription status:', status)
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [patient.id, supabase, notes])

    // Sync initialSessions prop with local state
    useEffect(() => {
        setSessions(initialSessions)
    }, [initialSessions])

    // Calculate age
    const calculateAge = (birthDate: string) => {
        const birth = new Date(birthDate)
        const now = new Date()
        let years = now.getFullYear() - birth.getFullYear()
        let months = now.getMonth() - birth.getMonth()
        if (months < 0) { years--; months += 12 }
        return `${years} Años ${months} Meses`
    }

    // Handle session selection
    const handleSelectSession = (session: ClinicalSession) => {
        setSelectedSession(session)
        setNotes(session.notes || '')
    }

    // Handle new session
    const handleNewSession = async () => {
        try {
            await createSession(patient.id, { type: 'Consulta', notes: '' })
            toast.success('Nueva sesión creada')
            router.refresh()
        } catch (error) {
            toast.error('Error al crear sesión')
        }
    }

    // Handle save notes
    const handleSave = async () => {
        if (!selectedSession) return
        setIsSaving(true)
        try {
            await updateSession(selectedSession.id, { notes })
            toast.success('Notas guardadas')
            router.refresh()
        } catch (error) {
            toast.error('Error al guardar')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">

            {/* Column 1: Patient Data */}
            <div className="w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
                {/* Patient Name Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {patient.full_name}
                    </h1>
                    <Badge className="mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                        Activo
                    </Badge>
                </div>

                {/* Scrollable Patient Data */}
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-0.5">
                        <DataRow icon={User} label="Género"
                            value={patient.gender === 'male' ? 'Masculino' : patient.gender === 'female' ? 'Femenino' : patient.gender}
                            badge badgeColor="bg-teal-600 hover:bg-teal-600 text-white"
                        />
                        <DataRow icon={Calendar} label="Fecha de nacimiento"
                            value={patient.birth_date ? format.dateTime(new Date(patient.birth_date), { day: 'numeric', month: 'long', year: 'numeric' }) : undefined}
                        />
                        <DataRow icon={IdCard} label="RUT" value={patient.rut} />
                        <DataRow icon={Clock} label="Edad"
                            value={patient.birth_date ? calculateAge(patient.birth_date) : undefined}
                        />
                        <DataRow icon={MapPin} label="Dirección" value={patient.address} />
                        <DataRow icon={Phone} label="Teléfono" value={patient.phone} />
                        <DataRow icon={Mail} label="Correo" value={patient.contact_email} />
                        <DataRow icon={Building2} label="Lugar de atención" value={patient.clinic} />
                        <DataRow icon={GraduationCap} label="Nivel educacional" value={patient.education} />
                        <DataRow icon={Briefcase} label="Ocupación" value={patient.occupation} />
                        <DataRow icon={Users} label="Acompañante" value={patient.companion} />
                        <DataRow icon={Heart} label="Contacto emergencia" value={patient.emergency_contact} />
                        <DataRow icon={Network} label="Genograma" value={undefined} />
                        <DataRow icon={Stethoscope} label="Diagnósticos" value={clinicalRecord?.diagnosis} />
                        <DataRow icon={Pill} label="Medicamentos" value={clinicalRecord?.medications || undefined} />
                    </div>
                </ScrollArea>
            </div>

            {/* Column 2: Sessions List */}
            <div className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col">
                {/* Header */}
                <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-500" />
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Sesiones</h3>
                            {isRealtime && (
                                <div className="flex items-center gap-1.5 animate-pulse">
                                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                                    <span className="text-[10px] text-teal-600 font-bold uppercase tracking-tight">Sincro</span>
                                </div>
                            )}
                        </div>
                        <Button
                            onClick={handleNewSession}
                            size="sm"
                            className="h-7 px-2 bg-teal-600 hover:bg-teal-700 text-white text-xs"
                        >
                            <Plus className="w-3.5 h-3.5 mr-1" />
                            Nueva
                        </Button>
                    </div>
                    <p className="text-xs text-slate-500">{sessions.length} sesiones registradas</p>
                </div>

                {/* Session List */}
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {sessions.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => handleSelectSession(session)}
                                className={cn(
                                    "w-full p-3 rounded-lg text-left transition-all",
                                    selectedSession?.id === session.id
                                        ? "bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800"
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                                )}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <FileText className={cn(
                                        "w-4 h-4",
                                        selectedSession?.id === session.id ? "text-teal-600 dark:text-teal-400" : "text-slate-400"
                                    )} />
                                    <span className={cn(
                                        "text-sm font-medium",
                                        selectedSession?.id === session.id ? "text-teal-700 dark:text-teal-300" : "text-slate-700 dark:text-slate-300"
                                    )}>
                                        {format.dateTime(new Date(session.date), { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </span>
                                </div>
                                {session.notes && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 ml-6">
                                        {session.notes.substring(0, 60)}...
                                    </p>
                                )}
                            </button>
                        ))}

                        {sessions.length === 0 && (
                            <div className="p-6 text-center text-slate-400">
                                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No hay sesiones</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Column 3: Session Detail */}
            <div className="flex-1 flex flex-col min-w-0">
                {selectedSession ? (
                    <>
                        {/* Session Header */}
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h2 className="font-bold text-slate-900 dark:text-white text-lg">
                                    {format.dateTime(new Date(selectedSession.date), { day: 'numeric', month: 'long', year: 'numeric' })}
                                </h2>
                                <p className="text-sm text-slate-500">{selectedSession.type || 'Consulta'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsExpanded(true)}
                                    className="text-xs"
                                >
                                    <Maximize2 className="w-4 h-4 mr-1" />
                                    Expandir
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    size="sm"
                                    disabled={isSaving}
                                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs"
                                >
                                    <Save className="w-4 h-4 mr-1" />
                                    {isSaving ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </div>
                        </div>

                        {/* Notes Editor */}
                        <div className="flex-1 p-4">
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="h-full w-full resize-none border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-base p-4 rounded-lg"
                                placeholder="Escribe las notas de la sesión aquí..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-lg font-medium">Selecciona una sesión</p>
                            <p className="text-sm">o crea una nueva para empezar</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Fullscreen Notes Modal */}
            {isExpanded && selectedSession && (
                <div className="fixed inset-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Notas - {format.dateTime(new Date(selectedSession.date), { day: 'numeric', month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => { handleSave(); setIsExpanded(false) }}
                                className="bg-teal-600 hover:bg-teal-700 text-white"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar y cerrar
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 p-6">
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="h-full w-full resize-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-lg p-6 rounded-xl"
                            placeholder="Escribe las notas de la sesión aquí..."
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
