import { TestDefinition } from '@/types/test'

const likertOptions = [
    { label: "1 - Totalmente en desacuerdo", value: 1 },
    { label: "2 - En desacuerdo", value: 2 },
    { label: "3 - De acuerdo", value: 3 },
    { label: "4 - Totalmente de acuerdo", value: 4 }
]

export const oiq: TestDefinition = {
    id: 'oiq',
    title: 'Occupational Identity Questionnaire (OIQ)',
    description: 'Cuestionario para evaluar la identidad ocupacional, percepción de competencia y efectividad en roles de vida.',
    category: 'other', // OT
    duration: '10-15 min',
    questions: [
        { id: 'q1', text: '1. Me siento competente en las cosas que hago a diario.', type: 'single_choice', options: likertOptions },
        { id: 'q2', text: '2. Tengo claras mis metas futuras.', type: 'single_choice', options: likertOptions },
        { id: 'q3', text: '3. Las actividades que realizo son importantes para mí.', type: 'single_choice', options: likertOptions },
        { id: 'q4', text: '4. Me siento capaz de asumir nuevos desafíos.', type: 'single_choice', options: likertOptions },
        { id: 'q5', text: '5. Mi rutina diaria me satisface.', type: 'single_choice', options: likertOptions },
        { id: 'q6', text: '6. Siento que tengo un rol productivo en la sociedad/comunidad.', type: 'single_choice', options: likertOptions },
        { id: 'q7', text: '7. Mis habilidades son valoradas por otros.', type: 'single_choice', options: likertOptions },
        { id: 'q8', text: '8. Tengo control sobre mi vida.', type: 'single_choice', options: likertOptions },
        { id: 'q9', text: '9. Logro cumplir lo que me propongo.', type: 'single_choice', options: likertOptions },
        { id: 'q10', text: '10. Me reconozco como una persona trabajadora/activa.', type: 'single_choice', options: likertOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            // Sum 10 items
            for (let i = 1; i <= 10; i++) {
                if (answers['q' + i]) total += answers['q' + i];
            }
            return total;
        },
        interpret: (score: any) => {
            // 10-40 range. Higher = Stronger identity/competence.
            return 'Puntuación Total OIQ: ' + score + '/40. (Mayor puntaje indica mayor identidad/competencia ocupacional).';
        }
    }
}
