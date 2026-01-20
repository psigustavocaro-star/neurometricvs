import { TestDefinition } from '@/types/test'

const yesNo = [
    { label: 'Sí', value: 1 },
    { label: 'No', value: 0 }
]

export const stopBang: TestDefinition = {
    id: 'stop-bang',
    title: 'Cuestionario STOP-Bang',
    description: 'Cribado para el Síndrome de Apnea Obstructiva del Sueño (SAOS).',
    questions: [
        { id: 'q1', text: '1. Snoring: ¿Ronca fuerte (tan fuerte que se escucha a través de puertas cerradas)?', type: 'single_choice', options: yesNo },
        { id: 'q2', text: '2. Tired: ¿Se siente con frecuencia cansado, fatigado o somnoliento durante el día?', type: 'single_choice', options: yesNo },
        { id: 'q3', text: '3. Observed: ¿Alguien lo observó dejar de respirar o ahogarse mientras dormía?', type: 'single_choice', options: yesNo },
        { id: 'q4', text: '4. Pressure: ¿Tiene o está recibiendo tratamiento para la presión arterial alta?', type: 'single_choice', options: yesNo },
        { id: 'q5', text: '5. BMI: ¿Presenta un Índice de Masa Corporal de más de 35 kg/m2?', type: 'single_choice', options: yesNo },
        { id: 'q6', text: '6. Age: ¿Tiene más de 50 años?', type: 'single_choice', options: yesNo },
        { id: 'q7', text: '7. Neck: ¿El tamaño de su cuello es grande? (Hombres >43cm, Mujeres >41cm).', type: 'single_choice', options: yesNo },
        { id: 'q8', text: '8. Gender: ¿Es de sexo masculino?', type: 'single_choice', options: yesNo }
    ],
    scoring: {
        ranges: [
            { min: 0, max: 2, label: 'Bajo Riesgo de AOS', color: 'green' },
            { min: 3, max: 4, label: 'Riesgo Intermedio', color: 'orange' },
            { min: 5, max: 8, label: 'Alto Riesgo de AOS', color: 'red' }
        ]
    }
}
