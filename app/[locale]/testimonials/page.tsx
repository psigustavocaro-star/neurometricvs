
import { useTranslations } from "next-intl"
import { Footer } from "@/components/layout/footer"
import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Quote } from "lucide-react"

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
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">
            <VerticalNavbar />
            <main className="flex-1 relative overflow-hidden">
                {/* Background FX */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen" />
                </div>

                {/* Hero */}
                <section className="pt-40 pb-16 text-center px-4 relative z-10 border-b border-white/5">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white mb-6">{tPage('title')}</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">{tPage('subtitle')}</p>
                </section>

                <section className="py-20 container px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {testimonials.map((testim, idx) => (
                            <div key={idx} className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:shadow-xl hover:shadow-teal-900/10 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02] group">
                                <Quote className="h-8 w-8 text-teal-500/50 mb-6 group-hover:text-teal-400 transition-colors" />
                                <p className="text-slate-300 text-lg italic mb-8 leading-relaxed font-light">
                                    "{testim.quote}"
                                </p>
                                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-800 group-hover:ring-teal-500/50 transition-all">
                                        <img src={testim.image} alt={testim.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors">{testim.name}</h4>
                                        <p className="text-sm text-slate-500">{testim.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-slate-950 border-t border-white/5 text-center relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-8">{tPage('join_community')}</h3>
                    {/* Add CTA button if desired */}
                </section>
            </main>
            <Footer />
        </div>
    )
}
