
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
        <div className="flex flex-col min-h-screen bg-slate-50">
            <VerticalNavbar />
            <main className="flex-1">
                {/* Hero */}
                <section className="pt-32 pb-16 text-center px-4 bg-teal-900 text-white pattern-bg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{tPage('title')}</h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto">{tPage('subtitle')}</p>
                </section>

                <section className="py-20 container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {testimonials.map((testim, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                                <Quote className="h-8 w-8 text-teal-100 mb-6 group-hover:text-teal-500 transition-colors" />
                                <p className="text-slate-600 text-lg italic mb-8 leading-relaxed">
                                    "{testim.quote}"
                                </p>
                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-teal-200 transition-all">
                                        <img src={testim.image} alt={testim.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{testim.name}</h4>
                                        <p className="text-sm text-teal-600">{testim.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-white border-t border-slate-100 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{tPage('join_community')}</h3>
                    {/* Add CTA button if desired */}
                </section>
            </main>
            <Footer />
        </div>
    )
}
