import { TestDefinition } from '@/types/test'

const fsfiFrequency = [
    { label: '0 = Sin actividad sexual', value: 0 },
    { label: '1 = Casi nunca o nunca', value: 1 },
    { label: '2 = Pocas veces', value: 2 },
    { label: '3 = A veces', value: 3 },
    { label: '4 = La mayoría de las veces', value: 4 },
    { label: '5 = Casi siempre o siempre', value: 5 }
]

const fsfiLevel = [
    { label: '0 = Sin actividad sexual', value: 0 },
    { label: '1 = Muy bajo o nada', value: 1 },
    { label: '2 = Bajo', value: 2 },
    { label: '3 = Moderado', value: 3 },
    { label: '4 = Alto', value: 4 },
    { label: '5 = Muy alto', value: 5 }
]

const fsfiDifficulty = [
    { label: '0 = Sin actividad sexual', value: 0 },
    { label: '1 = Extremadamente difícil', value: 1 },
    { label: '2 = Muy difícil', value: 2 },
    { label: '3 = Difícil', value: 3 },
    { label: '4 = Un poco difícil', value: 4 },
    { label: '5 = Sin dificultad', value: 5 }
]

const fsfiSatisfaction = [
    { label: '0 = Sin actividad sexual', value: 0 },
    { label: '1 = Muy insatisfecha', value: 1 },
    { label: '2 = Moderadamente insatisfecha', value: 2 },
    { label: '3 = Ni satisfecha ni insatisfecha', value: 3 },
    { label: '4 = Moderadamente satisfecha', value: 4 },
    { label: '5 = Muy satisfecha', value: 5 }
]

const fsfiPainFrequency = [
    { label: '0 = Sin coito vaginal', value: 0 },
    { label: '1 = Casi siempre o siempre', value: 1 },
    { label: '2 = La mayoría de las veces', value: 2 },
    { label: '3 = A veces', value: 3 },
    { label: '4 = Pocas veces', value: 4 },
    { label: '5 = Casi nunca o nunca', value: 5 }
]

const fsfiPainLevel = [
    { label: '0 = Sin coito vaginal', value: 0 },
    { label: '1 = Muy alto', value: 1 },
    { label: '2 = Alto', value: 2 },
    { label: '3 = Moderado', value: 3 },
    { label: '4 = Bajo', value: 4 },
    { label: '5 = Muy bajo o nada', value: 5 }
]

export const fsfi: TestDefinition = {
    id: 'fsfi',
    title: 'FSFI (Índice de Función Sexual Femenina)',
    description: 'Evaluación de la función sexual femenina en 6 dominios: Deseo, Excitación, Lubricación, Orgasmo, Satisfacción y Dolor.',
    instructions: 'Responda pensando en las últimas 4 semanas.',
    questions: [
        { id: 'q1', text: '1. Frecuencia de deseo o interés sexual.', type: 'single_choice', options: fsfiFrequency },
        { id: 'q2', text: '2. Nivel de deseo o interés sexual.', type: 'single_choice', options: fsfiLevel },
        { id: 'q3', text: '3. Frecuencia de excitación sexual.', type: 'single_choice', options: fsfiFrequency },
        { id: 'q4', text: '4. Nivel de excitación sexual.', type: 'single_choice', options: fsfiLevel },
        { id: 'q5', text: '5. Confianza para conseguirse excitar.', type: 'single_choice', options: fsfiLevel },
        { id: 'q6', text: '6. Frecuencia de satisfacción con su excitación.', type: 'single_choice', options: fsfiFrequency },
        { id: 'q7', text: '7. Frecuencia de lubricación vaginal.', type: 'single_choice', options: fsfiFrequency },
        { id: 'q8', text: '8. Dificultad para lubricarse.', type: 'single_choice', options: fsfiDifficulty },
        { id: 'q9', text: '9. Frecuencia de mantener lubricación.', type: 'single_choice', options: fsfiFrequency },
        { id: 'q10', text: '10. Dificultad para mantener lubricación.', type: 'single_choice', options: fsfiDifficulty },
        { id: 'q11', text: '11. Frecuencia de orgasmo.', type: 'single_choice', options: fsfiFrequency },
        { id: 'q12', text: '12. Dificultad para alcanzar el orgasmo.', type: 'single_choice', options: fsfiDifficulty },
        { id: 'q13', text: '13. Satisfacción con capacidad para alcanzar orgasmo.', type: 'single_choice', options: fsfiSatisfaction },
        { id: 'q14', text: '14. Satisfacción con acercamiento emocional.', type: 'single_choice', options: fsfiSatisfaction },
        { id: 'q15', text: '15. Satisfacción con relación sexual.', type: 'single_choice', options: fsfiSatisfaction },
        { id: 'q16', text: '16. Satisfacción con vida sexual en general.', type: 'single_choice', options: fsfiSatisfaction },
        { id: 'q17', text: '17. Frecuencia de molestias/dolor durante coito.', type: 'single_choice', options: fsfiPainFrequency },
        { id: 'q18', text: '18. Frecuencia de molestias/dolor después del coito.', type: 'single_choice', options: fsfiPainFrequency },
        { id: 'q19', text: '19. Nivel de dolor/molestias.', type: 'single_choice', options: fsfiPainLevel }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 26, label: 'Riesgo de Disfunción Sexual (Corte < 26.55)', color: 'red' },
            { min: 27, max: 36, label: 'Sin Disfunción Sexual', color: 'green' }
        ]
        // Note: Full scoring requires domain factors. Simple sum approximation here.
    }
}
