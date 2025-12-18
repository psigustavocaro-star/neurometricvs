'use client'

import { updateProfile } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
    User,
    Briefcase,
    IdCard,
    Phone,
    Mail,
    Calendar,
    Shield,
    Settings,
    PenTool,
    Check,
    Loader2,
    Copy,
    Moon,
    Sun
} from 'lucide-react'

export function ProfileForm({ profile, subscription, user }: { profile: any, subscription?: any, user?: any }) {
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState(profile?.full_name || '')
    const [specialty, setSpecialty] = useState(profile?.specialty || '')
    const [registry, setRegistry] = useState(profile?.registry_number || '')
    const [phone, setPhone] = useState(profile?.phone || '')
    const [signature, setSignature] = useState(profile?.signature_url || '')
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await updateProfile(formData)

        setLoading(false)
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success('Perfil profesional actualizado correctamente')
        }
    }

    const copyId = () => {
        if (user?.id) {
            navigator.clipboard.writeText(user.id)
            toast.success('ID copiado al portapapeles')
        }
    }

    if (!mounted) return null

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Mi Perfil Profesional</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gestiona tu identidad clínica, credenciales y preferencias de cuenta.</p>
                </div>
                <div
                    onClick={copyId}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 w-fit"
                >
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">ID: {user?.id?.substring(0, 12)}...</span>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Column: Visual Identity & Signature */}
                <div className="md:col-span-4 space-y-6">
                    {/* Avatar Card */}
                    <Card className="border shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4 bg-slate-50/50 dark:bg-slate-900/50">
                            <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <User className="w-3.5 h-3.5" />
                                Identidad Visual
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center py-8 px-6">
                            <div className="relative group mb-6">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full opacity-20 blur group-hover:opacity-40 transition-opacity"></div>
                                <div className="relative bg-white dark:bg-slate-950 rounded-full p-2 ring-1 ring-slate-100 dark:ring-slate-800">
                                    <AvatarUpload uid={user?.id} url={profile?.avatar_url} size={150} />
                                </div>
                            </div>
                            <div className="text-center w-full">
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{fullName || 'Nombre Profesional'}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-4">{user?.email}</p>
                                <Separator className="my-4 opacity-50" />
                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-2 uppercase tracking-wider font-semibold">
                                    <span>Rol</span>
                                    <span className="text-teal-600 dark:text-teal-400">Administrador Clínico</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Signature Preview Card */}
                    <Card className="border shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <PenTool className="w-3.5 h-3.5" />
                                Firma Digital
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-6 px-6">
                            <div className="bg-white p-6 border border-slate-200 shadow-inner rounded-xl flex flex-col items-center justify-center min-h-[180px] text-slate-900 relative">
                                <div className="w-32 h-px bg-slate-900/20 absolute top-1/2 -translate-y-8"></div>
                                <div className="font-serif text-center space-y-1 z-10">
                                    <p className="font-bold text-base">{fullName || 'Nombre Profesional'}</p>
                                    <p className="text-[11px] text-slate-600 italic leading-tight">{specialty || 'Especialidad'}</p>
                                    <p className="text-[11px] text-slate-600 leading-tight">Reg: {registry || 'XXXXXX'}</p>
                                    <div className="text-[10px] text-slate-400 mt-2 max-w-[200px] leading-relaxed">
                                        {signature || 'Títulos adicionales...'}
                                    </div>
                                </div>
                                <p className="absolute bottom-2 right-4 text-[9px] font-bold text-slate-300 uppercase tracking-tighter italic">Preview Only</p>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-4 text-center">
                                Esta información aparecerá al pie de tus informes clínicos.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Information Forms */}
                <div className="md:col-span-8 space-y-6">
                    {/* Professional Credentials Card */}
                    <Card className="border shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                            <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-teal-500" />
                                Credenciales Profesionales
                            </CardTitle>
                            <CardDescription>Esta información es fundamental para la validez de tus informes.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Nombre Completo</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="pl-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                                        placeholder="Ej: Gustavo Caro"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="specialty" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Especialidad</Label>
                                <div className="relative">
                                    <IdCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="specialty"
                                        name="specialty"
                                        value={specialty}
                                        onChange={(e) => setSpecialty(e.target.value)}
                                        className="pl-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                                        placeholder="Ej: Neuropsicólogo Clínico"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="registryNumber" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Nº Registro / Licencia</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="registryNumber"
                                        name="registryNumber"
                                        value={registry}
                                        onChange={(e) => setRegistry(e.target.value)}
                                        className="pl-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                                        placeholder="Ej: 12345-6789"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Teléfono de Contacto</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pl-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                                        placeholder="+56 9 ..."
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2 pt-2">
                                <Label htmlFor="signatureUrl" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Credenciales Adicionales (Firma)</Label>
                                <Textarea
                                    id="signatureUrl"
                                    name="signatureUrl"
                                    value={signature}
                                    onChange={(e) => setSignature(e.target.value)}
                                    className="min-h-[100px] dark:bg-slate-950 border-slate-200 dark:border-slate-800 resize-none font-sans"
                                    placeholder="Diplomados, postítulos o cargos académicos adicionales..."
                                />
                                <p className="text-[10px] text-slate-400">Máximo 200 caracteres para asegurar la legibilidad.</p>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-4 flex justify-end">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-teal-600 hover:bg-teal-700 text-white min-w-[140px]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Guardar Perfil
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Preferences & Security Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Security Card */}
                        <Card className="border shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-indigo-500" />
                                    Seguridad
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 group hover:border-indigo-200 dark:hover:border-indigo-900/30 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Contraseña</p>
                                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">Cambiada hace 3 meses</p>
                                        </div>
                                        <Button variant="outline" size="sm" type="button" className="text-xs h-8 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/10">
                                            Actualizar
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 group hover:border-indigo-200 dark:hover:border-indigo-900/30 transition-colors opacity-60">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">2FA</p>
                                            <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">Desactivado</p>
                                        </div>
                                        <div className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-800 relative cursor-not-allowed">
                                            <div className="absolute left-1 top-1 w-2 h-2 rounded-full bg-white shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preferences Card */}
                        <Card className="border shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-amber-500" />
                                    Preferencias
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Modo Visual</p>
                                            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">Cambiar tema del sitio</p>
                                        </div>
                                        <div
                                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${theme === 'dark' ? 'bg-teal-500 justify-end' : 'bg-slate-200 dark:bg-slate-800 justify-start'}`}
                                        >
                                            <div className="w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center">
                                                {theme === 'dark' ? <Moon className="w-2.5 h-2.5 text-teal-600" /> : <Sun className="w-2.5 h-2.5 text-amber-500" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Newsletter</p>
                                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">Novedades y actualizaciones</p>
                                        </div>
                                        <div className="w-10 h-5 rounded-full bg-teal-500 relative cursor-pointer flex items-center justify-end px-1">
                                            <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    )
}
