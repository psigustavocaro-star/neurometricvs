import { TestDefinition } from "@/types/test"

const options = [
    { label: "Nunca", value: 0 },
    { label: "Varios días", value: 1 },
    { label: "Más de la mitad de los días", value: 2 },
    { label: "Casi todos los días", value: 3 }
]

export const phq2: TestDefinition = {
    id: "phq-2",
    title: "Cuestionario de Salud del Paciente - 2 (PHQ-2)",
    description: "Cribado rápido de síntomas depresivos. Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?",
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
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 2, label: "Probabilidad baja de trastorno depresivo", color: "green" },
            { min: 3, max: 6, label: "Probabilidad alta de trastorno depresivo - Se recomienda PHQ-9", color: "red" }
        ]
    }
}
