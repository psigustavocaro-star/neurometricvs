import { TestDefinition } from '@/types/test'

const eqOptions = [
    { label: 'Nivel 1 (Sin problemas)', value: 1 },
    { label: 'Nivel 2 (Problemos leves/moderados)', value: 2 },
    { label: 'Nivel 3 (Problemas graves/imposibilidad)', value: 3 }
]

export const eq5d: TestDefinition = {
    id: 'eq-5d-3l',
    title: 'EQ-5D-3L (Calidad de Vida)',
    description: 'Instrumento estandarizado para medir el estado de salud en 5 dimensiones.',
    questions: [
        {
            id: 'q1', text: '1. Movilidad', type: 'single_choice', options: [
                { label: 'No tengo problemas para caminar', value: 1 },
                { label: 'Tengo algunos problemas', value: 2 },
                { label: 'Tengo que estar en cama / No puedo caminar', value: 3 }
            ]
        },
        {
            id: 'q2', text: '2. Cuidado Personal', type: 'single_choice', options: [
                { label: 'No tengo problemas para lavarme o vestirme', value: 1 },
                { label: 'Tengo algunos problemas', value: 2 },
                { label: 'Soy incapaz de lavarme o vestirme', value: 3 }
            ]
        },
        {
            id: 'q3', text: '3. Actividades Cotidianas (trabajo, estudio, hogar)', type: 'single_choice', options: [
                { label: 'No tengo problemas', value: 1 },
                { label: 'Tengo algunos problemas', value: 2 },
                { label: 'Soy incapaz de realizar actividades', value: 3 }
            ]
        },
        {
            id: 'q4', text: '4. Dolor / Malestar', type: 'single_choice', options: [
                { label: 'No tengo dolor ni malestar', value: 1 },
                { label: 'Moderado dolor o malestar', value: 2 },
                { label: 'Mucho dolor o malestar', value: 3 }
            ]
        },
        {
            id: 'q5', text: '5. Ansiedad / Depresión', type: 'single_choice', options: [
                { label: 'No estoy ansioso ni deprimido', value: 1 },
                { label: 'Moderadamente ansioso o deprimido', value: 2 },
                { label: 'Muy ansioso o deprimido', value: 3 }
            ]
        },
        { id: 'vas', text: '6. Escala Visual Analógica (EVA): Puntuación de su salud HOY (0-100).', type: 'scale', min: 0, max: 100 }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 0, label: 'Perfil de Salud (Ver respuestas individuales)', color: 'blue' }
        ]
    }
}
