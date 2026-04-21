import { TestDefinition } from "@/types/test"

const options = [
    { label: "Nunca", value: 0 },
    { label: "Varios días", value: 1 },
    { label: "Más de la mitad de los días", value: 2 },
    { label: "Casi todos los días", value: 3 }
]

export const depressionScale: TestDefinition = {
    id: "phq-9",
    title: "Cuestionario de Salud del Paciente (PHQ-9)",
    description: "Escala para evaluar la severidad de la depresión. Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?",
    category: "psychology",
    duration: "5 min",
    norms: {
        population: "Adultos",
        region: "Chile",
        method: "Validación local (Kroenke et al.)"
    },
    questions: [
        {
            id: "q1",
            text: "Tener poco interés o placer en hacer las cosas",
            type: "single_choice",
            options
        },
        {
            id: "q2",
            text: "Sentirse desanimado/a, deprimido/a o sin esperanza",
            type: "single_choice",
            options
        },
        {
            id: "q3",
            text: "Problemas para dormir o mantenerse dormido/a, o dormir demasiado",
            type: "single_choice",
            options
        },
        {
            id: "q4",
            text: "Sentirse cansado/a o tener poca energía",
            type: "single_choice",
            options
        },
        {
            id: "q5",
            text: "Tener poco apetito o comer en exceso",
            type: "single_choice",
            options
        },
        {
            id: "q6",
            text: "Sentirse mal consigo mismo/a, o sentir que es un fracaso o que ha decepcionado a su familia o a sí mismo/a",
            type: "single_choice",
            options
        },
        {
            id: "q7",
            text: "Dificultad para concentrarse en cosas como leer el periódico o ver televisión",
            type: "single_choice",
            options
        },
        {
            id: "q8",
            text: "Moverse o hablar tan lentamente que otras personas podrían notarlo, o lo opuesto, estar tan inquieto/a que se mueve mucho más de lo normal",
            type: "single_choice",
            options
        },
        {
            id: "q9",
            text: "Pensamientos de que estaría mejor muerto/a o de hacerse daño de alguna manera",
            type: "single_choice",
            options
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 4, label: "Ninguna o mínima", color: "green", description: "Los síntomas reportados no sugieren la presencia de un trastorno depresivo clínicamente significativo." },
            { min: 5, max: 9, label: "Depresión Leve", color: "yellow", description: "Presencia de síntomas depresivos leves que pueden requerir seguimiento o apoyo psicoeducativo." },
            { min: 10, max: 14, label: "Depresión Moderada", color: "orange", description: "Síntomas significativos que sugieren la necesidad de una intervención clínica o psicofarmacológica según criterio." },
            { min: 15, max: 19, label: "Depresión Moderadamente Severa", color: "red", description: "Nivel de síntomas elevado con impacto funcional considerable; requiere intervención activa." },
            { min: 20, max: 27, label: "Depresión Severa", color: "purple", description: "Cuadro sintomatológico grave. Se recomienda intervención clínica inmediata y evaluación psiquiátrica." }
        ],
        interpretation: `
## Análisis del PHQ-9
        
El Cuestionario de Salud del Paciente (PHQ-9) es una herramienta validada para el cribado, diagnóstico y monitoreo de la gravedad de la depresión. Se basa directamente en los criterios diagnósticos del DSM.

### Criterios de Gravedad:
- **0-4**: Ausencia de síntomas significativos.
- **5-9**: Síntomas leves que pueden ser normales o indicar una depresión incipiente.
- **10-14**: Umbral clínico; se sugiere evaluación diagnóstica.
- **15-19**: Nivel elevado de distress; tratamiento indicado.
- **20+**: Gravedad máxima; requiere atención prioritaria.

### Nota sobre el Ítem 9:
Cualquier puntuación mayor a 0 en el último ítem ("Pensamientos de que estaría mejor muerto/a") requiere una evaluación inmediata del riesgo suicida, independientemente de la puntuación total.
        `
    }
}
