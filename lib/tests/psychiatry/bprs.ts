import { TestDefinition } from '@/types/test'

const options = [
    { label: "1 - No presente", value: 1 },
    { label: "2 - Muy leve", value: 2 },
    { label: "3 - Leve", value: 3 },
    { label: "4 - Moderado", value: 4 },
    { label: "5 - Moderadamente grave", value: 5 },
    { label: "6 - Grave", value: 6 },
    { label: "7 - Muy grave", value: 7 }
]

export const bprs: TestDefinition = {
    id: 'bprs',
    title: 'Escala Breve de Evaluación Psiquiátrica (BPRS-18)',
    description: 'Escala heteroaplicada para evaluar la severidad de diversos síntomas psicopatológicos (ansiedad, depresion, alucinaciones, etc.).',
    category: 'psychiatry',
    duration: '10-20 min',
    questions: [
        { id: 'q1', text: '1. Preocupación somática', type: 'single_choice', options },
        { id: 'q2', text: '2. Ansiedad psíquica', type: 'single_choice', options },
        { id: 'q3', text: '3. Aislamiento emocional', type: 'single_choice', options },
        { id: 'q4', text: '4. Desorganización conceptual', type: 'single_choice', options },
        { id: 'q5', text: '5. Sentimientos de culpa', type: 'single_choice', options },
        { id: 'q6', text: '6. Tensión', type: 'single_choice', options },
        { id: 'q7', text: '7. Manierismos y posturas', type: 'single_choice', options },
        { id: 'q8', text: '8. Grandiosidad', type: 'single_choice', options },
        { id: 'q9', text: '9. Humor depresivo', type: 'single_choice', options },
        { id: 'q10', text: '10. Hostilidad', type: 'single_choice', options },
        { id: 'q11', text: '11. Suspicacia', type: 'single_choice', options },
        { id: 'q12', text: '12. Comportamiento alucinatorio', type: 'single_choice', options },
        { id: 'q13', text: '13. Enlentecimiento motor', type: 'single_choice', options },
        { id: 'q14', text: '14. Falta de cooperación', type: 'single_choice', options },
        { id: 'q15', text: '15. Pensamiento inusual', type: 'single_choice', options },
        { id: 'q16', text: '16. Embotamiento afectivo', type: 'single_choice', options },
        { id: 'q17', text: '17. Excitación', type: 'single_choice', options },
        { id: 'q18', text: '18. Desorientación', type: 'single_choice', options }
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
            // Range 18-126
            let severity = 'Leve/No patológico';
            if (score > 30) severity = 'Levemente enfermo';
            if (score > 40) severity = 'Moderadamente enfermo';
            if (score > 50) severity = 'Marcadamente enfermo';
            if (score > 70) severity = 'Gravemente enfermo';

            return `Puntuación Total: ${score}. Gravedad estimada: ${severity}.`;
        }
    }
}
