"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    FileText,
    Download,
    Printer,
    Brain,
    Target,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    BarChart3
} from "lucide-react"
import { CarasRResults } from "@/components/tests/caras-r-runner"

interface CarasRReportProps {
    results: CarasRResults
    patientName: string
    patientAge: number
    evaluatorName?: string
    evaluationDate?: Date
}

// Componente de gráfico de barras simple
function BarChart({
    value,
    maxValue = 100,
    label,
    color = "bg-blue-500",
    showPercentage = true
}: {
    value: number
    maxValue?: number
    label: string
    color?: string
    showPercentage?: boolean
}) {
    const percentage = Math.min((value / maxValue) * 100, 100)
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span className="font-medium">{label}</span>
                <span className="text-muted-foreground">
                    {showPercentage ? `${value}%` : value}
                </span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

// Gráfico de perfil tipo
function ProfileChart({
    eneatipos
}: {
    eneatipos: { label: string, value: number }[]
}) {
    return (
        <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-4 text-sm">Perfil de Puntuaciones (Eneatipos)</h4>
            <div className="flex items-end justify-around h-40 gap-2">
                {eneatipos.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div
                            className={`w-12 rounded-t transition-all ${item.value >= 7 ? 'bg-green-500' :
                                    item.value >= 4 ? 'bg-blue-500' :
                                        item.value >= 2 ? 'bg-yellow-500' :
                                            'bg-red-500'
                                }`}
                            style={{ height: `${(item.value / 9) * 100}%` }}
                        />
                        <span className="text-xs font-bold">{item.value}</span>
                        <span className="text-xs text-muted-foreground text-center">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-4">
                <span>Bajo (1-3)</span>
                <span>Medio (4-6)</span>
                <span>Alto (7-9)</span>
            </div>
        </div>
    )
}

export function CarasRProfessionalReport({
    results,
    patientName,
    patientAge,
    evaluatorName = "Profesional Evaluador",
    evaluationDate = new Date()
}: CarasRReportProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getNivelInterpretacion = (percentil: number) => {
        if (percentil >= 77) return { nivel: "Muy Alto", color: "text-blue-600" }
        if (percentil >= 60) return { nivel: "Alto", color: "text-green-600" }
        if (percentil >= 40) return { nivel: "Medio", color: "text-gray-600" }
        if (percentil >= 23) return { nivel: "Medio-Bajo", color: "text-yellow-600" }
        if (percentil >= 11) return { nivel: "Bajo", color: "text-orange-600" }
        return { nivel: "Muy Bajo", color: "text-red-600" }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6 print:p-0">
            {/* Botones de acción (ocultos en impresión) */}
            <div className="flex gap-2 justify-end print:hidden">
                <Button variant="outline" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                </Button>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                </Button>
            </div>

            {/* Encabezado del Informe */}
            <Card className="border-2 border-primary/20">
                <CardHeader className="text-center border-b bg-muted/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">
                        INFORME PSICOLÓGICO
                    </CardTitle>
                    <p className="text-lg font-semibold text-primary">
                        Test CARAS-R: Percepción de Diferencias
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Thurstone, L.L. y Yela, M. (TEA Ediciones, 2012)
                    </p>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p><strong>Evaluado/a:</strong> {patientName}</p>
                            <p><strong>Edad:</strong> {patientAge} años</p>
                        </div>
                        <div className="text-right">
                            <p><strong>Fecha de evaluación:</strong> {formatDate(evaluationDate)}</p>
                            <p><strong>Evaluador:</strong> {evaluatorName}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Descripción del Instrumento */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-5 w-5" />
                        1. Descripción del Instrumento
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                    <p>
                        El <strong>CARAS-R (Test de Percepción de Diferencias - Revisado)</strong> es un instrumento
                        psicométrico desarrollado por L.L. Thurstone y M. Yela, diseñado para evaluar las aptitudes
                        perceptivas y la capacidad de atención visual. La prueba mide la habilidad para percibir
                        rápida y correctamente semejanzas y diferencias en patrones de estímulos parcialmente
                        ordenados.
                    </p>
                    <p>
                        El test consiste en <strong>60 elementos gráficos</strong>, cada uno formado por tres dibujos
                        de caras esquemáticas. El evaluado debe identificar cuál de las tres caras es diferente a
                        las otras dos. El tiempo límite de aplicación es de <strong>3 minutos</strong>.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-semibold mb-1">Variables evaluadas:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Atención sostenida:</strong> Capacidad de mantener el foco atencional</li>
                            <li><strong>Velocidad perceptiva:</strong> Rapidez en el procesamiento visual</li>
                            <li><strong>Control de impulsividad:</strong> Precisión en las respuestas</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Resultados Cuantitativos */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <BarChart3 className="h-5 w-5" />
                        2. Resultados Cuantitativos
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Puntuaciones Directas */}
                    <div>
                        <h4 className="font-semibold mb-3">2.1 Puntuaciones Directas</h4>
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
                                <div className="text-sm text-muted-foreground">Aciertos Netos (A-E)</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
                                <div className="text-3xl font-bold text-purple-600">{results.ici}</div>
                                <div className="text-sm text-muted-foreground">ICI (%)</div>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            * ICI (Índice de Control de Impulsividad) = [(A-E)/(A+E)] × 100
                        </p>
                    </div>

                    {/* Puntuaciones Normativas */}
                    <div>
                        <h4 className="font-semibold mb-3">2.2 Puntuaciones Normativas</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <BarChart
                                    value={results.percentilAE}
                                    label="Aciertos Netos (A-E)"
                                    color="bg-blue-500"
                                />
                                <BarChart
                                    value={results.percentilICI}
                                    label="Control de Impulsividad (ICI)"
                                    color="bg-purple-500"
                                />
                                <BarChart
                                    value={results.percentilA}
                                    label="Aciertos Brutos (A)"
                                    color="bg-green-500"
                                />
                            </div>
                            <ProfileChart
                                eneatipos={[
                                    { label: "A", value: results.eneatipoA },
                                    { label: "A-E", value: results.eneatipoAE },
                                    { label: "ICI", value: results.eneatipoICI }
                                ]}
                            />
                        </div>
                    </div>

                    {/* Tabla de Resultados */}
                    <div>
                        <h4 className="font-semibold mb-3">2.3 Tabla Resumen</h4>
                        <table className="w-full text-sm border">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="border p-2 text-left">Variable</th>
                                    <th className="border p-2 text-center">PD</th>
                                    <th className="border p-2 text-center">Percentil</th>
                                    <th className="border p-2 text-center">Eneatipo</th>
                                    <th className="border p-2 text-center">Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Aciertos (A)</td>
                                    <td className="border p-2 text-center">{results.aciertos}</td>
                                    <td className="border p-2 text-center">{results.percentilA}</td>
                                    <td className="border p-2 text-center">{results.eneatipoA}</td>
                                    <td className={`border p-2 text-center font-medium ${getNivelInterpretacion(results.percentilA).color}`}>
                                        {getNivelInterpretacion(results.percentilA).nivel}
                                    </td>
                                </tr>
                                <tr className="bg-muted/30">
                                    <td className="border p-2 font-medium">Aciertos Netos (A-E)</td>
                                    <td className="border p-2 text-center font-medium">{results.aciertosNetos}</td>
                                    <td className="border p-2 text-center font-medium">{results.percentilAE}</td>
                                    <td className="border p-2 text-center font-medium">{results.eneatipoAE}</td>
                                    <td className={`border p-2 text-center font-bold ${getNivelInterpretacion(results.percentilAE).color}`}>
                                        {getNivelInterpretacion(results.percentilAE).nivel}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2">ICI</td>
                                    <td className="border p-2 text-center">{results.ici}%</td>
                                    <td className="border p-2 text-center">{results.percentilICI}</td>
                                    <td className="border p-2 text-center">{results.eneatipoICI}</td>
                                    <td className={`border p-2 text-center font-medium ${getNivelInterpretacion(results.percentilICI).color}`}>
                                        {getNivelInterpretacion(results.percentilICI).nivel}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-muted-foreground mt-2">
                            PD: Puntuación Directa. Percentiles y eneatipos basados en grupo normativo de referencia.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Interpretación Clínica */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="h-5 w-5" />
                        3. Interpretación Clínica
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className={`p-4 rounded-lg border-2 ${results.interpretacion.color === 'green' ? 'bg-green-50 border-green-300 dark:bg-green-900/20' :
                            results.interpretacion.color === 'yellow' ? 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/20' :
                                results.interpretacion.color === 'orange' ? 'bg-orange-50 border-orange-300 dark:bg-orange-900/20' :
                                    'bg-red-50 border-red-300 dark:bg-red-900/20'
                        }`}>
                        <div className="flex items-center gap-2 mb-2">
                            {results.interpretacion.color === 'green' ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <AlertTriangle className={`h-5 w-5 ${results.interpretacion.color === 'yellow' ? 'text-yellow-600' :
                                        results.interpretacion.color === 'orange' ? 'text-orange-600' :
                                            'text-red-600'
                                    }`} />
                            )}
                            <span className="font-bold text-lg">{results.interpretacion.tipo}</span>
                        </div>
                        <p>{results.interpretacion.descripcion}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">3.1 Análisis del Rendimiento Atencional</h4>
                        <p>
                            {patientName} obtuvo una puntuación directa de <strong>{results.aciertosNetos}</strong> en
                            Aciertos Netos (A-E), lo cual corresponde al <strong>percentil {results.percentilAE}</strong> y
                            eneatipo <strong>{results.eneatipoAE}</strong>. Este resultado indica un nivel
                            <strong className={getNivelInterpretacion(results.percentilAE).color}>
                                {" "}{getNivelInterpretacion(results.percentilAE).nivel}
                            </strong> de capacidad atencional y perceptiva en comparación con el grupo de referencia
                            de su misma edad.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">3.2 Análisis del Control de Impulsividad</h4>
                        <p>
                            El Índice de Control de Impulsividad (ICI) alcanzó un valor de <strong>{results.ici}%</strong>,
                            correspondiente al <strong>percentil {results.percentilICI}</strong>.
                            {results.ici >= 80 ? (
                                " Este valor indica un adecuado control inhibitorio, sugiriendo que el evaluado mantiene un estilo de respuesta reflexivo y preciso, minimizando los errores por precipitación."
                            ) : results.ici >= 60 ? (
                                " Este valor sugiere un control de impulsividad dentro de parámetros normales, aunque ocasionalmente puede presentar respuestas precipitadas."
                            ) : (
                                " Este valor indica dificultades en el control de impulsos, con tendencia a respuestas precipitadas que incrementan la tasa de errores. Se recomienda explorar esta variable en mayor profundidad."
                            )}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">3.3 Matriz de Interpretación</h4>
                        <div className="grid grid-cols-2 gap-2 max-w-md">
                            <div className={`p-3 border rounded-lg text-center ${results.percentilAE < 40 && results.percentilICI < 50
                                    ? 'bg-red-100 border-red-500 dark:bg-red-900/30'
                                    : 'bg-muted/50'
                                }`}>
                                <div className="text-xs text-muted-foreground">A-E Bajo + ICI Bajo</div>
                                <div className="font-semibold text-sm">Subtipo Combinado</div>
                            </div>
                            <div className={`p-3 border rounded-lg text-center ${results.percentilAE < 40 && results.percentilICI >= 50
                                    ? 'bg-orange-100 border-orange-500 dark:bg-orange-900/30'
                                    : 'bg-muted/50'
                                }`}>
                                <div className="text-xs text-muted-foreground">A-E Bajo + ICI Normal</div>
                                <div className="font-semibold text-sm">Subtipo Inatento</div>
                            </div>
                            <div className={`p-3 border rounded-lg text-center ${results.percentilAE >= 40 && results.percentilICI < 50
                                    ? 'bg-yellow-100 border-yellow-500 dark:bg-yellow-900/30'
                                    : 'bg-muted/50'
                                }`}>
                                <div className="text-xs text-muted-foreground">A-E Normal + ICI Bajo</div>
                                <div className="font-semibold text-sm">Subtipo Impulsivo</div>
                            </div>
                            <div className={`p-3 border rounded-lg text-center ${results.percentilAE >= 40 && results.percentilICI >= 50
                                    ? 'bg-green-100 border-green-500 dark:bg-green-900/30'
                                    : 'bg-muted/50'
                                }`}>
                                <div className="text-xs text-muted-foreground">A-E Normal + ICI Normal</div>
                                <div className="font-semibold text-sm">Rendimiento Normal</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold mb-2">3.4 Datos Adicionales de la Ejecución</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Tiempo utilizado: <strong>{Math.floor(results.tiempoUsado / 60)} minutos {results.tiempoUsado % 60} segundos</strong></li>
                            <li>Ítems respondidos: <strong>{results.aciertos + results.errores}</strong> de 60</li>
                            <li>Ítems omitidos: <strong>{results.omisiones}</strong></li>
                            <li>Tasa de precisión: <strong>{((results.aciertos / (results.aciertos + results.errores)) * 100).toFixed(1)}%</strong></li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Conclusiones y Recomendaciones */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5" />
                        4. Conclusiones y Recomendaciones
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2">Conclusión</h4>
                        <p>
                            Los resultados obtenidos por {patientName} en el Test CARAS-R indican un perfil
                            atencional caracterizado por un nivel <strong>{getNivelInterpretacion(results.percentilAE).nivel.toLowerCase()}</strong> de
                            eficacia perceptiva (A-E = {results.aciertosNetos}, Pc {results.percentilAE}) y un
                            control de impulsividad <strong>{getNivelInterpretacion(results.percentilICI).nivel.toLowerCase()}</strong> (ICI = {results.ici}%,
                            Pc {results.percentilICI}). {results.interpretacion.descripcion}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Recomendaciones</h4>
                        <ul className="list-disc list-inside space-y-2">
                            {results.percentilAE < 40 && (
                                <li>
                                    Evaluación complementaria de funciones atencionales mediante instrumentos como
                                    CPT, TOVA o pruebas de cancelación para confirmar el perfil encontrado.
                                </li>
                            )}
                            {results.percentilICI < 50 && (
                                <li>
                                    Valoración del control inhibitorio mediante pruebas específicas (Stroop, Go/No-Go)
                                    y evaluación de funciones ejecutivas.
                                </li>
                            )}
                            {results.percentilAE < 40 || results.percentilICI < 50 ? (
                                <>
                                    <li>
                                        Considerar evaluación multidisciplinar para descartar o confirmar presencia
                                        de TDAH u otras condiciones que afecten la atención.
                                    </li>
                                    <li>
                                        Implementar estrategias de apoyo atencional en el aula y en el hogar según
                                        el perfil identificado.
                                    </li>
                                </>
                            ) : (
                                <li>
                                    El rendimiento se encuentra dentro de parámetros normales. Se sugiere continuar
                                    con seguimiento periódico según las necesidades del caso.
                                </li>
                            )}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Pie de página */}
            <div className="text-center text-xs text-muted-foreground border-t pt-4 print:mt-8">
                <p>
                    Este informe ha sido generado automáticamente a partir de los resultados del test CARAS-R.
                </p>
                <p>
                    <strong>Referencia:</strong> Thurstone, L.L. y Yela, M. (2012). CARAS-R: Test de Percepción
                    de Diferencias - Revisado (11ª ed.). Madrid: TEA Ediciones.
                </p>
                <p className="mt-2">
                    Fecha de emisión: {formatDate(new Date())}
                </p>
            </div>
        </div>
    )
}
