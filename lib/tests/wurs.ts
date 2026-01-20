import { TestDefinition } from '@/types/test'

const wursOptions = [
    { label: 'Nada en absoluto', value: 0 },
    { label: 'Un poco', value: 1 },
    { label: 'Moderadamente', value: 2 },
    { label: 'Bastante', value: 3 },
    { label: 'Mucho', value: 4 }
]

export const wurs: TestDefinition = {
    id: 'wurs',
    title: 'WURS-25 (Escala de Wender-Utah - 25 ítems)',
    description: 'Escala para la evaluación retrospectiva de síntomas de TDAH en la infancia (para adultos).',
    instructions: 'Indique cómo era o se sentía usted DE PEQUEÑO.',
    questions: [
        // Items selected for WURS-25 from the full 61 items
        { id: 'q3', text: '3. Problemas de concentración; me distraía con facilidad.', type: 'single_choice', options: wursOptions },
        { id: 'q4', text: '4. Ansioso, preocupado.', type: 'single_choice', options: wursOptions },
        { id: 'q5', text: '5. Nervioso, inquieto.', type: 'single_choice', options: wursOptions },
        { id: 'q6', text: '6. Poco atento, "en las nubes".', type: 'single_choice', options: wursOptions },
        { id: 'q7', text: '7. Mucho temperamento; saltaba con facilidad.', type: 'single_choice', options: wursOptions },
        { id: 'q9', text: '9. Explosiones de genio, rabietas.', type: 'single_choice', options: wursOptions },
        { id: 'q10', text: '10. Problemas para terminar las cosas que empezaba.', type: 'single_choice', options: wursOptions },
        { id: 'q11', text: '11. Testarudo, cabezota.', type: 'single_choice', options: wursOptions },
        { id: 'q12', text: '12. Triste, deprimido.', type: 'single_choice', options: wursOptions },
        { id: 'q15', text: '15. Desobediente con mis padres; rebelde, contestón.', type: 'single_choice', options: wursOptions },
        { id: 'q16', text: '16. Mala opinión de mí mismo.', type: 'single_choice', options: wursOptions },
        { id: 'q17', text: '17. Irritable.', type: 'single_choice', options: wursOptions },
        { id: 'q20', text: '20. Cambios de humor frecuentes: alegre, triste...', type: 'single_choice', options: wursOptions },
        { id: 'q21', text: '21. Enfadado.', type: 'single_choice', options: wursOptions },
        { id: 'q24', text: '24. Impulsivo; hacía las cosas sin pensar.', type: 'single_choice', options: wursOptions },
        { id: 'q25', text: '25. Tendencia a ser inmaduro.', type: 'single_choice', options: wursOptions },
        { id: 'q26', text: '26. Sentimientos de culpa; remordimientos.', type: 'single_choice', options: wursOptions },
        { id: 'q27', text: '27. Perdía el control de mí mismo.', type: 'single_choice', options: wursOptions },
        { id: 'q28', text: '28. Tendencia a ser o actuar irracionalmente.', type: 'single_choice', options: wursOptions },
        { id: 'q29', text: '29. Poco popular entre los demás chicos; los amigos no me duraban mucho.', type: 'single_choice', options: wursOptions },
        { id: 'q40', text: '40. Dificultad para ponerme en el lugar de otros.', type: 'single_choice', options: wursOptions },
        { id: 'q41', text: '41. Problemas con las autoridades, en la escuela.', type: 'single_choice', options: wursOptions },
        { id: 'q51', text: '51. En general un mal estudiante; me costaba aprender.', type: 'single_choice', options: wursOptions },
        { id: 'q56', text: '56. Problemas con los números o las matemáticas.', type: 'single_choice', options: wursOptions },
        { id: 'q59', text: '59. No alcancé todo mi potencial.', type: 'single_choice', options: wursOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 35, label: 'Sin TDAH probable', color: 'green' },
            { min: 36, max: 45, label: 'Posible TDAH (Zona gris)', color: 'orange' },
            { min: 46, max: 100, label: 'Muy Probable TDAH (Corte > 46)', color: 'red' }
        ]
    }
}
