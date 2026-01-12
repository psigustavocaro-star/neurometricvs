'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pill, Plus, History, Clock, Info, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react'
import { PatientMedication } from '@/types/clinical'
import { useTranslations, useFormatter } from 'next-intl'
import { cn } from "@/lib/utils"

interface MedicationManagerProps {
    patientId: string
    medications: PatientMedication[]
}

export function MedicationManager({ patientId, medications = [] }: MedicationManagerProps) {
    const t = useTranslations('Dashboard.Patients.Medications')
    const format = useFormatter()

    const activeMeds = medications.filter(m => m.status === 'active')
    const historicMeds = medications.filter(m => m.status !== 'active')

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        {t('title')}
                    </h3>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-bold text-slate-500 hover:text-emerald-600">
                        <History className="w-3.5 h-3.5 mr-1" />
                        {historicMeds.length} {t('historic')}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-2 text-xs font-bold border-emerald-200 text-emerald-700 dark:border-slate-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800">
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        {t('add')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {activeMeds.length > 0 ? activeMeds.map((med) => (
                    <div key={med.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 shadow-sm hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors group">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                                    <Pill className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-slate-900 dark:text-white leading-none capitalize">
                                            {med.name}
                                        </h4>
                                        <Badge variant="outline" className="text-[9px] font-bold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-none px-1 h-4">
                                            {t('active')}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                                        {med.dosage && (
                                            <span className="flex items-center gap-1">
                                                <Info className="w-3 h-3 text-slate-400" />
                                                {med.dosage}
                                            </span>
                                        )}
                                        {med.frequency && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-slate-400" />
                                                {med.frequency}
                                            </span>
                                        )}
                                        {med.route && (
                                            <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                                                {med.route}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-all">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                        {med.notes && (
                            <div className="mt-2 ml-10 pl-3 border-l-2 border-slate-100 dark:border-slate-800">
                                <p className="text-[11px] text-slate-500 italic leading-relaxed">
                                    "{med.notes}"
                                </p>
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="bg-slate-50/50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                        <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
                        <p className="text-sm font-medium text-slate-500">{t('none')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
