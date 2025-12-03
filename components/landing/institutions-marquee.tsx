'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const institutions = [
    { name: "Universidad de Chile", logo: "/logos/uchile.jpg" },
    { name: "Pontificia Universidad Católica de Chile", logo: "/logos/puc.png" },
    { name: "Universidad Nacional Autónoma de México", logo: "/logos/unam-full.png" },
    { name: "Clínica Las Condes", logo: "/logos/clinica-las-condes-v2.png" },
    { name: "Clínica Barcelona", logo: "/logos/clinica-barcelona.png" },
    { name: "Universidad de Buenos Aires", logo: "/logos/uba.png" },
    { name: "Mayo Clinic", logo: "/logos/mayo-clinic.png" },
]

export function InstitutionsMarquee() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Change logo every 3 seconds to match a slow pace
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % institutions.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-24 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <InstitutionLogo item={institutions[currentIndex]} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function InstitutionLogo({ item }: { item: typeof institutions[0] }) {
    return (
        <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center">
                <img
                    src={item.logo}
                    alt={`Logo ${item.name}`}
                    className="max-h-full max-w-full object-contain"
                />
            </div>
            <span className="text-lg font-medium text-slate-700 whitespace-nowrap">
                {item.name}
            </span>
        </div>
    )
}
