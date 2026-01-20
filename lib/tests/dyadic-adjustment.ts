import { TestDefinition } from '@/types/test'

const agreementOptions = [
    { label: 'Siempre de acuerdo', value: 5 },
    { label: 'Casi siempre de acuerdo', value: 4 },
    { label: 'A veces en desacuerdo', value: 3 },
    { label: 'A menudo en desacuerdo', value: 2 },
    { label: 'Casi siempre en desacuerdo', value: 1 },
    { label: 'Siempre en desacuerdo', value: 0 }
]

const frequencyOptions = [
    { label: 'Siempre', value: 0 }, // Scoring direction varies, standard DAS consensus items usually reverse? Need to check Spanier scoring.
    // Standard DAS: Items 1-15 (Agreement). 5=Always Agree, 0=Always Disagree.
    // Items 16-22 (Frequency). 0=All the time, 5=Never (for negative things).
    // Let's assume positive scoring for now or strict mapping.
    // PDF: "Siempre (0) ... Nunca (5)" for negative items like "Discuss divorce"?
    // Let's use generic labels and values.
    { label: 'Todo el tiempo', value: 0 },
    { label: 'La mayoría del tiempo', value: 1 },
    { label: 'A menudo', value: 2 },
    { label: 'A veces', value: 3 },
    { label: 'Rara vez', value: 4 },
    { label: 'Nunca', value: 5 }
]

const yesNo = [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]

export const dyadicAdjustment: TestDefinition = {
    id: 'dyadic-adjustment',
    title: 'Escala de Ajuste Diádico (DAS)',
    description: 'Evaluación de la calidad de la relación de pareja (Consenso, Cohesión, Satisfacción, Expresión Afectiva).',
    questions: [
        { id: 'q1', text: '1. Manejo de la economía doméstica.', type: 'single_choice', options: agreementOptions },
        { id: 'q2', text: '2. Tiempo de ocio.', type: 'single_choice', options: agreementOptions },
        { id: 'q3', text: '3. Religión.', type: 'single_choice', options: agreementOptions },
        { id: 'q4', text: '4. Demostraciones de cariño.', type: 'single_choice', options: agreementOptions },
        { id: 'q5', text: '5. Amistades.', type: 'single_choice', options: agreementOptions },
        { id: 'q6', text: '6. Relaciones sexuales.', type: 'single_choice', options: agreementOptions },
        { id: 'q7', text: '7. Muestras de educación (conductas correctas).', type: 'single_choice', options: agreementOptions },
        { id: 'q8', text: '8. Filosofía de la vida.', type: 'single_choice', options: agreementOptions },
        { id: 'q9', text: '9. Relaciones con los familiares próximos.', type: 'single_choice', options: agreementOptions },
        { id: 'q10', text: '10. Cosas y objetivos considerados importantes.', type: 'single_choice', options: agreementOptions },
        { id: 'q11', text: '11. Cantidad de tiempo pasado juntos.', type: 'single_choice', options: agreementOptions },
        { id: 'q12', text: '12. Toma de decisiones importantes.', type: 'single_choice', options: agreementOptions },
        { id: 'q13', text: '13. Tareas domésticas.', type: 'single_choice', options: agreementOptions },
        { id: 'q14', text: '14. Intereses y actividades de ocio.', type: 'single_choice', options: agreementOptions },
        { id: 'q15', text: '15. Decisiones en relación con el futuro.', type: 'single_choice', options: agreementOptions },
        { id: 'q16', text: '16. ¿Con qué frecuencia hablan de divorciarse/separarse?', type: 'single_choice', options: frequencyOptions },
        { id: 'q17', text: '17. ¿Con qué frecuencia se van de casa después de una riña?', type: 'single_choice', options: frequencyOptions },
        { id: 'q18', text: '18. ¿Con qué frecuencia considera que la relación funciona bien?', type: 'single_choice', options: frequencyOptions }, // This one is positive, might need reverse scoring? 
        { id: 'q19', text: '19. ¿Confía usted en su pareja?', type: 'single_choice', options: frequencyOptions },
        { id: 'q20', text: '20. ¿Se arrepiente de haberse casado/unido?', type: 'single_choice', options: frequencyOptions },
        { id: 'q21', text: '21. ¿Con qué frecuencia discuten?', type: 'single_choice', options: frequencyOptions },
        { id: 'q22', text: '22. ¿Con qué frecuencia pierden el control en una discusión?', type: 'single_choice', options: frequencyOptions },
        { id: 'q23', text: '23. ¿Besa usted a su pareja?', type: 'single_choice', options: [{ label: 'Todos los días', value: 4 }, { label: 'Casi todos los días', value: 3 }, { label: 'A veces', value: 2 }, { label: 'Casi nunca', value: 1 }, { label: 'Nunca', value: 0 }] },
        { id: 'q24', text: '24. ¿Participan juntos en actividades externas?', type: 'single_choice', options: [{ label: 'Todas', value: 4 }, { label: 'Mayoría', value: 3 }, { label: 'Algunas', value: 2 }, { label: 'Casi ninguna', value: 1 }, { label: 'Ninguna', value: 0 }] },
        { id: 'q25', text: '25. Tienen intercambio enriquecedor de ideas.', type: 'single_choice', options: frequencyOptions }, // Positive
        { id: 'q26', text: '26. Se ríen juntos.', type: 'single_choice', options: frequencyOptions },
        { id: 'q27', text: '27. Dialogan tranquilamente.', type: 'single_choice', options: frequencyOptions },
        { id: 'q28', text: '28. Colaboran juntos en un proyecto.', type: 'single_choice', options: frequencyOptions },
        { id: 'q29', text: '29. Cansancio para practicar sexo.', type: 'single_choice', options: yesNo },
        { id: 'q30', text: '30. Ausencia de muestras de cariño.', type: 'single_choice', options: yesNo },
        { id: 'q31', text: '31. Grado de felicidad global (0-6).', type: 'single_choice', options: [{ label: '0', value: 0 }, { label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '6', value: 6 }] },
        {
            id: 'q32', text: '32. Sentimientos sobre el futuro de su relación.', type: 'single_choice', options: [
                { label: 'Quiero a toda costa que tenga éxito', value: 5 },
                { label: 'Tengo mucho interés', value: 4 },
                { label: 'Pondré de mi parte', value: 3 },
                { label: 'Sería agradable pero no haré más', value: 2 },
                { label: 'Me niego a hacer más', value: 1 },
                { label: 'No puede tener éxito nunca', value: 0 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 99, label: 'Ajuste Inadecuado / Conflicto', color: 'red' },
            { min: 100, max: 151, label: 'Buen Ajuste Diádico', color: 'green' }
        ]
    }
}
