import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"

export default function UpdatesPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Actualizaciones</h1>
                        <p className="text-xl text-slate-600">Novedades y mejoras de la plataforma.</p>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-8 relative border-l border-slate-200 ml-4 md:ml-auto pl-8">
                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-teal-500"></span>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-sm text-slate-500">Diciembre 2025</span>
                                <Badge variant="secondary" className="bg-teal-100 text-teal-800">Nuevo</Badge>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Lanzamiento de Neurometrics 2.0</h3>
                            <p className="mt-2 text-slate-600">
                                Lanzamos la nueva versión con interfaz rediseñada, soporte para múltiples dispositivos y nuevos tests cognitivos.
                            </p>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300"></span>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-sm text-slate-500">Noviembre 2025</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Integración con Stripe</h3>
                            <p className="mt-2 text-slate-600">
                                Ahora puedes gestionar tu suscripción de manera segura y automática con Stripe.
                            </p>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300"></span>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-sm text-slate-500">Octubre 2025</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Asistente IA Beta</h3>
                            <p className="mt-2 text-slate-600">
                                Introducimos nuestro asistente de inteligencia artificial para soporte técnico 24/7.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
