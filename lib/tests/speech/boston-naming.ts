import { TestDefinition } from '@/types/test'

export const bostonNaming: TestDefinition = {
    id: 'boston-naming',
    title: 'Test de Denominación de Boston (BNT)',
    description: 'Evaluación de la capacidad de denominación visual (acceso léxico) en afasia y deterioro cognitivo.',
    category: 'other', // Speech / Neuro
    duration: '10-20 min',
    questions: [
        { type: 'info', id: 'inst', text: 'Administre los 60 items (o versión abreviada de 15/30) usando el cuaderno de láminas. Registre los totales abajo.' },

        {
            id: 'total_spontaneous', text: 'Número de respuestas correctas espontáneas (0-60)', type: 'single_choice', options:
                Array.from({ length: 61 }, (_, i) => ({ label: String(i), value: i }))
        },

        {
            id: 'total_semantic_cue', text: 'Número de aciertos tras clave semántica (0-60)', type: 'single_choice', options:
                Array.from({ length: 61 }, (_, i) => ({ label: String(i), value: i }))
        },

        {
            id: 'total_phonemic_cue', text: 'Número de aciertos tras clave fonémica (0-60)', type: 'single_choice', options:
                Array.from({ length: 61 }, (_, i) => ({ label: String(i), value: i }))
        },

        { type: 'info', id: 'norm_info', text: 'La puntuación principal es el total de espontáneas + semánticas.' }
    ],
    scoring: {
        calculate: (answers) => {
            return (answers['total_spontaneous'] || 0) + (answers['total_semantic_cue'] || 0);
        },
        interpret: (score: any) => {
            return 'Puntuación Correcta (Espontánea + Semántica): ' + score + '/60. (Ver tablas normativas por edad/escolaridad).';
        }
    }
}
