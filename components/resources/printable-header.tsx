'use client'

import { Brain } from "lucide-react"

export function PrintableHeader() {
    return (
        <div className="hidden print:block mb-8 border-b-2 border-slate-200 pb-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-teal-600 rounded-lg">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 leading-none">Neurometrics</h1>
                        <p className="text-xs text-slate-500 mt-1">Herramientas Clínicas Profesionales</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-400">Generado por</div>
                    <div className="text-sm font-semibold text-slate-700">Neurometrics Platform</div>
                    <div className="text-xs text-slate-400">{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
            </div>

            <div className="mt-6 flex gap-4">
                <div className="flex-1">
                    <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Paciente</label>
                    <div className="h-8 border-b border-slate-300 border-dashed"></div>
                </div>
                <div className="w-32">
                    <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Fecha</label>
                    <div className="h-8 border-b border-slate-300 border-dashed"></div>
                </div>
            </div>
        </div>
    )
}
