import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 mb-6">Contáctanos</h1>
                            <p className="text-xl text-slate-600 mb-8">
                                Estamos aquí para responder tus dudas sobre la plataforma, precios o soporte técnico.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Email</h3>
                                        <p className="text-slate-600">contacto@neurometrics.com</p>
                                        <p className="text-slate-600">soporte@neurometrics.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Teléfono</h3>
                                        <p className="text-slate-600">+56 2 2345 6789</p>
                                        <p className="text-sm text-slate-500">Lun-Vie, 9:00 - 18:00 CLT</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Oficina</h3>
                                        <p className="text-slate-600">Av. Providencia 1234, Of. 505</p>
                                        <p className="text-slate-600">Providencia, Santiago, Chile</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input id="name" placeholder="Tu nombre" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname">Apellido</Label>
                                        <Input id="lastname" placeholder="Tu apellido" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="tu@email.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Asunto</Label>
                                    <Input id="subject" placeholder="¿En qué podemos ayudarte?" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea id="message" placeholder="Escribe tu mensaje aquí..." className="min-h-[120px]" />
                                </div>
                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Enviar Mensaje</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
