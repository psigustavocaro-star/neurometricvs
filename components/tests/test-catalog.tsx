"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { Badge } from "@/components/ui/badge"

import { FileText, ArrowRight, Star, Clock, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { testsCatalog as mockTests, Test } from "@/lib/data/tests-catalog"
import { cn } from "@/lib/utils"

import { PatientSelectorDialog } from "@/components/tests/patient-selector-dialog"

export function TestCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")
    const [activeAge, setActiveAge] = useState("all")
    const [tests, setTests] = useState(mockTests)
    const [selectedTestForStart, setSelectedTestForStart] = useState<Test | null>(null)

    // Extract unique categories and age ranges (simplified for now)
    const categories = ["all", ...Array.from(new Set(mockTests.map(t => t.category)))]
    const ageRanges = ["all", "Infantil (0-12)", "Adolescentes (12-18)", "Adultos (18+)", "Adulto Mayor (65+)"]

    const filteredTests = tests.filter(test => {
        const matchesSearch = (
            test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        const matchesCategory = activeCategory === "all" || test.category === activeCategory

        let matchesAge = true
        if (activeAge !== "all") {
            if (activeAge === "Infantil (0-12)") matchesAge = test.ageRange.includes("meses") || test.ageRange.includes("4-11") || test.ageRange.includes("6-12") || test.ageRange.includes("6-18")
            if (activeAge === "Adolescentes (12-18)") matchesAge = test.ageRange.includes("12-18") || test.ageRange.includes("12-21") || test.ageRange.includes("8-18") || test.ageRange.includes("6-18")
            if (activeAge === "Adultos (18+)") matchesAge = test.ageRange.includes("18+") || test.ageRange.includes("Adultos")
            if (activeAge === "Adulto Mayor (65+)") matchesAge = test.ageRange.includes("65+") || test.ageRange.includes("Adulto Mayor") || test.ageRange.includes("Demencia")
        }

        return matchesSearch && matchesCategory && matchesAge
    })

    const toggleFavorite = (id: string) => {
        setTests(tests.map(t => t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Buscar test por nombre, categoría o descripción..."
                        className="w-full md:w-96"
                    />
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {filteredTests.length} {filteredTests.length === 1 ? 'test encontrado' : 'tests encontrados'}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-72">
                        <select
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-colors hover:border-teal-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                            <option value="all">Todas las categorías</option>
                            {categories
                                .filter(c => c !== 'all')
                                .sort((a, b) => a.localeCompare(b))
                                .map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative w-full md:w-72">
                        <select
                            value={activeAge}
                            onChange={(e) => setActiveAge(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-colors hover:border-teal-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                            <option value="all">Todas las edades</option>
                            {ageRanges
                                .filter(a => a !== 'all')
                                .map(age => (
                                    <option key={age} value={age}>
                                        {age}
                                    </option>
                                ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTests.map((test) => (
                    <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                    >
                        <Card className="group hover:shadow-xl transition-all duration-300 border-border/60 dark:bg-slate-900/50 hover:border-teal-500/50 overflow-hidden relative h-full flex flex-col ring-1 ring-black/[0.02] dark:ring-white/[0.02]">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <CardHeader className="pb-3 pt-6">
                                <div className="flex flex-wrap gap-1.5 mb-3 pr-8">
                                    <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 text-[9px] font-bold uppercase tracking-wider px-2 py-0">
                                        {test.category}
                                    </Badge>
                                    <Badge variant="outline" className="text-[9px] font-bold border-border/60 text-muted-foreground uppercase tracking-wider px-2 py-0">
                                        {test.ageRange}
                                    </Badge>
                                </div>

                                <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight">
                                    <Link href={`/dashboard/tests/${test.id}`} className="hover:underline decoration-primary/30 underline-offset-4">
                                        {test.name}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="text-xs line-clamp-2 mt-2 leading-relaxed text-muted-foreground/80 font-medium italic">
                                    {test.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col justify-end pt-2 pb-5">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground mb-4 bg-muted/30 p-2.5 rounded-xl border border-border/40">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3 w-3 opacity-60" /> {test.duration}
                                    </div>
                                    <div className="w-px h-3 bg-border/60" />
                                    <div className="flex items-center gap-1.5">
                                        <Activity className="h-3 w-3 opacity-60" /> {test.questions} items
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-md group/btn h-10 rounded-xl"
                                    onClick={() => setSelectedTestForStart(test)}
                                >
                                    <span className="text-xs font-bold uppercase tracking-[0.1em]">Iniciar Protocolo</span>
                                    <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {filteredTests.length === 0 && (
                    <div className="col-span-full text-center py-16">
                        <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No se encontraron tests</h3>
                        <p className="text-slate-500">Intenta ajustar tus filtros de búsqueda.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                            className="mt-2 text-teal-600"
                        >
                            Limpiar filtros
                        </Button>
                    </div>
                )}
            </div>

            <PatientSelectorDialog
                open={!!selectedTestForStart}
                onOpenChange={(open) => !open && setSelectedTestForStart(null)}
                testId={selectedTestForStart?.id || ""}
                testName={selectedTestForStart?.name || ""}
            />
        </div >
    )
}
