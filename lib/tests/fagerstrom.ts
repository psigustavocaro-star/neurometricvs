import { TestDefinition } from '@/types/test'

export const fagerstrom: TestDefinition = {
    id: 'fagerstrom',
    title: 'Test de Fagerström',
    description: 'Evaluación del grado de dependencia física a la nicotina.',
    questions: [
        {
            id: 'q1',
            text: '1. ¿Cuánto tarda en fumar el primer cigarrillo después de levantarse por la mañana?',
            type: 'single_choice',
            options: [
                { label: '5 minutos o menos', value: 3 },
                { label: '6-30 minutos', value: 2 },
                { label: '31-60 minutos', value: 1 },
                { label: 'Más de 60 minutos', value: 0 }
            ]
        },
        {
            id: 'q2',
            text: '2. ¿Le cuesta no fumar en lugares donde está prohibido (cine, autobús, etc.)?',
            type: 'single_choice',
            options: [
                { label: 'Sí', value: 1 },
                { label: 'No', value: 0 }
            ]
        },
        {
            id: 'q3',
            text: '3. ¿A qué cigarrillo le costaría más renunciar?',
            type: 'single_choice',
            options: [
                { label: 'El primero de la mañana', value: 1 },
                { label: 'Otros', value: 0 }
            ]
        },
        {
            id: 'q4',
            text: '4. ¿Cuántos cigarrillos fuma al día?',
            type: 'single_choice',
            options: [
                { label: '31 o más', value: 3 },
                { label: '21-30', value: 2 },
                { label: '11-20', value: 1 },
                { label: '10 o menos', value: 0 }
            ]
        },
        {
            id: 'q5',
            text: '5. ¿Fuma más durante las primeras horas del día que durante el resto?',
            type: 'single_choice',
            options: [
                { label: 'Sí', value: 1 },
                { label: 'No', value: 0 }
            ]
        },
        {
            id: 'q6',
            text: '6. Si está tan enfermo que se queda en la cama, ¿fuma?',
            type: 'single_choice',
            options: [
                { label: 'Sí', value: 1 },
                { label: 'No', value: 0 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 2, label: 'Dependencia Muy Baja', color: 'green' },
            { min: 3, max: 4, label: 'Dependencia Baja', color: 'green' },
            { min: 5, max: 5, label: 'Dependencia Media', color: 'orange' },
            { min: 6, max: 7, label: 'Dependencia Alta', color: 'red' },
            { min: 8, max: 10, label: 'Dependencia Muy Alta', color: 'red' }
        ]
    }
}
