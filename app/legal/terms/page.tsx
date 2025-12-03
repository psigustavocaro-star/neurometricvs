import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Términos y Condiciones</h1>
                    <div className="prose prose-slate max-w-none">
                        <p className="lead">Última actualización: Diciembre 2025</p>

                        <h3>1. Aceptación de los términos</h3>
                        <p>Al acceder y utilizar Neurometrics, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo, no utilice nuestros servicios.</p>

                        <h3>2. Uso del servicio</h3>
                        <p>Usted se compromete a utilizar la plataforma únicamente con fines legales y profesionales. Es responsable de mantener la confidencialidad de su cuenta y contraseña.</p>

                        <h3>3. Propiedad intelectual</h3>
                        <p>Todo el contenido, software y tecnología de Neurometrics son propiedad exclusiva de nuestra empresa y están protegidos por leyes de propiedad intelectual.</p>

                        <h3>4. Limitación de responsabilidad</h3>
                        <p>Neurometrics proporciona la plataforma "tal cual". No garantizamos que el servicio sea ininterrumpido o libre de errores. No somos responsables de decisiones clínicas tomadas basándose en nuestros informes.</p>

                        <h3>5. Modificaciones</h3>
                        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos sobre cambios significativos.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
