import { TestDefinition } from "@/types/test"

const optionsNormal = [
    { label: "Nunca", value: 0 },
    { label: "Casi nunca", value: 1 },
    { label: "De vez en cuando", value: 2 },
    { label: "A menudo", value: 3 },
    { label: "Muy a menudo", value: 4 }
]

// Reverse scored items: 0=4, 1=3, 2=2, 3=1, 4=0
const optionsReverse = [
    { label: "Nunca", value: 4 },
    { label: "Casi nunca", value: 3 },
    { label: "De vez en cuando", value: 2 },
    { label: "A menudo", value: 1 },
    { label: "Muy a menudo", value: 0 }
]

export const pss: TestDefinition = {
    id: "pss-14",
    title: "Escala de Estrés Percibido (PSS-14)",
    description: "Evaluación del grado en que las situaciones de la vida son percibidas como estresantes. Versión completa de 14 ítems.",
    instructions: "En las preguntas siguientes se le pide sus sentimientos y pensamientos durante el ÚLTIMO MES. Indique con qué frecuencia se sintió de cierta manera.",
    authors: "Cohen, S., Kamarck, T., & Mermelstein, R. (1983)",
    reference: "Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress. Journal of Health and Social Behavior, 24, 385–396.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Estrés y Afrontamiento',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 56**

**Niveles de Referencia (Aproximados):**
- **0-14**: Estrés Bajo.
- **15-28**: Estrés Moderado (Ocasional).
- **29-42**: Estrés Alto (Frecuente).
- **43-56**: Estrés Muy Alto / Severo (Alerta).

**Nota Clínica:** Puntuaciones altas se correlacionan con niveles elevados de cortisol y efectos negativos en la salud física y mental.
        `
    },
    questions: [
        { id: "q1", text: "1. En el último mes, ¿con qué frecuencia se ha sentido afectado por algo que ocurrió inesperadamente?", type: "single_choice", options: optionsNormal },
        { id: "q2", text: "2. En el último mes, ¿con qué frecuencia se ha sentido incapaz de controlar las cosas importantes en su vida?", type: "single_choice", options: optionsNormal },
        { id: "q3", text: "3. En el último mes, ¿con qué frecuencia se ha sentido nervioso o estresado?", type: "single_choice", options: optionsNormal },
        { id: "q4", text: "4. En el último mes, ¿con qué frecuencia ha manejado con éxito los pequeños problemas irritantes de la vida?", type: "single_choice", options: optionsReverse },
        { id: "q5", text: "5. En el último mes, ¿con qué frecuencia ha sentido que afrontaba eficazmente los cambios importantes en su vida?", type: "single_choice", options: optionsReverse },
        { id: "q6", text: "6. En el último mes, ¿con qué frecuencia se ha sentido seguro sobre su capacidad para manejar sus problemas personales?", type: "single_choice", options: optionsReverse },
        { id: "q7", text: "7. En el último mes, ¿con qué frecuencia ha sentido que las cosas le van bien?", type: "single_choice", options: optionsReverse },
        { id: "q8", text: "8. En el último mes, ¿con qué frecuencia ha sentido que no podía afrontar todas las cosas que tenía que hacer?", type: "single_choice", options: optionsNormal },
        { id: "q9", text: "9. En el último mes, ¿con qué frecuencia ha podido controlar las dificultades de su vida?", type: "single_choice", options: optionsReverse },
        { id: "q10", text: "10. En el último mes, ¿con qué frecuencia se ha sentido que tenía todo bajo control?", type: "single_choice", options: optionsReverse },
        { id: "q11", text: "11. En el último mes, ¿con qué frecuencia ha estado enfadado porque las cosas que le han ocurrido estaban fuera de su control?", type: "single_choice", options: optionsNormal },
        { id: "q12", text: "12. En el último mes, ¿con qué frecuencia ha pensado sobre las cosas que le quedan por hacer?", type: "single_choice", options: optionsNormal },
        { id: "q13", text: "13. En el último mes, ¿con qué frecuencia ha podido controlar la forma de pasar el tiempo?", type: "single_choice", options: optionsReverse },
        { id: "q14", text: "14. En el último mes, ¿con qué frecuencia ha sentido que las dificultades se acumulaban tanto que no podía superarlas?", type: "single_choice", options: optionsNormal }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 28, label: "Estrés Bajo/Moderado", color: "green" },
            { min: 29, max: 42, label: "Estrés Alto", color: "orange" },
            { min: 43, max: 56, label: "Estrés Severo", color: "red" }
        ]
    }
}
