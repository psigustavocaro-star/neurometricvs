import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PatientHistory } from '@/components/patients/patient-history'

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params

    const { data: patient } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single()

    if (!patient) {
        notFound()
    }

    const { data: testResults } = await supabase
        .from('test_results')
        .select('*')
        .eq('patient_id', id)
        .order('created_at', { ascending: false })

    return (
        <div className="container pt-24 pb-10">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/patients">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Pacientes
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">{patient.full_name}</h1>
                <p className="text-muted-foreground">Ficha Clínica</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Datos Personales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <span className="font-semibold">Email:</span> {patient.contact_email || 'No registrado'}
                        </div>
                        <div>
                            <span className="font-semibold">Fecha de Nacimiento:</span> {patient.birth_date || 'No registrada'}
                        </div>
                        <div>
                            <span className="font-semibold">Género:</span> {patient.gender === 'male' ? 'Masculino' : patient.gender === 'female' ? 'Femenino' : 'Otro'}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Historial de Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PatientHistory results={testResults || []} patientId={patient.id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
