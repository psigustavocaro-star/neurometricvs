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

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // OpenAI expects a File object directly
        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            response_format: 'text',
            language: 'es', // Force Spanish since it's the primary language
        });

        return NextResponse.json({ text: transcription });
    } catch (error) {
        console.error('Transcription error:', error);
        return NextResponse.json(
            { error: 'Error processing audio' },
            { status: 500 }
        );
    }
}
