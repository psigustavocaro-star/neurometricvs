import { TestDefinition } from '@/types/test'

export const mrs: TestDefinition = {
    id: 'mrs',
    title: 'Escala de Rankin Modificada (mRS)',
    description: 'Escala de uso común para medir el grado de incapacidad o dependencia en las actividades diarias de personas que han sufrido un accidente cerebrovascular u otras causas de discapacidad neurológica.',
    category: 'neurology',
    duration: '2-5 min',
    questions: [
        {
            id: 'mrs_global',
            text: 'Seleccione la descripción que mejor se ajuste al estado funcional actual del paciente:',
            type: 'single_choice',
            options: [
                {
                    label: '0 - Sin síntomas',
                    value: 0,
                    description: 'Sin síntomas ni limitaciones.'
                },
                {
                    label: '1 - Sin discapacidad significativa',
                    value: 1,
                    description: 'Capaz de realizar todas sus actividades habituales y su trabajo, a pesar de tener algunos síntomas.'
                },
                {
                    label: '2 - Discapacidad leve',
                    value: 2,
                    description: 'Incapaz de realizar todas sus actividades previas, pero capaz de velar por sus propios asuntos sin asistencia (independiente en ABVD).'
                },
                {
                    label: '3 - Discapacidad moderada',
                    value: 3,
                    description: 'Requiere alguna ayuda, pero es capaz de caminar sin asistencia.'
                },
                {
                    label: '4 - Discapacidad moderadamente severa',
                    value: 4,
                    description: 'Incapaz de caminar sin asistencia y incapaz de atender sus propias necesidades corporales sin ayuda.'
                },
                {
                    label: '5 - Discapacidad severa',
                    value: 5,
                    description: 'Confinado a la cama, incontinente y requiere cuidado de enfermería y atención constantes.'
                },
                {
                    label: '6 - Muerte',
                    value: 6,
                    description: 'Paciente fallecido.'
                }
            ]
        }
    ],
    scoring: {
        calculate: (answers) => {
            const score = answers['mrs_global'];
            return score;
        },
        interpret: (score) => {
            if (score === 0) return 'Sin síntomas';
            if (score === 1) return 'Sin discapacidad significativa';
            if (score === 2) return 'Discapacidad leve';
            if (score === 3) return 'Discapacidad moderada';
            if (score === 4) return 'Discapacidad moderadamente severa';
            if (score === 5) return 'Discapacidad severa';
            if (score === 6) return 'Muerte';
            return 'Puntuación no válida';
        }
    }
}
