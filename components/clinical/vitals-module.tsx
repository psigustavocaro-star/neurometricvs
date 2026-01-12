'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Activity,
    Thermometer,
    Scale,
    Ruler,
    Heart,
    Wind,
    Plus,
    History,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Minus
} from 'lucide-react'
import { VitalsLog } from '@/types/clinical'
import { useTranslations, useFormatter } from 'next-intl'
import { cn } from "@/lib/utils"

interface VitalsModuleProps {
    patientId: string
    vitalsLogs: VitalsLog[]
}

export function VitalsModule({ patientId, vitalsLogs = [] }: VitalsModuleProps) {
    const t = useTranslations('Dashboard.Patients.Vitals')
    const format = useFormatter()
    const latest = vitalsLogs[0]
    const previous = vitalsLogs[1]

    const getTrend = (current?: number, prev?: number) => {
        if (!current || !prev) return <Minus className="w-3 h-3 text-slate-300" />
        if (current > prev) return <ArrowUpRight className="w-3 h-3 text-rose-500" />
        if (current < prev) return <ArrowDownRight className="w-3 h-3 text-emerald-500" />
        return <Minus className="w-3 h-3 text-slate-300" />
    }

    const VitalsCard = ({ label, value, unit, icon: Icon, color, trend }: any) => (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 flex flex-col gap-1 shadow-sm">
            <div className="flex items-center justify-between">
                <div className={cn("p-1.5 rounded-lg", color)}>
                    <Icon className="w-4 h-4" />
                </div>
                {trend}
            </div>
            <div className="mt-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                    {value || '—'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-tight">
                    {unit}
                </span>
            </div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                {label}
            </p>
        </div>
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-500" />
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        {t('title')}
                    </h3>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-bold text-slate-500 hover:text-teal-600">
                        <History className="w-3.5 h-3.5 mr-1" />
                        {t('history')}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-2 text-xs font-bold border-teal-200 text-teal-700 dark:border-slate-700 dark:text-cyan-400 hover:bg-teal-50 dark:hover:bg-slate-800">
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        {t('add')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <VitalsCard
                    label={t('weight')}
                    value={latest?.weight}
                    unit="kg"
                    icon={Scale}
                    color="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                    trend={getTrend(latest?.weight, previous?.weight)}
                />
                <VitalsCard
                    label={t('blood_pressure')}
                    value={latest?.systolic && latest?.diastolic ? `${latest.systolic}/${latest.diastolic}` : null}
                    unit="mmHg"
                    icon={Activity}
                    color="bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                />
                <VitalsCard
                    label={t('heart_rate')}
                    value={latest?.heart_rate}
                    unit="bpm"
                    icon={Heart}
                    color="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    trend={getTrend(latest?.heart_rate, previous?.heart_rate)}
                />
                <VitalsCard
                    label={t('temperature')}
                    value={latest?.temperature}
                    unit="°C"
                    icon={Thermometer}
                    color="bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                />
            </div>

            {latest?.notes && (
                <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-3">
                    <p className="text-xs text-amber-800 dark:text-amber-200 italic leading-relaxed">
                        <span className="font-bold uppercase text-[9px] not-italic mr-2 opacity-50">{t('latest_notes')}:</span>
                        "{latest.notes}"
                    </p>
                </div>
            )}
        </div>
    )
}
