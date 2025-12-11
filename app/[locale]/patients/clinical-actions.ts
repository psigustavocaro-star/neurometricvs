'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ClinicalRecord, ClinicalSession, AIInsight } from '@/types/clinical'

// --- Clinical Records ---

export async function getClinicalRecord(patientId: string) {
    const supabase = await createClient()
    const { data } = await supabase
        .from('clinical_records')
        .select('*')
        .eq('patient_id', patientId)
        .single()
    return data as ClinicalRecord | null
}

export async function updateClinicalRecord(patientId: string, data: Partial<ClinicalRecord>) {
    const supabase = await createClient()

    // Check if exists
    const existing = await getClinicalRecord(patientId)

    let error
    if (existing) {
        const res = await supabase
            .from('clinical_records')
            .update(data)
            .eq('patient_id', patientId)
        error = res.error
    } else {
        const res = await supabase
            .from('clinical_records')
            .insert({ ...data, patient_id: patientId })
        error = res.error
    }

    if (error) throw new Error(error.message)
    revalidatePath(`/patients/${patientId}`)
}

// --- Clinical Sessions ---

export async function getClinicalSessions(patientId: string) {
    const supabase = await createClient()
    const { data } = await supabase
        .from('clinical_sessions')
        .select(`
            *,
            ai_insights (*)
        `)
        .eq('patient_id', patientId)
        .order('date', { ascending: false })
    return data as (ClinicalSession & { ai_insights?: AIInsight | null })[]
}

export async function createSession(patientId: string, data: Partial<ClinicalSession>) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('clinical_sessions')
        .insert({
            patient_id: patientId,
            ...data,
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
        })

    if (error) throw new Error(error.message)
    revalidatePath(`/patients/${patientId}`)
}

export async function updateSession(sessionId: string, data: Partial<ClinicalSession>) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('clinical_sessions')
        .update(data)
        .eq('id', sessionId)

    if (error) throw new Error(error.message)
    revalidatePath(`/patients`) // Revalidate broadly if needed, or specific path
}

// --- AI Insights ---

export async function generateAIInsights(sessionId: string) {
    const supabase = await createClient()

    // 1. Fetch Session & Patient Context
    const { data: session } = await supabase
        .from('clinical_sessions')
        .select('*, patients(*, clinical_records(*))')
        .eq('id', sessionId)
        .single()

    if (!session) throw new Error('Session not found')

    const patientName = session.patients.full_name
    const patientAge = session.patients.birth_date ?
        new Date().getFullYear() - new Date(session.patients.birth_date).getFullYear() : 'Unknown'
    const anamnesis = session.patients.clinical_records?.anamnesis || {}
    const notes = session.notes || ''

    if (!process.env.GOOGLE_API_KEY) throw new Error('API Key missing')

    // 2. Call Gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: { responseMimeType: "application/json" } })

    const prompt = `
    Actúa como un supervisor clínico experto (Psicólogo/Psiquiatra Senior). Analiza las siguientes notas de sesión para generar insights clínicos y recomendaciones.
    
    Contexto del Paciente:
    - Nombre: ${patientName}
    - Edad: ${patientAge}
    - Resumen Anamnesis: ${JSON.stringify(anamnesis).substring(0, 500)}...
    
    Notas de la Sesión:
    "${notes}"
    
    Tarea:
    Genera un objeto JSON con los siguientes campos:
    1. analysis (string): Resumen clínico profesional y análisis psicodinámico/conductual breve. Usa terminología formal.
    2. clinical_path_suggestions (string[]): 3 sugerencias de focos terapéuticos para futuras sesiones.
    3. recommendations (array de objetos {type, title, reason}): Sugiere 2-3 "Recetas Culturales" (Películas, Libros, Series, Actividades) que resuenen con el momento actual del paciente para trabajar en terapia.
    4. risk_assessment (string): Evaluación de riesgo (Bajo/Medio/Alto) y por qué.
    
    Formato JSON esperado:
    {
      "analysis": "...",
      "clinical_path_suggestions": ["...", "...", "..."],
      "recommendations": [
        { "type": "movie", "title": "Inside Out", "reason": "Para trabajar la identificación emocional..." }
      ],
      "risk_assessment": "Bajo..."
    }
    `

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    try {
        const jsonResponse = JSON.parse(text)

        // 3. Save to DB
        const { error } = await supabase
            .from('ai_insights')
            .upsert({
                session_id: sessionId,
                analysis: jsonResponse.analysis,
                clinical_path_suggestions: jsonResponse.clinical_path_suggestions,
                recommendations: jsonResponse.recommendations,
                risk_assessment: jsonResponse.risk_assessment,
                updated_at: new Date().toISOString() // Assuming field exists or just upsert
            }, { onConflict: 'session_id' })

        if (error) console.error('Error saving insights:', error)

        revalidatePath(`/patients/${session.patient_id}`)
        return jsonResponse

    } catch (e) {
        console.error('Failed to parse AI response:', text)
        throw new Error('Failed to generate valid insights')
    }
}


// --- Professional Reports & Certificates ---

export async function generateProfessionalReport(
    patientId: string,
    type: 'clinical_report' | 'certificate' | 'referral',
    params: {
        tone: 'technical' | 'accessible',
        framework?: 'cbt' | 'developmental' | 'psychoanalytic' | 'systemic' | 'general',
        focus?: string // specific request or focus
    }
) {
    const supabase = await createClient()

    // 1. Fetch Full Context
    const { data: patient } = await supabase
        .from('patients')
        .select(`
            *,
            clinical_records (*),
            test_results (*),
            clinical_sessions (*)
        `)
        .eq('id', patientId)
        .single()

    if (!patient) throw new Error('Patient not found')
    if (!process.env.GOOGLE_API_KEY) throw new Error('API Key missing')

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) // Standard text model for reports

    // 2. Construct Prompt based on Type
    let systemPrompt = ''
    let userPrompt = ''

    const patientContext = `
    PACIENTE:
    - Nombre: ${patient.full_name}
    - Fecha Nacimiento: ${patient.birth_date} (Edad calculada: ${new Date().getFullYear() - new Date(patient.birth_date).getFullYear()})
    - Género: ${patient.gender}
    
    HISTORIAL CLÍNICO:
    - Diagnóstico Actual: ${patient.clinical_records?.diagnosis || 'En evaluación'}
    - Anamnesis: ${JSON.stringify(patient.clinical_records?.anamnesis || {})}
    
    SESIONES RECIENTES:
    ${patient.clinical_sessions?.slice(0, 5).map((s: any) => `- [${new Date(s.date).toLocaleDateString()}] (${s.type}): ${s.notes?.substring(0, 200)}...`).join('\n')}
    
    RESULTADOS DE TESTS:
    ${patient.test_results?.map((t: any) => `- [${t.test_id}]: Score ${t.results_json?.score} (${t.results_json?.label})`).join('\n')}
    `

    if (type === 'clinical_report') {
        systemPrompt = `
        Actúa como un Psicólogo Clínico Senior y Director de Neurometrics. Tu tarea es redactar un INFORME CLÍNICO PROFESIONAL EXTENSO.
        
        DIRECTRICES DE ESTILO:
        - Tono: ${params.tone === 'technical' ? 'Altamente técnico, académico y preciso. Uso de terminología avanzada.' : 'Profesional pero accesible, claro y empático, adecuado para padres o pacientes.'}
        - Marco Teórico: ${params.framework ? params.framework.toUpperCase() : 'Integrativo'}. ${params.framework === 'developmental' ? 'Pon ÉNFASIS en psicología del desarrollo, hitos evolutivos y contexto madurativo.' : ''}
        - Formato: Estructurado, párrafos contundentes, uso de viñetas para claridad.
        
        REQUISITOS DEL CONTENIDO:
        1. Contextualización teórica sólida para cada hallazgo.
        2. Referencias implícitas a autores o teorías relevantes según el marco seleccionado (ej. Piaget/Vygotsky para desarrollo, Beck para TCC).
        3. SIEMPRE incluye una sección de "Síntesis y Conceptualización del Caso".
        4. Recomendaciones prácticas y detalladas.
        `
        userPrompt = `
        Genera un informe completo para el siguiente paciente.
        
        ${patientContext}
        
        FOCO ESPECÍFICO SOLICITADO: ${params.focus || 'Informe de Progreso General'}
        
        Estructura sugerida (adaptar según tono):
        1. Identificación y Motivo de Consulta
        2. Antecedentes Relevantes y Observaciones Conductuales
        3. Resultados e Interpretación (Integra Tests y Sesiones)
        4. Conceptualización del Caso (Marco: ${params.framework})
        5. Conclusiones Diagnósticas (o Hipótesis de Trabajo)
        6. Sugerencias Terapéuticas y Recomendaciones (Extensas)
        `
    } else if (type === 'certificate') {
        systemPrompt = `
        Actúa como Psicólogo Clínico. Genera un CERTIFICADO o CONSTANCIA DE ATENCIÓN formal.
        Debe ser breve, directo y cumplir con estándares legales/administrativos.
        `
        userPrompt = `
        Genera un certificado para:
        ${patientContext}
        
        MOTIVO/SOLICITUD: ${params.focus || 'Constancia de asistencia a terapia'}
        `
    }

    // 3. Generate
    const result = await model.generateContent([systemPrompt, userPrompt])
    const response = await result.response
    const text = response.text()

    return { content: text }
}
