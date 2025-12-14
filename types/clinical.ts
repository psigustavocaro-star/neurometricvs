export interface ClinicalRecord {
    id: string
    patient_id: string
    created_at: string
    updated_at: string
    anamnesis: AnamnesisData
    diagnosis?: string
    allergies?: string
    medications?: string
    blood_type?: string
    height?: number
    weight?: number
    interests?: string
    cultural_background?: string
}

export interface AnamnesisData {
    presentIllness?: string
    personalHistory?: string
    familyHistory?: string
    socialHistory?: string
    educationWork?: string
    habits?: string
    sleep?: string
    appetite?: string
}

export interface ClinicalSession {
    id: string
    patient_id: string
    created_at: string
    date: string
    duration: number
    type: string
    status: 'scheduled' | 'completed' | 'cancelled'
    subjective?: string
    objective?: string
    assessment?: string
    plan?: string
    notes?: string
    transcription?: string
}

export interface AIInsight {
    id: string
    session_id: string
    created_at: string
    analysis: string
    clinical_path_suggestions: string[]
    recommendations: CulturalRecommendation[]
    risk_assessment?: string
    therapeutic_tools?: string[]
    clinical_approach?: string
}

export interface CulturalRecommendation {
    type: 'movie' | 'book' | 'series' | 'activity' | 'music'
    title: string
    reason: string
}
