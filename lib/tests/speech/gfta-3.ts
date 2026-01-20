import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 101 }, (_, i) => ({ label: String(i), value: i }));

export const gfta3: TestDefinition = {
    id: 'gfta-3',
    title: 'Goldman-Fristoe Test of Articulation 3 (GFTA-3)',
    description: 'Evaluación estandarizada de la producción de sonidos consonánticos en palabras y oraciones (Articulación).',
    category: 'other', // Speech
    duration: '15-20 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Administre la prueba usando el cuaderno de estímulos. Registre las Puntuaciones Directas (Raw Scores).' },

        { id: 'sounds_words', text: 'Puntuación Directa: Sonidos en Palabras (0-100)', type: 'single_choice', options: scoreInput },
        { id: 'sounds_sentences', text: 'Puntuación Directa: Sonidos en Oraciones (0-100)', type: 'single_choice', options: scoreInput },
        { id: 'intelligibility', text: 'Inteligibilidad (Estimación %)', type: 'single_choice', options: scoreInput }
    ],
    scoring: {
        calculate: (answers) => {
            return {
                words: answers['sounds_words'] || 0,
                sentences: answers['sounds_sentences'] || 0,
                intelligibility: answers['intelligibility'] || 0
            };
        },
        interpret: (res: any) => {
            return 'Puntuaciones Directas - Palabras: ' + res.words + ', Oraciones: ' + res.sentences + ', Inteligibilidad: ' + res.intelligibility + '%. (Consultar manual para Puntuaciones Estándar).';
        }
    }
}
