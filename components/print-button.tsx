'use client'

import React from 'react'
import { Printer } from 'lucide-react'

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar PDF</span>
        </button>
    )
}
