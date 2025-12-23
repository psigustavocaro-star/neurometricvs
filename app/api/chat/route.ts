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
            model: google('gemini-1.5-flash'), // Using a more modern alias
            system: `Eres Neurometrics AI, un asistente avanzado de inteligencia artificial diseñado por Neurometrics. 
            Tu propósito es ayudar a psicólogos, psiquiatras y neurólogos en su práctica profesional dentro de la plataforma Neurometrics Workstation.
            Si te preguntan quién eres o quién te entrenó, responde siempre que eres la IA de Neurometrics, entrenada específicamente para el apoyo clínico. 
            Nunca menciones a Google ni a otras empresas externas como tus desarrolladores. 
            Sé profesional, empático y preciso en tus respuestas técnicas.`,
            messages,
        });

        console.log("API Debug - Stream created");
        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Chat Error:", error);
        return new Response(JSON.stringify({ error: 'Check server logs' }), { status: 500 });
    }
}
