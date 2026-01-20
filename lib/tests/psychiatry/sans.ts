import { TestDefinition } from '@/types/test'

const options = [
    { label: "0 - No / Ninguno", value: 0 },
    { label: "1 - Dudoso", value: 1 },
    { label: "2 - Leve", value: 2 },
    { label: "3 - Moderado", value: 3 },
    { label: "4 - Marcado", value: 4 },
    { label: "5 - Severo", value: 5 }
]

export const sans: TestDefinition = {
    id: 'sans',
    title: 'Escala de Evaluación de Síntomas Negativos (SANS)',
    description: 'Evaluación detallada de los síntomas negativos en la esquizofrenia (Aplanamiento afectivo, Alogia, Abulia, Anhedonia, Atención).',
    category: 'psychiatry',
    duration: '15-20 min',
    questions: [
        { type: 'info', id: 'info1', text: '1. Aplanamiento Afectivo o Embotamiento' },
        { id: 'q1', text: '1. Expresión facial inmutable', type: 'single_choice', options },
        { id: 'q2', text: '2. Disminución de movimientos espontáneos', type: 'single_choice', options },
        { id: 'q3', text: '3. Escasez de gestos expresivos', type: 'single_choice', options },
        { id: 'q4', text: '4. Contacto visual pobre', type: 'single_choice', options },
        { id: 'q5', text: '5. Incongruencia afectiva', type: 'single_choice', options },
        { id: 'q6', text: '6. Ausencia de inflexiones vocales', type: 'single_choice', options },
        { id: 'q7', text: '7. Evaluación global de Aplanamiento Afectivo', type: 'single_choice', options },

        { type: 'info', id: 'info2', text: '2. Alogia (Pobreza del pensamiento/lenguaje)' },
        { id: 'q8', text: '8. Pobreza del lenguaje', type: 'single_choice', options },
        { id: 'q9', text: '9. Pobreza del contenido del lenguaje', type: 'single_choice', options },
        { id: 'q10', text: '10. Bloqueo', type: 'single_choice', options },
        { id: 'q11', text: '11. Latencia de respuesta incrementada', type: 'single_choice', options },
        { id: 'q12', text: '12. Evaluación global de Alogia', type: 'single_choice', options },

        { type: 'info', id: 'info3', text: '3. Abulia / Apatía' },
        { id: 'q13', text: '13. Aseo e higiene personal deficientes', type: 'single_choice', options },
        { id: 'q14', text: '14. Falta de persistencia en el trabajo/escuela', type: 'single_choice', options },
        { id: 'q15', text: '15. Anergia física', type: 'single_choice', options },
        { id: 'q16', text: '16. Evaluación global de Abulia/Apatía', type: 'single_choice', options },

        { type: 'info', id: 'info4', text: '4. Anhedonia / Asocialidad' },
        { id: 'q17', text: '17. Intereses o actividades recreativas', type: 'single_choice', options },
        { id: 'q18', text: '18. Interés o actividad sexual', type: 'single_choice', options },
        { id: 'q19', text: '19. Capacidad para sentir intimidad/proximidad', type: 'single_choice', options },
        { id: 'q20', text: '20. Relaciones con amigos/pares', type: 'single_choice', options },
        { id: 'q21', text: '21. Evaluación global de Anhedonia/Asocialidad', type: 'single_choice', options },

        { type: 'info', id: 'info5', text: '5. Atención' },
        { id: 'q22', text: '22. Distraibilidad social', type: 'single_choice', options },
        { id: 'q23', text: '23. Distraibilidad en las pruebas', type: 'single_choice', options },
        { id: 'q24', text: '24. Evaluación global de Atención', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            for (let i = 1; i <= 24; i++) {
                const val = answers['q' + i];
                // Check for number before adding
                if (typeof val === 'number') total += val;
            }
            return total;
        },
        interpret: (score: any) => {
            return 'Puntuación Total SANS: ' + score + '.';
        }
    }
}
