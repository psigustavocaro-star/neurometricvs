'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GuidedGenogramBuilder } from './guided-genogram-builder'
import {
    ArrowRight,
    UserPlus,
    TrendingUp,
    Clock,
    Sparkles,
    ChevronDown,
    ChevronUp,
    Network,
    Lightbulb,
    Target,
    MessageSquare,
    Pill,
    Brain,
    Activity,
    School,
    GraduationCap,
    Heart,
    Search,
    Stethoscope,
    Users,
    IdCard,
    Briefcase,
    MapPin,
    Calendar,
    Phone,
    Mail,
    Pencil,
    Check,
    X
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { useTranslations, useFormatter } from 'next-intl'
import { ClinicalRecord, VitalsLog, PatientMedication } from '@/types/clinical'
import { VitalsModule } from './vitals-module'
import { MedicationManager } from './medication-manager'
import { updateClinicalRecord } from '@/app/[locale]/patients/clinical-actions'
import { toast } from 'sonner'

interface PatientOverviewProps {
    patient: any
    clinicalRecord?: ClinicalRecord | null
    lastSession: any
    diagnosis: string
    onStartSession: () => void
    sessions?: any[]
    userSpecialty?: string
    vitalsLogs?: VitalsLog[]
    medications?: PatientMedication[]
}

export function PatientOverview({
    patient,
    clinicalRecord,
    lastSession,
    diagnosis,
    onStartSession,
    sessions = [],
    userSpecialty = 'psychologist',
    vitalsLogs = [],
    medications = []
}: PatientOverviewProps) {
    const t = useTranslations('Dashboard.Patients.Overview')
    const format = useFormatter()

    const activeMedications = medications.filter(m => m.status === 'active')
    const router = useRouter()
    const [showGenogram, setShowGenogram] = useState(false)

    // Diagnosis editing state
    const [isEditingDiagnosis, setIsEditingDiagnosis] = useState(false)
    const [editedDiagnosis, setEditedDiagnosis] = useState(diagnosis || '')
    const [isSavingDiagnosis, setIsSavingDiagnosis] = useState(false)

    // Role detection matching NewPatientForm
    const activeRole = userSpecialty?.toLowerCase() || 'psychologist'
    const isPsychiatrist = activeRole.includes('psychiatrist') || activeRole.includes('psiquiatra')
    const isNeurologist = activeRole.includes('neurologist') || activeRole.includes('neurólog')
    const isMedical = isPsychiatrist || isNeurologist || activeRole.includes('physician') || activeRole.includes('médic') || activeRole.includes('nutritionist') || activeRole.includes('nutricionista')
    const isAcademic = activeRole.includes('psychopedagogue') || activeRole.includes('psicopedagog') || activeRole.includes('speech_therapist') || activeRole.includes('fonoaudiólog')
    const isPhysical = activeRole.includes('occupational_therapist') || activeRole.includes('terapeuta')
    const isSocial = false // Explicitly disabled

    const anamnesis = clinicalRecord?.anamnesis as any || {}

    // Get the most recent sessions with insights
    const recentSessions = sessions.slice(0, 5)

    // Handle diagnosis save
    const handleSaveDiagnosis = async () => {
        setIsSavingDiagnosis(true)
        try {
            await updateClinicalRecord(patient.id, { diagnosis: editedDiagnosis })
            toast.success('Diagnóstico actualizado')
            setIsEditingDiagnosis(false)
            router.refresh()
        } catch (error) {
            toast.error('Error al actualizar diagnóstico')
        } finally {
            setIsSavingDiagnosis(false)
        }
    }

    return (
        <div className="h-full overflow-y-auto overflow-x-hidden bg-background transition-colors duration-300 w-full max-w-full">
            <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">

                {/* Top Row: Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Clinical Status Card */}
                    <Card className="border shadow-sm border-border bg-card overflow-hidden relative group transition-all duration-300 hover:shadow-md">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/80"></div>
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-primary/10 text-primary">
                                    <Target className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-bold text-foreground uppercase tracking-wide">{t('current_status')}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-3">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{t('main_diagnosis')}</p>
                                    {!isEditingDiagnosis && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 hover:bg-primary/10 hover:text-primary"
                                            onClick={() => {
                                                setEditedDiagnosis(diagnosis || '')
                                                setIsEditingDiagnosis(true)
                                            }}
                                            title="Editar diagnóstico"
                                        >
                                            <Pencil className="w-3 h-3" />
                                        </Button>
                                    )}
                                </div>
                                {isEditingDiagnosis ? (
                                    <div className="space-y-2">
                                        <Input
                                            value={editedDiagnosis}
                                            onChange={(e) => setEditedDiagnosis(e.target.value)}
                                            placeholder="Ej: F32.1 Episodio depresivo moderado"
                                            className="text-sm h-9"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                className="h-7 text-xs bg-primary hover:bg-primary/90"
                                                onClick={handleSaveDiagnosis}
                                                disabled={isSavingDiagnosis}
                                            >
                                                <Check className="w-3 h-3 mr-1" />
                                                Guardar
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-7 text-xs"
                                                onClick={() => setIsEditingDiagnosis(false)}
                                            >
                                                <X className="w-3 h-3 mr-1" />
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="font-bold text-foreground text-base leading-tight">{diagnosis || t('in_evaluation')}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-primary bg-primary/10 border-primary/20 text-xs px-2 py-0.5 font-medium">
                                    {t('stable')}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Last Session Card */}
                    <Card className="border shadow-sm border-border bg-card overflow-hidden relative group transition-all duration-300 hover:shadow-md">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-primary/10 text-primary">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <CardTitle className="text-sm font-bold text-foreground uppercase tracking-wide">{t('last_session')}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            {lastSession ? (
                                <div className="space-y-2">
                                    <p className="font-bold text-foreground text-base">
                                        {format.dateTime(new Date(lastSession.date), { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-primary bg-primary/5 border-primary/20 text-xs px-2 py-0.5 font-medium">
                                            {lastSession.type || t('regular_session')}
                                        </Badge>
                                        {lastSession.duration && (
                                            <span className="text-xs font-medium text-muted-foreground">{lastSession.duration} min</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">{t('no_sessions_yet')}</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Action Card (Hero) */}
                    <Card
                        className="border shadow-sm border-border bg-card overflow-hidden relative group cursor-pointer hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-all duration-300"
                        onClick={onStartSession}
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-muted group-hover:bg-primary transition-colors"></div>
                        <CardContent className="p-4 flex flex-col justify-center h-full relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors pointer-events-none">
                                    <UserPlus className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{t('new_session')}</h4>
                                    <p className="text-xs text-muted-foreground">{t('register_visit')}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                    {/* Sessions Timeline - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Clinical Modules Section */}
                        {(isMedical || isPhysical) && (
                            <div className="space-y-6">
                                <VitalsModule patientId={patient.id} vitalsLogs={vitalsLogs} />
                                <MedicationManager patientId={patient.id} medications={medications} />
                            </div>
                        )}

                        {/* EXPERT CARDS: Psychiatry */}
                        {(userSpecialty?.includes('psychiatrist') || userSpecialty?.includes('psiquiatra')) && (
                            <Card className="border border-primary/10 shadow-sm bg-primary/5 hover:bg-primary/10 transition-colors">
                                <CardHeader className="pb-2 pt-4 px-4 bg-transparent border-b border-primary/10">
                                    <div className="flex items-center gap-2">
                                        <Pill className="w-4 h-4 text-primary" />
                                        <CardTitle className="text-sm font-bold text-foreground">{t('pharmacological_treatment')}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 py-3">
                                    <div className="flex gap-2 flex-wrap">
                                        {activeMedications.length > 0 ? (
                                            activeMedications.map((med, i) => (
                                                <Badge key={i} variant="secondary" className="bg-emerald-50/50 border border-emerald-100 text-emerald-700 hover:bg-emerald-50 cursor-default text-[10px] font-bold">
                                                    {med.name} {med.dosage}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">{t('no_medications')}</span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* EXPERT CARDS: Neurology */}
                        {(userSpecialty?.includes('neurologist') || userSpecialty?.includes('neurologo')) && (
                            <Card className="border border-primary/10 shadow-sm bg-primary/5 hover:bg-primary/10 transition-colors">
                                <CardHeader className="pb-2 pt-4 px-4 bg-transparent border-b border-primary/10">
                                    <div className="flex items-center gap-2">
                                        <Brain className="w-4 h-4 text-primary" />
                                        <CardTitle className="text-sm font-bold text-foreground">{t('cognitive_evolution')}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 py-3">
                                    <div className="flex items-end gap-2 h-16 w-full max-w-xs">
                                        {[24, 25, 26, 26, 27].map((score, i) => (
                                            <div key={i} className="flex-1 bg-primary/10 rounded-t-sm relative group">
                                                <div
                                                    className="absolute bottom-0 w-full bg-primary/60 group-hover:bg-primary rounded-t-sm transition-all duration-500"
                                                    style={{ height: `${(score / 30) * 100}%` }}
                                                />
                                                <div className="absolute -top-6 w-full text-center text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 font-bold transition-opacity">
                                                    {score}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-medium text-muted-foreground mt-2 uppercase tracking-wide">{t('mmse_trend')}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* SPECIALTY CARD: Academic/Educational Context */}
                        {isAcademic && (
                            <Card className="border border-indigo-100 dark:border-indigo-900 shadow-sm bg-indigo-50/30 dark:bg-indigo-900/10 hover:bg-indigo-50/50 transition-colors">
                                <CardHeader className="pb-2 pt-4 px-4 border-b border-indigo-100 dark:border-indigo-900/50">
                                    <div className="flex items-center gap-2">
                                        <School className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                        <CardTitle className="text-sm font-bold text-foreground">{t('educational_context')}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 py-3 space-y-2">
                                    {anamnesis.school && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <School className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="font-medium text-foreground">{anamnesis.school}</span>
                                        </div>
                                    )}
                                    {anamnesis.grade && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-muted-foreground">{anamnesis.grade}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* SPECIALTY CARD: Physical Therapy Context */}
                        {isPhysical && (
                            <Card className="border border-teal-100 dark:border-teal-900 shadow-sm bg-teal-50/30 dark:bg-teal-900/10 hover:bg-teal-50/50 transition-colors">
                                <CardHeader className="pb-2 pt-4 px-4 border-b border-teal-100 dark:border-teal-900/50">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                        <CardTitle className="text-sm font-bold text-foreground">{t('physical_context')}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 py-3">
                                    <p className="text-sm text-muted-foreground leading-tight italic">
                                        {anamnesis.physical_status || t('in_evaluation')}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {anamnesis.reason_for_consultation && (
                            <Card className="border border-slate-100 dark:border-slate-800 shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                                <CardHeader className="pb-2 pt-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <Search className="w-4 h-4 text-slate-400" />
                                        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Motivo de Consulta</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 pb-4">
                                    <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-3">
                                        {anamnesis.reason_for_consultation}
                                    </p>
                                </CardContent>
                            </Card>
                        )}



                        {/* Sessions with Insights */}
                        <Card className="border border-border shadow-sm bg-card">
                            <CardHeader className="pb-3 pt-4 px-4 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                        <CardTitle className="text-sm font-bold text-foreground uppercase tracking-wide">{t('session_history')}</CardTitle>
                                    </div>
                                    <Badge variant="outline" className="text-muted-foreground bg-muted border-border text-[10px] px-2">
                                        {t('total_count', { count: sessions.length })}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {recentSessions.length > 0 ? (
                                    <div className="divide-y divide-border">
                                        {recentSessions.map((session, index) => (
                                            <div
                                                key={session.id}
                                                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                                                onClick={onStartSession}
                                            >
                                                <div className="flex gap-4">
                                                    {/* Timeline indicator */}
                                                    <div className="flex flex-col items-center pt-1">
                                                        <div className={cn(
                                                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                                            index === 0 ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]' : 'bg-muted-foreground/30'
                                                        )} />
                                                        {index < recentSessions.length - 1 && (
                                                            <div className="w-px flex-1 bg-border/50 mt-1" />
                                                        )}
                                                    </div>

                                                    {/* Session content */}
                                                    <div className="flex-1 min-w-0 pb-2">
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="font-bold text-foreground text-sm">
                                                                {format.dateTime(new Date(session.date), { day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </span>
                                                            <Badge variant="secondary" className="text-[10px] bg-muted text-muted-foreground font-medium">
                                                                {session.type || t('session_fallback')}
                                                            </Badge>
                                                        </div>

                                                        {/* Session notes preview */}
                                                        {session.notes && (
                                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                                                                {session.notes}
                                                            </p>
                                                        )}

                                                        {/* AI Insights if available */}
                                                        {session.ai_insights && (
                                                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.05)]">
                                                                <div className="flex items-center gap-1.5 mb-1.5">
                                                                    <Sparkles className="w-4 h-4 text-primary" />
                                                                    <span className="text-[10px] font-bold text-foreground uppercase tracking-wide opacity-70">{t('ai_analysis')}</span>
                                                                </div>
                                                                <p className="text-xs text-muted-foreground italic leading-relaxed">
                                                                    "{session.ai_insights.summary || session.ai_insights.key_themes || t('analysis_available')}"
                                                                </p>
                                                            </div>
                                                        )}

                                                        <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <span className="text-xs font-medium text-primary flex items-center gap-1">{t('view_details')} <ArrowRight className="w-3 h-3" /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center border border-border">
                                            <MessageSquare className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground mb-4">{t('no_history')}</p>
                                        <Button size="sm" onClick={onStartSession} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            {t('start_first_session')}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar - Stats */}
                    <div className="space-y-4">
                        {/* Treatment Progress */}
                        <Card className="border shadow-sm border-border bg-card">
                            <CardHeader className="pb-2 pt-4 px-4 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded bg-primary/10 text-primary">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <CardTitle className="text-sm font-bold text-foreground uppercase tracking-wide">{t('progress')}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 py-4 space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="font-medium text-muted-foreground">{t('continuity')}</span>
                                        <span className="font-bold text-foreground">{Math.min((sessions.length / 12) * 100, 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-primary transition-all duration-500"
                                            style={{ width: `${Math.min((sessions.length / 12) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 rounded-xl bg-muted border border-border">
                                        <p className="text-2xl font-bold text-foreground mb-0.5">{sessions.length}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t('total_sessions')}</p>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-muted border border-border">
                                        <p className="text-2xl font-bold text-foreground mb-0.5">
                                            {sessions.filter(s => s.ai_insights).length}
                                        </p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t('with_analysis')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
