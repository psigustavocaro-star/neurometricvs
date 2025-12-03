import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Activity, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user?.id)
        .single()

    // Fetch summary data (mocked or real)
    const { count: patientCount } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', user?.id)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Panel de Control</h1>
                    <p className="text-slate-500">Bienvenido de nuevo, gestiona tu práctica desde aquí.</p>
                </div>
                <div className="flex gap-3">
                    {/* Button removed as per requirements */}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{patientCount || 0}</div>
                        <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tests Realizados</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">0 esta semana</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Plan Actual</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold capitalize">
                            {subscription?.plan === 'pro' ? 'Anual' :
                                subscription?.plan === 'clinical' ? 'Clínico' :
                                    'Básico'}
                        </div>
                        {subscription?.plan === 'basic' && (
                            <Link href="/dashboard/subscription" className="text-xs text-blue-600 hover:underline flex items-center mt-1">
                                Mejorar Plan <ArrowUpRight className="h-3 w-3 ml-1" />
                            </Link>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Mis tests favoritos</CardTitle>
                        <Button variant="ghost" size="sm" asChild className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                            <Link href="/dashboard/my-tests">Ver todos</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {['PHQ-9 (Depresión)', 'GAD-7 (Ansiedad)', 'BDI-II (Depresión)', 'MOCA (Cognitivo)'].map((test, i) => (
                                <div key={i} className="flex items-center p-4 border rounded-lg bg-slate-50">
                                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold mr-3">
                                        {test.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{test.split(' (')[0]}</p>
                                        <p className="text-xs text-slate-500">{test.split(' (')[1].replace(')', '')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-slate-500 text-center py-10">
                            No hay actividad reciente para mostrar.
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Accesos Rápidos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <Link href="/profile">Editar Firma Digital</Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <Link href="/tests/phq-9">Ver Test PHQ-9</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
