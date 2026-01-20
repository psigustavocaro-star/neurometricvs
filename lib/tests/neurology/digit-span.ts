import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 17 }, (_, i) => ({ label: String(i), value: i }));

export const digitSpan: TestDefinition = {
    id: 'digit-span',
    title: 'Dígitos (Digit Span - WAIS)',
    description: 'Evaluación de la memoria de trabajo y atención auditiva inmediata. Consta de Dígitos Directos, Inversos y (opcionalmente) Crecientes.',
    category: 'neurology',
    duration: '5-10 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Administre las series de dígitos. Registre la Puntuación Directa (suma de items correctos) para cada parte.' },

        { id: 'forward', text: 'Dígitos Directos (0-16)', type: 'single_choice', options: scoreInput },
        { id: 'backward', text: 'Dígitos Inversos (0-16)', type: 'single_choice', options: scoreInput },
        { id: 'sequencing', text: 'Dígitos Crecientes (Opcional) (0-16)', type: 'single_choice', options: scoreInput }
    ],
    scoring: {
        calculate: (answers) => {
            const f = answers['forward'] || 0;
            const b = answers['backward'] || 0;
            const s = answers['sequencing'] || 0;
            return { forward: f, backward: b, sequencing: s, total: f + b + s };
        },
        interpret: (res: any) => {
            return 'Puntuación Directa Total: ' + res.total + '. (Directos: ' + res.forward + ', Inversos: ' + res.backward + ', Crecientes: ' + res.sequencing + ').';
        }
    }
}
