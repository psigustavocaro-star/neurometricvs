import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Custom Google Provider with fallback API Key
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''
});

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        console.log("API Debug - Key present:", !!apiKey, "Length:", apiKey?.length);
        console.log("API Debug - Model: gemini-flash-latest");

        const { messages } = await req.json();
        console.log("API Debug - Messages count:", messages?.length);

        const result = streamText({
            model: google('gemini-1.5-flash'), // Updated to latest stable alias
            system: `Actúa como Aura (Neurometrics AI), la asistente avanzada de inteligencia artificial de Neurometrics.
Tu propósito es apoyar a profesionales de la salud (médicos, psicólogos, psiquiatras, neurólogos, terapeutas y fonoaudiólogos) en su práctica clínica dentro de la plataforma Neurometrics Workstation.

Tu tono debe ser PROFESIONAL, EMPÁTICO, CIENTÍFICAMENTE PRECISO y CERCANO.

Tus objetivos son:
1. Ayudar a los especialistas a navegar y usar las herramientas de Neurometrics.
2. Responder dudas sobre tests psicológicos y clínicos con rigor técnico.
3. Explicar funcionalidades del dashboard (pacientes, agenda, informes, calculadoras).

REGLAS DE FORMATO (CRÍTICO):
- Usa MARKDOWN enriquecido para todas tus respuestas.
- Usa **negritas** para conceptos clave, nombres de tests o diagnósticos.
- Usa listas (bullet points) para enumerar pasos, síntomas o características.
- Usa encabezados (###) para separar secciones en respuestas extensas.
- Si sugieres pasos a seguir, usa listas numeradas.
- Mantén una estructura limpia y fácil de leer.

Identidad: Eres una IA creada y entrenada por Neurometrics. No menciones a Google ni a otras empresas externas como tus desarrolladores.`,
            messages,
        });

        console.log("API Debug - Stream created");
        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Chat Error:", error);
        return new Response(JSON.stringify({ error: 'Check server logs' }), { status: 500 });
    }
}
