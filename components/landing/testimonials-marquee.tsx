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
            {/* Gradient Masks for smooth fade edges - Adaptive Dark Mode */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent z-10 pointer-events-none"></div>

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
            <Card className="border-none shadow-lg bg-slate-50 dark:bg-slate-900/50 dark:border dark:border-slate-800 hover:shadow-xl transition-shadow h-full backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic relative flex-1 font-medium">
                        <Quote className="w-8 h-8 text-blue-100 dark:text-blue-900/30 absolute -top-4 -left-2 -z-10" />
                        "{t.text}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" />
                        <div>
                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{t.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
