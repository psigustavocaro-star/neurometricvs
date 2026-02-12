import { TestDefinition } from "@/types/test"

const options = [
    { label: "Nunca", value: 0 },
    { label: "Menos de la mitad de los días", value: 1 },
    { label: "Más de la mitad de los días", value: 2 },
    { label: "Casi todos los días", value: 3 }
]

export const gad7: TestDefinition = {
    id: "gad-7",
    title: "Escala de Trastorno de Ansiedad Generalizada (GAD-7)",
    description: "Instrumento de cribado desarrollado por Spitzer, Kroenke, Williams y Löwe (2006) para la detección de síntomas de ansiedad generalizada. Señale con qué frecuencia ha sufrido los siguientes problemas en los últimos 15 días.",
    instructions: "Durante los últimos 15 días, ¿con qué frecuencia ha sufrido los siguientes problemas?",
    authors: "Spitzer, R.L., Kroenke, K., Williams, J.B., & Löwe, B. (2006)",
    reference: "Spitzer et al. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of Internal Medicine, 166(10), 1092-1097.",
    category: "psychology",
    duration: "5 min",
    norms: {
        population: "Adultos",
        region: "Chile",
        method: "Validación local (García-Campayo et al.)"
    },
    questions: [
        {
            id: "q1",
            text: "Se ha sentido nervioso, ansioso o muy alterado",
            type: "single_choice",
            options
        },
        {
            id: "q2",
            text: "No ha podido dejar de preocuparse",
            type: "single_choice",
            options
        },
        {
            id: "q3",
            text: "Se ha preocupado excesivamente por diferentes cosas",
            type: "single_choice",
            options
        },
        {
            id: "q4",
            text: "Ha tenido dificultad para relajarse",
            type: "single_choice",
            options
        },
        {
            id: "q5",
            text: "Se ha sentido tan intranquilo que no podía estarse quieto",
            type: "single_choice",
            options
        },
        {
            id: "q6",
            text: "Se ha irritado o enfadado con facilidad",
            type: "single_choice",
            options
        },
        {
            id: "q7",
            text: "Ha sentido miedo, como si fuera a suceder algo terrible",
            type: "single_choice",
            options
        }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 4, label: "Ansiedad mínima o ausente", color: "green", description: "No se evidencian síntomas significativos de ansiedad. Se recomienda seguimiento preventivo." },
            { min: 5, max: 9, label: "Ansiedad leve", color: "yellow", description: "Presencia de síntomas leves de ansiedad. Se sugiere monitoreo y posible intervención psicoeducativa." },
            { min: 10, max: 14, label: "Ansiedad moderada", color: "orange", description: "Síntomas moderados de ansiedad que pueden requerir intervención terapéutica. Se recomienda evaluación clínica completa." },
            { min: 15, max: 21, label: "Ansiedad severa", color: "red", description: "Síntomas severos de ansiedad que requieren atención clínica prioritaria. Se recomienda derivación a especialista y considerar intervención farmacológica." }
        ],
        interpretation: `
## Interpretación Clínica del GAD-7

El GAD-7 es un instrumento validado internacionalmente para la detección del Trastorno de Ansiedad Generalizada (TAG). Desarrollado por Spitzer et al. (2006), presenta excelentes propiedades psicométricas con una sensibilidad del 89% y especificidad del 82% para el diagnóstico de TAG.

### Puntos de Corte Clínico
- **≥10 puntos**: Punto de corte óptimo para cribado de TAG (Spitzer et al., 2006)
- **≥8 puntos**: Punto de corte sugerido en atención primaria para maximizar sensibilidad

### Consideraciones Clínicas
1. El GAD-7 evalúa síntomas de las últimas 2 semanas
2. No sustituye una evaluación diagnóstica completa
3. Útil para monitorizar la respuesta al tratamiento
4. Se recomienda reevaluación cada 2-4 semanas durante el tratamiento

### Referencias
- Spitzer, R.L., Kroenke, K., Williams, J.B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of Internal Medicine, 166(10), 1092-1097.
- García-Campayo, J., et al. (2010). Validación del GAD-7 en población española. Actas Españolas de Psiquiatría, 38(1), 27-32.
        `
    }
}
