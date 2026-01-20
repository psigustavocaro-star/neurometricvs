import { TestDefinition } from '@/types/test'

const fsOptions = (max: number) => {
    const opts = [];
    for (let i = 0; i <= max; i++) {
        opts.push({ label: i + ' - Ver descripción manual', value: i });
    }
    return opts;
};

const ambulationOptions = [
    { label: "0 - Sin restricciones, completamente ambulatorio", value: 0 },
    { label: "1 - Camina ≥ 500m sin ayuda", value: 1 },
    { label: "2 - Camina 300-499m sin ayuda", value: 2 },
    { label: "3 - Camina 200-299m sin ayuda", value: 3 },
    { label: "4 - Camina 100-199m sin ayuda", value: 4 },
    { label: "5 - Camina < 100m sin ayuda, o con bastón (unilateral)", value: 5 },
    { label: "6 - Requiere bastón bilateral o andador (< 50m)", value: 6 },
    { label: "7 - Restringido a silla de ruedas (puede autopropulsarse)", value: 7 },
    { label: "8 - Restringido a cama/silla (necesita ayuda transferencias)", value: 8 },
    { label: "9 - Encamado total", value: 9 }
]

export const edss: TestDefinition = {
    id: 'edss',
    title: 'Escala Extendida del Estado de Discapacidad de Kurtzke (EDSS)',
    description: 'Estándar de oro para cuantificar la discapacidad en Esclerosis Múltiple, basada en Sistemas Funcionales (SF) y deambulación.',
    category: 'neurology',
    duration: '20-30 min',
    questions: [
        { type: 'info', id: 'info_fs', text: 'Puntúe cada Sistema Funcional (0 = Normal).' },
        { id: 'fs_pyramidal', text: '1. Piramidal (0-6)', type: 'single_choice', options: fsOptions(6) },
        { id: 'fs_cerebellar', text: '2. Cerebeloso (0-5)', type: 'single_choice', options: fsOptions(5) },
        { id: 'fs_brainstem', text: '3. Tronco Encefálico (0-5)', type: 'single_choice', options: fsOptions(5) },
        { id: 'fs_sensory', text: '4. Sensitivo (0-6)', type: 'single_choice', options: fsOptions(6) },
        { id: 'fs_bowel', text: '5. Intestino y Vejiga (0-6)', type: 'single_choice', options: fsOptions(6) },
        { id: 'fs_visual', text: '6. Visual (0-6)', type: 'single_choice', options: fsOptions(6) },
        { id: 'fs_cerebral', text: '7. Mental/Cerebral (0-5)', type: 'single_choice', options: fsOptions(5) },
        { id: 'fs_other', text: '8. Otros (0-1)', type: 'single_choice', options: fsOptions(1) },

        { id: 'ambulation', text: '9. Deambulación', type: 'single_choice', options: ambulationOptions }
    ],
    scoring: {
        calculate: (answers) => {
            const ambulationVal = answers['ambulation'];
            // Simplified Ambulation Logic: If Ambulation is set, use its implied min score
            let baseScore = 0;
            const steps = [0, 4.5, 5.0, 5.5, 6.0, 6.5, 6.5, 7.0, 8.0, 9.0];
            // values: 0-9
            // Check if ambulationVal is a number and within range
            if (typeof ambulationVal === 'number' && ambulationVal >= 0 && ambulationVal < steps.length) {
                baseScore = steps[ambulationVal];
            }

            // FS Logic (Simplified Max)
            const fsVals = [
                answers['fs_pyramidal'], answers['fs_cerebellar'], answers['fs_brainstem'],
                answers['fs_sensory'], answers['fs_bowel'], answers['fs_visual'],
                answers['fs_cerebral'], answers['fs_other']
            ].filter(v => typeof v === 'number').map(v => Number(v));

            const maxFS = Math.max(0, ...fsVals);
            let fsScore = 0;
            if (maxFS >= 1) fsScore = 1.0;
            if (maxFS >= 2) fsScore = 2.0;
            if (maxFS >= 3) fsScore = 3.0; // FS=3 implies EDSS 3.0 usually
            if (maxFS >= 4) fsScore = 4.0; // FS=4 implies EDSS 4.0

            // Final is max of FS-driven and Ambulation-driven
            return Math.max(baseScore, fsScore);
        },
        interpret: (score: any) => {
            return 'Puntuación Estimada EDSS: ' + score + '. (Nota: La puntuación oficial requiere validación clínica estricta de las reglas de Kurtzke).';
        }
    }
}
