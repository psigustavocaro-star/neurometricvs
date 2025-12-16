import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Construction } from "lucide-react"

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 text-center">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 dark:border-slate-800">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Construction className="w-8 h-8 text-teal-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Próximamente</h1>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                    Estamos trabajando arduamente para traerte esta funcionalidad. ¡Vuelve pronto!
                </p>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                    <Link href="/">
                        Volver al Inicio
                    </Link>
                </Button>
            </div>
        </div>
    )
}
