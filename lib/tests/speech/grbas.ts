import { TestDefinition } from '@/types/test'

const options = [
    { label: "0 - Normal", value: 0 },
    { label: "1 - Leve", value: 1 },
    { label: "2 - Moderado", value: 2 },
    { label: "3 - Severo", value: 3 }
]

export const grbas: TestDefinition = {
    id: 'grbas',
    title: 'Escala GRBAS',
    description: 'Escala japonesa para la evaluación auditivo-perceptual de la disfonía.',
    category: 'other', // Speech
    duration: '2-5 min',
    questions: [
        { id: 'g', text: 'G (Grade) - Grado total de disfonía', type: 'single_choice', options },
        { id: 'r', text: 'R (Roughness) - Rugosidad (Voz ronca, irregularidad glótica)', type: 'single_choice', options },
        { id: 'b', text: 'B (Breathiness) - Soplo (Escape de aire, cierre incompleto)', type: 'single_choice', options },
        { id: 'a', text: 'A (Asthenia) - Astenia (Debilidad vocal, hipofunción)', type: 'single_choice', options },
        { id: 's', text: 'S (Strain) - Tensión (Esfuerzo vocal, hiperfunción)', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            // Usually reported as a profile like G1R1B0A0S0 rather than a sum.
            // But we can return the profile string or sum for severity index.
            const g = answers['g'] || 0;
            const r = answers['r'] || 0;
            const b = answers['b'] || 0;
            const a = answers['a'] || 0;
            const s = answers['s'] || 0;
            return { g, r, b, a, s, total: g + r + b + a + s };
        },
        interpret: (res: any) => {
            return 'Perfil GRBAS: G' + res.g + ' R' + res.r + ' B' + res.b + ' A' + res.a + ' S' + res.s + '.';
        }
    }
}
