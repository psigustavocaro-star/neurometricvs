"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, ArrowRight, Plus, Play } from "lucide-react"
import { fetchPatientsList } from "@/app/actions/patients"
import { NewPatientDialog } from "@/components/patients/NewPatientDialog"
import { useTranslations } from "next-intl"

interface Patient {
    id: string
    full_name: string
    birth_date: string | null
    contact_email: string | null
    diagnostico_principal?: string
}

export function StartSessionDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState<Patient[]>([])
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Dashboard')

    const router = useRouter()
    const params = useParams()
    const locale = params.locale as string

    useEffect(() => {
        if (isOpen) {
            fetchPatients()
        }
    }, [isOpen])

    async function fetchPatients() {
        setLoading(true)
        const result = await fetchPatientsList()
        if (result.success && result.data) {
            setPatients(result.data)
        }
        setLoading(false)
    }

    const filteredPatients = patients.filter(p =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.contact_email || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectPatient = (patientId: string) => {
        setIsOpen(false)
        router.push(`/${locale}/patients/${patientId}`)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all rounded-full text-xs font-bold uppercase tracking-wider gap-2">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Iniciar Sesión
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] gap-0 p-0 overflow-hidden bg-card border-border/80 outline-none">
                <div className="p-6 pb-2">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <Play className="w-5 h-5 text-primary fill-current" />
                            Iniciar Sesión Clínica
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Selecciona un paciente para comenzar o registrar una nueva sesión.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Search and New Patient */}
                    <div className="mt-6 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre o email..."
                                className="pl-9 bg-muted/50 border-border/60 focus:bg-background transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <NewPatientDialog
                            trigger={
                                <Button
                                    variant="outline"
                                    className="w-full border-dashed border-border/60 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all justify-start"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                        <Plus className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="font-medium">Registrar Nuevo Paciente</span>
                                </Button>
                            }
                        />
                    </div>
                </div>

                {/* Patient List */}
                <div className="max-h-[350px] overflow-y-auto px-2 pb-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-2" />
                            <span className="text-xs">Cargando pacientes...</span>
                        </div>
                    ) : filteredPatients.length > 0 ? (
                        <div className="p-2 space-y-1">
                            <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider px-3 mb-2">Pacientes Recientes</h4>
                            {filteredPatients.map(patient => (
                                <div
                                    key={patient.id}
                                    onClick={() => handleSelectPatient(patient.id)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 cursor-pointer transition-all group border border-transparent hover:border-border/50"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-transparent group-hover:ring-primary/10 transition-all">
                                        {patient.full_name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                            {patient.full_name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate flex items-center gap-1.5">
                                            {patient.diagnostico_principal || 'Sin diagnóstico'}
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 px-6">
                            <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                                <Search className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-foreground">No se encontraron pacientes</p>
                            <p className="text-xs text-muted-foreground mt-1">Intenta con otro término o registra uno nuevo.</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
