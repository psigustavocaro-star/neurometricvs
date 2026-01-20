import { TestDefinition } from '@/types/test'

const options = [
    { label: "1 - Interfiere mucho", value: 1 },
    { label: "2 - Interfiere", value: 2 },
    { label: "3 - Apoya", value: 3 },
    { label: "4 - Apoya mucho", value: 4 },
    { label: "N/A - No aplicable", value: 0 }
]

export const weis: TestDefinition = {
    id: 'weis',
    title: 'Escala del Impacto del Ambiente de Trabajo (WEIS)',
    description: 'Evaluación de cómo las características del ambiente laboral influyen en el desempeño y bienestar del trabajador.',
    category: 'other', // OT
    duration: '20-30 min',
    questions: [
        { id: 'q1', text: '1. Demandas de tiempo', type: 'single_choice', options },
        { id: 'q2', text: '2. Demandas de la tarea', type: 'single_choice', options },
        { id: 'q3', text: '3. Apelación de las tareas de trabajo', type: 'single_choice', options },
        { id: 'q4', text: '4. Horario de trabajo', type: 'single_choice', options },
        { id: 'q5', text: '5. Interacción con compañeros', type: 'single_choice', options },
        { id: 'q6', text: '6. Estándares de rol de trabajo', type: 'single_choice', options },
        { id: 'q7', text: '7. Estilo de supervisión', type: 'single_choice', options },
        { id: 'q8', text: '8. Oportunidades de interacción', type: 'single_choice', options },
        { id: 'q9', text: '9. Ambiente físico / sensorial', type: 'single_choice', options },
        { id: 'q10', text: '10. Propiedades de los objetos/herramientas', type: 'single_choice', options },
        { id: 'q11', text: '11. Lugares (arquitectura/accesibilidad)', type: 'single_choice', options },
        { id: 'q12', text: '12. Significado del trabajo', type: 'single_choice', options },
        { id: 'q13', text: '13. Recompensas / Salario', type: 'single_choice', options },
        { id: 'q14', text: '14. Oportunidades de crecimiento', type: 'single_choice', options },
        { id: 'q15', text: '15. Estabilidad laboral', type: 'single_choice', options },
        { id: 'q16', text: '16. Recursos (apoyo)', type: 'single_choice', options },
        { id: 'q17', text: '17. Clima organizacional', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            let sum = 0;
            let count = 0;
            for (let i = 1; i <= 17; i++) {
                const val = answers['q' + i];
                // Check if val is number and not 0 (N/A)
                if (typeof val === 'number' && val !== 0) {
                    sum += val;
                    count++;
                }
            }
            if (count === 0) return 0;
            return Math.round((sum / count) * 100) / 100; // Mean score
        },
        interpret: (score: any) => {
            if (score < 2) return 'Puntuación Media: ' + score + '. Ambiente laboral fuertemente INTERFERENTE.';
            if (score < 3) return 'Puntuación Media: ' + score + '. Ambiente laboral con barreras que INTERFIEREN.';
            return 'Puntuación Media: ' + score + '. Ambiente laboral que apoya el desempeño.';
        }
    }
}
