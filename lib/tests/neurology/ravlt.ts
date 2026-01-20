import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 16 }, (_, i) => ({ label: String(i), value: i }));

export const ravlt: TestDefinition = {
    id: 'ravlt',
    title: 'Rey Auditory Verbal Learning Test (RAVLT)',
    description: 'Evaluación de la memoria verbal auditiva, aprendizaje y retención. Consta de 5 ensayos de aprendizaje, lista de interferencia y recuerdo diferido.',
    category: 'neurology',
    duration: '15 min (+ diferido)',
    questions: [
        { type: 'info', id: 'inst', text: 'Registre el número de palabras recordadas en cada ensayo (Lista A: 15 palabras).' },

        { id: 'a1', text: 'Ensayo A1 (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'a2', text: 'Ensayo A2 (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'a3', text: 'Ensayo A3 (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'a4', text: 'Ensayo A4 (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'a5', text: 'Ensayo A5 (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'b1', text: 'Lista B (Interferencia) (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'a6', text: 'Ensayo A6 (Recuerdo inmediato post-interferencia) (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'a7', text: 'Ensayo A7 (Recuerdo diferido 20-30 min) (0-15)', type: 'single_choice', options: scoreInput },
        { id: 'recog', text: 'Reconocimiento (Aciertos - Falsos Positivos) (0-15)', type: 'single_choice', options: scoreInput }
    ],
    scoring: {
        calculate: (answers) => {
            let totalLearning = 0;
            for (let i = 1; i <= 5; i++) {
                if (answers['a' + i]) totalLearning += answers['a' + i];
            }

            const retention = answers['a7'] || 0;
            const learningRate = (answers['a5'] || 0) - (answers['a1'] || 0);

            return { totalLearning, retention, learningRate, recall_a6: answers['a6'] || 0 };
        },
        interpret: (res: any) => {
            return 'Total Aprendizaje (A1-A5): ' + res.totalLearning + '/75. Recuerdo Diferido (A7): ' + res.retention + '/15. Tasa Aprendizaje (A5-A1): ' + res.learningRate + '.';
        }
    }
}
