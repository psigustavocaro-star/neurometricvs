'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, ZoomIn, ZoomOut, Move } from 'lucide-react'
import { toast } from 'sonner'

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
    type: 'marriage' | 'divorce' | 'parent-child' | 'conflict' | 'close'
}

interface GenogramData {
    nodes: PersonNode[]
    edges: RelationshipEdge[]
}

interface GenogramProps {
    initialData?: GenogramData
    onSave?: (data: GenogramData) => void
    readOnly?: boolean
}

export function GenogramBuilder({ initialData, onSave, readOnly = false }: GenogramProps) {
    const [nodes, setNodes] = useState<PersonNode[]>(initialData?.nodes || [
        { id: '1', name: 'Paciente', gender: 'male', x: 400, y: 300 } // Center start
    ])
    const [edges, setEdges] = useState<RelationshipEdge[]>(initialData?.edges || [])
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
    const [scale, setScale] = useState(1)

    // Dragging state
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const svgRef = useRef<SVGSVGElement>(null)

    // Handlers
    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        if (readOnly) return
        e.stopPropagation()
        const node = nodes.find(n => n.id === id)
        if (node) {
            setDraggingId(id)
            setSelectedNodeId(id)
            // Calculate offset logic if needed, simple drag for now
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggingId || readOnly) return

        // Simple SVG coord calculation
        if (svgRef.current) {
            const CTM = svgRef.current.getScreenCTM()
            if (CTM) {
                const x = (e.clientX - CTM.e) / CTM.a
                const y = (e.clientY - CTM.f) / CTM.d
                setNodes(nodes.map(n => n.id === draggingId ? { ...n, x, y } : n))
            }
        }
    }

    const handleMouseUp = () => {
        setDraggingId(null)
    }

    const addNode = (gender: 'male' | 'female') => {
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
        if (!selectedNodeId) return
        setNodes(nodes.filter(n => n.id !== selectedNodeId))
        setEdges(edges.filter(e => e.source !== selectedNodeId && e.target !== selectedNodeId))
        setSelectedNodeId(null)
    }

    const connectNodes = (targetId: string) => {
        if (!selectedNodeId || selectedNodeId === targetId) return

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

    // Rendering Helpers
    const renderNode = (node: PersonNode) => {
        const isSelected = selectedNodeId === node.id
        return (
            <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                className={readOnly ? '' : "cursor-pointer"}
                onClick={() => !readOnly && setSelectedNodeId(node.id)}
            >
                {node.gender === 'male' ? (
                    <rect x="-20" y="-20" width="40" height="40"
                        fill="white" stroke={isSelected ? "#0d9488" : "#334155"} strokeWidth={isSelected ? 3 : 2}
                    />
                ) : (
                    <circle r="20"
                        fill="white" stroke={isSelected ? "#0d9488" : "#334155"} strokeWidth={isSelected ? 3 : 2}
                    />
                )}
                {node.deceased && (
                    <line x1="-20" y1="-20" x2="20" y2="20" stroke="#334155" strokeWidth="2" />
                )}
                {node.deceased && node.gender === 'male' && (
                    <line x1="20" y1="-20" x2="-20" y2="20" stroke="#334155" strokeWidth="2" />
                )}

                <text y="40" textAnchor="middle" className="text-xs font-medium fill-slate-700 select-none pointer-events-none">
                    {node.name}
                </text>
            </g>
        )
    }

    const renderEdge = (edge: RelationshipEdge) => {
        const source = nodes.find(n => n.id === edge.source)
        const target = nodes.find(n => n.id === edge.target)
        if (!source || !target) return null

        return (
            <line
                key={edge.id}
                x1={source.x} y1={source.y}
                x2={target.x} y2={target.y}
                stroke="#94a3b8"
                strokeWidth="2"
            />
        )
    }

    // Save
    const handleSave = () => {
        if (onSave) onSave({ nodes, edges })
        toast.success("Genograma guardado")
    }

    return (
        <Card className="h-full flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div>
                    <CardTitle className="text-base">Genograma Interactivo</CardTitle>
                    <CardDescription>Mapa de relaciones familiares</CardDescription>
                </div>
                {!readOnly && (
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => addNode('male')}><Plus className="w-4 h-4 mr-1" /> Hombre</Button>
                        <Button size="sm" variant="outline" onClick={() => addNode('female')}><Plus className="w-4 h-4 mr-1" /> Mujer</Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Guardar</Button>
                    </div>
                )}
            </CardHeader>
            <div className="flex-1 relative bg-slate-50/50 overflow-hidden">
                <svg
                    ref={svgRef}
                    className="w-full h-full"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    viewBox={`0 0 800 600`} // Fixed viewBox for now, could be dynamic
                >
                    {/* Define markers/defs if needed */}
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="28" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                        </marker>
                    </defs>

                    {edges.map(renderEdge)}
                    {nodes.map(renderNode)}
                </svg>

                {/* Editor Overlay for Selected Node */}
                {!readOnly && selectedNodeId && (
                    <div className="absolute top-4 right-4 w-64 bg-white p-4 shadow-lg rounded-lg border border-slate-200">
                        <h4 className="font-semibold text-sm mb-3">Editar Familiar</h4>
                        <div className="space-y-3">
                            <div>
                                <Label className="text-xs">Nombre</Label>
                                <Input
                                    value={nodes.find(n => n.id === selectedNodeId)?.name || ''}
                                    onChange={(e) => setNodes(nodes.map(n => n.id === selectedNodeId ? { ...n, name: e.target.value } : n))}
                                    className="h-8 text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Button size="sm" variant="destructive" onClick={deleteSelected} className="w-full h-8">
                                    <Trash2 className="w-3 h-3 mr-2" /> Eliminar
                                </Button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                * Arrastra para conectar con otros nodos (soon)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
