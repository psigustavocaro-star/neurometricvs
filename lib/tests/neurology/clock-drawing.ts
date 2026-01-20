import { TestDefinition } from '@/types/test'

const criteriaOptions = [
    { label: "0 - Incorrecto", value: 0 },
    { label: "1 - Correcto", value: 1 }
]

export const clockDrawing: TestDefinition = {
    id: 'clock-drawing',
    title: 'Test del Dibujo del Reloj (CDT)',
    description: 'Prueba de cribado cognitivo para evaluar funciones visuoespaciales y ejecutivas. Se pide al paciente dibujar un reloj marcando las 11:10.',
    category: 'neurology', // Cognitive
    duration: '2-5 min',
    questions: [
        { type: 'info', id: 'instr', text: 'Instrucción: "Dibuje una esfera de reloj, ponga todos los números y las manecillas marcando las 11 y 10". Califique según el método de Cacho (0-10) o criterios simplificados.' },

        { id: 'contour', text: '1. Esfera/Contorno (Circular, cerrado, simétrico)', type: 'single_choice', options: criteriaOptions }, // 1 pt
        { id: 'numbers_present', text: '2. Presencia de números (Están todos los 12)', type: 'single_choice', options: criteriaOptions }, // 1 pt
        { id: 'numbers_order', text: '3. Orden de números (Secuencia correcta)', type: 'single_choice', options: criteriaOptions }, // 1 pt
        { id: 'numbers_pos', text: '4. Posición de números (Bien distribuidos)', type: 'single_choice', options: criteriaOptions }, // 1 pt
        { id: 'center', text: '5. Centro del reloj (Marcado o inferido correctamente)', type: 'single_choice', options: criteriaOptions }, // 1 pt (Some scales use this)
        { id: 'hands_present', text: '6. Presencia de manecillas (Dos manecillas)', type: 'single_choice', options: criteriaOptions }, // 1 pt
        { id: 'hands_proportion', text: '7. Proporción de manecillas (Una más corta que otra)', type: 'single_choice', options: criteriaOptions }, // 1 pt
        { id: 'time_correct', text: '8. Hora correcta (Manecillas en 11 y 2)', type: 'single_choice', options: criteriaOptions }, // 1 pt

        {
            id: 'global_score', text: 'Puntuación Global (Si prefiere usar escala Sunderland 1-10 directamente):', type: 'single_choice', options: [
                { label: "N/A - Usar cálculo automático arriba", value: 0 },
                { label: "10 - Dibujo normal", value: 10 },
                { label: "6-9 - Errores leves/moderados", value: 8 },
                { label: "1-5 - Errores severos", value: 3 }
            ]
        }
    ],
    scoring: {
        calculate: (answers) => {
            if (answers['global_score'] && answers['global_score'] > 0) return answers['global_score'];

            let total = 0;
            const keys = ['contour', 'numbers_present', 'numbers_order', 'numbers_pos', 'center', 'hands_present', 'hands_proportion', 'time_correct'];
            keys.forEach(k => { if (answers[k]) total += answers[k]; });
            return total;
        },
        interpret: (score: any) => {
            return 'Puntuación: ' + score + '. (Referencia: < 6 sugiere deterioro cognitivo).';
        }
    }
}
