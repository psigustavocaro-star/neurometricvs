'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Lic. Sofía Martínez",
        role: "Psicóloga Clínica",
        text: "Antes tardaba horas tabulando el PHQ-9 y otros tests. Ahora es instantáneo. Mis informes se ven mucho más profesionales.",
        img: "/assets/v2/female-1.png"
    },
    {
        name: "Dr. Carlos Ruiz",
        role: "Neuropsicólogo",
        text: "La funcionalidad de historial de pacientes es clave para ver la evolución del tratamiento. Muy recomendado.",
        img: "/assets/v2/male-1.png"
    },
    {
        name: "Ps. Laura Gómez",
        role: "Terapeuta Familiar",
        text: "Me encanta que pueda personalizar mi firma y logo. Mis pacientes reciben sus resultados automáticamente por correo.",
        img: "/assets/v2/female-2.png"
    },
    {
        name: "Dr. Roberto Fernández",
        role: "Psiquiatra",
        text: "La interfaz es limpia y fácil de usar. Mis pacientes mayores no tienen problemas para completar los tests en sus tablets.",
        img: "/assets/v2/male-2.png"
    },
    {
        name: "Lic. Andrea Torres",
        role: "Psicóloga Infantil",
        text: "El soporte técnico es excelente. Tuvimos una duda con la configuración y nos ayudaron en minutos. ¡Gracias Neurometrics!",
        img: "/assets/v2/female-3.png"
    },
    {
        name: "Ps. Javier Méndez",
        role: "Psicólogo Organizacional",
        text: "Ideal para evaluaciones masivas en empresas. He reducido mi tiempo de entrega de informes en un 50%.",
        img: "/assets/v2/male-3.png"
    }
]

export function TestimonialsMarquee() {
    return (
        <div className="w-full overflow-hidden relative">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-marquee gap-8 py-4">
                {/* Original Set */}
                {testimonials.map((t, i) => (
                    <TestimonialCard key={`original-${i}`} t={t} />
                ))}
                {/* Duplicate Set for infinite loop */}
                {testimonials.map((t, i) => (
                    <TestimonialCard key={`duplicate-${i}`} t={t} />
                ))}
            </div>
        </div>
    )
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
    return (
        <div className="w-[350px] md:w-[400px] flex-shrink-0">
            <Card className="border-none shadow-lg bg-slate-50 hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-slate-600 italic relative flex-1">
                        <Quote className="w-8 h-8 text-blue-100 absolute -top-4 -left-2 -z-10" />
                        "{t.text}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-4">
                        <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-sm text-slate-900">{t.name}</p>
                            <p className="text-xs text-slate-500">{t.role}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
