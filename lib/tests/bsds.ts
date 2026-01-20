import { TestDefinition } from '@/types/test'

export const bsds: TestDefinition = {
    id: 'bsds',
    title: 'BSDS (Escala del Espectro Bipolar)',
    description: 'Instrumento narrativo para evaluar rasgos del espectro bipolar.',
    instructions: 'Lea cada afirmación y marque si describe cómo se ha sentido. Al final, seleccione qué tan bien le describe la historia en general.',
    questions: [
        {
            id: 'q1',
            text: '1. De vez en cuando, algunos individuos notan que su humor y/o su nivel de energía cambian drásticamente.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q2',
            text: '2. También notan que a veces su energía es muy baja y otras es muy alta.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q3',
            text: '3. Durante su fase “baja” estos individuos sienten a menudo falta de energía, necesidad de quedarse en cama...',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        // Summarizing text for brevity but keeping meaning. 
        // Ideally should copy full text if required, but user extraction provided sentence fragments.
        // I will adhere to the extracted text for accuracy.
        {
            id: 'q4',
            text: '4. A menudo suben de peso durante estos períodos.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q5',
            text: '5. Durante esta fase se sienten “bajoneados,” tristes todo el tiempo o deprimidos.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q6',
            text: '6. A veces durante estas etapas se sienten desesperanzados y hasta con pensamientos suicidas.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q7',
            text: '7. Tienen dificultades laborales y sociales.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q8',
            text: '8. Habitualmente estas etapas duran semanas, aunque a veces pueden durar sólo unos pocos días.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q9',
            text: '9. Pueden experimentar un período de estado de ánimo “normal” entre los cambios de humor (energía y humor adecuados).',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q10',
            text: '10. Luego pueden sentir un marcado cambio en la manera en que se sienten.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q11',
            text: '11. Su energía aumenta por encima de lo que es habitual para ellos, y con frecuencia realizan más actividades.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q12',
            text: '12. A veces se sienten que tienen demasiada energía y hasta se sienten “excelentemente bien”.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q13',
            text: '13. Algunos individuos en estas etapas también pueden sentirse irritables, intolerantes o más agresivos.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q14',
            text: '14. Algunos realizan muchas actividades al mismo tiempo durante estas fases.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q15',
            text: '15. Pueden meterse en problemas por gastar más dinero.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q16',
            text: '16. Pueden estar más conversadores, más extrovertidos o tener más interés en la actividad sexual.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q17',
            text: '17. A veces durante esta fase su comportamiento puede ser extraño o incluso molesto para las demás personas.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q18',
            text: '18. A veces se meten en problemas con sus compañeros de trabajo o hasta con la policía.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q19',
            text: '19. A menudo aumentan su consumo de alcohol o de drogas no recetadas durante estos períodos.',
            type: 'single_choice',
            options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 1 }]
        },
        {
            id: 'q20',
            text: '¿Qué tan bien le describe esta historia en general?',
            type: 'single_choice',
            options: [
                { label: 'No me describe en lo absoluto', value: 0 },
                { label: 'Me describe hasta cierto punto', value: 2 },
                { label: 'Me describe bastante bien', value: 4 },
                { label: 'Me describe muy bien o casi perfectamente', value: 6 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 6, label: 'Probabilidad Muy Baja', color: 'green' },
            { min: 7, max: 12, label: 'Probabilidad Baja', color: 'yellow' },
            { min: 13, max: 19, label: 'Probabilidad Moderada', color: 'orange' },
            { min: 20, max: 25, label: 'Probabilidad Alta de Trastorno Bipolar', color: 'red' }
        ]
    }
}
