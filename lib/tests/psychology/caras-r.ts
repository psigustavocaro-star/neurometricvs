import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 61 }, (_, i) => ({ label: String(i), value: i }));

export const carasR: TestDefinition = {
    id: 'caras-r',
    title: 'Test de Percepción de Diferencias (CARAS-R)',
    description: 'Evaluación de la atención sostenida y selectiva, y de la eficacia perceptiva. El sujeto debe identificar, en bloques de 3 caras, cuál es diferente.',
    category: 'psychology', // NeuroPsych
    duration: '3 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Instrucciones: El sujeto tiene 3 minutos para identificar la cara diferente en 60 elementos gráficos. Cuente Aciertos (A) y Errores (E).' },

        { id: 'aciertos', text: 'Número de Aciertos (A) (0-60)', type: 'single_choice', options: scoreInput },
        { id: 'errores', text: 'Número de Errores (E) (0-60)', type: 'single_choice', options: scoreInput },

        { type: 'info', id: 'calc', text: 'El sistema calculará:\n- Aciertos Netos (A-E)\n- Índice de Control de Impulsividad (ICI)' }
    ],
    scoring: {
        calculate: (answers) => {
            const a = answers['aciertos'] || 0;
            const e = answers['errores'] || 0;

            const aciertosNetos = a - e;
            const ici = a > 0 ? ((a - e) / a) * 100 : 0;

            return { aciertos: a, errores: e, netos: aciertosNetos, ici: Math.round(ici * 100) / 100 };
        },
        interpret: (res: any) => {
            return 'Aciertos Netos (Eficacia): ' + res.netos + '. ICI: ' + res.ici + '%. (Aciertos: ' + res.aciertos + ', Errores: ' + res.errores + '). Comparar con baremos por edad.';
        }
    }
}
