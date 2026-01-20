import { TestDefinition } from '@/types/test'

const scoreInput = Array.from({ length: 49 }, (_, i) => ({ label: String(i), value: i }));

export const domino: TestDefinition = {
    id: 'domino',
    title: 'Test de Dominó (D-48)',
    description: 'Prueba de inteligencia general (Factor G). Evalúa la capacidad de abstracción y comprensión de relaciones lógicas mediante fichas de dominó.',
    category: 'pediatrics', // Also adults. Assuming pediatrics folder based on file location.
    // Valid for 12+ usually.
    duration: '25-30 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Administre la prueba usando el cuaderno de estimulos. Cuente los aciertos y regístrelos.' },

        { id: 'total_score', text: 'Puntuación Directa (Número de aciertos 0-48)', type: 'single_choice', options: scoreInput },

        { type: 'info', id: 'norm', text: 'Consulte el manual para convertir Puntuación Directa a Percentil o CI según edad.' }
    ],
    scoring: {
        calculate: (answers) => {
            return answers['total_score'] || 0;
        },
        interpret: (score: any) => {
            // Rough interpretation D-48 adults
            // 40-44: Superior
            // 34-39: Superior al término medio
            // 26-33: Término medio
            // 19-25: Inferior al término medio
            // < 18: Deficiente

            let interp = 'Término medio';
            if (score >= 40) interp = 'Superior';
            else if (score >= 34) interp = 'Superior al término medio';
            else if (score >= 26) interp = 'Término medio';
            else if (score >= 19) interp = 'Inferior al término medio';
            else interp = 'Deficiente';

            return 'Puntuación Directa: ' + score + '/48. Interpretación estimada (Adultos general): ' + interp + '.';
        }
    }
}
