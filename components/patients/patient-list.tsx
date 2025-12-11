"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, FileText, Trash2, ArrowRight, UserCircle2, Mail, Calendar } from "lucide-react"
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

export function PatientList({ initialPatients }: PatientListProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState(initialPatients)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [patientToDelete, setPatientToDelete] = useState<string | null>(null)

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
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Buscar por nombre, email..."
                        className="w-full md:w-96 border-slate-200"
                    />
                </div>
                <div className="text-sm text-slate-500 font-medium">
                    {filteredPatients.length} pacientes registrados
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[300px]">Paciente</TableHead>
                            <TableHead>Edad</TableHead>
                            <TableHead>Género</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Registrado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.map((patient) => {
                            const birthDate = new Date(patient.birth_date);
                            const today = new Date();
                            let age = today.getFullYear() - birthDate.getFullYear();
                            const m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }

                            return (
                                <TableRow key={patient.id} className="hover:bg-slate-50/80 cursor-pointer group" onClick={() => window.location.href = `/patients/${patient.id}`}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-slate-100">
                                                <AvatarFallback className="bg-teal-50 text-teal-700 text-xs font-bold">
                                                    {patient.full_name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                                                    {patient.full_name}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{age} años</TableCell>
                                    <TableCell className="capitalize">
                                        {patient.gender === 'male' ? 'Masculino' : patient.gender === 'female' ? 'Femenino' : 'Otro'}
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {patient.contact_email || <span className="text-slate-400 italic">Sin email</span>}
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {new Date(patient.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                                                <Link href={`/patients/${patient.id}`}>
                                                    <FileText className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => window.location.href = `/patients/${patient.id}`}>
                                                        <ArrowRight className="mr-2 h-4 w-4" /> Ver Expediente
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                        onClick={() => confirmDelete(patient.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar Paciente
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
                                    No se encontraron pacientes.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que deseas eliminar a este paciente? Esta acción no se puede deshacer y se perderán todos los registros clínicos asociados.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
                        <Button variant="destructive" onClick={executeDelete}>Eliminar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
