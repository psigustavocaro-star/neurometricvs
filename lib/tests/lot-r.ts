import { TestDefinition } from '@/types/test'

const options = [
    { label: 'Estoy completamente en desacuerdo', value: 0 },
    { label: 'Estoy parcialmente en desacuerdo', value: 1 },
    { label: 'No estoy ni de acuerdo ni en desacuerdo', value: 2 },
    { label: 'Estoy de acuerdo parcialmente', value: 3 },
    { label: 'Estoy de acuerdo completamente', value: 4 }
]

const optionsReverse = [
    { label: 'Estoy completamente en desacuerdo', value: 4 },
    { label: 'Estoy parcialmente en desacuerdo', value: 3 },
    { label: 'No estoy ni de acuerdo ni en desacuerdo', value: 2 },
    { label: 'Estoy de acuerdo parcialmente', value: 1 },
    { label: 'Estoy de acuerdo completamente', value: 0 }
]

export const lotR: TestDefinition = {
    id: 'lot-r',
    title: 'LOT-R (Test de Orientación Vital - Revisado)',
    description: 'Evaluación del optimismo disposicional.',
    questions: [
        { id: 'q1', text: '1. En tiempos de incertidumbre, generalmente pienso que me va a ocurrir lo mejor.', type: 'single_choice', options: options },
        { id: 'q3', text: '3. Si algo malo me puede pasar, estoy seguro(a) que me pasará.', type: 'single_choice', options: optionsReverse },
        { id: 'q4', text: '4. Siempre soy optimista en cuanto al futuro.', type: 'single_choice', options: options },
        { id: 'q7', text: '7. Rara vez espero que las cosas salgan a mi manera.', type: 'single_choice', options: optionsReverse },
        { id: 'q9', text: '9. No espero que cosas buenas me sucedan.', type: 'single_choice', options: optionsReverse },
        { id: 'q10', text: '10. En general, yo pienso que más cosas buenas que malas me van a suceder.', type: 'single_choice', options: options }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 13, label: 'Pesimismo', color: 'orange' },
            { min: 14, max: 18, label: 'Moderado', color: 'yellow' },
            { min: 19, max: 24, label: 'Optimismo', color: 'green' }
        ]
    }
}
