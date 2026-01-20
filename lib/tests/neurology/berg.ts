import { TestDefinition } from '@/types/test'

const options = [
    { label: "4 - Capaz de realizar la tarea con seguridad", value: 4 },
    { label: "3 - Capaz pero necesita supervisión/asistencia leve", value: 3 },
    { label: "2 - Capaz pero necesita asistencia moderada", value: 2 },
    { label: "1 - Necesita asistencia máxima", value: 1 },
    { label: "0 - Incapaz", value: 0 }
]

// Note: Berg items have specific descriptions for each score 0-4. 
// For digitization simplicity, we use a generic scale but ideally each option has specific text.
// Given the constraint, I will use generic labels that approximate the intent or just 0-4 with "Ver manual".
// Better approach: Use generic descriptors as above which cover most items (Independent, Supervision, Assistance, Unable).

export const berg: TestDefinition = {
    id: 'berg',
    title: 'Escala de Equilibrio de Berg',
    description: 'Evaluación funcional del equilibrio estático y dinámico. Consta de 14 tareas comunes de la vida diaria.',
    category: 'neurology',
    duration: '15-20 min',
    questions: [
        { id: 'q1', text: '1. De sentado a de pie', type: 'single_choice', options },
        { id: 'q2', text: '2. De pie sin apoyo', type: 'single_choice', options },
        { id: 'q3', text: '3. Sentado sin apoyo', type: 'single_choice', options },
        { id: 'q4', text: '4. De pie a sentado', type: 'single_choice', options },
        { id: 'q5', text: '5. Transferencias', type: 'single_choice', options },
        { id: 'q6', text: '6. De pie con los ojos cerrados', type: 'single_choice', options },
        { id: 'q7', text: '7. De pie con los pies juntos', type: 'single_choice', options },
        { id: 'q8', text: '8. Alcanzar hacia delante con el brazo extendido', type: 'single_choice', options },
        { id: 'q9', text: '9. Recoger un objeto del suelo', type: 'single_choice', options },
        { id: 'q10', text: '10. Girarse para mirar atrás', type: 'single_choice', options },
        { id: 'q11', text: '11. Girar 360 grados', type: 'single_choice', options },
        { id: 'q12', text: '12. Poner los pies alternativamente en un escalón', type: 'single_choice', options },
        { id: 'q13', text: '13. De pie con un pie delante del otro (Tándem)', type: 'single_choice', options },
        { id: 'q14', text: '14. De pie sobre una pierna', type: 'single_choice', options }
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
            // Max 56.
            // 0-20: Silla de ruedas / Alto riesgo de caídas
            // 21-40: Puede caminar con ayuda / Riesgo medio
            // 41-56: Independiente / Bajo riesgo
            let risk = 'Bajo Riesgo de Caídas (Independiente)';
            if (score <= 40) risk = 'Riesgo Medio (Puede necesitar asistencia)';
            if (score <= 20) risk = 'Alto Riesgo de Caídas (Silla de ruedas)';

            return `Puntuación Total: ${score} / 56. Interpretación: ${risk}.`;
        }
    }
}
