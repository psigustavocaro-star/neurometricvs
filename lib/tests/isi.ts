import { TestDefinition } from '@/types/test'

const isiOptions = [
    { label: 'Nada / Muy satisfecho', value: 0 },
    { label: 'Un poco / Satisfecho', value: 1 },
    { label: 'Algo / Neutral', value: 2 },
    { label: 'Mucho / Insatisfecho', value: 3 },
    { label: 'Muchísimo / Muy insatisfecho', value: 4 }
]

export const isi: TestDefinition = {
    id: 'isi',
    title: 'ISI (Índice de Gravedad del Insomnio)',
    description: 'Evaluación de la naturaleza, gravedad e impacto del insomnio.',
    questions: [
        { id: 'q1', text: '1. Dificultad para conciliar el sueño.', type: 'single_choice', options: isiOptions },
        { id: 'q2', text: '2. Dificultad para mantener el sueño.', type: 'single_choice', options: isiOptions },
        { id: 'q3', text: '3. Problemas por despertarse demasiado pronto.', type: 'single_choice', options: isiOptions },
        { id: 'q4', text: '4. Satisfacción con patrón de sueño actual.', type: 'single_choice', options: isiOptions },
        { id: 'q5', text: '5. Interferencia con funcionamiento diario.', type: 'single_choice', options: isiOptions },
        { id: 'q6', text: '6. Notabilidad del problema de sueño para otros.', type: 'single_choice', options: isiOptions },
        { id: 'q7', text: '7. Preocupación/Angustia por el problema de sueño.', type: 'single_choice', options: isiOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 7, label: 'Sin insomnio clínicamente significativo', color: 'green' },
            { min: 8, max: 14, label: 'Insomnio subclínico', color: 'yellow' },
            { min: 15, max: 21, label: 'Insomnio clínico (moderado)', color: 'orange' },
            { min: 22, max: 28, label: 'Insomnio clínico (grave)', color: 'red' }
        ]
    }
}
