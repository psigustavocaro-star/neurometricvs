import { TestDefinition } from '@/types/test'

const optionsFrequency = [
    { label: 'Nunca', value: 0 },
    { label: 'Ocasionalmente', value: 1 },
    { label: 'A menudo', value: 2 },
    { label: 'Muy a menudo', value: 3 },
]

const optionsPerformance = [
    { label: 'Excelente', value: 1 },
    { label: 'Superior al promedio', value: 2 },
    { label: 'Promedio', value: 3 },
    { label: 'Algo problemático', value: 4 },
    { label: 'Problemático', value: 5 },
]

export const vanderbiltPadres: TestDefinition = {
    id: 'vanderbilt-padres',
    title: 'Escala de Evaluación NICHQ Vanderbilt - Versión para Padres',
    description: 'Escala para evaluar síntomas de TDAH y condiciones comórbidas (Oposicionismo, Conducta, Ansiedad/Depresión) así como el rendimiento funcional. Diseñada para niños de 6 a 12 años.',
    instructions: 'Marque la opción que mejor describa el comportamiento de su hijo/a en los últimos 6 meses.',
    authors: 'Wolraich, M.L., et al. (2003)',
    reference: 'Wolraich, M. L., Lambert, W., Doffing, M. A., Bickman, L., Simmons, T., & Worley, K. (2003). Psychometric properties of the Vanderbilt ADHD diagnostic parent rating scale in a referred population. Journal of Pediatric Psychology, 28(8), 559-568.',
    questions: [
        // Inatención
        {
            id: '1',
            text: '1. No presta atención a los detalles o comete errores por descuido, por ejemplo en la tarea.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '2',
            text: '2. Tiene dificultad para mantener la atención en tareas o actividades de juego.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '3',
            text: '3. No parece escuchar cuando se le habla directamente.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '4',
            text: '4. No sigue las instrucciones y no termina las tareas escolares, los quehaceres o los deberes laborales (no se debe a comportamiento de oposición o falta de comprensión).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '5',
            text: '5. Tiene dificultad para organizar tareas y actividades.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '6',
            text: '6. Evita, le disgusta o se muestra renuente a participar en tareas que requieren un esfuerzo mental sostenido (como las tareas escolares o los quehaceres domésticos).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '7',
            text: '7. Pierde cosas necesarias para tareas o actividades (juguetes, trabajos escolares, lápices, libros o herramientas).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '8',
            text: '8. Se distrae fácilmente con estímulos externos.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '9',
            text: '9. Es olvidadizo/a en las actividades diarias.',
            type: 'single_choice',
            options: optionsFrequency
        },
        // Hiperactividad/Impulsividad
        {
            id: '10',
            text: '10. Mueve nerviosamente las manos o los pies o se retuerce en el asiento.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '11',
            text: '11. Se levanta de su asiento en clase o en otras situaciones en las que se espera que permanezca sentado.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '12',
            text: '12. Corretea o trepa excesivamente en situaciones en las que es inapropiado.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '13',
            text: '13. Tiene dificultad para jugar o participar en actividades de ocio tranquilamente.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '14',
            text: '14. Está "en marcha" o actúa como si "lo impulsara un motor".',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '15',
            text: '15. Habla en exceso.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '16',
            text: '16. Suelta respuestas antes de que se hayan completado las preguntas.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '17',
            text: '17. Tiene dificultad para esperar su turno.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '18',
            text: '18. Interrumpe o se entromete con otros (por ejemplo, se mete en conversaciones o juegos).',
            type: 'single_choice',
            options: optionsFrequency
        },
        // Oposicionista Desafiante
        {
            id: '19',
            text: '19. Discute con los adultos.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '20',
            text: '20. Pierde los estribos / Tiene rabietas.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '21',
            text: '21. Desafía activamente o se niega a cumplir las peticiones o reglas de los adultos.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '22',
            text: '22. Molesta deliberadamente a otras personas.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '23',
            text: '23. Culpa a otros por sus errores o mal comportamiento.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '24',
            text: '24. Es susceptible o se molesta fácilmente con otros.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '25',
            text: '25. Está enfadado/a o resentido/a.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '26',
            text: '26. Es rencoroso/a o vengativo/a.',
            type: 'single_choice',
            options: optionsFrequency
        },
        // Trastorno de Conducta
        {
            id: '27',
            text: '27. Acosa, amenaza o intimida a otros.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '28',
            text: '28. Inicia peleas físicas.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '29',
            text: '29. Ha usado un arma que puede causar daño físico grave a otros (por ejemplo, un bate, un ladrillo, una botella rota, un cuchillo, un arma de fuego).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '30',
            text: '30. Ha sido físicamente cruel con personas.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '31',
            text: '31. Ha sido físicamente cruel con animales.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '32',
            text: '32. Ha robado confrontando a la víctima (por ejemplo, atraco, robo con asalto, extorsión, robo a mano armada).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '33',
            text: '33. Ha forzado a alguien a tener actividad sexual.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '34',
            text: '34. Ha prendido fuego deliberadamente con la intención de causar daños graves.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '35',
            text: '35. Ha destruido deliberadamente la propiedad de otros (que no sea por incendio provocado).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '36',
            text: '36. Ha invadido la casa, edificio o automóvil de otra persona.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '37',
            text: '37. Miente para obtener bienes o favores o para evitar obligaciones (por ejemplo, "timar" a otros).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '38',
            text: '38. Ha robado objetos de valor sin confrontar a la víctima (por ejemplo, hurto en tiendas sin allanamiento, falsificación).',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '39',
            text: '39. Sale por la noche a pesar de la prohibición de sus padres, comenzando antes de los 13 años.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '40',
            text: '40. Se ha escapado de casa durante la noche por lo menos dos veces mientras vivía en la casa de sus padres o de un sustituto de los padres (o una vez sin regresar por un largo período).',
            type: 'single_choice',
            options: optionsFrequency
        },
        // Ansiedad / Depresión
        {
            id: '41',
            text: '41. Es temeroso/a, ansioso/a o preocupado/a.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '42',
            text: '42. Teme intentar cosas nuevas por miedo a cometer errores.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '43',
            text: '43. Se siente inútil o inferior.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '44',
            text: '44. Se culpa a sí mismo/a por los problemas, se siente culpable.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '45',
            text: '45. Se siente solo/a, no deseado/a o no amado/a; se queja de que "nadie lo/la quiere".',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '46',
            text: '46. Está triste, infeliz o deprimido/a.',
            type: 'single_choice',
            options: optionsFrequency
        },
        {
            id: '47',
            text: '47. Es cohibido/a o se avergüenza fácilmente.',
            type: 'single_choice',
            options: optionsFrequency
        },
        // Desempeño
        {
            id: '48',
            text: '48. Desempeño escolar general.',
            type: 'single_choice',
            options: optionsPerformance
        },
        {
            id: '49',
            text: '49. Lectura.',
            type: 'single_choice',
            options: optionsPerformance
        },
        {
            id: '50',
            text: '50. Escritura.',
            type: 'single_choice',
            options: optionsPerformance
        },
        {
            id: '51',
            text: '51. Matemáticas.',
            type: 'single_choice',
            options: optionsPerformance
        },
        {
            id: '52',
            text: '52. Relación con sus padres.',
            type: 'single_choice',
            options: optionsPerformance
        },
        {
            id: '53',
            text: '53. Relación con sus hermanos.',
            type: 'single_choice',
            options: optionsPerformance
        },
        {
            id: '54',
            text: '54. Relación con sus compañeros.',
            type: 'single_choice',
            options: optionsPerformance
        },
        {
            id: '55',
            text: '55. Participación en actividades organizadas (por ejemplo, equipos).',
            type: 'single_choice',
            options: optionsPerformance
        }
    ],
    scoring: {
        type: 'sum',
        ranges: [
            { min: 0, max: 0, label: 'Evaluación Completada', color: 'gray', description: 'Revise las subescalas para el detalle de síntomas y criterios cumplidos.' }
        ],
        interpretation: `
## Criterios de Evaluación NICHQ Vanderbilt

Esta escala ayuda a evaluar TDAH y condiciones comórbidas. Para cumplir los criterios, se deben contar los síntomas que tienen una puntuación de 2 (A menudo) o 3 (Muy a menudo). Para las preguntas de desempeño (48-55), las puntuaciones de 4 y 5 indican deterioro.

### Subtipos de TDAH
- **TDAH, Predominio Falta de Atención:** Requiere ≥6 síntomas positivos en las preguntas 1-9 Y deterioro en el desempeño (puntuación de 4 o 5 en preguntas 48-55).
- **TDAH, Predominio Hiperactivo/Impulsivo:** Requiere ≥6 síntomas positivos en las preguntas 10-18 Y deterioro en el desempeño.
- **TDAH, Tipo Combinado:** Requiere cumplir los criterios de ambos subtipos anteriores.

### Condiciones Comórbidas
- **Trastorno Oposicionista Desafiante (TOD):** Requiere ≥4 síntomas positivos en las preguntas 19-26.
- **Trastorno de Conducta:** Requiere ≥3 síntomas positivos en las preguntas 27-40.
- **Ansiedad/Depresión:** Requiere ≥3 síntomas positivos en las preguntas 41-47.

*Nota: Esta es una herramienta de cribado. El diagnóstico requiere evaluación clínica completa.*
        `
    },
    subscales: [
        {
            id: 'inattentive',
            name: 'Inatención',
            questionIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            scoringType: 'sum',
        },
        {
            id: 'hyperactive',
            name: 'Hiperactividad/Impulsividad',
            questionIds: ['10', '11', '12', '13', '14', '15', '16', '17', '18'],
            scoringType: 'sum',
        },
        {
            id: 'odd',
            name: 'Oposicionista Desafiante',
            questionIds: ['19', '20', '21', '22', '23', '24', '25', '26'],
            scoringType: 'sum',
        },
        {
            id: 'conduct',
            name: 'Trastorno de Conducta',
            questionIds: ['27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
            scoringType: 'sum',
        },
        {
            id: 'anxiety',
            name: 'Ansiedad/Depresión',
            questionIds: ['41', '42', '43', '44', '45', '46', '47'],
            scoringType: 'sum',
        },
        {
            id: 'performance',
            name: 'Desempeño Funcional',
            questionIds: ['48', '49', '50', '51', '52', '53', '54', '55'],
            scoringType: 'average', // Usually simpler to view average impairment
        }
    ]
}
