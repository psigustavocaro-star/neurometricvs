import { TestDefinition } from "@/types/test"

const options = [
    { label: "Correcto", value: 0 },
    { label: "Incorrecto", value: 1 },
]

export const pfeiffer: TestDefinition = {
    id: "pfeiffer",
    title: "Cuestionario de Pfeiffer (SPMSQ)",
    description: "Short Portable Mental Status Questionnaire. Instrumento breve de cribado para detectar deterioro cognitivo en personas mayores. Evalúa memoria a corto y largo plazo, orientación, información sobre hechos cotidianos y capacidad de cálculo.",
    instructions: "Formule las preguntas al paciente y anote si la respuesta es correcta o incorrecta. No se permite ayuda externa.",
    authors: "Pfeiffer, E. (1975)",
    reference: "Pfeiffer, E. (1975). A short portable mental status questionnaire for the assessment of organic brain deficit in elderly patients. Journal of the American Geriatrics Society, 23(10), 433-441.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Trastornos Neurocognitivos',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
El paciente cometió **{score} errores**, lo que sugiere un funcionamiento intelectual **{label}**.

- **0-2 errores**: Funcionamiento intelectual normal.
- **3-4 errores**: Deterioro cognitivo leve.
- **5-7 errores**: Deterioro cognitivo moderado.
- **8-10 errores**: Deterioro cognitivo severo.

**Ajuste por Nivel Educativo:**
- Si el paciente tiene nivel educativo bajo (primaria incompleta), se permite 1 error más para cada categoría.
- Si el paciente tiene nivel educativo alto (superior), se permite 1 error menos.

**Nota Clínica:** Este es un instrumento de cribado. Un resultado positivo requiere una evaluación neuropsicológica completa (ej. ACE-III, Neuropsi) para confirmar el diagnóstico y establecer la etiología.
        `
    },
    questions: [
        { id: "q1", text: "¿Qué fecha es hoy? (Día, Mes, Año)", options },
        { id: "q2", text: "¿Qué día de la semana es hoy?", options },
        { id: "q3", text: "¿Cómo se llama este lugar?", options },
        { id: "q4", text: "¿Cuál es su número de teléfono? (o Dirección si no tiene teléfono)", options },
        { id: "q5", text: "¿Cuántos años tiene?", options },
        { id: "q6", text: "¿Cuándo nació? (Fecha de nacimiento)", options },
        { id: "q7", text: "¿Quién es el presidente actual del gobierno?", options },
        { id: "q8", text: "¿Quién fue el presidente anterior?", options },
        { id: "q9", text: "¿Cuál es el primer apellido de su madre?", options },
        { id: "q10", text: "Reste de 3 en 3 desde 20 (20, 17, 14... hasta 0). (Requiere toda la serie correcta)", options }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 2, label: "Normal", color: "green" },
            { min: 3, max: 4, label: "Deterioro Leve", color: "yellow" },
            { min: 5, max: 7, label: "Deterioro Moderado", color: "orange" },
            { min: 8, max: 10, label: "Deterioro Severo", color: "red" }
        ]
    }
}
