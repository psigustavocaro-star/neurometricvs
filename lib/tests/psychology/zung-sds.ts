import { TestDefinition } from '@/types/test'

export const zungSds: TestDefinition = {
    id: 'zung-sds',
    title: 'Escala de Autoevaluación para la Depresión de Zung (SDS)',
    description: 'Cuestionario de 20 ítems para cuantificar el nivel de depresión. Incluye síntomas afectivos, fisiológicos y psicológicos.',
    category: 'psychology',
    duration: '5-10 min',
    questions: [
        {
            id: 'zung_1',
            text: '1. Me siento decaído y triste.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_2',
            text: '2. Por la mañana es cuando me siento mejor.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_3',
            text: '3. Siento ganas de llorar o irrumpo en llanto.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_4',
            text: '4. Tengo problemas para dormir por la noche.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_5',
            text: '5. Como la misma cantidad de siempre.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_6',
            text: '6. Todavía disfruto el sexo.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_7',
            text: '7. He notado que estoy perdiendo peso.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_8',
            text: '8. Tengo problemas de estreñimiento.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_9',
            text: '9. Mi corazón late más rápido de lo normal.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_10',
            text: '10. Me canso sin razón alguna.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_11',
            text: '11. Mi mente está tan clara como siempre.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_12',
            text: '12. Me es fácil hacer lo que siempre hacía.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_13',
            text: '13. Me siento agitado y no puedo estar quieto.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_14',
            text: '14. Siento esperanza en el futuro.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_15',
            text: '15. Estoy más irritable de lo normal.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_16',
            text: '16. Me es fácil tomar decisiones.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_17',
            text: '17. Siento que soy útil y me necesitan.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_18',
            text: '18. Mi vida es bastante plena.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        },
        {
            id: 'zung_19',
            text: '19. Siento que los demás estarían mejor si yo muriera.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 1 },
                { label: 'Algo del tiempo', value: 2 },
                { label: 'Una buena parte del tiempo', value: 3 },
                { label: 'La mayor parte del tiempo', value: 4 }
            ]
        },
        {
            id: 'zung_20',
            text: '20. Todavía disfruto de las cosas que disfrutaba antes.',
            type: 'single_choice',
            options: [
                { label: 'Poco tiempo', value: 4 },
                { label: 'Algo del tiempo', value: 3 },
                { label: 'Una buena parte del tiempo', value: 2 },
                { label: 'La mayor parte del tiempo', value: 1 }
            ]
        }
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
            // Index Score = Raw Score * 1.25 (to get to 100)
            // But usually raw score is interpreted directly or converted.
            // Raw score ranges: 20-80.
            // Index score ranges: 25-100.
            // Using Index Score for interpretation as per usual guidelines.
            const indexScore = Math.round(score * 1.25);

            let severity = '';
            if (indexScore < 50) severity = 'Rango Normal';
            else if (indexScore < 60) severity = 'Depresión Leve';
            else if (indexScore < 70) severity = 'Depresión Moderada';
            else severity = 'Depresión Severa';

            return `Puntuación Bruta: ${score}. Puntuación Índice: ${indexScore} (${severity}).`;
        }
    }
}
