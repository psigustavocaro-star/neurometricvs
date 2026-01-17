import { TestDefinition } from "@/types/test"

const options = [
    { label: "No", value: 0 },
    { label: "Sí", value: 1 }
]

export const goldberg: TestDefinition = {
    id: "goldberg",
    title: "Escala de Ansiedad y Depresión de Goldberg (EADG)",
    description: "Instrumento de cribado para detectar ansiedad y depresión. Consta de dos subescalas de 9 ítems cada una: una de ansiedad y otra de depresión.",
    instructions: "Responda SÍ o NO a las siguientes preguntas, refiriéndose a cómo se ha sentido en las ÚLTIMAS 2 SEMANAS.",
    authors: "Goldberg, D., et al. (1988)",
    reference: "Goldberg, D., et al. (1988). A scaled version of the General Health Questionnaire. Psychological Medicine, 18(4), 1007-1016.",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Salud Mental Adultos',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**

**Subescala de Ansiedad (Items 1-9):**
Puntuación: **{score_ansiedad} / 9**
- **≥ 4**: Probable Ansiedad. Sensibilidad: 82%, Especificidad: 91%.

**Subescala de Depresión (Items 10-18):**
Puntuación: **{score_depresion} / 9**
- **≥ 2**: Probable Depresión. 
*Nota: La subescala de depresión solo se debe valorar si la de ansiedad es ≥ 4, aunque clínicamente ambos puntajes son relevantes.*

**Evaluación Global:**
Un puntaje elevado en cualquiera de las subescalas sugiere la necesidad de una evaluación clínica más profunda para confirmar el diagnóstico.
        `
    },
    subscales: [
        { id: "ansiedad", name: "Ansiedad", questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"], description: "Síntomas de ansiedad. Corte ≥ 4" },
        { id: "depresion", name: "Depresión", questionIds: ["q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18"], description: "Síntomas depresivos. Corte ≥ 2" }
    ],
    questions: [
        // Ansiedad
        { id: "q1", text: "1. ¿Se ha sentido muy excitado, nervioso o en tensión?", type: "single_choice", options },
        { id: "q2", text: "2. ¿Ha estado muy preocupado por algo?", type: "single_choice", options },
        { id: "q3", text: "3. ¿Se ha sentido muy irritable?", type: "single_choice", options },
        { id: "q4", text: "4. ¿Ha tenido dificultad para relajarse?", type: "single_choice", options },
        { id: "q5", text: "5. ¿Ha dormido mal?", type: "single_choice", options }, // Questions 1-4 are prerequisites usually? Standard version asks all.
        { id: "q6", text: "6. ¿Ha tenido dolores de cabeza o nuca?", type: "single_choice", options },
        { id: "q7", text: "7. ¿Ha tenido alguno de los siguientes síntomas: temblores, hormigueos, mareos, sudores, diarrea?", type: "single_choice", options },
        { id: "q8", text: "8. ¿Ha estado preocupado por su salud?", type: "single_choice", options },
        { id: "q9", text: "9. ¿Ha tenido dificultad para conciliar el sueño?", type: "single_choice", options },
        // Depresión
        { id: "q10", text: "10. ¿Ha tenido poca energía?", type: "single_choice", options },
        { id: "q11", text: "11. ¿Ha perdido el interés por las cosas?", type: "single_choice", options },
        { id: "q12", text: "12. ¿Ha perdido la confianza en sí mismo?", type: "single_choice", options },
        { id: "q13", text: "13. ¿Se ha sentido desesperanzado?", type: "single_choice", options },
        { id: "q14", text: "14. ¿Ha tenido dificultad para concentrarse?", type: "single_choice", options }, // 10-13 prerequisites usually.
        { id: "q15", text: "15. ¿Ha perdido peso (por falta de apetito)?", type: "single_choice", options },
        { id: "q16", text: "16. ¿Se ha estado despertando demasiado temprano?", type: "single_choice", options },
        { id: "q17", text: "17. ¿Se ha sentido enlentecido?", type: "single_choice", options },
        { id: "q18", text: "18. ¿Cree que tiende a encontrarse peor por las mañanas?", type: "single_choice", options }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 2, label: "Sin riesgo significativo", color: "green" },
            { min: 3, max: 9, label: "Posible Ansiedad (ver subescala)", color: "yellow" }, // Simplified generic range for total, but subscales matter more
            { min: 10, max: 18, label: "Riesgo Elevado (Mixto)", color: "red" }
        ]
    }
}
