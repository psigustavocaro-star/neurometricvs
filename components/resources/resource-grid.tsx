'use client'

import { useState } from "react"
import { Resource, resources } from "@/lib/resources"
import { ResourceCard } from "./resource-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResourceGrid() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const categories = Array.from(new Set(resources.map(r => r.category)))

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = selectedCategory ? resource.category === selectedCategory : true

        return matchesSearch && matchesCategory
    })

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                        placeholder="Buscar recursos..."
                        className="pl-9 bg-white/50 border-slate-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className={selectedCategory === null ? "bg-teal-600 hover:bg-teal-700" : ""}
                    >
                        Todos
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap ${selectedCategory === cat ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No se encontraron recursos que coincidan con tu búsqueda.
                </div>
            )}
        </div>
    )
}
