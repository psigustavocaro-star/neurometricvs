'use client'

import { useState } from "react"
import { Resource, resources } from "@/lib/resources"
import { ResourceCard } from "./resource-card"
import { ResourceSidebar } from "./resource-sidebar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function ResourceGrid() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Extract unique categories, sorted
    const categories = Array.from(new Set(resources.map(r => r.category))).sort()

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = selectedCategory ? resource.category === selectedCategory : true

        return matchesSearch && matchesCategory
    })

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Sidebar */}
            <ResourceSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categories={categories}
            />

            {/* Main Content */}
            <div className="flex-1 w-full space-y-6">
                {/* Search Bar */}
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Buscar recursos por nombre, etiqueta o contenido..."
                        className="pl-11 h-12 bg-card border-border/60 shadow-sm rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>

                {filteredResources.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border border-dashed border-border">
                        <Search className="w-10 h-10 text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-medium text-foreground">No se encontraron recursos</h3>
                        <p className="text-muted-foreground max-w-sm mt-1">
                            Intenta ajustar tu búsqueda o seleccionar otra categoría.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
