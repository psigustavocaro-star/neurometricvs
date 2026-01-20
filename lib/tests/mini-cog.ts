import { TestDefinition } from '@/types/test'

export const miniCog: TestDefinition = {
    id: 'mini-cog',
    title: 'Mini-Cog',
    description: 'Instrumento de cribado rápido para detectar deterioro cognitivo.',
    instructions: 'Esta prueba debe ser administrada por el clínico. Registre los resultados aquí.',
    questions: [
        {
            id: 'word_registration',
            text: '1. Registro de Palabras: Diga "Plátano, Amanecer, Silla". Pídale al paciente que las repita.',
            type: 'info'
        },
        {
            id: 'clock_drawing',
            text: '2. Dibujo del Reloj: Pídale que dibuje un reloj con todos los números y las manecillas marcando las 11:10. ¿Es el reloj normal? (Todos los números en orden, manecillas correctas).',
            type: 'single_choice',
            options: [
                { label: 'Anormal', value: 0 },
                { label: 'Normal', value: 2 }
            ]
        },
        {
            id: 'word_recall',
            text: '3. Evocación: Pídale que repita las 3 palabras anteriores. Marque cuántas recordó correctamente.',
            type: 'single_choice',
            options: [
                { label: '0 palabras', value: 0 },
                { label: '1 palabra', value: 1 },
                { label: '2 palabras', value: 2 },
                { label: '3 palabras', value: 3 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 2, label: 'Probable deterioro cognitivo', color: 'red' },
            { min: 3, max: 5, label: 'Negativo para deterioro cognitivo', color: 'green' }
        ]
    }
}
