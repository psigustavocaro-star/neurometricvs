import { TestDefinition } from '@/types/test'

const optionsRiskIfNo = [
    { label: 'Sí', value: 0 },
    { label: 'No', value: 1 },
]

const optionsRiskIfYes = [
    { label: 'Sí', value: 1 },
    { label: 'No', value: 0 },
]

export const mChatRF: TestDefinition = {
    id: 'm-chat-r-f',
    title: 'M-CHAT-R/F',
    description: 'Cuestionario Modificado de Detección de Autismo en Niños Pequeños, Revisado con Seguimiento (M-CHAT-R/F™). Herramienta de cribado de 2 etapas para evaluar el riesgo de Trastorno del Espectro Autista (TEA). Diseñado para niños de 16 a 30 meses.',
    instructions: 'Conteste las siguientes preguntas teniendo en cuenta el comportamiento que su hijo/a presenta usualmente. Si ha notado cierto comportamiento algunas veces, pero no es algo que hace usualmente, por favor conteste "No".',
    authors: 'Robins, D.L., Fein, D., & Barton, M. (2009)',
    reference: 'Robins, D. L., Casagrande, K., Barton, M., Chen, C. M., Dumont-Mathieu, T., & Fein, D. (2014). Validation of the modified checklist for autism in toddlers, revised with follow-up (M-CHAT-R/F). Pediatrics, 133(1), 37-45.',
    questions: [
        {
            id: '1',
            text: '1. Si usted señala algo al otro lado de la habitación, ¿su hijo/a lo mira? (Por ejemplo, si usted señala un juguete o un animal, ¿su hijo/a mira al juguete o al animal?)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '2',
            text: '2. ¿Alguna vez se ha preguntado si su hijo/a es sordo/a?',
            type: 'single_choice',
            options: optionsRiskIfYes
        },
        {
            id: '3',
            text: '3. ¿Su hijo/a juega juegos de fantasía o imaginación? (Por ejemplo, finge beber de una taza vacía, finge hablar por teléfono o finge darle de comer a una muñeca o un peluche)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '4',
            text: '4. ¿A su hijo/a le gusta treparse a las cosas? (Por ejemplo, muebles, juegos del parque o escaleras)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '5',
            text: '5. ¿Su hijo/a hace movimientos inusuales con los dedos cerca de sus ojos? (Por ejemplo, ¿mueve sus dedos cerca de sus ojos de manera inusual?)',
            type: 'single_choice',
            options: optionsRiskIfYes
        },
        {
            id: '6',
            text: '6. ¿Su hijo/a apunta o señala con un dedo cuando quiere pedir algo o pedir ayuda? (Por ejemplo, señala un juguete o algo de comer que está fuera de su alcance)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '7',
            text: '7. ¿Su hijo/a apunta o señala con un dedo cuando quiere mostrarle algo interesante? (Por ejemplo, señala un avión en el cielo o un camión muy grande)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '8',
            text: '8. ¿Su hijo/a muestra interés en otros niños? (Por ejemplo, ¿mira con atención a otros niños, les sonríe o se les acerca?)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '9',
            text: '9. ¿Su hijo/a le muestra cosas acercándoselas a usted o levantándolas para que usted las vea, no para pedir ayuda sino para compartirlas con usted? (Por ejemplo, le muestra una flor, un peluche o un carrito de juguete)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '10',
            text: '10. ¿Su hijo/a responde cuando usted le llama por su nombre? (Por ejemplo, ¿se voltea, habla o balbucea, o deja de hacer lo que estaba haciendo para mirarle?)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '11',
            text: '11. ¿Cuándo usted sonríe a su hijo/a, él o ella también le sonríe?',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '12',
            text: '12. ¿A su hijo/a le molestan los ruidos cotidianos? (Por ejemplo, ¿llora o grita cuando escucha la aspiradora o música fuerte?)',
            type: 'single_choice',
            options: optionsRiskIfYes
        },
        {
            id: '13',
            text: '13. ¿Su hijo/a camina?',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '14',
            text: '14. ¿Su hijo/a le mira a los ojos cuando usted le habla, juega con él o ella, o lo viste?',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '15',
            text: '15. Si usted voltea a ver algo, ¿su hijo/a trata de ver lo que usted está viendo?',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '16',
            text: '16. ¿Su hijo/a trata de copiar lo que usted hace? (Por ejemplo, decir adiós con la mano, aplaudir, o hacer un ruido gracioso)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '17',
            text: '17. ¿Su hijo/a trata que usted lo mire? (Por ejemplo, ¿busca que usted lo/la elogie, o le dice "mírame" o "mira"?)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '18',
            text: '18. ¿Su hijo/a le entiende cuando usted le dice que haga algo? (Por ejemplo, si usted no hace gestos, ¿su hijo/a entiende "pon el libro en la silla" o "tráeme la cobija"?)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '19',
            text: '19. ¿Si algo nuevo ocurre, su hijo/a lo mira a la cara para ver cómo se siente usted al respecto? (Por ejemplo, si oye un ruido extraño o ve un juguete nuevo, ¿se voltea a ver su cara?)',
            type: 'single_choice',
            options: optionsRiskIfNo
        },
        {
            id: '20',
            text: '20. ¿A su hijo/a le gusta que lo/la mezan o que lo/la hagan saltar en sus rodillas?',
            type: 'single_choice',
            options: optionsRiskIfNo
        }
    ],
    scoring: {
        type: 'sum',
        ranges: [
            { min: 0, max: 2, label: 'Riesgo Bajo', color: 'green', description: 'Si el niño es menor de 24 meses, repetir a los 24 meses. No se requiere otra acción.' },
            { min: 3, max: 7, label: 'Riesgo Medio', color: 'orange', description: 'Administrar la Entrevista de Seguimiento (M-CHAT-R/F) para obtener información adicional. Si el puntaje persiste ≥2, referir para evaluación.' },
            { min: 8, max: 20, label: 'Riesgo Alto', color: 'red', description: 'Referir inmediatamente para evaluación diagnóstica y elegibilidad para intervención temprana.' }
        ],
        interpretation: `
## Interpretación del M-CHAT-R/F

El M-CHAT-R/F es una herramienta de cribado para detectar riesgo de Trastorno del Espectro Autista (TEA) en niños pequeños (16-30 meses).

### Puntuación de Riesgo
La puntuación total representa el número de ítems fallados (respuestas de riesgo).

- **0-2 Puntos (Riesgo Bajo):** La probabilidad de TEA es baja.
  - Acción: Si el niño es menor de 24 meses, volver a evaluar a los 24 meses. Si tiene 24 meses o más, no se requiere acción a menos que la vigilancia del desarrollo indique riesgo.

- **3-7 Puntos (Riesgo Medio):** Indica la necesidad de seguimiento.
  - Acción: Se recomienda administrar la **Entrevista de Seguimiento** para aclarar las respuestas de riesgo. Si después de la entrevista el puntaje sigue siendo ≥2, el niño debe ser referido para una evaluación diagnóstica completa y evaluación de intervención temprana.

- **8-20 Puntos (Riesgo Alto):** Indica un riesgo elevado de TEA.
  - Acción: Se debe referir al niño inmediatamente para una evaluación diagnóstica y determinación de elegibilidad para intervención temprana. No es necesario realizar la Entrevista de Seguimiento.

### Referencias
Robins, D. L., Casagrande, K., Barton, M., Chen, C. M., Dumont-Mathieu, T., & Fein, D. (2014). Validation of the modified checklist for autism in toddlers, revised with follow-up (M-CHAT-R/F). *Pediatrics*, 133(1), 37-45.
        `
    },
    subscales: []
}
