import { TestDefinition } from '@/types/test'

export const crafft: TestDefinition = {
    id: 'crafft',
    title: 'CRAFFT 2.1 (Cuestionario de Salud para Adolescentes)',
    description: 'Screening de abuso de sustancias (alcohol y drogas) en adolescentes.',

    questions: [
        {
            id: 'q1',
            text: '¿Ha viajado alguna vez en un CARRO conducido por alguien (o usted mismo) que había consumido alcohol o drogas?',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q2',
            text: '¿Consume alguna vez alcohol o drogas para RELAJARSE, sentirse mejor o integrarse?',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q3',
            text: '¿Consume alguna vez alcohol o drogas mientras está SOLO?',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q4',
            text: '¿Alguna vez se le OLVIDAN cosas que hizo mientras consumía alcohol o drogas?',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q5',
            text: '¿Le han sugerido sus FAMILIARES o AMIGOS que disminuya el consumo?',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q6',
            text: '¿Se ha metido alguna vez en LÍOS o problemas al tomar alcohol o drogas?',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 1, label: 'Riesgo Bajo/Medio', color: 'green' },
            { min: 2, max: 6, label: 'Riesgo Alto (Evaluación Adicional Requerida)', color: 'red' }
        ]
    }
}
