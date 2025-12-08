import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function PressPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Prensa y Medios</h1>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-teal-50 p-8 rounded-2xl text-center">
                            <h3 className="text-xl font-bold text-teal-900 mb-2">¿Eres periodista?</h3>
                            <p className="text-teal-700 mb-4">Contáctanos para entrevistas o información adicional.</p>
                            <a href="mailto:prensa@neurometrics.com">
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                                    prensa@neurometrics.com
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
