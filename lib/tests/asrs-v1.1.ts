import { TestDefinition } from "@/types/test"

const options = [
    { label: "Nunca", value: 0 },
    { label: "Raramente", value: 1 },
    { label: "A veces", value: 2 },
    { label: "Frecuentemente", value: 3 },
    { label: "Muy frecuentemente", value: 4 }
]

export const asrsV11: TestDefinition = {
    id: "asrs-v1.1",
    title: "Escala de Autoinforme de TDAH para Adultos (ASRS-v1.1)",
    description: "Cribado de síntomas de TDAH en adultos. Por favor, responda a las preguntas calificándose usted mismo de acuerdo a cómo se ha sentido y se ha comportado durante los últimos 6 meses.",
    questions: [
        { id: "q1", text: "¿Con qué frecuencia tiene dificultad para terminar los detalles finales de un proyecto, una vez que las partes más difíciles se han terminado?", type: "single_choice", options },
        { id: "q2", text: "¿Con qué frecuencia tiene dificultad para ordenar las cosas cuando está realizando una tarea que requiere organización?", type: "single_choice", options },
        { id: "q3", text: "¿Con qué frecuencia tiene problemas para recordar citas u obligaciones?", type: "single_choice", options },
        { id: "q4", text: "Cuando tiene una tarea que requiere pensar mucho, ¿con qué frecuencia la evita o la pospone?", type: "single_choice", options },
        { id: "q5", text: "¿Con qué frecuencia juguetea con sus manos o sus pies cuando tiene que estar sentado por mucho tiempo?", type: "single_choice", options },
        { id: "q6", text: "¿Con qué frecuencia se siente demasiado activo y como si fuera impulsado por un motor?", type: "single_choice", options }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 12, label: "Puntaje no consistente con TDAH", color: "green" },
            { min: 13, max: 24, label: "Puntaje altamente consistente con TDAH en adultos - Se requiere evaluación clínica profunda", color: "red" }
        ]
    }
}
