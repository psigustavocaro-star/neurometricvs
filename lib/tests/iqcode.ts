import { TestDefinition } from '@/types/test'

const iqcodeOptions = [
    { label: 'Ha mejorado mucho', value: 1 },
    { label: 'Ha mejorado poco', value: 2 },
    { label: 'Apenas ha cambiado', value: 3 },
    { label: 'Ha empeorado un poco', value: 4 },
    { label: 'Ha empeorado mucho', value: 5 }
]

export const iqcode: TestDefinition = {
    id: 'iqcode',
    title: 'IQCODE (Cuestionario del Informador)',
    description: 'Evaluación de cambios cognitivos en los últimos 10 años, basada en la observación de un informante cercano.',
    instructions: 'Compare la situación actual de su familiar con cómo era hace 10 años.',
    questions: [
        { id: 'q1', text: '1. Reconocer las caras de las personas más allegadas.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q2', text: '2. Recordar nombres de las personas más allegadas.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q3', text: '3. Recordar las cosas de esas personas (dónde viven, etc.).', type: 'single_choice', options: iqcodeOptions },
        { id: 'q4', text: '4. Recordar cosas sucedidas en los últimos meses.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q5', text: '5. Recordar lo que se habló en una conversación unos días antes.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q6', text: '6. Mantener una conversación sin olvidar lo que dijo.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q7', text: '7. Recordar su propia dirección o número de teléfono.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q8', text: '8. Recordar la fecha en que vive.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q9', text: '9. Conocer el sitio de los armarios y dónde se guardan las cosas.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q10', text: '10. Saber dónde se encuentra una cosa que se dejó descolocada.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q11', text: '11. Adaptarse a la situación cuando la rutina diaria se ve alterada.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q12', text: '12. Manejar los aparatos de la casa.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q13', text: '13. Aprender a manejar un aparato nuevo.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q14', text: '14. Recordar las cosas sucedidas recientemente.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q15', text: '15. Aprender cosas nuevas en general.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q16', text: '16. Recordar cosas que ocurrieron o aprendió cuando era joven.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q17', text: '17. Comprender el significado de palabras poco corrientes.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q18', text: '18. Entender artículos de periódicos o revistas.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q19', text: '19. Seguir una historia en un libro, cine o TV.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q20', text: '20. Redactar cartas.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q21', text: '21. Recordar personas y hechos históricos.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q22', text: '22. Tomar decisiones en cuestiones cotidianas o trascendentes.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q23', text: '23. Manejar asuntos financieros.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q24', text: '24. Manejar el dinero para la compra.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q25', text: '25. Resolver problemas aritméticos cotidianos.', type: 'single_choice', options: iqcodeOptions },
        { id: 'q26', text: '26. ¿Cree que su inteligencia ha cambiado algo los últimos 5 años?', type: 'single_choice', options: iqcodeOptions }
    ],
    scoring: {
        ranges: [
            { min: 26, max: 84, label: 'Sin deterioro significativo', color: 'green' },
            { min: 85, max: 130, label: 'Probable Demencia', color: 'red' }
        ]
    }
}
