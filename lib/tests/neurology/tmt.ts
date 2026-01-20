import { TestDefinition } from '@/types/test'

const secondsInput = Array.from({ length: 301 }, (_, i) => ({ label: String(i), value: i })); // 0-300s
const errorInput = Array.from({ length: 21 }, (_, i) => ({ label: String(i), value: i }));

export const tmt: TestDefinition = {
    id: 'tmt',
    title: 'Trail Making Test (TMT) - Partes A y B',
    description: 'Evaluación de velocidad de procesamiento visual, atención y flexibilidad mental (funciones ejecutivas).',
    category: 'neurology',
    duration: '5-10 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Instrucciones: Cronometre el tiempo que tarda el paciente en completar cada parte y cuente los errores.' },

        { type: 'info', id: 'part_a', text: 'Parte A (Números: 1-2-3...)' },
        { id: 'time_a', text: 'Tiempo Parte A (segundos)', type: 'single_choice', options: secondsInput },
        { id: 'errors_a', text: 'Errores Parte A', type: 'single_choice', options: errorInput },

        { type: 'info', id: 'part_b', text: 'Parte B (Alternancia: 1-A-2-B...)' },
        { id: 'time_b', text: 'Tiempo Parte B (segundos)', type: 'single_choice', options: secondsInput },
        { id: 'errors_b', text: 'Errores Parte B', type: 'single_choice', options: errorInput }
    ],
    scoring: {
        calculate: (answers) => {
            return {
                timeA: answers['time_a'] || 0,
                timeB: answers['time_b'] || 0,
                errorsA: answers['errors_a'] || 0,
                errorsB: answers['errors_b'] || 0,
                diff: (answers['time_b'] || 0) - (answers['time_a'] || 0)
            };
        },
        interpret: (res: any) => {
            // General cut-offs
            let interpA = 'Normal';
            let interpB = 'Normal';
            if (res.timeA > 78) interpA = 'Déficit severo';
            else if (res.timeA > 40) interpA = 'Lentitud';

            if (res.timeB > 273) interpB = 'Déficit severo';
            else if (res.timeB > 90) interpB = 'Lentitud / Déficit ejecutivo';

            return 'Parte A: ' + res.timeA + 's (' + interpA + '). Parte B: ' + res.timeB + 's (' + interpB + '). Diferencia B-A: ' + res.diff + 's.';
        }
    }
}
