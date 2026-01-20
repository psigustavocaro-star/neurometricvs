import { TestDefinition } from '@/types/test'

const likertOptions = [
    { label: "1 - Totalmente de acuerdo", value: 1 },
    { label: "2 - De acuerdo", value: 2 },
    { label: "3 - Neutral", value: 3 },
    { label: "4 - En desacuerdo", value: 4 },
    { label: "5 - Totalmente en desacuerdo", value: 5 },
    { label: "6 - Mucho más en desacuerdo", value: 6 },
    { label: "7 - Extremadamente en desacuerdo", value: 7 }
]

export const das7: TestDefinition = {
    id: 'das-7',
    title: 'Dysfunctional Attitude Scale - Short Form 7 (DAS-7)',
    description: 'Escala breve para evaluar actitudes disfuncionales asociadas a la depresión (Perfeccionismo, Necesidad de aprobación).',
    category: 'psychology',
    duration: '2-5 min',
    questions: [
        { id: 'q1', text: '1. Si no lo hago todo bien, soy un fracaso.', type: 'single_choice', options: likertOptions },
        { id: 'q2', text: '2. Es vergonzoso mostrar debilidad o tristeza.', type: 'single_choice', options: likertOptions },
        { id: 'q3', text: '3. Si no le caigo bien a alguien, es porque algo anda mal conmigo.', type: 'single_choice', options: likertOptions },
        { id: 'q4', text: '4. Debo ser capaz de resolver mis problemas por mí mismo.', type: 'single_choice', options: likertOptions },
        { id: 'q5', text: '5. Si cometo un error, la gente pensará menos de mí.', type: 'single_choice', options: likertOptions },
        { id: 'q6', text: '6. Mi valor como persona depende de lo que logro.', type: 'single_choice', options: likertOptions },
        { id: 'q7', text: '7. Necesito la aprobación de los demás para ser feliz.', type: 'single_choice', options: likertOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            for (let i = 1; i <= 7; i++) {
                if (answers['q' + i]) total += answers['q' + i];
            }
            return total;
        },
        interpret: (score: any) => {
            return 'Puntuación Total: ' + score + '/49. (Puntuaciones más bajas indican mayor presencia de actitudes disfuncionales si 1=Totalmente de acuerdo).';
        }
    }
}
