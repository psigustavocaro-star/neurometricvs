import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { Mail } from "lucide-react"

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="relative py-16 md:py-20 z-10 w-full overflow-hidden bg-slate-950 border-t border-slate-800">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Column */}
                    <div className="space-y-5">
                        <img src="/logo.png?v=2" alt="Neurometrics Logo" className="h-10 w-auto brightness-0 invert opacity-90" />
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            {t('description')}
                        </p>
                        <div className="space-y-2 pt-2">
                            <a href="mailto:contacto@neurometricslatam.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors">
                                <Mail className="h-3.5 w-3.5" /> contacto@neurometricslatam.com
                            </a>
                            <a href="mailto:soporte@neurometricslatam.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors">
                                <Mail className="h-3.5 w-3.5" /> soporte@neurometricslatam.com
                            </a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="space-y-5">
                        <h3 className="text-xs font-semibold text-slate-300 tracking-widest uppercase">{t('product')}</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/#features" className="hover:text-teal-400 transition-colors">Características</Link></li>
                            <li><Link href="/#pricing" className="hover:text-teal-400 transition-colors">Precios</Link></li>
                            <li><Link href="/#testimonials" className="hover:text-teal-400 transition-colors">Testimonios</Link></li>
                            <li><Link href="/#faq" className="hover:text-teal-400 transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-5">
                        <h3 className="text-xs font-semibold text-slate-300 tracking-widest uppercase">{t('company')}</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-teal-400 transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contacto</Link></li>
                            <li><Link href="/press" className="hover:text-teal-400 transition-colors">Prensa</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-5">
                        <h3 className="text-xs font-semibold text-slate-300 tracking-widest uppercase">{t('legal')}</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/legal/privacy" className="hover:text-teal-400 transition-colors">Privacidad</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-teal-400 transition-colors">Términos de Servicio</Link></li>
                            <li><Link href="/legal/refund" className="hover:text-teal-400 transition-colors">Política de Reembolsos</Link></li>
                            <li><Link href="/legal/cookies" className="hover:text-teal-400 transition-colors">Cookies</Link></li>
                            <li><Link href="/legal/security" className="hover:text-teal-400 transition-colors">Seguridad</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row gap-3 items-center justify-between">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Neurometrics. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-slate-600">
                        Hecho para profesionales de la salud en Latinoamérica
                    </p>
                </div>
            </div>
        </footer>
    )
}
