'use client'

import { useState, useRef, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'


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

    // Removed user check to make it public
    // if (!user) return null

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

    const isDraggingRef = useRef(false)

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragStart={() => { isDraggingRef.current = true }}
            onDragEnd={() => { setTimeout(() => { isDraggingRef.current = false }, 150) }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 cursor-move"
        >
            {isOpen && (
                <Card className="w-80 md:w-96 shadow-2xl border-teal-100 animate-in slide-in-from-bottom-10 fade-in duration-300 cursor-default" onPointerDown={(e) => e.stopPropagation()}>
                    <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-t-xl p-4 flex flex-row items-center justify-between space-y-0 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-black p-1.5 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner shrink-0">
                                <Image
                                    src="/neurometrics-logo-small.png"
                                    alt="Neurometrics Logo"
                                    width={28}
                                    height={28}
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold tracking-tight">Neurometrics IA</CardTitle>
                                <p className="text-xs text-teal-50 font-medium opacity-90 flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                    Soporte digital
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 h-8 w-8 rounded-full transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 bg-slate-50/50 backdrop-blur-sm">
                        <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
                            <div className="flex flex-col gap-3">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all",
                                            msg.role === 'user'
                                                ? "bg-gradient-to-br from-teal-600 to-teal-700 text-white self-end rounded-br-none shadow-teal-900/5"
                                                : "bg-white text-slate-700 self-start rounded-bl-none border border-slate-100 shadow-slate-200/50"
                                        )}
                                    >
                                        {msg.role === 'assistant' ? (
                                            <div className="text-sm leading-relaxed">
                                                <ReactMarkdown
                                                    components={{
                                                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                                        li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                        strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900" {...props} />,
                                                        a: ({ node, ...props }) => <a className="text-teal-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="bg-white text-slate-700 self-start rounded-2xl rounded-bl-none border border-slate-100 px-4 py-3 shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                                        <span className="text-xs text-slate-400 font-medium">Escribiendo...</span>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="p-3 bg-white border-t border-slate-100 rounded-b-xl flex gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
                            <Input
                                placeholder="Escribe tu consulta..."
                                className="flex-1 border-slate-200 focus-visible:ring-teal-500 bg-slate-50 focus:bg-white transition-colors"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button
                                size="icon"
                                className="bg-teal-600 hover:bg-teal-700 text-white shrink-0 shadow-lg shadow-teal-600/20 transition-all active:scale-95"
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
                onClick={(e) => {
                    if (isDraggingRef.current) {
                        e.preventDefault()
                        e.stopPropagation()
                        return
                    }
                    setIsOpen(!isOpen)
                }}
                className={cn(
                    "h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 z-50 border-4 border-white/20 backdrop-blur-sm",
                    isOpen
                        ? "bg-white text-slate-600 hover:bg-slate-100 rotate-90"
                        : "bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white hover:shadow-teal-500/50 animate-in zoom-in duration-300"
                )}
            >
                {isOpen ? (
                    <X className="w-8 h-8" />
                ) : (
                    <div className="relative w-9 h-9">
                        <Image
                            src="/neurometrics-logo-small.png"
                            alt="Neurometrics Logo"
                            fill
                            sizes="36px"
                            className="object-contain brightness-0 invert drop-shadow-md"
                        />
                    </div>
                )}
            </Button>
        </motion.div>
    )
}
