import { TestDefinition } from '@/types/test'

const scoreInput = (max: number) => Array.from({ length: max + 1 }, (_, i) => ({ label: String(i), value: i }));

export const bcat: TestDefinition = {
    id: 'bcat',
    title: 'Brief Cognitive Assessment Tool (BCAT)',
    description: 'Herramienta cogniva breve para detectar deterioro cognitivo leve (MCI) y demencia. Versión de cribado.',
    category: 'neurology',
    duration: '10-15 min',
    questions: [
        { type: 'info', id: 'intro', text: 'Instrucciones: Administre los items verbalmente y registre la puntuación.' },

        { id: 'orientation', text: '1. Orientación (Fecha, Año, Día, Mes) (0-4)', type: 'single_choice', options: scoreInput(4) },
        { id: 'naming', text: '2. Denominación (Nombrar animales en 1 min / o items específicos) (0-4)', type: 'single_choice', options: scoreInput(4) }, // Simplified item
        { id: 'memory_immed', text: '3. Memoria Inmediata (Repetir lista palabras) (0-3)', type: 'single_choice', options: scoreInput(3) },
        { id: 'digits', text: '4. Dígitos hacia atrás (0-3)', type: 'single_choice', options: scoreInput(3) },
        { id: 'verbal_fluency', text: '5. Fluidez Verbal (Palabras con L, S, etc) (0-3)', type: 'single_choice', options: scoreInput(3) },
        { id: 'memory_delayed', text: '6. Memoria Diferida (Recuerdo palabras) (0-4)', type: 'single_choice', options: scoreInput(4) }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            const keys = ['orientation', 'naming', 'memory_immed', 'digits', 'verbal_fluency', 'memory_delayed'];
            keys.forEach(k => { if (answers[k]) total += answers[k]; });
            return total;
        },
        interpret: (score: any) => {
            // Max 21.
            // < 16 suggests impairment? 
            // (Rough normative reference for digitized version if exact cut-off unknown).
            return 'Puntuación Total BCAT: ' + score + '/21. (Puntuaciones bajas sugieren deterioro cognitivo).';
        }
    }
}
