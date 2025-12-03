"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, ArrowRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Patient {
    id: string
    full_name: string
    birth_date: string
    contact_email?: string
}

interface PatientSelectorDialogProps {
    testId: string
    testName: string
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function PatientSelectorDialog({ testId, testName, trigger, open: controlledOpen, onOpenChange: setControlledOpen }: PatientSelectorDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState<Patient[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : isOpen
    const setOpen = (value: boolean) => {
        if (isControlled && setControlledOpen) {
            setControlledOpen(value)
        } else {
            setIsOpen(value)
        }
    }

    useEffect(() => {
        if (open) {
            fetchPatients()
        }
    }, [open])

    async function fetchPatients() {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { data } = await supabase
                .from('patients')
                .select('id, full_name, birth_date, contact_email')
                .eq('profile_id', user.id)
                .order('created_at', { ascending: false })

            if (data) {
                setPatients(data)
            }
        }
        setLoading(false)
    }

    const filteredPatients = patients.filter(p =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.contact_email || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectPatient = (patientId: string) => {
        router.push(`/tests/${testId}?patientId=${patientId}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            {!trigger && !isControlled && (
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 transition-all hover:scale-[1.02]" onClick={() => setOpen(true)}>
                    Comenzar Test
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Seleccionar Paciente</DialogTitle>
                    <DialogDescription>
                        ¿A quién se aplicará el test <strong>{testName}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Buscar paciente..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                        {loading ? (
                            <div className="text-center py-8 text-slate-500">Cargando pacientes...</div>
                        ) : filteredPatients.length > 0 ? (
                            filteredPatients.map(patient => (
                                <div
                                    key={patient.id}
                                    onClick={() => handleSelectPatient(patient.id)}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50 cursor-pointer transition-all group"
                                >
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900 group-hover:text-teal-700">{patient.full_name}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date().getFullYear() - new Date(patient.birth_date).getFullYear()} años • {patient.contact_email || 'Sin email'}
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-slate-500 mb-2">No se encontraron pacientes.</p>
                                <Button variant="outline" size="sm" onClick={() => router.push('/patients/new')}>
                                    <Plus className="mr-2 h-4 w-4" /> Crear Nuevo Paciente
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
