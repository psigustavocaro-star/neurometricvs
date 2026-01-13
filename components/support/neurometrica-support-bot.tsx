'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
    MessageSquare,
    X,
    Send,
    Bot,
    GripVertical,
    User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

import { useChat } from '@ai-sdk/react'
import { useTranslations } from "next-intl"

export function NeurometricaSupportBot() {
    const t = useTranslations('Pricing.Support')
    // UI State
    const [isOpen, setIsOpen] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    const [input, setInput] = useState('')
    // useChat Hook Implementation
    const { messages, sendMessage, status } = useChat({
        // @ts-ignore - 'api' might not be in the type but it's often supported or needed
        api: '/api/chat',
        onError: (error) => {
            console.error('Chat Error:', error)
            toast.error(t('error_chat') + error.message)
        }
    })

    useEffect(() => {
        console.log('CHAT_DEBUG: Messages updated:', messages);
    }, [messages]);

    useEffect(() => {
        console.log('CHAT_DEBUG: Status updated:', status);
    }, [status]);

    const isLoading = status === 'submitted' || status === 'streaming'

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const currentInput = input
        setInput('')

        try {
            await sendMessage({
                text: currentInput
            })
        } catch (err: any) {
            console.error('Send message error:', err)
            toast.error(t('error_send') + err.message)
        }
    }

    // Dragging state (managed by framer-motion, persisted in localStorage)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isLoaded, setIsLoaded] = useState(false)

    // Load saved position
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('neurometrica-bot-pos')
            if (saved) {
                try {
                    setPosition(JSON.parse(saved))
                } catch (e) { }
            }
            setIsLoaded(true)
        }
    }, [])

    // Save position on drag end
    const handleDragEnd = (event: any, info: any) => {
        const newPos = {
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
        }
        setPosition(newPos)
        localStorage.setItem('neurometrica-bot-pos', JSON.stringify(newPos))
    }

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isOpen])

    if (!isLoaded) return null;

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            initial={false}
            animate={{
                x: position.x,
                y: position.y
            }}
            className={cn(
                "fixed z-[100] touch-none",
                !isOpen && "cursor-grab active:cursor-grabbing"
            )}
            style={{
                right: 24,
                bottom: 24
            }}
        >
            {/* Helper Label */}
            {!isOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-bottom-2">
                    {t('helper_label')}
                </div>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-[calc(100vw-32px)] sm:w-[350px] md:w-[380px] max-w-[400px] h-[calc(100vh-140px)] sm:h-[450px] md:h-[550px] max-h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Neurometrics AI</h3>
                                    <p className="text-[10px] text-slate-300 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        {t('online')}
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
                                        <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">{t('welcome_title')}</p>
                                        <p>{t('welcome_desc')}</p>
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
                                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                                            msg.role === 'user'
                                                ? "bg-teal-600 text-white rounded-tr-none"
                                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none"
                                        )}>
                                            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ul:pl-4">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                                        strong: ({ node, ...props }) => <strong className="font-bold text-teal-600 dark:text-teal-400" {...props} />,
                                                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                    }}
                                                >
                                                    {(() => {
                                                        const m = msg as any;
                                                        // 1. Check direct content (standard in most versions)
                                                        if (typeof m.content === 'string' && m.content) return m.content;

                                                        // 2. Check parts (AI SDK 5.0 protocol)
                                                        if (m.parts && Array.isArray(m.parts)) {
                                                            const text = m.parts
                                                                .filter((p: any) => p.type === 'text')
                                                                .map((p: any) => p.text)
                                                                .join('');
                                                            if (text) return text;
                                                        }

                                                        // 3. Check for 'text' property
                                                        if (typeof m.text === 'string' && m.text) return m.text;

                                                        // 4. Debug fallback if still empty (only if it's the assistant or user sent something)
                                                        if (m.role === 'user' || status === 'ready') {
                                                            return "";
                                                        }
                                                        return "";
                                                    })()}
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

                        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                            <form onSubmit={handleFormSubmit} className="flex gap-2 relative">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t('input_placeholder')}
                                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10 focus-visible:ring-teal-500"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={isLoading || !input?.trim()}
                                    className="absolute right-1 top-1 bottom-1 h-auto w-8 p-0 rounded-md bg-teal-600 hover:bg-teal-700 text-white"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative w-14 h-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center",
                    isOpen ? "rotate-90 bg-slate-800" : "bg-slate-900 hover:bg-teal-600"
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
            </motion.button>
        </motion.div>
    )
}
