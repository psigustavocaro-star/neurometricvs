import { TestDefinition } from "@/types/test"

const yesNo = [
    { label: "No", value: 0 },
    { label: "Sí", value: 1 }
]

export const cage: TestDefinition = {
    id: "cage",
    title: "Cuestionario CAGE (Alcohol)",
    description: "Cribado de 4 preguntas para detectar problemas con el consumo de alcohol.",
    instructions: "Responda SÍ o NO a las siguientes preguntas sobre sus hábitos de bebida.",
    authors: "Ewing, J. A. (1984)",
    reference: "Ewing, J. A. (1984). Detecting alcoholism. The CAGE questionnaire. JAMA, 252(14), 1905-1907.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Adicciones',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 4**

**Significado Clínico:**
- **0-1**: Baja sospecha de problemas con alcohol.
- **≥ 2**: **Positivo**. Alta sospecha de dependencia o abuso de alcohol. Sensibilidad > 70%, Especificidad > 90%.
- **≥ 3**: Sospecha muy alta.
        `
    },
    subscales: [],
    questions: [
        { id: "cut", text: "1. ¿Ha sentido alguna vez que debe beber menos? (Cut down)", type: "single_choice", options: yesNo },
        { id: "annoyed", text: "2. ¿Le ha molestado que la gente lo critique por su forma de beber? (Annoyed)", type: "single_choice", options: yesNo },
        { id: "guilty", text: "3. ¿Alguna vez se ha sentido mal o culpable por su forma de beber? (Guilty)", type: "single_choice", options: yesNo },
        { id: "eye-opener", text: "4. ¿Alguna vez ha necesitado beber por la mañana para calmar los nervios o eliminar la resaca? (Eye-opener)", type: "single_choice", options: yesNo }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 1, label: "Negativo", color: "green" },
            { min: 2, max: 4, label: "POSITIVO (Riesgo)", color: "red" }
        ]
    }
}
