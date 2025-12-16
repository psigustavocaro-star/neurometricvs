"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    FileText,
    Download,
    Printer,
    Brain,
    Target,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    BarChart3,
    Info,
    AlertCircle
} from "lucide-react"
import { TestDefinition, ScoringRange, Subscale } from "@/types/test"

// Tipos para los resultados del test
export interface TestResults {
    testId: string
    totalScore: number
    maxPossibleScore: number
    percentageScore: number
    rangeLabel: string
    rangeColor: string
    rangeDescription?: string
    subscaleScores?: {
        subscaleId: string
        subscaleName: string
        score: number
        maxScore: number
        rangeLabel?: string
        rangeColor?: string
        description?: string
    }[]
    responses: Record<string, number | string>
    completedAt: Date
}

interface ProfessionalReportProps {
    test: TestDefinition
    results: TestResults
    patientName: string
    patientAge?: number
    patientGender?: 'male' | 'female' | 'other'
    evaluatorName?: string
    evaluationDate?: Date
    additionalNotes?: string
}

// Componente de gráfico de barras
function BarChart({
    value,
    maxValue = 100,
    label,
    color = "bg-blue-500",
    showValue = true,
    height = "h-6"
}: {
    value: number
    maxValue?: number
    label: string
    color?: string
    showValue?: boolean
    height?: string
}) {
    const percentage = Math.min((value / maxValue) * 100, 100)

    const getColorClass = (colorName: string) => {
        const colorMap: Record<string, string> = {
            'green': 'bg-green-500',
            'yellow': 'bg-yellow-500',
            'orange': 'bg-orange-500',
            'red': 'bg-red-500',
            'blue': 'bg-blue-500',
            'purple': 'bg-purple-500',
            'teal': 'bg-teal-500',
            'cyan': 'bg-cyan-500'
        }
        return colorMap[colorName] || color
    }

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span className="font-medium">{label}</span>
                {showValue && <span className="text-muted-foreground">{value}</span>}
            </div>
            <div className={`${height} bg-muted rounded-full overflow-hidden`}>
                <div
                    className={`h-full ${getColorClass(color)} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

// Gráfico de perfil de subescalas
function SubscaleProfileChart({
    subscales
}: {
    subscales: { name: string, score: number, maxScore: number, color?: string }[]
}) {
    const maxScore = Math.max(...subscales.map(s => s.maxScore))

    return (
        <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-4 text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Perfil de Subescalas
            </h4>
            <div className="flex items-end justify-around h-44 gap-2">
                {subscales.map((item, i) => {
                    const heightPercent = (item.score / maxScore) * 100
                    const getBarColor = () => {
                        if (item.color === 'red') return 'bg-red-500'
                        if (item.color === 'orange') return 'bg-orange-500'
                        if (item.color === 'yellow') return 'bg-yellow-500'
                        if (item.color === 'green') return 'bg-green-500'
                        return 'bg-blue-500'
                    }

                    return (
                        <div key={i} className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-xs font-bold">{item.score}</span>
                            <div className="w-full h-32 bg-muted rounded-t relative">
                                <div
                                    className={`absolute bottom-0 w-full rounded-t ${getBarColor()}`}
                                    style={{ height: `${heightPercent}%` }}
                                />
                            </div>
                            <span className="text-xs text-muted-foreground text-center leading-tight max-w-16 line-clamp-2">
                                {item.name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Indicador visual de severidad
function SeverityIndicator({ level, labels }: { level: number, labels: string[] }) {
    return (
        <div className="flex items-center gap-1">
            {labels.map((label, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                    <div className={`h-2 w-full rounded ${i <= level
                            ? i === 0 ? 'bg-green-500'
                                : i === 1 ? 'bg-yellow-500'
                                    : i === 2 ? 'bg-orange-500'
                                        : 'bg-red-500'
                            : 'bg-muted'
                        }`} />
                    <span className="text-xs text-muted-foreground mt-1">{label}</span>
                </div>
            ))}
        </div>
    )
}

// Función para obtener el nivel de interpretación
function getInterpretationLevel(score: number, ranges: ScoringRange[]): { level: number, range: ScoringRange | null } {
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i]
        if (score >= range.min && score <= range.max) {
            return { level: i, range }
        }
    }
    return { level: 0, range: ranges[0] || null }
}

// Función para generar recomendaciones basadas en resultados
function generateRecommendations(test: TestDefinition, results: TestResults): string[] {
    const recommendations: string[] = []
    const { rangeColor, subscaleScores } = results

    // Recomendaciones basadas en el nivel de severidad
    if (rangeColor === 'red') {
        recommendations.push(
            "Se recomienda evaluación clínica especializada de manera prioritaria.",
            "Considerar la implementación de un plan de intervención integral.",
            "Derivación a especialista para confirmación diagnóstica."
        )
    } else if (rangeColor === 'orange') {
        recommendations.push(
            "Se sugiere evaluación complementaria para profundizar en los resultados.",
            "Monitoreo periódico de la evolución de los síntomas.",
            "Considerar intervenciones preventivas o de apoyo."
        )
    } else if (rangeColor === 'yellow') {
        recommendations.push(
            "Seguimiento regular para detectar posibles cambios.",
            "Psicoeducación al paciente y/o familia sobre los hallazgos.",
            "Implementar estrategias de autocuidado y prevención."
        )
    } else {
        recommendations.push(
            "Los resultados se encuentran dentro de parámetros normales.",
            "Se sugiere mantener seguimiento según el protocolo establecido.",
            "Continuar con las estrategias actuales de bienestar."
        )
    }

    // Recomendaciones específicas por subescalas elevadas
    if (subscaleScores) {
        subscaleScores.forEach(sub => {
            if (sub.rangeColor === 'red' || sub.rangeColor === 'orange') {
                recommendations.push(
                    `Atención especial a la dimensión "${sub.subscaleName}": se sugiere intervención focalizada.`
                )
            }
        })
    }

    return recommendations
}

export function ProfessionalTestReport({
    test,
    results,
    patientName,
    patientAge,
    patientGender,
    evaluatorName = "Profesional Evaluador",
    evaluationDate = new Date(),
    additionalNotes
}: ProfessionalReportProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getAlertIcon = (color: string) => {
        switch (color) {
            case 'green': return <CheckCircle className="h-5 w-5 text-green-600" />
            case 'yellow': return <Info className="h-5 w-5 text-yellow-600" />
            case 'orange': return <AlertTriangle className="h-5 w-5 text-orange-600" />
            case 'red': return <AlertCircle className="h-5 w-5 text-red-600" />
            default: return <Info className="h-5 w-5" />
        }
    }

    const getAlertClass = (color: string) => {
        switch (color) {
            case 'green': return 'bg-green-50 border-green-300 dark:bg-green-900/20'
            case 'yellow': return 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/20'
            case 'orange': return 'bg-orange-50 border-orange-300 dark:bg-orange-900/20'
            case 'red': return 'bg-red-50 border-red-300 dark:bg-red-900/20'
            default: return 'bg-muted'
        }
    }

    const handlePrint = () => {
        window.print()
    }

    const recommendations = generateRecommendations(test, results)

    // Calcular estadísticas adicionales
    const responseCount = Object.keys(results.responses).length
    const questionsAnswered = test.questions.length

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6 print:p-0 print:space-y-4">
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

            {/* ===== ENCABEZADO DEL INFORME ===== */}
            <Card className="border-2 border-primary/20">
                <CardHeader className="text-center border-b bg-muted/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">
                        INFORME PSICOLÓGICO
                    </CardTitle>
                    <p className="text-lg font-semibold text-primary">
                        {test.title}
                    </p>
                    {test.authors && (
                        <p className="text-sm text-muted-foreground">
                            {test.authors}
                        </p>
                    )}
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <p><strong>Evaluado/a:</strong> {patientName}</p>
                            {patientAge && <p><strong>Edad:</strong> {patientAge} años</p>}
                            {patientGender && (
                                <p><strong>Género:</strong> {
                                    patientGender === 'male' ? 'Masculino' :
                                        patientGender === 'female' ? 'Femenino' : 'Otro'
                                }</p>
                            )}
                        </div>
                        <div className="text-right space-y-1">
                            <p><strong>Fecha de evaluación:</strong> {formatDate(evaluationDate)}</p>
                            <p><strong>Evaluador:</strong> {evaluatorName}</p>
                            <p><strong>Ítems respondidos:</strong> {responseCount}/{questionsAnswered}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ===== DESCRIPCIÓN DEL INSTRUMENTO ===== */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-5 w-5" />
                        1. Descripción del Instrumento
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                    <p>{test.description}</p>

                    {test.instructions && (
                        <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="font-semibold mb-1">Instrucciones de aplicación:</p>
                            <p className="text-muted-foreground">{test.instructions}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-primary">{test.questions.length}</div>
                            <div className="text-xs text-muted-foreground">Ítems</div>
                        </div>
                        {test.subscales && (
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-2xl font-bold text-primary">{test.subscales.length}</div>
                                <div className="text-xs text-muted-foreground">Subescalas</div>
                            </div>
                        )}
                        <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-primary">{results.maxPossibleScore}</div>
                            <div className="text-xs text-muted-foreground">Puntaje Máx.</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                                {test.scoring?.type === 'average' ? 'Promedio' : 'Suma'}
                            </div>
                            <div className="text-xs text-muted-foreground">Tipo Puntuación</div>
                        </div>
                    </div>

                    {test.reference && (
                        <p className="text-xs text-muted-foreground border-t pt-3 mt-3">
                            <strong>Referencia:</strong> {test.reference}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* ===== RESULTADOS CUANTITATIVOS ===== */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <BarChart3 className="h-5 w-5" />
                        2. Resultados Cuantitativos
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Puntuación Principal */}
                    <div>
                        <h4 className="font-semibold mb-3">2.1 Puntuación Global</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className={`text-center p-6 rounded-lg border-2 ${getAlertClass(results.rangeColor)}`}>
                                    <div className="text-5xl font-bold mb-2">{results.totalScore}</div>
                                    <div className="text-sm text-muted-foreground mb-2">
                                        de {results.maxPossibleScore} puntos posibles
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`text-lg px-4 py-1 ${results.rangeColor === 'green' ? 'border-green-500 text-green-700' :
                                                results.rangeColor === 'yellow' ? 'border-yellow-500 text-yellow-700' :
                                                    results.rangeColor === 'orange' ? 'border-orange-500 text-orange-700' :
                                                        'border-red-500 text-red-700'
                                            }`}
                                    >
                                        {results.rangeLabel}
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <BarChart
                                    value={results.totalScore}
                                    maxValue={results.maxPossibleScore}
                                    label="Puntuación Total"
                                    color={results.rangeColor}
                                    height="h-8"
                                />
                                <BarChart
                                    value={Math.round(results.percentageScore)}
                                    maxValue={100}
                                    label="Porcentaje"
                                    color={results.rangeColor}
                                />

                                {/* Escala de severidad visual */}
                                {test.scoring?.ranges && (
                                    <div className="mt-4">
                                        <p className="text-xs text-muted-foreground mb-2">Posición en la escala:</p>
                                        <SeverityIndicator
                                            level={test.scoring.ranges.findIndex(r =>
                                                results.totalScore >= r.min && results.totalScore <= r.max
                                            )}
                                            labels={test.scoring.ranges.map(r => r.label.split(' ')[0])}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Subescalas */}
                    {results.subscaleScores && results.subscaleScores.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-3">2.2 Puntuaciones por Subescala</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    {results.subscaleScores.map((sub, i) => (
                                        <div key={i} className="p-3 border rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-sm">{sub.subscaleName}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold">{sub.score}</span>
                                                    <span className="text-xs text-muted-foreground">/{sub.maxScore}</span>
                                                    {sub.rangeLabel && (
                                                        <Badge variant="outline" className={`text-xs ${sub.rangeColor === 'green' ? 'border-green-500' :
                                                                sub.rangeColor === 'yellow' ? 'border-yellow-500' :
                                                                    sub.rangeColor === 'orange' ? 'border-orange-500' :
                                                                        sub.rangeColor === 'red' ? 'border-red-500' : ''
                                                            }`}>
                                                            {sub.rangeLabel}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${sub.rangeColor === 'green' ? 'bg-green-500' :
                                                            sub.rangeColor === 'yellow' ? 'bg-yellow-500' :
                                                                sub.rangeColor === 'orange' ? 'bg-orange-500' :
                                                                    sub.rangeColor === 'red' ? 'bg-red-500' : 'bg-blue-500'
                                                        }`}
                                                    style={{ width: `${(sub.score / sub.maxScore) * 100}%` }}
                                                />
                                            </div>
                                            {sub.description && (
                                                <p className="text-xs text-muted-foreground mt-1">{sub.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <SubscaleProfileChart
                                    subscales={results.subscaleScores.map(s => ({
                                        name: s.subscaleName,
                                        score: s.score,
                                        maxScore: s.maxScore,
                                        color: s.rangeColor
                                    }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* Tabla Resumen */}
                    <div>
                        <h4 className="font-semibold mb-3">2.3 Tabla Resumen de Resultados</h4>
                        <table className="w-full text-sm border">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="border p-2 text-left">Escala/Dimensión</th>
                                    <th className="border p-2 text-center">PD</th>
                                    <th className="border p-2 text-center">Máximo</th>
                                    <th className="border p-2 text-center">%</th>
                                    <th className="border p-2 text-center">Clasificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-primary/5 font-medium">
                                    <td className="border p-2">PUNTUACIÓN TOTAL</td>
                                    <td className="border p-2 text-center">{results.totalScore}</td>
                                    <td className="border p-2 text-center">{results.maxPossibleScore}</td>
                                    <td className="border p-2 text-center">{Math.round(results.percentageScore)}%</td>
                                    <td className={`border p-2 text-center font-bold ${results.rangeColor === 'green' ? 'text-green-600' :
                                            results.rangeColor === 'yellow' ? 'text-yellow-600' :
                                                results.rangeColor === 'orange' ? 'text-orange-600' :
                                                    'text-red-600'
                                        }`}>
                                        {results.rangeLabel}
                                    </td>
                                </tr>
                                {results.subscaleScores?.map((sub, i) => (
                                    <tr key={i}>
                                        <td className="border p-2">{sub.subscaleName}</td>
                                        <td className="border p-2 text-center">{sub.score}</td>
                                        <td className="border p-2 text-center">{sub.maxScore}</td>
                                        <td className="border p-2 text-center">
                                            {Math.round((sub.score / sub.maxScore) * 100)}%
                                        </td>
                                        <td className={`border p-2 text-center ${sub.rangeColor === 'green' ? 'text-green-600' :
                                                sub.rangeColor === 'yellow' ? 'text-yellow-600' :
                                                    sub.rangeColor === 'orange' ? 'text-orange-600' :
                                                        sub.rangeColor === 'red' ? 'text-red-600' : ''
                                            }`}>
                                            {sub.rangeLabel || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-xs text-muted-foreground mt-2">
                            PD: Puntuación Directa. %: Porcentaje respecto al máximo posible.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* ===== INTERPRETACIÓN CLÍNICA ===== */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="h-5 w-5" />
                        3. Interpretación Clínica
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    {/* Resultado principal */}
                    <Alert className={`border-2 ${getAlertClass(results.rangeColor)}`}>
                        <div className="flex items-start gap-3">
                            {getAlertIcon(results.rangeColor)}
                            <div>
                                <AlertTitle className="text-lg">{results.rangeLabel}</AlertTitle>
                                <AlertDescription className="mt-2">
                                    {results.rangeDescription ||
                                        `El evaluado obtuvo una puntuación de ${results.totalScore} puntos, 
                                        lo cual corresponde a la categoría "${results.rangeLabel}".`
                                    }
                                </AlertDescription>
                            </div>
                        </div>
                    </Alert>

                    {/* Análisis detallado */}
                    <div>
                        <h4 className="font-semibold mb-2">3.1 Análisis de Resultados</h4>
                        <p>
                            {patientName} obtuvo una puntuación total de <strong>{results.totalScore}</strong> puntos
                            en el {test.title}, lo cual representa el <strong>{Math.round(results.percentageScore)}%</strong> del
                            puntaje máximo posible ({results.maxPossibleScore} puntos). Esta puntuación se ubica en
                            el rango clasificado como <strong>"{results.rangeLabel}"</strong>.
                        </p>
                    </div>

                    {/* Análisis de subescalas */}
                    {results.subscaleScores && results.subscaleScores.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2">3.2 Análisis por Dimensiones</h4>
                            <div className="space-y-3">
                                {results.subscaleScores.map((sub, i) => (
                                    <div key={i} className="pl-4 border-l-2 border-muted">
                                        <p>
                                            <strong>{sub.subscaleName}:</strong> Puntuación de {sub.score}/{sub.maxScore}
                                            ({Math.round((sub.score / sub.maxScore) * 100)}%)
                                            {sub.rangeLabel && ` - ${sub.rangeLabel}`}.
                                            {sub.description && ` ${sub.description}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interpretación del manual */}
                    {test.scoring?.interpretation && (
                        <div>
                            <h4 className="font-semibold mb-2">3.3 Criterios de Interpretación</h4>
                            <div className="bg-muted/50 p-4 rounded-lg text-xs prose prose-sm max-w-none">
                                <div dangerouslySetInnerHTML={{
                                    __html: test.scoring.interpretation
                                        .replace(/\n/g, '<br>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/## (.*?)(<br>|\n)/g, '<h4 class="font-bold mt-3 mb-1">$1</h4>')
                                        .replace(/### (.*?)(<br>|\n)/g, '<h5 class="font-semibold mt-2 mb-1">$1</h5>')
                                        .replace(/- (.*?)(<br>|\n)/g, '<li>$1</li>')
                                }} />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ===== CONCLUSIONES Y RECOMENDACIONES ===== */}
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
                            Los resultados obtenidos por {patientName} en el {test.title} indican un perfil
                            caracterizado por un nivel <strong>{results.rangeLabel.toLowerCase()}</strong> en
                            la dimensión evaluada (PD = {results.totalScore}, {Math.round(results.percentageScore)}%).
                            {results.subscaleScores && results.subscaleScores.length > 0 && (
                                <> El análisis dimensional revela variabilidad en las diferentes áreas evaluadas,
                                    con puntuaciones que oscilan entre {Math.min(...results.subscaleScores.map(s => s.score))} y {Math.max(...results.subscaleScores.map(s => s.score))} puntos.</>
                            )}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Recomendaciones</h4>
                        <ul className="list-disc list-inside space-y-2">
                            {recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                            ))}
                        </ul>
                    </div>

                    {additionalNotes && (
                        <div>
                            <h4 className="font-semibold mb-2">Observaciones Adicionales</h4>
                            <p className="bg-muted/50 p-3 rounded-lg">{additionalNotes}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ===== PIE DE PÁGINA ===== */}
            <div className="text-center text-xs text-muted-foreground border-t pt-4 print:mt-8 space-y-2">
                <p>
                    Este informe ha sido generado automáticamente a partir de los resultados del test {test.title}.
                    Los resultados deben ser interpretados en el contexto clínico global del evaluado.
                </p>
                {test.reference && (
                    <p>
                        <strong>Referencia:</strong> {test.reference}
                    </p>
                )}
                <p className="mt-2">
                    <strong>Fecha de emisión del informe:</strong> {formatDate(new Date())}
                </p>
                <p className="text-muted-foreground/60 mt-4">
                    © {new Date().getFullYear()} - Informe generado por NeuroMetrics LATAM
                </p>
            </div>
        </div>
    )
}
