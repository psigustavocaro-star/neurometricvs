'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Smartphone, MessageSquare, Shield, CreditCard, HelpCircle } from 'lucide-react'

import { useTranslations } from "next-intl"

export function VerticalNavbar() {
    const t = useTranslations('VerticalNavbar');

    const navItems = [
        { id: 'hero', label: t('hero'), icon: Home },
        { id: 'mobile', label: t('mobile'), icon: Smartphone },
        { id: 'testimonials', label: t('testimonials'), icon: MessageSquare },
        { id: 'trust', label: t('trust'), icon: Shield },
        { id: 'pricing', label: t('pricing'), icon: CreditCard },
        { id: 'faq', label: t('faq'), icon: HelpCircle },
    ]
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 }
        )

        navItems.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
            {navItems.map(({ id, label, icon: Icon }) => (
                <div key={id} className="relative group flex items-center">
                    {/* Label Tooltip */}
                    <div className={`absolute left-10 px-3 py-1.5 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-xl backdrop-blur-md z-50`}>
                        {label}
                        {/* Arrow */}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-900/90 dark:border-r-white/90"></div>
                    </div>

                    <button
                        onClick={() => scrollToSection(id)}
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${activeSection === id
                            ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110'
                            : 'bg-white/10 dark:bg-slate-950/30 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-800 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 shadow-sm hover:scale-105'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {activeSection === id && (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute -right-1 top-0 w-3 h-3 bg-teal-400 rounded-full border-2 border-white dark:border-slate-950"
                            />
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}
