'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { LayoutGrid, BookOpen, Brain, Activity, Heart, Sparkles, FileText, Smartphone, Video } from "lucide-react"

interface ResourceSidebarProps {
    selectedCategory: string | null
    onSelectCategory: (category: string | null) => void
    categories: string[]
}

export function ResourceSidebar({ selectedCategory, onSelectCategory, categories }: ResourceSidebarProps) {

    // Helper to get icon for category
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'TCC': return Brain
            case 'DBT': return Activity
            case 'Mindfulness': return Sparkles
            case 'Estimulación Cognitiva': return ZapIcon
            case 'Psicoeducación': return BookOpen
            case 'Guías Clínicas': return FileText
            default: return LayoutGrid
        }
    }

    // Custom Icon wrapper to avoid undefined errors if I miss one
    const ZapIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>

    return (
        <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 space-y-6">
            <div className="bg-card rounded-xl border-2 border-border shadow-md p-4">
                <h3 className="font-black text-foreground mb-4 px-2 text-base uppercase tracking-widest underline decoration-primary/30 decoration-2">Categorías</h3>
                <div className="space-y-1.5">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-3 relative overflow-hidden transition-all text-base",
                            selectedCategory === null
                                ? "bg-primary/20 text-primary hover:bg-primary/25 hover:text-primary font-black scale-[1.02]"
                                : "text-foreground font-bold hover:bg-muted"
                        )}
                        onClick={() => onSelectCategory(null)}
                    >
                        {selectedCategory === null && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-r-full" />
                        )}
                        <LayoutGrid className="w-5 h-5" />
                        Todas
                    </Button>

                    {categories.map(category => {
                        const Icon = getCategoryIcon(category)
                        return (
                            <Button
                                key={category}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 relative overflow-hidden transition-all text-base",
                                    selectedCategory === category
                                        ? "bg-primary/20 text-primary hover:bg-primary/25 hover:text-primary font-black scale-[1.02]"
                                        : "text-foreground font-bold hover:bg-muted"
                                )}
                                onClick={() => onSelectCategory(category)}
                            >
                                {selectedCategory === category && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-r-full" />
                                )}
                                <Icon className="w-5 h-5" />
                                {category}
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div className="bg-card rounded-xl border-2 border-border shadow-md p-4">
                <h3 className="font-black text-foreground mb-4 px-2 text-base uppercase tracking-widest underline decoration-primary/30 decoration-2">Tipos</h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                        <Smartphone className="w-5 h-5 text-teal-500 mb-2" />
                        <span className="text-xs font-medium text-center">Interactivo</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                        <FileText className="w-5 h-5 text-blue-500 mb-2" />
                        <span className="text-xs font-medium text-center">PDF</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                        <Video className="w-5 h-5 text-pink-500 mb-2" />
                        <span className="text-xs font-medium text-center">Video</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                        <BookOpen className="w-5 h-5 text-orange-500 mb-2" />
                        <span className="text-xs font-medium text-center">Lectura</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
