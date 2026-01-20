import { TestDefinition } from '@/types/test'

const frequencyOptions = [
    { label: "Nunca", value: 0 },
    { label: "Una o menos veces al mes", value: 1 },
    { label: "De 2 a 4 veces al mes", value: 2 },
    { label: "De 2 a 3 veces a la semana", value: 3 },
    { label: "4 o más veces a la semana", value: 4 }
]

const quantityOptions = [
    { label: "1 ó 2", value: 0 },
    { label: "3 ó 4", value: 1 },
    { label: "5 ó 6", value: 2 },
    { label: "7, 8 ó 9", value: 3 },
    { label: "10 ó más", value: 4 }
]

const bingeOptions = [
    { label: "Nunca", value: 0 },
    { label: "Menos de una vez al mes", value: 1 },
    { label: "Mensualmente", value: 2 },
    { label: "Semanalmente", value: 3 },
    { label: "A diario o casi a diario", value: 4 }
]

export const auditC: TestDefinition = {
    id: "audit-c",
    title: "AUDIT-C (Consumo de Alcohol - Corto)",
    description: "Versión abreviada del AUDIT para detección rápida de consumo de riesgo.",
    questions: [
        { id: "q1", text: "1. ¿Con qué frecuencia consume alguna bebida alcohólica?", type: "single_choice", options: frequencyOptions },
        { id: "q2", text: "2. ¿Cuántos TRAGOS de alcohol suele beber en un día de consumo normal?", type: "single_choice", options: quantityOptions },
        { id: "q3", text: "3. ¿Con qué frecuencia toma 5 o más TRAGOS en un solo día?", type: "single_choice", options: bingeOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 3, label: "Mujeres: Consumo de Bajo Riesgo", color: "green" }, // Simplified label logic, ideally dynamic but range approach is static.
            { min: 4, max: 4, label: "Mujeres: Consumo de Riesgo / Hombres: Bajo Riesgo (Límite)", color: "yellow" },
            { min: 5, max: 12, label: "Consumo de Riesgo (Hombres y Mujeres)", color: "red" }
        ]
    }
}
