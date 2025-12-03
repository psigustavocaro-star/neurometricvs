import { login, signup, resendConfirmation } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string, error: string }>
}) {
    const searchParams = await props.searchParams
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Ingresar a Neurometrics</CardTitle>
                    <CardDescription>
                        Ingresa tu correo y contraseña para acceder a tu cuenta.
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        {searchParams?.error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{searchParams.error}</span>
                            </div>
                        )}
                        {searchParams?.message && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{searchParams.message}</span>
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
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button formAction={login} className="w-full">Iniciar Sesión</Button>
                        <Button formAction={signup} variant="outline" className="w-full">Registrarse</Button>
                        <Button formAction={resendConfirmation} variant="ghost" className="w-full text-xs text-slate-500 hover:text-slate-900">
                            ¿No recibiste el correo? Reenviar confirmación
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
