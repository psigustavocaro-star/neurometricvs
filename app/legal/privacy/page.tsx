import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Política de Privacidad</h1>
                    <div className="prose prose-slate max-w-none">
                        <p className="lead">Última actualización: Diciembre 2025</p>

                        <h3>1. Introducción</h3>
                        <p>En Neurometrics, nos tomamos muy en serio la privacidad de sus datos y la de sus pacientes. Esta política describe cómo recopilamos, usamos y protegemos su información personal.</p>

                        <h3>2. Información que recopilamos</h3>
                        <p>Recopilamos información que usted nos proporciona directamente, como su nombre, correo electrónico, información profesional y datos de facturación. También procesamos datos de pacientes que usted ingresa en la plataforma, actuando como encargados del tratamiento de datos.</p>

                        <h3>3. Uso de la información</h3>
                        <p>Utilizamos la información para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones y comunicarnos con usted.</p>

                        <h3>4. Seguridad de los datos</h3>
                        <p>Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos, incluyendo encriptación en tránsito y en reposo.</p>

                        <h3>5. Sus derechos</h3>
                        <p>Usted tiene derecho a acceder, corregir o eliminar su información personal. Puede ejercer estos derechos contactándonos a través de nuestro soporte.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
