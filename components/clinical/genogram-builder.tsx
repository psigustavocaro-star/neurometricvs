'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, ZoomIn, ZoomOut, Move, Info, X } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// Types
interface PersonNode {
    id: string
    name: string
    gender: 'male' | 'female' | 'other'
    age?: string
    x: number
    y: number
    deceased?: boolean
    conditions?: string[] // e.g. "depression", "alcoholism"
}

interface RelationshipEdge {
    id: string
    source: string
    target: string
    type: 'marriage' | 'divorce' | 'parent-child' | 'conflict' | 'close' | 'distant' | 'cutoff'
}

interface GenogramData {
    nodes: PersonNode[]
    edges: RelationshipEdge[]
}

interface GenogramProps {
    initialData?: GenogramData
    onSave?: (data: GenogramData) => void
    readOnly?: boolean
    embedded?: boolean // When true, renders without Card wrapper
}

export function GenogramBuilder({ initialData, onSave, readOnly = false, embedded = false }: GenogramProps) {
    const [nodes, setNodes] = useState<PersonNode[]>(initialData?.nodes || [
        { id: '1', name: 'Paciente', gender: 'male', x: 400, y: 300 } // Center start
    ])
    const [edges, setEdges] = useState<RelationshipEdge[]>(initialData?.edges || [])
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)
    const [showLegend, setShowLegend] = useState(false)

    // Dragging state
    const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null)
    const svgRef = useRef<SVGSVGElement>(null)

    // Handlers
    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        if (readOnly) return
        e.stopPropagation()
        setDraggingNodeId(id)
        setSelectedNodeId(id)
        setSelectedEdgeId(null)
    }

    const handleEdgeClick = (e: React.MouseEvent, id: string) => {
        if (readOnly) return
        e.stopPropagation()
        setSelectedEdgeId(id)
        setSelectedNodeId(null)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggingNodeId || readOnly) return

        if (svgRef.current) {
            const CTM = svgRef.current.getScreenCTM()
            if (CTM) {
                const x = (e.clientX - CTM.e) / CTM.a
                const y = (e.clientY - CTM.f) / CTM.d
                setNodes(nodes.map(n => n.id === draggingNodeId ? { ...n, x, y } : n))
            }
        }
    }

    const handleMouseUp = () => {
        setDraggingNodeId(null)
    }

    const addNode = (gender: 'male' | 'female' | 'other') => {
        const id = Math.random().toString(36).substr(2, 9)
        setNodes([...nodes, {
            id,
            name: 'Nuevo Familiar',
            gender,
            x: 400 + (Math.random() * 50),
            y: 300 + (Math.random() * 50)
        }])
    }

    const deleteSelected = () => {
        if (selectedNodeId) {
            setNodes(nodes.filter(n => n.id !== selectedNodeId))
            setEdges(edges.filter(e => e.source !== selectedNodeId && e.target !== selectedNodeId))
            setSelectedNodeId(null)
        } else if (selectedEdgeId) {
            setEdges(edges.filter(e => e.id !== selectedEdgeId))
            setSelectedEdgeId(null)
        }
    }

    const connectNodes = (targetId: string) => {
        if (!selectedNodeId || selectedNodeId === targetId) return

        // Check if edge exists
        const existing = edges.find(e =>
            (e.source === selectedNodeId && e.target === targetId) ||
            (e.source === targetId && e.target === selectedNodeId)
        )
        if (existing) return

        setEdges([...edges, {
            id: Math.random().toString(),
            source: selectedNodeId,
            target: targetId,
            type: 'parent-child' // Default
        }])
    }

    // Helper to calculate center point for divorce/cutoff markers
    const getMidPoint = (x1: number, y1: number, x2: number, y2: number) => {
        return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
    }

    // Rendering Helpers
    const renderNode = (node: PersonNode) => {
        const isSelected = selectedNodeId === node.id
        const strokeColor = isSelected ? "#0d9488" : "#334155 dark:stroke-slate-200"
        const strokeWidth = isSelected ? 3 : 2

        return (
            <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                className={readOnly ? '' : "cursor-pointer"}
                onClick={(e) => { e.stopPropagation(); !readOnly && setSelectedNodeId(node.id); setSelectedEdgeId(null); }}
            >
                {node.gender === 'male' && (
                    <rect x="-20" y="-20" width="40" height="40"
                        fill="white" className="dark:fill-slate-800" stroke={strokeColor} strokeWidth={strokeWidth}
                    />
                )}
                {node.gender === 'female' && (
                    <circle r="20"
                        fill="white" className="dark:fill-slate-800" stroke={strokeColor} strokeWidth={strokeWidth}
                    />
                )}
                {node.gender === 'other' && (
                    <polygon points="0,-25 20,0 0,25 -20,0"
                        fill="white" className="dark:fill-slate-800" stroke={strokeColor} strokeWidth={strokeWidth}
                    />
                )}

                {node.deceased && (
                    <>
                        <line x1="-20" y1="-20" x2="20" y2="20" stroke={strokeColor} strokeWidth="2" />
                        <line x1="20" y1="-20" x2="-20" y2="20" stroke={strokeColor} strokeWidth="2" />
                    </>
                )}

                <text y="45" textAnchor="middle" className="text-xs font-medium fill-slate-700 dark:fill-slate-300 select-none pointer-events-none">
                    {node.name}
                </text>
            </g>
        )
    }

    const renderEdge = (edge: RelationshipEdge) => {
        const source = nodes.find(n => n.id === edge.source)
        const target = nodes.find(n => n.id === edge.target)
        if (!source || !target) return null

        const isSelected = selectedEdgeId === edge.id
        const baseColor = isSelected ? "#0d9488" : "#94a3b8"

        // Relationship styles
        let strokeDasharray = ""
        let strokeWidth = "2"
        let lineColor = baseColor

        if (edge.type === 'distant') strokeDasharray = "5,5"
        if (edge.type === 'close') strokeWidth = "4" // We'll handle double line differently ideally, but thick is a proxy
        if (edge.type === 'conflict') lineColor = "#ef4444" // Red for conflict

        // SVG Path definition
        // For parent-child, we might want orthogonal lines, but direct is easier for draggable nodes

        // Midpoint specific logic for Divorce (//) and Cutoff (-|-)
        const mid = getMidPoint(source.x, source.y, target.x, target.y)

        return (
            <g key={edge.id} onClick={(e) => handleEdgeClick(e, edge.id)} className="cursor-pointer group">
                {/* Main Line */}
                {edge.type === 'conflict' ? (
                    // Zig Zag Approximation
                    <path
                        d={`M${source.x},${source.y} Q${(source.x + target.x) / 2 + 20},${(source.y + target.y) / 2} ${target.x},${target.y}`}
                        stroke={lineColor}
                        strokeWidth="2"
                        fill="none"
                        className={isSelected ? "stroke-teal-600" : ""}
                    />
                ) : edge.type === 'close' ? (
                    // Double Line proxy (thick + thin inside)
                    <>
                        <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke={lineColor} strokeWidth="6" opacity="0.3" />
                        <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke={lineColor} strokeWidth="2" />
                    </>
                ) : (
                    <line
                        x1={source.x} y1={source.y}
                        x2={target.x} y2={target.y}
                        stroke={lineColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                    />
                )}

                {/* Markers */}
                {edge.type === 'divorce' && (
                    <g transform={`translate(${mid.x},${mid.y})`}>
                        <line x1="-5" y1="-8" x2="-5" y2="8" stroke={lineColor} strokeWidth="2" transform="rotate(30)" />
                        <line x1="5" y1="-8" x2="5" y2="8" stroke={lineColor} strokeWidth="2" transform="rotate(30)" />
                    </g>
                )}

                {edge.type === 'cutoff' && (
                    <g transform={`translate(${mid.x},${mid.y})`}>
                        <line x1="0" y1="-10" x2="0" y2="10" stroke={lineColor} strokeWidth="2" transform="rotate(90)" />
                    </g>
                )}

                {/* Invisible wider line for easier clicking */}
                <line
                    x1={source.x} y1={source.y}
                    x2={target.x} y2={target.y}
                    stroke="transparent"
                    strokeWidth="15"
                />
            </g>
        )
    }

    // Save
    const handleSave = () => {
        if (onSave) onSave({ nodes, edges })
        toast.success("Genograma guardado")
    }

    // Connect mode handling (simplified: select 2 nodes sequentially or drag-connect in future)
    // For now, rely on toolbar "Connect to..." if we implement it, or just clicking.
    // Let's add a "Connect" mode button? Or simpler: Select Node -> Click another node with Shift?
    // Current implementation doesn't have easy connect UI. Let's add one in the editor panel.

    const genogramContent = (
        <>
            {/* Toolbar */}
            {embedded && !readOnly && (
                <div className="flex items-center justify-between px-3 py-2 border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => addNode('male')} className="h-7 text-xs px-2 dark:border-slate-600 dark:text-slate-300">
                            + H
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => addNode('female')} className="h-7 text-xs px-2 dark:border-slate-600 dark:text-slate-300">
                            + M
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => addNode('other')} className="h-7 text-xs px-2 dark:border-slate-600 dark:text-slate-300">
                            + O
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setShowLegend(!showLegend)} className={cn("h-7 px-2 text-xs", showLegend && "bg-slate-200 dark:bg-slate-700")}>
                            <Info className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-700" onClick={handleSave}>
                            <Save className="w-3 h-3 mr-1" /> Guardar
                        </Button>
                    </div>
                </div>
            )}

            <div className={`${embedded ? 'flex-1' : 'flex-1'} relative bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden`}>
                <svg
                    ref={svgRef}
                    className="w-full h-full"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onClick={() => { setSelectedNodeId(null); setSelectedEdgeId(null); }}
                    viewBox={`0 0 800 600`}
                >
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="28" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                        </marker>
                    </defs>
                    {edges.map(renderEdge)}
                    {nodes.map(renderNode)}
                </svg>

                {/* Legend Overlay */}
                {showLegend && (
                    <div className="absolute bottom-4 left-4 p-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur shadow-lg rounded-lg border text-xs max-w-[200px]">
                        <div className="flex justify-between items-center mb-2">
                            <h5 className="font-bold dark:text-white">Leyenda</h5>
                            <button onClick={() => setShowLegend(false)}><X className="w-3 h-3" /></button>
                        </div>
                        <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 border border-slate-500 bg-white" /> Hombre</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-slate-500 bg-white" /> Mujer</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rotate-45 border border-slate-500 bg-white" /> Otro</div>
                            <div className="flex items-center gap-2"><div className="w-8 h-px bg-slate-500" /> Relación</div>
                            <div className="flex items-center gap-2"><div className="w-8 h-px border-b-2 border-double border-slate-500" /> Cercana</div>
                            <div className="flex items-center gap-2"><div className="w-8 h-px border-b border-dashed border-slate-500" /> Distante</div>
                            <div className="flex items-center gap-2"><div className="w-8 h-px bg-red-400" /> Conflicto</div>
                            <div className="flex items-center gap-2"><div className="w-8 flex justify-center items-center text-slate-500 text-[10px]">//</div> Divorcio</div>
                        </div>
                    </div>
                )}

                {/* Editor Overlay for Selected Node */}
                {!readOnly && selectedNodeId && (
                    <div className="absolute top-4 right-4 w-60 bg-white dark:bg-slate-800 p-3 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700 animate-in slide-in-from-right-4">
                        <h4 className="font-semibold text-sm mb-2 dark:text-white">Editar Familiar</h4>
                        <div className="space-y-3">
                            <div>
                                <Label className="text-xs dark:text-slate-300">Nombre</Label>
                                <Input
                                    value={nodes.find(n => n.id === selectedNodeId)?.name || ''}
                                    onChange={(e) => setNodes(nodes.map(n => n.id === selectedNodeId ? { ...n, name: e.target.value } : n))}
                                    className="h-7 text-sm dark:bg-slate-900 dark:border-slate-600"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label className="text-xs dark:text-slate-300">Fallecido</Label>
                                <input
                                    type="checkbox"
                                    checked={nodes.find(n => n.id === selectedNodeId)?.deceased || false}
                                    onChange={(e) => setNodes(nodes.map(n => n.id === selectedNodeId ? { ...n, deceased: e.target.checked } : n))}
                                    className="accent-teal-600"
                                />
                            </div>

                            <div className="pt-2 border-t dark:border-slate-700">
                                <Label className="text-xs dark:text-slate-300 block mb-1">Conectar con...</Label>
                                <Select onValueChange={(val) => connectNodes(val)}>
                                    <SelectTrigger className="h-7 text-xs">
                                        <SelectValue placeholder="Seleccionar familiar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nodes.filter(n => n.id !== selectedNodeId).map(n => (
                                            <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button size="sm" variant="destructive" onClick={deleteSelected} className="w-full h-7 text-xs mt-2">
                                <Trash2 className="w-3 h-3 mr-1" /> Eliminar Nodo
                            </Button>
                        </div>
                    </div>
                )}

                {/* Editor Overlay for Selected Edge */}
                {!readOnly && selectedEdgeId && (
                    <div className="absolute top-4 right-4 w-60 bg-white dark:bg-slate-800 p-3 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700 animate-in slide-in-from-right-4">
                        <h4 className="font-semibold text-sm mb-2 dark:text-white">Editar Relación</h4>
                        <div className="space-y-3">
                            <div>
                                <Label className="text-xs dark:text-slate-300 block mb-1">Tipo de Relación</Label>
                                <Select
                                    value={edges.find(e => e.id === selectedEdgeId)?.type}
                                    onValueChange={(val: any) => setEdges(edges.map(e => e.id === selectedEdgeId ? { ...e, type: val } : e))}
                                >
                                    <SelectTrigger className="h-7 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="marriage">Matrimonio/Unión</SelectItem>
                                        <SelectItem value="parent-child">Padre-Hijo</SelectItem>
                                        <SelectItem value="divorce">Divorcio</SelectItem>
                                        <SelectItem value="close">Muy Cercana</SelectItem>
                                        <SelectItem value="distant">Distante</SelectItem>
                                        <SelectItem value="conflict">Conflictiva</SelectItem>
                                        <SelectItem value="cutoff">Rompimiento</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button size="sm" variant="destructive" onClick={deleteSelected} className="w-full h-7 text-xs mt-2">
                                <Trash2 className="w-3 h-3 mr-1" /> Eliminar Relación
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

    if (embedded) {
        return (
            <div className="h-full flex flex-col overflow-hidden">
                {genogramContent}
            </div>
        )
    }

    return (
        <Card className="h-full flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div>
                    <CardTitle className="text-base">Genograma Interactivo</CardTitle>
                    <CardDescription>Mapa de relaciones familiares estandarizado</CardDescription>
                </div>
                {!readOnly && (
                    <div className="flex gap-2">
                        {/* Standalone controls could go here */}
                    </div>
                )}
            </CardHeader>
            {genogramContent}
        </Card>
    )
}
