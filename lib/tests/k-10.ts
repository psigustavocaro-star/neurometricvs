import { TestDefinition } from '@/types/test'

const k10Options = [
    { label: 'Nunca', value: 1 },
    { label: 'Pocas veces', value: 2 },
    { label: 'A veces', value: 3 },
    { label: 'Muchas veces', value: 4 },
    { label: 'Siempre', value: 5 }
]

export const k10: TestDefinition = {
    id: 'k-10',
    title: 'K-10 (Escala de Malestar Psicológico de Kessler)',
    description: 'Medida global de malestar psicológico (ansiedad y depresión) en el último mes.',
    questions: [
        { id: 'q1', text: '1. ¿Con qué frecuencia te has sentido cansado, sin alguna buena razón?', type: 'single_choice', options: k10Options },
        { id: 'q2', text: '2. ¿Con qué frecuencia te has sentido nervioso?', type: 'single_choice', options: k10Options },
        { id: 'q3', text: '3. ¿Con qué frecuencia te has sentido tan nervioso que nada te podía calmar?', type: 'single_choice', options: k10Options },
        { id: 'q4', text: '4. ¿Con qué frecuencia te has sentido desesperado?', type: 'single_choice', options: k10Options },
        { id: 'q5', text: '5. ¿Con qué frecuencia te has sentido inquieto o intranquilo?', type: 'single_choice', options: k10Options },
        { id: 'q6', text: '6. ¿Con qué frecuencia te has sentido tan impaciente que no has podido mantenerte quieto?', type: 'single_choice', options: k10Options },
        { id: 'q7', text: '7. ¿Con qué frecuencia te has sentido deprimido?', type: 'single_choice', options: k10Options },
        { id: 'q8', text: '8. ¿Con qué frecuencia has sentido que todo lo que haces representa un gran esfuerzo?', type: 'single_choice', options: k10Options },
        { id: 'q9', text: '9. ¿Con qué frecuencia te has sentido tan triste que nada podía animarte?', type: 'single_choice', options: k10Options },
        { id: 'q10', text: '10. ¿Con qué frecuencia te has sentido un inútil?', type: 'single_choice', options: k10Options }
    ],
    scoring: {
        ranges: [
            { min: 10, max: 19, label: 'Probablemente se encuentra bien', color: 'green' },
            { min: 20, max: 24, label: 'Probable trastorno leve', color: 'yellow' },
            { min: 25, max: 29, label: 'Probable trastorno moderado', color: 'orange' },
            { min: 30, max: 50, label: 'Probable trastorno severo', color: 'red' }
        ]
    }
}
