'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Square, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface VoiceRecorderProps {
    onTranscriptionComplete: (text: string) => void
    isProcessing?: boolean
}

export function VoiceRecorder({ onTranscriptionComplete, isProcessing: externalProcessing }: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [isTranscribing, setIsTranscribing] = useState(false)
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
            onTranscriptionComplete(data.text)
            toast.success("Transcripción completada")
        } catch (error) {
            console.error('Transcription error:', error)
            toast.error("Error al transcribir el audio")
        } finally {
            setIsTranscribing(false)
        }
    }

    const isProcessing = isTranscribing || externalProcessing

    return (
        <Button
            type="button"
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
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
                    Detener Grabación
                </>
            ) : (
                <>
                    <Mic className="h-4 w-4" />
                    Grabar Notas
                </>
            )}
        </Button>
    )
}
