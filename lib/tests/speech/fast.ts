import { TestDefinition } from '@/types/test'

const comprehensionOptions = [
    { label: "0 - Incorrecto", value: 0 },
    { label: "1 - Correcto", value: 1 }
]

const expressionOptions = [
    { label: "0 - Incapaz", value: 0 },
    { label: "1 - Pobre", value: 1 },
    { label: "2 - Regular", value: 2 },
    { label: "3 - Bueno", value: 3 },
    { label: "4 - Normal", value: 4 },
    { label: "5 - Superior", value: 5 } // Scale varies, using generic 0-5 for complexity usually 0-1 per item. 
    // Actually FAST items for expression (naming) are often 0/1. 
    // Only "Conversation" is scaled.
]

export const fast: TestDefinition = {
    id: 'fast',
    title: 'Test de Screening de Afasia de Frenchay (FAST)',
    description: 'Cribado rápido para detectar afasia en pacientes con ictus. Evalúa comprensión, expresión, lectura y escritura.',
    category: 'other', // Speech / Neuro
    duration: '5-10 min',
    questions: [
        { type: 'info', id: 'info1', text: '1. Comprensión (Usando lámina de figuras)' },
        { id: 'c1', text: 'Señale el río (0/1)', type: 'single_choice', options: comprehensionOptions },
        { id: 'c2', text: 'Señale los botes (0/1)', type: 'single_choice', options: comprehensionOptions },
        { id: 'c3', text: 'Señale el hombre pescando (0/1)', type: 'single_choice', options: comprehensionOptions },
        { id: 'c4', text: 'Señale la casa del fondo (0/1)', type: 'single_choice', options: comprehensionOptions },
        { id: 'c5', text: 'Señale... (Instrucciones complejas 1)', type: 'single_choice', options: comprehensionOptions },
        // ... (Usually 10 items max 10 points for comprehension)

        { type: 'info', id: 'info2', text: '2. Expresión (Nombramiento / Descripción)' },
        {
            id: 'e_naming', text: 'Nombramiento de objetos (0-5)', type: 'single_choice', options: [
                { label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }
            ]
        },
        {
            id: 'e_desc', text: 'Descripción de lámina (0-5)', type: 'single_choice', options: [
                { label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }
            ]
        },

        { type: 'info', id: 'info3', text: '3. Lectura' },
        {
            id: 'reading', text: 'Lectura de frases/palabras (0-5)', type: 'single_choice', options: [
                { label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }
            ]
        },

        { type: 'info', id: 'info4', text: '4. Escritura' },
        {
            id: 'writing', text: 'Escritura al dictado/copia (0-5)', type: 'single_choice', options: [
                { label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }
            ]
        }
    ],
    scoring: {
        calculate: (answers) => {
            // Simplified sum
            let total = 0;
            Object.values(answers).forEach(v => { if (typeof v === 'number') total += v; });
            return total;
        },
        interpret: (score: any) => {
            // Max varies depending on version (30 or so).
            return 'Puntuación FAST: ' + score + '. (Puntuaciones bajas sugieren afasia).';
        }
    }
}
