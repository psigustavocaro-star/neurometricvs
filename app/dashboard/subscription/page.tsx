import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default async function SubscriptionPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let currentPlan = 'basic'

    if (user) {
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('plan, status')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single()

        if (subscription) {
            currentPlan = subscription.plan
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Suscripción</h1>
                <p className="text-slate-500">Administra tu plan y método de pago.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Basic Plan */}
                <Card className={`${currentPlan === 'basic' ? 'border-blue-500 border-2 relative' : ''}`}>
                    {currentPlan === 'basic' && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">ACTUAL</div>
                    )}
                    <CardHeader>
                        <CardTitle>Plan Básico</CardTitle>
                        <CardDescription>Para uso personal</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$12<span className="text-sm font-normal text-slate-500">/mes</span></div>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Acceso a todos los tests
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> PDFs con firma
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant={currentPlan === 'basic' ? 'outline' : 'default'} disabled={currentPlan === 'basic'} className="w-full">
                            {currentPlan === 'basic' ? 'Plan Actual' : 'Cambiar a Básico'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Clinical Plan */}
                <Card className={`${currentPlan === 'clinical' ? 'border-blue-500 border-2 relative' : ''}`}>
                    {currentPlan === 'clinical' && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">ACTUAL</div>
                    )}
                    <CardHeader>
                        <CardTitle>Plan Clínico</CardTitle>
                        <CardDescription>Para profesionales</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$18<span className="text-sm font-normal text-slate-500">/mes</span></div>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Todo lo del Básico
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Gestión de Pacientes
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Historial clínico
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Envíos automáticos
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant={currentPlan === 'clinical' ? 'outline' : 'default'} disabled={currentPlan === 'clinical'} className="w-full">
                            {currentPlan === 'clinical' ? 'Plan Actual' : 'Cambiar a Clínico'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Anual Plan */}
                <Card className={`${currentPlan === 'pro' ? 'border-blue-500 border-2 relative' : 'border-green-200 bg-green-50/50'}`}>
                    {currentPlan === 'pro' && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">ACTUAL</div>
                    )}
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>Pro Anual</CardTitle>
                                <CardDescription>Ahorro inteligente</CardDescription>
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                65% OFF
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$75<span className="text-sm font-normal text-slate-500">/año</span></div>
                        <ul className="mt-4 space-y-2 mb-4">
                            <li className="flex items-center text-sm text-slate-700">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Paga 4 meses, recibe 12
                            </li>
                            <li className="flex items-center text-sm text-slate-700">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Ahorra 65% vs Plan Clínico
                            </li>
                            <li className="flex items-center text-sm text-slate-700">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Solo $6.25 mensuales
                            </li>
                        </ul>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Todo lo del Clínico
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Facturación anual
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> Soporte VIP
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant={currentPlan === 'pro' ? 'outline' : 'default'}
                            disabled={currentPlan === 'pro'}
                            className={`w-full ${currentPlan !== 'pro' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        >
                            {currentPlan === 'pro' ? 'Plan Actual' : 'Cambiar a Pro Anual'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Método de Pago</CardTitle>
                    <CardDescription>Gestiona tus tarjetas y facturación.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-100 p-2 rounded">
                                <CreditCardIcon className="h-6 w-6 text-slate-600" />
                            </div>
                            <div>
                                <p className="font-medium">Visa terminada en 4242</p>
                                <p className="text-sm text-slate-500">Expira en 12/2025</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function CreditCardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}
