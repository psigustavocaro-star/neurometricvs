import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { ShieldCheck, Lock, Server } from "lucide-react"

export default function SecurityPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Seguridad</h1>
                        <p className="text-xl text-slate-600">Cómo protegemos tus datos y los de tus pacientes.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Encriptación</h3>
                            <p className="text-sm text-slate-500">Datos encriptados en tránsito (TLS 1.2+) y en reposo (AES-256).</p>
                        </div>
                        <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Server className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Infraestructura</h3>
                            <p className="text-sm text-slate-500">Alojado en servidores seguros de AWS con certificaciones ISO 27001.</p>
                        </div>
                        <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Cumplimiento</h3>
                            <p className="text-sm text-slate-500">Diseñado siguiendo estándares HIPAA y GDPR.</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <h3>Acceso y Autenticación</h3>
                        <p>Utilizamos autenticación segura vía Supabase, con soporte para contraseñas robustas y, próximamente, autenticación de dos factores (2FA).</p>

                        <h3>Copias de Seguridad</h3>
                        <p>Realizamos copias de seguridad automáticas diarias de todas las bases de datos para prevenir pérdida de información.</p>

                        <h3>Reporte de Vulnerabilidades</h3>
                        <p>Si encuentras una vulnerabilidad de seguridad, por favor repórtala inmediatamente a security@neurometrics.com.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
