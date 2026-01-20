import { TestDefinition } from '@/types/test'

const likertOptions = [
    { label: "0 - Nunca / Rara vez", value: 0 },
    { label: "1 - A veces", value: 1 },
    { label: "2 - A menudo", value: 2 },
    { label: "3 - Muy a menudo / Siempre", value: 3 }
]

export const conners3: TestDefinition = {
    id: 'conners-3',
    title: 'Conners-3 (Forma Abreviada - Screening)',
    description: 'Evaluación breve de comportamientos asociados al TDAH (Inatención, Hiperactividad/Impulsividad) y problemas asociados.',
    category: 'pediatrics',
    duration: '5-10 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Indique con qué frecuencia ha ocurrido cada comportamiento en el último mes.' },

        { id: 'q1', text: '1. Se distrae fácilmente.', type: 'single_choice', options: likertOptions },
        { id: 'q2', text: '2. Es inquieto/a, no puede quedarse quieto/a.', type: 'single_choice', options: likertOptions },
        { id: 'q3', text: '3. Tiene dificultad para terminar las tareas escolares.', type: 'single_choice', options: likertOptions },
        { id: 'q4', text: '4. Interrumpe o se mete en las conversaciones de otros.', type: 'single_choice', options: likertOptions },
        { id: 'q5', text: '5. Tiene dificultad para organizar sus tareas.', type: 'single_choice', options: likertOptions },
        { id: 'q6', text: '6. Actúa como si tuviera un motor (exceso de energía).', type: 'single_choice', options: likertOptions },
        { id: 'q7', text: '7. Comete errores por descuido en la escuela.', type: 'single_choice', options: likertOptions },
        { id: 'q8', text: '8. Tiene cambios de humor rápidos.', type: 'single_choice', options: likertOptions },
        { id: 'q9', text: '9. Se frustra fácilmente.', type: 'single_choice', options: likertOptions },
        { id: 'q10', text: '10. Tiene dificultad para esperar su turno.', type: 'single_choice', options: likertOptions }
        // Representative short list
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            for (let i = 1; i <= 10; i++) {
                if (answers['q' + i]) total += answers['q' + i];
            }
            return total;
        },
        interpret: (score: any) => {
            // 10 items * 3 = 30 max.
            // Roughly: > 15-20 indicates significant concerns.
            return 'Puntuación Total Screening: ' + score + '/30. (Puntuaciones elevadas sugieren riesgo de TDAH).';
        }
    }
}
