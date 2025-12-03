import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">Sobre Nosotros</h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Somos un equipo de psicólogos, neurocientíficos e ingenieros dedicados a modernizar la salud mental en Latinoamérica.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-20">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Misión</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Democratizar el acceso a evaluaciones psicológicas de alta calidad, reduciendo la carga administrativa de los profesionales para que puedan enfocarse en lo que realmente importa: sus pacientes.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Creemos que la tecnología no debe reemplazar al clínico, sino potenciar sus capacidades con datos precisos y herramientas eficientes.
                            </p>
                        </div>
                        <div className="bg-slate-100 rounded-2xl h-64 w-full flex items-center justify-center">
                            <span className="text-slate-400 font-medium">Foto del Equipo</span>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Nuestros Valores</h2>
                        <div className="grid sm:grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl mb-2">🔬</div>
                                <h3 className="font-bold text-slate-900">Rigor Científico</h3>
                                <p className="text-sm text-slate-500 mt-2">Basamos nuestras herramientas en evidencia validada.</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">🔒</div>
                                <h3 className="font-bold text-slate-900">Privacidad Total</h3>
                                <p className="text-sm text-slate-500 mt-2">La confidencialidad del paciente es sagrada.</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-2">💡</div>
                                <h3 className="font-bold text-slate-900">Innovación Constante</h3>
                                <p className="text-sm text-slate-500 mt-2">Siempre buscando mejores formas de ayudar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
