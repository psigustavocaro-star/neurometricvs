import { TestDefinition } from '@/types/test'

const cornellOptions = [
    { label: 'a. No evaluado', value: 0 },
    { label: '0. Ausente', value: 0 },
    { label: '1. Leve o Intermitente', value: 1 },
    { label: '2. Severo', value: 2 }
]

export const cornell: TestDefinition = {
    id: 'cornell',
    title: 'Escala Cornell (Depresión en Demencia)',
    description: 'Evaluación de sintomatología depresiva en pacientes con demencia.',
    instructions: 'Puntúe cada ítem según la severidad y frecuencia.',
    questions: [
        { id: 'q1', text: '1. Ansiedad (expresión ansiosa, rumiaciones, preocupación).', type: 'single_choice', options: cornellOptions },
        { id: 'q2', text: '2. Tristeza (expresión triste, voz triste, llanto).', type: 'single_choice', options: cornellOptions },
        { id: 'q3', text: '3. Pérdida de reactividad frente a acontecimientos alegres.', type: 'single_choice', options: cornellOptions },
        { id: 'q4', text: '4. Irritabilidad (se molesta fácilmente).', type: 'single_choice', options: cornellOptions },
        { id: 'q5', text: '5. Agitación (inquietud, retorcerse las manos, tirarse del pelo).', type: 'single_choice', options: cornellOptions },
        { id: 'q6', text: '6. Retardo-lentitud (movimientos lentos, habla lenta).', type: 'single_choice', options: cornellOptions },
        { id: 'q7', text: '7. Múltiples quejas físicas (indigestión, estreñimiento, dolor).', type: 'single_choice', options: cornellOptions },
        { id: 'q8', text: '8. Pérdida de interés (menos implicado en actividades habituales).', type: 'single_choice', options: cornellOptions },
        { id: 'q9', text: '9. Pérdida de apetito (come menos de lo habitual).', type: 'single_choice', options: cornellOptions },
        { id: 'q10', text: '10. Pérdida de peso (puntuación 2 si >2kg en un mes).', type: 'single_choice', options: cornellOptions },
        { id: 'q11', text: '11. Pérdida de energía (se cansa fácilmente).', type: 'single_choice', options: cornellOptions },
        { id: 'q12', text: '12. Variación diurna de síntomas de ánimo (peor por la mañana o tarde).', type: 'single_choice', options: cornellOptions },
        { id: 'q13', text: '13. Dificultad para dormir (tarda en dormirse).', type: 'single_choice', options: cornellOptions },
        { id: 'q14', text: '14. Despertar múltiple durante el sueño.', type: 'single_choice', options: cornellOptions },
        { id: 'q15', text: '15. Despertar precoz o de madrugada.', type: 'single_choice', options: cornellOptions },
        { id: 'q16', text: '16. Suicidio (siente que la vida no merece la pena, intentos).', type: 'single_choice', options: cornellOptions },
        { id: 'q17', text: '17. Baja autoestima (se culpa, se siente fracasado).', type: 'single_choice', options: cornellOptions },
        { id: 'q18', text: '18. Pesimismo (anticipación de lo peor).', type: 'single_choice', options: cornellOptions },
        { id: 'q19', text: '19. Delirios congruentes al ánimo (pobreza, enfermedad, pérdida).', type: 'single_choice', options: cornellOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 8, label: 'Sin Depresión', color: 'green' },
            { min: 9, max: 11, label: 'Depresión Leve', color: 'orange' },
            { min: 12, max: 38, label: 'Depresión Grave', color: 'red' }
        ]
    }
}
