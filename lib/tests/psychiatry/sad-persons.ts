import { TestDefinition } from '@/types/test'

const options = [
    { label: "No", value: 0 },
    { label: "Sí", value: 1 }
]

export const sadPersons: TestDefinition = {
    id: 'sad-persons',
    title: 'Escala SAD PERSONS',
    description: 'Escala para evaluar el riesgo de suicidio basada en 10 factores de riesgo.',
    category: 'psychiatry',
    duration: '2-5 min',
    questions: [
        { id: 'sex', text: '1. Sexo masculino', type: 'single_choice', options },
        { id: 'age', text: '2. Edad (<19 o >45 años)', type: 'single_choice', options },
        { id: 'depression', text: '3. Depresión o desesperanza', type: 'single_choice', options },
        { id: 'previous', text: '4. Intento de suicidio previo', type: 'single_choice', options },
        { id: 'ethanol', text: '5. Abuso de alcohol o drogas', type: 'single_choice', options },
        { id: 'rational', text: '6. Pérdida del pensamiento racional (psicosis, confusión)', type: 'single_choice', options },
        { id: 'social', text: '7. Falta de apoyo social', type: 'single_choice', options },
        { id: 'organized', text: '8. Plan organizado o serio', type: 'single_choice', options },
        { id: 'no_spouse', text: '9. Sin pareja (soltero, viudo, divorciado)', type: 'single_choice', options },
        { id: 'sickness', text: '10. Enfermedad crónica o debilitante', type: 'single_choice', options }
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
            if (score <= 2) return 'Riesgo Bajo. Seguimiento ambulatorio.';
            if (score <= 4) return 'Riesgo Moderado. Seguimiento ambulatorio estrecho, considerar ingreso si no hay control.';
            if (score <= 6) return 'Riesgo Alto. Considerar ingreso psiquiátrico, especialmente si falta apoyo.';
            if (score <= 8) return 'Riesgo Muy Alto. Ingreso psiquiátrico probable.';
            return 'Riesgo Extremo. Ingreso psiquiátrico obligado.';
        }
    }
}
