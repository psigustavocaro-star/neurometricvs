import { TestDefinition } from '@/types/test'

export const qChat: TestDefinition = {
    id: 'q-chat',
    title: 'Q-CHAT (Cuestionario para Autismo en Niños Pequeños)',
    description: 'Herramienta de detección temprana de rasgos autistas en niños pequeños (18-24 meses).',

    questions: [
        {
            id: 'q1',
            text: '¿Su hijo lo mira a usted cuando lo llama por su nombre?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 0 },
                { label: 'Normalmente', value: 1 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q2',
            text: '¿Qué tan fácil es para usted lograr contacto visual con su hijo?',
            type: 'scale',
            options: [
                { label: 'Muy fácil', value: 0 },
                { label: 'Bastante fácil', value: 1 },
                { label: 'Un poco difícil', value: 2 },
                { label: 'Muy difícil', value: 3 },
                { label: 'Imposible', value: 4 }
            ]
        },
        {
            id: 'q3',
            text: 'Cuando su niño está jugando solo, ¿Pone objetos en fila?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 4 },
                { label: 'Normalmente', value: 3 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q4',
            text: '¿Pueden otras personas comprender lo que habla su hijo?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 0 },
                { label: 'Normalmente', value: 1 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 3 },
                { label: 'Nunca / No habla', value: 4 }
            ]
        },
        {
            id: 'q5',
            text: '¿Apunta su hijo para indicar que quiere? (p.ej. Un juguete que no puede alcanzar)',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 0 },
                { label: 'Pocas veces al día', value: 1 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q6',
            text: '¿Apunta su hijo para compartir interés con usted (p. ej. Mostrar algo interesante)?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 0 },
                { label: 'Pocas veces al día', value: 1 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q7',
            text: '¿Cuánto tiempo puede mantener interés su hijo en objetos que giran? (p. ej. Lavadora, ventilador, ruedas de autos)',
            type: 'scale',
            options: [
                { label: 'Varias horas', value: 4 },
                { label: 'Media hora', value: 3 },
                { label: '10 minutos', value: 2 },
                { label: 'Un par de minutos', value: 1 },
                { label: 'Menos de un minuto', value: 0 }
            ]
        },
        {
            id: 'q8',
            text: '¿Cuántas palabras puede decir su hijo?',
            type: 'scale',
            options: [
                { label: 'Ninguna / Aún no habla', value: 4 },
                { label: 'Menos de 10 palabras', value: 3 },
                { label: '10 – 50 palabras', value: 2 },
                { label: '51 – 100 palabras', value: 1 },
                { label: 'Más de 100 palabras', value: 0 }
            ]
        },
        {
            id: 'q9',
            text: '¿Juega su hijo a simular? (p.ej. cuidar una muñeca, hablar por teléfono de juguete)',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 0 },
                { label: 'Pocas veces al día', value: 1 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q10',
            text: '¿Mira el niño hacia donde usted lo hace?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 0 },
                { label: 'Pocas veces al día', value: 1 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q11',
            text: '¿Con qué frecuencia su hijo huele o lame objetos inusuales?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 4 },
                { label: 'Pocas veces al día', value: 3 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q12',
            text: '¿El niño pone la mano de usted en un objeto cuando quiere que usted lo use? (p. ej. En una manilla para que usted la abra)',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 4 },
                { label: 'Pocas veces al día', value: 3 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q13',
            text: '¿Camina su hijo en las puntas de los pies?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 4 },
                { label: 'Normalmente', value: 3 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q14',
            text: '¿Qué tan fácil es para su hijo adaptarse cuando se cambian sus rutinas o cuando las cosas están fuera de su lugar?',
            type: 'scale',
            options: [
                { label: 'Muy fácil', value: 0 },
                { label: 'Bastante fácil', value: 1 },
                { label: 'Un poco difícil', value: 2 },
                { label: 'Muy difícil', value: 3 },
                { label: 'Imposible', value: 4 }
            ]
        },
        {
            id: 'q15',
            text: 'Si usted o alguien de la familia está visiblemente molesto, ¿Su hijo muestra signos de querer reconfortarlo?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 0 },
                { label: 'Normalmente', value: 1 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q16',
            text: '¿Su hijo repite una y otra vez algunas acciones (abrir grifos, prender luces, abrir/cerrar puertas)?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 4 },
                { label: 'Pocas veces al día', value: 3 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q17',
            text: 'Usted describiría las primeras palabras de su hijo como:',
            type: 'scale',
            options: [
                { label: 'Muy típicas', value: 0 },
                { label: 'Bastante típicas', value: 1 },
                { label: 'Un poco inusuales', value: 2 },
                { label: 'Muy inusuales', value: 3 },
                { label: 'Mi hijo no habla', value: 4 }
            ]
        },
        {
            id: 'q18',
            text: '¿Repite su hijo cosas que ha escuchado (ecos de frases, canciones, sonidos)?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 0 }, // Wait, echolalia might be a sign of autism, usually high score?
                // Text says: "Preguntas que se puntúan en orden ascendente: ... 18 ..."
                // Ascending means first option = 0, last = 4.
                // "Muchas veces al día" (First) = 0?
                // Let's re-read correction logic.
                // "Questions scored ascending: 1,2,4,5,6,9,10,14,15,17,18,19,21"
                // Example Q1: "Siempre" = 0 points.
                // So for Q18: "Muchas veces al día" = 0 points?
                // Repetitive speech (echolalia) is autistic trait. Usually "Always" = 4.
                // BUT the text explicitly lists 18 in ASCENDING group.
                // Maybe "Repite cosas" implies learning/imitation (positive) vs echolalia?
                // The question is "Does your child echo things...".
                // If it is in ascending group, then "Many times a day" is GOOD (0 risk).
                // Let's trust the document.
                { label: 'Muchas veces al día', value: 0 },
                { label: 'Pocas veces al día', value: 1 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q19',
            text: '¿Usa su hijo gestos simples (agitar la mano para despedirse)?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 0 },
                { label: 'Pocas veces al día', value: 1 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q20',
            text: '¿Hace su hijo movimientos inusuales de los dedos cerca de sus ojos?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 4 },
                { label: 'Pocas veces al día', value: 3 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q21',
            text: '¿Su hijo mira espontáneamente su rostro para ver su reacción cuando se enfrenta con algo poco familiar?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 0 },
                { label: 'Normalmente', value: 1 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 3 },
                { label: 'Nunca', value: 4 }
            ]
        },
        {
            id: 'q22',
            text: '¿Cuánto tiempo puede su hijo mantener el interés en sólo un objeto, o dos?',
            type: 'scale',
            options: [
                { label: 'Gran parte del día', value: 4 },
                { label: 'Varias horas', value: 3 },
                { label: 'Media hora', value: 2 },
                { label: '10 minutos', value: 1 },
                { label: 'Un par de minutos', value: 0 }
            ]
        },
        {
            id: 'q23',
            text: '¿Su hijo agita objetos repetidamente (p. ej. Trozos de cuerda)?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 4 },
                { label: 'Normalmente', value: 3 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q24',
            text: '¿Su hijo parece ser demasiado sensible al sonido?',
            type: 'scale',
            options: [
                { label: 'Siempre', value: 4 },
                { label: 'Normalmente', value: 3 },
                { label: 'A veces', value: 2 },
                { label: 'Rara vez', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        },
        {
            id: 'q25',
            text: '¿Su hijo se queda mirando al vacío sin objetivo aparente?',
            type: 'scale',
            options: [
                { label: 'Muchas veces al día', value: 4 },
                { label: 'Pocas veces al día', value: 3 },
                { label: 'Pocas veces en la semana', value: 2 },
                { label: 'Menos de una vez a la semana', value: 1 },
                { label: 'Nunca', value: 0 }
            ]
        }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 43, label: 'Bajo Riesgo', color: 'green' },
            { min: 44, max: 100, label: 'Riesgo Elevado (Consultar Especialista)', color: 'red' }
        ]
    }
}
