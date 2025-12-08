'use client'

import Link from 'next/link'
import { XCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-slate-200">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Pago Cancelado</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-slate-600">
                        El proceso de pago no se completó.
                        <br />
                        No se ha realizado ningún cargo a tu tarjeta.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center pt-4 gap-3">
                    <Button variant="outline" asChild className="flex-1 h-12">
                        <Link href="/">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Volver al Inicio
                        </Link>
                    </Button>
                    <Button asChild className="flex-1 bg-teal-600 hover:bg-teal-700 h-12">
                        <Link href="/onboarding">
                            Intentar de nuevo
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
