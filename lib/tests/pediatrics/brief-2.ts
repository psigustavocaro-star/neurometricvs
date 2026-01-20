import { TestDefinition } from '@/types/test'

const freqOptions = [
    { label: "N - Nunca", value: 1 },
    { label: "A - A veces", value: 2 },
    { label: "F - Frecuentemente", value: 3 }
]

export const brief2: TestDefinition = {
    id: 'brief-2',
    title: 'BRIEF-2 (Screening de Funciones Ejecutivas)',
    description: 'Inventario de Evaluación Conductual de la Función Ejecutiva. Versión de cribado para identificar dificultades en regulación conductual, emocional y cognitiva.',
    category: 'pediatrics',
    duration: '5-10 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Indique la frecuencia de los comportamientos en los últimos 6 meses.' },

        { id: 'q1', text: '1. Se molesta con facilidad ante cambios menores (Flexibilidad).', type: 'single_choice', options: freqOptions },
        { id: 'q2', text: '2. Tiene explosiones de ira (Control Emocional).', type: 'single_choice', options: freqOptions },
        { id: 'q3', text: '3. Actúa de forma impulsiva (Inhibición).', type: 'single_choice', options: freqOptions },
        { id: 'q4', text: '4. Tiene dificultad para terminar las tareas (Iniciación/Memoria).', type: 'single_choice', options: freqOptions },
        { id: 'q5', text: '5. Es desordenado/a con sus cosas (Organización de Materiales).', type: 'single_choice', options: freqOptions },
        { id: 'q6', text: '6. Olvida lo que tiene que hacer (Memoria de Trabajo).', type: 'single_choice', options: freqOptions },
        { id: 'q7', text: '7. Se distrae fácilmente (Monitorización).', type: 'single_choice', options: freqOptions },
        { id: 'q8', text: '8. Tiene problemas para aceptar que las cosas no salgan como quiere.', type: 'single_choice', options: freqOptions },
        { id: 'q9', text: '9. Interrumpe a los demás (Inhibición).', type: 'single_choice', options: freqOptions },
        { id: 'q10', text: '10. Tiene dificultad para planificar tareas escolares (Planificación).', type: 'single_choice', options: freqOptions },
        { id: 'q11', text: '11. Deja el trabajo para el último momento.', type: 'single_choice', options: freqOptions },
        { id: 'q12', text: '12. Sus cambios de humor son intensos.', type: 'single_choice', options: freqOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            for (let i = 1; i <= 12; i++) {
                if (answers['q' + i]) total += answers['q' + i];
            }
            return total;
        },
        interpret: (score: any) => {
            // 12 items * 3 = 36 max. Min 12.
            // Higher score = More dysfunction.
            return 'Puntuación Total Screening BRIEF-2: ' + score + '/36. (Mayor puntaje indica mayor disfunción ejecutiva).';
        }
    }
}
