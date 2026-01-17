import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToCoreMessages } from 'ai';

// Custom Google Provider with fallback API Key
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''
});

export const maxDuration = 30;

export async function POST(req: Request) {
    console.log("CHAT_DEBUG: POST Request received");

    try {
        const { messages } = await req.json();
        console.log("CHAT_DEBUG: Messages received", messages.length);

        const coreMessages = messages.map((m: any) => ({
            role: m.role,
            content: m.content || (m.parts && m.parts.find((p: any) => p.type === 'text')?.text) || ''
        }));

        const result = streamText({
            model: google('gemini-flash-latest'),
            system: `Actúa como Aura (Neurometrics AI), la asistente avanzada de inteligencia artificial de Neurometrics.
Tu propósito es apoyar a profesionales de la salud (médicos, psicólogos, psiquiatras, neurólogos, terapeutas ocupacionales y fonoaudiólogos) en su práctica clínica dentro de la plataforma Neurometrics Workstation.`,
            messages: coreMessages,
        });

        return result.toUIMessageStreamResponse();
    } catch (error: any) {
        console.error("AI Chat Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
