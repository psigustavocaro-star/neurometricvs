import { TestDefinition } from '@/types/test'

const options = [
    { label: "1 - Ninguna dificultad / Ninguno", value: 1 },
    { label: "2 - Dificultad leve / Leve", value: 2 },
    { label: "3 - Dificultad moderada / Moderado", value: 3 },
    { label: "4 - Dificultad severa / Severo", value: 4 },
    { label: "5 - Incapaz / Extremo", value: 5 }
]

export const quickDash: TestDefinition = {
    id: 'quick-dash',
    title: 'Cuestionario QuickDASH',
    description: 'Medida de discapacidad del brazo, hombro y mano. Versión abreviada del DASH.',
    category: 'other', // Should be Occupational Therapy (OT) but using 'other' or add new category later. Keeping 'other' logic safe. Or define new one? Let's stick to defined types or extend. Types are: neurology | psychiatry | psychology | geriatrics | pediatrics | other.
    duration: '5 min',
    questions: [
        { id: 'q1', text: '1. Abrir un frasco nuevo y apretado.', type: 'single_choice', options },
        { id: 'q2', text: '2. Hacer tareas domésticas pesadas (fregar suelos, paredes).', type: 'single_choice', options },
        { id: 'q3', text: '3. Cargar una bolsa de compras o maletín.', type: 'single_choice', options },
        { id: 'q4', text: '4. Lavarse la espalda.', type: 'single_choice', options },
        { id: 'q5', text: '5. Usar un cuchillo para cortar comida.', type: 'single_choice', options },
        { id: 'q6', text: '6. Actividades recreativas que requieren fuerza o impacto (martillar, tenis, etc.).', type: 'single_choice', options },
        { id: 'q7', text: '7. Durante la semana pasada, ¿en qué medida su problema de brazo, hombro o mano interfirió con sus actividades sociales normales?', type: 'single_choice', options },
        { id: 'q8', text: '8. Durante la semana pasada, ¿su trabajo u otras actividades diarias habituales se limitaron a causa de su problema?', type: 'single_choice', options },
        { id: 'q9', text: '9. Dolor en brazo, hombro o mano.', type: 'single_choice', options }, // Scale: None to Extreme
        { id: 'q10', text: '10. Hormigueo (entumecimiento) en brazo, hombro o mano.', type: 'single_choice', options },
        { id: 'q11', text: '11. Dificultad para dormir debido al dolor.', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            let sum = 0;
            let count = 0;
            for (let i = 1; i <= 11; i++) {
                const val = answers['q' + i];
                if (val !== undefined && val !== 0) { // Assuming 0 is not used in 1-5 scale, unless missing.
                    sum += val;
                    count++;
                }
            }
            // Formula: ((Sum / n) - 1) * 25. n must be at least 10/11.
            if (count < 10) return { score: 0, valid: false };

            const average = sum / count;
            const score = (average - 1) * 25;
            return { score: Math.round(score * 100) / 100, valid: true };
        },
        interpret: (result: any) => {
            if (!result.valid) return 'No se puede calcular (faltan demasiadas respuestas).';
            const score = result.score;
            return `Puntuación QuickDASH: ${score} (0-100). 0 = Sin discapacidad, 100 = Discapacidad extrema.`;
        }
    }
}
