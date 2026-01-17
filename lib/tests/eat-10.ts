import { TestDefinition } from "@/types/test"

const options = [
    { label: "0 - Sin problemas", value: 0 },
    { label: "1 - Un poco de problema", value: 1 },
    { label: "2 - A veces un problema", value: 2 },
    { label: "3 - Un gran problema", value: 3 },
    { label: "4 - Un problema muy serio", value: 4 }
]

export const eat10: TestDefinition = {
    id: "eat-10",
    title: "EAT-10 (Evaluación de Disfagia)",
    description: "Herramienta de autoevaluación para medir el riesgo y severidad de problemas de deglución (disfagia).",
    instructions: "Indique hasta qué punto las siguientes situaciones son un problema para usted.",
    authors: "Belafsky, P. C., et al. (2008)",
    reference: "Belafsky, P. C., et al. (2008). Validity and reliability of the Eating Assessment Tool (EAT-10). Annals of Otology, Rhinology & Laryngology, 117(12), 919-924.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Fonoaudiología / Deglución',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 40**

**Significado Clínico:**
- **< 3**: Rango Normal. Deglución funcional.
- **≥ 3**: **Positivo para Riesgo de Disfagia**. 
  - Se recomienda evaluación clínica instrumental (videofluoroscopia o fibroscopia).
  - Puede requerir intervención fonoaudiológica.

**Nota:** Un puntaje de 3 o más es anormal y sugiere problemas significativos en la eficacia o seguridad de la deglución.
        `
    },
    questions: [
        { id: "q1", text: "1. Mi problema para tragar me ha hecho perder peso.", type: "single_choice", options },
        { id: "q2", text: "2. Mi problema para tragar no me deja comer fuera de casa.", type: "single_choice", options },
        { id: "q3", text: "3. Me cuesta esfuerzo tragar líquidos.", type: "single_choice", options },
        { id: "q4", text: "4. Me cuesta esfuerzo tragar comida sólida.", type: "single_choice", options },
        { id: "q5", text: "5. Me cuesta esfuerzo tragar las pastillas.", type: "single_choice", options },
        { id: "q6", text: "6. Me duele al tragar.", type: "single_choice", options },
        { id: "q7", text: "7. Mi problema para tragar me quita el placer de comer.", type: "single_choice", options },
        { id: "q8", text: "8. Cuando trago, la comida se me pega en la garganta.", type: "single_choice", options },
        { id: "q9", text: "9. Toso cuando como.", type: "single_choice", options },
        { id: "q10", text: "10. Tragar me estresa.", type: "single_choice", options }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 2, label: "Normal", color: "green" },
            { min: 3, max: 40, label: "Riesgo de Disfagia", color: "red" }
        ]
    }
}
