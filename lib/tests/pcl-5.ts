import { TestDefinition } from '@/types/test'

const pclOptions = [
    { label: 'Nada', value: 0 },
    { label: 'Un poco', value: 1 },
    { label: 'Moderadamente', value: 2 },
    { label: 'Bastante', value: 3 },
    { label: 'Extremadamente', value: 4 }
]

export const pcl5: TestDefinition = {
    id: 'pcl-5',
    title: 'PCL-5 (Lista de Verificación de Trastorno de Estrés Postraumático)',
    description: 'Cuestionario de 20 ítems para evaluar la presencia y severidad de síntomas de TEPT según criterios del DSM-5.',
    instructions: 'Indique cuánto le molestó cada problema durante el último mes en relación con su experiencia estresante.',
    questions: [
        { id: 'q1', text: '1. ¿Recuerdos repetidos, perturbadores e indeseados sobre la experiencia estresante?', type: 'single_choice', options: pclOptions },
        { id: 'q2', text: '2. ¿Sueños repetidos y perturbadores sobre la experiencia estresante?', type: 'single_choice', options: pclOptions },
        { id: 'q3', text: '3. ¿Sentir o actuar repentinamente como si la experiencia estresante estuviera sucediendo nuevamente?', type: 'single_choice', options: pclOptions },
        { id: 'q4', text: '4. ¿Sentirse muy angustiado cuando algo le hizo recordar la experiencia estresante?', type: 'single_choice', options: pclOptions },
        { id: 'q5', text: '5. ¿Tener reacciones físicas intensas cuando algo le hizo recordar la experiencia estresante?', type: 'single_choice', options: pclOptions },
        { id: 'q6', text: '6. ¿Evitar recuerdos, pensamientos o sentimientos relacionados con la experiencia estresante?', type: 'single_choice', options: pclOptions },
        { id: 'q7', text: '7. ¿Evitar claves o recordatorios externos de la experiencia estresante?', type: 'single_choice', options: pclOptions },
        { id: 'q8', text: '8. ¿Dificultad para recordar partes importantes de la experiencia estresante?', type: 'single_choice', options: pclOptions },
        { id: 'q9', text: '9. ¿Tener creencias negativas fuertes acerca de sí mismo, de otras personas o del mundo?', type: 'single_choice', options: pclOptions },
        { id: 'q10', text: '10. ¿Culparse a sí mismo o a otros por la experiencia estresante, o por lo que sucedió después de ésta?', type: 'single_choice', options: pclOptions },
        { id: 'q11', text: '11. ¿Tener sentimientos negativos intensos, como miedo, terror, ira, culpa o vergüenza?', type: 'single_choice', options: pclOptions },
        { id: 'q12', text: '12. ¿Pérdida de interés en actividades que antes disfrutaba?', type: 'single_choice', options: pclOptions },
        { id: 'q13', text: '13. ¿Sentirse distante o enajenado de otras personas?', type: 'single_choice', options: pclOptions },
        { id: 'q14', text: '14. ¿Dificultad para sentir emociones positivas (ej. alegría, amor)?', type: 'single_choice', options: pclOptions },
        { id: 'q15', text: '15. ¿Irritabilidad, explosiones de rabia o actuar agresivamente?', type: 'single_choice', options: pclOptions },
        { id: 'q16', text: '16. ¿Tomar demasiados riesgos o hacer cosas que pudieron haberle causado daño?', type: 'single_choice', options: pclOptions },
        { id: 'q17', text: '17. ¿Estar "extremadamente alerta", o vigilante, o en guardia?', type: 'single_choice', options: pclOptions },
        { id: 'q18', text: '18. ¿Sentirse muy nervioso o sobresaltarse fácilmente?', type: 'single_choice', options: pclOptions },
        { id: 'q19', text: '19. ¿Tener dificultad para concentrarse?', type: 'single_choice', options: pclOptions },
        { id: 'q20', text: '20. ¿Tener dificultad para dormirse o mantener el sueño?', type: 'single_choice', options: pclOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 30, label: 'Sin TEPT probable', color: 'green' },
            { min: 31, max: 80, label: 'TEPT Probable (Corte sugerido > 31)', color: 'red' }
        ]
    },
    subscales: [
        { id: 'intrusion', name: 'Intrusión (B)', questionIds: ['q1', 'q2', 'q3', 'q4', 'q5'], scoringType: 'sum' },
        { id: 'avoidance', name: 'Evitación (C)', questionIds: ['q6', 'q7'], scoringType: 'sum' },
        { id: 'cognition_mood', name: 'Alt. Cognitivas/Estado de Ánimo (D)', questionIds: ['q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14'], scoringType: 'sum' },
        { id: 'arousal', name: 'Alt. Activación/Reactividad (E)', questionIds: ['q15', 'q16', 'q17', 'q18', 'q19', 'q20'], scoringType: 'sum' }
    ]
}
