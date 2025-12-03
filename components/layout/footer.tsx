import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200 py-12 md:py-16 border-t border-slate-800">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png?v=2" alt="Neurometrics Logo" className="h-10 w-auto brightness-0 invert" />
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Transformando la evaluación psicológica con tecnología de vanguardia. Más de 10 años facilitando el trabajo clínico en Latinoamérica.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Producto</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/#features" className="hover:text-teal-400 transition-colors">Características</Link></li>
                            <li><Link href="/#pricing" className="hover:text-teal-400 transition-colors">Precios</Link></li>
                            <li><Link href="/#testimonials" className="hover:text-teal-400 transition-colors">Testimonios</Link></li>
                            <li><Link href="/integrations" className="hover:text-teal-400 transition-colors">Integraciones</Link></li>
                            <li><Link href="/updates" className="hover:text-teal-400 transition-colors">Actualizaciones</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Compañía</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-teal-400 transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/careers" className="hover:text-teal-400 transition-colors">Carreras</Link></li>
                            <li><Link href="/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contacto</Link></li>
                            <li><Link href="/press" className="hover:text-teal-400 transition-colors">Prensa</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Mantente informado</h3>
                        <p className="text-sm text-slate-400">
                            Suscríbete a nuestro boletín para recibir las últimas novedades en psicometría digital.
                        </p>
                        <div className="flex flex-col gap-2">
                            <Input
                                type="email"
                                placeholder="tu@email.com"
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-teal-500"
                            />
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full">
                                Suscribirse
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <p className="text-xs text-slate-500 text-center md:text-left">
                        © {new Date().getFullYear()} Neurometrics Inc. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 justify-center md:justify-end text-xs text-slate-500">
                        <Link href="/legal/privacy" className="hover:text-teal-400 transition-colors">Privacidad</Link>
                        <Link href="/legal/terms" className="hover:text-teal-400 transition-colors">Términos</Link>
                        <Link href="/legal/cookies" className="hover:text-teal-400 transition-colors">Cookies</Link>
                        <Link href="/legal/security" className="hover:text-teal-400 transition-colors">Seguridad</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
