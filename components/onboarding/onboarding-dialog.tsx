'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OnboardingFlow } from './onboarding-flow'
import { cn } from '@/lib/utils'

interface OnboardingDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function OnboardingDialog({ isOpen, onClose }: OnboardingDialogProps) {
    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Smooth Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="absolute inset-0 bg-black/60"
                        onClick={onClose}
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 300,
                            mass: 0.8
                        }}
                        className="relative w-full max-w-5xl z-10 max-h-[95vh] overflow-y-auto scrollbar-hide"
                    >
                        <OnboardingFlow onClose={onClose} onComplete={onClose} />
                    </motion.div>

                    {/* Global UI Styles for Scrollbar */}
                    <style jsx global>{`
                        .scrollbar-hide::-webkit-scrollbar { display: none; }
                        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    )
}
