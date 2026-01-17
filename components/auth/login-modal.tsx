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
import { loginAction, signupAction, resendAction } from '@/app/[locale]/actions/auth'
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
                className="sm:max-w-[425px] bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 border dark:border-gray-800/50 shadow-2xl backdrop-blur-xl transition-all duration-500"
                overlayClassName="backdrop-blur-md bg-black/60 transition-all duration-500"
            >
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bienvenido a Neurometrics</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-300 font-medium">
                        Ingresa a tu cuenta o regístrate para comenzar.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full mt-2">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-lg">
                        <TabsTrigger value="login" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm rounded-md transition-all">Iniciar Sesión</TabsTrigger>
                        <TabsTrigger value="register" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm rounded-md transition-all">Registrarse</TabsTrigger>
                    </TabsList>

                    {/* LOGIN TAB */}
                    <TabsContent value="login">
                        <form action={loginDispatch} className="space-y-5 py-4">
                            {loginState?.error && (
                                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                    {loginState.error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="correo@ejemplo.com"
                                    className="h-11 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-teal-500/20 dark:text-gray-100 dark:placeholder:text-gray-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-11 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-teal-500/20 dark:text-gray-100 transition-colors"
                                />
                            </div>

                            <div className="flex items-center justify-between py-1">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 dark:bg-gray-800 transition-colors"
                                    />
                                    <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none font-medium">
                                        Recordar datos
                                    </label>
                                </div>
                                <a href="/forgot-password" className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <SubmitButton>Ingresar</SubmitButton>
                        </form>

                    </TabsContent>

                    {/* REGISTER TAB */}
                    <TabsContent value="register">
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                            <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-full animate-in zoom-in-50 duration-500">
                                <Loader2 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Acceso Beta Cerrado</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[280px] mx-auto">
                                    Estamos en construcción. El registro está temporalmente deshabilitado mientras mejoramos la plataforma.
                                </p>
                            </div>
                            <Button variant="outline" className="w-full mt-4" disabled>
                                Próximamente
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
