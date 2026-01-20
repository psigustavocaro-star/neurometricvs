import { TestDefinition } from '@/types/test'

const baiOptions = [
    { label: "0 - Nada en absoluto", value: 0 },
    { label: "1 - Levemente", value: 1 },
    { label: "2 - Moderadamente", value: 2 },
    { label: "3 - Severamente", value: 3 }
]

export const bai: TestDefinition = {
    id: 'bai',
    title: 'Beck Anxiety Inventory (BAI)',
    description: 'Cuestionario de autoinforme de 21 ítems para evaluar la gravedad de la sintomatología ansiosa.',
    category: 'psychology',
    duration: '5-10 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Para cada síntoma, indique cuánto le ha molestado durante la última semana (incluyendo hoy).' },

        { id: 'q1', text: '1. Entumecimiento u hormigueo', type: 'single_choice', options: baiOptions },
        { id: 'q2', text: '2. Sensación de calor', type: 'single_choice', options: baiOptions },
        { id: 'q3', text: '3. Temblor de piernas', type: 'single_choice', options: baiOptions },
        { id: 'q4', text: '4. Incapacidad de relajarse', type: 'single_choice', options: baiOptions },
        { id: 'q5', text: '5. Temor a que ocurra lo peor', type: 'single_choice', options: baiOptions },
        { id: 'q6', text: '6. Mareo o aturdimiento', type: 'single_choice', options: baiOptions },
        { id: 'q7', text: '7. Latidos del corazón fuertes o acelerados', type: 'single_choice', options: baiOptions },
        { id: 'q8', text: '8. Inestabilidad', type: 'single_choice', options: baiOptions },
        { id: 'q9', text: '9. Aterrorizado/a', type: 'single_choice', options: baiOptions },
        { id: 'q10', text: '10. Nervioso/a', type: 'single_choice', options: baiOptions },
        { id: 'q11', text: '11. Sensación de ahogo', type: 'single_choice', options: baiOptions },
        { id: 'q12', text: '12. Temblor en las manos', type: 'single_choice', options: baiOptions },
        { id: 'q13', text: '13. Inquietud, inseguridad', type: 'single_choice', options: baiOptions },
        { id: 'q14', text: '14. Miedo a perder el control', type: 'single_choice', options: baiOptions },
        { id: 'q15', text: '15. Dificultad para respirar', type: 'single_choice', options: baiOptions },
        { id: 'q16', text: '16. Miedo a morir', type: 'single_choice', options: baiOptions },
        { id: 'q17', text: '17. Asustado/a', type: 'single_choice', options: baiOptions },
        { id: 'q18', text: '18. Indigestión o molestia abdominal', type: 'single_choice', options: baiOptions },
        { id: 'q19', text: '19. Sensación de desmayo', type: 'single_choice', options: baiOptions },
        { id: 'q20', text: '20. Rubor facial', type: 'single_choice', options: baiOptions },
        { id: 'q21', text: '21. Sudoración (no debida al calor)', type: 'single_choice', options: baiOptions }
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
            // BAI Cut-offs
            // 0-7: Ansiedad mínima
            // 8-15: Ansiedad leve
            // 16-25: Ansiedad moderada
            // 26-63: Ansiedad severa

            let severity = 'Ansiedad Mínima';
            if (score >= 26) severity = 'Ansiedad Severa';
            else if (score >= 16) severity = 'Ansiedad Moderada';
            else if (score >= 8) severity = 'Ansiedad Leve';

            return 'Puntuación BAI: ' + score + '/63. Clasificación: ' + severity + '.';
        }
    }
}
