'use client'

import { Resource } from "@/lib/resources"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ExternalLink, Image as ImageIcon, Video, File, AppWindow, PlayCircle, BookOpen, Clock } from "lucide-react"
import Link from "next/link"

interface ResourceCardProps {
    resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
    const getIcon = () => {
        switch (resource.type) {
            case 'pdf': return <FileText className="w-8 h-8 text-blue-500" />
            case 'word': return <FileText className="w-8 h-8 text-indigo-500" />
            case 'interactive': return <AppWindow className="w-8 h-8 text-teal-600" />
            case 'image': return <ImageIcon className="w-8 h-8 text-purple-500" />
            case 'video': return <Video className="w-8 h-8 text-pink-500" />
            case 'link': return <ExternalLink className="w-8 h-8 text-orange-500" />
            default: return <File className="w-8 h-8 text-slate-400" />
        }
    }

    const getCategoryStyles = () => {
        switch (resource.category) {
            case 'TCC': return 'bg-blue-50 text-blue-700 border-blue-100'
            case 'Mindfulness': return 'bg-teal-50 text-teal-700 border-teal-100'
            case 'Estimulación Cognitiva': return 'bg-purple-50 text-purple-700 border-purple-100'
            case 'DBT': return 'bg-rose-50 text-rose-700 border-rose-100'
            default: return 'bg-slate-50 text-slate-700 border-slate-100'
        }
    }

    return (
        <Card className="flex flex-col h-full hover:shadow-lg hover:neon-glow transition-all duration-300 border-border/60 bg-card group overflow-hidden">
            <CardHeader className="p-5 flex-row justify-between items-start space-y-0">
                <div className="p-3 bg-muted/30 rounded-xl group-hover:bg-muted/60 transition-colors">
                    {getIcon()}
                </div>
                <Badge variant="outline" className={`font-medium neon-text ${getCategoryStyles()}`}>
                    {resource.type === 'interactive' ? 'App' : resource.type.toUpperCase()}
                </Badge>
            </CardHeader>

            <CardContent className="p-5 pt-0 flex-1">
                <div className="space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-foreground uppercase">
                        {resource.category}
                    </span>
                    <h3 className="font-black text-foreground leading-snug group-hover:text-primary transition-colors text-xl italic underline decoration-primary/20">
                        {resource.title}
                    </h3>
                    <p className="text-sm text-foreground line-clamp-3 leading-relaxed font-bold">
                        {resource.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                    {resource.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                            #{tag}
                        </span>
                    ))}
                    {resource.tags.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                            +{resource.tags.length - 3}
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 border-t border-border/40 bg-muted/5">
                {resource.type === 'interactive' ? (
                    <Button asChild className="w-full bg-primary hover:bg-primary/95 text-primary-foreground shadow-sm group/btn neon-glow" size="sm">
                        <Link href={resource.url}>
                            <PlayCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Usar Herramienta
                        </Link>
                    </Button>
                ) : (
                    <div className="flex w-full gap-2">
                        <Button asChild variant="outline" className="flex-1 border-border/60 hover:bg-muted hover:neon-glow transition-all" size="sm">
                            <Link href={`/dashboard/resources/${resource.id}`}>
                                <BookOpen className="w-4 h-4 mr-2" />
                                Ver
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" className="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground" size="sm">
                            <Link href={`/dashboard/resources/${resource.id}`}>
                                <Download className="w-4 h-4 mr-2" />
                                Descargar
                            </Link>
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
