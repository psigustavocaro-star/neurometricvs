'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, Users, Heart, Baby, User, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { GenogramLegend } from './genogram-legend'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface FamilyMember {
    id: string
    name: string
    relationship: 'patient' | 'spouse' | 'child' | 'sibling' | 'parent' | 'grandparent'
    gender: 'male' | 'female'
    age?: number
    deceased?: boolean
    x: number
    y: number
}

interface FamilyRelationship {
    id: string
    from: string
    to: string
    type: 'marriage' | 'cohabitation' | 'separation' | 'divorce' | 'parent-child' | 'sibling'
    emotional?: 'close' | 'conflict' | 'distant' | 'cutoff' | 'normal'
}

interface GuidedGenogramBuilderProps {
    patientName: string
    patientGender: 'male' | 'female'
    onSave?: (members: FamilyMember[], relationships: FamilyRelationship[]) => void
    embedded?: boolean
}

export function GuidedGenogramBuilder({ patientName, patientGender, onSave, embedded = false }: GuidedGenogramBuilderProps) {
    // Form state
    const [spouseName, setSpouseName] = useState('')
    const [spouseGender, setSpouseGender] = useState<'male' | 'female'>(patientGender === 'male' ? 'female' : 'male')
    const [maritalStatus, setMaritalStatus] = useState<'marriage' | 'cohabitation' | 'separation' | 'divorce'>('marriage')
    const [hasSpouse, setHasSpouse] = useState(false)
    const [spouseDeceased, setSpouseDeceased] = useState(false)

    const [children, setChildren] = useState<Array<{ name: string; gender: 'male' | 'female'; deceased: boolean }>>([])
    const [siblings, setSiblings] = useState<Array<{ name: string; gender: 'male' | 'female'; deceased: boolean; emotional: 'close' | 'conflict' | 'distant' | 'cutoff' | 'normal' }>>([])
    const [parents, setParents] = useState<Array<{ name: string; gender: 'male' | 'female'; deceased: boolean }>>([])

    const [showLegend, setShowLegend] = useState(false)

    // Auto-generate members and relationships from form data
    const { members, relationships } = useMemo(() => {
        const allMembers: FamilyMember[] = [
            { id: 'patient', name: patientName, relationship: 'patient', gender: patientGender, x: 400, y: 300 }
        ]
        const allRelationships: FamilyRelationship[] = []

        // Add spouse
        if (hasSpouse && spouseName.trim()) {
            const spouseX = patientGender === 'male' ? 500 : 300
            allMembers.push({
                id: 'spouse',
                name: spouseName,
                relationship: 'spouse',
                gender: spouseGender,
                deceased: spouseDeceased,
                x: spouseX,
                y: 300
            })
            allRelationships.push({
                id: 'marriage',
                from: 'patient',
                to: 'spouse',
                type: maritalStatus,
                emotional: 'normal'
            })
        }

        // Add children with automatic positioning
        const childrenStartX = hasSpouse ? 350 : 400
        const childSpacing = 100
        const totalChildWidth = (children.length - 1) * childSpacing
        const childrenOffsetX = childrenStartX - totalChildWidth / 2

        children.forEach((child, index) => {
            const childId = `child-${index}`
            allMembers.push({
                id: childId,
                name: child.name || `Hijo/a ${index + 1}`,
                relationship: 'child',
                gender: child.gender,
                deceased: child.deceased,
                x: childrenOffsetX + (index * childSpacing),
                y: 420
            })
            // Connect to patient (and spouse if exists)
            allRelationships.push({
                id: `parent-child-${index}`,
                from: 'patient',
                to: childId,
                type: 'parent-child'
            })
        })

        // Add siblings - positioned to the left of patient
        siblings.forEach((sibling, index) => {
            const siblingId = `sibling-${index}`
            allMembers.push({
                id: siblingId,
                name: sibling.name || `Hermano/a ${index + 1}`,
                relationship: 'sibling',
                gender: sibling.gender,
                deceased: sibling.deceased,
                x: 180 + (index * 80),
                y: 300
            })
            allRelationships.push({
                id: `sibling-${index}`,
                from: 'patient',
                to: siblingId,
                type: 'sibling',
                emotional: sibling.emotional
            })
        })

        // Add parents - positioned above patient
        parents.forEach((parent, index) => {
            const parentId = `parent-${index}`
            allMembers.push({
                id: parentId,
                name: parent.name || (parent.gender === 'male' ? 'Padre' : 'Madre'),
                relationship: 'parent',
                gender: parent.gender,
                deceased: parent.deceased,
                x: 350 + (index * 100),
                y: 160
            })
            allRelationships.push({
                id: `parent-relation-${index}`,
                from: parentId,
                to: 'patient',
                type: 'parent-child'
            })
        })

        // Connect parents if both exist
        if (parents.length === 2) {
            allRelationships.push({
                id: 'parents-marriage',
                from: 'parent-0',
                to: 'parent-1',
                type: 'marriage'
            })
        }

        return { members: allMembers, relationships: allRelationships }
    }, [patientName, patientGender, hasSpouse, spouseName, spouseGender, spouseDeceased, maritalStatus, children, siblings, parents])

    const addChild = () => {
        setChildren(prev => [...prev, { name: '', gender: 'male', deceased: false }])
    }

    const addSibling = () => {
        setSiblings(prev => [...prev, { name: '', gender: 'male', deceased: false, emotional: 'normal' }])
    }

    const addParent = (type: 'father' | 'mother') => {
        const newParent = {
            name: type === 'father' ? 'Padre' : 'Madre',
            gender: type === 'father' ? 'male' as const : 'female' as const,
            deceased: false
        }
        setParents(prev => [...prev, newParent])
    }

    const handleSave = () => {
        if (onSave) onSave(members, relationships)
        toast.success("Genograma guardado")
    }

    // Render relationship line based on type
    const renderRelationshipLine = (rel: FamilyRelationship) => {
        const fromMember = members.find(m => m.id === rel.from)
        const toMember = members.find(m => m.id === rel.to)
        if (!fromMember || !toMember) return null

        const x1 = fromMember.x
        const y1 = fromMember.y
        const x2 = toMember.x
        const y2 = toMember.y

        // For parent-child, draw vertical connections with horizontal bar
        if (rel.type === 'parent-child') {
            const midY = (y1 + y2) / 2
            return (
                <g key={rel.id}>
                    <line x1={x1} y1={y1 + 20} x2={x1} y2={midY} stroke="#64748b" strokeWidth="2" />
                    <line x1={x1} y1={midY} x2={x2} y2={midY} stroke="#64748b" strokeWidth="2" />
                    <line x1={x2} y1={midY} x2={x2} y2={y2 - 20} stroke="#64748b" strokeWidth="2" />
                </g>
            )
        }

        // For sibling connections
        if (rel.type === 'sibling') {
            const midY = y1 - 40
            let strokeColor = "#64748b"
            let strokeDasharray = ""
            let isZigzag = false

            if (rel.emotional === 'close') strokeColor = "#16a34a"
            if (rel.emotional === 'conflict') { strokeColor = "#dc2626"; isZigzag = true }
            if (rel.emotional === 'distant') strokeDasharray = "4 4"
            if (rel.emotional === 'cutoff') strokeDasharray = "2 6"

            if (isZigzag) {
                // Zigzag line for conflict
                const points = []
                const steps = 6
                for (let i = 0; i <= steps; i++) {
                    const px = x1 + (x2 - x1) * (i / steps)
                    const py = midY + (i % 2 === 0 ? -4 : 4)
                    points.push(`${px},${py}`)
                }
                return (
                    <g key={rel.id}>
                        <line x1={x1} y1={y1 - 20} x2={x1} y2={midY} stroke={strokeColor} strokeWidth="2" />
                        <polyline points={points.join(' ')} fill="none" stroke={strokeColor} strokeWidth="2" />
                        <line x1={x2} y1={midY} x2={x2} y2={y2 - 20} stroke={strokeColor} strokeWidth="2" />
                    </g>
                )
            }

            return (
                <g key={rel.id}>
                    <line x1={x1} y1={y1 - 20} x2={x1} y2={midY} stroke={strokeColor} strokeWidth="2" strokeDasharray={strokeDasharray} />
                    <line x1={x1} y1={midY} x2={x2} y2={midY} stroke={strokeColor} strokeWidth="2" strokeDasharray={strokeDasharray} />
                    <line x1={x2} y1={midY} x2={x2} y2={y2 - 20} stroke={strokeColor} strokeWidth="2" strokeDasharray={strokeDasharray} />
                </g>
            )
        }

        // For marriage/partnership lines - horizontal
        const midX = (x1 + x2) / 2

        // Marriage = double line
        if (rel.type === 'marriage') {
            return (
                <g key={rel.id}>
                    <line x1={x1 + 20} y1={y1 - 2} x2={x2 - 20} y2={y2 - 2} stroke="#334155" strokeWidth="2" />
                    <line x1={x1 + 20} y1={y1 + 2} x2={x2 - 20} y2={y2 + 2} stroke="#334155" strokeWidth="2" />
                </g>
            )
        }

        // Cohabitation = single line
        if (rel.type === 'cohabitation') {
            return (
                <line key={rel.id} x1={x1 + 20} y1={y1} x2={x2 - 20} y2={y2} stroke="#334155" strokeWidth="2" />
            )
        }

        // Separation = line with one slash
        if (rel.type === 'separation') {
            return (
                <g key={rel.id}>
                    <line x1={x1 + 20} y1={y1} x2={x2 - 20} y2={y2} stroke="#334155" strokeWidth="2" />
                    <line x1={midX - 5} y1={y1 - 8} x2={midX + 5} y2={y1 + 8} stroke="#334155" strokeWidth="2" />
                </g>
            )
        }

        // Divorce = line with two slashes
        if (rel.type === 'divorce') {
            return (
                <g key={rel.id}>
                    <line x1={x1 + 20} y1={y1} x2={x2 - 20} y2={y2} stroke="#334155" strokeWidth="2" />
                    <line x1={midX - 10} y1={y1 - 8} x2={midX} y2={y1 + 8} stroke="#334155" strokeWidth="2" />
                    <line x1={midX} y1={y1 - 8} x2={midX + 10} y2={y1 + 8} stroke="#334155" strokeWidth="2" />
                </g>
            )
        }

        return null
    }

    const renderNode = (member: FamilyMember) => {
        const isPatient = member.relationship === 'patient'
        const fillColor = isPatient ? "#0d9488" : "white"
        const strokeColor = isPatient ? "#0d9488" : "#334155"
        const strokeWidth = isPatient ? 3 : 2

        return (
            <g key={member.id} transform={`translate(${member.x},${member.y})`}>
                {member.gender === 'male' ? (
                    <rect
                        x="-20" y="-20" width="40" height="40"
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                    />
                ) : (
                    <circle
                        r="20"
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                    />
                )}
                {/* Deceased X mark */}
                {member.deceased && (
                    <>
                        <line x1="-20" y1="-20" x2="20" y2="20" stroke="#334155" strokeWidth="2" />
                        <line x1="20" y1="-20" x2="-20" y2="20" stroke="#334155" strokeWidth="2" />
                    </>
                )}
                <text
                    y="35"
                    textAnchor="middle"
                    className="text-[10px] font-medium fill-slate-700 dark:fill-slate-300 select-none"
                >
                    {member.name}
                </text>
                {member.relationship !== 'patient' && (
                    <text
                        y="46"
                        textAnchor="middle"
                        className="text-[8px] fill-slate-400 dark:fill-slate-500 select-none"
                    >
                        {member.relationship === 'spouse' && 'Pareja'}
                        {member.relationship === 'child' && 'Hijo/a'}
                        {member.relationship === 'sibling' && 'Hermano/a'}
                        {member.relationship === 'parent' && (member.gender === 'male' ? 'Padre' : 'Madre')}
                    </text>
                )}
            </g>
        )
    }

    const formContent = (
        <div className="space-y-4 overflow-y-auto">
            {/* Patient Info */}
            <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg border border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span className="font-semibold text-teal-900 dark:text-teal-200 text-sm">Paciente: {patientName}</span>
                    <span className="text-xs text-teal-600 dark:text-teal-400">({patientGender === 'male' ? '♂' : '♀'})</span>
                </div>
            </div>

            {/* Spouse Section */}
            <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <Label className="font-semibold text-sm">Pareja</Label>
                </div>
                {!hasSpouse ? (
                    <div className="space-y-2">
                        <Input
                            placeholder="Nombre de la pareja"
                            value={spouseName}
                            onChange={(e) => setSpouseName(e.target.value)}
                            className="h-8 text-sm"
                        />
                        <div className="flex gap-2">
                            <Select value={spouseGender} onValueChange={(v) => setSpouseGender(v as any)}>
                                <SelectTrigger className="h-8 text-xs flex-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">♂ Masculino</SelectItem>
                                    <SelectItem value="female">♀ Femenino</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={() => setHasSpouse(true)} size="sm" className="h-8 text-xs" disabled={!spouseName.trim()}>
                                <Plus className="w-3 h-3 mr-1" /> Agregar
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-700 rounded border">
                            <span className="flex-1 text-sm">{spouseName} ({spouseGender === 'male' ? '♂' : '♀'})</span>
                            <Button size="sm" variant="ghost" onClick={() => { setHasSpouse(false); setSpouseName('') }} className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Select value={maritalStatus} onValueChange={(v) => setMaritalStatus(v as any)}>
                                <SelectTrigger className="h-7 text-xs">
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="marriage">Casados</SelectItem>
                                    <SelectItem value="cohabitation">Convivientes</SelectItem>
                                    <SelectItem value="separation">Separados</SelectItem>
                                    <SelectItem value="divorce">Divorciados</SelectItem>
                                </SelectContent>
                            </Select>
                            <label className="flex items-center gap-1 text-xs">
                                <input type="checkbox" checked={spouseDeceased} onChange={(e) => setSpouseDeceased(e.target.checked)} className="rounded" />
                                Fallecido/a
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Children Section */}
            <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Baby className="w-4 h-4 text-blue-600" />
                        <Label className="font-semibold text-sm">Hijos ({children.length})</Label>
                    </div>
                    <Button onClick={addChild} size="sm" variant="outline" className="h-7 text-xs">
                        <Plus className="w-3 h-3 mr-1" /> Agregar
                    </Button>
                </div>
                {children.map((child, index) => (
                    <div key={index} className="flex gap-1 items-center p-2 bg-white dark:bg-slate-700 rounded border">
                        <Input
                            value={child.name}
                            placeholder={`Hijo/a ${index + 1}`}
                            onChange={(e) => {
                                const newChildren = [...children]
                                newChildren[index].name = e.target.value
                                setChildren(newChildren)
                            }}
                            className="flex-1 h-7 text-xs"
                        />
                        <Select value={child.gender} onValueChange={(v) => {
                            const newChildren = [...children]
                            newChildren[index].gender = v as any
                            setChildren(newChildren)
                        }}>
                            <SelectTrigger className="w-16 h-7 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">♂</SelectItem>
                                <SelectItem value="female">♀</SelectItem>
                            </SelectContent>
                        </Select>
                        <label className="flex items-center text-[10px]">
                            <input type="checkbox" checked={child.deceased} onChange={(e) => {
                                const newChildren = [...children]
                                newChildren[index].deceased = e.target.checked
                                setChildren(newChildren)
                            }} className="rounded mr-1" />
                            ✝
                        </label>
                        <Button size="sm" variant="ghost" onClick={() => setChildren(children.filter((_, i) => i !== index))} className="h-6 w-6 p-0">
                            <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Siblings Section */}
            <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <Label className="font-semibold text-sm">Hermanos ({siblings.length})</Label>
                    </div>
                    <Button onClick={addSibling} size="sm" variant="outline" className="h-7 text-xs">
                        <Plus className="w-3 h-3 mr-1" /> Agregar
                    </Button>
                </div>
                {siblings.map((sibling, index) => (
                    <div key={index} className="flex flex-col gap-1 p-2 bg-white dark:bg-slate-700 rounded border">
                        <div className="flex gap-1 items-center">
                            <Input
                                value={sibling.name}
                                placeholder={`Hermano/a ${index + 1}`}
                                onChange={(e) => {
                                    const newSiblings = [...siblings]
                                    newSiblings[index].name = e.target.value
                                    setSiblings(newSiblings)
                                }}
                                className="flex-1 h-7 text-xs"
                            />
                            <Select value={sibling.gender} onValueChange={(v) => {
                                const newSiblings = [...siblings]
                                newSiblings[index].gender = v as any
                                setSiblings(newSiblings)
                            }}>
                                <SelectTrigger className="w-16 h-7 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">♂</SelectItem>
                                    <SelectItem value="female">♀</SelectItem>
                                </SelectContent>
                            </Select>
                            <label className="flex items-center text-[10px]">
                                <input type="checkbox" checked={sibling.deceased} onChange={(e) => {
                                    const newSiblings = [...siblings]
                                    newSiblings[index].deceased = e.target.checked
                                    setSiblings(newSiblings)
                                }} className="rounded mr-1" />
                                ✝
                            </label>
                            <Button size="sm" variant="ghost" onClick={() => setSiblings(siblings.filter((_, i) => i !== index))} className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                        </div>
                        <Select value={sibling.emotional} onValueChange={(v) => {
                            const newSiblings = [...siblings]
                            newSiblings[index].emotional = v as any
                            setSiblings(newSiblings)
                        }}>
                            <SelectTrigger className="h-6 text-[10px]">
                                <SelectValue placeholder="Tipo de relación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="close">Cercana</SelectItem>
                                <SelectItem value="conflict">Conflicto</SelectItem>
                                <SelectItem value="distant">Distante</SelectItem>
                                <SelectItem value="cutoff">Sin contacto</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </div>

            {/* Parents Section */}
            <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <Label className="font-semibold text-sm">Padres</Label>
                <div className="flex gap-2">
                    <Button
                        onClick={() => addParent('father')}
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs"
                        disabled={parents.some(p => p.gender === 'male')}
                    >
                        <Plus className="w-3 h-3 mr-1" /> Padre
                    </Button>
                    <Button
                        onClick={() => addParent('mother')}
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs"
                        disabled={parents.some(p => p.gender === 'female')}
                    >
                        <Plus className="w-3 h-3 mr-1" /> Madre
                    </Button>
                </div>
                {parents.map((parent, index) => (
                    <div key={index} className="flex gap-1 items-center p-2 bg-white dark:bg-slate-700 rounded border">
                        <Input
                            value={parent.name}
                            onChange={(e) => {
                                const newParents = [...parents]
                                newParents[index].name = e.target.value
                                setParents(newParents)
                            }}
                            className="flex-1 h-7 text-xs"
                        />
                        <span className="text-sm">{parent.gender === 'male' ? '♂' : '♀'}</span>
                        <label className="flex items-center text-[10px]">
                            <input type="checkbox" checked={parent.deceased} onChange={(e) => {
                                const newParents = [...parents]
                                newParents[index].deceased = e.target.checked
                                setParents(newParents)
                            }} className="rounded mr-1" />
                            ✝
                        </label>
                        <Button size="sm" variant="ghost" onClick={() => setParents(parents.filter((_, i) => i !== index))} className="h-6 w-6 p-0">
                            <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full bg-teal-600 hover:bg-teal-700 h-8 text-sm">
                <Save className="w-4 h-4 mr-2" /> Guardar Genograma
            </Button>
        </div>
    )

    const previewContent = (
        <div className="relative h-full">
            {/* Legend Toggle */}
            <div className="absolute top-2 right-2 z-10">
                <Popover open={showLegend} onOpenChange={setShowLegend}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                            <HelpCircle className="w-3 h-3 mr-1" /> Leyenda
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <GenogramLegend compact />
                    </PopoverContent>
                </Popover>
            </div>

            <svg
                className="w-full h-full border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900"
                viewBox="0 0 700 500"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Render relationship lines first (behind nodes) */}
                {relationships.map(renderRelationshipLine)}
                {/* Render nodes on top */}
                {members.map(renderNode)}
            </svg>
        </div>
    )

    // Embedded mode - more compact layout
    if (embedded) {
        return (
            <div className="h-full flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 flex-1 overflow-hidden">
                    {/* Form Side */}
                    <div className="overflow-y-auto max-h-[400px] pr-2">
                        {formContent}
                    </div>
                    {/* Preview Side */}
                    <div className="min-h-[300px]">
                        {previewContent}
                    </div>
                </div>
            </div>
        )
    }

    // Full page mode
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left: Form */}
            <div className="overflow-y-auto pr-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Construir Genograma Familiar</CardTitle>
                        <CardDescription>Responde las preguntas para construir el árbol familiar automáticamente</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {formContent}
                    </CardContent>
                </Card>
            </div>

            {/* Right: Preview */}
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Vista Previa del Genograma</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                    {previewContent}
                </CardContent>
            </Card>
        </div>
    )
}
