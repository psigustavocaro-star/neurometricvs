'use client'

import { Resource } from "@/lib/resources"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ExternalLink, Image as ImageIcon, Video, File, AppWindow, PlayCircle } from "lucide-react"
import Link from "next/link"

interface ResourceCardProps {
    resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
    const getIcon = () => {
        switch (resource.type) {
            case 'pdf': return <FileText className="w-10 h-10 text-red-500" />
            case 'word': return <FileText className="w-10 h-10 text-blue-500" />
            case 'interactive': return <AppWindow className="w-10 h-10 text-teal-600" />
            case 'image': return <ImageIcon className="w-10 h-10 text-purple-500" />
            case 'video': return <Video className="w-10 h-10 text-pink-500" />
            default: return <File className="w-10 h-10 text-slate-400" />
        }
    }

    const getCategoryColor = () => {
        switch (resource.category) {
            case 'TCC': return 'bg-blue-100 text-blue-800'
            case 'Mindfulness': return 'bg-teal-100 text-teal-800'
            case 'Estimulación Cognitiva': return 'bg-purple-100 text-purple-800'
            case 'Guías Clínicas': return 'bg-orange-100 text-orange-800'
            default: return 'bg-slate-100 text-slate-800'
        }
    }

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-slate-200/60 bg-white/50 backdrop-blur-sm group">
            <CardHeader className="p-5 pb-0 flex-row justify-between items-start space-y-0">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                    {getIcon()}
                </div>
                <Badge variant="secondary" className={`${getCategoryColor()} hover:${getCategoryColor()} border-0`}>
                    {resource.type.toUpperCase()}
                </Badge>
            </CardHeader>
            <CardContent className="p-5 flex-1">
                <div className="mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getCategoryColor()} bg-opacity-50`}>
                        {resource.category}
                    </span>
                </div>
                <h3 className="font-bold text-slate-900 leading-tight mb-2 group-hover:text-teal-600 transition-colors">
                    {resource.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3">
                    {resource.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                    {resource.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-slate-400">#{tag}</span>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 mt-auto">
                {resource.type === 'interactive' ? (
                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm" size="sm">
                        <Link href={resource.url}>
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Abrir Herramienta
                        </Link>
                    </Button>
                ) : (
                    <Button asChild className="w-full bg-slate-900 hover:bg-teal-600 transition-colors shadow-sm" size="sm">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" download>
                            <Download className="w-4 h-4 mr-2" />
                            Descargar
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
