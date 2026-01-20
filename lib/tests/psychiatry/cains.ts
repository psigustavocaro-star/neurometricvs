import { TestDefinition } from '@/types/test'

const options = [
    { label: "0 - Sin problemas", value: 0 },
    { label: "1 - Leve", value: 1 },
    { label: "2 - Moderado", value: 2 },
    { label: "3 - Moderado-Severo", value: 3 },
    { label: "4 - Severo", value: 4 }
]

export const cains: TestDefinition = {
    id: 'cains',
    title: 'Clinical Assessment Interview for Negative Symptoms (CAINS)',
    description: 'Entrevista para evaluar síntomas negativos en dos dominios: Motivación/Placer (MAP) y Expresión (EXP).',
    category: 'psychiatry',
    duration: '20-30 min',
    questions: [
        { type: 'info', id: 'info_map', text: 'MAP: Motivación y Placer' },
        { id: 'item1', text: '1. Motivación para relaciones cercanas (familia/pareja)', type: 'single_choice', options },
        { id: 'item2', text: '2. Motivación para amigos', type: 'single_choice', options },
        { id: 'item3', text: '3. Frecuencia de placer en actividades sociales (pasada semana)', type: 'single_choice', options },
        { id: 'item4', text: '4. Frecuencia de placer anticipado en actividades sociales', type: 'single_choice', options },
        { id: 'item5', text: '5. Motivación para trabajo/escuela', type: 'single_choice', options },
        { id: 'item6', text: '6. Motivación para actividades recreativas', type: 'single_choice', options },
        { id: 'item7', text: '7. Frecuencia de placer en actividades recreativas (pasada semana)', type: 'single_choice', options },
        { id: 'item8', text: '8. Frecuencia de placer anticipado en actividades recreativas', type: 'single_choice', options },
        { id: 'item9', text: '9. Motivación para cuidar la higiene y apariencia', type: 'single_choice', options },

        { type: 'info', id: 'info_exp', text: 'EXP: Expresión' },
        { id: 'item10', text: '10. Expresión facial', type: 'single_choice', options },
        { id: 'item11', text: '11. Expresividad vocal (entonación/prosodia)', type: 'single_choice', options },
        { id: 'item12', text: '12. Gestos expresivos', type: 'single_choice', options },
        { id: 'item13', text: '13. Cantidad de habla (vocalización espontánea)', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            let map = 0;
            let exp = 0;

            // MAP: Items 1-9
            for (let i = 1; i <= 9; i++) {
                const v = answers['item' + i];
                if (typeof v === 'number') map += v;
            }
            // EXP: Items 10-13
            for (let i = 10; i <= 13; i++) {
                const v = answers['item' + i];
                if (typeof v === 'number') exp += v;
            }

            return { map, exp, total: map + exp };
        },
        interpret: (res: any) => {
            return 'Puntuación MAP (Motivación/Placer): ' + res.map + ' (Max 36). Puntuación EXP (Expresión): ' + res.exp + ' (Max 16). Total: ' + res.total + '.';
        }
    }
}
