import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 151 }, (_, i) => ({ label: String(i), value: i }));

export const stroop: TestDefinition = {
    id: 'stroop',
    title: 'Stroop Color and Word Test',
    description: 'Evaluación de funciones ejecutivas (inhibición cognitiva/interferencia). Consta de tres láminas: Palabras (P), Colores (C) y Palabras-Colores (PC).',
    category: 'neurology',
    duration: '5 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Administre cada lámina durante 45 segundos (versión Golden). Cuente el número de items leídos correctamente.' },

        { id: 'p_score', text: '1. Palabras (P) - Nº Correctos', type: 'single_choice', options: scoreInput },
        { id: 'c_score', text: '2. Colores (C) - Nº Correctos', type: 'single_choice', options: scoreInput },
        { id: 'pc_score', text: '3. Palabras-Colores (PC) - Nº Correctos', type: 'single_choice', options: scoreInput }
    ],
    scoring: {
        calculate: (answers) => {
            const P = answers['p_score'] || 0;
            const C = answers['c_score'] || 0;
            const PC = answers['pc_score'] || 0;

            let predictedPC = 0;
            if (P + C > 0) predictedPC = (P * C) / (P + C);

            const interference = PC - predictedPC;

            return { P, C, PC, interference: Math.round(interference * 100) / 100 };
        },
        interpret: (res: any) => {
            let interp = 'Promedio';
            if (res.interference > 10) interp = 'Buena resistencia a interferencia';
            if (res.interference < -10) interp = 'Baja resistencia a interferencia (Déficit inhibitorio)';

            return 'Puntuaciones Directas - P: ' + res.P + ', C: ' + res.C + ', PC: ' + res.PC + '. Interferencia: ' + res.interference + ' (' + interp + ').';
        }
    }
}
