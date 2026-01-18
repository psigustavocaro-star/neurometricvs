'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createSession, updateClinicalRecord } from "@/app/[locale]/patients/clinical-actions"
import { toast } from "sonner"
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft, Sparkles, ClipboardList, FileCheck2 } from "lucide-react"
import { useTranslations } from 'next-intl'
import { InSessionTestRunner } from './in-session-test-runner'

interface FirstSessionFormProps {
    patientId: string
    patientName: string
    onComplete: () => void
}

export function FirstSessionForm({ patientId, patientName, onComplete }: FirstSessionFormProps) {
    const t = useTranslations('Dashboard.Patients.Sessions.FirstForm')
    const tCommon = useTranslations('Dashboard.Patients.Sessions')
    const [saving, setSaving] = useState(false)
    const { resolvedTheme } = useTheme() // Assuming useTheme is imported, if not I need to adding it. 
    // Wait, useTheme wasn't in original imports. I should check if I need it or just use Tailwind dark classes.
    // Original code used dark: classes. I'll stick to that.

    // Unified Session Data
    const [notes, setNotes] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [duration, setDuration] = useState(60)
    const [showEvaluator, setShowEvaluator] = useState(false)

    const handleSave = async (isComplete: boolean = false) => {
        if (!notes.trim()) {
            toast.error(t('messages.write_notes'))
            return
        }

        setSaving(true)
        try {
            // 1. Save Session
            const sessionData = {
                date,
                duration,
                type: t('initial_evaluation'),
                notes: notes,
                status: (isComplete ? 'completed' : 'scheduled') as 'completed' | 'scheduled' | 'cancelled'
            }
            await createSession(patientId, sessionData)

            // 2. Update Anamnesis (History) with the initial interview notes
            // We treat the first session notes as the "Present Illness" / History
            await updateClinicalRecord(patientId, {
                anamnesis: {
                    presentIllness: notes, // Map notes to history
                    personalHistory: t('see_notes'), // Placeholder
                }
            })

            toast.success(isComplete ? t('messages.success_complete') : t('messages.success_draft'))
            onComplete()
        } catch (error: any) {
            console.error("Error saving session:", error)
            toast.error(t('messages.error', { message: error.message || 'Desconocido' }))
        } finally {
            setSaving(false)
        }
    }

    const interviewGuide = [
        { title: t('interview_guide.sections.reason.title'), questions: t.raw('interview_guide.sections.reason.questions') },
        { title: t('interview_guide.sections.history.title'), questions: t.raw('interview_guide.sections.history.questions') },
        { title: t('interview_guide.sections.family.title'), questions: t.raw('interview_guide.sections.family.questions') },
        { title: t('interview_guide.sections.social.title'), questions: t.raw('interview_guide.sections.social.questions') },
        { title: t('interview_guide.sections.habits.title'), questions: t.raw('interview_guide.sections.habits.questions') },
    ]

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Alert className="border-teal-200 dark:border-teal-900/50 bg-teal-50 dark:bg-teal-950/20">
                <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <AlertDescription className="text-teal-900 dark:text-teal-200">
                    <strong>{t('title', { name: patientName })}</strong>
                    <br />
                    {t('description')}
                </AlertDescription>
            </Alert>

            {/* Progress Indicator - REMOVED for freeform layout */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Editor Area (2 columns) */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
                            <CardTitle className="text-slate-800 dark:text-slate-200 text-lg font-semibold">
                                {t('notes_title')}
                            </CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400 -mt-1">
                                {t('notes_description')}
                            </CardDescription>

                            {/* Date and Duration Row - Better Spacing */}
                            <div className="flex flex-wrap items-end gap-6 pt-2">
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        Fecha
                                    </Label>
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-40 h-10 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        Duración
                                    </Label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-4 h-10">
                                        <Input
                                            type="number"
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value))}
                                            className="w-16 h-8 text-sm border-0 p-0 focus-visible:ring-0 text-center bg-transparent text-slate-700 dark:text-slate-300"
                                        />
                                        <span className="text-sm text-slate-500 dark:text-slate-400">{tCommon('minutes_suffix')}</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder={t('notes_placeholder')}
                                className="min-h-[500px] border-0 rounded-none resize-none p-6 text-base leading-relaxed focus-visible:ring-0 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Interview Guide Sidebar (1 column) */}
                <div className="space-y-4">
                    {/* Test/Evaluation Button */}
                    <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center justify-between text-blue-700 dark:text-blue-300">
                                <span className="flex items-center gap-2">
                                    <FileCheck2 className="w-4 h-4" />
                                    {tCommon('perform_evaluation')}
                                </span>
                                <Button
                                    size="sm"
                                    variant={showEvaluator ? "secondary" : "outline"}
                                    className={`h-7 text-xs ${showEvaluator ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'border-blue-300 dark:border-blue-700'}`}
                                    onClick={() => setShowEvaluator(!showEvaluator)}
                                >
                                    {showEvaluator ? tCommon('hide_evaluation') || 'Ocultar' : tCommon('perform_evaluation') || 'Realizar Test'}
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        {showEvaluator && (
                            <CardContent className="pt-0">
                                <InSessionTestRunner patientId={patientId} />
                            </CardContent>
                        )}
                    </Card>

                    <Card className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <ClipboardList className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                {t('interview_guide.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Accordion type="single" collapsible className="w-full">
                                {interviewGuide.map((section, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-200 dark:border-slate-800">
                                        <AccordionTrigger className="text-sm font-medium text-slate-600 dark:text-slate-400 py-3 hover:text-indigo-600 dark:hover:text-indigo-400 hover:no-underline">
                                            {section.title}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-2 pl-2">
                                                {section.questions.map((q: string, qIdx: number) => (
                                                    <li key={qIdx} className="text-xs text-slate-500 dark:text-slate-500 italic flex gap-2">
                                                        <span className="text-indigo-400">•</span>
                                                        {q}
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                            <div className="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <strong>{t('interview_guide.tip_title')}:</strong> {t('interview_guide.tip_text')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button
                    variant="ghost"
                    onClick={() => handleSave(false)}
                    disabled={saving}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                    {t('save_draft')}
                </Button>
                <Button
                    onClick={() => handleSave(true)}
                    disabled={saving}
                    className="bg-teal-600 hover:bg-teal-700 text-white min-w-[200px]"
                >
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {t('finish_session')}
                </Button>
            </div>
        </div>
    )
}
