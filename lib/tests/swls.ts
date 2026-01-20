import { TestDefinition } from '@/types/test'

const swlsOptions = [
    { label: 'Totalmente en desacuerdo', value: 1 },
    { label: 'En desacuerdo', value: 2 },
    { label: 'Ni de acuerdo ni en desacuerdo', value: 3 },
    { label: 'De acuerdo', value: 4 },
    { label: 'Totalmente de acuerdo', value: 5 }
]

export const swls: TestDefinition = {
    id: 'swls',
    title: 'SWLS (Escala de Satisfacción con la Vida)',
    description: 'Medida cognitiva global de la satisfacción con la propia vida.',
    instructions: 'Indique su grado de acuerdo con las siguientes afirmaciones (Escala reducida 1-5).',
    questions: [
        { id: 'q1', text: '1. En la mayoría de los aspectos, mi vida es como quiero que sea.', type: 'single_choice', options: swlsOptions },
        { id: 'q2', text: '2. Las circunstancias de mi vida son muy buenas.', type: 'single_choice', options: swlsOptions },
        { id: 'q3', text: '3. Estoy satisfecho con mi vida.', type: 'single_choice', options: swlsOptions },
        { id: 'q4', text: '4. Hasta ahora, he conseguido las cosas importantes que quiero en la vida.', type: 'single_choice', options: swlsOptions },
        { id: 'q5', text: '5. Si pudiera vivir mi vida otra vez, no cambiaría casi nada.', type: 'single_choice', options: swlsOptions }
    ],
    scoring: {
        ranges: [
            { min: 5, max: 9, label: 'Extremadamente insatisfecho', color: 'red' },
            { min: 10, max: 14, label: 'Insatisfecho', color: 'orange' },
            { min: 15, max: 15, label: 'Neutral', color: 'yellow' },
            { min: 16, max: 20, label: 'Satisfecho', color: 'green' },
            { min: 21, max: 25, label: 'Extremadamente satisfecho', color: 'green' }
        ]
    }
}
