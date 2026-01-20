import { TestDefinition } from '@/types/test'

const options = [
    { label: "1 - Ausente", value: 1 },
    { label: "2 - Mínimo", value: 2 },
    { label: "3 - Leve", value: 3 },
    { label: "4 - Moderado", value: 4 },
    { label: "5 - Moderadamente severo", value: 5 },
    { label: "6 - Severo", value: 6 },
    { label: "7 - Extremo", value: 7 }
]

export const panss: TestDefinition = {
    id: 'panss',
    title: 'Escala de Síndromes Positivos y Negativos (PANSS)',
    description: 'Instrumento utilizado para medir la severidad de los síntomas en pacientes con esquizofrenia. Evalúa síntomas positivos, negativos y psicopatología general.',
    category: 'psychiatry',
    duration: '30-40 min',
    questions: [
        // Positive Scale (P)
        { id: 'p1', text: 'P1. Delirios', type: 'single_choice', options },
        { id: 'p2', text: 'P2. Desorganización conceptual', type: 'single_choice', options },
        { id: 'p3', text: 'P3. Conducta alucinatoria', type: 'single_choice', options },
        { id: 'p4', text: 'P4. Excitación', type: 'single_choice', options },
        { id: 'p5', text: 'P5. Grandiosidad', type: 'single_choice', options },
        { id: 'p6', text: 'P6. Suspicacia / Perjuicio', type: 'single_choice', options },
        { id: 'p7', text: 'P7. Hostilidad', type: 'single_choice', options },

        // Negative Scale (N)
        { id: 'n1', text: 'N1. Embotamiento afectivo', type: 'single_choice', options },
        { id: 'n2', text: 'N2. Retraimiento emocional', type: 'single_choice', options },
        { id: 'n3', text: 'N3. Contacto pobre', type: 'single_choice', options },
        { id: 'n4', text: 'N4. Retraimiento social pasivo / apático', type: 'single_choice', options },
        { id: 'n5', text: 'N5. Dificultad de pensamiento abstracto', type: 'single_choice', options },
        { id: 'n6', text: 'N6. Ausencia de espontaneidad y fluidez', type: 'single_choice', options },
        { id: 'n7', text: 'N7. Pensamiento estereotipado', type: 'single_choice', options },

        // General Psychopathology Scale (G)
        { id: 'g1', text: 'G1. Preocupación somática', type: 'single_choice', options },
        { id: 'g2', text: 'G2. Ansiedad', type: 'single_choice', options },
        { id: 'g3', text: 'G3. Sentimientos de culpa', type: 'single_choice', options },
        { id: 'g4', text: 'G4. Tensión', type: 'single_choice', options },
        { id: 'g5', text: 'G5. Manierismos y posturas', type: 'single_choice', options },
        { id: 'g6', text: 'G6. Depresión', type: 'single_choice', options },
        { id: 'g7', text: 'G7. Retardo motor', type: 'single_choice', options },
        { id: 'g8', text: 'G8. Tencencia a no cooperar', type: 'single_choice', options },
        { id: 'g9', text: 'G9. Contenidos inusuales del pensamiento', type: 'single_choice', options },
        { id: 'g10', text: 'G10. Desorientación', type: 'single_choice', options },
        { id: 'g11', text: 'G11. Atención deficiente', type: 'single_choice', options },
        { id: 'g12', text: 'G12. Ausencia de juicio e introspección', type: 'single_choice', options },
        { id: 'g13', text: 'G13. Trastorno de la volición', type: 'single_choice', options },
        { id: 'g14', text: 'G14. Control deficiente de impulsos', type: 'single_choice', options },
        { id: 'g15', text: 'G15. Preocupación', type: 'single_choice', options },
        { id: 'g16', text: 'G16. Evasión social activa', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            const sum = (prefix: string, count: number) => {
                let total = 0;
                for (let i = 1; i <= count; i++) {
                    const val = answers[prefix + i];
                    if (val !== undefined) total += val;
                }
                return total;
            };

            const pScore = sum('p', 7);
            const nScore = sum('n', 7);
            const gScore = sum('g', 16);

            return {
                positive: pScore,
                negative: nScore,
                general: gScore,
                total: pScore + nScore + gScore
            };
        },
        interpret: (result: any) => {
            const { positive, negative, general, total } = result;
            return `Puntuación Total: ${total}.\nPositiva: ${positive} (Rango 7-49).\nNegativa: ${negative} (Rango 7-49).\nPsicopatología General: ${general} (Rango 16-112).`;
        }
    }
}
