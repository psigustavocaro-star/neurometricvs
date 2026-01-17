import { TestDefinition } from "@/types/test"

const frequencyOptions = [
    { label: "Nunca", value: 0 },
    { label: "Una vez al mes o menos", value: 1 },
    { label: "2 a 4 veces al mes", value: 2 },
    { label: "2 a 3 veces a la semana", value: 3 },
    { label: "4 o más veces a la semana", value: 4 }
]

const quantityOptions = [
    { label: "1 o 2", value: 0 },
    { label: "3 o 4", value: 1 },
    { label: "5 o 6", value: 2 },
    { label: "7 a 9", value: 3 },
    { label: "10 o más", value: 4 }
]

const frequencyActionOptions = [
    { label: "Nunca", value: 0 },
    { label: "Menos de una vez al mes", value: 1 },
    { label: "Mensualmente", value: 2 },
    { label: "Semanalmente", value: 3 },
    { label: "A diario o casi a diario", value: 4 }
]

const recentOptions = [
    { label: "No", value: 0 },
    { label: "Sí, pero no en el último año", value: 2 },
    { label: "Sí, el último año", value: 4 }
]

export const audit: TestDefinition = {
    id: "audit",
    title: "Cuestionario AUDIT (Consumo de Alcohol)",
    description: "Prueba de Identificación de Trastornos por Consumo de Alcohol. Desarrollada por la OMS.",
    instructions: "Responda las siguientes preguntas sobre su consumo de bebidas alcohólicas durante el último año.",
    authors: "Babor, T. F., et al. (2001)",
    reference: "Saunders, J. B., et al. (1993). Development of the Alcohol Use Disorders Identification Test (AUDIT). Addiction, 88(6), 791-804.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Adicciones',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 40**

**Niveles de Riesgo (OMS):**
- **0-7**: Riesgo Bajo (Consumo de bajo riesgo o abstinencia).
- **8-15**: Consumo de Riesgo (Hazardous). Se recomienda consejo breve.
- **16-19**: Consumo Perjudicial (Harmful) o posibles problemas de dependencia. Se recomienda terapia breve o abordaje especializado.
- **20-40**: Probable Dependencia. Se recomienda derivación a especialista para evaluación diagnóstica y tratamiento.
        `
    },
    subscales: [],
    questions: [
        { id: "q1", text: "1. ¿Con qué frecuencia consume alguna bebida alcohólica?", type: "single_choice", options: frequencyOptions },
        { id: "q2", text: "2. ¿Cuántas bebidas alcohólicas suele consumir en un día de consumo normal?", type: "single_choice", options: quantityOptions },
        { id: "q3", text: "3. ¿Con qué frecuencia toma 6 o más bebidas alcohólicas en un solo día?", type: "single_choice", options: frequencyActionOptions },
        { id: "q4", text: "4. ¿Con qué frecuencia en el último año ha sido incapaz de parar de beber una vez había empezado?", type: "single_choice", options: frequencyActionOptions },
        { id: "q5", text: "5. ¿Con qué frecuencia en el último año no pudo hacer lo que se esperaba de usted porque había bebido?", type: "single_choice", options: frequencyActionOptions },
        { id: "q6", text: "6. ¿Con qué frecuencia en el último año ha necesitado beber en ayunas para recuperarse después de haber bebido mucho el día anterior?", type: "single_choice", options: frequencyActionOptions },
        { id: "q7", text: "7. ¿Con qué frecuencia en el último año ha tenido remordimientos o sentimientos de culpa después de haber bebido?", type: "single_choice", options: frequencyActionOptions },
        { id: "q8", text: "8. ¿Con qué frecuencia en el último año no ha podido recordar lo que sucedió la noche anterior porque había estado bebiendo?", type: "single_choice", options: frequencyActionOptions },
        { id: "q9", text: "9. ¿Usted o alguna otra persona ha resultado herido porque usted había bebido?", type: "single_choice", options: recentOptions },
        { id: "q10", text: "10. ¿Algún familiar, amigo, médico o profesional de la salud ha mostrado preocupación por su consumo de bebidas alcohólicas o le ha sugerido que deje de beber?", type: "single_choice", options: recentOptions }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 7, label: "Riesgo Bajo", color: "green" },
            { min: 8, max: 15, label: "Consumo de Riesgo", color: "yellow" },
            { min: 16, max: 19, label: "Consumo Perjudicial", color: "orange" },
            { min: 20, max: 40, label: "Probable Dependencia", color: "red" }
        ]
    }
}
