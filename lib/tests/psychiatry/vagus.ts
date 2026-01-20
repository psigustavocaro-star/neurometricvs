import { TestDefinition } from '@/types/test'

const yesNoOptions = [
    { label: "No", value: 0 },
    { label: "Sí", value: 1 }
]

export const vagus: TestDefinition = {
    id: 'vagus',
    title: 'VAGUS (Violence and Aggression Risk Assessment)',
    description: 'Herramienta breve de evaluación del riesgo de violencia y agresión en pacientes psiquiátricos.',
    category: 'psychiatry',
    duration: '5 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Evalúe los siguientes factores de riesgo basándose en el historial y la entrevista clínica.' },

        { id: 'hist_violence', text: '1. Historia de actos violentos', type: 'single_choice', options: yesNoOptions },
        { id: 'recent_violence', text: '2. Violencia reciente (últimos 30 días)', type: 'single_choice', options: yesNoOptions },
        { id: 'substance', text: '3. Abuso de sustancias activo', type: 'single_choice', options: yesNoOptions },
        { id: 'psychosis', text: '4. Síntomas psicóticos activos', type: 'single_choice', options: yesNoOptions },
        { id: 'impulsivity', text: '5. Alta impulsividad', type: 'single_choice', options: yesNoOptions },
        { id: 'noncompliance', text: '6. No adherencia al tratamiento', type: 'single_choice', options: yesNoOptions },
        { id: 'threat', text: '7. Amenazas verbales recientes', type: 'single_choice', options: yesNoOptions },
        { id: 'weapon', text: '8. Acceso a armas', type: 'single_choice', options: yesNoOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            const keys = ['hist_violence', 'recent_violence', 'substance', 'psychosis', 'impulsivity', 'noncompliance', 'threat', 'weapon'];
            keys.forEach(k => { if (answers[k]) total += answers[k]; });
            return total;
        },
        interpret: (score: any) => {
            let risk = 'Bajo';
            if (score >= 5) risk = 'Alto';
            else if (score >= 3) risk = 'Moderado';

            return 'Puntuación VAGUS: ' + score + '/8. Nivel de riesgo: ' + risk + '.';
        }
    }
}
