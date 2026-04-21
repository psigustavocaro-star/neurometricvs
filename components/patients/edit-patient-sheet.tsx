import { 
    Pencil, 
    Loader2, 
    User, 
    Calendar, 
    Mail, 
    Phone, 
    MapPin, 
    IdCard, 
    Activity, 
    Stethoscope, 
    Pill, 
    Users, 
    Heart, 
    Building2, 
    GraduationCap, 
    Briefcase,
    School,
    GraduationCap as GradeIcon,
    Dna
} from "lucide-react"
import { toast } from "sonner"
import { updatePatient } from "@/app/[locale]/patients/actions"
import { useTranslations } from 'next-intl'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface EditPatientSheetProps {
    patient: {
        id: string
        full_name: string
        birth_date: string | null
        gender: string
        contact_email?: string | null
        rut?: string | null
        phone?: string | null
        address?: string | null
        clinic?: string | null
        education?: string | null
        occupation?: string | null
        companion?: string | null
        emergency_contact?: string | null
        diagnosis?: string | null
        medications?: string | null
        school?: string | null
        grade?: string | null
        physical_status?: string | null
        reason_for_consultation?: string | null
        family_history?: string | null
    }
    trigger?: React.ReactNode
}

function FormSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">{title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-1">
                {children}
            </div>
        </div>
    )
}

function FormField({ id, label, icon: Icon, type = "text", placeholder, name, defaultValue, children }: any) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-wide px-0.5">
                <Icon className="w-3 h-3 text-teal-600 dark:text-cyan-500" />
                {label}
            </Label>
            {children ? children : (
                <Input
                    id={id}
                    name={name || id}
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue || ''}
                    className="h-9 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500"
                />
            )}
        </div>
    )
}

export function EditPatientSheet({ patient, trigger }: EditPatientSheetProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const result = await updatePatient(patient.id, formData)

        setIsLoading(false)

        if (result?.error) {
            toast.error('Error al actualizar paciente')
        } else {
            toast.success('Paciente actualizado exitosamente')
            setOpen(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger ? trigger : (
                    <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-medium">Editar Ficha</span>
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col h-full bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl">
                <SheetHeader className="p-8 pb-6 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />
                    <SheetTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <User className="w-6 h-6 text-teal-600" />
                        Editar Ficha Clínica
                    </SheetTitle>
                    <SheetDescription className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                        Actualizando el historial de <span className="text-teal-600 dark:text-cyan-400 font-bold">{patient.full_name}</span>
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    <form onSubmit={handleSubmit} id="edit-patient-form">
                        <div className="p-8 pt-2 space-y-2">
                            {/* SECCIÓN 1: Identificación */}
                            <FormSection title="Identificación y Contacto">
                                <div className="md:col-span-2">
                                    <FormField id="fullName" name="fullName" label="Nombre Completo" icon={User} defaultValue={patient.full_name} />
                                </div>
                                <FormField id="rut" name="rut" label="RUT / ID" icon={IdCard} defaultValue={patient.rut || ''} />
                                <FormField id="email" name="email" label="Correo Electrónico" icon={Mail} defaultValue={patient.contact_email || ''} type="email" />
                                <FormField id="phone" name="phone" label="Teléfono de contacto" icon={Phone} defaultValue={patient.phone || ''} />
                                <FormField id="address" name="address" label="Dirección / Domicilio" icon={MapPin} defaultValue={patient.address || ''} />
                            </FormSection>

                            {/* SECCIÓN 2: Datos Demográficos */}
                            <FormSection title="Datos Personales">
                                <FormField id="birthDate" name="birthDate" label="Fecha Nacimiento" icon={Calendar} defaultValue={patient.birth_date} type="date" />
                                <FormField id="gender" name="gender" label="Género" icon={Users}>
                                    <select
                                        id="gender"
                                        name="gender"
                                        defaultValue={patient.gender}
                                        className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </FormField>
                                <FormField id="education" name="education" label="Escolaridad / Nivel" icon={GraduationCap} defaultValue={patient.education || ''} />
                                <FormField id="occupation" name="occupation" label="Profesión / Oficio" icon={Briefcase} defaultValue={patient.occupation || ''} />
                                <FormField id="clinic" name="clinic" label="Sede / Centro de Atención" icon={Building2} defaultValue={patient.clinic || ''} />
                                <FormField id="emergencyContact" name="emergencyContact" label="Contacto Emergencia" icon={Heart} defaultValue={patient.emergency_contact || ''} />
                            </FormSection>

                            {/* SECCIÓN 3: Antecedentes Clínicos */}
                            <FormSection title="Historial Clínico">
                                <div className="md:col-span-2 space-y-4">
                                    <FormField id="diagnosis" name="diagnosis" label="Diagnóstico Principal (DSM-5 / CIE-11)" icon={Stethoscope}>
                                        <Textarea
                                            name="diagnosis"
                                            defaultValue={patient.diagnosis || ''}
                                            placeholder="Ej: F32.1 Trastorno Depresivo Mayor..."
                                            className="min-h-[80px] text-sm resize-none"
                                        />
                                    </FormField>

                                    <FormField id="medications" name="medications" label="Medicamentos actuales" icon={Pill}>
                                        <Textarea
                                            name="medications"
                                            defaultValue={patient.medications || ''}
                                            placeholder="Listado de fármacos y dosis..."
                                            className="min-h-[80px] text-sm resize-none"
                                        />
                                    </FormField>

                                    <FormField id="reason_for_consultation" name="reason_for_consultation" label="Motivo de Consulta" icon={Activity}>
                                        <Textarea
                                            name="reason_for_consultation"
                                            defaultValue={patient.reason_for_consultation || ''}
                                            className="min-h-[100px] text-sm resize-none"
                                        />
                                    </FormField>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField id="physical_status" name="physical_status" label="Estado Físico / Salud" icon={Activity} defaultValue={patient.physical_status || ''} />
                                        <FormField id="family_history" name="family_history" label="Antecedentes Familiares" icon={Dna} defaultValue={patient.family_history || ''} />
                                    </div>
                                </div>
                            </FormSection>

                            {/* SECCIÓN 4: Ámbito Académico (Solo si aplica) */}
                            <FormSection title="Datos Académicos (Infanto-Juvenil)">
                                <FormField id="school" name="school" label="Colegio / Institución" icon={School} defaultValue={patient.school || ''} />
                                <FormField id="grade" name="grade" label="Curso / Nivel" icon={GradeIcon} defaultValue={patient.grade || ''} />
                            </FormSection>
                        </div>
                    </form>
                </ScrollArea>

                <SheetFooter className="p-8 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
                    <div className="flex w-full gap-3">
                        <SheetClose asChild>
                            <Button type="button" variant="ghost" className="flex-1 font-bold text-slate-500 h-11 rounded-xl">Cancelar</Button>
                        </SheetClose>
                        <Button
                            type="submit"
                            form="edit-patient-form"
                            disabled={isLoading}
                            className="flex-[2] h-11 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-teal-500/20 rounded-xl"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Pencil className="w-4 h-4 mr-2" />
                            )}
                            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
