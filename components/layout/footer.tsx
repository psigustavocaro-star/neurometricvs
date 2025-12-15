import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="relative py-16 md:py-24 z-10 w-full overflow-hidden">
            {/* Extended Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#020617] border-t-4 border-teal-900/50 shadow-2xl pointer-events-none">
                {/* Top Glow Accent within background */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50"></div>
            </div>

            <div className="container px-4 md:px-6 lg:pl-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png?v=2" alt="Neurometrics Logo" className="h-11 w-auto brightness-0 invert opacity-90" />
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            {t('description')}
                        </p>
                        <div className="flex gap-4 pt-2">
                            {/* Social Links remain unchanged */}
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

                        {/* Professional Emails */}
                        <div className="pt-4 space-y-2 border-t border-slate-800 mt-4">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Canales de Atención</h4>
                            <a href="mailto:contacto@neurometricslatam.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors">
                                <Mail className="h-3 w-3" /> contacto@neurometricslatam.com
                            </a>
                            <a href="mailto:soporte@neurometricslatam.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors">
                                <Mail className="h-3 w-3" /> soporte@neurometricslatam.com
                            </a>
                            <a href="mailto:pagos@neurometricslatam.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors">
                                <Mail className="h-3 w-3" /> pagos@neurometricslatam.com
                            </a>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                Envíos automáticos desde: notificaciones@
                            </div>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase">{t('product')}</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/#features" className="hover:text-teal-400 transition-colors">Características</Link></li>
                            <li><Link href="/#pricing" className="hover:text-teal-400 transition-colors">Precios</Link></li>
                            <li><Link href="/#testimonials" className="hover:text-teal-400 transition-colors">Testimonios</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase">{t('company')}</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-teal-400 transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contacto</Link></li>
                            <li><Link href="/press" className="hover:text-teal-400 transition-colors">Prensa</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase">{t('newsletter')}</h3>
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
                                {t('subscribe')}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <p className="text-xs text-slate-500 text-center md:text-left">
                        © {new Date().getFullYear()} Neurometrics Inc. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 justify-center md:justify-end text-xs text-slate-500 dark:text-slate-500">
                        <Link href="/legal/privacy" className="hover:text-teal-400 transition-colors">Privacidad</Link>
                        <Link href="/legal/terms" className="hover:text-teal-400 transition-colors">Términos</Link>
                        <Link href="/legal/refund" className="hover:text-teal-400 transition-colors">Reembolsos</Link>
                        <Link href="/legal/cookies" className="hover:text-teal-400 transition-colors">Cookies</Link>
                        <Link href="/legal/security" className="hover:text-teal-400 transition-colors">{t('legal')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
