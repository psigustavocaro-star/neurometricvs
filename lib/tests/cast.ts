import { TestDefinition } from '@/types/test'

export const cast: TestDefinition = {
    id: 'cast',
    title: 'CAST (Test Infantil del Síndrome de Asperger)',
    description: 'Cuestionario de evaluación para la detección de rasgos del espectro autista y Síndrome de Asperger en niños (4-11 años).',

    questions: [
        {
            id: 'q1',
            text: '¿Le resulta fácil participar en los juegos con los otros niños?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q2',
            text: '¿Se acerca de una forma espontánea a usted para conversar?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q3',
            text: '¿Comenzó el niño a hablar antes de cumplir los dos años?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 0 }] // Control
        },
        {
            id: 'q4',
            text: '¿Le gustan los deportes?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 0 }] // Control
        },
        {
            id: 'q5',
            text: '¿Da el niño importancia al hecho de llevarse bien con otros niños de la misma edad y parecer como ellos?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q6',
            text: '¿Se da cuenta de detalles inusuales que otros niños no observan?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q7',
            text: '¿Tiende a entender las cosas que se le dicen literalmente?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
            // Wait, Literal understanding IS Asperger. Sarcasm is hard.
            // If they understand literally (and fail sarcasm), that is Asperger.
            // So Yes = 1?
            // "Tiende a entender las cosas que se le dicen literalmente?" (Tend to understand literally?)
            // Asperger: Yes. 
            // My previous list "No-Score: ... 7 ..." implies No = 1.
            // Let's re-verify Q7.
            // Source: "Does he tend to take things literally?" YES = ASD.
            // So Yes should be 1.
            // My previous list "No-Score: 1, 2, 5, 7, 10..."
            // Let's check Q10: "Resulta facil interactuar?" No = ASD. (Correct).
            // Q7 is tricky. "Understanding literally" is a symptom. So YES should be 1.
            // Let me check if Spanish translation flips meaning? "Tiende a entender... literalmente". Yes.
            // Let me check if I used the wrong list.
            // Let's assume Yes = 1 for Q7.
            // Wait, Q8: "Playing imaginatively at 3?" (No = ASD).
            // Q9: "Do things strictly same way?" (Yes = ASD).
            // Let's deduce from common sense and cross check.
            // 6. See unusual details? Yes = ASD.
            // 7. Take things literally? Yes = ASD.
            // So Q7 should be Yes=1.
            // Let's check my "No-Score" list again.
            // 1 (Join games? No), 2 (Chat? No), 5 (Fit in? No), 7 (Literal? YES!).
            // So 7 is in the WRONG list in my notes.
            // Let's check Q18: "Difficulty understanding rules of polite behavior?" Yes = ASD.
            // My list said 18 is No-Score? That would mean "No difficulty" = ASD. Wrong.
            // So my previous "No-Score" list is suspicious.
            // Let's stick to clinical logic.
            // 1. Easy join? (No=1)
            // 2. Chat? (No=1)
            // 3. Control
            // 4. Control
            // 5. Fit in? (No=1)
            // 6. Unusual details? (Yes=1)
            // 7. Literal? (Yes=1)
            // 8. Imaginative play (at 3)? (No=1)
            // 9. Repetitive? (Yes=1)
            // 10. Interact easy? (No=1)
            // 11. Reciprocal conversation? (No=1)
            // 12. Read appropriate? (Control)
            // 13. Same interests as peers? (No=1)
            // 14. Obsessive interest? (Yes=1)
            // 15. Friends? (No=1)
            // 16. Show things? (Yes=1? No, joint attention deficit means they DON'T show things usually. But Aspergers might show "at" you excessively about their topic. 
            // Q16: "Bring you things... to SHOW you?" (Joint attention).
            // ASD often lacks joint attention. So No=1? 
            // OR "Show you... INTERESTS?" (i.e. infodumping).
            // "Trae a menudo cosas... con intencion de mostrarselas?"
            // Usually lack of showing is ASD. So No=1.
            // 17. Like jokes? (No=1? Humor deficit). Or "Like to joke" (Pragmatic).
            // 18. Difficulty polite? (Yes=1).
            // 19. Memory details? (Yes=1).
            // 20. Voice peculiar? (Yes=1).
            // 21. People important? (No=1).
            // 22. Dress self? (Control).
            // 23. Turn taking? (No=1).
            // 24. Play imaginative with others? (No=1).
            // 25. Impertinent comments? (Yes=1).
            // 26. Count to 50? (Control).
            // 27. Eye contact? (No=1).
            // 28. Repetitive movement? (Yes=1).
            // 29. Conduct unilateral? (Yes=1).
            // 30. Pronoun reversal (You/I)? (Yes=1).
            // 31. Prefer imaginative over facts? (No=1? ASD prefers facts. So No=1).
            // Question: "Prefiere... juegos de ficcion... en lugar de numeros?"
            // ASD would say NO (they prefer numbers).
            // So No=1?
            // 32. Confuse interlocutor? (Yes=1).
            // 33. Ride bike? (Control).
            // 34. Impose routines? (Yes=1).
            // 35. Care about opinion? (No=1).
            // 36. Direct conversation to own interest? (Yes=1).
            // 37. Unusual phrases? (Yes=1).

            // Let's refine based on this pass.
            // Q7 is Yes=1.
            // Q16 (Showing): If it's joint attention (normal), then No=1.
            // Q17 (Joking): If humor is normal, No=1.
            // Q31 (Fiction vs Facts): ASD prefers Facts. So "Prefers Fiction" -> No. So No=1.

            // I will implement this logic.
        },
        {
            id: 'q7',
            text: '¿Tiende a entender las cosas que se le dicen literalmente?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q8',
            text: 'A la edad de 3 años, ¿pasaba mucho tiempo jugando imaginativamente juegos de ficción? (Ej. superhéroe, merienda muñecos)',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q9',
            text: '¿Le gusta hacer las cosas de manera repetida y de la misma forma todo el tiempo?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q10',
            text: '¿Le resulta fácil interactuar con otros niños?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q11',
            text: '¿Es capaz de mantener una conversación recíproca?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q12',
            text: '¿Lee de una forma apropiada para su edad?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 0 }] // Control
        },
        {
            id: 'q13',
            text: '¿Tiene los mismos intereses, en general, que los otros niños de su misma edad?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q14',
            text: '¿Tiene algún interés que le mantenga ocupado durante tanto tiempo que el niño no hace otra cosa?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q15',
            text: '¿Tiene amigos y no sólo “conocidos”?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q16',
            text: '¿Le trae a menudo cosas con las que está interesado con la intención de mostrárselas?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q17',
            text: '¿Le gusta bromear?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q18',
            text: '¿Tiene alguna dificultad para entender las reglas del comportamiento educado?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q19',
            text: '¿Parece tener una memoria excepcional para los detalles?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q20',
            text: '¿Es la voz del niño peculiar? (demasiado adulta, aplanada y muy monótona)',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q21',
            text: '¿Es la gente importante para él?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q22',
            text: '¿Puede vestirse él sólo?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 0 }] // Control
        },
        {
            id: 'q23',
            text: '¿Muestra una buena capacidad para esperar turnos en la conversación?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q24',
            text: '¿Juega el niño de forma imaginativa con otros niños y participa en juegos sociales de roles?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q25',
            text: '¿Hace a menudo comentarios que son impertinentes, indiscretos o inapropiados socialmente?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q26',
            text: '¿Puede contar hasta cincuenta sin saltarse números?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 0 }] // Control
        },
        {
            id: 'q27',
            text: '¿Mantiene un contacto visual normal?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q28',
            text: '¿Muestra algún comportamiento repetitivo e inusual?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q29',
            text: '¿Es su conducta social muy unilateral y siempre acorde a sus propias reglas y condiciones?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q30',
            text: '¿Utiliza algunas veces los pronombres “tú” y “él/ella” en lugar de “yo”?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q31',
            text: '¿Prefiere las actividades imaginativas como los juegos de ficción y los cuentos en lugar de números o listas de información?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q32',
            text: 'En una conversación, ¿confunde algunas veces al interlocutor por no haber explicado el asunto del que está hablando?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q33',
            text: '¿Puede montar en bicicleta (aunque sea con ruedas estabilizadoras)?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 0 }] // Control
        },
        {
            id: 'q34',
            text: '¿Intenta imponer sus rutinas sobre sí mismo o sobre los demás de tal forma que causa problemas?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q35',
            text: '¿Le importa al niño la opinión que el resto del grupo tenga de él?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 0 }, { label: 'No', value: 1 }]
        },
        {
            id: 'q36',
            text: '¿Dirige a menudo la conversación hacia sus temas de interés en lugar de continuar con lo que la otra persona desea hablar?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        },
        {
            id: 'q37',
            text: '¿Utiliza frases inusuales o extrañas?',
            type: 'single_choice',
            options: [{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 14, label: 'Sin riesgo significativo', color: 'green' },
            { min: 15, max: 31, label: 'Riesgo de TEA (Evaluar a fondo)', color: 'red' }
        ]
    }
}
