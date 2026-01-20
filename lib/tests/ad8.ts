import { TestDefinition } from '@/types/test'

const ad8Options = [
    { label: 'Sí, hay cambios', value: 1 },
    { label: 'No, no hay cambios', value: 0 },
    { label: 'N/A, No sé', value: 0 }
]

export const ad8: TestDefinition = {
    id: 'ad8',
    title: 'AD8-Ch (Cuestionario para Informante)',
    description: 'Entrevista al informante para diferenciar entre envejecimiento normal y demencia.',
    instructions: 'Marque "Sí, hay cambios" si ha habido un cambio en los últimos años debido a problemas cognitivos.',
    questions: [
        { id: 'q1', text: '1. Problemas de juicio (ej. toma malas decisiones, cae en estafas).', type: 'single_choice', options: ad8Options },
        { id: 'q2', text: '2. Menor interés en realizar actividades o sus pasatiempos.', type: 'single_choice', options: ad8Options },
        { id: 'q3', text: '3. Repite las preguntas, historias.', type: 'single_choice', options: ad8Options },
        { id: 'q4', text: '4. Tiene dificultad para aprender a usar instrumentos (control remoto, etc.).', type: 'single_choice', options: ad8Options },
        { id: 'q5', text: '5. Olvida el mes o año.', type: 'single_choice', options: ad8Options },
        { id: 'q6', text: '6. Tiene dificultad en el manejo de asuntos financieros complejos.', type: 'single_choice', options: ad8Options },
        { id: 'q7', text: '7. Tiene dificultad para acordarse de los compromisos.', type: 'single_choice', options: ad8Options },
        { id: 'q8', text: '8. Problema persistente de memoria y pensamiento.', type: 'single_choice', options: ad8Options }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 1, label: 'Normal', color: 'green' },
            { min: 2, max: 8, label: 'Probable Deterioro Cognitivo (Se sugiere evaluación)', color: 'red' }
        ]
    }
}
