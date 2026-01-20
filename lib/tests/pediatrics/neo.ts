import { TestDefinition } from '@/types/test'

const feedingOptions = [
    { label: "0 - No aplica/Sin problemas", value: 0 },
    { label: "1 - Problema leve", value: 1 },
    { label: "2 - Problema moderado", value: 2 },
    { label: "3 - Problema severo", value: 3 }
]

export const neo: TestDefinition = {
    id: 'neo',
    title: 'NEO - Neonatal Eating Outcome Assessment',
    description: 'Evaluación de resultados de alimentación neonatal para identificar dificultades en la alimentación temprana.',
    category: 'pediatrics',
    duration: '10 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Evalúe las siguientes áreas de alimentación del neonato.' },

        { id: 'coordination', text: '1. Coordinación succión-deglución-respiración', type: 'single_choice', options: feedingOptions },
        { id: 'endurance', text: '2. Resistencia durante la alimentación', type: 'single_choice', options: feedingOptions },
        { id: 'volume', text: '3. Volumen de ingesta', type: 'single_choice', options: feedingOptions },
        { id: 'weight', text: '4. Ganancia de peso', type: 'single_choice', options: feedingOptions },
        { id: 'oral_motor', text: '5. Función motora oral', type: 'single_choice', options: feedingOptions },
        { id: 'state', text: '6. Estado de alerta durante alimentación', type: 'single_choice', options: feedingOptions },
        { id: 'stress', text: '7. Signos de estrés durante alimentación', type: 'single_choice', options: feedingOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            const keys = ['coordination', 'endurance', 'volume', 'weight', 'oral_motor', 'state', 'stress'];
            keys.forEach(k => { if (answers[k]) total += answers[k]; });
            return total;
        },
        interpret: (score: any) => {
            let severity = 'Normal';
            if (score >= 14) severity = 'Dificultad severa de alimentación';
            else if (score >= 7) severity = 'Dificultad moderada';
            else if (score >= 3) severity = 'Dificultad leve';

            return 'Puntuación NEO: ' + score + '/21. Clasificación: ' + severity + '.';
        }
    }
}
