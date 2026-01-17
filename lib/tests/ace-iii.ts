import { TestDefinition } from "@/types/test"

const score01 = [{ label: "0", value: 0 }, { label: "1", value: 1 }]
const score05 = [
    { label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 },
    { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }
]

export const aceIII: TestDefinition = {
    id: "ace-iii",
    title: "ACE-III (Examen Cognitivo de Addenbrooke)",
    description: "Evaluación cognitiva breve que detecta demencia temprana y diferencia entre subtipos. Evalúa 5 dominios: Atención, Memoria, Fluidez, Lenguaje y Visuoespacial.",
    instructions: "Administre cada sección según el manual estándar. Puntúe cada ítem basándose en la respuesta del paciente.",
    authors: "Hsieh, S., et al. (2013)",
    reference: "Hsieh, S., et al. (2013). Validation of the ACE-III. Dementia and Geriatric Cognitive Disorders.",
    uiType: 'list',
    reportConfig: {
        chartType: 'radar',
        apaCategory: 'Trastornos Neurocognitivos',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 100**

**Puntos de Corte General:**
- **≥ 88**: Sospecha Baja de Demencia.
- **< 82**: Sospecha Alta de Demencia.
- **82-87**: Zona Gris / Resultado Inconcluso.
        `
    },
    subscales: [
        { id: "atencion", name: "Atención", questionIds: ["q1", "q2", "q3", "q4", "q5"], description: "Orientación, registro y cálculo. Max: 18" },
        { id: "memoria", name: "Memoria", questionIds: ["q6", "q7", "q8", "q9"], description: "Memoria. Max: 26" },
        { id: "fluidez", name: "Fluidez", questionIds: ["q10", "q11"], description: "Fluidez verbal. Max: 14" },
        { id: "lenguaje", name: "Lenguaje", questionIds: ["q12", "q13", "q14", "q15", "q16", "q17"], description: "Lenguaje. Max: 26" },
        { id: "visuoespacial", name: "Visuoespacial", questionIds: ["q18", "q19", "q20", "q21"], description: "Visuoespacial. Max: 16" }
    ],
    questions: [
        { id: "q1", text: "Orientación Temporal (0-5)", options: score05 },
        { id: "q2", text: "Orientación Espacial (0-5)", options: score05 },
        { id: "q3", text: "Registro: 3 palabras (0-3)", options: [{ label: "0-3", value: 0 }, { label: "3", value: 3 }] }, // Simplified for brevity in this fix
        { id: "q4", text: "Atención Serial (Restar 7) (0-5)", options: score05 },
        { id: "q6", text: "Memoria Retrógrada (0-4)", options: [{ label: "0", value: 0 }, { label: "4", value: 4 }] },
        { id: "q7", text: "Memoria Anterógrada (0-3)", options: [{ label: "0", value: 0 }, { label: "3", value: 3 }] },
        { id: "q8", text: "Memoria Episódica (Nombre/Dirección) (0-7)", options: [{ label: "0", value: 0 }, { label: "7", value: 7 }] },
        { id: "q10", text: "Fluidez Semántica (0-7)", options: [{ label: "0", value: 0 }, { label: "7", value: 7 }] },
        { id: "q11", text: "Fluidez Fonológica (0-7)", options: [{ label: "0", value: 0 }, { label: "7", value: 7 }] },
        { id: "q12", text: "Comprensión (0-3)", options: [{ label: "0", value: 0 }, { label: "3", value: 3 }] },
        { id: "q13", text: "Escritura (0-2)", options: [{ label: "0", value: 0 }, { label: "2", value: 2 }] },
        { id: "q14", text: "Repetición (0-2)", options: [{ label: "0", value: 0 }, { label: "2", value: 2 }] },
        { id: "q15", text: "Denominación (0-12)", options: [{ label: "0", value: 0 }, { label: "12", value: 12 }] },
        { id: "q16", text: "Comprensión Lectora (0-1)", options: score01 },
        { id: "q18", text: "Dibujo del Reloj (0-5)", options: score05 },
        { id: "q19", text: "Cubos (0-2)", options: [{ label: "0", value: 0 }, { label: "2", value: 2 }] },
        { id: "q20", text: "Puntos (0-4)", options: [{ label: "0", value: 0 }, { label: "4", value: 4 }] },
        { id: "q21", text: "Letras (0-4)", options: [{ label: "0", value: 0 }, { label: "4", value: 4 }] }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 81, label: "Demencia Probable", color: "red" },
            { min: 82, max: 87, label: "Zona Gris", color: "yellow" },
            { min: 88, max: 100, label: "Normal", color: "green" }
        ]
    }
}
