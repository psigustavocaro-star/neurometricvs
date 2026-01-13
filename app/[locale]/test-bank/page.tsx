'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Brain, Heart, Activity, Users, FileText, Clock, ChevronRight } from "lucide-react"
import { useTranslations } from 'next-intl'

const testCategories = [
    {
        id: 'depression',
        icon: Brain,
        color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
        tests: ['PHQ-9', 'Beck Depression Inventory', 'Hamilton Depression Scale']
    },
    {
        id: 'anxiety',
        icon: Activity,
        color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
        tests: ['GAD-7', 'Beck Anxiety Inventory', 'Hamilton Anxiety Scale']
    },
    {
        id: 'cognitive',
        icon: Brain,
        color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600',
        tests: ['MMSE', 'MoCA', 'ACE-III', 'Clock Drawing Test']
    },
    {
        id: 'attention',
        icon: Activity,
        color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
        tests: ['SNAP-IV', 'Conners', 'BRIEF']
    }
]

export default function TestBankPage() {
    const t = useTranslations('Tests')
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="container mx-auto py-8 px-4 max-w-6xl">
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
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        Banco de Tests Psicológicos
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Explora nuestra biblioteca completa de evaluaciones clínicas validadas científicamente.
                    </p>
                </div>

                {/* Search */}
                <div className="relative max-w-md mx-auto mb-10">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                        placeholder="Buscar tests por nombre, categoría..."
                        className="pl-10 h-12 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testCategories.map((category) => (
                        <Card key={category.id} className="hover:shadow-lg transition-all cursor-pointer group">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl ${category.color}`}>
                                        <category.icon className="w-5 h-5" />
                                    </div>
                                    <CardTitle className="text-lg capitalize">{category.id}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {category.tests.map((test, i) => (
                                        <Link
                                            key={i}
                                            href={`/dashboard/tests`}
                                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group/item"
                                        >
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{test}</span>
                                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-teal-500 group-hover/item:translate-x-0.5 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
