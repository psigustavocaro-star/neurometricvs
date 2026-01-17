import { TestDefinition } from "@/types/test"

const yesNo = [
    { label: "No", value: 0 },
    { label: "Sí", value: 1 }
]

export const cssrs: TestDefinition = {
    id: "c-ssrs",
    title: "C-SSRS (Escala Columbia de Severidad Suicida) - Screener",
    description: "Versión de cribado de la escala estándar de oro para evaluar ideas y comportamientos suicidas. Referencia: Último mes y A lo largo de la vida.",
    instructions: "Formule las siguientes preguntas al paciente. Si la respuesta a la Pregunta 2 es SÍ, continúe con las preguntas 3, 4 y 5. Si la respuesta a la Pregunta 2 es NO, pase directamente a la Pregunta 6.",
    authors: "Posner, K., et al.",
    reference: "Posner, K., et al. (2011). The Columbia-Suicide Severity Rating Scale: initial validity and internal consistency findings. American Journal of Psychiatry, 168(12), 1266-1277.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Riesgo Suicida',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Riesgo (C-SSRS):**

**Resultados Críticos:**
- **Ideación Suicida (Preguntas 1-5):** Cualquier respuesta "SÍ" indica presencia de ideación.
  - **Severidad Alta:** SÍ a preguntas 4 (Intención sin plan) o 5 (Plan e Intento). Requiere intervención inmediata.
  - **Severidad Moderada:** SÍ a pregunta 3 (Método sin plan/intento).
- **Comportamiento Suicida (Pregunta 6):** Cualquier respuesta "SÍ" indica comportamiento suicida (intento real, interrumpido, abortado o preparatorio).

**Acción Recomendada:**
- **Rojo (Alto Riesgo):** Ideación con Intención/Plan o Comportamiento Reciente (< 3 meses). -> **Evaluación Psiquiátrica Urgente / Seguridad**.
- **Naranja (Riesgo Moderado):** Ideación con Método pero sin Intención. -> **Precaución y Seguimiento**.
- **Amarillo (Bajo Riesgo):** Solo Deseo de morir o Pensamientos inespecíficos.
        `
    },
    subscales: [
        { id: "ideacion", name: "Ideación Suicida", questionIds: ["q1", "q2", "q3", "q4", "q5"], description: "Severidad de los pensamientos suicidas." },
        { id: "comportamiento", name: "Comportamiento Suicida", questionIds: ["q6"], description: "Intentos o actos preparatorios." }
    ],
    questions: [
        { id: "q1", text: "1. Deseo de estar muerto: ¿Ha deseado estar muerto o poder dormirse y no despertar?", type: "single_choice", options: yesNo },
        { id: "q2", text: "2. Pensamientos suicidas no específicos: ¿Ha tenido realmente la idea de suicidarse? (Si es NO, pase a la Pregunta 6)", type: "single_choice", options: yesNo },
        { id: "q3", text: "3. Pensamientos suicidas con métodos: ¿Ha pensado en CÓMO lo haría?", type: "single_choice", options: yesNo },
        { id: "q4", text: "4. Intención suicida (sin plan específico): ¿Ha tenido estas ideas y ha tenido alguna INTENCIÓN de llevarlas a cabo?", type: "single_choice", options: yesNo },
        { id: "q5", text: "5. Intención suicida con plan específico: ¿Ha empezado a elaborar o ha elaborado los detalles de cómo suicidarse? ¿Tenía la intención de llevar a cabo este plan?", type: "single_choice", options: yesNo },
        { id: "q6", text: "6. Comportamiento Suicida: ¿Alguna vez ha hecho algo, empezado a hacer algo o se ha preparado para hacer algo para terminar con su vida? (Ej: tomar pastillas, prepararse para ahorcarse, escribir carta, despedirse)", type: "single_choice", options: yesNo }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 0, label: "Sin riesgo evidente", color: "green" },
            { min: 1, max: 2, label: "Riesgo Bajo (Ideación pasiva)", color: "yellow" },
            { min: 3, max: 6, label: "RIESGO ALTO (Intención/Plan/Acción)", color: "red" }
        ]
    }
}
