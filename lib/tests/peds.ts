import { TestDefinition } from "@/types/test"

const pedsOptions = [
    { label: "No", value: 0 },
    { label: "Sí", value: 1 },
    { label: "Un poco", value: 1 }
]

export const peds: TestDefinition = {
    id: "peds",
    title: "PEDS (Evaluación de Padres del Estado de Desarrollo)",
    description: "Herramienta de vigilancia del desarrollo y cribado para detectar problemas de desarrollo y comportamiento en niños de 0 a 8 años. Se basa en las preocupaciones de los padres.",
    instructions: "Por favor conteste las siguientes preguntas sobre su preocupación respecto al desarrollo de su hijo/a.",
    authors: "Frances Page Glascoe, PhD",
    reference: "Glascoe, F. P. (1997). Parents' Evaluation of Developmental Status (PEDS).",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Neurodesarrollo',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntaje de Preocupaciones Significativas: **{score}**

**Guía de Interpretación (Algoritmo PEDS):**
- **Ruta A (Alto Riesgo)**: 2 o más preocupaciones predictivas. Referir para evaluación diagnóstica.
- **Ruta B (Riesgo Moderado)**: 1 preocupación predictiva. Administrar prueba de cribado adicional (ej. M-CHAT o ASQ).
- **Ruta C (Bajo Riesgo)**: Solo preocupaciones no predictivas. Consejería conductual.
- **Ruta E (Bajo Riesgo)**: Sin preocupaciones. Vigilancia rutinaria.

**Nota:** Las preocupaciones predictivas incluyen: Global/Cognitiva, Motora Fina/Gruesa, Lenguaje, Social-Emocional.
        `
    },
    subscales: [
        { id: "predictivas", name: "Preocupaciones Predictivas", questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"], description: "Preocupaciones que correlacionan altamente con problemas del desarrollo." }
    ],
    questions: [
        { id: "q1", text: "1. ¿Le preocupa cómo su hijo/a usa sus manos y dedos para hacer cosas?", type: "single_choice", options: pedsOptions }, // Motora Fina
        { id: "q2", text: "2. ¿Le preocupa cómo su hijo/a usa sus brazos y piernas?", type: "single_choice", options: pedsOptions }, // Motora Gruesa
        { id: "q3", text: "3. ¿Le preocupa cómo su hijo/a se comporta?", type: "single_choice", options: pedsOptions }, // Comportamiento (Predictive? Sometimes no)
        { id: "q4", text: "4. ¿Le preocupa cómo su hijo/a se lleva con otros?", type: "single_choice", options: pedsOptions }, // Social
        { id: "q5", text: "5. ¿Le preocupa cómo su hijo/a habla y produce los sonidos?", type: "single_choice", options: pedsOptions }, // Lenguaje Exp
        { id: "q6", text: "6. ¿Le preocupa cómo su hijo/a entiende lo que usted le dice?", type: "single_choice", options: pedsOptions }, // Lenguaje Rec
        { id: "q7", text: "7. ¿Le preocupa cómo su hijo/a está aprendiendo cosas preescolares/escolares?", type: "single_choice", options: pedsOptions }, // Cognitiva
        { id: "q8", text: "8. ¿Le preocupa cómo su hijo/a se vale por sí mismo (vestirse, comer)?", type: "single_choice", options: pedsOptions }, // Autoayuda
        { id: "q9", text: "9. ¿Tiene alguna otra preocupación?", type: "text" }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 0, label: "Ruta E - Bajo Riesgo", color: "green" },
            { min: 1, max: 1, label: "Ruta B - Riesgo Moderado", color: "yellow" },
            { min: 2, max: 10, label: "Ruta A - Alto Riesgo", color: "red" }
        ]
    }
}
