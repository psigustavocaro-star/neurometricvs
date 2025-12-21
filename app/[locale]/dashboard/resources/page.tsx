import { ResourceGrid } from "@/components/resources/resource-grid"
import { BookOpen } from "lucide-react"

export default function ResourcesPage() {
    return (
        <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-8 h-8 text-teal-600" />
                    Biblioteca de Recursos
                </h1>
                <p className="text-slate-600 max-w-2xl">
                    Accede a nuestra colección curada de material psicoeducativo, ejercicios de estimulación y guías clínicas.
                    Descarga y comparte estos recursos con tus pacientes para enriquecer el proceso terapéutico.
                </p>
            </div>

            <ResourceGrid />
        </div>
    )
}
