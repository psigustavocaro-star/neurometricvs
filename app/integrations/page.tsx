import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Puzzle, Calendar, MessageSquare, FileText } from "lucide-react"

export default function IntegrationsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Integraciones</h1>
                        <p className="text-xl text-slate-600">Conecta Neurometrics con tus herramientas favoritas.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                        <Card>
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle>Google Calendar</CardTitle>
                                <CardDescription>Sincroniza tus citas automáticamente.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-500">Próximamente podrás ver tus evaluaciones programadas directamente en tu calendario.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <MessageSquare className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle>WhatsApp Business</CardTitle>
                                <CardDescription>Envía recordatorios por WhatsApp.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-500">Automatiza el envío de enlaces de evaluación a través de WhatsApp.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-orange-600" />
                                </div>
                                <CardTitle>Dropbox / Drive</CardTitle>
                                <CardDescription>Respaldo de informes en la nube.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-500">Exporta automáticamente los PDFs firmados a tu carpeta personal en la nube.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
