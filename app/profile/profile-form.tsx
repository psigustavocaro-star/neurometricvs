'use client'

import { updateProfile } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'

export function ProfileForm({ profile, subscription, email }: { profile: any, subscription?: any, email?: string }) {
    const [message, setMessage] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        const result = await updateProfile(formData)
        if (result?.error) {
            setMessage(result.error)
        } else {
            setMessage('Perfil actualizado correctamente')
        }
    }

    const renewalDate = subscription?.current_period_end ? new Date(subscription.current_period_end) : null
    const daysRemaining = renewalDate ? Math.ceil((renewalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null

    return (
        <div className="space-y-6 max-w-4xl mx-auto mt-10">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Account Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información de Cuenta</CardTitle>
                        <CardDescription>Tus datos de acceso y membresía.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={email || ''} disabled className="bg-slate-50" />
                        </div>
                        <div className="space-y-2">
                            <Label>Miembro desde</Label>
                            <Input value={new Date(profile?.created_at || Date.now()).toLocaleDateString()} disabled className="bg-slate-50" />
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription */}
                <Card>
                    <CardHeader>
                        <CardTitle>Suscripción</CardTitle>
                        <CardDescription>Gestiona tu plan actual.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 capitalize">{subscription?.plan === 'pro' ? 'Pro Anual' : subscription?.plan === 'clinical' ? 'Clínico' : 'Básico'}</p>
                                    <p className="text-sm text-slate-500">{subscription?.status === 'active' ? 'Activo' : 'Inactivo'}</p>
                                </div>
                                <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${subscription?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                    {subscription?.status === 'active' ? 'Activo' : 'Inactivo'}
                                </div>
                            </div>

                            {/* Mock data for testing if no real subscription exists, or use real data */}
                            {(renewalDate || true) && (
                                <div className="pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Renovación</p>
                                        <p className="text-sm font-semibold text-slate-700">
                                            {renewalDate ? renewalDate.toLocaleDateString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Tiempo Restante</p>
                                        <p className={`text-sm font-semibold ${daysRemaining && daysRemaining < 7 ? 'text-amber-600' : 'text-slate-700'}`}>
                                            {daysRemaining ?? 30} días
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Último Pago</p>
                                        <p className="text-sm font-semibold text-slate-700">
                                            {renewalDate
                                                ? new Date(renewalDate.getTime() - (subscription?.plan === 'pro' ? 365 : 30) * 24 * 60 * 60 * 1000).toLocaleDateString()
                                                : new Date().toLocaleDateString()
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                            <a href="/dashboard/subscription">Gestionar Suscripción</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Professional Profile */}
            <Card>
                <CardHeader>
                    <CardTitle>Perfil Profesional</CardTitle>
                    <CardDescription>
                        Configura tus datos profesionales para los informes.
                    </CardDescription>
                </CardHeader>
                <form action={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nombre Completo</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                defaultValue={profile?.full_name || ''}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="registryNumber">Nº Registro / Colegiatura</Label>
                                <Input
                                    id="registryNumber"
                                    name="registryNumber"
                                    defaultValue={profile?.registry_number || ''}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="specialty">Especialidad</Label>
                                <Input
                                    id="specialty"
                                    name="specialty"
                                    defaultValue={profile?.specialty || ''}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signatureUrl">Firma para Informes</Label>
                            <p className="text-[0.8rem] text-slate-500 mb-2">
                                Ingresa el texto que deseas que aparezca al pie de los informes (ej. post-títulos, cargo, número de registro).
                            </p>
                            <Textarea
                                id="signatureUrl"
                                name="signatureUrl"
                                defaultValue={profile?.signature_url || ''}
                                placeholder="Psicólogo Clínico - Magíster en Neuropsicología&#10;Reg. Colegio: 12345"
                                className="min-h-[80px]"
                            />
                        </div>
                        {message && (
                            <p className={`text-sm ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                                {message}
                            </p>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between mt-6">
                        <Button type="button" variant="ghost" className="text-slate-500">Cancelar</Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700">Guardar Cambios</Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Preferences & Security */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Preferencias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Newsletter</Label>
                                <p className="text-sm text-slate-500">Recibe novedades y tips.</p>
                            </div>
                            <Button variant="outline" size="sm">Suscrito</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Seguridad</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                            Cambiar Contraseña
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
