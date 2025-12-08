'use client'

import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-teal-100">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                        <CheckCircle className="w-8 h-8 text-teal-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-900">¡Pago Exitoso!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-slate-600">
                        Tu suscripción ha sido activada correctamente.
                        <br />
                        Ya tienes acceso completo a todas las funcionalidades de tu plan.
                    </p>
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 text-sm text-teal-800">
                        Hemos enviado un recibo a tu correo electrónico.
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-4">
                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 h-12 text-base">
                        <Link href="/dashboard">
                            Ir al Panel de Control <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
