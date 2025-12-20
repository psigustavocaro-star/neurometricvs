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
            messages,
        });

        console.log("API Debug - Stream created");
        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Chat Error:", error);
        return new Response(JSON.stringify({ error: 'Check server logs' }), { status: 500 });
    }
}
