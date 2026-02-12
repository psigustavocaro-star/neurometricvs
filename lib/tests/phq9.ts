import { TestDefinition } from "@/types/test"

const options = [
    { label: "Nunca", value: 0 },
    { label: "Varios días", value: 1 },
    { label: "Más de la mitad de los días", value: 2 },
    { label: "Casi todos los días", value: 3 }
]

export const depressionScale: TestDefinition = {
    id: "phq-9",
    title: "Cuestionario de Salud del Paciente (PHQ-9)",
    description: "Escala para evaluar la severidad de la depresión. Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?",
    category: "psychology",
    duration: "5 min",
    norms: {
        population: "Adultos",
        region: "Chile",
        method: "Validación local (Kroenke et al.)"
    },
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
        },
        {
            id: "q3",
            text: "Problemas para dormir o mantenerse dormido/a, o dormir demasiado",
            type: "single_choice",
            options
        },
        {
            id: "q4",
            text: "Sentirse cansado/a o tener poca energía",
            type: "single_choice",
            options
        },
        {
            id: "q5",
            text: "Tener poco apetito o comer en exceso",
            type: "single_choice",
            options
        },
        {
            id: "q6",
            text: "Sentirse mal consigo mismo/a, o sentir que es un fracaso o que ha decepcionado a su familia o a sí mismo/a",
            type: "single_choice",
            options
        },
        {
            id: "q7",
            text: "Dificultad para concentrarse en cosas como leer el periódico o ver televisión",
            type: "single_choice",
            options
        },
        {
            id: "q8",
            text: "Moverse o hablar tan lentamente que otras personas podrían notarlo, o lo opuesto, estar tan inquieto/a que se mueve mucho más de lo normal",
            type: "single_choice",
            options
        },
        {
            id: "q9",
            text: "Pensamientos de que estaría mejor muerto/a o de hacerse daño de alguna manera",
            type: "single_choice",
            options
        }
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
