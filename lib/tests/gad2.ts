import { TestDefinition } from "@/types/test"

const options = [
    { label: "Nunca", value: 0 },
    { label: "Varios días", value: 1 },
    { label: "Más de la mitad de los días", value: 2 },
    { label: "Casi todos los días", value: 3 }
]

export const gad2: TestDefinition = {
    id: "gad-2",
    title: "Trastorno de Ansiedad Generalizada - 2 (GAD-2)",
    description: "Cribado rápido de síntomas de ansiedad. Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?",
    questions: [
        {
            id: "q1",
            text: "Sentirse nervioso/a, ansioso/a o con los nervios de punta",
            type: "single_choice",
            options
        },
        {
            id: "q2",
            text: "No poder detener o controlar la preocupación",
            type: "single_choice",
            options
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 2, label: "Probabilidad baja de trastorno de ansiedad", color: "green" },
            { min: 3, max: 6, label: "Probabilidad alta de trastorno de ansiedad - Se recomienda GAD-7", color: "red" }
        ]
    }
}
