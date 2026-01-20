import { TestDefinition } from '@/types/test'

const helpOptions = [
    { label: "0 - Desempeño intacto / Independiente", value: 0 },
    { label: "1 - Requiere claves/ayuda mínima", value: 1 },
    { label: "2 - Requiere gran asistencia", value: 2 },
    { label: "3 - Dependiente", value: 3 },
    { label: "4 - No realizado / Falla total", value: 4 }
]

export const kettle: TestDefinition = {
    id: 'kettle',
    title: 'The Kettle Test (Test del Hervidor)',
    description: 'Evaluación breve basada en el desempeño de una tarea funcional (preparar dos bebidas calientes) para detectar problemas cognitivos en ictus/demencia.',
    category: 'other', // OT
    duration: '10-20 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Tarea: Preparar dos bebidas calientes diferentes con ingredientes específicos. Puntúe cada paso (0-4).' },

        { id: 'opening', text: '1. Apertura / Inicio (Entiende la tarea)', type: 'single_choice', options: helpOptions },
        { id: 'assembly', text: '2. Montaje (Reúne materiales)', type: 'single_choice', options: helpOptions },
        { id: 'kettle_use', text: '3. Uso del hervidor (Llena, enciende)', type: 'single_choice', options: helpOptions },
        { id: 'ingredients', text: '4. Manejo de ingredientes (Selección)', type: 'single_choice', options: helpOptions },
        { id: 'pouring', text: '5. Vertido (Seguridad)', type: 'single_choice', options: helpOptions },
        { id: 'sequence', text: '6. Secuencia lógica', type: 'single_choice', options: helpOptions },
        { id: 'safety', text: '7. Seguridad general', type: 'single_choice', options: helpOptions },
        { id: 'completion', text: '8. Terminación (Limpieza/Orden)', type: 'single_choice', options: helpOptions },
        { id: 'recall', text: '9. Recuerdo diferido (Recuerda instrucciones)', type: 'single_choice', options: helpOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            const keys = ['opening', 'assembly', 'kettle_use', 'ingredients', 'pouring', 'sequence', 'safety', 'completion', 'recall'];
            keys.forEach(k => {
                const v = answers[k];
                if (typeof v === 'number') total += v;
            });
            return total;
        },
        interpret: (score: any) => {
            // Higher score = more difficulty. Max roughly 36? (9 items * 4) but depends on version.
            // Manual usually 13 items. This is a condensed functional version.
            return 'Puntuación Total Kettle: ' + score + '. (Mayor puntaje indica mayor dependencia/dificultad cognitiva).';
        }
    }
}
