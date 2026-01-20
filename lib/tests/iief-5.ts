import { TestDefinition } from '@/types/test'

const iiefOptions = [
    { label: '1. Muy baja / Casi nunca', value: 1 },
    { label: '2. Baja / Pocas veces', value: 2 },
    { label: '3. Moderada / A veces', value: 3 },
    { label: '4. Alta / La mayoría de las veces', value: 4 },
    { label: '5. Muy alta / Casi siempre', value: 5 }
]

export const iief5: TestDefinition = {
    id: 'iief-5',
    title: 'IIEF-5 (Índice Internacional de Función Eréctil - 5 ítems)',
    description: 'Evaluación de la función eréctil durante los últimos 6 meses.',
    questions: [
        { id: 'q1', text: '1. ¿Cómo calificaría su confianza para lograr y mantener una erección?', type: 'single_choice', options: iiefOptions },
        { id: 'q2', text: '2. Cuando ha tenido erecciones con estimulación sexual, ¿con qué frecuencia fueron lo suficientemente duras para permitir la penetración?', type: 'single_choice', options: iiefOptions },
        { id: 'q3', text: '3. Durante las relaciones sexuales, ¿con qué frecuencia ha podido mantener su erección luego de penetrar a su pareja?', type: 'single_choice', options: iiefOptions },
        {
            id: 'q4', text: '4. Durante las relaciones sexuales, ¿qué tan difícil ha sido mantener su erección hasta completar la relación sexual? (Nota: Escala invertida en texto, aquí normalizada: 1=Extremadamente difícil... 5=Nada difícil).', type: 'single_choice', options: [
                { label: '1. Extremadamente difícil', value: 1 },
                { label: '2. Muy difícil', value: 2 },
                { label: '3. Moderadamente difícil', value: 3 },
                { label: '4. Algo difícil', value: 4 },
                { label: '5. Nada difícil', value: 5 }
            ]
        },
        { id: 'q5', text: '5. Cuando ha intentado tener relaciones sexuales, ¿con qué frecuencia han sido estas satisfactorias?', type: 'single_choice', options: iiefOptions }
    ],
    scoring: {
        ranges: [
            { min: 5, max: 7, label: 'Disfunción eréctil severa', color: 'red' },
            { min: 8, max: 11, label: 'Disfunción eréctil moderada', color: 'orange' },
            { min: 12, max: 16, label: 'Disfunción eréctil leve a moderada', color: 'yellow' },
            { min: 17, max: 21, label: 'Disfunción eréctil leve', color: 'green' },
            { min: 22, max: 25, label: 'No hay disfunción eréctil', color: 'green' }
        ]
    }
}
