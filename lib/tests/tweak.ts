import { TestDefinition } from '@/types/test'

export const tweak: TestDefinition = {
    id: 'tweak',
    title: 'Cuestionario TWEAK',
    description: 'Instrumento de cribado para identificar consumo de riesgo de alcohol, especialmente en mujeres.',
    questions: [
        {
            id: 'q1',
            text: '1. Tolerancia: ¿Con cuántos tragos se duerme o se siente ebrio? (Si son 5 o más, marque SÍ).',
            type: 'single_choice',
            options: [
                { label: 'Menos de 5', value: 0 },
                { label: '5 o más (SÍ)', value: 2 }
            ]
        },
        {
            id: 'q2',
            text: '2. Worried (Preocupación): ¿Sus amigos o familiares se han mostrado preocupados por causa de su bebida durante el último año?',
            type: 'single_choice',
            options: [
                { label: 'No', value: 0 },
                { label: 'Sí', value: 1 }
            ]
        },
        {
            id: 'q3',
            text: '3. Eye-opener (Necesidad matutina): ¿Algunas veces se ha tomado un trago en la mañana para empezar el día?',
            type: 'single_choice',
            options: [
                { label: 'No', value: 0 },
                { label: 'Sí', value: 1 }
            ]
        },
        {
            id: 'q4',
            text: '4. Amnesia: ¿A veces ha tomado y después no ha podido recordar lo que dijo o hizo?',
            type: 'single_choice',
            options: [
                { label: 'No', value: 0 },
                { label: 'Sí', value: 1 }
            ]
        },
        {
            id: 'q5',
            text: '5. Cut down (Reducir): ¿A veces siente la necesidad de suspender o disminuir la bebida?',
            type: 'single_choice',
            options: [
                { label: 'No', value: 0 },
                { label: 'Sí', value: 1 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 2, label: 'Negativo (Probable bajo riesgo)', color: 'green' },
            { min: 3, max: 6, label: 'Positivo (Indicativo de abuso/dependencia)', color: 'red' }
        ]
    }
}
