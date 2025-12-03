"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { User, Calendar, Mail, ArrowRight, UserCircle2, Trash2, CheckSquare, Square } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

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
    const [selectedPatients, setSelectedPatients] = useState<Set<string>>(new Set())
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [patientToDelete, setPatientToDelete] = useState<string | null>(null)

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedPatients)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedPatients(newSelected)
    }

    const confirmDelete = (id?: string) => {
        if (id) {
            setPatientToDelete(id)
        }
        setIsDeleteDialogOpen(true)
    }

    const executeDelete = () => {
        if (patientToDelete) {
            setPatients(patients.filter(p => p.id !== patientToDelete))
            setPatientToDelete(null)
        } else {
            setPatients(patients.filter(p => !selectedPatients.has(p.id)))
            setSelectedPatients(new Set())
        }
        setIsDeleteDialogOpen(false)
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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Buscar por nombre o email..."
                        className="w-full md:w-96"
                    />
                    {selectedPatients.size > 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => confirmDelete()}
                            className="animate-in fade-in zoom-in duration-200"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar ({selectedPatients.size})
                        </Button>
                    )}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                    {filteredPatients.length} {filteredPatients.length === 1 ? 'paciente' : 'pacientes'}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredPatients.map((patient) => {
                        const birthDate = new Date(patient.birth_date);
                        const today = new Date();
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const m = today.getMonth() - birthDate.getMonth();
                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                            age--;
                        }
                        const isSelected = selectedPatients.has(patient.id)

                        return (
                            <motion.div
                                key={patient.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                layout
                            >
                                <Card
                                    className={cn(
                                        "group hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden relative cursor-pointer",
                                        isSelected ? "ring-2 ring-teal-500 border-teal-500 bg-teal-50/10" : "hover:border-teal-200"
                                    )}
                                    onClick={() => toggleSelection(patient.id)}
                                >
                                    <div className={cn(
                                        "absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-600 transition-opacity",
                                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    )} />

                                    <CardHeader className="flex flex-row items-center gap-4 pb-2 relative">
                                        <div className="absolute top-3 right-3 z-10">
                                            <div className={cn(
                                                "h-5 w-5 rounded border transition-colors flex items-center justify-center",
                                                isSelected
                                                    ? "bg-teal-500 border-teal-500 text-white"
                                                    : "border-slate-300 bg-white text-transparent group-hover:border-teal-400"
                                            )}>
                                                <CheckSquare className="h-3.5 w-3.5" />
                                            </div>
                                        </div>

                                        <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                            <UserCircle2 className="h-7 w-7" />
                                        </div>
                                        <div className="flex-1 min-w-0 pr-6">
                                            <CardTitle className="text-base font-bold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                                                {patient.full_name}
                                            </CardTitle>
                                            <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-1">
                                                <Mail className="h-3 w-3" /> {patient.contact_email || 'Sin email'}
                                            </p>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mt-2 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                                            <div>
                                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">Edad</p>
                                                <p className="font-semibold text-slate-700">{age} años</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">Género</p>
                                                <p className="font-semibold text-slate-700 capitalize">
                                                    {patient.gender === 'male' ? 'Masculino' : patient.gender === 'female' ? 'Femenino' : 'Otro'}
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> Fecha Nacimiento
                                                </p>
                                                <p className="font-semibold text-slate-700">{birthDate.toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex-1 text-teal-600 hover:text-teal-700 hover:bg-teal-50 group/btn justify-between"
                                                asChild
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Link href={`/patients/${patient.id}`}>
                                                    Ver Ficha
                                                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    confirmDelete(patient.id)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>

                {filteredPatients.length === 0 && (
                    <div className="col-span-full text-center py-16">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No se encontraron pacientes</h3>
                        <p className="text-slate-500">Intenta con otro término de búsqueda.</p>
                    </div>
                )}
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                            {patientToDelete
                                ? "¿Estás seguro de que deseas eliminar a este paciente? Esta acción no se puede deshacer."
                                : `¿Estás seguro de que deseas eliminar a los ${selectedPatients.size} pacientes seleccionados? Esta acción no se puede deshacer.`
                            }
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
