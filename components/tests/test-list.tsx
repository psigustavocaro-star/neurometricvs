"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { FileText, ArrowRight, Star, Clock, Activity, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { mockTests } from "@/lib/data/mock-tests"

export function TestList() {
    const [searchTerm, setSearchTerm] = useState("")
    // Initialize with only favorite tests from the mock data
    const [tests, setTests] = useState(mockTests.filter(t => t.isFavorite))

    const filteredTests = tests.filter(test => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return true
        return (
            test.name.toLowerCase().includes(term) ||
            test.category.toLowerCase().includes(term)
        )
    })

    const removeFavorite = (id: string) => {
        setTests(tests.filter(t => t.id !== id))
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar test por nombre o categoría..."
                    className="w-full md:w-96"
                />
                <div className="text-sm text-slate-500 font-medium">
                    {filteredTests.length} {filteredTests.length === 1 ? 'test favorito' : 'tests favoritos'}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredTests.map((test) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            layout
                        >
                            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-teal-200 overflow-hidden relative h-full flex flex-col">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <CardHeader className="pb-3 relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-teal-50 text-teal-700 border-transparent">
                                            {test.category}
                                        </div>
                                        <button
                                            onClick={() => removeFavorite(test.id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                            title="Eliminar de favoritos"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors pr-8">
                                        {test.name}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 mt-1">
                                        {test.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col justify-end">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" /> {test.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Activity className="h-3.5 w-3.5" /> {test.questions} preguntas
                                        </div>
                                    </div>

                                    <Button className="w-full bg-slate-900 text-white hover:bg-teal-600 transition-all shadow-md hover:shadow-lg group/btn" asChild>
                                        <Link href={`/tests/${test.id}`}>
                                            Comenzar Test
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredTests.length === 0 && (
                    <div className="col-span-full text-center py-16">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No tienes tests favoritos</h3>
                        <p className="text-slate-500">Marca tests como favoritos en el catálogo para verlos aquí.</p>
                        <Button variant="link" asChild className="mt-2 text-teal-600">
                            <Link href="/dashboard/tests">Ir al catálogo</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
