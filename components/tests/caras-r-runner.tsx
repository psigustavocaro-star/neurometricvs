"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Clock,
    Play,
    CheckCircle,
    XCircle,
    AlertTriangle,
    BarChart3,
    Brain,
    Target
} from "lucide-react"
import {
    baremosEspana,
    baremosArgentina,
    getGradoFromEdad,
    getPercentil,
    getEneatipo,
    calcularICI,
    interpretarRendimiento
} from "@/lib/tests/caras-r"

// Generar los 60 estímulos del test (tríos de caras)
// Cada cara tiene: pelo (0-3), ojos (0-2), boca (0-2), cejas (0-1)
interface FaceFeatures {
    pelo: number      // 0: calvo, 1: raya, 2: puntas, 3: rizado
    ojos: number      // 0: redondos, 1: cerrados, 2: sorprendidos
    boca: number      // 0: sonrisa, 1: triste, 2: neutral
    cejas: number     // 0: normales, 1: arqueadas
}

function generateFace(): FaceFeatures {
    return {
        pelo: Math.floor(Math.random() * 4),
        ojos: Math.floor(Math.random() * 3),
        boca: Math.floor(Math.random() * 3),
        cejas: Math.floor(Math.random() * 2)
    }
}

function cloneFace(face: FaceFeatures): FaceFeatures {
    return { ...face }
}

function mutateFace(face: FaceFeatures): FaceFeatures {
    const newFace = cloneFace(face)
    const feature = Math.floor(Math.random() * 4)
    switch (feature) {
        case 0:
            newFace.pelo = (face.pelo + 1 + Math.floor(Math.random() * 3)) % 4
            break
        case 1:
            newFace.ojos = (face.ojos + 1 + Math.floor(Math.random() * 2)) % 3
            break
        case 2:
            newFace.boca = (face.boca + 1 + Math.floor(Math.random() * 2)) % 3
            break
        case 3:
            newFace.cejas = face.cejas === 0 ? 1 : 0
            break
    }
    return newFace
}

interface FaceTrioItem {
    id: number
    faces: FaceFeatures[]
    correctIndex: number // 0, 1, o 2 - cuál es la cara diferente
}

function generateTestItems(count: number): FaceTrioItem[] {
    const items: FaceTrioItem[] = []
    for (let i = 0; i < count; i++) {
        const baseFace = generateFace()
        const differentFace = mutateFace(baseFace)
        const correctIndex = Math.floor(Math.random() * 3)

        const faces: FaceFeatures[] = []
        for (let j = 0; j < 3; j++) {
            if (j === correctIndex) {
                faces.push(differentFace)
            } else {
                faces.push(cloneFace(baseFace))
            }
        }

        items.push({
            id: i + 1,
            faces,
            correctIndex
        })
    }
    return items
}

// Componente SVG para dibujar una cara
function FaceSVG({ features, size = 60 }: { features: FaceFeatures, size?: number }) {
    const scale = size / 60

    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            {/* Contorno de la cara */}
            <circle cx="30" cy="32" r="25" fill="none" stroke="currentColor" strokeWidth="2" />

            {/* Pelo */}
            {features.pelo === 0 && null /* Calvo */}
            {features.pelo === 1 && (
                // Raya al medio
                <path d="M 15 15 Q 30 5 45 15" fill="none" stroke="currentColor" strokeWidth="2" />
            )}
            {features.pelo === 2 && (
                // Puntas hacia arriba
                <>
                    <line x1="20" y1="12" x2="18" y2="5" stroke="currentColor" strokeWidth="2" />
                    <line x1="30" y1="8" x2="30" y2="1" stroke="currentColor" strokeWidth="2" />
                    <line x1="40" y1="12" x2="42" y2="5" stroke="currentColor" strokeWidth="2" />
                </>
            )}
            {features.pelo === 3 && (
                // Rizado
                <path d="M 12 18 Q 15 8 22 12 Q 28 5 35 10 Q 42 5 48 12" fill="none" stroke="currentColor" strokeWidth="2" />
            )}

            {/* Cejas */}
            {features.cejas === 0 ? (
                // Normales
                <>
                    <line x1="18" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="2" />
                    <line x1="34" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" />
                </>
            ) : (
                // Arqueadas
                <>
                    <path d="M 18 26 Q 22 21 26 26" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M 34 26 Q 38 21 42 26" fill="none" stroke="currentColor" strokeWidth="2" />
                </>
            )}

            {/* Ojos */}
            {features.ojos === 0 && (
                // Redondos
                <>
                    <circle cx="22" cy="30" r="4" fill="currentColor" />
                    <circle cx="38" cy="30" r="4" fill="currentColor" />
                </>
            )}
            {features.ojos === 1 && (
                // Cerrados (líneas)
                <>
                    <line x1="18" y1="30" x2="26" y2="30" stroke="currentColor" strokeWidth="2" />
                    <line x1="34" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="2" />
                </>
            )}
            {features.ojos === 2 && (
                // Sorprendidos (círculos grandes vacíos)
                <>
                    <circle cx="22" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="38" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                </>
            )}

            {/* Nariz */}
            <line x1="30" y1="32" x2="30" y2="38" stroke="currentColor" strokeWidth="1.5" />

            {/* Boca */}
            {features.boca === 0 && (
                // Sonrisa
                <path d="M 22 45 Q 30 52 38 45" fill="none" stroke="currentColor" strokeWidth="2" />
            )}
            {features.boca === 1 && (
                // Triste
                <path d="M 22 50 Q 30 43 38 50" fill="none" stroke="currentColor" strokeWidth="2" />
            )}
            {features.boca === 2 && (
                // Neutral
                <line x1="22" y1="47" x2="38" y2="47" stroke="currentColor" strokeWidth="2" />
            )}
        </svg>
    )
}

interface CarasRTestRunnerProps {
    patientAge?: number
    patientName?: string
    onComplete?: (results: CarasRResults) => void
}

export interface CarasRResults {
    aciertos: number
    errores: number
    omisiones: number
    aciertosNetos: number
    ici: number
    tiempoUsado: number
    percentilA: number
    percentilAE: number
    percentilICI: number
    eneatipoA: number
    eneatipoAE: number
    eneatipoICI: number
    interpretacion: {
        tipo: string
        descripcion: string
        color: string
    }
    respuestas: { itemId: number, respuesta: number | null, correcto: boolean }[]
}

export function CarasRTestRunner({
    patientAge = 10,
    patientName = "Evaluado",
    onComplete
}: CarasRTestRunnerProps) {
    const [phase, setPhase] = useState<'intro' | 'practice' | 'test' | 'results'>('intro')
    const [testItems] = useState(() => generateTestItems(60))
    const [practiceItems] = useState(() => generateTestItems(3))
    const [responses, setResponses] = useState<Map<number, number>>(new Map())
    const [timeRemaining, setTimeRemaining] = useState(180) // 3 minutos = 180 segundos
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [results, setResults] = useState<CarasRResults | null>(null)

    // Timer countdown
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isTimerRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        setIsTimerRunning(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        if (timeRemaining === 0 && phase === 'test') {
            calculateResults()
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isTimerRunning, timeRemaining, phase])

    const handleResponse = useCallback((itemId: number, selectedIndex: number) => {
        setResponses(prev => {
            const newResponses = new Map(prev)
            newResponses.set(itemId, selectedIndex)
            return newResponses
        })
    }, [])

    const calculateResults = useCallback(() => {
        const baremos = baremosArgentina // Usar baremos latinoamericanos
        const grado = getGradoFromEdad(patientAge, 'argentina')
        const gradoBaremos = baremos[grado as keyof typeof baremos]

        let aciertos = 0
        let errores = 0
        const respuestasDetalle: { itemId: number, respuesta: number | null, correcto: boolean }[] = []

        testItems.forEach(item => {
            const respuesta = responses.get(item.id)
            if (respuesta !== undefined) {
                const correcto = respuesta === item.correctIndex
                if (correcto) {
                    aciertos++
                } else {
                    errores++
                }
                respuestasDetalle.push({ itemId: item.id, respuesta, correcto })
            } else {
                respuestasDetalle.push({ itemId: item.id, respuesta: null, correcto: false })
            }
        })

        const omisiones = 60 - aciertos - errores
        const aciertosNetos = aciertos - errores
        const ici = calcularICI(aciertos, errores)
        const tiempoUsado = 180 - timeRemaining

        const percentilA = getPercentil(aciertos, 'a', gradoBaremos)
        const percentilAE = getPercentil(aciertosNetos, 'ae', gradoBaremos)
        const percentilICI = getPercentil(ici, 'ici', gradoBaremos)

        const eneatipoA = getEneatipo(percentilA)
        const eneatipoAE = getEneatipo(percentilAE)
        const eneatipoICI = getEneatipo(percentilICI)

        const interpretacion = interpretarRendimiento(percentilAE, percentilICI)

        const resultados: CarasRResults = {
            aciertos,
            errores,
            omisiones,
            aciertosNetos,
            ici,
            tiempoUsado,
            percentilA,
            percentilAE,
            percentilICI,
            eneatipoA,
            eneatipoAE,
            eneatipoICI,
            interpretacion,
            respuestas: respuestasDetalle
        }

        setResults(resultados)
        setPhase('results')
        onComplete?.(resultados)
    }, [testItems, responses, timeRemaining, patientAge, onComplete])

    const startPractice = () => {
        setPhase('practice')
    }

    const startTest = () => {
        setPhase('test')
        setTimeRemaining(180)
        setIsTimerRunning(true)
        setResponses(new Map())
    }

    const finishTest = () => {
        setIsTimerRunning(false)
        calculateResults()
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // Fase de introducción
    if (phase === 'intro') {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="h-6 w-6" />
                        CARAS-R: Test de Percepción de Diferencias
                    </CardTitle>
                    <CardDescription>
                        Desarrollado por L.L. Thurstone y M. Yela (TEA Ediciones)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Instrucciones</h3>
                        <p>
                            En cada fila verás <strong>tres caras</strong>. Una de ellas es
                            <strong> diferente</strong> a las otras dos.
                        </p>
                        <p>
                            Tu tarea es <strong>marcar la cara que es diferente</strong> haciendo clic sobre ella.
                        </p>

                        <Alert>
                            <Clock className="h-4 w-4" />
                            <AlertTitle>Tiempo límite: 3 minutos</AlertTitle>
                            <AlertDescription>
                                Trabaja rápidamente pero trata de no cometer errores.
                            </AlertDescription>
                        </Alert>

                        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                            <div className="flex gap-2">
                                <FaceSVG features={{ pelo: 2, ojos: 0, boca: 0, cejas: 0 }} />
                                <FaceSVG features={{ pelo: 2, ojos: 0, boca: 0, cejas: 0 }} />
                                <FaceSVG features={{ pelo: 1, ojos: 0, boca: 0, cejas: 0 }} />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Ejemplo: La tercera cara tiene el pelo diferente
                            </div>
                        </div>
                    </div>

                    <Button onClick={startPractice} className="w-full" size="lg">
                        <Play className="mr-2 h-4 w-4" />
                        Comenzar práctica
                    </Button>
                </CardContent>
            </Card>
        )
    }

    // Fase de práctica
    if (phase === 'practice') {
        return (
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Práctica</CardTitle>
                    <CardDescription>
                        Practica con estos 3 ejemplos antes de comenzar el test
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {practiceItems.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                            <span className="font-bold text-lg w-8">{index + 1}.</span>
                            <div className="flex gap-4">
                                {item.faces.map((face, faceIndex) => (
                                    <button
                                        key={faceIndex}
                                        onClick={() => handleResponse(item.id, faceIndex)}
                                        className={`p-2 rounded-lg border-2 transition-all ${responses.get(item.id) === faceIndex
                                            ? faceIndex === item.correctIndex
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                                : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                            : 'border-transparent hover:border-primary/50'
                                            }`}
                                    >
                                        <FaceSVG features={face} size={70} />
                                    </button>
                                ))}
                            </div>
                            {responses.has(item.id) && (
                                <div className="ml-auto">
                                    {responses.get(item.id) === item.correctIndex ? (
                                        <CheckCircle className="h-6 w-6 text-green-500" />
                                    ) : (
                                        <XCircle className="h-6 w-6 text-red-500" />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <Button onClick={startTest} className="w-full" size="lg">
                        <Target className="mr-2 h-4 w-4" />
                        Comenzar Test (3 minutos)
                    </Button>
                </CardContent>
            </Card>
        )
    }

    // Fase del test
    if (phase === 'test') {
        const progress = (responses.size / 60) * 100
        const timeProgress = (timeRemaining / 180) * 100

        return (
            <div className="max-w-4xl mx-auto space-y-4">
                {/* Header fijo con timer */}
                <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Badge variant={timeRemaining < 30 ? "destructive" : "secondary"} className="text-lg px-3 py-1">
                                <Clock className="mr-1 h-4 w-4" />
                                {formatTime(timeRemaining)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                                Completadas: {responses.size}/60
                            </span>
                        </div>
                        <Button variant="outline" onClick={finishTest}>
                            Terminar
                        </Button>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <Progress value={timeProgress} className={`h-1 ${timeRemaining < 30 ? '[&>div]:bg-red-500' : ''}`} />
                </div>

                {/* Grid de caras */}
                <div className="grid gap-2 p-4">
                    {testItems.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center gap-2 p-2 border rounded ${responses.has(item.id) ? 'bg-muted/50' : ''
                                }`}
                        >
                            <span className="font-mono text-xs w-6 text-muted-foreground">{item.id}</span>
                            <div className="flex gap-2">
                                {item.faces.map((face, faceIndex) => (
                                    <button
                                        key={faceIndex}
                                        onClick={() => handleResponse(item.id, faceIndex)}
                                        className={`p-1 rounded border-2 transition-all ${responses.get(item.id) === faceIndex
                                            ? 'border-primary bg-primary/10'
                                            : 'border-transparent hover:border-primary/30'
                                            }`}
                                    >
                                        <FaceSVG features={face} size={50} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Fase de resultados
    if (phase === 'results' && results) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-6 w-6" />
                            Resultados CARAS-R
                        </CardTitle>
                        <CardDescription>
                            Evaluación de {patientName} - Edad: {patientAge} años
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Puntuaciones directas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                                <div className="text-3xl font-bold text-green-600">{results.aciertos}</div>
                                <div className="text-sm text-muted-foreground">Aciertos (A)</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                                <div className="text-3xl font-bold text-red-600">{results.errores}</div>
                                <div className="text-sm text-muted-foreground">Errores (E)</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                                <div className="text-3xl font-bold text-blue-600">{results.aciertosNetos}</div>
                                <div className="text-sm text-muted-foreground">A-E</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
                                <div className="text-3xl font-bold text-purple-600">{results.ici}</div>
                                <div className="text-sm text-muted-foreground">ICI (%)</div>
                            </div>
                        </div>

                        {/* Puntuaciones Normativas */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Puntuaciones Normativas</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 border rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Aciertos</div>
                                    <div className="flex justify-between items-center">
                                        <span>Pc: <strong>{results.percentilA}</strong></span>
                                        <Badge>En {results.eneatipoA}</Badge>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg bg-primary/5">
                                    <div className="text-sm text-muted-foreground mb-1">A-E (Principal)</div>
                                    <div className="flex justify-between items-center">
                                        <span>Pc: <strong>{results.percentilAE}</strong></span>
                                        <Badge variant="default">En {results.eneatipoAE}</Badge>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">ICI</div>
                                    <div className="flex justify-between items-center">
                                        <span>Pc: <strong>{results.percentilICI}</strong></span>
                                        <Badge>En {results.eneatipoICI}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interpretación */}
                        <Alert className={
                            results.interpretacion.color === 'green' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                                results.interpretacion.color === 'yellow' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                                    results.interpretacion.color === 'orange' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                                        'border-red-500 bg-red-50 dark:bg-red-900/20'
                        }>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>{results.interpretacion.tipo}</AlertTitle>
                            <AlertDescription>
                                {results.interpretacion.descripcion}
                            </AlertDescription>
                        </Alert>

                        {/* Tiempo y omisiones */}
                        <div className="flex justify-between items-center text-sm text-muted-foreground border-t pt-4">
                            <div>
                                <p>Tiempo: {Math.floor(results.tiempoUsado / 60)}:{(results.tiempoUsado % 60).toString().padStart(2, '0')}</p>
                                <p>Omitidos: {results.omisiones}</p>
                            </div>
                            <Button
                                size="lg"
                                onClick={() => {
                                    // Abrir informe en nueva ventana/pestaña
                                    const reportUrl = `/reports/caras-r?data=${encodeURIComponent(JSON.stringify({
                                        results,
                                        patientName,
                                        patientAge
                                    }))}`
                                    window.open(reportUrl, '_blank')
                                }}
                            >
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Ver Informe Profesional Completo
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Vista previa del informe */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Vista Previa del Informe</CardTitle>
                        <CardDescription>
                            El informe profesional incluye gráficos, análisis detallado y recomendaciones clínicas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold mb-2">📊 Gráficos</h4>
                                <p className="text-muted-foreground">
                                    Barras de percentiles y perfil de eneatipos visuales
                                </p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold mb-2">📝 Análisis Clínico</h4>
                                <p className="text-muted-foreground">
                                    Interpretación detallada del rendimiento atencional e impulsividad
                                </p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold mb-2">💡 Recomendaciones</h4>
                                <p className="text-muted-foreground">
                                    Sugerencias de evaluación complementaria según el perfil
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return null
}

