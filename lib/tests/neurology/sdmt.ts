import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 111 }, (_, i) => ({ label: String(i), value: i }));

export const sdmt: TestDefinition = {
    id: 'sdmt',
    title: 'Symbol Digit Modalities Test (SDMT)',
    description: 'Evaluación de la velocidad de procesamiento de la información, escaneo visual y atención. Se pide al sujeto sustituir símbolos por dígitos según una clave en 90 segundos.',
    category: 'neurology',
    duration: '90 seg (+ práctica)',
    questions: [
        { type: 'info', id: 'inst', text: 'Administre la prueba durante 90 segundos. Cuente el número de respuestas correctas.' },

        { id: 'correct', text: 'Respuestas Correctas (0-110)', type: 'single_choice', options: scoreInput },
        { id: 'errors', text: 'Errores (Opcional)', type: 'single_choice', options: scoreInput }
    ],
    scoring: {
        calculate: (answers) => {
            return {
                correct: answers['correct'] || 0,
                errors: answers['errors'] || 0
            };
        },
        interpret: (res: any) => {
            return 'Puntuación Directa: ' + res.correct + ' correctas en 90s. (Ver tablas normativas).';
        }
    }
}
