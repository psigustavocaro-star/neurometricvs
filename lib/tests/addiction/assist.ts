import { TestDefinition } from '@/types/test'

const frequencyOptions = [
    { label: "Nunca", value: 0 },
    { label: "Una o dos veces", value: 2 },
    { label: "Mensualmente", value: 3 },
    { label: "Semanalmente", value: 4 },
    { label: "A diario o casi a diario", value: 6 }
]

const desireOptions = [ // Q3
    { label: "Nunca", value: 0 },
    { label: "Una o dos veces", value: 3 },
    { label: "Mensualmente", value: 4 },
    { label: "Semanalmente", value: 5 },
    { label: "A diario o casi a diario", value: 6 }
]

const problemOptions = [ // Q4 & Q5
    { label: "Nunca", value: 0 },
    { label: "Una o dos veces", value: 4 },
    { label: "Mensualmente", value: 5 },
    { label: "Semanalmente", value: 6 },
    { label: "A diario o casi a diario", value: 7 }
]

const concernOptions = [ // Q6 & Q7
    { label: "No, nunca", value: 0 },
    { label: "Sí, en los últimos 3 meses", value: 6 },
    { label: "Sí, pero no en los últimos 3 meses", value: 3 }
]

export const assist: TestDefinition = {
    id: 'assist',
    title: 'Prueba de Detección de Consumo de Alcohol, Tabaco y Sustancias (ASSIST v3.0)',
    description: 'Cuestionario de cribado desarrollado por la OMS para detectar el consumo de sustancias y problemas relacionados.',
    category: 'psychiatry',
    duration: '10-15 min',
    questions: [
        // TABACO
        { id: 'tobacco_q2', text: 'Tabaco: ¿Con qué frecuencia ha consumido en los últimos 3 meses?', type: 'single_choice', options: frequencyOptions },
        { id: 'tobacco_q3', text: 'Tabaco: ¿Con qué frecuencia ha tenido un fuerte deseo o ansia de consumir?', type: 'single_choice', options: desireOptions },
        { id: 'tobacco_q4', text: 'Tabaco: ¿Con qué frecuencia el consumo le ha causado problemas de salud, sociales, legales o económicos?', type: 'single_choice', options: problemOptions },
        { id: 'tobacco_q5', text: 'Tabaco: ¿Con qué frecuencia dejó de hacer lo que se esperaba de usted por el consumo?', type: 'single_choice', options: problemOptions },
        { id: 'tobacco_q6', text: 'Tabaco: ¿Un amigo o familiar ha mostrado preocupación por su consumo?', type: 'single_choice', options: concernOptions },
        { id: 'tobacco_q7', text: 'Tabaco: ¿Ha intentado controlar, reducir o dejar el consumo y no ha podido?', type: 'single_choice', options: concernOptions },

        // ALCOHOL
        { id: 'alcohol_q2', text: 'Alcohol: ¿Con qué frecuencia ha consumido en los últimos 3 meses?', type: 'single_choice', options: frequencyOptions },
        { id: 'alcohol_q3', text: 'Alcohol: ¿Fuerte deseo o ansia de consumir?', type: 'single_choice', options: desireOptions },
        { id: 'alcohol_q4', text: 'Alcohol: ¿Problemas de salud, sociales, legales o económicos?', type: 'single_choice', options: problemOptions },
        { id: 'alcohol_q5', text: 'Alcohol: ¿Dejó de hacer lo que se esperaba de usted?', type: 'single_choice', options: problemOptions },
        { id: 'alcohol_q6', text: 'Alcohol: ¿Preocupación de amigos/familiares?', type: 'single_choice', options: concernOptions },
        { id: 'alcohol_q7', text: 'Alcohol: ¿Intento fallido de controlar/dejar?', type: 'single_choice', options: concernOptions },

        // CANNABIS
        { id: 'cannabis_q2', text: 'Cannabis: ¿Con qué frecuencia ha consumido en los últimos 3 meses?', type: 'single_choice', options: frequencyOptions },
        { id: 'cannabis_q3', text: 'Cannabis: ¿Fuerte deseo o ansia de consumir?', type: 'single_choice', options: desireOptions },
        { id: 'cannabis_q4', text: 'Cannabis: ¿Problemas de salud, sociales, legales o económicos?', type: 'single_choice', options: problemOptions },
        { id: 'cannabis_q5', text: 'Cannabis: ¿Dejó de hacer lo que se esperaba de usted?', type: 'single_choice', options: problemOptions },
        { id: 'cannabis_q6', text: 'Cannabis: ¿Preocupación de amigos/familiares?', type: 'single_choice', options: concernOptions },
        { id: 'cannabis_q7', text: 'Cannabis: ¿Intento fallido de controlar/dejar?', type: 'single_choice', options: concernOptions },

        // COCAINA
        { id: 'cocaine_q2', text: 'Cocaína: ¿Con qué frecuencia ha consumido en los últimos 3 meses?', type: 'single_choice', options: frequencyOptions },
        { id: 'cocaine_q3', text: 'Cocaína: ¿Fuerte deseo o ansia de consumir?', type: 'single_choice', options: desireOptions },
        { id: 'cocaine_q4', text: 'Cocaína: ¿Problemas de salud, sociales, legales o económicos?', type: 'single_choice', options: problemOptions },
        { id: 'cocaine_q5', text: 'Cocaína: ¿Dejó de hacer lo que se esperaba de usted?', type: 'single_choice', options: problemOptions },
        { id: 'cocaine_q6', text: 'Cocaína: ¿Preocupación de amigos/familiares?', type: 'single_choice', options: concernOptions },
        { id: 'cocaine_q7', text: 'Cocaína: ¿Intento fallido de controlar/dejar?', type: 'single_choice', options: concernOptions },

        // SEDANTES
        { id: 'sedatives_q2', text: 'Sedantes: ¿Con qué frecuencia ha consumido en los últimos 3 meses?', type: 'single_choice', options: frequencyOptions },
        { id: 'sedatives_q3', text: 'Sedantes: ¿Fuerte deseo o ansia de consumir?', type: 'single_choice', options: desireOptions },
        { id: 'sedatives_q4', text: 'Sedantes: ¿Problemas de salud, sociales, legales o económicos?', type: 'single_choice', options: problemOptions },
        { id: 'sedatives_q5', text: 'Sedantes: ¿Dejó de hacer lo que se esperaba de usted?', type: 'single_choice', options: problemOptions },
        { id: 'sedatives_q6', text: 'Sedantes: ¿Preocupación de amigos/familiares?', type: 'single_choice', options: concernOptions },
        { id: 'sedatives_q7', text: 'Sedantes: ¿Intento fallido de controlar/dejar?', type: 'single_choice', options: concernOptions }
    ],
    scoring: {
        calculate: (answers) => {
            const calculateSubstance = (prefix: string) => {
                let score = 0;
                if (answers[prefix + '_q2'] !== undefined) score += Number(answers[prefix + '_q2']);
                if (answers[prefix + '_q3'] !== undefined) score += Number(answers[prefix + '_q3']);
                if (answers[prefix + '_q4'] !== undefined) score += Number(answers[prefix + '_q4']);
                if (answers[prefix + '_q5'] !== undefined) score += Number(answers[prefix + '_q5']);
                if (answers[prefix + '_q6'] !== undefined) score += Number(answers[prefix + '_q6']);
                if (answers[prefix + '_q7'] !== undefined) score += Number(answers[prefix + '_q7']);
                return score;
            };

            return {
                tobacco: calculateSubstance('tobacco'),
                alcohol: calculateSubstance('alcohol'),
                cannabis: calculateSubstance('cannabis'),
                cocaine: calculateSubstance('cocaine'),
                sedatives: calculateSubstance('sedatives')
            };
        },
        interpret: (result: any) => {
            const getRisk = (score: number, substance: string) => {
                if (substance === 'Alcohol') {
                    if (score <= 10) return 'Bajo Riesgo';
                    if (score <= 26) return 'Riesgo Moderado';
                    return 'Alto Riesgo';
                } else {
                    if (score <= 3) return 'Bajo Riesgo';
                    if (score <= 26) return 'Riesgo Moderado';
                    return 'Alto Riesgo';
                }
            };

            const lines = [];
            if (result.tobacco > 0) lines.push('Tabaco: ' + result.tobacco + ' (' + getRisk(result.tobacco, 'Tabaco') + ')');
            if (result.alcohol > 0) lines.push('Alcohol: ' + result.alcohol + ' (' + getRisk(result.alcohol, 'Alcohol') + ')');
            if (result.cannabis > 0) lines.push('Cannabis: ' + result.cannabis + ' (' + getRisk(result.cannabis, 'Cannabis') + ')');
            if (result.cocaine > 0) lines.push('Cocaína: ' + result.cocaine + ' (' + getRisk(result.cocaine, 'Cocaína') + ')');
            if (result.sedatives > 0) lines.push('Sedantes: ' + result.sedatives + ' (' + getRisk(result.sedatives, 'Sedantes') + ')');

            if (lines.length === 0) return 'No se detectó riesgo significativo en las sustancias evaluadas.';
            return lines.join('\n');
        }
    }
}
