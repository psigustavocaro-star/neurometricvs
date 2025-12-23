'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import {
    MessageSquare,
    X,
    Send,
    Bot,
    GripVertical,
    User
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

export function NeurometricaSupportBot() {
    // Custom Chat State
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // UI State
    const [isOpen, setIsOpen] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    // Dragging state
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [hasMoved, setHasMoved] = useState(false)
    const dragRef = useRef<HTMLDivElement>(null)
    const dragStartPos = useRef({ x: 0, y: 0 })
    const initialPos = useRef({ x: 0, y: 0 })

    // Load saved position
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('neurometrica-bot-pos')
            if (saved) {
                try {
                    setPosition(JSON.parse(saved))
                } catch (e) { }
            }
        }
    }, [])

    // Save position
    useEffect(() => {
        if (position.x !== 0 || position.y !== 0) {
            localStorage.setItem('neurometrica-bot-pos', JSON.stringify(position))
        }
    }, [position])


    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isOpen])

    // Drag Logic
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button') && isOpen) return
        if ((e.target as HTMLElement).closest('input') || (e.target as HTMLElement).closest('textarea') || (e.target as HTMLElement).closest('form')) return

        setIsDragging(true)
        setHasMoved(false)
        dragStartPos.current = { x: e.clientX, y: e.clientY }
        initialPos.current = position
    }, [position, isOpen])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return
        const deltaX = e.clientX - dragStartPos.current.x
        const deltaY = e.clientY - dragStartPos.current.y

        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            setHasMoved(true)
        }

        setPosition({
            x: initialPos.current.x + deltaX,
            y: initialPos.current.y + deltaY
        })
    }, [isDragging])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    // Handle Send Manual Implementation
    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isLoading) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        }

        // Optimistic update
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(({ role, content }) => ({ role, content }))
                })
            })

            if (!response.ok) throw new Error('Network response was not ok')
            if (!response.body) return

            // Create placeholder for bot message
            const botMsgId = (Date.now() + 1).toString()
            const botMsg: Message = { id: botMsgId, role: 'assistant', content: '' }
            setMessages(prev => [...prev, botMsg])

            // Stream reader
            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let done = false

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value, { stream: true })

                setMessages(prev => prev.map(msg =>
                    msg.id === botMsgId
                        ? { ...msg, content: msg.content + chunkValue }
                        : msg
                ))
            }
        } catch (error) {
            console.error('Chat Error:', error)
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.'
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            ref={dragRef}
            className={cn(
                "fixed z-[100] transition-all duration-75",
                isDragging && "cursor-grabbing"
            )}
            style={{
                right: `${24 - position.x}px`,
                bottom: `${24 - position.y}px`
            }}
            onMouseDown={handleMouseDown}
        >
            {/* Helper Label */}
            {!isOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-bottom-2">
                    Asistente AI
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-32px)] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">

                    {/* Header */}
                    <div className="p-4 bg-slate-900 text-white flex justify-between items-center shrink-0 cursor-move" onMouseDown={handleMouseDown}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Neurometrics AI</h3>
                                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    En línea
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full h-8 w-8 p-0">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-slate-50 dark:bg-slate-950/50">
                        <div className="space-y-4 pb-4">
                            {messages.length === 0 && (
                                <div className="text-center text-sm text-muted-foreground mt-10 px-6">
                                    <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">Bienvenido a Neurometrics</p>
                                    <p>Soy tu asistente virtual experto. Estoy aquí para apoyarte con tests neuropsicológicos, gestión de pacientes y cualquier duda sobre la plataforma Workstation.</p>
                                </div>
                            )}

                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex gap-2", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                    {msg.role !== 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-300 dark:border-slate-700">
                                            <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-300",
                                        msg.role === 'user'
                                            ? "bg-teal-600 text-white rounded-tr-none"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none"
                                    )}>
                                        <div className={cn(
                                            "markdown-content",
                                            msg.role === 'user' ? "text-white" : "text-slate-700 dark:text-slate-200"
                                        )}>
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                                    strong: ({ node, ...props }) => <strong className="font-bold text-teal-600 dark:text-teal-400" {...props} />,
                                                    ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                    ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0 border border-teal-200 dark:border-teal-800">
                                            <User className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-2 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-300 dark:border-slate-700">
                                        <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-100 dark:border-slate-700 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                        <form onSubmit={handleSendMessage} className="flex gap-2 relative">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu consulta..."
                                className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10 focus-visible:ring-teal-500"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-1 top-1 bottom-1 h-auto w-8 p-0 rounded-md bg-teal-600 hover:bg-teal-700 text-white"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Button */}
            <button
                onClick={() => {
                    if (!hasMoved) {
                        setIsOpen(!isOpen)
                    }
                }}
                className={cn(
                    "group relative w-14 h-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center pointer-events-auto",
                    isOpen ? "rotate-90 bg-slate-800" : "bg-slate-900 hover:scale-110 hover:bg-teal-600"
                )}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}

                {/* Ping animation when closed */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                    </span>
                )}

                {/* Drag Handle Indicator */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-slate-400" />
                </div>
            </button>
        </div>
    )
}
