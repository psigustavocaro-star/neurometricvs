"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Square, Save, Loader2, FileText, Activity, Clock, Download, AlertCircle } from 'lucide-react';
import ClinicalMarkdown from './ClinicalMarkdown';

// Utility to safely get API key
const getGeminiKey = () => {
    // Priority: NEXT_PUBLIC_ for client side, then REACT_APP_ as requested custom fallback
    return process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
};

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const ClinicalSessionRecorder = ({ patientName, onSaveSession }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [transcripts, setTranscripts] = useState([]); // Array of transcript segments
    const [fullTranscript, setFullTranscript] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [status, setStatus] = useState("idle"); // idle, recording, processing, analyzing, done
    const [error, setError] = useState(null);

    const mediaRecorderRef = useRef(null);
    const timerIntervalRef = useRef(null);
    const autoSplitIntervalRef = useRef(null);
    const streamRef = useRef(null);

    // Constants
    const AUTO_SPLIT_MS = 3 * 60 * 1000; // 3 minutes

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            stopRecording(false);
        };
    }, []);

    // Format time helper
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startRecording = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Initialize MediaRecorder
            setupMediaRecorder(stream);

            setIsRecording(true);
            setStatus("recording");

            // Start Timer
            const startTime = Date.now() - (elapsedTime * 1000);
            timerIntervalRef.current = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);

            // Start Auto-Split Timer
            autoSplitIntervalRef.current = setInterval(() => {
                handleAutoSplit();
            }, AUTO_SPLIT_MS);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError("No se pudo acceder al micrófono. Por favor verifica los permisos.");
        }
    };

    const setupMediaRecorder = (stream) => {
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' }); // Use webm for broad support
        mediaRecorderRef.current = mediaRecorder;

        let chunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            chunks = []; // Reset chunks
            // Process this segment
            await processAudioSegment(blob);
        };

        mediaRecorder.start();
    };

    const handleAutoSplit = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            console.log("Auto-splitting recording for transcript generation...");
            mediaRecorderRef.current.stop(); // This triggers onstop, which processes the blob
            // Need to restart immediately. 
            // Note: stop() is async in terms of event firing, but we can restart recording on the same stream immediately?
            // Safer way: Wait a tiny bit or just create a new recorder. 
            // Actually, simply calling start() again on the same instance after stop might work, but safer to re-init if needed.
            // Let's re-use the current stream.
            if (streamRef.current) {
                // We need to wait for onstop to finish setting up the previous blob? 
                // Actually, onstop is event driven. We can just start a new recorder instance or re-start the existing one.
                // Re-creating is often safer to avoid state issues.
                setupMediaRecorder(streamRef.current);
            }
        }
    };

    const stopRecording = (shouldProcess = true) => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (autoSplitIntervalRef.current) clearInterval(autoSplitIntervalRef.current);

        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop(); // Triggers onstop -> processAudioSegment
        }

        // Stop all tracks
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        setIsRecording(false);
        if (shouldProcess) {
            setStatus("processing"); // Wait for final segment
        } else {
            setStatus("idle");
        }
    };

    const processAudioSegment = async (audioBlob) => {
        try {
            // Convert Blob to Base64
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);

            reader.onloadend = async () => {
                const base64Audio = reader.result.split(',')[1];

                // Call Gemini for Transcription
                const transcript = await transcribeWithGemini(base64Audio);

                setTranscripts(prev => [...prev, transcript]);
                setFullTranscript(prev => (prev ? prev + "\n" + transcript : transcript));
            };
        } catch (err) {
            console.error("Error processing audio segment:", err);
            setError("Error al procesar el segmento de audio.");
        }
    };

    const transcribeWithGemini = async (base64Audio) => {
        const apiKey = getGeminiKey();
        if (!apiKey) {
            console.error("API Key missing. Check .env.local");
            throw new Error("API Key configuration error (Missing Key).");
        }

        // Detailed logging for debugging
        console.log("Transcribing with Gemini... Key available:", apiKey.substring(0, 4) + "****");

        const body = {
            contents: [{
                parts: [
                    { text: "Transcribe el siguiente audio médico con precisión. Ignora ruidos de fondo." },
                    { inline_data: { mime_type: "audio/webm", data: base64Audio } }
                ]
            }]
        };

        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error("Gemini API Error Response:", errText);
                throw new Error(`Gemini API Failed: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        } catch (error) {
            console.error("Transcription execution error:", error);
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error("Error de conexión con IA. Verifique su internet o clave API. (Failed to fetch)");
            }
            throw error;
        }
    };

    const generateClinicalAnalysis = async () => {
        if (!fullTranscript) {
            setError("No hay transcripción disponible para analizar.");
            return;
        }

        setStatus("analyzing");

        try {
            const apiKey = getGeminiKey();
            const prompt = `
Actúa como un Psicólogo Clínico Senior redactando una evolución de sesión.
Tu respuesta DEBE usar Markdown estricto.
Estructura Obligatoria:
1. Resumen de la Sesión (Motivo de consulta actual y temas tratados).
2. Examen Mental y Observaciones Conductuales (Tono, afecto, disposición).
3. Análisis Clínico (Interpretación de los hallazgos, mecanismos de defensa, progreso).
4. Plan de Tratamiento / Tareas (Acuerdos para la próxima sesión).
Mantén un tono clínico, objetivo y profesional.

Transcripción de la sesión:
${fullTranscript}
            `;

            const body = {
                contents: [{ parts: [{ text: prompt }] }]
            };

            const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }

            const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
            setAnalysis(analysisText);
            setStatus("done");

        } catch (err) {
            console.error("Error generating analysis:", err);
            setError("Error al generar el análisis clínico.");
            setStatus("idle"); // Allow retry
        }
    };

    const handleSave = () => {
        if (onSaveSession) {
            onSaveSession({
                transcription: fullTranscript,
                analysis: analysis,
                duration: elapsedTime
            });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-sm"> {/* Medical UI container */}
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h3 className="text-slate-800 font-semibold text-lg flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-600" />
                        Nueva Sesión: <span className="text-indigo-700">{patientName}</span>
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                        Grabación inteligente con Gemini 2.5 Flash
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    <Clock className={`w-4 h-4 ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
                    <span className="font-mono text-slate-700 font-medium text-base">{formatTime(elapsedTime)}</span>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 min-h-[300px] max-h-[600px] overflow-y-auto bg-slate-50/30">
                {error && (
                    <div className="mb-4 bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-200 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {/* State: Initial or Recording */}
                {!analysis && (
                    <div className="space-y-4">
                        {/* Visualizer Placeholder / Transcription Preview */}
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm min-h-[200px]">
                            {fullTranscript ? (
                                <div className="prose prose-sm max-w-none text-slate-600">
                                    <p className="whitespace-pre-wrap">{fullTranscript}</p>
                                    {isRecording && <span className="inline-block w-2 H-4 bg-indigo-500 animate-blink ml-1">|</span>}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                    {isRecording ? (
                                        <>
                                            <div className="flex gap-1 mb-2">
                                                <div className="w-1 h-3 bg-indigo-400 animate-bounce delay-75"></div>
                                                <div className="w-1 h-5 bg-indigo-500 animate-bounce delay-150"></div>
                                                <div className="w-1 h-8 bg-indigo-600 animate-bounce"></div>
                                                <div className="w-1 h-5 bg-indigo-500 animate-bounce delay-150"></div>
                                                <div className="w-1 h-3 bg-indigo-400 animate-bounce delay-75"></div>
                                            </div>
                                            <p>Escuchando y transcribiendo...</p>
                                        </>
                                    ) : (
                                        <p>Presiona "Iniciar Sesión" para comenzar a grabar.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Status Messages */}
                        {status === "processing" && (
                            <div className="flex items-center gap-2 text-indigo-600 justify-center py-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Procesando audio final...</span>
                            </div>
                        )}
                        {status === "analyzing" && (
                            <div className="flex items-center gap-2 text-indigo-600 justify-center py-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generando análisis clínico con IA...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* State: Analysis Done */}
                {analysis && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-lg border border-indigo-100 shadow-md p-6">
                            <ClinicalMarkdown content={analysis} />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                    Diseñado y desarrollado por Ps. Gustavo Caro
                </div>

                <div className="flex items-center gap-3">
                    {!isRecording && !analysis && (
                        <button
                            onClick={startRecording}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                        >
                            <Mic className="w-4 h-4" />
                            Iniciar Sesión
                        </button>
                    )}

                    {isRecording && (
                        <button
                            onClick={() => stopRecording(true)}
                            className="flex items-center gap-2 bg-slate-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <Square className="w-4 h-4 fill-slate-700" />
                            Finalizar Grabación
                        </button>
                    )}

                    {!isRecording && fullTranscript && !analysis && status !== "analyzing" && (
                        <button
                            onClick={generateClinicalAnalysis}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                        >
                            <FileText className="w-4 h-4" />
                            Generar Evolución
                        </button>
                    )}

                    {analysis && (
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
                        >
                            <Save className="w-4 h-4" />
                            Guardar en Ficha
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClinicalSessionRecorder;
