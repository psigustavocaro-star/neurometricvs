'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Square, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface VoiceRecorderProps {
    onTranscriptionComplete: (text: string) => void
    onSummaryComplete?: (summary: string) => void
    patientName?: string
    isProcessing?: boolean
}

export function VoiceRecorder({
    onTranscriptionComplete,
    onSummaryComplete,
    patientName,
    isProcessing: externalProcessing
}: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [isTranscribing, setIsTranscribing] = useState(false)
    const [isSummarizing, setIsSummarizing] = useState(false)
    const [lastTranscription, setLastTranscription] = useState<string | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data)
                }
            }

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
                await transcribeAudio(audioBlob)

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
        } catch (error) {
            console.error('Error accessing microphone:', error)
            toast.error("No se pudo acceder al micrófono. Verifica los permisos.")
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    const transcribeAudio = async (audioBlob: Blob) => {
        setIsTranscribing(true)
        try {
            // Convert Blob to File
            const file = new File([audioBlob], "recording.webm", { type: 'audio/webm' })

            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/transcribe', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Transcription failed')
            }

            const data = await response.json()
            setLastTranscription(data.text)
            onTranscriptionComplete(data.text)
            toast.success("Transcripción completada")
        } catch (error) {
            console.error('Transcription error:', error)
            toast.error("Error al transcribir el audio")
        } finally {
            setIsTranscribing(false)
        }
    }

    const generateSummary = async () => {
        if (!lastTranscription) {
            toast.error("No hay transcripción para resumir")
            return
        }

        setIsSummarizing(true)
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: lastTranscription,
                    patientName: patientName
                }),
            })

            if (!response.ok) {
                throw new Error('Summarization failed')
            }

            const data = await response.json()
            if (onSummaryComplete) {
                onSummaryComplete(data.summary)
            }
            toast.success("Resumen IA generado")
        } catch (error) {
            console.error('Summarization error:', error)
            toast.error("Error al generar resumen")
        } finally {
            setIsSummarizing(false)
        }
    }

    const isProcessing = isTranscribing || externalProcessing

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing || isSummarizing}
                className={`gap-2 transition-all ${isRecording ? 'animate-pulse' : ''}`}
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transcribiendo...
                    </>
                ) : isRecording ? (
                    <>
                        <Square className="h-4 w-4 fill-current" />
                        Detener
                    </>
                ) : (
                    <>
                        <Mic className="h-4 w-4" />
                        Grabar
                    </>
                )}
            </Button>

            {lastTranscription && onSummaryComplete && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateSummary}
                    disabled={isSummarizing || isProcessing}
                    className="gap-2 text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                    {isSummarizing ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Resumiendo...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4" />
                            Resumir IA
                        </>
                    )}
                </Button>
            )}
        </div>
    )
}

