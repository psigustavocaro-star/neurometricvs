'use client'

import { useState, useEffect, useRef } from 'react'
import { generateMockPatients, setSubscriptionPlan, generateMockTestResult } from '@/app/[locale]/admin/actions'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Shield, Users, CreditCard, Loader2, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function AdminMenu() {
    const [loading, setLoading] = useState(false)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const isDraggingRef = useRef(false)

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUserEmail(user?.email || null)
        })
    }, [])

    if (userEmail !== 'psi.gustavocaro@gmail.com') return null

    const handleSetPlan = async (plan: 'basic' | 'clinical' | 'pro') => {
        setLoading(true)
        try {
            const result = await setSubscriptionPlan(plan)
            if (result.error) throw new Error(result.error)
            toast.success(`Plan cambiado a: ${plan.toUpperCase()}`)
            // Force reload to reflect permission changes immediately
            window.location.reload()
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragStart={() => { isDraggingRef.current = true }}
            onDragEnd={() => { setTimeout(() => { isDraggingRef.current = false }, 150) }}
            className="fixed top-24 left-4 z-50 cursor-move"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-lg border-2 border-white animate-pulse hover:animate-none overflow-hidden p-0"
                        onClick={(e) => {
                            if (isDraggingRef.current) {
                                e.preventDefault()
                                e.stopPropagation()
                            }
                        }}
                    >
                        {loading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <img
                                src="/admin-icon.jpg"
                                alt="Admin God Mode"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        Admin Tools (God Mode)
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                        <a href="/admin" className="flex items-center cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" />
                            God Mode Panel
                        </a>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="text-xs text-slate-500">Cambiar Plan</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleSetPlan('basic')} disabled={loading}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Plan Básico (Free)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetPlan('clinical')} disabled={loading}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Plan Clínico
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetPlan('pro')} disabled={loading}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Plan Pro (Anual)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </motion.div>
    )
}
