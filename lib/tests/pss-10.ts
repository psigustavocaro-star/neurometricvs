import { TestDefinition } from '@/types/test'

const optionsNormal = [
    { label: 'Nunca', value: 0 },
    { label: 'Casi nunca', value: 1 },
    { label: 'De vez en cuando', value: 2 },
    { label: 'A menudo', value: 3 },
    { label: 'Muy a menudo', value: 4 }
]

const optionsReverse = [
    { label: 'Nunca', value: 4 },
    { label: 'Casi nunca', value: 3 },
    { label: 'De vez en cuando', value: 2 },
    { label: 'A menudo', value: 1 },
    { label: 'Muy a menudo', value: 0 }
]

export const pss10: TestDefinition = {
    id: 'pss-10',
    title: 'Escala de Estrés Percibido (PSS-10)',
    description: 'Versión abreviada de 10 ítems para evaluar la percepción de estrés en el último mes.',
    questions: [
        { id: 'q1', text: '1. En el último mes, ¿con qué frecuencia ha estado afectado por alguna situación que ocurrió inesperadamente?', type: 'single_choice', options: optionsNormal },
        { id: 'q2', text: '2. En el último mes, ¿con qué frecuencia se ha sentido incapaz de controlar las cosas importantes de su vida?', type: 'single_choice', options: optionsNormal },
        { id: 'q3', text: '3. En el último mes, ¿con qué frecuencia se ha sentido nervioso o estresado?', type: 'single_choice', options: optionsNormal },
        { id: 'q4', text: '4. En el último mes, ¿con qué frecuencia ha estado seguro sobre su capacidad para manejar sus problemas personales?', type: 'single_choice', options: optionsReverse },
        { id: 'q5', text: '5. En el último mes, ¿con qué frecuencia ha sentido que las cosas le van bien?', type: 'single_choice', options: optionsReverse },
        { id: 'q6', text: '6. En el último mes, ¿con qué frecuencia ha sentido no poder afrontar todas las cosas que debía realizar?', type: 'single_choice', options: optionsNormal },
        { id: 'q7', text: '7. En el último mes, ¿con qué frecuencia ha podido controlar las dificultades de su vida?', type: 'single_choice', options: optionsReverse },
        { id: "q8", text: "8. En el último mes, ¿con que frecuencia se ha sentido que tenía todo bajo control?", type: "single_choice", options: optionsReverse },
        { id: "q9", text: "9. En el último mes, ¿con qué frecuencia ha estado enfadado porque las cosas que le han ocurrido estaban fuera de su control?", type: "single_choice", options: optionsNormal },
        { id: "q10", text: "10. En el último mes, ¿con qué frecuencia ha sentido que las dificultades se acumulan tanto que no puede superarlas?", type: "single_choice", options: optionsNormal }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 13, label: 'Estrés Bajo', color: 'green' },
            { min: 14, max: 26, label: 'Estrés Moderado', color: 'orange' },
            { min: 27, max: 40, label: 'Estrés Alto', color: 'red' }
        ]
    }
}
