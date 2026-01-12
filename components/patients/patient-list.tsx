"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, FileText, Trash2, ArrowRight, UserCircle2, Mail, Calendar, User } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations, useFormatter } from "next-intl"

interface Patient {
    id: string
    full_name: string
    birth_date: string
    gender: string
    contact_email?: string
    created_at: string
}

interface PatientListProps {
    initialPatients: Patient[]
}

// Helper function to calculate age safely
function calculateAge(birthDate: string): number | null {
    if (!birthDate) return null
    const date = new Date(birthDate)
    if (isNaN(date.getTime())) return null

    const today = new Date()
    let age = today.getFullYear() - date.getFullYear()
    const m = today.getMonth() - date.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--
    }
    return age >= 0 ? age : null
}

export function PatientList({ initialPatients }: PatientListProps) {
    const t = useTranslations('Dashboard.Patients.List')
    const format = useFormatter()
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState(initialPatients)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [patientToDelete, setPatientToDelete] = useState<string | null>(null)

    // Helper function to get gender display
    function getGenderDisplay(gender: string): { label: string; color: string } {
        switch (gender?.toLowerCase()) {
            case 'male':
            case 'masculino':
                return { label: t('gender.male'), color: 'bg-blue-50 text-blue-700 border-blue-200' }
            case 'female':
            case 'femenino':
                return { label: t('gender.female'), color: 'bg-pink-50 text-pink-700 border-pink-200' }
            case 'other':
            case 'otro':
                return { label: t('gender.other'), color: 'bg-purple-50 text-purple-700 border-purple-200' }
            default:
                return { label: '—', color: 'bg-slate-50 text-slate-400 border-slate-200' }
        }
    }

    const confirmDelete = (id: string) => {
        setPatientToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const executeDelete = () => {
        if (patientToDelete) {
            setPatients(patients.filter(p => p.id !== patientToDelete))
            setPatientToDelete(null)
            setIsDeleteDialogOpen(false)
        }
    }

    const filteredPatients = patients.filter(patient => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return true
        return (
            patient.full_name.toLowerCase().includes(term) ||
            (patient.contact_email || "").toLowerCase().includes(term)
        )
    })

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder={t('search_placeholder')}
                        className="w-full md:w-96 border-slate-200 dark:border-slate-700"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <User className="w-4 h-4" />
                    <span>{filteredPatients.length} {t('count_suffix')}</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-800/50">
                        <TableRow className="border-slate-200/60 dark:border-slate-700">
                            <TableHead className="w-[280px] font-semibold text-slate-700 dark:text-slate-300">{t('table_header.patient')}</TableHead>
                            <TableHead className="w-[100px] font-semibold text-slate-700 dark:text-slate-300">{t('table_header.age')}</TableHead>
                            <TableHead className="w-[120px] font-semibold text-slate-700 dark:text-slate-300">{t('table_header.gender')}</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">{t('table_header.email')}</TableHead>
                            <TableHead className="w-[130px] font-semibold text-slate-700 dark:text-slate-300">{t('table_header.registered')}</TableHead>
                            <TableHead className="text-right w-[100px] font-semibold text-slate-700 dark:text-slate-300">{t('table_header.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.map((patient) => {
                            const age = calculateAge(patient.birth_date)
                            const genderInfo = getGenderDisplay(patient.gender)

                            return (
                                <TableRow key={patient.id} className="hover:bg-teal-50/30 dark:hover:bg-teal-950/20 cursor-pointer group transition-colors border-slate-100 dark:border-slate-800" onClick={() => window.location.href = `/patients/${patient.id}`}>
                                    <TableCell className="font-medium py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-slate-100 dark:border-slate-700 shadow-sm">
                                                <AvatarFallback className="bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 text-teal-700 dark:text-teal-300 text-sm font-bold">
                                                    {patient.full_name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                                                    {patient.full_name}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        {age !== null ? (
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{age} {t('age_suffix')}</span>
                                        ) : (
                                            <span className="text-slate-400 dark:text-slate-500 italic text-sm">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge variant="outline" className={`${genderInfo.color} font-medium text-xs`}>
                                            {genderInfo.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-500 dark:text-slate-400">
                                        {patient.contact_email || <span className="text-slate-400 dark:text-slate-500 italic">{t('no_email')}</span>}
                                    </TableCell>
                                    <TableCell className="text-slate-500 dark:text-slate-400">
                                        {format.dateTime(new Date(patient.created_at), { day: 'numeric', month: 'numeric', year: 'numeric' })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/50">
                                                <Link href={`/patients/${patient.id}`}>
                                                    <FileText className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>{t('table_header.actions')}</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => window.location.href = `/patients/${patient.id}`}>
                                                        <ArrowRight className="mr-2 h-4 w-4" /> {t('actions.view')}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                        onClick={() => confirmDelete(patient.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" /> {t('actions.delete')}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {filteredPatients.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                                    {t('no_patients')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('delete_dialog.title')}</DialogTitle>
                        <DialogDescription>
                            {t('delete_dialog.description')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>{t('delete_dialog.cancel')}</Button>
                        <Button variant="destructive" onClick={executeDelete}>{t('delete_dialog.confirm')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
