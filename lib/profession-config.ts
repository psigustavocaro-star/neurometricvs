// Profession-specific configuration
// lib/profession-config.ts

import { Profession } from './calculators'

export interface ProfessionConfig {
    key: Profession
    label: string
    labelEn: string
    recommendedTests: string[]
    availableCalculators: string[]
    dashboardWidgets: string[]
    sessionNoteTemplate: string
    specializations: string[]
    quickActions: {
        id: string
        label: string
        icon: string
        href: string
    }[]
}

export const professionConfigs: Record<Profession, ProfessionConfig> = {
    psychologist: {
        key: 'psychologist',
        label: 'Psicólogo/a',
        labelEn: 'Psychologist',
        // Incluye tests clínicos y neuropsicológicos
        recommendedTests: ['phq9', 'gad7', 'beck', 'bai', 'dass21', 'wais', 'wisc', 'trail', 'stroop', 'rey'],
        availableCalculators: ['bmi'],
        dashboardWidgets: ['sessions', 'tests', 'cognitive_profile', 'ai_copilot'],
        sessionNoteTemplate: 'psychotherapy',
        specializations: ['TCC', 'Psicodinámica', 'Humanista', 'Neuropsicología', 'Evaluación', 'Gestalt', 'ACT'],
        quickActions: [
            { id: 'new_session', label: 'Nueva Sesión', icon: 'MessageSquare', href: '/patients' },
            { id: 'apply_test', label: 'Aplicar Test', icon: 'ClipboardList', href: '/dashboard/tests' },
            { id: 'cognitive_report', label: 'Informe Cognitivo', icon: 'FileText', href: '/patients' },
            { id: 'ai_analysis', label: 'Análisis IA', icon: 'Sparkles', href: '/dashboard' }
        ]
    },

    psychiatrist: {
        key: 'psychiatrist',
        label: 'Psiquiatra',
        labelEn: 'Psychiatrist',
        recommendedTests: ['phq9', 'gad7', 'mmse', 'moca', 'hamilton', 'young'],
        availableCalculators: ['bmi', 'glasgow', 'dosage'],
        dashboardWidgets: ['sessions', 'tests', 'medications', 'ai_copilot'],
        sessionNoteTemplate: 'psychiatric',
        specializations: ['Adultos', 'Infantil', 'Geriátrica', 'Adicciones', 'Forense'],
        quickActions: [
            { id: 'new_session', label: 'Evolución', icon: 'FileText', href: '/patients' },
            { id: 'prescribe', label: 'Prescribir', icon: 'Pill', href: '/dashboard/calculators' },
            { id: 'apply_test', label: 'Aplicar Escala', icon: 'ClipboardList', href: '/dashboard/tests' }
        ]
    },

    neurologist: {
        key: 'neurologist',
        label: 'Neurólogo/a',
        labelEn: 'Neurologist',
        recommendedTests: ['mmse', 'moca', 'trail', 'stroop', 'rey', 'wisconsin'],
        availableCalculators: ['bmi', 'glasgow', 'barthel', 'tinetti'],
        dashboardWidgets: ['sessions', 'tests', 'neuro_exam', 'ai_copilot'],
        sessionNoteTemplate: 'neurological',
        specializations: ['Cognitiva', 'Epilepsia', 'Cefaleas', 'Movimiento', 'Neuromuscular'],
        quickActions: [
            { id: 'neuro_exam', label: 'Examen Neurológico', icon: 'Brain', href: '/patients' },
            { id: 'glasgow', label: 'Glasgow', icon: 'Activity', href: '/dashboard/calculators' },
            { id: 'cognitive_test', label: 'Test Cognitivo', icon: 'ClipboardList', href: '/dashboard/tests' }
        ]
    },

    // neuropsychologist merged into psychologist

    physician: {
        key: 'physician',
        label: 'Médico/a',
        labelEn: 'Physician',
        recommendedTests: ['phq9', 'mmse', 'barthel', 'norton', 'tinetti'],
        availableCalculators: ['bmi', 'glasgow', 'barthel', 'dosage', 'cardiovascular', 'tinetti'],
        dashboardWidgets: ['sessions', 'tests', 'vitals', 'medications'],
        sessionNoteTemplate: 'medical',
        specializations: ['General', 'Familiar', 'Internista', 'Geriatra', 'Paliativo'],
        quickActions: [
            { id: 'consultation', label: 'Consulta', icon: 'Stethoscope', href: '/patients' },
            { id: 'calculators', label: 'Calculadoras', icon: 'Calculator', href: '/dashboard/calculators' },
            { id: 'prescribe', label: 'Prescribir', icon: 'Pill', href: '/dashboard/calculators' }
        ]
    },

    occupational_therapist: {
        key: 'occupational_therapist',
        label: 'Terapeuta Ocupacional',
        labelEn: 'Occupational Therapist',
        recommendedTests: ['barthel', 'tinetti', 'lawton', 'katz', 'fim'],
        availableCalculators: ['bmi', 'barthel', 'tinetti'],
        dashboardWidgets: ['sessions', 'tests', 'functional_status', 'goals'],
        sessionNoteTemplate: 'occupational',
        specializations: ['Neurológica', 'Pediátrica', 'Geriátrica', 'Salud Mental', 'Laboral'],
        quickActions: [
            { id: 'avd_eval', label: 'Evaluación AVD', icon: 'Home', href: '/dashboard/tests' },
            { id: 'barthel', label: 'Índice Barthel', icon: 'Activity', href: '/dashboard/calculators' },
            { id: 'goals', label: 'Objetivos', icon: 'Target', href: '/patients' }
        ]
    },

    speech_therapist: {
        key: 'speech_therapist',
        label: 'Fonoaudiólogo/a',
        labelEn: 'Speech Therapist',
        recommendedTests: ['boston', 'token', 'verbal_fluency', 'naming', 'reading'],
        availableCalculators: ['bmi'],
        dashboardWidgets: ['sessions', 'tests', 'communication_profile'],
        sessionNoteTemplate: 'speech',
        specializations: ['Lenguaje', 'Habla', 'Voz', 'Deglución', 'Audiología'],
        quickActions: [
            { id: 'language_eval', label: 'Evaluación Lenguaje', icon: 'MessageCircle', href: '/dashboard/tests' },
            { id: 'session', label: 'Sesión Terapia', icon: 'Mic', href: '/patients' },
            { id: 'report', label: 'Informe Fono', icon: 'FileText', href: '/patients' }
        ]
    }
}

// Get config for a profession
export function getProfessionConfig(profession: Profession): ProfessionConfig {
    return professionConfigs[profession] || professionConfigs.psychologist
}

// Get recommended tests for profession
export function getRecommendedTests(profession: Profession): string[] {
    return getProfessionConfig(profession).recommendedTests
}

// Check if calculator is available for profession
export function isCalculatorAvailable(profession: Profession, calculatorId: string): boolean {
    return getProfessionConfig(profession).availableCalculators.includes(calculatorId)
}
