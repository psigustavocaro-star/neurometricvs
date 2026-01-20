import { TestDefinition } from '@/types/test'

const eagOptions = [
    { label: 'Incorrecto', value: 1 },
    { label: 'Apenas cierto', value: 2 },
    { label: 'Más bien cierto', value: 3 },
    { label: 'Cierto', value: 4 }
]

export const autoeficacia: TestDefinition = {
    id: 'autoeficacia',
    title: 'Escala de Autoeficacia General (EAG)',
    description: 'Evaluación de la percepción de competencia personal para manejar situaciones estresantes.',
    questions: [
        { id: 'q1', text: '1. Puedo encontrar la manera de obtener lo que quiero aunque alguien se me oponga.', type: 'single_choice', options: eagOptions },
        { id: 'q2', text: '2. Puedo resolver problemas difíciles si me esfuerzo lo suficiente.', type: 'single_choice', options: eagOptions },
        { id: 'q3', text: '3. Me es fácil persistir en lo que me he propuesto hasta llegar a alcanzar mis metas.', type: 'single_choice', options: eagOptions },
        { id: 'q4', text: '4. Tengo confianza en que podría manejar eficazmente acontecimientos inesperados.', type: 'single_choice', options: eagOptions },
        { id: 'q5', text: '5. Gracias a mis cualidades puedo superar situaciones imprevistas.', type: 'single_choice', options: eagOptions },
        { id: 'q6', text: '6. Cuando me encuentro en dificultades puedo permanecer tranquilo(a) porque cuento con las habilidades necesarias para manejar situaciones difíciles.', type: 'single_choice', options: eagOptions },
        { id: 'q7', text: '7. Venga lo que venga, por lo general soy capaz de manejarlo.', type: 'single_choice', options: eagOptions },
        { id: 'q8', text: '8. Puedo resolver la mayoría de los problemas si me esfuerzo lo necesario.', type: 'single_choice', options: eagOptions },
        { id: 'q9', text: '9. Si me encuentro en una situación difícil, generalmente se me ocurre qué debo hacer.', type: 'single_choice', options: eagOptions },
        { id: 'q10', text: '10. Al tener que hacer frente a un problema, generalmente se me ocurren varias alternativas de cómo resolverlo.', type: 'single_choice', options: eagOptions }
    ],
    scoring: {
        ranges: [
            { min: 10, max: 20, label: 'Baja Autoeficacia', color: 'orange' },
            { min: 21, max: 40, label: 'Alta Autoeficacia', color: 'green' }
        ]
    }
}
