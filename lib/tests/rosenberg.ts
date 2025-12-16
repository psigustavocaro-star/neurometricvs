import { TestDefinition } from "@/types/test"

const optionsPositive = [
    { label: "Muy de Acuerdo", value: 4 },
    { label: "De Acuerdo", value: 3 },
    { label: "En Desacuerdo", value: 2 },
    { label: "Muy en Desacuerdo", value: 1 }
]

const optionsNegative = [
    { label: "Muy de Acuerdo", value: 1 },
    { label: "De Acuerdo", value: 2 },
    { label: "En Desacuerdo", value: 3 },
    { label: "Muy en Desacuerdo", value: 4 }
]

export const rosenbergSelfEsteem: TestDefinition = {
    id: "rosenberg",
    title: "Escala de Autoestima de Rosenberg (EAR)",
    description: "Instrumento diseñado por Morris Rosenberg (1965) para evaluar la autoestima global. Es una de las escalas más utilizadas a nivel mundial. Validada para población hispanohablante por Martín-Albo et al. (2007) y para Chile por Cid (2004).",
    instructions: "A continuación encontrará una lista de afirmaciones en torno a los sentimientos o pensamientos que tiene sobre usted. Marque la respuesta que más lo identifica.",
    authors: "Rosenberg, M. (1965)",
    reference: "Rosenberg, M. (1965). Society and the Adolescent Self-Image. Princeton University Press.",
    questions: [
        {
            id: "q1",
            text: "Siento que soy una persona digna de aprecio, al menos en igual medida que los demás",
            type: "single_choice",
            options: optionsPositive
        },
        {
            id: "q2",
            text: "Creo que tengo un buen número de cualidades",
            type: "single_choice",
            options: optionsPositive
        },
        {
            id: "q3",
            text: "En general, me inclino a pensar que soy un fracasado/a",
            type: "single_choice",
            options: optionsNegative // Ítem inverso
        },
        {
            id: "q4",
            text: "Soy capaz de hacer las cosas tan bien como la mayoría de la gente",
            type: "single_choice",
            options: optionsPositive
        },
        {
            id: "q5",
            text: "Siento que no tengo muchos motivos para sentirme orgulloso/a de mí",
            type: "single_choice",
            options: optionsNegative // Ítem inverso
        },
        {
            id: "q6",
            text: "Tengo una actitud positiva hacia mí mismo/a",
            type: "single_choice",
            options: optionsPositive
        },
        {
            id: "q7",
            text: "En general, estoy satisfecho conmigo mismo/a",
            type: "single_choice",
            options: optionsPositive
        },
        {
            id: "q8",
            text: "Desearía valorarme más a mí mismo/a",
            type: "single_choice",
            options: optionsNegative // Ítem inverso
        },
        {
            id: "q9",
            text: "A veces me siento verdaderamente inútil",
            type: "single_choice",
            options: optionsNegative // Ítem inverso
        },
        {
            id: "q10",
            text: "A veces pienso que no soy bueno/a para nada",
            type: "single_choice",
            options: optionsNegative // Ítem inverso
        }
    ],
    scoring: {
        type: "sum",
        ranges: [
            { min: 10, max: 25, label: "Autoestima baja", color: "red", description: "Puntuación indicativa de problemas significativos de autoestima. Se recomienda intervención terapéutica focalizada en el fortalecimiento del autoconcepto y la autovalía." },
            { min: 26, max: 29, label: "Autoestima normal", color: "green", description: "Puntuación dentro del rango normativo. La persona presenta una valoración adecuada de sí misma, con un equilibrio saludable entre autocrítica y autoaceptación." },
            { min: 30, max: 40, label: "Autoestima alta", color: "blue", description: "Puntuación indicativa de una autoestima elevada. La persona presenta una valoración positiva de sí misma y confianza en sus capacidades." }
        ],
        interpretation: `
## Interpretación Clínica de la Escala de Autoestima de Rosenberg

La Escala de Autoestima de Rosenberg (EAR) es el instrumento más utilizado a nivel mundial para la evaluación de la autoestima global. Desarrollada por Morris Rosenberg en 1965, evalúa los sentimientos de respeto y aceptación de sí mismo/a.

### Estructura del Instrumento
- **10 ítems** tipo Likert de 4 puntos
- **5 ítems positivos** (1, 2, 4, 6, 7): formulados de manera directa
- **5 ítems negativos** (3, 5, 8, 9, 10): requieren puntuación inversa

### Puntos de Corte
- **10-25 puntos**: Autoestima baja - requiere atención clínica
- **26-29 puntos**: Autoestima normal - rango saludable
- **30-40 puntos**: Autoestima alta - valoración positiva de sí mismo

### Propiedades Psicométricas
- Alta consistencia interna (α de Cronbach: 0.87-0.92)
- Buena estabilidad test-retest
- Validez convergente con otras medidas de bienestar psicológico

### Consideraciones Clínicas
1. Puntuaciones bajas se asocian con síntomas depresivos y ansiosos
2. Útil como indicador de progreso terapéutico
3. Considerar factores culturales en la interpretación
4. Complementar con evaluación cualitativa del autoconcepto

### Referencias
- Rosenberg, M. (1965). Society and the Adolescent Self-Image. Princeton University Press.
- Martín-Albo, J., et al. (2007). The Rosenberg Self-Esteem Scale: Translation and validation in university students. The Spanish Journal of Psychology, 10(2), 458-467.
- Cid, P. (2004). Validación de la Escala de Autoestima de Rosenberg en población chilena.
        `
    }
}
