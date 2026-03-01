'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Sparkles, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export function UpgradePopup({ plan }: { plan: string }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Just show it if the user is on the free/basic plan
        // The naming in DB might be 'basic' for free, but the text is what the user asked
        if (plan === 'basic' || plan === 'free' || !plan) {
            // Show it after a small delay
            const timer = setTimeout(() => {
                const dismissed = sessionStorage.getItem('upgrade_popup_dismissed')
                if (!dismissed) {
                    setIsVisible(true)
                }
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [plan])

    const handleDismiss = () => {
        setIsVisible(false)
        sessionStorage.setItem('upgrade_popup_dismissed', 'true')
    }

    if (!isVisible) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[320px] w-full"
                >
                    <div className="bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 rounded-2xl shadow-xl shadow-teal-500/10 p-5 relative overflow-hidden">

                        {/* Subtle background glow */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-teal-50 dark:bg-teal-500/10 rounded-xl shrink-0">
                                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            </div>
                            <div className="space-y-1 mt-0.5 pr-8">
                                <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                                    Mejora tu cuenta a Plan Básico
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Obtén 7 días gratis, acceso ilimitado a todos los tests, informes automáticos con IA y más.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <Link href="/profile?tab=billing" className="w-full">
                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-sm h-9 text-xs">
                                    Comenzar mis 7 días gratis <ChevronRight className="w-3 h-3 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
