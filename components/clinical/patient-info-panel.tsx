'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
    AlertCircle,
    Network,
    Stethoscope,
    Pill,
    Pencil,
    Check,
    X
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useFormatter } from 'next-intl'

interface PatientInfoPanelProps {
    patient: {
        id: string
        full_name: string
        birth_date?: string
        gender?: string
        rut?: string
        phone?: string
        contact_email?: string
        address?: string
        clinic?: string
        education?: string
        occupation?: string
        companion?: string
        emergency_contact?: string
        genogram?: string
    }
    clinicalRecord?: {
        diagnosis?: string
        medications?: string
    } | null
    onUpdate?: (field: string, value: string) => Promise<void>
}

interface InfoRowProps {
    icon: React.ReactNode
    label: string
    value?: string | null
    badge?: boolean
    badgeColor?: string
    editable?: boolean
    onEdit?: (value: string) => void
}

function InfoRow({ icon, label, value, badge, badgeColor = "bg-slate-600", editable, onEdit }: InfoRowProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(value || '')

    const handleSave = () => {
        if (onEdit) {
            onEdit(editValue)
        }
        setIsEditing(false)
    }

    return (
        <div className="flex items-start gap-3 py-3 px-4 hover:bg-slate-800/30 transition-colors group">
            <div className="text-slate-500 mt-0.5 flex-shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="h-7 text-sm bg-slate-800 border-slate-700"
                            autoFocus
                        />
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleSave}>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setIsEditing(false)}>
                            <X className="w-3.5 h-3.5 text-red-500" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {badge && value ? (
                            <Badge className={cn("text-xs font-medium", badgeColor)}>
                                {value}
                            </Badge>
                        ) : (
                            <p className={cn(
                                "text-sm font-medium",
                                value ? "text-slate-200" : "text-slate-600 italic"
                            )}>
                                {value || 'Vacío'}
                            </p>
                        )}
                        {editable && !isEditing && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                    setEditValue(value || '')
                                    setIsEditing(true)
                                }}
                            >
                                <Pencil className="w-3 h-3 text-slate-400" />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export function PatientInfoPanel({ patient, clinicalRecord, onUpdate }: PatientInfoPanelProps) {
    const format = useFormatter()

    // Calculate age from birth date
    const calculateAge = (birthDate: string) => {
        const birth = new Date(birthDate)
        const now = new Date()

        let years = now.getFullYear() - birth.getFullYear()
        let months = now.getMonth() - birth.getMonth()
        let days = now.getDate() - birth.getDate()

        if (days < 0) {
            months--
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
            days += prevMonth.getDate()
        }

        if (months < 0) {
            years--
            months += 12
        }

        return `${years} Años ${months} Meses ${days} Días`
    }

    const formatBirthDate = (date: string) => {
        return format.dateTime(new Date(date), {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="h-full bg-slate-900 border-r border-slate-800 flex flex-col">
            {/* Header with patient name */}
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold text-white tracking-tight uppercase">
                    {patient.full_name}
                </h1>
            </div>

            {/* Scrollable info list */}
            <ScrollArea className="flex-1">
                <div className="divide-y divide-slate-800/50">
                    <InfoRow
                        icon={<User className="w-4 h-4" />}
                        label="Género"
                        value={patient.gender === 'male' ? 'Masculino' : patient.gender === 'female' ? 'Femenino' : patient.gender}
                        badge
                        badgeColor="bg-teal-600 hover:bg-teal-600"
                    />

                    <InfoRow
                        icon={<Calendar className="w-4 h-4" />}
                        label="Fecha de nacimiento"
                        value={patient.birth_date ? formatBirthDate(patient.birth_date) : undefined}
                    />

                    <InfoRow
                        icon={<IdCard className="w-4 h-4" />}
                        label="RUT"
                        value={patient.rut}
                        editable
                        onEdit={(v) => onUpdate?.('rut', v)}
                    />

                    <InfoRow
                        icon={<Clock className="w-4 h-4" />}
                        label="Edad"
                        value={patient.birth_date ? calculateAge(patient.birth_date) : undefined}
                    />

                    <InfoRow
                        icon={<MapPin className="w-4 h-4" />}
                        label="Dirección"
                        value={patient.address}
                        editable
                        onEdit={(v) => onUpdate?.('address', v)}
                    />

                    <InfoRow
                        icon={<Phone className="w-4 h-4" />}
                        label="Teléfono"
                        value={patient.phone}
                        editable
                        onEdit={(v) => onUpdate?.('phone', v)}
                    />

                    <InfoRow
                        icon={<Mail className="w-4 h-4" />}
                        label="Correo"
                        value={patient.contact_email}
                        editable
                        onEdit={(v) => onUpdate?.('contact_email', v)}
                    />

                    <InfoRow
                        icon={<Building2 className="w-4 h-4" />}
                        label="Lugar de atención"
                        value={patient.clinic}
                        editable
                        onEdit={(v) => onUpdate?.('clinic', v)}
                    />

                    <InfoRow
                        icon={<GraduationCap className="w-4 h-4" />}
                        label="Nivel educacional"
                        value={patient.education}
                        editable
                        onEdit={(v) => onUpdate?.('education', v)}
                    />

                    <InfoRow
                        icon={<Briefcase className="w-4 h-4" />}
                        label="Ocupación"
                        value={patient.occupation}
                        editable
                        onEdit={(v) => onUpdate?.('occupation', v)}
                    />

                    <InfoRow
                        icon={<Users className="w-4 h-4" />}
                        label="Acompañante"
                        value={patient.companion}
                        editable
                        onEdit={(v) => onUpdate?.('companion', v)}
                    />

                    <InfoRow
                        icon={<AlertCircle className="w-4 h-4" />}
                        label="Contacto de emergencia"
                        value={patient.emergency_contact}
                        editable
                        onEdit={(v) => onUpdate?.('emergency_contact', v)}
                    />

                    <InfoRow
                        icon={<Network className="w-4 h-4" />}
                        label="Genograma"
                        value={patient.genogram}
                    />

                    <InfoRow
                        icon={<Stethoscope className="w-4 h-4" />}
                        label="Diagnósticos"
                        value={clinicalRecord?.diagnosis}
                        editable
                        onEdit={(v) => onUpdate?.('diagnosis', v)}
                    />

                    <InfoRow
                        icon={<Pill className="w-4 h-4" />}
                        label="Medicamentos"
                        value={clinicalRecord?.medications}
                        editable
                        onEdit={(v) => onUpdate?.('medications', v)}
                    />
                </div>
            </ScrollArea>
        </div>
    )
}
