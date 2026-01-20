import { TestDefinition } from '@/types/test'

const scoreOptions = (max: number) => {
    const arr = [];
    for (let i = 0; i <= max; i++) arr.push({ label: String(i), value: i });
    return arr;
};

export const sage: TestDefinition = {
    id: 'sage',
    title: 'Self-Administered Gerocognitive Exam (SAGE)',
    description: 'Examen gerocognitivo autoadministrado para detectar deterioro cognitivo leve o demencia.',
    category: 'geriatrics', // or Neurology
    duration: '10-15 min',
    questions: [
        { id: 'orientation', text: '1. Orientación (Fecha completa)', type: 'single_choice', options: scoreOptions(4) },
        { id: 'naming', text: '2. Nombramiento (Imágenes)', type: 'single_choice', options: scoreOptions(2) },
        { id: 'similarities', text: '3. Similitudes', type: 'single_choice', options: scoreOptions(2) },
        { id: 'calculation', text: '4. Cálculo', type: 'single_choice', options: scoreOptions(2) },
        { id: 'memory', text: '5. Memoria (Construcción/Recuerdo)', type: 'single_choice', options: scoreOptions(2) },
        { id: 'construction', text: '6. Construcción Visual (Dibujo 3D, Reloj)', type: 'single_choice', options: scoreOptions(4) },
        // Clock is usually 2 points, Cube 2 points -> 4 total? SAGE max is 22.
        { id: 'executive', text: '7. Funciones Ejecutivas / Trazado (Trail making)', type: 'single_choice', options: scoreOptions(2) },
        { id: 'verbal_fluency', text: '8. Fluidez Verbal', type: 'single_choice', options: scoreOptions(2) },
        { id: 'other', text: '9. Otros items', type: 'single_choice', options: scoreOptions(2) }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            Object.values(answers).forEach(v => { if (typeof v === 'number') total += v; });
            return total;
        },
        interpret: (score: any) => {
            // Max 22. 
            // 17-22: Normal.
            // 15-16: Deterioro cognitivo leve probable.
            // <= 14: Demencia probable.
            let interp = 'Normal';
            if (score <= 16) interp = 'Deterioro Cognitivo Leve Probable';
            if (score <= 14) interp = 'Demencia Probable';
            return 'Puntuación Total SAGE: ' + score + '/22. Interpretación: ' + interp;
        }
    }
}
