import { TestDefinition } from "@/types/test"

export const wongBaker: TestDefinition = {
    id: "wong-baker",
    title: "Escala de Dolor Wong-Baker FACES®",
    description: "Escala de autoevaluación del dolor para niños, utilizando expresiones faciales para ilustrar la intensidad.",
    instructions: "Explique al niño que cada cara representa a una persona que no tiene nada de dolor, o algo, o mucho dolor. Pídale que señale la cara que mejor describe cuánto dolor siente ahora.",
    authors: "Wong, D. & Baker, C. (1988)",
    reference: "Wong, D. L., & Baker, C. M. (1988). Pain in children: comparison of assessment scales. Pediatric Nursing, 14(1), 9-17.",
    uiType: 'blocks', // Ideal for faces if we had images, blocks with text is ok
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Evaluación del Dolor',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Nivel de Dolor Reportado: **{score} / 10**

**Escala de Referencia:**
- **0**: No duele.
- **2**: Duele un poco.
- **4**: Duele un poco más.
- **6**: Duele aún más.
- **8**: Duele mucho.
- **10**: Duele el máximo posible (lo peor).
        `
    },
    questions: [
        {
            id: "q1",
            text: "¿Cuál de estas caritas muestra cuánto te duele ahora?",
            type: "single_choice",
            options: [
                { label: "0 - No duele (Carita Feliz)", value: 0 },
                { label: "2 - Duele un poco", value: 2 },
                { label: "4 - Duele un poco más", value: 4 },
                { label: "6 - Duele aún más", value: 6 },
                { label: "8 - Duele mucho", value: 8 },
                { label: "10 - Duele lo peor (Carita Llorando)", value: 10 }
            ]
        }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 0, label: "Sin Dolor", color: "green" },
            { min: 2, max: 4, label: "Dolor Leve", color: "yellow" },
            { min: 6, max: 8, label: "Dolor Moderado/Severo", color: "orange" },
            { min: 10, max: 10, label: "Dolor Intenso/Máximo", color: "red" }
        ]
    }
}
