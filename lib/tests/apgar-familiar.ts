import { TestDefinition } from "@/types/test"

const options = [
    { label: "Casi siempre", value: 2 },
    { label: "A veces", value: 1 },
    { label: "Casi nunca", value: 0 }
]

export const apgarFamiliar: TestDefinition = {
    id: "apgar-familiar",
    title: "APGAR Familiar",
    description: "Evaluación de la percepción sobre la funcionalidad familiar. Marque la opción que mejor describa su satisfacción con los siguientes aspectos de su familia.",
    questions: [
        { id: "q1", text: "¿Está satisfecho con la ayuda que recibe de su familia cuando tiene algún problema?", type: "single_choice", options },
        { id: "q2", text: "¿Está satisfecho con la forma en que su familia habla de las cosas y comparte los problemas con usted?", type: "single_choice", options },
        { id: "q3", text: "¿Está satisfecho con la forma en que su familia acepta sus nuevos intereses o cambios de dirección?", type: "single_choice", options },
        { id: "q4", text: "¿Está satisfecho con la forma en que su familia expresa afecto y responde a sus emociones (rabia, tristeza, alegría)?", type: "single_choice", options },
        { id: "q5", text: "¿Está satisfecho con la forma en que su familia y usted pasan tiempo juntos?", type: "single_choice", options }
    ],
    scoring: {
        ranges: [
            { min: 7, max: 10, label: "Funcionalidad normal", color: "green" },
            { min: 4, max: 6, label: "Disfunción familiar leve", color: "yellow" },
            { min: 0, max: 3, label: "Disfunción familiar severa", color: "red" }
        ]
    }
}
