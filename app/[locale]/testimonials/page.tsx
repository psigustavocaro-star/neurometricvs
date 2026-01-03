
import { useTranslations } from "next-intl"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Quote } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export default function TestimonialsPage() {
    const tPage = useTranslations('TestimonialsPage')
    const tList = useTranslations('TestimonialsList')

    // Convert TestimonialsList object to array (assuming keys 0-5)
    // In next-intl we need to iterate carefully if raw returns object
    // Or just manually iterate 0 to 5
    const testimonials = [0, 1, 2, 3, 4, 5].map(i => ({
        name: tList(`${i}.name`),
        role: tList(`${i}.role`),
        quote: tList(`${i}.text`),
        image: tList(`${i}.img`)
    }))

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
            <VerticalNavbar />
            <main className="flex-1 relative overflow-hidden">
                {/* Background FX (Futuristic Light) */}
                <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/80 via-white to-white">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
                </div>

                {/* Hero */}
                <section className="pt-40 pb-20 text-center px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <ScrollAnimation animation="fade-up">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 mb-6 tracking-tight leading-tight">{tPage('title')}</h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">{tPage('subtitle')}</p>
                        </ScrollAnimation>
                    </div>
                </section>

                <section className="py-20 container px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {testimonials.map((testim, idx) => (
                            <div key={idx} className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl hover:shadow-teal-900/5 hover:border-teal-100 transition-all duration-300 hover:scale-[1.02] group">
                                <Quote className="h-8 w-8 text-teal-500/50 mb-6 group-hover:text-teal-600 transition-colors" />
                                <p className="text-slate-600 text-lg italic mb-8 leading-relaxed font-light">
                                    "{testim.quote}"
                                </p>
                                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-teal-200 transition-all">
                                        <img src={testim.image} alt={testim.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{testim.name}</h4>
                                        <p className="text-sm text-teal-600">{testim.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-white/50 border-t border-slate-200 text-center relative z-10">
                    <ScrollAnimation animation="fade-up">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">{tPage('join_community')}</h3>
                    </ScrollAnimation>
                </section>
            </main>
            <Footer />
        </div>
    )
}

