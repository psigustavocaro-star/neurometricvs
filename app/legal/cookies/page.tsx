import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"

export default function CookiesPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Política de Cookies</h1>
                    <div className="prose prose-slate max-w-none">
                        <p className="lead">Última actualización: Diciembre 2025</p>

                        <h3>1. ¿Qué son las cookies?</h3>
                        <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web.</p>

                        <h3>2. Cómo usamos las cookies</h3>
                        <p>Utilizamos cookies para:</p>
                        <ul>
                            <li>Mantener su sesión iniciada.</li>
                            <li>Recordar sus preferencias.</li>
                            <li>Analizar el uso de nuestro sitio para mejorarlo.</li>
                        </ul>

                        <h3>3. Tipos de cookies</h3>
                        <p><strong>Esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</p>
                        <p><strong>Analíticas:</strong> Nos ayudan a entender cómo los usuarios interactúan con la plataforma.</p>

                        <h3>4. Control de cookies</h3>
                        <p>Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, algunas funciones del servicio pueden no funcionar correctamente sin ellas.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
