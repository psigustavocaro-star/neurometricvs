import { TestDefinition } from "@/types/test"

const yesNoOptions = [
    { label: "Sí", value: 1 },
    { label: "No", value: 0 }
]

const reversedYesNoOptions = [
    { label: "Sí", value: 0 },
    { label: "No", value: 1 }
]

export const gds15: TestDefinition = {
    id: "gds-15",
    title: "Escala de Depresión Geriátrica (Yesavage - 15 items)",
    description: "Evaluación de síntomas depresivos en adultos mayores. Por favor, responda cómo se ha sentido USTED durante LA ÚLTIMA SEMANA.",
    questions: [
        { id: "q1", text: "¿Está básicamente satisfecho con su vida?", type: "single_choice", options: reversedYesNoOptions },
        { id: "q2", text: "¿Ha renunciado a muchas de sus actividades e intereses?", type: "single_choice", options: yesNoOptions },
        { id: "q3", text: "¿Siente que su vida está vacía?", type: "single_choice", options: yesNoOptions },
        { id: "q4", text: "¿Se encuentra a menudo aburrido/a?", type: "single_choice", options: yesNoOptions },
        { id: "q5", text: "¿Tiene buen ánimo la mayor parte del tiempo?", type: "single_choice", options: reversedYesNoOptions },
        { id: "q6", text: "¿Teme que le pase algo malo?", type: "single_choice", options: yesNoOptions },
        { id: "q7", text: "¿Se siente feliz la mayor parte del tiempo?", type: "single_choice", options: reversedYesNoOptions },
        { id: "q8", text: "¿Se siente a menudo abandonado/a?", type: "single_choice", options: yesNoOptions },
        { id: "q9", text: "¿Prefiere quedarse en casa en lugar de salir y hacer cosas nuevas?", type: "single_choice", options: yesNoOptions },
        { id: "q10", text: "¿Siente que tiene más problemas de memoria que la mayoría de la gente?", type: "single_choice", options: yesNoOptions },
        { id: "q11", text: "¿Cree que es maravilloso estar vivo/a?", type: "single_choice", options: reversedYesNoOptions },
        { id: "q12", text: "¿Se siente inútil tal como está ahora?", type: "single_choice", options: yesNoOptions },
        { id: "q13", text: "¿Se siente lleno/a de energía?", type: "single_choice", options: reversedYesNoOptions },
        { id: "q14", text: "¿Se siente sin esperanza en su situación actual?", type: "single_choice", options: yesNoOptions },
        { id: "q15", text: "¿Cree que la mayoría de la gente está mejor que usted?", type: "single_choice", options: yesNoOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 4, label: "Normal", color: "green" },
            { min: 5, max: 8, label: "Depresión leve", color: "yellow" },
            { min: 9, max: 11, label: "Depresión moderada", color: "orange" },
            { min: 12, max: 15, label: "Depresión severa", color: "red" }
        ]
    }
}
