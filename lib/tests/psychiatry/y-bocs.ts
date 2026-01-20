import { TestDefinition } from '@/types/test'

export const ybocs: TestDefinition = {
    id: 'y-bocs',
    title: 'Escala Obsesivo-Compulsiva de Yale-Brown (Y-BOCS)',
    description: 'Gold standard para evaluar la severidad de los síntomas obsesivo-compulsivos. Mide obsesiones y compulsiones por separado.',
    category: 'psychiatry',
    duration: '10-15 min',
    questions: [
        {
            id: 'obsessions_header',
            text: 'I. Escala de Medida de la Obsesión',
            type: 'info'
        },
        {
            id: 'ybocs_1',
            text: '1. Tiempo ocupado en las obsesiones',
            type: 'single_choice',
            options: [
                { label: '0 - Ninguno (menos de 1 hora/día)', value: 0 },
                { label: '1 - Leve (0-1 horas/día)', value: 1 },
                { label: '2 - Moderado (1-3 horas/día)', value: 2 },
                { label: '3 - Severo (3-8 horas/día)', value: 3 },
                { label: '4 - Extremo (más de 8 horas/día)', value: 4 }
            ]
        },
        {
            id: 'ybocs_2',
            text: '2. Interferencia de las obsesiones',
            type: 'single_choice',
            options: [
                { label: '0 - Ninguna', value: 0 },
                { label: '1 - Leve', value: 1 },
                { label: '2 - Moderada (definitiva pero manejable)', value: 2 },
                { label: '3 - Severa (sustancialmente entorpecedora)', value: 3 },
                { label: '4 - Extrema (incapacitante)', value: 4 }
            ]
        },
        {
            id: 'ybocs_3',
            text: '3. Angustia (Distress) asociada a las obsesiones',
            type: 'single_choice',
            options: [
                { label: '0 - Ninguna', value: 0 },
                { label: '1 - Leve (poca)', value: 1 },
                { label: '2 - Moderada (pero manejable)', value: 2 },
                { label: '3 - Severa', value: 3 },
                { label: '4 - Extrema (constantemente cerca de la incapacidad)', value: 4 }
            ]
        },
        {
            id: 'ybocs_4',
            text: '4. Resistencia a las obsesiones',
            type: 'single_choice',
            options: [
                { label: '0 - Siempre se resiste', value: 0 },
                { label: '1 - Mucha resistencia', value: 1 },
                { label: '2 - Alguna resistencia', value: 2 },
                { label: '3 - Frecuentemente cede', value: 3 },
                { label: '4 - Cede completamente', value: 4 }
            ]
        },
        {
            id: 'ybocs_5',
            text: '5. Control sobre las obsesiones',
            type: 'single_choice',
            options: [
                { label: '0 - Control absoluto', value: 0 },
                { label: '1 - Mucho control', value: 1 },
                { label: '2 - Algún control', value: 2 },
                { label: '3 - Poco control', value: 3 },
                { label: '4 - No hay control', value: 4 }
            ]
        },
        {
            id: 'compulsions_header',
            text: 'II. Escala de Medida de la Compulsión',
            type: 'info'
        },
        {
            id: 'ybocs_6',
            text: '6. Tiempo ocupado en las compulsiones',
            type: 'single_choice',
            options: [
                { label: '0 - Ninguno (menos de 1 hora/día)', value: 0 },
                { label: '1 - Leve (0-1 horas/día)', value: 1 },
                { label: '2 - Moderado (1-3 horas/día)', value: 2 },
                { label: '3 - Severo (3-8 horas/día)', value: 3 },
                { label: '4 - Extremo (más de 8 horas/día)', value: 4 }
            ]
        },
        {
            id: 'ybocs_7',
            text: '7. Interferencia de las compulsiones',
            type: 'single_choice',
            options: [
                { label: '0 - Ninguna', value: 0 },
                { label: '1 - Leve', value: 1 },
                { label: '2 - Moderada (definitiva pero manejable)', value: 2 },
                { label: '3 - Severa (sustancialmente entorpecedora)', value: 3 },
                { label: '4 - Extrema (incapacitante)', value: 4 }
            ]
        },
        {
            id: 'ybocs_8',
            text: '8. Angustia (Distress) asociada a las compulsiones',
            type: 'single_choice',
            options: [
                { label: '0 - Ninguna', value: 0 },
                { label: '1 - Leve', value: 1 },
                { label: '2 - Moderada (pero manejable)', value: 2 },
                { label: '3 - Severa', value: 3 },
                { label: '4 - Extrema (constantemente cerca de la incapacidad)', value: 4 }
            ]
        },
        {
            id: 'ybocs_9',
            text: '9. Resistencia a las compulsiones',
            type: 'single_choice',
            options: [
                { label: '0 - Siempre se resiste', value: 0 },
                { label: '1 - Mucha resistencia', value: 1 },
                { label: '2 - Alguna resistencia', value: 2 },
                { label: '3 - Frecuentemente cede', value: 3 },
                { label: '4 - Cede completamente', value: 4 }
            ]
        },
        {
            id: 'ybocs_10',
            text: '10. Control sobre las compulsiones',
            type: 'single_choice',
            options: [
                { label: '0 - Control absoluto', value: 0 },
                { label: '1 - Mucho control', value: 1 },
                { label: '2 - Algún control', value: 2 },
                { label: '3 - Poco control', value: 3 },
                { label: '4 - No hay control', value: 4 }
            ]
        }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            let obsessions = 0;
            let compulsions = 0;

            for (const [key, val] of Object.entries(answers)) {
                if (typeof val === 'number') {
                    total += val;
                    const index = parseInt(key.replace('ybocs_', ''));
                    if (index >= 1 && index <= 5) obsessions += val;
                    if (index >= 6 && index <= 10) compulsions += val;
                }
            }

            return { total, obsessions, compulsions };
        },
        interpret: (result) => {
            const { total } = result;
            let severity = '';
            if (total <= 7) severity = 'Subclínico';
            else if (total <= 15) severity = 'Leve';
            else if (total <= 23) severity = 'Moderado';
            else if (total <= 31) severity = 'Severo';
            else severity = 'Extremo';

            return `Puntuación Total: ${total} (${severity}).\nObsesiones: ${result.obsessions}/20.\nCompulsiones: ${result.compulsions}/20.`;
        }
    }
}
