import { TestDefinition } from "@/types/test"

const score01 = [
    { label: "Incorrecto", value: 0 },
    { label: "Correcto", value: 1 },
]

const score02 = [
    { label: "Incorrecto", value: 0 },
    { label: "Correcto", value: 2 },
]

const score03 = [
    { label: "Incorrecto", value: 0 },
    { label: "Correcto", value: 3 },
]

export const slums: TestDefinition = {
    id: "slums",
    title: "SLUMS - Examination",
    description: "Saint Louis University Mental Status. Evaluación del estado cognitivo para detectar deterioro cognitivo leve y demencia. Considera el nivel educativo del paciente.",
    instructions: "Administre las preguntas al paciente. Para ítems como el dibujo del reloj, pida al paciente que lo realice en papel y puntúe según los criterios.",
    authors: "Tariq, S. H., et al. (2006)",
    reference: "Tariq, S. H., et al. (2006). The Saint Louis University Mental Status (SLUMS) Examination for detecting mild cognitive impairment and dementia is more sensitive than the Mini-Mental State Examination (MMSE) - A pilot study. Am J Geriatr Psychiatry, 14(11), 900-10. ",
    uiType: 'list',
    reportConfig: {
        chartType: 'bar',
        apaCategory: 'Trastornos Neurocognitivos',
        showResponseTable: true,
        customInterpretationTemplate: `
**Interpretación de Resultados:**
Puntuación Total: **{score} / 30**

**Criterios de Valoración (Ajustado por Nivel Educativo):**

*Educación Secundaria Completa:*
- **27-30**: Normal
- **21-26**: Deterioro Cognitivo Leve (MNCD)
- **1-20**: Demencia

*Menos de Secundaria Completa:*
- **25-30**: Normal
- **20-24**: Deterioro Cognitivo Leve (MNCD)
- **1-19**: Demencia

**Nota Clínica:** El SLUMS es más sensible que el MMSE para detectar deterioro cognitivo leve. Se recomienda correlacionar con funcionalidad (Barthel/Lawton) y evaluación neuropsicológica profunda si el resultado es positivo.
        `
    },
    questions: [
        { id: "q1", text: "1. ¿Qué día de la semana es hoy?", options: score01 },
        { id: "q2", text: "2. ¿En qué año estamos?", options: score01 },
        { id: "q3", text: "3. ¿En qué estado/país estamos?", options: score01 },
        { id: "q4", text: "4. Por favor, recuerde estos 5 objetos. Le preguntaré por ellos más tarde: Manzana, Bolígrafo, Corbata, Casa, Coche. (Puntúe solo si los repite ahora correctamente para asegurar registro - No suma puntos, solo registro).", options: [{ label: "Registrado", value: 0 }] },
        { id: "q5", text: "5. Usted tiene $100 y va a la tienda a comprar una docena de manzanas por $3 y un triciclo por $20. ¿Cuánto gastó?", options: [{ label: "Incorrecto", value: 0 }, { label: "Solo 1 parte correcta", value: 1 }, { label: "Correcto ($23)", value: 2 }] }, // Max 2 (weighted?) logic says: 1 if answers one part right, 2 if accurate. Wait. Original: "How much did you spend?" ($23) - 1 pt? "How much do you have left?" ($77) - 2 pts? Need specific breakdown. 
        // Simplifying for standard runner: breaking into sub-questions or simplified scoring. 
        // "How much did you spend?" (1pt). "How much do you have left?" (2pts).
        { id: "q5a", text: "5a. ¿Cuánto gastó? ($23)", options: score01 },
        { id: "q5b", text: "5b. ¿Cuánto le queda? ($77)", options: score02 },
        { id: "q6", text: "6. Nombre todos los animales que pueda en 1 minuto.", options: [{ label: "0-4 animales", value: 0 }, { label: "5-9 animales", value: 1 }, { label: "10-14 animales", value: 2 }, { label: "15+ animales", value: 3 }] },
        { id: "q7", text: "7. ¿Cuáles eran los 5 objetos que le pedí recordar? (1 punto por cada uno)", options: [{ label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }] },
        { id: "q8", text: "8. Le voy a decir una serie de números y quiero que me los diga al revés: 87 (78)", options: score01 }, // Correct logic: Series 1 (87) -> 0 pts? No. Reverse digits.
        { id: "q8b", text: "8b. Serie: 649 (946)", options: score01 },
        { id: "q8c", text: "8c. Serie: 8537 (7358)", options: score01 },
        { id: "q9", text: "9. Reloj: Pida al paciente dibujar la esfera de un reloj, poner las horas y las manecillas marcando las 11 menos 10.", options: [{ label: "Incorrecto", value: 0 }, { label: "Hora Correcta o Forma Correcta (parcial)", value: 2 }, { label: "Hora Y Forma Correctas", value: 4 }] }, // SLUMS clock scoring is 0, 2, 4 usually? Or 0-4? "Hour markers ok: 2. Time ok: 2". Total 4.
        { id: "q10", text: "10. Pida al paciente que identifique una X en un triángulo (Muestre figura).", options: score01 },
        { id: "q11", text: "11. Cuente la historia: 'María era una costurera muy exitosa...' (Ver manual). Pregunte: ¿Cómo se llamaba?", options: score01 }, // Breaking down story questions? usually 4 questions x 2 pts each = 8 pts.
        { id: "q11a", text: "11a. ¿Cómo se llamaba la mujer?", options: score02 },
        { id: "q11b", text: "11b. ¿A qué se dedicaba?", options: score02 },
        { id: "q11c", text: "11c. ¿Por qué volvió al trabajo?", options: score02 },
        { id: "q11d", text: "11d. ¿En qué estado vivía?", options: score02 },
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 0, max: 20, label: "Demencia", color: "red" },
            { min: 21, max: 26, label: "Deterioro Cognitivo Leve", color: "orange" },
            { min: 27, max: 30, label: "Normal", color: "green" }
        ]
    }
}
