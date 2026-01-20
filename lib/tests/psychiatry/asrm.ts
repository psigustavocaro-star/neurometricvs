import { TestDefinition } from '@/types/test'

const likertOptions = [
    { label: "0 - No aplica", value: 0 },
    { label: "1 - Un poco", value: 1 },
    { label: "2 - Algo", value: 2 },
    { label: "3 - Moderadamente", value: 3 },
    { label: "4 - Mucho", value: 4 }
]

export const asrm: TestDefinition = {
    id: 'asrm',
    title: 'Altman Self-Rating Mania Scale (ASRM)',
    description: 'Escala de autoinforme de 5 ítems para evaluar síntomas maníacos/hipomaníacos en la última semana.',
    category: 'psychiatry',
    duration: '2-5 min',
    questions: [
        { id: 'q1', text: '1. Me siento más feliz/optimista de lo habitual.', type: 'single_choice', options: likertOptions },
        { id: 'q2', text: '2. Me siento más seguro/a de mí mismo/a de lo habitual.', type: 'single_choice', options: likertOptions },
        { id: 'q3', text: '3. Necesito menos sueño de lo habitual.', type: 'single_choice', options: likertOptions },
        { id: 'q4', text: '4. Hablo más de lo habitual.', type: 'single_choice', options: likertOptions },
        { id: 'q5', text: '5. He estado más activo/a de lo habitual.', type: 'single_choice', options: likertOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            for (let i = 1; i <= 5; i++) {
                if (answers['q' + i] !== undefined) total += answers['q' + i];
            }
            return total;
        },
        interpret: (score: any) => {
            // ASRM: 0-20. >= 6 suggests probable mania/hypomania
            let severity = 'Normal';
            if (score >= 6) severity = 'Probable manía/hipomanía';

            return 'Puntuación ASRM: ' + score + '/20. Clasificación: ' + severity + '.';
        }
    }
}
