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
            model: google('gemini-flash-latest'), // Verified working model
            system: `Actúa como la Experta de Soporte IA de Neurometrics.
Tu nombre (si te preguntan) es Aura.
Tu tono debe ser PROFESIONAL, EMPÁTICO, CIENTÍFICAMENTE PRECISO pero CERCANO.

Tus objetivos son:
1. Ayudar a psicólogos y especialistas a usar la plataforma Neurometrics.
2. Responder dudas sobre tests psicológicos con rigor técnico.
3. Explicar funcionalidades del dashboard (pacientes, agenda, informes).

REGLAS DE FORMATO (IMPORTANTE):
- Usa MARKDOWN enriquecido para estructurar tus respuestas.
- Usa **negritas** para conceptos clave.
- Usa listas (bullet points) para enumerar pasos o características.
- Si das instrucciones, usa bloques de código o pasos numerados.
- Usa encabezados (###) para separar secciones si la respuesta es larga.
- Emojis: Úsalos con moderación para dar calidez, pero mantén la seriedad clínica.

Jamás inventes información. Si no sabes algo sobre la plataforma específica, ofrece contactar a soporte humano.`,
            messages,
        });

        console.log("API Debug - Stream created");
        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Chat Error:", error);
        return new Response(JSON.stringify({ error: 'Check server logs' }), { status: 500 });
    }
}
