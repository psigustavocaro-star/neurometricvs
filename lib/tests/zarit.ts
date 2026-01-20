import { TestDefinition } from '@/types/test'

const zaritOptions = [
    { label: 'Nunca', value: 0 },
    { label: 'Rara vez', value: 1 },
    { label: 'Algunas veces', value: 2 },
    { label: 'Bastantes veces', value: 3 },
    { label: 'Casi siempre', value: 4 }
]

export const zarit: TestDefinition = {
    id: 'zarit',
    title: 'Escala de Sobrecarga del Cuidador de Zarit',
    description: 'Evaluación de la carga percibida por el cuidador principal de una persona dependiente.',
    instructions: 'Indique con qué frecuencia se siente de la siguiente manera:',
    questions: [
        { id: 'q1', text: '1. ¿Piensa que su familiar le pide más ayuda de la que realmente necesita?', type: 'single_choice', options: zaritOptions },
        { id: 'q2', text: '2. ¿Piensa que debido al tiempo que dedica a su familiar no tiene suficiente tiempo para usted?', type: 'single_choice', options: zaritOptions },
        { id: 'q3', text: '3. ¿Se siente agobiado por intentar compatibilizar el cuidado de su familiar con otras responsabilidades?', type: 'single_choice', options: zaritOptions },
        { id: 'q4', text: '4. ¿Siente vergüenza por la conducta de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q5', text: '5. ¿Se siente enfadado cuando está cerca de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q6', text: '6. ¿Piensa que el cuidar de su familiar afecta negativamente la relación que usted tiene con otros miembros de su familia?', type: 'single_choice', options: zaritOptions },
        { id: 'q7', text: '7. ¿Tiene miedo por el futuro de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q8', text: '8. ¿Piensa que su familiar depende de usted?', type: 'single_choice', options: zaritOptions },
        { id: 'q9', text: '9. ¿Se siente tenso cuando está cerca de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q10', text: '10. ¿Piensa que su salud ha empeorado debido a tener que cuidar de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q11', text: '11. ¿Piensa que no tiene tanta intimidad como le gustaría debido al cuidado de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q12', text: '12. ¿Piensa que su vida social se ha visto afectada de manera negativa por tener que cuidar a su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q13', text: '13. ¿Se siente incómodo por distanciarse de sus amistades debido al cuidado de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q14', text: '14. ¿Piensa que su familiar le considera a usted la única persona que le puede cuidar?', type: 'single_choice', options: zaritOptions },
        { id: 'q15', text: '15. ¿Piensa que no tiene suficientes ingresos económicos para los gastos de cuidar a su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q16', text: '16. ¿Piensa que no será capaz de cuidar a su familiar por mucho más tiempo?', type: 'single_choice', options: zaritOptions },
        { id: 'q17', text: '17. ¿Siente que ha perdido el control de su vida desde que comenzó la enfermedad de su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q18', text: '18. ¿Desearía poder dejar el cuidado de su familiar a otra persona?', type: 'single_choice', options: zaritOptions },
        { id: 'q19', text: '19. ¿Se siente indeciso sobre qué hacer con su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q20', text: '20. ¿Piensa que debería hacer más por su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q21', text: '21. ¿Piensa que podría cuidar mejor a su familiar?', type: 'single_choice', options: zaritOptions },
        { id: 'q22', text: '22. Globalmente, ¿qué grado de "carga" experimenta por el hecho de cuidar a su familiar?', type: 'single_choice', options: zaritOptions }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 46, label: 'No sobrecarga', color: 'green' },
            { min: 47, max: 55, label: 'Sobrecarga leve', color: 'orange' },
            { min: 56, max: 88, label: 'Sobrecarga intensa', color: 'red' }
        ]
    }
}
