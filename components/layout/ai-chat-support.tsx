'use client'

import { useState, useRef, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Send, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

// Custom Psi Icon Component (SVG)
const PsiIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2v20" />
        <path d="M4 4c0 6 3 9 8 9s8-3 8-9" />
    </svg>
)

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export function AIChatSupport({ user }: { user?: User | null }) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hola, soy tu asistente de IA especializado en psicología, psiquiatría y neurología. ¿En qué puedo ayudarte hoy?' }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }, [messages, isOpen])

    if (!user) return null

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage = inputValue
        setInputValue('')
        const newMessages = [...messages, { role: 'user' as const, content: userMessage }]
        setMessages(newMessages)
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch response')
            }

            setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
        } catch (error: any) {
            console.error('Chat Error:', error)

            // Check if it's a specific Gemini error we passed from the server
            const errorMessage = error.message || 'Unknown error'

            if (errorMessage.includes('Gemini Error')) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `⚠️ **Error de Conexión**: ${errorMessage}\n\nPor favor verifica tu API Key.`
                }])
            } else {
                // Fallback for other errors (Demo Mode)
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: '⚠️ **Modo Demo**: No pude conectar con el servicio de IA. \n\nRespuesta simulada: "Entiendo que estás consultando sobre este paciente. Basado en los resultados del test, se observan indicadores que sugieren atención clínica."'
                }])
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            drag
            dragMomentum={false}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 cursor-move"
        >
            {isOpen && (
                <Card className="w-80 md:w-96 shadow-2xl border-teal-100 animate-in slide-in-from-bottom-10 fade-in duration-300 cursor-default" onPointerDown={(e) => e.stopPropagation()}>
                    <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-xl p-4 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <PsiIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold">Neurometrics AI</CardTitle>
                                <p className="text-xs text-teal-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Soporte 24/7
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 h-8 w-8 rounded-full"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 bg-slate-50">
                        <ScrollArea className="h-[350px] p-4" ref={scrollAreaRef}>
                            <div className="flex flex-col gap-3">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                            msg.role === 'user'
                                                ? "bg-teal-600 text-white self-end rounded-br-none"
                                                : "bg-white text-slate-700 self-start rounded-bl-none border border-slate-200"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="bg-white text-slate-700 self-start rounded-2xl rounded-bl-none border border-slate-200 px-4 py-2 shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-3 h-3 animate-spin text-teal-600" />
                                        <span className="text-xs text-slate-400">Escribiendo...</span>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="p-3 bg-white border-t border-slate-100 rounded-b-xl flex gap-2">
                            <Input
                                placeholder="Escribe tu consulta..."
                                className="flex-1 border-slate-200 focus-visible:ring-teal-500"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button
                                size="icon"
                                className="bg-teal-600 hover:bg-teal-700 text-white shrink-0"
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputValue.trim()}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110",
                    isOpen ? "bg-slate-200 text-slate-600 hover:bg-slate-300" : "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-teal-500/30"
                )}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <PsiIcon className="w-7 h-7" />
                )}
            </Button>
        </motion.div>
    )
}
