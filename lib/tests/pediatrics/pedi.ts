import { TestDefinition } from '@/types/test'

const scaledScoreInput = Array.from({ length: 21 }, (_, i) => ({ label: String(i), value: i }));

export const pedi: TestDefinition = {
    id: 'pedi',
    title: 'PEDI (Pediatric Evaluation of Disability Inventory)',
    description: 'Inventario de Evaluación de Discapacidad Pediátrica. Evalúa capacidades funcionales y desempeño en autocuidado, movilidad y función social.',
    category: 'pediatrics',
    duration: '45-60 min (Entrevista)',
    questions: [
        { type: 'info', id: 'inst', text: 'Ingrese las Puntuaciones Escaladas (Scaled Scores) para cada dominio de Habilidades Funcionales y Asistencia del Cuidador.' },

        { type: 'info', id: 'fs', text: 'Habilidades Funcionales (Scaled Scores 0-100)' },
        { id: 'fs_self_care', text: 'Autocuidado', type: 'single_choice', options: Array.from({ length: 101 }, (_, i) => ({ label: String(i), value: i })) },
        { id: 'fs_mobility', text: 'Movilidad', type: 'single_choice', options: Array.from({ length: 101 }, (_, i) => ({ label: String(i), value: i })) },
        { id: 'fs_social', text: 'Función Social', type: 'single_choice', options: Array.from({ length: 101 }, (_, i) => ({ label: String(i), value: i })) },

        { type: 'info', id: 'ca', text: 'Asistencia del Cuidador (Scaled Scores 0-100)' },
        { id: 'ca_self_care', text: 'Autocuidado', type: 'single_choice', options: Array.from({ length: 101 }, (_, i) => ({ label: String(i), value: i })) },
        { id: 'ca_mobility', text: 'Movilidad', type: 'single_choice', options: Array.from({ length: 101 }, (_, i) => ({ label: String(i), value: i })) },
        { id: 'ca_social', text: 'Función Social', type: 'single_choice', options: Array.from({ length: 101 }, (_, i) => ({ label: String(i), value: i })) }
    ],
    scoring: {
        calculate: (answers) => {
            return {
                fs_selfcare: answers['fs_self_care'] || 0,
                fs_mobility: answers['fs_mobility'] || 0,
                fs_social: answers['fs_social'] || 0,
                ca_selfcare: answers['ca_self_care'] || 0,
                ca_mobility: answers['ca_mobility'] || 0,
                ca_social: answers['ca_social'] || 0
            };
        },
        interpret: (res: any) => {
            return 'Habilidades Funcionales - Autocuidado: ' + res.fs_selfcare + ', Movilidad: ' + res.fs_mobility + ', Social: ' + res.fs_social + '. Asistencia Cuidador - Autocuidado: ' + res.ca_selfcare + ', Movilidad: ' + res.ca_mobility + ', Social: ' + res.ca_social + '.';
        }
    }
}
