import { TestDefinition } from '@/types/test'

const iesOptions = [
    { label: 'No, nunca', value: 0 },
    { label: 'Rara vez', value: 1 },
    { label: 'A veces', value: 3 },
    { label: 'A menudo', value: 5 }
]

export const iesR: TestDefinition = {
    id: 'ies-r',
    title: 'IES-R (Escala de Impacto de Evento - Revisada)',
    description: 'Evaluación del malestar subjetivo causado por un evento traumático (Síntomas de Intrusión, Evitación e Hiperactivación).',
    instructions: 'Indique de qué modo le afectó el acontecimiento en el transcurso de la semana pasada.',
    questions: [
        { id: 'q1', text: '1. Si algo me hacía recordar el suceso, retornaban todos los sentimientos que tuve cuando ocurrió.', type: 'single_choice', options: iesOptions },
        { id: 'q2', text: '2. Tuve dificultad para mantener el sueño durante la noche.', type: 'single_choice', options: iesOptions },
        { id: 'q3', text: '3. Otras cosas me hacían recordar el hecho.', type: 'single_choice', options: iesOptions },
        { id: 'q4', text: '4. Me sentía irritable y enojado.', type: 'single_choice', options: iesOptions },
        { id: 'q5', text: '5. Trataba de no excitarme cuando pensaba en el acontecimiento o algo me lo recordaba.', type: 'single_choice', options: iesOptions },
        { id: 'q6', text: '6. Pensaba en lo sucedido sin quererlo.', type: 'single_choice', options: iesOptions },
        { id: 'q7', text: '7. Me parecía que no había sucedido o que fue algo irreal.', type: 'single_choice', options: iesOptions },
        { id: 'q8', text: '8. Trataba de evitar lo que podía recordarme lo sucedido.', type: 'single_choice', options: iesOptions },
        { id: 'q9', text: '9. De repente, me cruzaban la mente imágenes del acontecimiento.', type: 'single_choice', options: iesOptions },
        { id: 'q10', text: '10. Me asustaba y sobresaltaba con facilidad.', type: 'single_choice', options: iesOptions },
        { id: 'q11', text: '11. Trataba de no pensar en lo sucedido.', type: 'single_choice', options: iesOptions },
        { id: 'q12', text: '12. Notaba que aún estaba muy agitado por lo ocurrido, pero no me ocupaba con mis sentimientos.', type: 'single_choice', options: iesOptions },
        { id: 'q13', text: '13. Los sentimientos que me causó el acontecimiento estaban como adormecidos.', type: 'single_choice', options: iesOptions },
        { id: 'q14', text: '14. Me sorprendía a mí mismo obrando y sintiendo como si hubiese retornado al momento del suceso.', type: 'single_choice', options: iesOptions },
        { id: 'q15', text: '15. No podía conciliar el sueño.', type: 'single_choice', options: iesOptions },
        { id: 'q16', text: '16. Tenía como olas de fuertes sentimientos relacionados con el acontecimiento.', type: 'single_choice', options: iesOptions },
        { id: 'q17', text: '17. Traté de borrarlo de la memoria.', type: 'single_choice', options: iesOptions },
        { id: 'q18', text: '18. Tenía dificultades para concentrarme.', type: 'single_choice', options: iesOptions },
        { id: 'q19', text: '19. Los recuerdos de lo sucedido me causaban reacciones físicas (sudoración, dificultades para respirar, etc.).', type: 'single_choice', options: iesOptions },
        { id: 'q20', text: '20. Soñaba con el suceso.', type: 'single_choice', options: iesOptions },
        { id: 'q21', text: '21. Me sentía alerta y en guardia.', type: 'single_choice', options: iesOptions },
        { id: 'q22', text: '22. Trataba de no hablar sobre lo ocurrido.', type: 'single_choice', options: iesOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 23, label: 'Normal / Leve', color: 'green' },
            { min: 24, max: 32, label: 'Preocupación clínica (TEPT Parcial)', color: 'orange' },
            { min: 33, max: 88, label: 'Probable TEPT (Punto de corte > 33)', color: 'red' }
        ]
    }
}
