import { TestDefinition } from "@/types/test"

export const depressionScale: TestDefinition = {
    id: "phq-9",
    title: "Cuestionario de Salud del Paciente (PHQ-9)",
    description: "Escala para evaluar la severidad de la depresión.",
    questions: [
        {
            id: "q1",
            text: "Tener poco interés o placer en hacer las cosas",
            type: "single_choice",
            options: [
                { label: "Nunca", value: 0 },
                { label: "Varios días", value: 1 },
                { label: "Más de la mitad de los días", value: 2 },
                { label: "Casi todos los días", value: 3 }
            ]
        },
        {
            id: "q2",
            text: "Sentirse desanimado/a, deprimido/a o sin esperanza",
            type: "single_choice",
            options: [
                { label: "Nunca", value: 0 },
                { label: "Varios días", value: 1 },
                { label: "Más de la mitad de los días", value: 2 },
                { label: "Casi todos los días", value: 3 }
            ]
        },
        // ... more questions would go here
    ],
    scoring: {
        ranges: [
            { min: 0, max: 4, label: "Ninguna o mínima", color: "green" },
            { min: 5, max: 9, label: "Leve", color: "yellow" },
            { min: 10, max: 14, label: "Moderada", color: "orange" },
            { min: 15, max: 19, label: "Moderadamente severa", color: "red" },
            { min: 20, max: 27, label: "Severa", color: "purple" }
        ]
    }
}
