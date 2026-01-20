import { TestDefinition } from '@/types/test'

const freqOptions = [
    { label: "1 - Nunca", value: 1 },
    { label: "2 - Ocasionalmente", value: 2 },
    { label: "3 - Frecuentemente", value: 3 },
    { label: "4 - Siempre", value: 4 }
]

export const spm2: TestDefinition = {
    id: 'spm-2',
    title: 'Sensory Processing Measure 2 (SPM-2) - Formulario Hogar (5-12 años)',
    description: 'Evaluación del procesamiento sensorial, praxis y participación social en el hogar.',
    category: 'other', // OT
    duration: '15-20 min',
    questions: [
        { type: 'info', id: 'intro', text: 'Indique la frecuencia de los comportamientos observados en el último mes.' },

        { type: 'info', id: 'vis', text: 'Visión' },
        { id: 'vis1', text: '1. Le molestan las luces brillantes (se cubre los ojos, entrecierra).', type: 'single_choice', options: freqOptions },
        { id: 'vis2', text: '2. Tiene dificultad para encontrar objetos en un cajón desordenado.', type: 'single_choice', options: freqOptions },
        { id: 'vis3', text: '3. Se distrae visualmente con facilidad.', type: 'single_choice', options: freqOptions },

        { type: 'info', id: 'aud', text: 'Audición' },
        { id: 'aud1', text: '4. Se cubre los oídos ante ruidos fuertes (aspiradora, secador).', type: 'single_choice', options: freqOptions },
        { id: 'aud2', text: '5. No responde cuando se le llama por su nombre (parece ignorar).', type: 'single_choice', options: freqOptions },
        { id: 'aud3', text: '6. Se distrae con ruidos de fondo.', type: 'single_choice', options: freqOptions },

        { type: 'info', id: 'tou', text: 'Tacto' },
        { id: 'tou1', text: '7. Se retira o reacciona negativamente al ser tocado inesperadamente.', type: 'single_choice', options: freqOptions },
        { id: 'tou2', text: '8. Evita texturas de ciertas ropas o comidas.', type: 'single_choice', options: freqOptions },
        { id: 'tou3', text: '9. Busca tocar todo o a todos (necesidad táctil).', type: 'single_choice', options: freqOptions },

        { type: 'info', id: 'pro', text: 'Gusto y Olfato' },
        { id: 'pro1', text: '10. Es muy selectivo con la comida (texturas/temperaturas).', type: 'single_choice', options: freqOptions },
        { id: 'pro2', text: '11. Reacciona con náuseas a ciertos olores comunes.', type: 'single_choice', options: freqOptions },

        { type: 'info', id: 'bod', text: 'Conciencia Corporal (Propiocepción)' },
        { id: 'bod1', text: '12. Choca contra objetos o personas.', type: 'single_choice', options: freqOptions },
        { id: 'bod2', text: '13. Mastica o muerde objetos no comestibles (lápices, ropa).', type: 'single_choice', options: freqOptions },

        { type: 'info', id: 'bal', text: 'Equilibrio y Movimiento (Vestibular)' },
        { id: 'bal1', text: '14. Evita juegos de movimiento (columpios, toboganes).', type: 'single_choice', options: freqOptions },
        { id: 'bal2', text: '15. Busca movimiento excesivo (girar, saltar) y no se marea.', type: 'single_choice', options: freqOptions },

        { type: 'info', id: 'pla', text: 'Planificación e Ideas (Praxis)' },
        { id: 'pla1', text: '16. Tiene dificultad para aprender nuevas tareas motoras.', type: 'single_choice', options: freqOptions },
        { id: 'pla2', text: '17. Es desordenado al comer o trabajar.', type: 'single_choice', options: freqOptions },

        { type: 'info', id: 'soc', text: 'Participación Social' },
        { id: 'soc1', text: '18. Tiene dificultad para jugar con otros niños.', type: 'single_choice', options: freqOptions },
        { id: 'soc2', text: '19. No respeta el espacio personal de los demás.', type: 'single_choice', options: freqOptions },
        { id: 'soc3', text: '20. Tiene dificultad para participar en actividades familiares.', type: 'single_choice', options: freqOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            // Sum simplified items
            const keys = ['vis1', 'vis2', 'vis3', 'aud1', 'aud2', 'aud3', 'tou1', 'tou2', 'tou3', 'pro1', 'pro2', 'bod1', 'bod2', 'bal1', 'bal2', 'pla1', 'pla2', 'soc1', 'soc2', 'soc3'];
            keys.forEach(k => {
                if (answers[k]) total += answers[k];
            });
            return total;
        },
        interpret: (score: any) => {
            return 'Puntuación Total Bruta: ' + score + '/80. (Nota: Versión abreviada para cribado digital).';
        }
    }
}
