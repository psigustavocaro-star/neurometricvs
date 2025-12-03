import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CareersPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">Trabaja con Nosotros</h1>
                        <p className="text-xl text-slate-600">
                            Ayúdanos a construir el futuro de la psicometría digital.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-teal-200 transition-colors shadow-sm">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Full Stack Developer (Next.js)</h3>
                                <p className="text-slate-500 text-sm mt-1">Remoto • Tiempo Completo • Ingeniería</p>
                            </div>
                            <Button variant="outline" className="shrink-0">
                                Aplicar <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-teal-200 transition-colors shadow-sm">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Psicometrista Senior</h3>
                                <p className="text-slate-500 text-sm mt-1">Híbrido (Santiago) • Tiempo Completo • Investigación</p>
                            </div>
                            <Button variant="outline" className="shrink-0">
                                Aplicar <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-teal-200 transition-colors shadow-sm">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Customer Success Specialist</h3>
                                <p className="text-slate-500 text-sm mt-1">Remoto • Medio Tiempo • Soporte</p>
                            </div>
                            <Button variant="outline" className="shrink-0">
                                Aplicar <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-slate-600">¿No ves tu rol ideal? Envíanos tu CV a <a href="mailto:talento@neurometrics.com" className="text-teal-600 font-medium hover:underline">talento@neurometrics.com</a></p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
