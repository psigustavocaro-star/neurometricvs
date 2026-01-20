import { TestDefinition } from '@/types/test'

export const cesDc: TestDefinition = {
    id: 'ces-dc',
    title: 'CES-DC (Escala de Depresión del Centro de Estudios Epidemiológicos para Niños)',
    description: 'Cuestionario para detectar sintomatología depresiva en niños y adolescentes (6-17 años).',

    questions: [
        {
            id: 'q1',
            text: 'Me sentía incomodo por las cosas que usualmente no me son molestas',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q2',
            text: 'No tenía ganas de comer. No tenía hambre',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q3',
            text: 'No era capaz de sentirme feliz, incluso aunque mi familia y mis amigos me ayudaran a sentirme mejor',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q4', // Reverse
            text: 'Sentía que era apenas tan bueno como los demás compañeros',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 3 },
                { label: 'Un poco (1)', value: 2 },
                { label: 'Algo (2)', value: 1 },
                { label: 'Mucho (3)', value: 0 }
            ]
        },
        {
            id: 'q5',
            text: 'Sentía que no podía poner atención a lo que hacía',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q6',
            text: 'Me sentía decaído e infeliz',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q7',
            text: 'Sentía como que estaba demasiado cansado',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q8', // Reverse
            text: 'Sentía como que algo bueno iba a suceder',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 3 },
                { label: 'Un poco (1)', value: 2 },
                { label: 'Algo (2)', value: 1 },
                { label: 'Mucho (3)', value: 0 }
            ]
        },
        {
            id: 'q9',
            text: 'Sentía que las cosas que antes hice, ahora no las resolvía bien',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q10',
            text: 'Me sentía asustado',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q11',
            text: 'No dormía tan bien como generalmente duermo',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q12', // Reverse
            text: 'Estaba feliz',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 3 },
                { label: 'Un poco (1)', value: 2 },
                { label: 'Algo (2)', value: 1 },
                { label: 'Mucho (3)', value: 0 }
            ]
        },
        {
            id: 'q13',
            text: 'Era más reservado que por lo general',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q14',
            text: 'Me sentía solo, como si no tuviera ningún amigo',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q15',
            text: 'Sentía que las personas que conozco no querían ser mis amigos o que no querían estar conmigo',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q16', // Reverse
            text: 'Pasaba buenos ratos',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 3 },
                { label: 'Un poco (1)', value: 2 },
                { label: 'Algo (2)', value: 1 },
                { label: 'Mucho (3)', value: 0 }
            ]
        },
        {
            id: 'q17',
            text: 'Sentía ganas de gritar',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q18',
            text: 'Me sentía triste',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q19',
            text: 'Sentía que no le gustaba a la gente',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        },
        {
            id: 'q20',
            text: 'Me costaba trabajo comenzar a hacer las cosas',
            type: 'scale',
            options: [
                { label: 'No del todo (0)', value: 0 },
                { label: 'Un poco (1)', value: 1 },
                { label: 'Algo (2)', value: 2 },
                { label: 'Mucho (3)', value: 3 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 14, label: 'Sin depresión significativa', color: 'green' },
            { min: 15, max: 60, label: 'Sintomatología Depresiva Significativa', color: 'red' }
        ]
    }
}
