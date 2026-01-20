'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { Pencil, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { updatePatient } from "@/app/[locale]/patients/actions"
import { useTranslations } from 'next-intl'

interface EditPatientSheetProps {
    patient: {
        id: string
        full_name: string
        birth_date: string
        gender: string
        contact_email?: string
        diagnosis?: string
    }
}

export function EditPatientSheet({ patient }: EditPatientSheetProps) {
    const t = useTranslations('Dashboard.Patients.Edit')
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const result = await updatePatient(patient.id, formData)

        setIsLoading(false)

        if (result?.error) {
            toast.error(t('error'))
        } else {
            toast.success(t('success'))
            setOpen(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-2">
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{t('trigger')}</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>{t('title')}</SheetTitle>
                    <SheetDescription>
                        {t('description')}
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">{t('fields.name')}</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            defaultValue={patient.full_name}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="birthDate">{t('fields.birth_date')}</Label>
                            <Input
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                defaultValue={patient.birth_date}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">{t('fields.gender')}</Label>
                            <select
                                id="gender"
                                name="gender"
                                defaultValue={patient.gender}
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                            >
                                <option value="male">{t('gender.male')}</option>
                                <option value="female">{t('gender.female')}</option>
                                <option value="other">{t('gender.other')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('fields.email')}</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={patient.contact_email || ''}
                            placeholder={t('placeholders.email')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="diagnosis" className="flex items-center gap-2">
                            <span>Diagnóstico Principal</span>
                            <span className="text-xs text-muted-foreground">(DSM-5 / CIE-11)</span>
                        </Label>
                        <textarea
                            id="diagnosis"
                            name="diagnosis"
                            defaultValue={patient.diagnosis || ''}
                            placeholder="Ej: Trastorno Depresivo Mayor, episodio único, moderado (F32.1)"
                            className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                        />
                    </div>

                    <SheetFooter className="mt-8">
                        <SheetClose asChild>
                            <Button type="button" variant="ghost">{t('cancel')}</Button>
                        </SheetClose>
                        <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('save')}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
