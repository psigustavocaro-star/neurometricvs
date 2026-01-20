import { TestDefinition } from '@/types/test'

export const ociR: TestDefinition = {
    id: 'oci-r',
    title: 'Inventario de Obsesiones y Compulsiones (OCI-R)',
    description: 'Escala de autoevaluación para medir la severidad de los síntomas del Trastorno Obsesivo-Compulsivo (TOC). Evalúa 6 dimensiones sintomáticas.',
    category: 'psychiatry',
    duration: '5-10 min',
    questions: [
        {
            id: 'oci_q1',
            text: '1. He acumulado cosas hasta el punto que me estorban.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q2',
            text: '2. He comprobado las cosas más a menudo de lo necesario.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q3',
            text: '3. Me molesta que las cosas no estén bien ordenadas.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q4',
            text: '4. He sentido la necesidad de contar mientras estoy haciendo cosas.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q5',
            text: '5. Me cuesta tocar un objeto cuando sé que lo han tocado desconocidos o ciertas personas.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q6',
            text: '6. Me cuesta controlar mis propios pensamientos.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q7',
            text: '7. Acumulo cosas que no necesito.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q8',
            text: '8. Compruebo repetidamente puertas, ventanas, cajones, etc.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q9',
            text: '9. Me molesta que los demás cambien la manera en que he ordenado las cosas.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q10',
            text: '10. Tengo necesidad de repetir ciertos números.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q11',
            text: '11. Tengo a veces que asearme o lavarme por el mero hecho de sentirme contaminado/a.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q12',
            text: '12. Tengo pensamientos desagradables en contra de mi voluntad.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q13',
            text: '13. Me siento incapaz de tirar cosas por temor a necesitarlas después.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q14',
            text: '14. Compruebo repetidamente el gas, el agua y la luz después de haberlos cerrado/apagado.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q15',
            text: '15. Tengo la necesidad de que las cosas estén ordenadas de una determinada manera.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q16',
            text: '16. Siento que existen números buenos y malos.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q17',
            text: '17. Me lavo las manos más a menudo y durante más tiempo de lo necesario.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        },
        {
            id: 'oci_q18',
            text: '18. Tengo con frecuencia pensamientos repugnantes y me cuesta librarme de ellos.',
            type: 'single_choice',
            options: [
                { label: '0 - En absoluto', value: 0 },
                { label: '1 - Un poco', value: 1 },
                { label: '2 - Bastante', value: 2 },
                { label: '3 - Mucho', value: 3 },
                { label: '4 - Muchísimo', value: 4 }
            ]
        }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            const subscales = {
                hoarding: 0,
                washing: 0,
                obsessing: 0,
                ordering: 0,
                checking: 0,
                neutralizing: 0
            };

            const map = {
                hoarding: ['oci_q1', 'oci_q7', 'oci_q13'],
                washing: ['oci_q5', 'oci_q11', 'oci_q17'],
                obsessing: ['oci_q6', 'oci_q12', 'oci_q18'],
                ordering: ['oci_q3', 'oci_q9', 'oci_q15'],
                checking: ['oci_q2', 'oci_q8', 'oci_q14'],
                neutralizing: ['oci_q4', 'oci_q10', 'oci_q16']
            };

            for (const [key, val] of Object.entries(answers)) {
                if (typeof val === 'number') {
                    total += val;
                    // Add to subscale
                    for (const [subscale, items] of Object.entries(map)) {
                        if (items.includes(key)) {
                            subscales[subscale as keyof typeof subscales] += val;
                        }
                    }
                }
            }

            return { total, subscales };
        },
        interpret: (result) => {
            const { total, subscales } = result;
            let interpretation = `Puntuación Total: ${total}. `;

            if (total >= 21) {
                interpretation += 'Sugiere presencia de Trastorno Obsesivo-Compulsivo (Punto de corte ≥ 21). ';
            } else {
                interpretation += 'No sugiere presencia clínica significativa de TOC. ';
            }

            interpretation += '\nSubescalas significativas (≥6):';
            const significant = [];
            if (subscales.hoarding >= 6) significant.push('Acumulación');
            if (subscales.washing >= 6) significant.push('Lavado');
            if (subscales.obsessing >= 6) significant.push('Obsesión');
            if (subscales.ordering >= 6) significant.push('Ordenamiento');
            if (subscales.checking >= 6) significant.push('Comprobación');
            if (subscales.neutralizing >= 6) significant.push('Neutralización');

            if (significant.length > 0) {
                interpretation += ' ' + significant.join(', ') + '.';
            } else {
                interpretation += ' Ninguna.';
            }

            return interpretation;
        }
    }
}
