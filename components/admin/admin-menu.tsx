'use client'

import { useState, useEffect } from 'react'
import { generateMockPatients, setSubscriptionPlan, generateMockTestResult } from '@/app/admin/actions'
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
    const [isVisible, setIsVisible] = useState(false)

    // Check for admin email on mount
    useState(() => {
        // This is a client-side check for UI visibility only. 
        // Real security is on the server actions.
        // We'll let the server actions handle the strict check, 
        // but for UI we can check if we should even show the button.
        // Since we can't easily get the user email synchronously here without a hook,
        // we will rely on the server actions to fail if not authorized, 
        // OR we can fetch the user.
        // For now, let's just fix the 'free' -> 'basic' error first as requested.
        // The user asked "Should it only appear...?" -> Yes.
        // I will implement a check.
    })

    // Actually, to check email in a client component we need a session.
    // Let's assume for now we just fix the 'free' error and I will add the restriction 
    // if I can easily get the user. 
    // Wait, the user asked "SÓLO CON EL CORREO... deberá aparecer... cierto?"
    // This implies they WANT it to be restricted.
    // I will fetch the user in a useEffect to determine visibility.

    const [userEmail, setUserEmail] = useState<string | null>(null)



    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUserEmail(user?.email || null)
        })
    }, [])

    if (userEmail !== 'psi.gustavocaro@gmail.com') return null

    const handleGeneratePatients = async () => {
        setLoading(true)
        try {
            const result = await generateMockPatients(5)
            if (result.error) throw new Error(result.error)
            toast.success('5 Pacientes generados correctamente')
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGenerateTest = async () => {
        setLoading(true)
        try {
            const result = await generateMockTestResult() // No patientId means random
            if (result.error) throw new Error(result.error)
            toast.success('Test SNAP-IV generado para paciente aleatorio')
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

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
            className="fixed top-24 left-4 z-50 cursor-move"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="destructive" size="icon" className="h-14 w-14 rounded-full shadow-lg border-2 border-white animate-pulse hover:animate-none overflow-hidden p-0">
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
