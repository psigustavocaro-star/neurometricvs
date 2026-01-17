import { TestDefinition } from "@/types/test"

const options = [
    { label: "No me ha molestado", value: 0 },
    { label: "Me ha molestado un poco", value: 1 },
    { label: "Me ha molestado mucho", value: 2 },
]

export const phq15: TestDefinition = {
    id: "phq-15",
    title: "PHQ-15 - Escala de Síntomas Somáticos",
    description: "Evaluación de la severidad de síntomas somáticos. Instrumento validado para la detección de trastornos de somatización y la severidad de la carga somática en atención primaria y especializada.",
    instructions: "Durante las últimas 4 semanas, ¿cuánto le han molestado los siguientes problemas? Marque la respuesta que mejor describa su experiencia.",
    authors: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2002)",
    reference: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2002). The PHQ-15: validity of a new measure for evaluating the severity of somatic symptoms. Psychosomatic Medicine, 64(2), 258-266.",
    uiType: 'blocks',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Trastornos Estructurales y Somáticos',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
El paciente obtuvo una puntuación total de **{score}**, lo que indica una severidad de síntomas somáticos de nivel **{label}**.

- **0-4**: Severidad mínima.
- **5-9**: Severidad baja.
- **10-14**: Severidad media.
- **≥15**: Severidad alta.

Una puntuación alta está fuertemente asociada con un deterioro funcional, discapacidad y un alto uso de servicios de salud. Se sugiere descartar causas orgánicas primarias y evaluar la presencia de trastornos depresivos o ansiosos comórbidos (correlación fuerte con PHQ-9 y GAD-7).
        `
    },
    questions: [
        { id: "q1", text: "Dolor de estómago", options },
        { id: "q2", text: "Dolor de espalda", options },
        { id: "q3", text: "Dolor en los brazos, las piernas o las articulaciones (rodillas, caderas, etc.)", options },
        { id: "q4", text: "Dolores menstruales u otros problemas con su periodo (mujeres solamente)", options },
        { id: "q5", text: "Dolores de cabeza", options },
        { id: "q6", text: "Dolor en el pecho", options },
        { id: "q7", text: "Mareos", options },
        { id: "q8", text: "Desmayos o pérdida del conocimiento", options },
        { id: "q9", text: "Sentir que el corazón le late muy fuerte o muy rápido", options },
        { id: "q10", text: "Falta de aire", options },
        { id: "q11", text: "Dolores o problemas durante las relaciones sexuales", options },
        { id: "q12", text: "Estreñimiento, tener el intestino flojo o diarrea", options },
        { id: "q13", text: "Náuseas, gases o indigestión", options },
        { id: "q14", text: "Sentirse cansado(a) o con poca energía", options },
        { id: "q15", text: "Problemas para dormir", options }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 4, label: "Mínima", color: "green" },
            { min: 5, max: 9, label: "Baja", color: "yellow" },
            { min: 10, max: 14, label: "Media", color: "orange" },
            { min: 15, max: 30, label: "Alta", color: "red" }
        ]
    }
}
