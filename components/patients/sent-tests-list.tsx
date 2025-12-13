'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Copy, Check, ExternalLink, RefreshCw } from "lucide-react"
import { assignTest } from '@/app/[locale]/tests/remote-actions'
import { useRouter } from "@/i18n/navigation"
import { toast } from "sonner"
import { format } from 'date-fns'

interface TestAssignment {
    id: string
    test_id: string
    status: 'pending' | 'completed'
    created_at: string
    token: string
}

const AVAILABLE_TESTS = [
    { id: 'phq9', name: 'PHQ-9 (Depresión)' },
    { id: 'gad7', name: 'GAD-7 (Ansiedad)' },
    { id: 'bdiii', name: 'BDI-II (Depresión)' },
    { id: 'scl90', name: 'SCL-90-R (Síntomas)' },
]

export function SentTestsList({ assignments, patientId }: { assignments: TestAssignment[], patientId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTest, setSelectedTest] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [copiedToken, setCopiedToken] = useState<string | null>(null)
    const router = useRouter()

    // toast is imported directly

    const handleAssign = async () => {
        if (!selectedTest) return
        setLoading(true)
        try {
            const res = await assignTest(patientId, selectedTest)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Test Asignado", { description: "El link ha sido generado exitosamente." })
                setIsOpen(false)
                setSelectedTest('')
                router.refresh()
            }
        } catch (e) {
            console.error(e)
            toast.error("Error", { description: "Ocurrió un error inesperado" })
        } finally {
            setLoading(false)
        }
    }

    const copyLink = (token: string) => {
        // Construct full URL. Assuming window.location.origin is available in client
        const url = `${window.location.origin}/t/${token}`
        navigator.clipboard.writeText(url)
        setCopiedToken(token)
        toast.success("Link Copiado", { description: "El enlace está en tu portapapeles." })
        setTimeout(() => setCopiedToken(null), 2000)
    }

    const getTestName = (id: string) => AVAILABLE_TESTS.find(t => t.id === id)?.name || id

    return (
        <Card className="mb-6 border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-lg font-bold text-slate-800">Tests Enviados / Remotos</CardTitle>
                    <CardDescription>Gestiona los enlaces para evaluación a distancia.</CardDescription>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Envío
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enviar Test al Paciente</DialogTitle>
                            <DialogDescription>
                                Genera un enlace seguro para que el paciente responda desde su dispositivo.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Select onValueChange={setSelectedTest} value={selectedTest}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un test..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_TESTS.map(test => (
                                        <SelectItem key={test.id} value={test.id}>{test.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
                            <Button onClick={handleAssign} disabled={!selectedTest || loading} className="bg-teal-600 text-white">
                                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Generar Link'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {assignments.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                        No hay tests enviados pendientes.
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Test</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Creado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignments.map((assignment) => (
                                <TableRow key={assignment.id}>
                                    <TableCell className="font-medium">{getTestName(assignment.test_id)}</TableCell>
                                    <TableCell>
                                        <Badge variant={assignment.status === 'completed' ? 'default' : 'outline'} className={assignment.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'text-slate-500 border-slate-300'}>
                                            {assignment.status === 'completed' ? 'Completado' : 'Pendiente'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {format(new Date(assignment.created_at), 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {assignment.status === 'pending' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => copyLink(assignment.token)}
                                                title="Copiar Link"
                                            >
                                                {copiedToken === assignment.token ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-slate-400" />}
                                            </Button>
                                        )}
                                        {assignment.status === 'completed' && (
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                                                <Check className="h-4 w-4 text-green-600" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}
