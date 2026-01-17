import { TestDefinition } from '@/types/test'

const options = [
    { label: 'No, o no del todo', value: 0 },
    { label: 'Sí, un poco', value: 1 },
    { label: 'Sí, bastante', value: 2 },
    { label: 'Sí, mucho', value: 3 },
]

export const snapIV: TestDefinition = {
    id: 'snap-iv',
    title: 'Escala SNAP-IV (Abreviada)',
    description: 'Escala de valoración para el diagnóstico clínico de TDAH y Trastorno Negativista Desafiante (TND). Incluye criterios del DSM-IV. 18 ítems evaluados por padres y/o maestros.',
    instructions: 'Para cada apartado evalúe de 0 a 3 de acuerdo con la intensidad que mejor caracterice al niño. Puntúe todos los apartados. Solamente de un valor (0, 1, 2 o 3).',
    authors: 'Swanson, J.M., Nolan, W., & Pelham, W.E. (1983)',
    reference: 'Swanson, J. M. (1992). School-based assessments and interventions for ADD students. KC Publishing. Bussing, R., et al. (2008)',
    uiType: 'blocks',
    reportConfig: {
        chartType: 'radar',
        apaCategory: 'Trastornos del Neurodesarrollo',
        showResponseTable: true
    },
    questions: [
        {
            id: '1',
            text: '1. Frecuentemente no presta atención suficiente a los detalles o tiene descuidos en los trabajos escolares o en otras tareas',
            type: 'scale',
            options
        },
        {
            id: '2',
            text: '2. Frecuentemente tiene dificultad para permanecer atento en juegos o en tareas',
            type: 'scale',
            options
        },
        {
            id: '3',
            text: '3. Con frecuencia parece no escuchar cuando le hablan',
            type: 'scale',
            options
        },
        {
            id: '4',
            text: '4. Frecuentemente no sigue bien las instrucciones para poder finalizar una tarea escolar o tareas que se le encomienden',
            type: 'scale',
            options
        },
        {
            id: '5',
            text: '5. Con frecuencia tiene dificultad para ordenar',
            type: 'scale',
            options
        },
        {
            id: '6',
            text: '6. Frecuentemente evita o no le gusta o se niega a aceptar tareas que exigen un esfuerzo mental sostenido (por ejemplo, deberes o tareas de casa)',
            type: 'scale',
            options
        },
        {
            id: '7',
            text: '7. Con frecuencia pierde materiales necesarios para hacer sus tareas (por ejemplo, libro de deberes, juguetes, lápices, herramientas)',
            type: 'scale',
            options
        },
        {
            id: '8',
            text: '8. Frecuentemente se distrae por cualquier ruido o cosas que ocurren a su alrededor',
            type: 'scale',
            options
        },
        {
            id: '9',
            text: '9. Con frecuencia es olvidadizo con las tareas diarias',
            type: 'scale',
            options
        },
        {
            id: '10',
            text: '10. Frecuentemente mueve los dedos o los pies o se mueve en la silla cuando está sentado',
            type: 'scale',
            options
        },
        {
            id: '11',
            text: '11. Frecuentemente se levanta de su asiento en clase o en otras situaciones cuando no debiera hacerlo',
            type: 'scale',
            options
        },
        {
            id: '12',
            text: '12. Frecuentemente da vueltas o se columpia en exceso en situaciones en as que esta actitud no es apropiada',
            type: 'scale',
            options
        },
        {
            id: '13',
            text: '13. Frecuentemente tiene dificultades para jugar o hacer actividades en silencio',
            type: 'scale',
            options
        },
        {
            id: '14',
            text: '14. Frecuentemente se mueve muy rápidamente como "si tuviera un motor"',
            type: 'scale',
            options
        },
        {
            id: '15',
            text: '15. Con frecuencia habla en exceso',
            type: 'scale',
            options
        },
        {
            id: '16',
            text: '16. Frecuentemente responde antes que hayan terminado la pregunta',
            type: 'scale',
            options
        },
        {
            id: '17',
            text: '17. Frecuentemente tiene dificultad para esperar su turno',
            type: 'scale',
            options
        },
        {
            id: '18',
            text: '18. Frecuentemente interrumpe o se inmiscuye en las cosas de los demás (por ejemplo, se entremete en conversaciones o en un juego)',
            type: 'scale',
            options
        }
    ],
    subscales: [
        {
            id: 'inattention',
            name: 'Desatención (Inatención)',
            questionIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            scoringType: 'average',
            ranges: [
                { min: 0, max: 1.77, label: 'Sin Indicadores Clínicos', color: 'green' },
                { min: 1.78, max: 3, label: 'Clínico', color: 'red' }
            ]
        },
        {
            id: 'hyperactivity',
            name: 'Hiperactividad/Impulsividad',
            questionIds: ['10', '11', '12', '13', '14', '15', '16', '17', '18'],
            scoringType: 'average',
            ranges: [
                { min: 0, max: 1.43, label: 'Sin Indicadores Clínicos', color: 'green' },
                { min: 1.44, max: 3, label: 'Clínico', color: 'red' }
            ]
        },
        {
            id: 'total',
            name: 'Puntaje Total',
            questionIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
            scoringType: 'average',
            ranges: [
                { min: 0, max: 1.66, label: 'Sin Indicadores Clínicos', color: 'green' },
                { min: 1.67, max: 3, label: 'Clínico', color: 'red' }
            ]
        }
    ]
}
