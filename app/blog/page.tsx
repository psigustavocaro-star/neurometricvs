import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog Neurometrics</h1>
                        <p className="text-xl text-slate-600">Artículos sobre psicometría, tecnología y salud mental.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Article 1 */}
                        <Link href="#" className="group">
                            <Card className="h-full hover:shadow-lg transition-shadow border-slate-200">
                                <div className="h-48 bg-slate-100 rounded-t-xl w-full object-cover relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-blue-500/20"></div>
                                </div>
                                <CardHeader>
                                    <div className="text-xs font-medium text-teal-600 mb-2">Tecnología</div>
                                    <CardTitle className="group-hover:text-teal-700 transition-colors">El futuro de la evaluación cognitiva digital</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-500 text-sm line-clamp-3">
                                        Cómo la inteligencia artificial y el big data están transformando la precisión de los diagnósticos psicológicos en el siglo XXI.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Article 2 */}
                        <Link href="#" className="group">
                            <Card className="h-full hover:shadow-lg transition-shadow border-slate-200">
                                <div className="h-48 bg-slate-100 rounded-t-xl w-full object-cover relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20"></div>
                                </div>
                                <CardHeader>
                                    <div className="text-xs font-medium text-purple-600 mb-2">Clínica</div>
                                    <CardTitle className="group-hover:text-purple-700 transition-colors">Interpretando el PHQ-9: Más allá del puntaje</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-500 text-sm line-clamp-3">
                                        Guía práctica para profesionales sobre cómo integrar los resultados del cuestionario de salud del paciente en la entrevista clínica.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Article 3 */}
                        <Link href="#" className="group">
                            <Card className="h-full hover:shadow-lg transition-shadow border-slate-200">
                                <div className="h-48 bg-slate-100 rounded-t-xl w-full object-cover relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-yellow-500/20"></div>
                                </div>
                                <CardHeader>
                                    <div className="text-xs font-medium text-orange-600 mb-2">Noticias</div>
                                    <CardTitle className="group-hover:text-orange-700 transition-colors">Neurometrics levanta capital semilla</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-500 text-sm line-clamp-3">
                                        Anunciamos nuestra nueva ronda de inversión para expandir nuestras operaciones a México y Colombia.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
