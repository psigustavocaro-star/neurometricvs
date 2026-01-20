import { TestDefinition } from '@/types/test'

const options = [
    { label: "Nivel 1: Nada por boca (NPO).", value: 1 },
    { label: "Nivel 2: Dependiente de alimentación por sonda con mínima ingesta oral (fines terapéuticos).", value: 2 },
    { label: "Nivel 3: Dependiente de sonda con ingesta oral consistente de alimentos/líquidos modificados.", value: 3 },
    { label: "Nivel 4: Dieta oral total de una sola consistencia (ej. puré espesado).", value: 4 },
    { label: "Nivel 5: Dieta oral total con múltiples consistencias, pero requiere preparación especial o compensación.", value: 5 },
    { label: "Nivel 6: Dieta oral total sin preparación especial, pero con limitaciones en ciertos alimentos.", value: 6 },
    { label: "Nivel 7: Dieta oral total sin restricciones.", value: 7 }
]

export const fois: TestDefinition = {
    id: 'fois',
    title: 'Escala Funcional de Ingesta Oral (FOIS)',
    description: 'Escala para evaluar el nivel de ingesta oral funcional en pacientes con disfagia.',
    category: 'other', // Speech
    duration: '2 min',
    questions: [
        { id: 'level', text: 'Seleccione el nivel funcional actual del paciente:', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            return answers['level'] || 0;
        },
        interpret: (score: any) => {
            return 'Nivel FOIS: ' + score + '.';
        }
    }
}
