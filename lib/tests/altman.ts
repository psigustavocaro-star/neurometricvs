import { TestDefinition } from '@/types/test'

export const altman: TestDefinition = {
    id: 'altman',
    title: 'Escala de Manía de Altman (ASMS)',
    description: 'Escala autoaplicada para evaluar la presencia y severidad de síntomas maníacos o hipomaníacos.',
    questions: [
        {
            id: 'q1',
            text: '1. Estado de Ánimo',
            type: 'single_choice',
            options: [
                { label: '0. No me siento más alegre o animado de lo habitual', value: 0 },
                { label: '1. Ocasionalmente me siento más alegre o animado de lo habitual', value: 1 },
                { label: '2. A menudo me siento más alegre o animado de lo habitual', value: 2 },
                { label: '3. Me siento más alegre o animado de lo habitual la mayor parte del tiempo', value: 3 },
                { label: '4. Me siento más alegre o animado de lo habitual todo el tiempo', value: 4 }
            ]
        },
        {
            id: 'q2',
            text: '2. Autoestima / Seguridad',
            type: 'single_choice',
            options: [
                { label: '0. No me siento más seguro de mí mismo de lo habitual', value: 0 },
                { label: '1. Ocasionalmente me siento más seguro de mí mismo de lo habitual', value: 1 },
                { label: '2. A menudo me siento más seguro de mí mismo de lo habitual', value: 2 },
                { label: '3. La mayor parte del tiempo me siento más seguro de mí mismo de lo habitual', value: 3 },
                { label: '4. Me siento extremadamente seguro de mí mismo todo el tiempo', value: 4 }
            ]
        },
        {
            id: 'q3',
            text: '3. Necesidad de Sueño',
            type: 'single_choice',
            options: [
                { label: '0. No necesito dormir menos de lo habitual', value: 0 },
                { label: '1. Ocasionalmente necesito dormir menos de lo habitual', value: 1 },
                { label: '2. A menudo necesito dormir menos de lo habitual', value: 2 },
                { label: '3. Frecuentemente necesito dormir menos de lo habitual', value: 3 },
                { label: '4. Puedo funcionar todo el día y toda la noche sin dormir ni sentirme cansado', value: 4 }
            ]
        },
        {
            id: 'q4',
            text: '4. Verborrea (Hablar mucho)',
            type: 'single_choice',
            options: [
                { label: '0. No estoy más hablador de lo habitual', value: 0 },
                { label: '1. Estoy ocasionalmente más hablador de lo habitual', value: 1 },
                { label: '2. A menudo estoy más hablador de lo habitual', value: 2 },
                { label: '3. Frecuentemente estoy más hablador de lo habitual', value: 3 },
                { label: '4. Hablo constantemente y no me pueden interrumpir', value: 4 }
            ]
        },
        {
            id: 'q5',
            text: '5. Nivel de Actividad',
            type: 'single_choice',
            options: [
                { label: '0. No he estado más activo de lo normal', value: 0 },
                { label: '1. He estado ocasionalmente más activo de lo normal', value: 1 },
                { label: '2. A menudo he estado más activo de lo normal', value: 2 },
                { label: '3. Frecuentemente he estado más activo de lo normal', value: 3 },
                { label: '4. He estado constantemente activo', value: 4 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 5, label: 'Sin síntomas maníacos significativos', color: 'green' },
            { min: 6, max: 20, label: 'Posible episodio Maníaco/Hipomaníaco', color: 'red' }
        ]
    }
}
