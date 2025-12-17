'use client'

import { createPatient } from '../actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, useEffect } from 'react'
import { useAdminStore } from '@/lib/stores/admin-store'
import { toast } from 'sonner'

export function NewPatientForm() {

    const [error, setError] = useState<string | null>(null)
    const { fillFormTrigger } = useAdminStore()

    // Form State for Mock Injection
    const [name, setName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('other')

    useEffect(() => {
        if (fillFormTrigger > 0) {
            setName("Paciente de Prueba Mock")
            setBirthDate("1990-05-15")
            setEmail("prueba@neurometrics.lat")
            setGender("male")
            toast.info("Datos de prueba inyectados")
        }
    }, [fillFormTrigger])

    async function handleSubmit(formData: FormData) {
        const result = await createPatient(formData)
        if (result?.error) {
            setError(result.error)
        }
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Nuevo Paciente</CardTitle>
                <CardDescription>Ingresa los datos del paciente para crear su ficha.</CardDescription>
            </CardHeader>
            <form action={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre Completo</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            required
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                            <Input
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email (Opcional)</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="juan@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Género</Label>
                        <RadioGroup
                            value={gender}
                            onValueChange={setGender}
                            name="gender"
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Masculino</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Femenino</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <Label htmlFor="other">Otro</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {error && (
                        <p className="text-sm text-red-500 mt-4 font-medium">{error}</p>
                    )}
                </CardContent>
                <CardFooter className="mt-8">
                    <Button type="submit" className="w-full">Crear Paciente</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
