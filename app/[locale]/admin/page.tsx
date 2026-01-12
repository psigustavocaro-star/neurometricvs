'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Database, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { generateCompleteMockData, clearAllMockData } from './actions'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AdminGodModePage() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [isClearing, setIsClearing] = useState(false)
    const [showGenerateDialog, setShowGenerateDialog] = useState(false)
    const [showClearDialog, setShowClearDialog] = useState(false)

    const handleGenerateData = async () => {
        setShowGenerateDialog(false)
        setIsGenerating(true)

        try {
            const result = await generateCompleteMockData()

            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.error || 'Error al generar datos')
            }
        } catch (error) {
            toast.error('Error inesperado al generar datos')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleClearData = async () => {
        setShowClearDialog(false)
        setIsClearing(true)

        try {
            const result = await clearAllMockData()

            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.error || 'Error al eliminar datos')
            }
        } catch (error) {
            toast.error('Error inesperado al eliminar datos')
        } finally {
            setIsClearing(false)
        }
    }

    return (
        <div className="container mx-auto py-24 px-4 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">God Mode</h1>
                <p className="text-slate-600 dark:text-slate-400">Panel de administración para gestión de datos de prueba</p>
            </div>

            <div className="grid gap-6">
                {/* Generate Mock Data Card */}
                <Card className="border-teal-200 bg-gradient-to-br from-white to-teal-50/30">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-teal-100 rounded-lg">
                                <Database className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <CardTitle>Generar Datos de Prueba Completos</CardTitle>
                                <CardDescription>
                                    Crea un conjunto completo de datos realistas para testing
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <h3 className="font-semibold text-sm text-slate-900 mb-3">Se generarán:</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                    <span>5 pacientes con perfiles completos</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                    <span>15-25 sesiones distribuidas entre pacientes</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                    <span>10 resultados de tests (PHQ-9, GAD-7)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                    <span>5 genogramas familiares</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                    <span>5 registros clínicos completos</span>
                                </li>
                            </ul>
                        </div>

                        <Button
                            onClick={() => setShowGenerateDialog(true)}
                            disabled={isGenerating || isClearing}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                            size="lg"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Generando datos...
                                </>
                            ) : (
                                <>
                                    <Database className="mr-2 h-5 w-5" />
                                    Generar Datos de Prueba
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Clear Data Card */}
                <Card className="border-red-200 bg-gradient-to-br from-white to-red-50/30">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Trash2 className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <CardTitle>Limpiar Todos los Datos</CardTitle>
                                <CardDescription>
                                    Elimina todos los pacientes, sesiones y datos relacionados
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-red-200">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-sm text-red-900 mb-1">Advertencia</h3>
                                    <p className="text-sm text-red-700">
                                        Esta acción eliminará permanentemente todos los pacientes, sesiones,
                                        tests, genogramas y registros clínicos de tu cuenta.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => setShowClearDialog(true)}
                            disabled={isGenerating || isClearing}
                            variant="destructive"
                            className="w-full"
                            size="lg"
                        >
                            {isClearing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Eliminando datos...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-5 w-5" />
                                    Limpiar Todos los Datos
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Generate Confirmation Dialog */}
            <AlertDialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Generar datos de prueba?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Se crearán 5 pacientes con sesiones, tests, genogramas y registros clínicos completos.
                            Esto te permitirá probar todas las funcionalidades de la plataforma.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleGenerateData}
                            className="bg-teal-600 hover:bg-teal-700"
                        >
                            Generar Datos
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Clear Confirmation Dialog */}
            <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar todos los datos?</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            <p className="text-red-600 font-semibold">Esta acción no se puede deshacer.</p>
                            <p>
                                Se eliminarán permanentemente todos los pacientes, sesiones, tests,
                                genogramas y registros clínicos de tu cuenta.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleClearData}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Sí, Eliminar Todo
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
