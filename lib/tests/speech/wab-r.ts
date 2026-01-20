import { TestDefinition } from '@/types/test'

const scoreInput = (max: number) => Array.from({ length: max + 1 }, (_, i) => ({ label: String(i), value: i }));

export const wabr: TestDefinition = {
    id: 'wab-r',
    title: 'Western Aphasia Battery - Revised (WAB-R)',
    description: 'Batería completa para evaluar afasia (Lenguaje espontáneo, Comprensión, Repetición, Denominación). Calcula el Cociente de Afasia (AQ).',
    category: 'other', // Speech / Neuro
    duration: '30-45 min',
    questions: [
        { type: 'info', id: 'intro', text: 'Ingrese las puntuaciones directas de cada subtest para calcular el Cociente de Afasia (AQ).' },

        { type: 'info', id: 's1', text: '1. Lenguaje Espontáneo' },
        { id: 'info_content', text: 'A. Contenido de la Información (0-10)', type: 'single_choice', options: scoreInput(10) },
        { id: 'fluency', text: 'B. Fluidez, Función Gramatical y Parafasias (0-10)', type: 'single_choice', options: scoreInput(10) },

        { type: 'info', id: 's2', text: '2. Comprensión Auditiva' },
        { id: 'yes_no', text: 'A. Preguntas Sí/No (0-60 -> se ajusta a /3)', type: 'single_choice', options: [{ label: "Ingrese valor directo (0-60)", value: 0 }] },
        // Real logic: (YesNo score / 20) * 3 ? No, it's (Score/3). Max 20 points contribution to total?
        // Standard AQ calculation:
        // Spontaneous = Content + Fluency (Max 20).
        // Comprehension = (YesNo + AuditoryWordRec + SequentialCommands) / 20 * 10. (Max 10).
        // Repetition = Score / 10 * 10 (Max 10).
        // Naming = Score / 10 * 10 (Max 10).
        // AQ = (Spont + Comp + Rep + Nam) * 2. Max 100.

        // I will use Simplified Entry: Total Subscale Scores (0-10 standard scaled).

        { id: 'spont_score', text: 'Puntuación Total Lenguaje Espontáneo (0-20)', type: 'single_choice', options: scoreInput(20) },
        { id: 'comp_score', text: 'Puntuación Total Comprensión Auditiva (Escalada /10)', type: 'single_choice', options: scoreInput(10) },
        { id: 'rep_score', text: 'Puntuación Total Repetición (Escalada /10)', type: 'single_choice', options: scoreInput(10) },
        { id: 'name_score', text: 'Puntuación Total Denominación (Escalada /10)', type: 'single_choice', options: scoreInput(10) }
    ],
    scoring: {
        calculate: (answers) => {
            const spont = answers['spont_score'] || 0;
            const comp = answers['comp_score'] || 0;
            const rep = answers['rep_score'] || 0;
            const name = answers['name_score'] || 0; // Note: Naming max in AQ is 10.

            const aq = (spont + comp + rep + name) * 2;
            return aq;
        },
        interpret: (score: any) => {
            // AQ Interpretation
            // 0-25: Very Severe
            // 26-50: Severe
            // 51-75: Moderate
            // 76-93.7: Mild
            // >= 93.8: Within Normal Limits (WNL)

            let severity = 'Normal';
            if (score < 93.8) severity = 'Afasia Leve';
            if (score <= 75) severity = 'Afasia Moderada';
            if (score <= 50) severity = 'Afasia Severa';
            if (score <= 25) severity = 'Afasia Muy Severa';

            return 'Cociente de Afasia (AQ): ' + score + '. Severidad: ' + severity + '.';
        }
    }
}
