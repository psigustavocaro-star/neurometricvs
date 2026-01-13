'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, FileText, Brain, Clipboard, Users, Calendar, ChevronRight, Sparkles } from "lucide-react"

const clinicalApps = [
    {
        id: 'calculators',
        title: 'Calculadoras Médicas',
        description: 'IMC, Glasgow, Barthel, dosis y más herramientas de cálculo clínico.',
        icon: Calculator,
        href: '/dashboard/calculators',
        color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600',
        badge: 'Popular'
    },
    {
        id: 'genogram',
        title: 'Generador de Genograma',
        description: 'Construye genogramas familiares de forma guiada e intuitiva.',
        icon: Users,
        href: '/genogram',
        color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
        badge: null
    },
    {
        id: 'tests',
        title: 'Tests Psicológicos',
        description: 'Aplica y corrige tests psicométricos con análisis automático.',
        icon: Clipboard,
        href: '/dashboard/tests',
        color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
        badge: 'Nuevo'
    },
    {
        id: 'reports',
        title: 'Generador de Informes',
        description: 'Crea informes clínicos profesionales con asistencia de IA.',
        icon: FileText,
        href: '/dashboard/my-tests',
        color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
        badge: 'IA'
    },
    {
        id: 'resources',
        title: 'Biblioteca de Recursos',
        description: 'Psicoeducación, guías clínicas y materiales para pacientes.',
        icon: Brain,
        href: '/dashboard/resources',
        color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600',
        badge: null
    }
]

export default function ClinicalAppsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="container mx-auto py-8 px-4 max-w-5xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="sm" asChild className="gap-2">
                        <Link href="/dashboard">
                            <ArrowLeft className="w-4 h-4" />
                            Volver al Dashboard
                        </Link>
                    </Button>
                </div>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        Clinical Toolkit
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        Aplicaciones Clínicas
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Herramientas diseñadas para optimizar tu práctica clínica diaria.
                    </p>
                </div>

                {/* Apps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {clinicalApps.map((app) => (
                        <Link key={app.id} href={app.href}>
                            <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 rounded-xl ${app.color}`}>
                                            <app.icon className="w-6 h-6" />
                                        </div>
                                        {app.badge && (
                                            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                                                {app.badge}
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
                                        {app.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {app.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center text-sm text-primary font-medium">
                                        Abrir
                                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
