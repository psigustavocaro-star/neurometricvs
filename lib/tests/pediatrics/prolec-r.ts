import { TestDefinition } from '@/types/test'

const classificationOptions = [
    { label: "DD - Dificultad Definida", value: 0 },
    { label: "D - Dificultad", value: 1 },
    { label: "N - Normal", value: 2 },
    { label: "A - Alto / Superior", value: 3 }
]

export const prolecR: TestDefinition = {
    id: 'prolec-r',
    title: 'PROLEC-R (Batería de Evaluación de los Procesos Lectores, Revisada)',
    description: 'Batería para evaluar los procesos lectores en niños de 6 a 12 años. Identificación de letras, procesos léxicos, sintácticos y semánticos.',
    category: 'pediatrics',
    duration: '20-40 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Ingrese la clasificación (DD, D, N, A) obtenida para cada índice principal según el perfil del alumno.' },

        { id: 'nl', text: 'Nombre de Letras', type: 'single_choice', options: classificationOptions },
        { id: 'id', text: 'Igual - Diferente', type: 'single_choice', options: classificationOptions },
        { id: 'lp', text: 'Lectura de Palabras', type: 'single_choice', options: classificationOptions },
        { id: 'ls', text: 'Lectura de Pseudopalabras', type: 'single_choice', options: classificationOptions },
        { id: 'eg', text: 'Estructuras Gramaticales', type: 'single_choice', options: classificationOptions },
        { id: 'sp', text: 'Signos de Puntuación', type: 'single_choice', options: classificationOptions },
        { id: 'co', text: 'Comprensión de Oraciones', type: 'single_choice', options: classificationOptions },
        { id: 'ct', text: 'Comprensión de Textos', type: 'single_choice', options: classificationOptions },
        { id: 'co_total', text: 'Comprensión Oral', type: 'single_choice', options: classificationOptions }
    ],
    scoring: {
        calculate: (answers) => {
            // Count difficulties
            let difficulties = 0;
            let severe = 0;
            Object.values(answers).forEach(v => {
                if (v === 0) severe++;
                if (v === 1) difficulties++;
            });
            return { severe, difficulties };
        },
        interpret: (res: any) => {
            return 'Perfil PROLEC-R: ' + res.severe + ' índices con Dificultad Definida (DD) y ' + res.difficulties + ' con Dificultad Leve (D).';
        }
    }
}
