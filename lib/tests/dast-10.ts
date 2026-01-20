import { TestDefinition } from '@/types/test'

const yesNo = [
    { label: 'No', value: 0 },
    { label: 'Sí', value: 1 }
]

// Item 3 is reverse scored: No=1, Yes=0 ? 
// Text says: "Excepto en la pregunta #3 en el cual 'No' recibe un (1) punto."
// So Yes=0, No=1.
const yesNoReverse = [
    { label: 'No', value: 1 },
    { label: 'Sí', value: 0 }
]

export const dast10: TestDefinition = {
    id: 'dast-10',
    title: 'DAST-10 (Cuestionario sobre Uso de Drogas)',
    description: 'Cribado de abuso de drogas (excluyendo alcohol y tabaco) en los últimos 12 meses.',
    questions: [
        { id: 'q1', text: '1. ¿Ha usado drogas que no eran requeridas por razones médicas?', type: 'single_choice', options: yesNo },
        { id: 'q2', text: '2. ¿Usted abusa de más de una droga a la vez?', type: 'single_choice', options: yesNo },
        { id: 'q3', text: '3. ¿Es usted capaz de parar de usar drogas siempre cuando se lo propone?', type: 'single_choice', options: yesNoReverse },
        { id: 'q4', text: '4. ¿Ha tenido "pérdidas de conocimiento" o una "memoria repentina" como resultado del uso de drogas?', type: 'single_choice', options: yesNo },
        { id: 'q5', text: '5. ¿Alguna vez se ha sentido mal o culpable debido a su uso de drogas?', type: 'single_choice', options: yesNo },
        { id: 'q6', text: '6. ¿Alguna vez su pareja (o familiares) se han quejado de su uso de drogas?', type: 'single_choice', options: yesNo },
        { id: 'q7', text: '7. ¿Ha desatendido a su familia debido a su uso de drogas?', type: 'single_choice', options: yesNo },
        { id: 'q8', text: '8. ¿Se ha implicado en actividades ilegales con el fin de obtener drogas?', type: 'single_choice', options: yesNo },
        { id: 'q9', text: '9. ¿Alguna vez ha experimentado síntomas de abstinencia (sentirse enfermo) cuando dejó de usar drogas?', type: 'single_choice', options: yesNo },
        { id: 'q10', text: '10. ¿Ha tenido problemas médicos como resultado de su uso de drogas (pérdida de memoria, hepatitis, convulsiones, etc.)?', type: 'single_choice', options: yesNo }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 0, label: 'Sin problemas (Monitoreo)', color: 'green' },
            { min: 1, max: 2, label: 'Nivel Bajo (Monitoreo/Re-evaluar)', color: 'yellow' },
            { min: 3, max: 5, label: 'Nivel Moderado (Investigación)', color: 'orange' },
            { min: 6, max: 8, label: 'Nivel Sustancial (Evaluación Intensiva)', color: 'red' },
            { min: 9, max: 10, label: 'Nivel Severo (Evaluación Intensiva)', color: 'red' }
        ]
    }
}
