import { TestDefinition } from "@/types/test"

const options = [
    { label: "Nunca", value: 0 },
    { label: "A veces", value: 1 },
    { label: "A menudo", value: 2 }
]

export const psc17: TestDefinition = {
    id: "psc-17",
    title: "Cuestionario de Síntomas Pediátricos (PSC-17)",
    description: "Evaluación breve de problemas psicosociales en niños. Reporte de padres/cuidadores.",
    instructions: "Por favor, marque el grado en que su hijo presenta cada uno de los siguientes problemas.",
    authors: "Michael Jellinek, et al.",
    reference: "Gardner, W., et al. (1999). The PSC-17: a brief pediatric symptom checklist with psychosocial problem subscales.",
    uiType: 'list', // List is fine for 17 items
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Salud Mental Pediátrica',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score}**

**Puntos de Corte (Total):**
- **< 15**: Rango Normal.
- **≥ 15**: Puntaje Significativo. Sugiere la necesidad de una evaluación más profunda.

**Análisis por Subescalas:**
- **Internalizante (≥ 5)**: Problemas de ansiedad o depresión.
- **Atención (≥ 7)**: Problemas de atención o hiperactividad.
- **Externalizante (≥ 7)**: Problemas de conducta o agresividad.
        `
    },
    subscales: [
        { id: "internalizante", name: "Internalizante", questionIds: ["q1", "q2", "q3", "q4", "q17"], description: "Ansiedad, depresión, aislamiento. Corte ≥ 5" },
        { id: "atencion", name: "Atención", questionIds: ["q7", "q8", "q9", "q10", "q6"], description: "Dificultades atencionales. Corte ≥ 7" }, // Q6 often grouped here in 17-item key
        { id: "externalizante", name: "Externalizante", questionIds: ["q11", "q12", "q13", "q14", "q15", "q16"], description: "Conducta disruptiva. Corte ≥ 7" }
    ],
    questions: [
        { id: "q1", text: "1. Se siente triste o desanimado/a", type: "single_choice", options },
        { id: "q2", text: "2. Se siente desesperado/a", type: "single_choice", options },
        { id: "q3", text: "3. Se siente mal consigo mismo/a", type: "single_choice", options },
        { id: "q4", text: "4. Se preocupa mucho", type: "single_choice", options },
        { id: "q5", text: "5. Parece tener miedo a situaciones nuevas", type: "single_choice", options }, // Not in subscales usually, keeps in Total
        { id: "q6", text: "6. Se queja de dolores (estómago, cabeza)", type: "single_choice", options },
        { id: "q7", text: "7. Se distrae fácilmente", type: "single_choice", options },
        { id: "q8", text: "8. No puede quedarse quieto/a", type: "single_choice", options },
        { id: "q9", text: "9. Actúa como si lo impulsara un motor", type: "single_choice", options },
        { id: "q10", text: "10. Sueña despierto/a demasiado", type: "single_choice", options },
        { id: "q11", text: "11. No sigue las reglas", type: "single_choice", options },
        { id: "q12", text: "12. No entiende los sentimientos de los demás", type: "single_choice", options },
        { id: "q13", text: "13. Se mete en peleas", type: "single_choice", options },
        { id: "q14", text: "14. Culpa a otros de sus errores", type: "single_choice", options },
        { id: "q15", text: "15. Les quita las cosas a otros", type: "single_choice", options },
        { id: "q16", text: "16. Se niega a compartir", type: "single_choice", options },
        { id: "q17", text: "17. Se siente solo/a", type: "single_choice", options }
    ],
    scoring: {
        type: 'sum',
        ranges: [
            { min: 0, max: 14, label: "Rango Normal", color: "green" },
            { min: 15, max: 34, label: "Significativo", color: "red" }
        ]
    }
}
