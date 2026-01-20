import { TestDefinition } from '@/types/test'

const options = [
    { label: "1 - Baja ansiedad", value: 1 },
    { label: "2 - Alguna ansiedad", value: 2 },
    { label: "3 - Ansiedad moderada", value: 3 },
    { label: "4 - Bastante ansiedad", value: 4 },
    { label: "5 - Alta ansiedad", value: 5 }
]

export const mAmas: TestDefinition = {
    id: 'm-amas',
    title: 'Escala de Ansiedad Matemática Modificada (mAMAS)',
    description: 'Cuestionario breve para evaluar la ansiedad relacionada con las matemáticas en estudiantes.',
    category: 'pediatrics', // Fits well here or psychology
    duration: '5 min',
    questions: [
        { id: 'q1', text: '1. Tener un examen sorpresa de matemáticas.', type: 'single_choice', options },
        { id: 'q2', text: '2. Pensar en el examen de matemáticas de mañana.', type: 'single_choice', options },
        { id: 'q3', text: '3. Ver al profesor trabajar un problema en la pizarra.', type: 'single_choice', options },
        { id: 'q4', text: '4. Hacer un examen de matemáticas.', type: 'single_choice', options },
        { id: 'q5', text: '5. Tareas para casa con muchos problemas difíciles.', type: 'single_choice', options },
        { id: 'q6', text: '6. Escuchar una lección de matemáticas.', type: 'single_choice', options },
        { id: 'q7', text: '7. Escuchar a otro estudiante explicar una fórmula matemática.', type: 'single_choice', options },
        { id: 'q8', text: '8. Hacer un quiz (prueba corta) de matemáticas.', type: 'single_choice', options },
        { id: 'q9', text: '9. Empezar un nuevo capítulo de matemáticas.', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            Object.values(answers).forEach(val => {
                if (typeof val === 'number') total += val;
            });
            return total;
        },
        interpret: (score) => {
            // Range 9-45.
            // No strict cutoffs universally, but higher score = higher anxiety.
            let level = 'Baja';
            if (score >= 19) level = 'Moderada';
            if (score >= 31) level = 'Alta'; // Approximate based on literature (Carey et al.)

            return `Puntuación Total: ${score}. Nivel de Ansiedad Matemática: ${level}.`;
        }
    }
}
