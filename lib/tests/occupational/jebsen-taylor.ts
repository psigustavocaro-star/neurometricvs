import { TestDefinition } from '@/types/test'

const secondsOptions = Array.from({ length: 121 }, (_, i) => ({ label: i + ' segundos', value: i })); // 0-120s

export const jebsenTaylor: TestDefinition = {
    id: 'jebsen-taylor',
    title: 'Test de Función Manual de Jebsen-Taylor',
    description: 'Evaluación estandarizada de la destreza motora fina y gruesa mediante 7 subtareas cronometradas.',
    category: 'other', // OT
    duration: '15-20 min',
    questions: [
        { type: 'info', id: 'instr', text: 'Registre el tiempo en segundos para cada mano.' },

        { type: 'info', id: 'nd', text: 'Mano No Dominante' },
        { id: 'nd_writing', text: '1. Escritura (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'nd_cards', text: '2. Vuelta de tarjetas (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'nd_small', text: '3. Objetos pequeños (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'nd_feeding', text: '4. Alimentación simulada (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'nd_checkers', text: '5. Apilado de fichas (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'nd_large_light', text: '6. Objetos grandes ligeros (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'nd_large_heavy', text: '7. Objetos grandes pesados (seg)', type: 'single_choice', options: secondsOptions },

        { type: 'info', id: 'dom', text: 'Mano Dominante' },
        { id: 'd_writing', text: '1. Escritura (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'd_cards', text: '2. Vuelta de tarjetas (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'd_small', text: '3. Objetos pequeños (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'd_feeding', text: '4. Alimentación simulada (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'd_checkers', text: '5. Apilado de fichas (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'd_large_light', text: '6. Objetos grandes ligeros (seg)', type: 'single_choice', options: secondsOptions },
        { id: 'd_large_heavy', text: '7. Objetos grandes pesados (seg)', type: 'single_choice', options: secondsOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let ndTotal = 0;
            let dTotal = 0;
            const subs = ['writing', 'cards', 'small', 'feeding', 'checkers', 'large_light', 'large_heavy'];

            subs.forEach(s => {
                const ndVal = answers['nd_' + s];
                if (typeof ndVal === 'number') ndTotal += ndVal;

                const dVal = answers['d_' + s];
                if (typeof dVal === 'number') dTotal += dVal;
            });

            return { ndTotal, dTotal };
        },
        interpret: (res: any) => {
            return 'Tiempo Total No Dominante: ' + res.ndTotal + 's. Tiempo Total Dominante: ' + res.dTotal + 's. (Comparar con normas por edad/sexo).';
        }
    }
}
