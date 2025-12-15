'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Slide {
    image: string
    quote: string
    author: string
    role: string
    location: string
    alt: string
}

export function HeroCarousel() {
    const t = useTranslations('HeroCarousel')
    const tGeneral = useTranslations('General')
    const slides = t.raw('slides') as Slide[]

    const [currentSlide, setCurrentSlide] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return

        const timer = setInterval(() => {
            setDirection(1)
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)

        return () => clearInterval(timer)
    }, [isAutoPlaying, slides.length])

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

    const nextSlide = () => {
        setDirection(1)
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsAutoPlaying(false)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        setIsAutoPlaying(false)
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {/* Navigation Arrows - Left */}
            <button
                onClick={prevSlide}
                className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/50 text-slate-700 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Navigation Arrows - Right */}
            <button
                onClick={nextSlide}
                className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/50 text-slate-700 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="relative w-[320px] md:w-[380px] h-[500px] md:h-[580px]">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 200, damping: 25 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.5 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-slate-200/50 group bg-slate-900 ring-1 ring-white/20">
                            {/* Image with slight zoom effect on hover */}
                            {/* Image with slight zoom effect on hover */}
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].alt}
                                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                                loading="eager"
                            />

                            {/* Refined Gradient Overlay - Adaptive */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 dark:opacity-90 dark:from-[#0B1120] dark:via-slate-900/60 transition-all duration-500" />

                            {/* Content Card */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                    className="relative z-10"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="bg-teal-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-teal-900/20 border border-teal-400/30">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> {tGeneral('verificado')}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 bg-slate-900/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                            {slides[currentSlide].location}
                                        </span>
                                    </div>

                                    <div className="relative mb-6">
                                        <Quote className="absolute -top-3 -left-2 w-10 h-10 text-teal-400/20 rotate-180" />
                                        <p className="text-lg md:text-xl font-medium leading-relaxed font-serif text-slate-100 drop-shadow-sm relative z-10 pl-2">
                                            "{slides[currentSlide].quote}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white shadow-inner">
                                            {slides[currentSlide].author.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-base text-white tracking-tight">{slides[currentSlide].author}</span>
                                            <span className="text-sm text-teal-400 font-medium tracking-wide">{slides[currentSlide].role}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots (Optional, subtle) */}
            <div className="absolute -bottom-12 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentSlide ? 1 : -1)
                            setCurrentSlide(index)
                            setIsAutoPlaying(false)
                        }}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            index === currentSlide
                                ? "bg-teal-600 w-6"
                                : "bg-slate-300 hover:bg-teal-400"
                        )}
                        aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
