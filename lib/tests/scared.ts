import { TestDefinition } from "@/types/test"

// SCARED - Screen for Anxiety Related Emotional Disorders
// Autores: Birmaher, B., et al. (1997)
// Versión en español para padres

export const scared: TestDefinition = {
    id: "scared",
    title: "SCARED - Escala de Ansiedad para Niños y Adolescentes",
    description: "Screen for Anxiety Related Emotional Disorders. Evalúa síntomas de ansiedad en niños y adolescentes (8-18 años) desde la perspectiva de los padres. Incluye subescalas para pánico, ansiedad generalizada, ansiedad de separación, ansiedad social y evitación escolar.",
    instructions: "Esta es una lista de cosas que describen cómo se siente su hijo(a). Marque el 0 si casi nunca o nunca es cierto. Marque el 1 si es cierto algunas veces. Marque el 2 si casi siempre o siempre es cierto. Por favor conteste las preguntas lo mejor que pueda.",
    authors: "Birmaher, B., Khetarpal, S., Brent, D., Cully, M., Balach, L., Kaufman, J., & Neer, S.M. (1997)",
    reference: "Birmaher, B., et al. (1997). The Screen for Child Anxiety Related Emotional Disorders (SCARED): Scale construction and psychometric characteristics. Journal of the American Academy of Child & Adolescent Psychiatry, 36(4), 545-553.",
    questions: [
        // Subescala Pánico/Síntomas Somáticos: 1, 6, 9, 12, 15, 18, 19, 22, 24, 27, 30, 34, 38 (13 ítems)
        {
            id: "q1", text: "Cuando siente miedo, respira con dificultad.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q2", text: "Cuando está en la escuela, le da dolor de cabeza.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q3", text: "No le gusta estar con personas que no conoce bien.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q4", text: "Le da miedo dormir en otras casas.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q5", text: "Se preocupa si otras personas lo quieren o no.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q6", text: "Cuando tiene miedo, siente que se va a desmayar.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q7", text: "Es un niño(a) nervioso(a).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q8", text: "Me sigue a todas partes donde voy (es como mi 'sombra').", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q9", text: "La gente dice que mi hijo(a) se ve nervioso(a).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q10", text: "Se pone nervioso(a) con personas que no conoce bien.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q11", text: "Cuando está en la escuela le duele el estómago.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q12", text: "Cuando tiene mucho miedo, siente como si se fuera a 'enloquecer'.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q13", text: "Se preocupa si tiene que dormir solo(a).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q14", text: "Se preocupa de ser tan bueno(a) como los otros niños.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q15", text: "Cuando tiene mucho miedo siente como si las cosas no fueran reales.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q16", text: "Tiene pesadillas de que algo malo le va a pasar a sus padres.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q17", text: "Se preocupa tener que ir a la escuela.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q18", text: "Cuando tiene miedo, el corazón le late muy rápido.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q19", text: "Se pone tembloroso.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q20", text: "Tiene pesadillas de que algo malo le va a pasar a él (ella).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q21", text: "Le preocupa que lo que haga le salga bien.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q22", text: "Cuando tiene miedo (nervios) suda mucho.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q23", text: "Se preocupa demasiado.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q24", text: "Le da miedo sin tener ningún motivo.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q25", text: "Le da miedo estar solo en casa.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q26", text: "Le cuesta trabajo hablar con personas que no conoce bien.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q27", text: "Cuando tiene miedo, siente como que no puede tragar.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q28", text: "Las personas me dicen que mi hijo(a) se preocupa demasiado.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q29", text: "No le gusta estar separado de la familia.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q30", text: "Le da miedo de tener ataques de nervios (pánico).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q31", text: "Le preocupa que algo malo le pueda pasar a sus padres.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q32", text: "Es muy tímido(a) con personas que no conoce bien.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q33", text: "Le preocupa que le va a pasar en el futuro.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q34", text: "Cuando tiene miedo le dan ganas de vomitar.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q35", text: "Le preocupa si está haciendo las cosas bien.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q36", text: "Tiene miedo de ir a la escuela.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q37", text: "Se preocupa por las cosas que ya han sucedido.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q38", text: "Cuando tiene miedo, se siente mareado(a).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q39", text: "Se siente nervioso(a) cuando tiene que hacer algo delante de otros niños o adultos (por ejemplo: leer en voz alta, hablar, jugar, deportes).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q40", text: "Se siente nervioso(a) de ir a fiestas, bailes, o alguna parte donde hay gente que no conoce bien.", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        },
        {
            id: "q41", text: "Mi hijo(a) es tímido(a).", options: [
                { value: 0, label: "Casi nunca o nunca es cierto" },
                { value: 1, label: "Es cierto algunas veces" },
                { value: 2, label: "Casi siempre o siempre es cierto" }
            ]
        }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 30, max: 82, label: "Trastorno de Ansiedad Significativo", color: "red", description: "Puntuación ≥30 indica alta probabilidad de trastorno de ansiedad clínicamente significativo. Se recomienda evaluación especializada." },
            { min: 25, max: 29, label: "Posible Trastorno de Ansiedad", color: "orange", description: "Puntuación entre 25-29 sugiere posible presencia de trastorno de ansiedad. Se recomienda evaluación adicional." },
            { min: 15, max: 24, label: "Ansiedad Leve-Moderada", color: "yellow", description: "Puntuación entre 15-24 indica algunos síntomas ansiosos que podrían beneficiarse de seguimiento." },
            { min: 0, max: 14, label: "Sin Ansiedad Significativa", color: "green", description: "Puntuación <15 sugiere niveles de ansiedad dentro de lo esperado para la edad." }
        ],
        interpretation: `
## Interpretación Clínica del SCARED

El SCARED (Screen for Child Anxiety Related Emotional Disorders) es un instrumento de cribado diseñado para identificar trastornos de ansiedad en niños y adolescentes de 8 a 18 años. Puede ser completado por el niño/adolescente o por los padres.

### Puntuación Total
- **≥30 puntos**: Alta probabilidad de trastorno de ansiedad clínicamente significativo
- **≥25 puntos**: Posible presencia de trastorno de ansiedad
- **<25 puntos**: Menos probable que exista un trastorno de ansiedad significativo

### Subescalas y Puntos de Corte

| Subescala | Ítems | Punto de Corte | Posible Indicación |
|-----------|-------|----------------|---------------------|
| Pánico/Somático | 1,6,9,12,15,18,19,22,24,27,30,34,38 | ≥7 | Trastorno de pánico o síntomas somáticos significativos |
| Ansiedad Generalizada | 5,7,14,21,23,28,33,35,37 | ≥9 | Trastorno de Ansiedad Generalizada |
| Ansiedad de Separación | 4,8,13,16,20,25,29,31 | ≥5 | Trastorno de Ansiedad por Separación |
| Ansiedad Social | 3,10,26,32,39,40,41 | ≥8 | Trastorno de Ansiedad Social |
| Evitación Escolar | 2,11,17,36 | ≥3 | Rechazo/Evitación escolar significativa |

### Consideraciones Clínicas

1. El SCARED es una herramienta de cribado, no de diagnóstico definitivo
2. Puntuaciones elevadas deben confirmarse con evaluación clínica completa
3. Se recomienda comparar las respuestas del padre con las del niño cuando sea posible
4. Considerar el contexto cultural y situacional del niño/familia

### Referencias
- Birmaher, B., et al. (1997). The Screen for Child Anxiety Related Emotional Disorders (SCARED). JAACAP, 36(4), 545-553.
- Birmaher, B., et al. (1999). Psychometric properties of the SCARED. JAACAP, 38(10), 1230-1236.
        `
    },
    subscales: [
        {
            id: "panico",
            name: "Pánico/Síntomas Somáticos",
            questionIds: ["q1", "q6", "q9", "q12", "q15", "q18", "q19", "q22", "q24", "q27", "q30", "q34", "q38"],
            description: "Evalúa síntomas de pánico y manifestaciones somáticas de ansiedad. Punto de corte: ≥7"
        },
        {
            id: "tag",
            name: "Trastorno de Ansiedad Generalizada",
            questionIds: ["q5", "q7", "q14", "q21", "q23", "q28", "q33", "q35", "q37"],
            description: "Evalúa preocupación excesiva y generalizada. Punto de corte: ≥9"
        },
        {
            id: "separacion",
            name: "Ansiedad de Separación",
            questionIds: ["q4", "q8", "q13", "q16", "q20", "q25", "q29", "q31"],
            description: "Evalúa miedo excesivo a la separación de figuras de apego. Punto de corte: ≥5"
        },
        {
            id: "social",
            name: "Ansiedad Social",
            questionIds: ["q3", "q10", "q26", "q32", "q39", "q40", "q41"],
            description: "Evalúa miedo a situaciones sociales y evaluación negativa. Punto de corte: ≥8"
        },
        {
            id: "escolar",
            name: "Evitación Escolar",
            questionIds: ["q2", "q11", "q17", "q36"],
            description: "Evalúa síntomas relacionados con rechazo o evitación escolar. Punto de corte: ≥3"
        }
    ]
}

