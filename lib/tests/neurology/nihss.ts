import { TestDefinition } from '@/types/test'

export const nihss: TestDefinition = {
    id: 'nihss',
    title: 'Escala NIHSS (NIH Stroke Scale)',
    description: 'Herramienta para la evaluación cuantitativa del déficit neurológico relacionado con el ictus. Evalúa 11 parámetros clínicos.',
    category: 'neurology',
    duration: '5-10 min',
    questions: [
        {
            id: '1a_loc',
            text: '1a. Nivel de Conciencia (LOC)',
            type: 'single_choice',
            options: [
                { label: '0 - Alerta: Responde inmediatamente', value: 0 },
                { label: '1 - Somnoliento: Despierta con estímulo menor', value: 1 },
                { label: '2 - Estuporoso: Requiere estímulo fuerte/doloroso', value: 2 },
                { label: '3 - Coma: Sólo reflejos o sin respuesta', value: 3 }
            ]
        },
        {
            id: '1b_loc_questions',
            text: '1b. LOC Preguntas (Mes y Edad)',
            type: 'single_choice',
            options: [
                { label: '0 - Ambas correctas', value: 0 },
                { label: '1 - Una correcta (o no responde por intubación/trauma)', value: 1 },
                { label: '2 - Ninguna correcta', value: 2 }
            ]
        },
        {
            id: '1c_loc_commands',
            text: '1c. LOC Órdenes (Cerrar/abrir ojos, apretar mano)',
            type: 'single_choice',
            options: [
                { label: '0 - Ambas correctas', value: 0 },
                { label: '1 - Una correcta', value: 1 },
                { label: '2 - Ninguna correcta', value: 2 }
            ]
        },
        {
            id: '2_gaze',
            text: '2. Mirada Conjugada',
            type: 'single_choice',
            options: [
                { label: '0 - Normal', value: 0 },
                { label: '1 - Paresia parcial de la mirada', value: 1 },
                { label: '2 - Desviación forzada o paresia total', value: 2 }
            ]
        },
        {
            id: '3_visual',
            text: '3. Campos Visuales',
            type: 'single_choice',
            options: [
                { label: '0 - Sin pérdida visual', value: 0 },
                { label: '1 - Hemianopsia parcial', value: 1 },
                { label: '2 - Hemianopsia completa', value: 2 },
                { label: '3 - Ceguera bilateral (incluye ceguera cortical)', value: 3 }
            ]
        },
        {
            id: '4_facial',
            text: '4. Paresia Facial',
            type: 'single_choice',
            options: [
                { label: '0 - Movimiento simétrico normal', value: 0 },
                { label: '1 - Paresia leve (asimetría al sonreír, borramiento)', value: 1 },
                { label: '2 - Paresia parcial (parálisis total inferior)', value: 2 },
                { label: '3 - Parálisis completa (uni o bilateral)', value: 3 }
            ]
        },
        {
            id: '5a_motor_arm_left',
            text: '5a. Motor Brazo Izquierdo',
            type: 'single_choice',
            options: [
                { label: '0 - Mantiene 10 seg (sin caída)', value: 0 },
                { label: '1 - Claudica < 10 seg pero no cae', value: 1 },
                { label: '2 - Cae antes de 10 seg (puede vencer gravedad)', value: 2 },
                { label: '3 - No vence gravedad (cae inmediatamente)', value: 3 },
                { label: '4 - Sin movimiento', value: 4 },
                { label: 'UN - Amputación / Fusión articular', value: 0 }
            ]
        },
        {
            id: '5b_motor_arm_right',
            text: '5b. Motor Brazo Derecho',
            type: 'single_choice',
            options: [
                { label: '0 - Mantiene 10 seg (sin caída)', value: 0 },
                { label: '1 - Claudica < 10 seg pero no cae', value: 1 },
                { label: '2 - Cae antes de 10 seg (puede vencer gravedad)', value: 2 },
                { label: '3 - No vence gravedad (cae inmediatamente)', value: 3 },
                { label: '4 - Sin movimiento', value: 4 },
                { label: 'UN - Amputación / Fusión articular', value: 0 }
            ]
        },
        {
            id: '6a_motor_leg_left',
            text: '6a. Motor Pierna Izquierda',
            type: 'single_choice',
            options: [
                { label: '0 - Mantiene 5 seg (sin caída)', value: 0 },
                { label: '1 - Claudica < 5 seg pero no cae', value: 1 },
                { label: '2 - Cae antes de 5 seg (puede vencer gravedad)', value: 2 },
                { label: '3 - No vence gravedad (cae inmediatamente)', value: 3 },
                { label: '4 - Sin movimiento', value: 4 },
                { label: 'UN - Amputación / Fusión articular', value: 0 }
            ]
        },
        {
            id: '6b_motor_leg_right',
            text: '6b. Motor Pierna Derecha',
            type: 'single_choice',
            options: [
                { label: '0 - Mantiene 5 seg (sin caída)', value: 0 },
                { label: '1 - Claudica < 5 seg pero no cae', value: 1 },
                { label: '2 - Cae antes de 5 seg (puede vencer gravedad)', value: 2 },
                { label: '3 - No vence gravedad (cae inmediatamente)', value: 3 },
                { label: '4 - Sin movimiento', value: 4 },
                { label: 'UN - Amputación / Fusión articular', value: 0 }
            ]
        },
        {
            id: '7_ataxia',
            text: '7. Ataxia de Miembros',
            type: 'single_choice',
            options: [
                { label: '0 - Ausente', value: 0 },
                { label: '1 - Presente en 1 miembro', value: 1 },
                { label: '2 - Presente en 2 miembros', value: 2 },
                { label: 'UN - Amputación / Fusión articular', value: 0 }
            ]
        },
        {
            id: '8_sensory',
            text: '8. Sensibilidad',
            type: 'single_choice',
            options: [
                { label: '0 - Normal', value: 0 },
                { label: '1 - Hipoestesia leve/moderada (menos dolor)', value: 1 },
                { label: '2 - Hipoestesia grave / Anestesia', value: 2 }
            ]
        },
        {
            id: '9_language',
            text: '9. Mejor Lenguaje',
            type: 'single_choice',
            options: [
                { label: '0 - Normal', value: 0 },
                { label: '1 - Afasia leve a moderada', value: 1 },
                { label: '2 - Afasia grave', value: 2 },
                { label: '3 - Mutismo / Afasia global', value: 3 }
            ]
        },
        {
            id: '10_dysarthria',
            text: '10. Disartria',
            type: 'single_choice',
            options: [
                { label: '0 - Normal', value: 0 },
                { label: '1 - Leve a moderada (se entiende algo)', value: 1 },
                { label: '2 - Grave (ininteligible) / Anartria', value: 2 },
                { label: 'UN - Intubado / Barrera física', value: 0 }
            ]
        },
        {
            id: '11_extinction',
            text: '11. Extinción / Negligencia (Inatención)',
            type: 'single_choice',
            options: [
                { label: '0 - Normal', value: 0 },
                { label: '1 - Inatención visual, táctil, auditiva, espacial o personal', value: 1 },
                { label: '2 - Hemi-inatención profunda o extinción en >1 modalidad', value: 2 }
            ]
        }
    ],
    scoring: {
        calculate: (answers) => {
            let total = 0;
            // Iterate all keys in answers
            Object.values(answers).forEach(val => {
                if (typeof val === 'number') total += val;
            });
            return total;
        },
        interpret: (score) => {
            if (score === 0) return 'Normal (Sin déficit)';
            if (score <= 4) return 'Déficit leve';
            if (score <= 15) return 'Déficit moderado';
            if (score <= 20) return 'Déficit moderado-severo';
            return 'Déficit severo (>20)';
        }
    }
}
