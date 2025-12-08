'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useTranslations } from "next-intl"

export function TestimonialsMarquee() {
    const t = useTranslations('TestimonialsList');
    const testimonialKeys = ['0', '1', '2', '3', '4', '5'] as const;
    const testimonials = testimonialKeys.map(key => ({
        name: t(`${key}.name`),
        role: t(`${key}.role`),
        text: t(`${key}.text`),
        img: t(`${key}.img`)
    }));

    return (
        <div className="w-full overflow-hidden relative">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-marquee-slow gap-8 py-4">
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

function TestimonialCard({ t }: { t: { name: string, role: string, text: string, img: string } }) {
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
