"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Brain, Clock, Users, FileText, Sparkles, User, Search, Maximize2, Minimize2, ChevronDown, ChevronRight, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Test {
    id: string
    name: string
    category: string
    age: string
    duration: string
    description: string
    color: string
    questions?: number
    tags?: string[]
}

const testsByCategory = {
    "Depresión": [
        {
            id: 'phq9',
            name: 'PHQ-9',
            category: 'Depresión',
            age: '12+ años',
            duration: '5 min',
            description: 'Cuestionario de Salud del Paciente para evaluar severidad de depresión',
            color: 'from-rose-500 to-rose-600',
            questions: 9,
            tags: ['depresión', 'screening', 'adultos']
        },
        {
            id: 'beck',
            name: 'Beck Depression Inventory',
            category: 'Depresión',
            age: '13+ años',
            duration: '10 min',
            description: 'Inventario de Depresión de Beck para medir intensidad de síntomas depresivos',
            color: 'from-rose-500 to-rose-600',
            questions: 21,
            tags: ['depresión', 'evaluación', 'adolescentes', 'adultos']
        },
    ],
    "Ansiedad": [
        {
            id: 'gad7',
            name: 'GAD-7',
            category: 'Ansiedad',
            age: '12+ años',
            duration: '5 min',
            description: 'Escala de Ansiedad Generalizada para detectar trastornos de ansiedad',
            color: 'from-amber-500 to-amber-600',
            questions: 7,
            tags: ['ansiedad', 'screening', 'adultos']
        },
    ],
    "Cognitivo": [
        {
            id: 'mmse',
            name: 'MMSE',
            category: 'Cognitivo',
            age: '18+ años',
            duration: '10 min',
            description: 'Mini-Mental State Examination para evaluación cognitiva general',
            color: 'from-blue-500 to-blue-600',
            questions: 30,
            tags: ['cognitivo', 'demencia', 'adultos mayores']
        },
    ],
    "Inteligencia": [
        {
            id: 'wais',
            name: 'WAIS-IV',
            category: 'Inteligencia',
            age: '16-90 años',
            duration: '60-90 min',
            description: 'Escala Wechsler de Inteligencia para Adultos, evaluación completa de CI',
            color: 'from-purple-500 to-purple-600',
            questions: 15,
            tags: ['inteligencia', 'CI', 'wechsler', 'adultos']
        },
        {
            id: 'wisc',
            name: 'WISC-V',
            category: 'Inteligencia',
            age: '6-16 años',
            duration: '60-90 min',
            description: 'Escala Wechsler de Inteligencia para Niños, evaluación cognitiva infantil',
            color: 'from-indigo-500 to-indigo-600',
            questions: 16,
            tags: ['inteligencia', 'CI', 'wechsler', 'niños']
        },
    ],
    "Atención": [
        {
            id: 'stroop',
            name: 'Stroop Test',
            category: 'Atención',
            age: '7+ años',
            duration: '15 min',
            description: 'Test de Stroop para evaluar atención selectiva e inhibición cognitiva',
            color: 'from-emerald-500 to-emerald-600',
            questions: 100,
            tags: ['atención', 'inhibición', 'niños', 'adultos']
        },
    ],
    "Funciones Ejecutivas": [
        {
            id: 'trail',
            name: 'Trail Making Test',
            category: 'Funciones Ejecutivas',
            age: '8+ años',
            duration: '10 min',
            description: 'Test de rastreo para evaluar funciones ejecutivas y flexibilidad cognitiva',
            color: 'from-cyan-500 to-cyan-600',
            questions: 2,
            tags: ['ejecutivo', 'flexibilidad', 'adultos']
        },
    ],
}

export function DashboardTestCatalog() {
    const [selectedTest, setSelectedTest] = useState<Test | null>(null)
    const [showTestModal, setShowTestModal] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedCategories, setExpandedCategories] = useState<string[]>(Object.keys(testsByCategory))

    // Calculate total tests
    const totalTests = Object.values(testsByCategory).reduce((acc, tests) => acc + tests.length, 0)

    const handleStartTest = (test: Test) => {
        setSelectedTest(test)
        setShowTestModal(true)
    }

    const handleTestTypeSelection = (type: 'ephemeral' | 'patient') => {
        setShowTestModal(false)
        // TODO: Navigate to test with selected type
        console.log(`Starting ${selectedTest?.name} as ${type} test`)
    }

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    // Filter tests based on search
    const getFilteredTests = () => {
        if (!searchTerm) return testsByCategory

        const filtered: typeof testsByCategory = {}
        Object.entries(testsByCategory).forEach(([category, tests]) => {
            const matchingTests = tests.filter(test =>
                test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            if (matchingTests.length > 0) {
                filtered[category] = matchingTests
            }
        })
        return filtered
    }

    const filteredTests = getFilteredTests()
    const filteredCount = Object.values(filteredTests).reduce((acc, tests) => acc + tests.length, 0)

    const CatalogContent = () => (
        <div className="space-y-4">
            {/* Search and Stats Bar */}
            <div className="flex items-center gap-4 sticky top-0 bg-white z-10 pb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Buscar por nombre, temática o etiqueta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-slate-200 focus:border-teal-400 focus:ring-teal-400"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700 font-semibold px-3 py-1.5">
                        <Brain className="w-3.5 h-3.5 mr-1.5" />
                        {filteredCount} de {totalTests} tests
                    </Badge>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="border-slate-200"
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
                {Object.entries(filteredTests).map(([category, tests]) => {
                    const isExpanded = expandedCategories.includes(category)

                    return (
                        <div key={category} className="border border-slate-200 rounded-lg overflow-hidden">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white hover:from-teal-50 hover:to-white transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {isExpanded ? <ChevronDown className="w-5 h-5 text-teal-600" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                                    <h3 className="font-bold text-slate-900">{category}</h3>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                                        {tests.length}
                                    </Badge>
                                </div>
                            </button>

                            {/* Tests in Category */}
                            {isExpanded && (
                                <div className="divide-y divide-slate-100 bg-white">
                                    {tests.map((test) => (
                                        <div key={test.id} className="p-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-start gap-4">
                                                {/* Test Icon */}
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${test.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                                    <span className="text-white font-bold text-sm">
                                                        {test.name.substring(0, 2)}
                                                    </span>
                                                </div>

                                                {/* Test Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <div>
                                                            <h4 className="text-sm font-bold text-slate-900">
                                                                {test.name}
                                                            </h4>
                                                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                                                                {test.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Badges */}
                                                    <div className="flex items-center gap-2 flex-wrap mb-3">
                                                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                                                            <FileText className="w-3 h-3" />
                                                            {test.category}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                                            <Users className="w-3 h-3" />
                                                            {test.age}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                                                            <Clock className="w-3 h-3" />
                                                            {test.duration}
                                                        </span>
                                                        {test.questions && (
                                                            <span className="text-xs text-slate-500">
                                                                {test.questions} preguntas
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Tags */}
                                                    {test.tags && test.tags.length > 0 && (
                                                        <div className="flex items-center gap-1.5 flex-wrap mb-3">
                                                            {test.tags.map((tag, idx) => (
                                                                <span key={idx} className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Action Button */}
                                                    <Button
                                                        size="sm"
                                                        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md"
                                                        onClick={() => handleStartTest(test)}
                                                    >
                                                        <Brain className="w-4 h-4 mr-2" />
                                                        Iniciar Evaluación
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}

                {Object.keys(filteredTests).length === 0 && (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-600 font-medium mb-2">No se encontraron tests</p>
                        <p className="text-sm text-slate-500">Intenta con otros términos de búsqueda</p>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <>
            {isFullscreen ? (
                <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                    <DialogContent className="max-w-6xl h-[90vh] overflow-hidden flex flex-col p-0">
                        <DialogHeader className="p-6 pb-4 border-b border-slate-200">
                            <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                                    <Brain className="w-5 h-5 text-white" />
                                </div>
                                Catálogo Completo de Evaluaciones
                            </DialogTitle>
                            <DialogDescription>
                                Explora nuestra biblioteca completa de tests psicológicos y neuropsicológicos
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto p-6">
                            <CatalogContent />
                        </div>
                    </DialogContent>
                </Dialog>
            ) : (
                <CatalogContent />
            )}

            {/* Test Type Selection Modal */}
            <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900">
                            ¿Cómo deseas realizar esta evaluación?
                        </DialogTitle>
                        <DialogDescription className="text-slate-600">
                            Selecciona si quieres hacer un test efímero o asociarlo a un paciente para seguimiento
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Ephemeral Test Option */}
                        <Card
                            className="border-2 border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group"
                            onClick={() => handleTestTypeSelection('ephemeral')}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                                            Test Efímero
                                        </h3>
                                        <p className="text-sm text-slate-600 mb-2">
                                            Realiza una evaluación rápida sin asociarla a un paciente específico
                                        </p>
                                        <ul className="text-xs text-slate-500 space-y-1">
                                            <li>• No se guarda en el historial del paciente</li>
                                            <li>• Ideal para demostraciones o pruebas</li>
                                            <li>• Resultados disponibles temporalmente</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Patient-Associated Test Option */}
                        <Card
                            className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group"
                            onClick={() => handleTestTypeSelection('patient')}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg flex-shrink-0">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                                                Asociar a Paciente
                                            </h3>
                                            <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                                                RECOMENDADO
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-2">
                                            Vincula la evaluación al expediente de un paciente para seguimiento
                                        </p>
                                        <ul className="text-xs text-slate-500 space-y-1">
                                            <li>• Se guarda en el historial del paciente</li>
                                            <li>• Permite generar informes de progreso automáticos</li>
                                            <li>• Comparación con evaluaciones anteriores</li>
                                            <li>• Seguimiento longitudinal completo</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-xs text-center text-slate-500 mt-2">
                        <Brain className="w-4 h-4 inline mr-1" />
                        La IA generará informes automáticos basados en tests asociados a pacientes
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
