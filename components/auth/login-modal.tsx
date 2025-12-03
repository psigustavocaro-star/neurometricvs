'use client'

import { useState, useEffect, useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loginAction, signupAction, resendAction } from '@/app/actions/auth'
import { Loader2 } from 'lucide-react'

function SubmitButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
        </Button>
    )
}

export function LoginModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    // Login State
    const [loginState, loginDispatch] = useActionState(loginAction, null)

    // Signup State
    const [signupState, signupDispatch] = useActionState(signupAction, null)

    // Resend State
    const [resendState, resendDispatch] = useActionState(resendAction, null)

    useEffect(() => {
        if (loginState?.success) {
            setOpen(false)
            router.push('/dashboard')
        }
    }, [loginState, router])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm transition-all duration-500"
                overlayClassName="backdrop-blur-md bg-black/40 transition-all duration-500"
            >
                <DialogHeader>
                    <DialogTitle>Bienvenido a Neurometrics</DialogTitle>
                    <DialogDescription>
                        Ingresa a tu cuenta o regístrate para comenzar.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                        <TabsTrigger value="register">Registrarse</TabsTrigger>
                    </TabsList>

                    {/* LOGIN TAB */}
                    <TabsContent value="login">
                        <form action={loginDispatch} className="space-y-4 py-4">
                            {loginState?.error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                                    {loginState.error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input id="email" name="email" type="email" required placeholder="m@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900"
                                    />
                                    <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
                                        Recordar datos
                                    </label>
                                </div>
                                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <SubmitButton>Ingresar</SubmitButton>
                        </form>

                    </TabsContent>

                    {/* REGISTER TAB */}
                    <TabsContent value="register">
                        <form action={signupDispatch} className="space-y-4 py-4">
                            {signupState?.error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                                    {signupState.error}
                                </div>
                            )}
                            {signupState?.message && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm">
                                    {signupState.message}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="register-email">Correo Electrónico</Label>
                                <Input id="register-email" name="email" type="email" required placeholder="m@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-password">Contraseña</Label>
                                <Input id="register-password" name="password" type="password" required />
                            </div>
                            <SubmitButton>Crear Cuenta</SubmitButton>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
