import { TestDefinition } from '@/types/test'

const domainScoreInput = Array.from({ length: 161 }, (_, i) => ({ label: String(i + 20), value: i + 20 })); // Standard Scores 20-180 approx

export const vineland3: TestDefinition = {
    id: 'vineland-3',
    title: 'Vineland-3 (Escalas de Conducta Adaptativa - Resumen)',
    description: 'Evaluación de las habilidades de conducta adaptativa en cuatro dominios: Comunicación, Vida Diaria, Socialización y Motor. Este formulario registra las puntuaciones de dominio.',
    category: 'pediatrics',
    duration: '20-45 min (Entrevista/Cuestionario)',
    questions: [
        { type: 'info', id: 'inst', text: 'Ingrese las Puntuaciones Estándar de Dominio (Media 100, DE 15) obtenidas.' },

        { id: 'communication', text: 'Comunicación (Receptivo, Expresivo, Escrito)', type: 'single_choice', options: domainScoreInput },
        { id: 'daily_living', text: 'Vida Diaria (Personal, Doméstica, Comunitaria)', type: 'single_choice', options: domainScoreInput },
        { id: 'socialization', text: 'Socialización (Relaciones, Juego, Afrontamiento)', type: 'single_choice', options: domainScoreInput },
        { id: 'motor', text: 'Motor (Grueso, Fino) - Solo < 9 años', type: 'single_choice', options: domainScoreInput },
        { id: 'abc', text: 'Compuesto de Conducta Adaptativa (ABC)', type: 'single_choice', options: domainScoreInput }
    ],
    scoring: {
        calculate: (answers) => {
            return {
                communication: answers['communication'] || 0,
                dailyLiving: answers['daily_living'] || 0,
                socialization: answers['socialization'] || 0,
                motor: answers['motor'] || 0,
                abc: answers['abc'] || 0
            };
        },
        interpret: (res: any) => {
            // Standard Score interpretation
            // 130+: Very High
            // 115-129: Moderately High
            // 85-114: Adequate
            // 70-84: Moderately Low
            // <70: Low

            let abcInterp = 'Adecuado';
            if (res.abc >= 130) abcInterp = 'Muy Alto';
            else if (res.abc >= 115) abcInterp = 'Moderadamente Alto';
            else if (res.abc >= 85) abcInterp = 'Adecuado';
            else if (res.abc >= 70) abcInterp = 'Moderadamente Bajo';
            else if (res.abc > 0) abcInterp = 'Bajo (Posible DI)';

            return 'ABC: ' + res.abc + ' (' + abcInterp + '). Comunicación: ' + res.communication + '. Vida Diaria: ' + res.dailyLiving + '. Socialización: ' + res.socialization + '. Motor: ' + res.motor + '.';
        }
    }
}
