import { TestDefinition } from "@/types/test"

const forwardOptions = [
    { label: "Nunca o muy poco tiempo", value: 1 },
    { label: "Algunas veces", value: 2 },
    { label: "Buen parte del tiempo", value: 3 },
    { label: "La mayor parte del tiempo", value: 4 },
]

const reverseOptions = [
    { label: "Nunca o muy poco tiempo", value: 4 },
    { label: "Algunas veces", value: 3 },
    { label: "Buen parte del tiempo", value: 2 },
    { label: "La mayor parte del tiempo", value: 1 },
]

export const zungSas: TestDefinition = {
    id: "zung-sas",
    title: "Escala de Ansiedad de Zung (SAS)",
    description: "Medida de autoevaluación de los niveles de ansiedad. Diseñada para cuantificar la intensidad de la ansiedad, tanto en sus componentes psíquicos como somáticos.",
    instructions: "Para cada una de las siguientes frases, elija la opción que mejor describa cómo se ha sentido durante la ÚLTIMA SEMANA, incluyendo el día de hoy.",
    authors: "Zung, W. W. (1971)",
    reference: "Zung, W. W. (1971). A rating instrument for anxiety disorders. Psychosomatics, 12(6), 371-379.",
    uiType: 'blocks',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Trastornos de Ansiedad',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
El paciente obtuvo una Puntuación Bruta de **{score}**, lo que corresponde a un nivel de ansiedad **{label}**.

- **20-35**: Dentro de límites normales.
- **36-47**: Ansiedad leve a moderada.
- **48-59**: Ansiedad marcada a severa.
- **≥60**: Ansiedad extrema.

**Nota Clínica:** La ansiedad elevada detectada por el SAS correlaciona significativamente con diagnósticos clínicos de trastornos de ansiedad. Se recomienda explorar síntomas somáticos específicos (temblores, palpitaciones) y afectivos (miedo, aprensión) reportados en el test.
        `
    },
    questions: [
        { id: "q1", text: "Me siento más nervioso(a) y ansioso(a) que de costumbre.", options: forwardOptions },
        { id: "q2", text: "Me siento con miedo sin razón aparente.", options: forwardOptions },
        { id: "q3", text: "Me altero o me siento angustiado(a) fácilmente.", options: forwardOptions },
        { id: "q4", text: "Siento como si me fuera a romper en pedazos.", options: forwardOptions },
        { id: "q5", text: "Siento que todo está bien y que nada malo va a pasar.", options: reverseOptions },
        { id: "q6", text: "Me tiemblan los brazos y las piernas.", options: forwardOptions },
        { id: "q7", text: "Me molestan dolores de cabeza, cuello y espalda.", options: forwardOptions },
        { id: "q8", text: "Me siento débil y me canso fácilmente.", options: forwardOptions },
        { id: "q9", text: "Me siento tranquilo(a) y puedo quedarme quieto(a) fácilmente.", options: reverseOptions },
        { id: "q10", text: "Siento que el corazón me late rápido.", options: forwardOptions },
        { id: "q11", text: "Sufro de mareos.", options: forwardOptions },
        { id: "q12", text: "Sufro de desmayos o siento que me voy a desmayar.", options: forwardOptions },
        { id: "q13", text: "Puedo respirar fácilmente.", options: reverseOptions },
        { id: "q14", text: "Se me duermen o me hormiguean los dedos de las manos y de los pies.", options: forwardOptions },
        { id: "q15", text: "Sufro de dolores de estómago o indigestión.", options: forwardOptions },
        { id: "q16", text: "Tengo que orinar con mucha frecuencia.", options: forwardOptions },
        { id: "q17", text: "Generalmente tengo las manos secas y calientes.", options: reverseOptions },
        { id: "q18", text: "Siento que la cara se me pone caliente y roja.", options: forwardOptions },
        { id: "q19", text: "Me duermo fácilmente y descanso bien por la noche.", options: reverseOptions },
        { id: "q20", text: "Tengo pesadillas.", options: forwardOptions }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 20, max: 35, label: "Normal", color: "green" },
            { min: 36, max: 47, label: "Leve-Moderada", color: "yellow" },
            { min: 48, max: 59, label: "Marcada-Severa", color: "orange" },
            { min: 60, max: 80, label: "Extrema", color: "red" }
        ]
    }
}
