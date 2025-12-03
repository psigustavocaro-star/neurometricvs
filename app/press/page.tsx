import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function PressPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Prensa y Medios</h1>
                        <p className="text-xl text-slate-600">Recursos de marca y noticias sobre Neurometrics.</p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Brand Assets */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Recursos de Marca</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                                    <div className="h-20 w-full flex items-center justify-center bg-slate-900 rounded-lg mb-4">
                                        <img src="/logo.png?v=2" alt="Logo Blanco" className="h-8 brightness-0 invert" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Logo Principal (Negativo)</h3>
                                    <Button variant="outline" size="sm" className="mt-auto">
                                        <Download className="mr-2 h-4 w-4" /> Descargar PNG
                                    </Button>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                                    <div className="h-20 w-full flex items-center justify-center bg-white border border-slate-100 rounded-lg mb-4">
                                        <img src="/logo.png?v=2" alt="Logo Color" className="h-8" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Logo Principal (Color)</h3>
                                    <Button variant="outline" size="sm" className="mt-auto">
                                        <Download className="mr-2 h-4 w-4" /> Descargar PNG
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* Press Releases */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Comunicados de Prensa</h2>
                            <div className="space-y-4">
                                <div className="block p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                    <p className="text-sm text-slate-500 mb-1">15 de Diciembre, 2025</p>
                                    <h3 className="text-lg font-semibold text-teal-700">Neurometrics alcanza los 10,000 pacientes evaluados en Latinoamérica</h3>
                                </div>
                                <div className="block p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                    <p className="text-sm text-slate-500 mb-1">20 de Noviembre, 2025</p>
                                    <h3 className="text-lg font-semibold text-teal-700">Alianza estratégica con la Universidad de Chile para investigación psicométrica</h3>
                                </div>
                            </div>
                        </section>

                        <div className="bg-teal-50 p-8 rounded-2xl text-center">
                            <h3 className="text-xl font-bold text-teal-900 mb-2">¿Eres periodista?</h3>
                            <p className="text-teal-700 mb-4">Contáctanos para entrevistas o información adicional.</p>
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                                prensa@neurometrics.com
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
