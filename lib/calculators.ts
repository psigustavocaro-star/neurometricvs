// Medical Calculator Definitions and Utilities
// lib/calculators.ts

export type Profession =
    | 'physician'
    | 'psychologist'
    | 'psychiatrist'
    | 'neurologist'
    | 'occupational_therapist'
    | 'speech_therapist'

export type CalculatorCategory =
    | 'general'
    | 'pharmacology'
    | 'neurological'
    | 'functional'
    | 'risk'

export interface Calculator {
    id: string
    name: string
    description: string
    category: CalculatorCategory
    icon: string
    professions: Profession[] | 'all'
    component: string
}

export const calculators: Calculator[] = [
    {
        id: 'bmi',
        name: 'Índice de Masa Corporal (IMC)',
        description: 'Calcula el IMC y clasifica el estado nutricional según estándares OMS.',
        category: 'general',
        icon: 'Scale',
        professions: 'all',
        component: 'BMICalculator'
    },
    {
        id: 'glasgow',
        name: 'Escala de Coma de Glasgow',
        description: 'Evalúa el nivel de consciencia en pacientes con lesión cerebral.',
        category: 'neurological',
        icon: 'Brain',
        professions: ['physician', 'neurologist', 'psychiatrist'],
        component: 'GlasgowCalculator'
    },
    {
        id: 'barthel',
        name: 'Índice de Barthel',
        description: 'Mide la independencia funcional en actividades de la vida diaria.',
        category: 'functional',
        icon: 'Accessibility',
        professions: ['occupational_therapist', 'physician', 'neurologist'],
        component: 'BarthelCalculator'
    },
    {
        id: 'dosage',
        name: 'Calculadora de Dosis',
        description: 'Calcula dosis de medicamentos según peso y edad del paciente.',
        category: 'pharmacology',
        icon: 'Pill',
        professions: ['physician', 'psychiatrist', 'neurologist'],
        component: 'DosageCalculator'
    },
    {
        id: 'cardiovascular',
        name: 'Riesgo Cardiovascular (SCORE)',
        description: 'Estima el riesgo de evento cardiovascular a 10 años.',
        category: 'risk',
        icon: 'Heart',
        professions: ['physician'],
        component: 'CardiovascularCalculator'
    },
    {
        id: 'tinetti',
        name: 'Test de Tinetti',
        description: 'Evalúa marcha y equilibrio para determinar riesgo de caídas.',
        category: 'functional',
        icon: 'Footprints',
        professions: ['occupational_therapist', 'physician', 'neurologist'],
        component: 'TinettiCalculator'
    }
]

// BMI Calculation
export interface BMIResult {
    value: number
    category: string
    categoryKey: string
    color: string
    recommendation: string
}

export function calculateBMI(weight: number, heightCm: number): BMIResult {
    const heightM = heightCm / 100
    const bmi = weight / (heightM * heightM)

    let category: string
    let categoryKey: string
    let color: string
    let recommendation: string

    if (bmi < 18.5) {
        category = 'Bajo peso'
        categoryKey = 'underweight'
        color = 'text-blue-600'
        recommendation = 'Se recomienda evaluación nutricional y posibles estudios complementarios.'
    } else if (bmi < 25) {
        category = 'Normal'
        categoryKey = 'normal'
        color = 'text-green-600'
        recommendation = 'Peso saludable. Mantener hábitos actuales.'
    } else if (bmi < 30) {
        category = 'Sobrepeso'
        categoryKey = 'overweight'
        color = 'text-yellow-600'
        recommendation = 'Se recomienda modificación de estilo de vida y seguimiento.'
    } else if (bmi < 35) {
        category = 'Obesidad Grado I'
        categoryKey = 'obesity_1'
        color = 'text-orange-600'
        recommendation = 'Intervención nutricional y evaluación de comorbilidades.'
    } else if (bmi < 40) {
        category = 'Obesidad Grado II'
        categoryKey = 'obesity_2'
        color = 'text-red-500'
        recommendation = 'Tratamiento multidisciplinario recomendado.'
    } else {
        category = 'Obesidad Grado III'
        categoryKey = 'obesity_3'
        color = 'text-red-700'
        recommendation = 'Evaluación urgente. Considerar opciones quirúrgicas.'
    }

    return {
        value: Math.round(bmi * 10) / 10,
        category,
        categoryKey,
        color,
        recommendation
    }
}

// Glasgow Coma Scale
export interface GlasgowResult {
    total: number
    interpretation: string
    severity: string
    color: string
}

export function calculateGlasgow(eye: number, verbal: number, motor: number): GlasgowResult {
    const total = eye + verbal + motor

    let interpretation: string
    let severity: string
    let color: string

    if (total >= 13) {
        interpretation = 'Trauma craneoencefálico leve'
        severity = 'mild'
        color = 'text-green-600'
    } else if (total >= 9) {
        interpretation = 'Trauma craneoencefálico moderado'
        severity = 'moderate'
        color = 'text-yellow-600'
    } else {
        interpretation = 'Trauma craneoencefálico severo'
        severity = 'severe'
        color = 'text-red-600'
    }

    return { total, interpretation, severity, color }
}

// Barthel Index
export interface BarthelResult {
    total: number
    interpretation: string
    dependencyLevel: string
    color: string
}

export function calculateBarthel(scores: number[]): BarthelResult {
    const total = scores.reduce((sum, score) => sum + score, 0)

    let interpretation: string
    let dependencyLevel: string
    let color: string

    if (total === 100) {
        interpretation = 'Independiente para AVD básicas'
        dependencyLevel = 'independent'
        color = 'text-green-600'
    } else if (total >= 60) {
        interpretation = 'Dependencia leve'
        dependencyLevel = 'mild'
        color = 'text-blue-600'
    } else if (total >= 40) {
        interpretation = 'Dependencia moderada'
        dependencyLevel = 'moderate'
        color = 'text-yellow-600'
    } else if (total >= 20) {
        interpretation = 'Dependencia severa'
        dependencyLevel = 'severe'
        color = 'text-orange-600'
    } else {
        interpretation = 'Dependencia total'
        dependencyLevel = 'total'
        color = 'text-red-600'
    }

    return { total, interpretation, dependencyLevel, color }
}

// Medication Dosage Calculator
export interface DosageResult {
    dosePerKg: number
    totalDose: number
    frequency: string
    dailyDose: number
    notes: string
}

export function calculateDosage(
    weight: number,
    dosePerKgPerDay: number,
    frequency: number
): DosageResult {
    const dailyDose = weight * dosePerKgPerDay
    const totalDose = dailyDose / frequency

    return {
        dosePerKg: dosePerKgPerDay,
        totalDose: Math.round(totalDose * 100) / 100,
        frequency: `cada ${24 / frequency} horas`,
        dailyDose: Math.round(dailyDose * 100) / 100,
        notes: 'Verificar siempre con la ficha técnica del medicamento.'
    }
}

// Filter calculators by profession
export function getCalculatorsForProfession(profession: Profession): Calculator[] {
    return calculators.filter(calc =>
        calc.professions === 'all' || calc.professions.includes(profession)
    )
}
