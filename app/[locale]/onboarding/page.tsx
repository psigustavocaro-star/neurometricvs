import { Link } from '@/i18n/navigation'
import { Button } from "@/components/ui/button"
import { Construction, ArrowLeft } from 'lucide-react'

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
                <div className="mx-auto w-20 h-20 bg-teal-500/10 rounded-2xl flex items-center justify-center border border-teal-500/20 shadow-xl shadow-teal-500/5">
                    <Construction className="w-10 h-10 text-teal-500" />
                </div>

                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-800/50 text-teal-400 text-xs font-medium uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        Beta Cerrada
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Sitio en Construcción
                    </h1>

                    <p className="text-lg text-slate-400 leading-relaxed max-w-md mx-auto">
                        Estamos trabajando arduamente para preparar el lanzamiento oficial. El registro de nuevos usuarios está temporalmente deshabilitado.
                    </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button asChild variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white min-w-[160px]">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al Inicio
                        </Link>
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white min-w-[160px]" disabled>
                        Notificarme
                    </Button>
                </div>
            </div>
        </main>
    )
}
