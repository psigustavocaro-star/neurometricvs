import { TestDefinition } from '@/types/test'

const cueOptions = [
    { label: "0 - No requiere claves", value: 0 },
    { label: "1 - Claves indirectas verbales", value: 1 },
    { label: "2 - Claves gestuales", value: 2 },
    { label: "3 - Claves directas verbales", value: 3 },
    { label: "4 - Asistencia física", value: 4 },
    { label: "5 - Hacer por el participante", value: 5 }
]

export const efpt: TestDefinition = {
    id: 'efpt',
    title: 'Executive Function Performance Test (EFPT)',
    description: 'Evaluación del funcionamiento ejecutivo basada en el desempeño de cuatro tareas básicas: Cocinar, Teléfono, Medicación, Pagar facturas.',
    category: 'other', // OT
    duration: '30-45 min',
    questions: [
        { type: 'info', id: 'info_cooking', text: 'Tarea 1: Cocinar (Avena)' },
        { id: 'c_init', text: 'Cocinar: Inicio (Inicio de la tarea)', type: 'single_choice', options: cueOptions },
        { id: 'c_org', text: 'Cocinar: Organización (Reunir materiales)', type: 'single_choice', options: cueOptions },
        { id: 'c_seq', text: 'Cocinar: Secuenciación (Pasos en orden)', type: 'single_choice', options: cueOptions },
        { id: 'c_safe', text: 'Cocinar: Seguridad y Juicio', type: 'single_choice', options: cueOptions },
        { id: 'c_comp', text: 'Cocinar: Terminación', type: 'single_choice', options: cueOptions },

        { type: 'info', id: 'info_phone', text: 'Tarea 2: Uso del Teléfono' },
        { id: 'p_init', text: 'Teléfono: Inicio', type: 'single_choice', options: cueOptions },
        { id: 'p_org', text: 'Teléfono: Organización', type: 'single_choice', options: cueOptions },
        { id: 'p_seq', text: 'Teléfono: Secuenciación', type: 'single_choice', options: cueOptions },
        { id: 'p_safe', text: 'Teléfono: Seguridad y Juicio', type: 'single_choice', options: cueOptions },
        { id: 'p_comp', text: 'Teléfono: Terminación', type: 'single_choice', options: cueOptions },

        { type: 'info', id: 'info_meds', text: 'Tarea 3: Manejo de Medicación' },
        { id: 'm_init', text: 'Medicación: Inicio', type: 'single_choice', options: cueOptions },
        { id: 'm_org', text: 'Medicación: Organización', type: 'single_choice', options: cueOptions },
        { id: 'm_seq', text: 'Medicación: Secuenciación', type: 'single_choice', options: cueOptions },
        { id: 'm_safe', text: 'Medicación: Seguridad y Juicio', type: 'single_choice', options: cueOptions },
        { id: 'm_comp', text: 'Medicación: Terminación', type: 'single_choice', options: cueOptions },

        { type: 'info', id: 'info_bills', text: 'Tarea 4: Pago de Facturas' },
        { id: 'b_init', text: 'Facturas: Inicio', type: 'single_choice', options: cueOptions },
        { id: 'b_org', text: 'Facturas: Organización', type: 'single_choice', options: cueOptions },
        { id: 'b_seq', text: 'Facturas: Secuenciación', type: 'single_choice', options: cueOptions },
        { id: 'b_safe', text: 'Facturas: Seguridad y Juicio', type: 'single_choice', options: cueOptions },
        { id: 'b_comp', text: 'Facturas: Terminación', type: 'single_choice', options: cueOptions }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            Object.values(answers).forEach(v => { if (typeof v === 'number') total += v; });
            return total;
        },
        interpret: (score: any) => {
            // Higher score = more assistance needed = worse function.
            return 'Puntuación Total EFPT: ' + score + '. (Mayor puntaje indica mayor necesidad de asistencia).';
        }
    }
}
