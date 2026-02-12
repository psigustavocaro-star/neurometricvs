'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ShieldAlert, Database, UserCog, Activity, CreditCard, Wand2, Shield, Settings2 } from 'lucide-react'
import { useAdminStore, UserRole, SubscriptionPlan } from '@/lib/stores/admin-store'
import { toast } from 'sonner'
import { createSession } from '@/app/[locale]/patients/clinical-actions'
import { useParams } from 'next/navigation'

interface AdminToolsProps {
    patientId?: string
}

export function AdminTools({ patientId: propPatientId }: AdminToolsProps) {
    const { currentRole, setRole, currentPlan, setPlan, triggerFillForm } = useAdminStore()
    const params = useParams()
    const patientId = propPatientId || (params?.patientId as string)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleAddMockSession = async () => {
        try {
            toast.loading("Generando sesión mock...")
            await createSession(patientId, {
                date: new Date().toISOString(),
                duration: 45,
                type: 'Sesión Mock',
                notes: 'Esta es una sesión generada automáticamente para pruebas. El paciente reporta mejoría leve.'
            })
            toast.dismiss()
            toast.success("Sesión mock creada")
        } catch (e) {
            toast.dismiss()
            toast.error("Error creando mock")
        }
    }

    return (
        <div className="fixed bottom-24 right-4 z-50">
            <Popover modal={false}>
                <PopoverTrigger asChild>
                    <Button
                        size="icon"
                        className="h-12 w-12 rounded-full shadow-2xl bg-slate-900/90 dark:bg-white/90 backdrop-blur-md hover:scale-110 transition-all border border-white/20 dark:border-slate-800/20 group"
                    >
                        <Settings2 className="w-6 h-6 text-white dark:text-slate-900 animate-spin-slow group-hover:rotate-180 transition-transform duration-500" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-4 p-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl" side="top" align="end">
                    <div className="space-y-6">

                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white leading-none">Admin Station</h3>
                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Control de Entorno & Datos</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Wand2 className="w-3.5 h-3.5" />
                                Acciones Rápidas
                            </h4>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    triggerFillForm()
                                    toast.success("Inyectando datos de prueba...")
                                }}
                                className="w-full justify-start bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-700 dark:text-slate-300"
                            >
                                <Wand2 className="w-4 h-4 mr-2 text-indigo-500" />
                                Autocompletar Formulario
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm flex items-center gap-2 text-slate-900 dark:text-white">
                                <CreditCard className="w-4 h-4" />
                                Simular Plan
                            </h4>
                            <Select value={currentPlan} onValueChange={(val) => setPlan(val as SubscriptionPlan)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">Gratuito</SelectItem>
                                    <SelectItem value="basic">Básico</SelectItem>
                                    <SelectItem value="clinical">Clínico</SelectItem>
                                    <SelectItem value="pro">Profesional (Full)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-medium text-sm flex items-center gap-2 text-slate-900 dark:text-white">
                                <UserCog className="w-4 h-4" />
                                Simular Rol
                            </h4>
                            <Select value={currentRole} onValueChange={(val) => setRole(val as UserRole)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="psychologist">Psicólogo (Default)</SelectItem>
                                    <SelectItem value="psychiatrist">Psiquiatra</SelectItem>
                                    <SelectItem value="neurologist">Neurólogo</SelectItem>
                                    <SelectItem value="physician">Médico/a</SelectItem>
                                    <SelectItem value="occupational_therapist">Terapeuta Ocupacional</SelectItem>
                                    <SelectItem value="speech_therapist">Fonoaudiólogo/a</SelectItem>
                                    <SelectItem value="nutritionist">Nutricionista</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {patientId && (
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm flex items-center gap-2 text-slate-900 dark:text-white">
                                    <Database className="w-4 h-4" />
                                    Mock Data (Paciente Actual)
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <Button variant="outline" size="sm" onClick={handleAddMockSession} className="justify-start">
                                        <Activity className="w-3 h-3 mr-2" />
                                        + Sesión Reciente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
