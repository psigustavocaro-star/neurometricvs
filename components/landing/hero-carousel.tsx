'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, CheckCircle2 } from 'lucide-react'

interface Slide {
    image: string
    quote: string
    author: string
    role: string
    location: string
    alt: string
}

const slides: Slide[] = [
    {
        image: "/assets/v2/male-1.png",
        quote: "Experiencia y tecnología van de la mano. Neurometrics ha transformado mi consulta.",
        author: "Dr. Ricardo Silva",
        role: "Psiquiatra Senior",
        location: "Chile 🇨🇱",
        alt: "Médico senior de confianza"
    },
    {
        image: "/assets/v2/female-1.png",
        quote: "Informes listos en segundos. Puedo dedicar más tiempo a la terapia real.",
        author: "Lic. Ana María López",
        role: "Psicóloga Clínica",
        location: "México 🇲🇽",
        alt: "Psicóloga profesional"
    },
    {
        image: "/assets/v2/female-2.png",
        quote: "La interfaz es intuitiva y mis pacientes agradecen la modernidad.",
        author: "Ps. Valentina Mendoza",
        role: "Neuropsicóloga",
        location: "Colombia 🇨🇴",
        alt: "Terapia online"
    },
    {
        image: "/assets/v2/male-2.png",
        quote: "Automatizar la corrección de tests me ha devuelto horas de vida cada semana.",
        author: "Dr. Alejandro Vega",
        role: "Neurólogo",
        location: "Argentina 🇦🇷",
        alt: "Neurólogo especialista"
    },
    {
        image: "/assets/v2/female-3.png",
        quote: "Esencial para el seguimiento de mis pacientes jóvenes. Muy fácil de usar para ellos.",
        author: "Dra. Carmen Rodríguez",
        role: "Psiquiatra Infantil",
        location: "Perú 🇵🇪",
        alt: "Psiquiatría infantil"
    },
    {
        image: "/assets/v2/male-3.png",
        quote: "La precisión en los reportes forenses que genera es impresionante.",
        author: "Lic. Diego Morales",
        role: "Psicólogo Forense",
        location: "España 🇪🇸",
        alt: "Psicología forense"
    }
]

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1)
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)

        return () => clearInterval(timer)
    }, [])

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            <div className="relative w-[350px] md:w-[400px] h-[550px] md:h-[600px]">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.4 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 group">
                            {/* Image */}
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].alt}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                            {/* Content Card */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative z-10"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Verificado
                                        </span>
                                        <span className="text-xs font-medium text-slate-300">{slides[currentSlide].location}</span>
                                    </div>

                                    <Quote className="w-8 h-8 text-teal-400 mb-2 opacity-80" />

                                    <p className="text-lg md:text-xl font-medium leading-snug mb-4 font-serif italic text-slate-100">
                                        "{slides[currentSlide].quote}"
                                    </p>

                                    <div className="flex flex-col">
                                        <span className="font-bold text-base">{slides[currentSlide].author}</span>
                                        <span className="text-sm text-teal-400 font-medium">{slides[currentSlide].role}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className="relative h-12 w-1 rounded-full bg-slate-200/30 overflow-hidden cursor-pointer transition-all hover:bg-slate-200/50"
                        onClick={() => {
                            setDirection(index > currentSlide ? 1 : -1)
                            setCurrentSlide(index)
                        }}
                    >
                        {index === currentSlide && (
                            <motion.div
                                layoutId="active-indicator"
                                className="absolute top-0 left-0 w-full bg-teal-500"
                                initial={{ height: "0%" }}
                                animate={{ height: "100%" }}
                                transition={{ duration: 6, ease: "linear" }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
