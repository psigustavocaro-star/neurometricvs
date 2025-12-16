'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    MessageSquare,
    X,
    Send,
    LifeBuoy,
    GripVertical,
    ChevronLeft,
    Mail,
    FileText,
    HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// Árbol de Decisiones para Soporte
interface SupportNode {
    id: string
    title?: string // Header title update
    message: string
    options?: { label: string, nextId: string, icon?: any }[]
    isForm?: boolean // If true, render contact form
}

const SUPPORT_FLOW: Record<string, SupportNode> = {
    'root': {
        id: 'root',
        title: 'Soporte Neurometrics',
        message: '¡Hola! Soy tu asistente de soporte virtual. Estoy aquí para guiarte en el uso de la plataforma.',
        options: [
            { label: 'Problemas de Acceso', nextId: 'access_issues', icon: LifeBuoy },
            { label: 'Gestión de Pacientes', nextId: 'patient_help', icon: FileText },
            { label: 'Dudas sobre Tests', nextId: 'test_help', icon: HelpCircle },
            { label: 'Contactar Soporte Humano', nextId: 'contact_form', icon: Mail },
        ]
    },
    'access_issues': {
        id: 'access_issues',
        title: 'Problemas de Acceso',
        message: 'Entiendo. ¿Qué tipo de problema de acceso tienes?',
        options: [
            { label: 'Olvidé mi contraseña', nextId: 'forgot_password' },
            { label: 'No puedo iniciar sesión', nextId: 'login_error' },
            { label: 'Volver al inicio', nextId: 'root', icon: ChevronLeft },
        ]
    },
    'forgot_password': {
        id: 'forgot_password',
        message: 'Puedes restablecer tu contraseña haciendo clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión. Te enviaremos un correo con las instrucciones.',
        options: [
            { label: '¿Algo más?', nextId: 'root' },
            { label: 'No llegó el correo', nextId: 'contact_form' }
        ]
    },
    'login_error': {
        id: 'login_error',
        message: 'Verifica que tu correo y contraseña sean correctos. Si el problema persiste, intenta borrar el caché de tu navegador o usar modo incógnito.',
        options: [
            { label: 'Funciona, gracias', nextId: 'root' },
            { label: 'Sigue fallando', nextId: 'contact_form' }
        ]
    },
    'patient_help': {
        id: 'patient_help',
        title: 'Ayuda con Pacientes',
        message: 'La gestión de pacientes es clave. ¿Qué necesitas saber?',
        options: [
            { label: '¿Cómo crear un paciente?', nextId: 'create_patient' },
            { label: '¿Cómo editar datos?', nextId: 'edit_patient' },
            { label: 'Volver', nextId: 'root', icon: ChevronLeft }
        ]
    },
    'create_patient': {
        id: 'create_patient',
        message: 'Para crear un paciente, ve a la sección "Pacientes" en el menú lateral y haz clic en el botón "+ Nuevo Paciente" en la parte superior derecha.',
        options: [
            { label: 'Entendido', nextId: 'root' }
        ]
    },
    'edit_patient': {
        id: 'edit_patient',
        message: 'Entra al perfil del paciente y busca el botón de editar (icono de lápiz) junto a su información personal.',
        options: [
            { label: 'Gracias', nextId: 'root' }
        ]
    },
    'test_help': {
        id: 'test_help',
        title: 'Ayuda con Tests',
        message: 'Contamos con corrección automática. ¿Cuál es tu duda?',
        options: [
            { label: '¿Cómo asignar un test?', nextId: 'assign_test' },
            { label: 'Interpretación de resultados', nextId: 'interpret_help' },
            { label: 'Volver', nextId: 'root', icon: ChevronLeft }
        ]
    },
    'assign_test': {
        id: 'assign_test',
        message: 'Dentro del perfil del paciente, ve a la pestaña "Evaluaciones" o "Tests" y selecciona "Nuevo Test". Podrás completarlo ahí mismo o copiar un enlace para enviarlo.',
        options: [{ label: 'Perfecto', nextId: 'root' }]
    },
    'interpret_help': {
        id: 'interpret_help',
        message: 'Los resultados incluyen una interpretación automática basada en baremos estándar. Si necesitas un análisis clínico más profundo, revisa el Informe Profesional PDF.',
        options: [{ label: 'Volver al inicio', nextId: 'root' }]
    },
    'contact_form': {
        id: 'contact_form',
        title: 'Contacto de Soporte',
        message: 'Por favor completa el formulario y un especialista te responderá a la brevedad.',
        isForm: true
    },
    'form_success': {
        id: 'form_success',
        message: '¡Mensaje enviado! Hemos recibido tu solicitud de soporte. Te contactaremos por correo electrónico en menos de 24 horas.',
        options: [{ label: 'Cerrar chat', nextId: 'close' }]
    }
}

interface Message {
    id: string
    role: 'user' | 'bot'
    content: string | JSX.Element
    nodeId?: string
}

export function NeurometricaSupportBot() {
    // State
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [currentNodeId, setCurrentNodeId] = useState('root')

    // Contact Form State
    const [contactForm, setContactForm] = useState({ subject: '', message: '' })
    const [sending, setSending] = useState(false)

    // Dragging state
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const dragRef = useRef<HTMLDivElement>(null)
    const dragStartPos = useRef({ x: 0, y: 0 })
    const initialPos = useRef({ x: 0, y: 0 })

    // Init Chat
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: 'init',
                role: 'bot',
                content: SUPPORT_FLOW['root'].message,
                nodeId: 'root'
            }])
        }
    }, [])

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

    // Drag Logic
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input') || (e.target as HTMLElement).closest('textarea')) return
        e.preventDefault()
        setIsDragging(true)
        dragStartPos.current = { x: e.clientX, y: e.clientY }
        initialPos.current = position
    }, [position])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return
        const deltaX = e.clientX - dragStartPos.current.x
        const deltaY = e.clientY - dragStartPos.current.y
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

    // Navigation Logic
    const handleOptionClick = (option: { label: string, nextId: string }) => {
        if (option.nextId === 'close') {
            setIsOpen(false)
            // Reset to root after closing
            setTimeout(() => {
                setCurrentNodeId('root')
                setMessages([{ id: Date.now().toString(), role: 'bot', content: SUPPORT_FLOW['root'].message, nodeId: 'root' }])
            }, 500)
            return
        }

        // Add user selection as message
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: option.label }
        setMessages(prev => [...prev, userMsg])

        // Add bot response
        const nextNode = SUPPORT_FLOW[option.nextId]
        setCurrentNodeId(option.nextId)

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: nextNode.message,
                nodeId: option.nextId
            }])
        }, 500)
    }

    const handleSendForm = () => {
        if (!contactForm.subject || !contactForm.message) {
            toast.error("Por favor completa todos los campos")
            return
        }
        setSending(true)
        // Simulate API call
        setTimeout(() => {
            setSending(false)
            setContactForm({ subject: '', message: '' })
            // Success flow
            const successNode = SUPPORT_FLOW['form_success']
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'bot',
                content: successNode.message,
                nodeId: 'form_success'
            }])
            setCurrentNodeId('form_success')
        }, 1500)
    }

    const currentNode = SUPPORT_FLOW[currentNodeId]

    return (
        <div
            ref={dragRef}
            className={cn(
                "fixed z-[100] transition-all duration-75", // Removed duration-300 for snappier drag
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
                    Ayuda 24/7
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-32px)] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">

                    {/* Header */}
                    <div className="p-4 bg-slate-900 text-white flex justify-between items-center shrink-0 cursor-move" onMouseDown={handleMouseDown}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                                <LifeBuoy className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">{currentNode?.title || 'Soporte Neurometrics'}</h3>
                                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    En línea 24/7
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full h-8 w-8 p-0">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4 bg-slate-50 dark:bg-slate-950/50">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex gap-2", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                    {msg.role === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-300 dark:border-slate-700">
                                            <LifeBuoy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-teal-600 text-white rounded-tr-none"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {/* Form Render inside Chat Flow if active */}
                            {currentNode.isForm && currentNodeId === messages[messages.length - 1]?.nodeId && (
                                <div className="ml-10 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 animate-in fade-in slide-in-from-bottom-2">
                                    <Input
                                        placeholder="Asunto"
                                        className="bg-slate-50 dark:bg-slate-900"
                                        value={contactForm.subject}
                                        onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                                    />
                                    <Textarea
                                        placeholder="Describe tu problema..."
                                        className="bg-slate-50 dark:bg-slate-900 min-h-[80px]"
                                        value={contactForm.message}
                                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                    />
                                    <Button onClick={handleSendForm} disabled={sending} className="w-full bg-slate-900 hover:bg-slate-800">
                                        {sending ? 'Enviando...' : 'Enviar Mensaje'} <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Options / Footer */}
                    {!currentNode.isForm && currentNode.options && (
                        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex flex-wrap gap-2 justify-end">
                                {currentNode.options.map((opt, i) => (
                                    <Button
                                        key={i}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleOptionClick(opt)}
                                        className="rounded-full text-xs border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-900 dark:text-teal-400 dark:hover:bg-teal-950"
                                    >
                                        {opt.icon && <opt.icon className="w-3 h-3 mr-1.5" />}
                                        {opt.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative w-14 h-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center",
                    isOpen ? "rotate-90 bg-slate-800" : "bg-slate-900 hover:scale-110 hover:bg-teal-600"
                )}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}

                {/* Ping animation when closed */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
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
