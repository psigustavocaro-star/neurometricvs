import { createClient } from '@/lib/supabase/server'
import { redirect } from '@/i18n/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { Separator } from "@/components/ui/separator"

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch Profile Data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const fullName = profile?.full_name || user.user_metadata?.full_name || ''
    const email = user.email || ''
    const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || null

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="container max-w-5xl pt-24 pb-12">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Mi Perfil Profesional</h1>
                        <p className="text-slate-500 dark:text-slate-400">Gestiona tu identidad clínica, credenciales y preferencias de cuenta.</p>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-600">ID: {user.id.substring(0, 8)}...</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Left Column (Avatar & Primary Info) */}
                    <div className="md:col-span-4 space-y-6">
                        {/* Avatar Card */}
                        <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4 bg-slate-50/50 dark:bg-slate-900/50">
                                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide">Identidad Visual</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center py-8 px-6">
                                <div className="relative group mb-6">
                                    <div className="absolute -inset-1 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-full opacity-50 blur"></div>
                                    <div className="relative bg-white dark:bg-slate-950 rounded-full p-2 ring-1 ring-slate-100 dark:ring-slate-800">
                                        <AvatarUpload uid={user.id} url={avatarUrl} size={150} />
                                    </div>
                                </div>
                                <div className="text-center w-full">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{fullName}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{email}</p>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
                                        <span>Rol</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">Administrador Clínico</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Signature Preview Card */}
                        <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide">Firma Digital</CardTitle>
                                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                                    Aparecerá en reportes y recetas.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="py-6 px-6">
                                <div className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/50 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer group relative overflow-hidden">
                                    {/* Placeholder for Signature Image */}
                                    <div className="absolute inset-x-8 top-1/2 h-px bg-slate-300 dark:bg-slate-700 transform -translate-y-1/2 opacity-20"></div>
                                    <span className="font-handwriting text-2xl text-slate-600 dark:text-slate-300 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                                        {profile?.full_name ? profile.full_name.split(' ')[0] : 'Tu Firma'}
                                    </span>
                                    <p className="text-[10px] uppercase font-bold tracking-widest mt-2 opacity-50">Vista Previa</p>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button className="text-xs font-medium text-slate-900 dark:text-white underline decoration-slate-300 dark:decoration-slate-700 hover:decoration-slate-900 dark:hover:decoration-white underline-offset-4 transition-all">
                                        Actualizar Firma
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column (Forms & Details) */}
                    <div className="md:col-span-8 space-y-6">

                        {/* Professional Information */}
                        <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide">Credenciales Profesionales</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Nombre Completo</Label>
                                    <Input defaultValue={fullName} readOnly className="bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Especialidad</Label>
                                    <Input placeholder="Ej: Neuropsicólogo Clínico" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Registro / Licencia</Label>
                                    <Input placeholder="Ej: 12345-6789" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Teléfono de Contacto</Label>
                                    <Input placeholder="+56 9 ..." className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Settings (Collapsed style) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200">Seguridad</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Contraseña</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Último cambio hace 3 meses</p>
                                        </div>
                                        <button className="text-xs font-bold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            Cambiar
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">2FA</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Autenticación de dos pasos</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Desactivado</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-200">Preferencias</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3">
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Notificaciones por Email</span>
                                        <div className="w-9 h-5 rounded-full bg-slate-200 dark:bg-slate-700 relative cursor-pointer">
                                            <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white shadow-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3">
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Tema Oscuro</span>
                                        <div className="w-9 h-5 rounded-full bg-slate-900 dark:bg-teal-500 relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white shadow-sm"></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

