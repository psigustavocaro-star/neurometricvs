import { TestDefinition } from '@/types/test'

export const capeV: TestDefinition = {
    id: 'cape-v',
    title: 'Evaluación Auditivo-Perceptual de la Voz (CAPE-V)',
    description: 'Protocolo estandarizado para evaluar la calidad de la voz mediante escalas analógico-visuales (VAS).',
    category: 'other', // Speech
    duration: '5-10 min',
    questions: [
        {
            id: 'severity',
            text: '1. Severidad General (0 = Normal, 100 = Severamente desviado)',
            type: 'scale',
            min: 0,
            max: 100
        },
        {
            id: 'roughness',
            text: '2. Rugosidad (Irregularidad percibida)',
            type: 'scale',
            min: 0,
            max: 100
        },
        {
            id: 'breathiness',
            text: '3. Soplo (Escape de aire audible)',
            type: 'scale',
            min: 0,
            max: 100
        },
        {
            id: 'strain',
            text: '4. Tensión (Esfuerzo vocal)',
            type: 'scale',
            min: 0,
            max: 100
        },
        {
            id: 'pitch',
            text: '5. Tono (Desviación de lo esperado para género/edad)',
            type: 'scale',
            min: 0,
            max: 100
        },
        {
            id: 'loudness',
            text: '6. Intensidad (Desviación de lo esperado)',
            type: 'scale',
            min: 0,
            max: 100
        },
        {
            id: 'resonance',
            text: '7. Resonancia (Seleccione característica predominante)',
            type: 'single_choice',
            options: [
                { label: 'Normal', value: 0 },
                { label: 'Hipernasal', value: 1 },
                { label: 'Hiponasal', value: 2 },
                { label: 'Faringea / Cul-de-Sac', value: 3 }
            ]
        }
    ],
    scoring: {
        calculate: (answers) => {
            return {
                severity: answers['severity'] || 0,
                roughness: answers['roughness'] || 0,
                breathiness: answers['breathiness'] || 0,
                strain: answers['strain'] || 0,
                pitch: answers['pitch'] || 0,
                loudness: answers['loudness'] || 0
            };
        },
        interpret: (res: any) => {
            return 'Severidad General: ' + res.severity + '/100. Soplo: ' + res.breathiness + ', Rugosidad: ' + res.roughness + ', Tensión: ' + res.strain + '.';
        }
    }
}
