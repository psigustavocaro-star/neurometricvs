'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Printer, RefreshCcw } from 'lucide-react'

export function CBTThoughtRecord() {
    const [data, setData] = useState({
        situation: '',
        emotions: '',
        emotionIntensity: [50],
        thoughts: '',
        evidenceFor: '',
        evidenceAgainst: '',
        alternativeThought: '',
        newEmotionIntensity: [50]
    })

    const handlePrint = () => {
        window.print()
    }

    const handleReset = () => {
        if (confirm('¿Estás seguro de querer borrar todo el contenido?')) {
            setData({
                situation: '',
                emotions: '',
                emotionIntensity: [50],
                thoughts: '',
                evidenceFor: '',
                evidenceAgainst: '',
                alternativeThought: '',
                newEmotionIntensity: [50]
            })
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center print:hidden border-b border-slate-100 pb-4">
                <div className="text-sm text-slate-500">
                    Completa los campos y usa el botón de imprimir para guardar como PDF.
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Limpiar
                    </Button>
                    <Button onClick={handlePrint} size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir / PDF
                    </Button>
                </div>
            </div>

            {/* Print Header */}
            <div className="hidden print:flex justify-between items-center mb-8 border-b-2 border-teal-600 pb-4">
                <div className="flex items-center gap-3">
                    {/* Logo Placeholder - In a real app use <Image /> */}
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-none">Neurometrics</h1>
                        <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mt-1">Herramientas Clínicas</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold text-slate-800">Registro de Pensamientos TCC</h2>
                    <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1 print:gap-6">
                {/* 1. Situation */}
                <section className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 print:bg-white print:border-slate-300 print:p-0 print:border-0">
                    <h3 className="font-bold text-teal-800 flex items-center gap-2">
                        <span className="bg-teal-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                        Situación
                    </h3>
                    <p className="text-xs text-slate-500 print:text-slate-600 italic">
                        ¿Qué pasó? ¿Dónde estabas? ¿Con quién? ¿Cuándo?
                    </p>
                    <Textarea
                        placeholder="Describe el evento desencadenante..."
                        className="min-h-[100px] bg-white print:border print:border-slate-300"
                        value={data.situation}
                        onChange={e => setData({ ...data, situation: e.target.value })}
                    />
                </section>

                {/* 2. Emotions */}
                <section className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 print:bg-white print:border-slate-300 print:p-0 print:border-0">
                    <h3 className="font-bold text-teal-800 flex items-center gap-2">
                        <span className="bg-teal-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                        Emociones
                    </h3>
                    <p className="text-xs text-slate-500 print:text-slate-600 italic">
                        ¿Qué sentiste? (Tristeza, ansiedad, enojo...) ¿Qué tan intenso (0-100)?
                    </p>
                    <Textarea
                        placeholder="Lista tus emociones..."
                        className="min-h-[60px] bg-white print:border print:border-slate-300"
                        value={data.emotions}
                        onChange={e => setData({ ...data, emotions: e.target.value })}
                    />
                    <div className="pt-2 print:hidden">
                        <Label>Intensidad: {data.emotionIntensity}%</Label>
                        <Slider
                            value={data.emotionIntensity}
                            onValueChange={v => setData({ ...data, emotionIntensity: v })}
                            max={100}
                            step={1}
                            className="mt-2"
                        />
                    </div>
                    <div className="hidden print:block text-sm border p-2 rounded border-slate-200">
                        Intensidad: {data.emotionIntensity}%
                    </div>
                </section>

                {/* 3. Automatic Thoughts */}
                <section className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2 print:bg-white print:border-slate-300 print:p-0 print:border-0 print:col-span-1">
                    <h3 className="font-bold text-teal-800 flex items-center gap-2">
                        <span className="bg-teal-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                        Pensamientos Automáticos
                    </h3>
                    <p className="text-xs text-slate-500 print:text-slate-600 italic">
                        ¿Qué pasó por tu mente justo antes de sentirte así? ¿Qué imágenes o recuerdos surgieron?
                    </p>
                    <Textarea
                        placeholder="Escribe tus pensamientos tal cual aparecieron..."
                        className="min-h-[100px] bg-white print:border print:border-slate-300"
                        value={data.thoughts}
                        onChange={e => setData({ ...data, thoughts: e.target.value })}
                    />
                </section>

                {/* 4. Evidence For */}
                <section className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 print:bg-white print:border-slate-300 print:p-0 print:border-0">
                    <h3 className="font-bold text-teal-800 flex items-center gap-2">
                        <span className="bg-teal-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                        Evidencia a Favor
                    </h3>
                    <p className="text-xs text-slate-500 print:text-slate-600 italic">
                        ¿Qué hechos demuestran que el pensamiento es 100% verdadero?
                    </p>
                    <Textarea
                        placeholder="Hechos, no interpretaciones..."
                        className="min-h-[120px] bg-white print:border print:border-slate-300"
                        value={data.evidenceFor}
                        onChange={e => setData({ ...data, evidenceFor: e.target.value })}
                    />
                </section>

                {/* 5. Evidence Against */}
                <section className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 print:bg-white print:border-slate-300 print:p-0 print:border-0">
                    <h3 className="font-bold text-teal-800 flex items-center gap-2">
                        <span className="bg-teal-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
                        Evidencia en Contra
                    </h3>
                    <p className="text-xs text-slate-500 print:text-slate-600 italic">
                        ¿Qué hechos contradicen este pensamiento? ¿Hay otra explicación?
                    </p>
                    <Textarea
                        placeholder="¿Qué le dirías a un amigo en esta situación?..."
                        className="min-h-[120px] bg-white print:border print:border-slate-300"
                        value={data.evidenceAgainst}
                        onChange={e => setData({ ...data, evidenceAgainst: e.target.value })}
                    />
                </section>

                {/* 6. Alternative Thought */}
                <section className="space-y-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 md:col-span-2 print:bg-white print:border-slate-300 print:p-0 print:border-0 print:col-span-1">
                    <h3 className="font-bold text-emerald-800 flex items-center gap-2">
                        <span className="bg-emerald-200 w-6 h-6 rounded-full flex items-center justify-center text-sm text-emerald-900">6</span>
                        Pensamiento Alternativo / Equilibrado
                    </h3>
                    <p className="text-xs text-emerald-600 print:text-slate-600 italic">
                        Considerando toda la evidencia, ¿cuál es una forma más realista de ver la situación?
                    </p>
                    <Textarea
                        placeholder="Escribe un pensamiento más balanceado..."
                        className="min-h-[100px] bg-white border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 print:border print:border-slate-300"
                        value={data.alternativeThought}
                        onChange={e => setData({ ...data, alternativeThought: e.target.value })}
                    />
                </section>

                {/* 7. Re-rating */}
                <section className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2 print:bg-white print:border-slate-300 print:p-0 print:border-0 print:col-span-1">
                    <h3 className="font-bold text-teal-800 flex items-center gap-2">
                        <span className="bg-teal-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">7</span>
                        Nueva Intensidad Emocional
                    </h3>
                    <p className="text-xs text-slate-500 print:text-slate-600 italic">
                        ¿Cómo te sientes ahora con respecto a la situación original? (0-100)
                    </p>
                    <div className="pt-2 print:hidden max-w-md">
                        <Label>Nueva Intensidad: {data.newEmotionIntensity}%</Label>
                        <Slider
                            value={data.newEmotionIntensity}
                            onValueChange={v => setData({ ...data, newEmotionIntensity: v })}
                            max={100}
                            step={1}
                            className="mt-2"
                        />
                    </div>
                    <div className="hidden print:block text-sm border p-2 rounded border-slate-200 w-full">
                        Nueva Intensidad: {data.newEmotionIntensity}%
                    </div>
                </section>
            </div>

            <div className="hidden print:block text-center text-[10px] text-slate-400 mt-8 pt-4 border-t border-slate-200">
                Generado por Neurometrics Workstation - Herramientas Clínicas Digitales
            </div>
        </div>
    )
}
