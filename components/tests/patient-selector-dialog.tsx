"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, ArrowRight, Plus, Link as LinkIcon, Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchPatientsList } from "@/app/actions/patients"
import { generateInvitationLink } from "@/app/actions/invitations"
import { toast } from "sonner"
import { NewPatientDialog } from "@/components/patients/NewPatientDialog"

interface Patient {
    id: string
    full_name: string
    birth_date: string | null
    contact_email: string | null
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
    const [inviteLink, setInviteLink] = useState<string | null>(null)
    const [copying, setCopying] = useState(false)

    const router = useRouter()
    const params = useParams()
    const locale = params.locale as string

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : isOpen
    const setOpen = (value: boolean) => {
        if (!value) setInviteLink(null) // Reset state on close
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
        // Incluir el locale actual en la redirección
        router.push(`/${locale}/tests/${testId}?patientId=${patientId}`)
    }

    const handleGenerateLink = async (e: React.MouseEvent, patientId: string) => {
        e.stopPropagation()
        const result = await generateInvitationLink(patientId, testId)
        if (result.success && result.link) {
            setInviteLink(result.link)
            toast.success("Link generado correctamente")
        } else {
            toast.error("Error al generar el link")
        }
    }

    const copyLink = () => {
        if (inviteLink) {
            navigator.clipboard.writeText(inviteLink)
            setCopying(true)
            toast.success("Link copiado al portapapeles")
            setTimeout(() => setCopying(false), 2000)
        }
    }

    if (inviteLink) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Link de Invitación Generado</DialogTitle>
                        <DialogDescription>
                            Comparte este link con el paciente para que realice el test remotamente.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                        <div className="flex items-center gap-2 p-3 bg-white border rounded text-sm text-slate-600 font-mono break-all">
                            {inviteLink}
                        </div>
                        <Button onClick={copyLink} className="w-full gap-2">
                            {copying ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copying ? "Copiado" : "Copiar Link"}
                        </Button>
                        <Button variant="ghost" onClick={() => setInviteLink(null)} className="w-full">
                            Volver
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
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
                    {/* Botón de nuevo paciente siempre visible */}
                    <NewPatientDialog
                        trigger={
                            <Button
                                variant="outline"
                                className="w-full border-dashed border-2 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all font-medium"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Añadir Nuevo Paciente
                            </Button>
                        }
                    />

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
                                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50 cursor-pointer transition-all group relative"
                                >
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900 group-hover:text-teal-700">{patient.full_name}</p>
                                        <p className="text-xs text-slate-500">
                                            {patient.birth_date ? (new Date().getFullYear() - new Date(patient.birth_date).getFullYear()) : '?'} años • {patient.contact_email || 'Sin email'}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-teal-600 hover:bg-teal-100"
                                            onClick={(e) => handleGenerateLink(e, patient.id)}
                                            title="Enviar Link Remoto"
                                        >
                                            <LinkIcon className="h-4 w-4" />
                                        </Button>
                                        <div className="h-8 w-8 flex items-center justify-center">
                                            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-slate-500">No se encontraron pacientes con ese nombre.</p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
