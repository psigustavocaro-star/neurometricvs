"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, Briefcase, GraduationCap, Heart, Calendar, FileText, Activity, TrendingUp, Brain } from "lucide-react"
import { useTranslations, useFormatter } from 'next-intl'

interface PatientProfileModalProps {
    patient: any
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PatientProfileModal({ patient, open, onOpenChange }: PatientProfileModalProps) {
    const t = useTranslations('Dashboard.Patients.Profile')
    const format = useFormatter()

    if (!patient) return null

    const getGradient = (index: number = 0) => {
        const gradients = [
            'from-teal-400 via-teal-500 to-cyan-600',
            'from-cyan-400 via-teal-500 to-teal-600',
            'from-teal-500 via-cyan-500 to-blue-500',
            'from-emerald-400 via-teal-500 to-cyan-600',
            'from-teal-400 via-cyan-400 to-sky-500',
        ]
        return gradients[index % gradients.length]
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-4">
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradient(0)} flex items-center justify-center shadow-xl`}>
                            <span className="text-white font-bold text-2xl tracking-tight">
                                {patient.full_name?.substring(0, 2).toUpperCase() || 'PA'}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{patient.full_name}</h2>
                            <p className="text-sm text-slate-500 font-normal mt-1">
                                {patient.age} {t('age_suffix')} • {patient.gender}
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    {/* Diagnosis Banner */}
                    {patient.diagnosis && (
                        <Card className="border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">{t('main_diagnosis')}</p>
                                        <p className="text-lg font-bold text-slate-900">{patient.diagnosis}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Contact & Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {t('timeline')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {patient.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500">{t('email')}</p>
                                            <p className="text-sm font-medium text-slate-900">{patient.email}</p>
                                        </div>
                                    </div>
                                )}
                                {patient.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500">{t('phone')}</p>
                                            <p className="text-sm font-medium text-slate-900">{patient.phone}</p>
                                        </div>
                                    </div>
                                )}
                                {patient.marital_status && (
                                    <div className="flex items-center gap-3">
                                        <Heart className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500">{t('marital_status')}</p>
                                            <p className="text-sm font-medium text-slate-900">{patient.marital_status}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    {t('professional_info')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {patient.occupation && (
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500">{t('occupation')}</p>
                                            <p className="text-sm font-medium text-slate-900">{patient.occupation}</p>
                                        </div>
                                    </div>
                                )}
                                {patient.education && (
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500">{t('education')}</p>
                                            <p className="text-sm font-medium text-slate-900">{patient.education}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Treatment Stats */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                {t('treatment_stats')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                                    <p className="text-2xl font-bold text-indigo-700">{patient.sessions_count || 0}</p>
                                    <p className="text-xs text-slate-600 mt-1">{t('total_sessions')}</p>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                                    <p className="text-2xl font-bold text-teal-700">
                                        {patient.created_at ? Math.floor((Date.now() - new Date(patient.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0}
                                    </p>
                                    <p className="text-xs text-slate-600 mt-1">{t('months_in_treatment')}</p>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                                    <p className="text-2xl font-bold text-emerald-700">
                                        {patient.last_session ? Math.floor((Date.now() - new Date(patient.last_session).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                                    </p>
                                    <p className="text-xs text-slate-600 mt-1">{t('days_since_last_session')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Clinical Notes */}
                    {patient.notes && (
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    {t('clinical_notes')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-700 leading-relaxed">{patient.notes}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Timeline */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {t('timeline')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2"></div>
                                    <div>
                                        <p className="text-xs text-slate-500">{t('registration_date')}</p>
                                        <p className="text-sm font-medium text-slate-900">
                                            {format.dateTime(new Date(patient.created_at), {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {patient.last_session && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                                        <div>
                                            <p className="text-xs text-slate-500">{t('last_session')}</p>
                                            <p className="text-sm font-medium text-slate-900">
                                                {format.dateTime(new Date(patient.last_session), {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    )
}
