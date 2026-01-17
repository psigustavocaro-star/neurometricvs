import { TestDefinition } from "@/types/test"

const options = [
    { label: "Todo el tiempo", value: 5 },
    { label: "La mayor parte del tiempo", value: 4 },
    { label: "Algo más de la mitad del tiempo", value: 3 },
    { label: "Algo menos de la mitad del tiempo", value: 2 },
    { label: "De vez en cuando", value: 1 },
    { label: "Nunca", value: 0 }
]

export const who5: TestDefinition = {
    id: "who-5",
    title: "Índice de Bienestar de la OMS (WHO-5)",
    description: "Evaluación del bienestar subjetivo durante las últimas dos semanas.",
    questions: [
        { id: "q1", text: "Me he sentido alegre y de buen ánimo", type: "single_choice", options },
        { id: "q2", text: "Me he sentido tranquilo/a y relajado/a", type: "single_choice", options },
        { id: "q3", text: "Me he sentido activo/a y vigoroso/a", type: "single_choice", options },
        { id: "q4", text: "Me he despertado sintiéndome fresco/a y descansado/a", type: "single_choice", options },
        { id: "q5", text: "Mi vida diaria ha estado llena de cosas que me interesan", type: "single_choice", options }
    ],
    scoring: {
        ranges: [
            { min: 13, max: 25, label: "Bienestar satisfactorio", color: "green" },
            { min: 0, max: 12, label: "Bienestar bajo - Posible indicador de depresión", color: "red" }
        ]
    }
}
