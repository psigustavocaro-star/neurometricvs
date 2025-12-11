'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateProfessionalReport } from '@/app/[locale]/patients/clinical-actions'
import { Loader2, FileText, Sparkles, Download, Copy } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DocumentsGeneratorProps {
    patientId: string
    patientName: string
}

export function DocumentsGenerator({ patientId, patientName }: DocumentsGeneratorProps) {
    const [loading, setLoading] = useState(false)
    const [generatedContent, setGeneratedContent] = useState('')

    // Form State
    const [docType, setDocType] = useState<'clinical_report' | 'certificate' | 'referral'>('clinical_report')
    const [tone, setTone] = useState<'technical' | 'accessible'>('technical')
    const [framework, setFramework] = useState('general')
    const [focus, setFocus] = useState('')

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const result = await generateProfessionalReport(patientId, docType, {
                tone,
                framework: framework as any,
                focus
            })
            setGeneratedContent(result.content)
            toast.success("Documento generado correctamente")
        } catch (error) {
            toast.error("Error al generar documento")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContent)
        toast.success("Copiado al portapapeles")
    }

    return (
        <div className="grid lg:grid-cols-[350px_1fr] gap-6 h-full">
            {/* Configuration Sidebar */}
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        Generador IA
                    </CardTitle>
                    <CardDescription>
                        Crea informes y documentos profesionales.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Tipo de Documento</Label>
                        <Select value={docType} onValueChange={(v: any) => setDocType(v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="clinical_report">Informe Clínico Extenso</SelectItem>
                                <SelectItem value="certificate">Certificado / Constancia</SelectItem>
                                <SelectItem value="referral">Interconsulta / Derivación</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {docType === 'clinical_report' && (
                        <>
                            <div className="space-y-2">
                                <Label>Tono de Redacción</Label>
                                <Select value={tone} onValueChange={(v: any) => setTone(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technical">Técnico / Especializado</SelectItem>
                                        <SelectItem value="accessible">Accesible / Para Paciente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Marco Teórico / Enfoque</Label>
                                <Select value={framework} onValueChange={setFramework}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">Integrativo / General</SelectItem>
                                        <SelectItem value="developmental">Psicología del Desarrollo</SelectItem>
                                        <SelectItem value="cbt">Cognitivo Conductual</SelectItem>
                                        <SelectItem value="psychoanalytic">Psicodinámico</SelectItem>
                                        <SelectItem value="systemic">Sistémico</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label>Foco o Instrucción Específica</Label>
                        <Textarea
                            placeholder={docType === 'certificate' ? "Ej: Certificar asistencia los lunes a las 17:00..." : "Ej: Enfocarse en avances en la regulación emocional..."}
                            value={focus}
                            onChange={(e) => setFocus(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    <Button onClick={handleGenerate} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Generar Documento
                    </Button>
                </CardContent>
            </Card>

            {/* Preview & Editor Area */}
            <Card className="flex flex-col h-full min-h-[500px]">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                        <CardTitle>Editor de Documento</CardTitle>
                        <CardDescription>Revisa y edita el contenido generado.</CardDescription>
                    </div>
                    {generatedContent && (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                <Copy className="w-4 h-4 mr-2" /> Copiar
                            </Button>
                            {/* Future: Print/PDF feature */}
                        </div>
                    )}
                </CardHeader>
                <div className="flex-1 p-0 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
                            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                            <p className="text-indigo-600 font-medium animate-pulse">Redactando documento profesional...</p>
                        </div>
                    ) : null}

                    <Textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        className="w-full h-full min-h-[500px] resize-none border-0 p-8 font-serif text-lg leading-relaxed focus-visible:ring-0 rounded-none shadow-none"
                        placeholder="El documento generado aparecerá aquí..."
                    />
                </div>
            </Card>
        </div>
    )
}
