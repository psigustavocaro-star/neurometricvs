import { TestDefinition } from '@/types/test'

const options = [
    { label: "0 - Normal: Sin problemas.", value: 0 },
    { label: "1 - Mínimo: Problemas presentes pero no interfieren.", value: 1 },
    { label: "2 - Leve: Interferencia modesta.", value: 2 },
    { label: "3 - Moderado: Interferencia significativa.", value: 3 },
    { label: "4 - Severo: Problemas incapacitantes.", value: 4 }
    // Note: Actual MDS-UPDRS has specific descriptions per item. We use generic severity for digitization speed.
]

export const mdsUpdrs: TestDefinition = {
    id: 'mds-updrs',
    title: 'MDS-UPDRS (Parte I y II)',
    description: 'Escala Unificada de la Sociedad de Trastornos del Movimiento para la Enfermedad de Parkinson (Experiencias no motoras y motoras de la vida diaria).',
    category: 'neurology',
    duration: '15-20 min',
    questions: [
        { type: 'info', id: 'info1', text: 'Parte I: Experiencias No Motoras de la Vida Diaria' },
        { id: '1.1', text: '1.1 Deterioro cognitivo', type: 'single_choice', options },
        { id: '1.2', text: '1.2 Alucinaciones y psicosis', type: 'single_choice', options },
        { id: '1.3', text: '1.3 Ánimo depresivo', type: 'single_choice', options },
        { id: '1.4', text: '1.4 Ansiedad', type: 'single_choice', options },
        { id: '1.5', text: '1.5 Apatía', type: 'single_choice', options },
        { id: '1.6', text: '1.6 Rasgos de Trastorno de Control de Impulsos', type: 'single_choice', options },
        { id: '1.7', text: '1.7 Problemas de sueño', type: 'single_choice', options },
        { id: '1.8', text: '1.8 Somnolencia diurna', type: 'single_choice', options },
        { id: '1.9', text: '1.9 Dolor y sensaciones', type: 'single_choice', options },
        { id: '1.10', text: '1.10 Problemas urinarios', type: 'single_choice', options },
        { id: '1.11', text: '1.11 Problemas de estreñimiento', type: 'single_choice', options },
        { id: '1.12', text: '1.12 Mareo al ponerse de pie', type: 'single_choice', options },
        { id: '1.13', text: '1.13 Fatiga', type: 'single_choice', options },

        { type: 'info', id: 'info2', text: 'Parte II: Experiencias Motoras de la Vida Diaria (Off/On)' },
        { id: '2.1', text: '2.1 Habla', type: 'single_choice', options },
        { id: '2.2', text: '2.2 Salivación y babeo', type: 'single_choice', options },
        { id: '2.3', text: '2.3 Masticar y tragar', type: 'single_choice', options },
        { id: '2.4', text: '2.4 Comer', type: 'single_choice', options },
        { id: '2.5', text: '2.5 Vestirse', type: 'single_choice', options },
        { id: '2.6', text: '2.6 Higiene', type: 'single_choice', options },
        { id: '2.7', text: '2.7 Escritura', type: 'single_choice', options },
        { id: '2.8', text: '2.8 Pasatiempos y otras actividades', type: 'single_choice', options },
        { id: '2.9', text: '2.9 Darse la vuelta en la cama', type: 'single_choice', options },
        { id: '2.10', text: '2.10 Temblor', type: 'single_choice', options },
        { id: '2.11', text: '2.11 Levantarse de la cama/silla', type: 'single_choice', options },
        { id: '2.12', text: '2.12 Caminar y equilibrio', type: 'single_choice', options },
        { id: '2.13', text: '2.13 Congelación (Freezing)', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            let part1 = 0;
            let part2 = 0;

            // Part I sum (1.1 - 1.13)
            const p1Keys = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '1.10', '1.11', '1.12', '1.13'];
            p1Keys.forEach(k => { if (answers[k] !== undefined) part1 += answers[k]; });

            // Part II sum (2.1 - 2.13)
            const p2Keys = ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '2.10', '2.11', '2.12', '2.13'];
            p2Keys.forEach(k => { if (answers[k] !== undefined) part2 += answers[k]; });

            return { part1, part2, total: part1 + part2 };
        },
        interpret: (res: any) => {
            return 'Puntuación Parte I (No Motora): ' + res.part1 + ' (Max 52). Puntuación Parte II (Motora): ' + res.part2 + ' (Max 52). Total (I+II): ' + res.total + '.';
        }
    }
}
