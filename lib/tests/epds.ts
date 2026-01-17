import { TestDefinition } from "@/types/test"

export const epds: TestDefinition = {
    id: "epds",
    title: "Escala de Depresión Posparto de Edimburgo (EPDS)",
    description: "Identificación de mujeres con depresión posparto o perinatal. Por favor, marque la respuesta que más se aproxime a cómo se ha sentido en los ÚLTIMOS 7 DÍAS.",
    questions: [
        {
            id: "q1",
            text: "He sido capaz de reírme y ver el lado bueno de las cosas",
            type: "single_choice",
            options: [
                { label: "Tanto como siempre", value: 0 },
                { label: "No tanto ahora", value: 1 },
                { label: "Definitivamente mucho menos", value: 2 },
                { label: "No, en absoluto", value: 3 }
            ]
        },
        {
            id: "q2",
            text: "He mirado hacia el futuro con placer",
            type: "single_choice",
            options: [
                { label: "Tanto como siempre", value: 0 },
                { label: "Algo menos de lo que solía hacer", value: 1 },
                { label: "Definitivamente menos de lo que solía hacer", value: 2 },
                { label: "Prácticamente nada", value: 3 }
            ]
        },
        {
            id: "q3",
            text: "Me he culpado sin necesidad cuando las cosas salían mal",
            type: "single_choice",
            options: [
                { label: "Sí, casi siempre", value: 3 },
                { label: "Sí, algunas veces", value: 2 },
                { label: "No muy a menudo", value: 1 },
                { label: "No, nunca", value: 0 }
            ]
        },
        {
            id: "q4",
            text: "He estado ansiosa o preocupada sin motivo",
            type: "single_choice",
            options: [
                { label: "No, en absoluto", value: 0 },
                { label: "Casi nada", value: 1 },
                { label: "A veces", value: 2 },
                { label: "Sí, muy a menudo", value: 3 }
            ]
        },
        {
            id: "q5",
            text: "He sentido miedo o pánico sin motivo",
            type: "single_choice",
            options: [
                { label: "Sí, bastante a menudo", value: 3 },
                { label: "Sí, a veces", value: 2 },
                { label: "No, no mucho", value: 1 },
                { label: "No, en absoluto", value: 0 }
            ]
        },
        {
            id: "q6",
            text: "Las cosas me oprimen",
            type: "single_choice",
            options: [
                { label: "Sí, casi siempre soy incapaz de soportarlas", value: 3 },
                { label: "Sí, a veces no soy tan capaz de soportarlas como siempre", value: 2 },
                { label: "No, la mayoría de las veces las soporto bastante bien", value: 1 },
                { label: "No, soy tan capaz de soportarlas como siempre", value: 0 }
            ]
        },
        {
            id: "q7",
            text: "Me he sentido tan infeliz que he tenido dificultades para dormir",
            type: "single_choice",
            options: [
                { label: "Sí, casi siempre", value: 3 },
                { label: "Sí, a veces", value: 2 },
                { label: "No muy a menudo", value: 1 },
                { label: "No, en absoluto", value: 0 }
            ]
        },
        {
            id: "q8",
            text: "Me he sentido triste o desgraciada",
            type: "single_choice",
            options: [
                { label: "Sí, casi siempre", value: 3 },
                { label: "Sí, a veces", value: 2 },
                { label: "No muy a menudo", value: 1 },
                { label: "No, en absoluto", value: 0 }
            ]
        },
        {
            id: "q9",
            text: "Me he sentido tan infeliz que he estado llorando",
            type: "single_choice",
            options: [
                { label: "Sí, casi siempre", value: 3 },
                { label: "Sí, a veces", value: 2 },
                { label: "No muy a menudo", value: 1 },
                { label: "No, en absoluto", value: 0 }
            ]
        },
        {
            id: "q10",
            text: "He tenido pensamientos de hacerme daño a mí misma",
            type: "single_choice",
            options: [
                { label: "Sí, bastante a menudo", value: 3 },
                { label: "A veces", value: 2 },
                { label: "Casi nunca", value: 1 },
                { label: "Nunca", value: 0 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 9, label: "Baja probabilidad de depresión", color: "green" },
            { min: 10, max: 12, label: "Posible depresión - Vigilar y repetir", color: "yellow" },
            { min: 13, max: 30, label: "Alta probabilidad de depresión - Se requiere evaluación clínica", color: "red" }
        ]
    }
}
