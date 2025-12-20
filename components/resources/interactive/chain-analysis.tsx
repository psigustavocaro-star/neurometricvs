'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Printer, RefreshCcw, ArrowDown } from 'lucide-react'

export function DBTChainAnalysis() {
    const [data, setData] = useState({
        vulnerabilities: '',
        trigger: '',
        links: '',
        problemBehavior: '',
        shortTermConsequences: '',
        longTermConsequences: '',
        skillfulAlternatives: '',
        preventionStrategy: '',
        repair: ''
    })

    const handlePrint = () => {
        window.print()
    }

    const handleReset = () => {
        if (confirm('¿Borrar todo el análisis?')) {
            setData({
                vulnerabilities: '',
                trigger: '',
                links: '',
                problemBehavior: '',
                shortTermConsequences: '',
                longTermConsequences: '',
                skillfulAlternatives: '',
                preventionStrategy: '',
                repair: ''
            })
        }
    }

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex justify-between items-center print:hidden border-b border-slate-100 pb-4">
                <div className="text-sm text-slate-500">
                    Análisis conductual paso a paso. Úsalo para entender y cambiar conductas.
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Limpiar
                    </Button>
                    <Button onClick={handlePrint} size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir
                    </Button>
                </div>
            </div>

            {/* Print Header */}
            <div className="hidden print:flex justify-between items-center mb-6 border-b-2 border-teal-600 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-none">Neurometrics</h1>
                        <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mt-1">DBT / Terapia Dialéctica</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold text-slate-800">Análisis en Cadena</h2>
                    <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <div className="space-y-6 print:space-y-4">

                {/* 1. Problem Behavior */}
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl print:bg-white print:border-slate-800 print:border-2">
                    <h3 className="font-bold text-red-900 mb-2">1. Conducta Problema</h3>
                    <p className="text-xs text-slate-600 mb-2 italic">¿Qué hiciste exactamente? Sé específico y sin juicios.</p>
                    <Textarea
                        className="bg-white min-h-[60px]"
                        placeholder="Ej. Grité a mi pareja y tiré el teléfono..."
                        value={data.problemBehavior}
                        onChange={e => setData({ ...data, problemBehavior: e.target.value })}
                    />
                </div>

                <div className="flex justify-center text-slate-300 print:text-slate-800"><ArrowDown /></div>

                {/* 2. Vulnerabilities */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl print:bg-white print:border-slate-300 print:border">
                    <h3 className="font-bold text-slate-800 mb-2">2. Factores de Vulnerabilidad</h3>
                    <p className="text-xs text-slate-600 mb-2 italic">¿Qué te hizo más sensible ese día? (Hambre, sueño, estrés, dolor, enfermedad...)</p>
                    <Textarea
                        className="bg-white min-h-[60px]"
                        value={data.vulnerabilities}
                        onChange={e => setData({ ...data, vulnerabilities: e.target.value })}
                    />
                </div>

                <div className="flex justify-center text-slate-300 print:text-slate-800"><ArrowDown /></div>

                {/* 3. Triggering Event */}
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl print:bg-white print:border-slate-300 print:border">
                    <h3 className="font-bold text-orange-900 mb-2">3. Evento Desencadenante</h3>
                    <p className="text-xs text-slate-600 mb-2 italic">¿Qué pasó justo antes de que empezara la cadena? (Un comentario, una noticia, un pensamiento...)</p>
                    <Textarea
                        className="bg-white min-h-[60px]"
                        value={data.trigger}
                        onChange={e => setData({ ...data, trigger: e.target.value })}
                    />
                </div>

                <div className="flex justify-center text-slate-300 print:text-slate-800"><ArrowDown /></div>

                {/* 4. Links in the Chain */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl print:bg-white print:border-slate-300 print:border">
                    <h3 className="font-bold text-slate-800 mb-2">4. Eslabones de la Cadena (A - B - C)</h3>
                    <p className="text-xs text-slate-600 mb-2 italic">Describe paso a paso. Pensamiento → Emoción → Sensación Física → Acción → Nuevo Pensamiento...</p>
                    <Textarea
                        className="bg-white min-h-[150px]"
                        placeholder="1. Pensé que no le importaba... &#10;2. Sentí rabia en el pecho... &#10;3. Apreté los puños..."
                        value={data.links}
                        onChange={e => setData({ ...data, links: e.target.value })}
                    />
                </div>

                <div className="flex justify-center text-slate-300 print:text-slate-800"><ArrowDown /></div>

                {/* 5. Consequences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl print:bg-white print:border-slate-300 print:border">
                        <h3 className="font-bold text-slate-800 mb-2">5a. Consecuencias a Corto Plazo</h3>
                        <p className="text-xs text-slate-600 mb-2 italic">¿Qué pasó inmediatamente después? (Alivio, culpa...)</p>
                        <Textarea
                            className="bg-white min-h-[80px]"
                            value={data.shortTermConsequences}
                            onChange={e => setData({ ...data, shortTermConsequences: e.target.value })}
                        />
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl print:bg-white print:border-slate-300 print:border">
                        <h3 className="font-bold text-slate-800 mb-2">5b. Consecuencias a Largo Plazo</h3>
                        <p className="text-xs text-slate-600 mb-2 italic">¿Cómo afecta esto tu futuro o tus relaciones?</p>
                        <Textarea
                            className="bg-white min-h-[80px]"
                            value={data.longTermConsequences}
                            onChange={e => setData({ ...data, longTermConsequences: e.target.value })}
                        />
                    </div>
                </div>

                {/* 6. Solutions Analysis - Only show if not printing or separate page */}
                <div className="mt-8 border-t-2 border-slate-200 pt-6 print:break-before-page">
                    <h2 className="text-xl font-bold text-teal-800 mb-4">Análisis de Soluciones</h2>

                    <div className="space-y-4">
                        <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl print:bg-white print:border-teal-800 print:border-2">
                            <h3 className="font-bold text-teal-900 mb-2">Conductas Hábiles Alternativas</h3>
                            <p className="text-xs text-slate-600 mb-2 italic">¿Qué podrías haber hecho diferente en los eslabones clave para romper la cadena?</p>
                            <Textarea
                                className="bg-white min-h-[80px]"
                                placeholder="Pude haber usado STOP cuando sentí rabia..."
                                value={data.skillfulAlternatives}
                                onChange={e => setData({ ...data, skillfulAlternatives: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl print:bg-white print:border-slate-300 print:border">
                                <h3 className="font-bold text-blue-900 mb-2">Estrategia de Prevención</h3>
                                <p className="text-xs text-slate-600 mb-2 italic">¿Cómo puedes reducir tus vulnerabilidades para la próxima vez?</p>
                                <Textarea
                                    className="bg-white min-h-[80px]"
                                    value={data.preventionStrategy}
                                    onChange={e => setData({ ...data, preventionStrategy: e.target.value })}
                                />
                            </div>
                            <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl print:bg-white print:border-slate-300 print:border">
                                <h3 className="font-bold text-purple-900 mb-2">Reparación</h3>
                                <p className="text-xs text-slate-600 mb-2 italic">¿Qué puedes hacer para corregir el daño causado?</p>
                                <Textarea
                                    className="bg-white min-h-[80px]"
                                    value={data.repair}
                                    onChange={e => setData({ ...data, repair: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="hidden print:block text-center text-[10px] text-slate-400 mt-8 pt-4 border-t border-slate-200">
                Generado por Neurometrics Workstation - Herramientas Clínicas Digitales
            </div>
        </div>
    )
}
