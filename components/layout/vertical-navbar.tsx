'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Smartphone, MessageSquare, Shield, CreditCard, HelpCircle } from 'lucide-react'

const navItems = [
    { id: 'hero', label: 'Inicio', icon: Home },
    { id: 'mobile', label: 'Móvil', icon: Smartphone },
    { id: 'testimonials', label: 'Relatos', icon: MessageSquare },
    { id: 'trust', label: 'Confianza', icon: Shield },
    { id: 'pricing', label: 'Planes', icon: CreditCard },
    { id: 'faq', label: 'Ayuda', icon: HelpCircle },
]

export function VerticalNavbar() {
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
                    <div className={`absolute left-10 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-xl z-50`}>
                        {label}
                        {/* Arrow */}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
                    </div>

                    <button
                        onClick={() => scrollToSection(id)}
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeSection === id
                                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110'
                                : 'bg-white text-slate-400 hover:text-teal-600 hover:bg-teal-50 shadow-md hover:scale-105'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {activeSection === id && (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute -right-1 top-0 w-3 h-3 bg-teal-400 rounded-full border-2 border-white"
                            />
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}
