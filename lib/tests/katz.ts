import { TestDefinition } from '@/types/test'

const katzOptions = [
    { label: 'Independiente (Sin ayuda)', value: 1 },
    { label: 'Dependiente (Necesita ayuda)', value: 0 }
]

export const katz: TestDefinition = {
    id: 'katz',
    title: 'Índice de Katz (Actividades de la Vida Diaria)',
    description: 'Evaluación del grado de dependencia en actividades básicas de la vida diaria.',
    questions: [
        { id: 'q1', text: '1. Bañarse (Lavar todo el cuerpo o parte, sin ayuda o con ayuda solo en una parte).', type: 'single_choice', options: katzOptions },
        { id: 'q2', text: '2. Vestirse (Elige ropa, se viste, abrocha; incluye zapatos).', type: 'single_choice', options: katzOptions },
        { id: 'q3', text: '3. Uso del inodoro (Va al baño, se limpia, se arregla la ropa).', type: 'single_choice', options: katzOptions },
        { id: 'q4', text: '4. Movilidad (Se levanta y acuesta de la cama, se sienta y levanta de la silla).', type: 'single_choice', options: katzOptions },
        { id: 'q5', text: '5. Continencia (Control completo de esfínteres).', type: 'single_choice', options: katzOptions },
        { id: 'q6', text: '6. Alimentación (Lleva la comida del plato a la boca).', type: 'single_choice', options: katzOptions }
    ],
    scoring: {
        ranges: [
            { min: 6, max: 6, label: 'A. Independiente en todas las funciones', color: 'green' },
            { min: 4, max: 5, label: 'Dependencia Leve/Moderada', color: 'orange' },
            { min: 0, max: 3, label: 'Dependencia Severa (G)', color: 'red' }
        ]
    }
}
