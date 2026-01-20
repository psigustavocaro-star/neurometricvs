import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 51 }, (_, i) => ({ label: String(i), value: i }));

export const tpl: TestDefinition = {
    id: 'tpl',
    title: 'Test de Procesamiento del Lenguaje (TPL)',
    description: 'Evaluación de habilidades de procesamiento lingüístico auditivo y expresivo.',
    category: 'other', // Speech
    duration: '20-30 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Registre las puntuaciones obtenidas en cada subescala.' },

        { id: 'sub1', text: 'Asociación de Palabras (0-50)', type: 'single_choice', options: scoreInput },
        { id: 'sub2', text: 'Categorización (0-50)', type: 'single_choice', options: scoreInput },
        { id: 'sub3', text: 'Analogías (0-50)', type: 'single_choice', options: scoreInput },
        { id: 'sub4', text: 'Definiciones (0-50)', type: 'single_choice', options: scoreInput },
        { id: 'sub5', text: 'Atributos (0-50)', type: 'single_choice', options: scoreInput }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            const keys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];
            keys.forEach(k => { if (answers[k]) total += answers[k]; });
            return total;
        },
        interpret: (score: any) => {
            return 'Puntuación Directa Total TPL: ' + score + '. (Consultar perfil de desarrollo del lenguaje).';
        }
    }
}
