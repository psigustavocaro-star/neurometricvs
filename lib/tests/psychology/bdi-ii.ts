import { TestDefinition } from '@/types/test'

const bdiOptions = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 }
]

export const bdiII: TestDefinition = {
    id: 'bdi-ii',
    title: 'Beck Depression Inventory-II (BDI-II)',
    description: 'Cuestionario de autoinforme de 21 ítems para evaluar la gravedad de la sintomatología depresiva en las últimas dos semanas.',
    category: 'psychology',
    duration: '5-10 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Para cada ítem, el paciente selecciona la afirmación (0-3) que mejor describe cómo se ha sentido durante las últimas dos semanas.' },

        { id: 'q1', text: '1. Tristeza', type: 'single_choice', options: bdiOptions },
        { id: 'q2', text: '2. Pesimismo', type: 'single_choice', options: bdiOptions },
        { id: 'q3', text: '3. Fracaso', type: 'single_choice', options: bdiOptions },
        { id: 'q4', text: '4. Pérdida de placer', type: 'single_choice', options: bdiOptions },
        { id: 'q5', text: '5. Sentimientos de culpa', type: 'single_choice', options: bdiOptions },
        { id: 'q6', text: '6. Sentimientos de castigo', type: 'single_choice', options: bdiOptions },
        { id: 'q7', text: '7. Disconformidad consigo mismo', type: 'single_choice', options: bdiOptions },
        { id: 'q8', text: '8. Autocrítica', type: 'single_choice', options: bdiOptions },
        { id: 'q9', text: '9. Pensamientos o deseos suicidas', type: 'single_choice', options: bdiOptions },
        { id: 'q10', text: '10. Llanto', type: 'single_choice', options: bdiOptions },
        { id: 'q11', text: '11. Agitación', type: 'single_choice', options: bdiOptions },
        { id: 'q12', text: '12. Pérdida de interés', type: 'single_choice', options: bdiOptions },
        { id: 'q13', text: '13. Indecisión', type: 'single_choice', options: bdiOptions },
        { id: 'q14', text: '14. Inutilidad', type: 'single_choice', options: bdiOptions },
        { id: 'q15', text: '15. Pérdida de energía', type: 'single_choice', options: bdiOptions },
        { id: 'q16', text: '16. Cambios en el patrón de sueño', type: 'single_choice', options: bdiOptions },
        { id: 'q17', text: '17. Irritabilidad', type: 'single_choice', options: bdiOptions },
        { id: 'q18', text: '18. Cambios en el apetito', type: 'single_choice', options: bdiOptions },
        { id: 'q19', text: '19. Dificultad de concentración', type: 'single_choice', options: bdiOptions },
        { id: 'q20', text: '20. Fatiga', type: 'single_choice', options: bdiOptions },
        { id: 'q21', text: '21. Pérdida de interés en el sexo', type: 'single_choice', options: bdiOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            for (let i = 1; i <= 21; i++) {
                if (answers['q' + i] !== undefined) total += answers['q' + i];
            }
            return total;
        },
        interpret: (score: any) => {
            // BDI-II Cut-offs
            // 0-13: Mínima
            // 14-19: Leve
            // 20-28: Moderada
            // 29-63: Severa

            let severity = 'Depresión Mínima';
            if (score >= 29) severity = 'Depresión Severa';
            else if (score >= 20) severity = 'Depresión Moderada';
            else if (score >= 14) severity = 'Depresión Leve';

            return 'Puntuación BDI-II: ' + score + '/63. Clasificación: ' + severity + '.';
        }
    }
}
