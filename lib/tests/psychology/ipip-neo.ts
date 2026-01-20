import { TestDefinition } from '@/types/test'

const options = [
    { label: "1 - Muy en desacuerdo", value: 1 },
    { label: "2 - En desacuerdo", value: 2 },
    { label: "3 - Neutral", value: 3 },
    { label: "4 - De acuerdo", value: 4 },
    { label: "5 - Muy de acuerdo", value: 5 }
]

export const ipipNeo: TestDefinition = {
    id: 'ipip-neo',
    title: 'Test de Personalidad "Big Five" (IPIP-NEO 50)',
    description: 'Evaluación de los cinco grandes factores de la personalidad: Extroversión, Amabilidad, Responsabilidad, Estabilidad Emocional y Apertura a la Experiencia.',
    category: 'psychology',
    duration: '5-10 min',
    questions: [
        // Extroversión
        { id: 'e1', text: '1. Soy el alma de la fiesta.', type: 'single_choice', options },
        { id: 'e2', text: '6. No hablo mucho.', type: 'single_choice', options }, // Reverse
        { id: 'e3', text: '11. Me siento cómodo rodeado de gente.', type: 'single_choice', options },
        { id: 'e4', text: '16. Me mantengo en segundo plano.', type: 'single_choice', options }, // Reverse
        { id: 'e5', text: '21. Empiezo conversaciones.', type: 'single_choice', options },
        { id: 'e6', text: '26. Tengo poco que decir.', type: 'single_choice', options }, // Reverse
        { id: 'e7', text: '31. Hablo con mucha gente distinta en las fiestas.', type: 'single_choice', options },
        { id: 'e8', text: '36. No me gusta llamar la atención.', type: 'single_choice', options }, // Reverse
        { id: 'e9', text: '41. No me importa ser el centro de atención.', type: 'single_choice', options },
        { id: 'e10', text: '46. Soy callado/a con los desconocidos.', type: 'single_choice', options }, // Reverse

        // Amabilidad (Agreeableness)
        { id: 'a1', text: '2. Siento poca preocupación por los demás.', type: 'single_choice', options }, // Reverse
        { id: 'a2', text: '7. Me intereso por la gente.', type: 'single_choice', options },
        { id: 'a3', text: '12. Insulto a la gente.', type: 'single_choice', options }, // Reverse
        { id: 'a4', text: '17. Simpatizo con los sentimientos de los demás.', type: 'single_choice', options },
        { id: 'a5', text: '22. No me interesan los problemas de los demás.', type: 'single_choice', options }, // Reverse
        { id: 'a6', text: '27. Tengo un corazón blando.', type: 'single_choice', options },
        { id: 'a7', text: '32. No me interesan mucho los demás.', type: 'single_choice', options }, // Reverse
        { id: 'a8', text: '37. Saco tiempo para los demás.', type: 'single_choice', options },
        { id: 'a9', text: '42. Siento las emociones de los demás.', type: 'single_choice', options },
        { id: 'a10', text: '47. Hago que la gente se sienta cómoda.', type: 'single_choice', options },

        // Responsabilidad (Conscientiousness)
        { id: 'c1', text: '3. Siempre estoy preparado.', type: 'single_choice', options },
        { id: 'c2', text: '8. Dejo mis cosas tiradas por ahí.', type: 'single_choice', options }, // Reverse
        { id: 'c3', text: '13. Presto atención a los detalles.', type: 'single_choice', options },
        { id: 'c4', text: '18. Hago líos con las cosas.', type: 'single_choice', options }, // Reverse
        { id: 'c5', text: '23. Hago las cosas en el acto.', type: 'single_choice', options },
        { id: 'c6', text: '28. A menudo olvido poner las cosas en su sitio.', type: 'single_choice', options }, // Reverse
        { id: 'c7', text: '33. Me gusta el orden.', type: 'single_choice', options },
        { id: 'c8', text: '38. Eludo mis deberes.', type: 'single_choice', options }, // Reverse
        { id: 'c9', text: '43. Sigo un horario.', type: 'single_choice', options },
        { id: 'c10', text: '48. Soy exigente en mi trabajo.', type: 'single_choice', options },

        // Estabilidad Emocional (Neuroticism) - Often called Emotional Stability (reverse of Neuroticism) or Neuroticism directly
        // IPIP usually measures Neuroticism (low stability) or Emotional Stability. 
        // Items: 4 (Stressed), 9 (Relaxed - Rev), 14 (Worry), 19 (Blue), 24 (Easily disturbed), 29 (Upset), 34 (Mood changes), 39 (Mood swings), 44 (Irritated), 49 (Blue)
        { id: 'n1', text: '4. Me estreso fácilmente.', type: 'single_choice', options },
        { id: 'n2', text: '9. Estoy relajado la mayor parte del tiempo.', type: 'single_choice', options }, // Reverse (Stability) -> High N = Low score? Let's assume standard N scoring. 
        { id: 'n3', text: '14. Me preocupo por las cosas.', type: 'single_choice', options },
        { id: 'n4', text: '19. Rara vez me siento triste.', type: 'single_choice', options }, // Reverse
        { id: 'n5', text: '24. Me altero con facilidad.', type: 'single_choice', options },
        { id: 'n6', text: '29. Me enfado con facilidad.', type: 'single_choice', options },
        { id: 'n7', text: '34. Cambio de estado de ánimo a menudo.', type: 'single_choice', options },
        { id: 'n8', text: '39. Tengo cambios de humor frecuentes.', type: 'single_choice', options },
        { id: 'n9', text: '44. Me irrito con facilidad.', type: 'single_choice', options },
        { id: 'n10', text: '49. A menudo me siento triste.', type: 'single_choice', options },

        // Apertura (Openness)
        { id: 'o1', text: '5. Tienes un vocabulario rico.', type: 'single_choice', options },
        { id: 'o2', text: '10. Tengo dificultad para entender ideas abstractas.', type: 'single_choice', options }, // Reverse
        { id: 'o3', text: '15. Tengo una imaginación viva.', type: 'single_choice', options },
        { id: 'o4', text: '20. No me interesan las ideas abstractas.', type: 'single_choice', options }, // Reverse
        { id: 'o5', text: '25. Tengo excelentes ideas.', type: 'single_choice', options },
        { id: 'o6', text: '30. No tengo una buena imaginación.', type: 'single_choice', options }, // Reverse
        { id: 'o7', text: '35. Entiendo las cosas rápidamente.', type: 'single_choice', options },
        { id: 'o8', text: '40. Uso palabras difíciles.', type: 'single_choice', options },
        { id: 'o9', text: '45. Paso tiempo reflexionando sobre las cosas.', type: 'single_choice', options },
        { id: 'o10', text: '50. Estoy lleno de ideas.', type: 'single_choice', options }
    ],
    scoring: {
        calculate: (answers) => {
            const getVal = (id: string, reverse = false) => {
                const val = answers[id];
                if (val === undefined) return 0; // Handle missing
                return reverse ? (6 - val) : val;
            };

            const subscales = {
                extraversion: 0,
                agreeableness: 0,
                conscientiousness: 0,
                neuroticism: 0,
                openness: 0
            };

            // Extroversión
            subscales.extraversion = getVal('e1') + getVal('e2', true) + getVal('e3') + getVal('e4', true) + getVal('e5') + getVal('e6', true) + getVal('e7') + getVal('e8', true) + getVal('e9') + getVal('e10', true);

            // Amabilidad
            subscales.agreeableness = getVal('a1', true) + getVal('a2') + getVal('a3', true) + getVal('a4') + getVal('a5', true) + getVal('a6') + getVal('a7', true) + getVal('a8') + getVal('a9') + getVal('a10');

            // Responsabilidad
            subscales.conscientiousness = getVal('c1') + getVal('c2', true) + getVal('c3') + getVal('c4', true) + getVal('c5') + getVal('c6', true) + getVal('c7') + getVal('c8', true) + getVal('c9') + getVal('c10');

            // Neuroticismo (Normal items usually measure High Neuroticism, relaxed items measure stability)
            // Items N: 4, 14, 24, 29, 34, 39, 44, 49 are positive for Neuroticism? 
            // N2 (9) "Relaxed" -> Reverse. N4 (19) "Rarely blue" -> Reverse.
            subscales.neuroticism = getVal('n1') + getVal('n2', true) + getVal('n3') + getVal('n4', true) + getVal('n5') + getVal('n6') + getVal('n7') + getVal('n8') + getVal('n9') + getVal('n10');

            // Apertura
            subscales.openness = getVal('o1') + getVal('o2', true) + getVal('o3') + getVal('o4', true) + getVal('o5') + getVal('o6', true) + getVal('o7') + getVal('o8') + getVal('o9') + getVal('o10');

            return { subscales };
        },
        interpret: (result) => {
            const { subscales } = result;
            const interpretFactor = (score: number, factor: string) => {
                // Range 10-50. 
                // Low: 10-22, Low-Avg: 23-29, Avg: 30-38, High-Avg: 39-44, High: 45-50 (This is arbitrary approximation, ideally use percentiles)
                // Simplified Interpretation:
                let level = 'Medio';
                if (score <= 20) level = 'Bajo';
                else if (score <= 30) level = 'Medio-Bajo';
                else if (score <= 40) level = 'Medio-Alto';
                else level = 'Alto';

                return `**${factor} (${score})**: Nivel ${level}.`;
            };

            return [
                interpretFactor(subscales.extraversion, 'Extroversión'),
                interpretFactor(subscales.agreeableness, 'Amabilidad'),
                interpretFactor(subscales.conscientiousness, 'Responsabilidad'),
                interpretFactor(subscales.neuroticism, 'Inestabilidad Emocional (Neuroticismo)'),
                interpretFactor(subscales.openness, 'Apertura a la Experiencia')
            ].join('\n');
        }
    }
}
