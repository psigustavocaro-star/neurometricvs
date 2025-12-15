import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const { text, patientName } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: 'No text provided' },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `Eres un asistente clínico especializado en psicología y psiquiatría. 
Tu tarea es generar un resumen estructurado de las notas de sesión clínica.

El resumen debe incluir:
1. **Motivo de consulta/tema principal** - El tema central discutido
2. **Estado emocional observado** - Cómo se presentó el paciente
3. **Puntos clave discutidos** - Lista de los temas importantes (máximo 5)
4. **Intervenciones realizadas** - Técnicas o estrategias usadas
5. **Tareas/próximos pasos** - Compromisos o plan para la siguiente sesión

Sé conciso pero preciso. Usa viñetas cuando sea apropiado. Mantén un tono profesional clínico.`
                },
                {
                    role: 'user',
                    content: `Genera un resumen clínico estructurado de la siguiente transcripción de sesión${patientName ? ` con ${patientName}` : ''}:\n\n${text}`
                }
            ],
            temperature: 0.3,
            max_tokens: 1000,
        });

        const summary = completion.choices[0]?.message?.content || '';

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Summarization error:', error);
        return NextResponse.json(
            { error: 'Error generating summary' },
            { status: 500 }
        );
    }
}
