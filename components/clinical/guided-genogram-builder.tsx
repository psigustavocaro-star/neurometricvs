'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Trash2, Save, Users, Heart, Baby, User } from 'lucide-react'
import { toast } from 'sonner'

interface FamilyMember {
    id: string
    name: string
    relationship: 'patient' | 'spouse' | 'child' | 'sibling' | 'parent' | 'grandparent'
    gender: 'male' | 'female'
    age?: number
    x: number
    y: number
}

interface GuidedGenogramBuilderProps {
    patientName: string
    patientGender: 'male' | 'female'
    onSave?: (members: FamilyMember[]) => void
}

export function GuidedGenogramBuilder({ patientName, patientGender, onSave }: GuidedGenogramBuilderProps) {
    const [members, setMembers] = useState<FamilyMember[]>([
        { id: 'patient', name: patientName, relationship: 'patient', gender: patientGender, x: 400, y: 300 }
    ])

    const [spouseName, setSpouseName] = useState('')
    const [spouseGender, setSpouseGender] = useState<'male' | 'female'>('female')
    const [hasSpouse, setHasSpouse] = useState(false)

    const [children, setChildren] = useState<Array<{ name: string; gender: 'male' | 'female' }>>([])
    const [siblings, setSiblings] = useState<Array<{ name: string; gender: 'male' | 'female' }>>([])
    const [parents, setParents] = useState<Array<{ name: string; gender: 'male' | 'female' }>>([])

    const addSpouse = () => {
        if (!spouseName.trim()) {
            toast.error("Por favor ingresa el nombre de la pareja")
            return
        }

        const newMember: FamilyMember = {
            id: `spouse-${Date.now()}`,
            name: spouseName,
            relationship: 'spouse',
            gender: spouseGender,
            x: 500,
            y: 300
        }

        setMembers(prev => [...prev, newMember])
        setHasSpouse(true)
        setSpouseName('')
        toast.success("Pareja agregada")
    }

    const addChild = () => {
        const newChild = { name: `Hijo/a ${children.length + 1}`, gender: 'male' as const }
        setChildren(prev => [...prev, newChild])
    }

    const addSibling = () => {
        const newSibling = { name: `Hermano/a ${siblings.length + 1}`, gender: 'male' as const }
        setSiblings(prev => [...prev, newSibling])
    }

    const addParent = (type: 'father' | 'mother') => {
        const newParent = {
            name: type === 'father' ? 'Padre' : 'Madre',
            gender: type === 'father' ? 'male' as const : 'female' as const
        }
        setParents(prev => [...prev, newParent])
    }

    const generateGenogram = () => {
        const allMembers: FamilyMember[] = [
            { id: 'patient', name: patientName, relationship: 'patient', gender: patientGender, x: 400, y: 300 }
        ]

        // Add spouse
        if (hasSpouse) {
            const spouse = members.find(m => m.relationship === 'spouse')
            if (spouse) allMembers.push(spouse)
        }

        // Add children with automatic positioning
        children.forEach((child, index) => {
            allMembers.push({
                id: `child-${index}`,
                name: child.name,
                relationship: 'child',
                gender: child.gender,
                x: 300 + (index * 100),
                y: 450
            })
        })

        // Add siblings
        siblings.forEach((sibling, index) => {
            allMembers.push({
                id: `sibling-${index}`,
                name: sibling.name,
                relationship: 'sibling',
                gender: sibling.gender,
                x: 200 + (index * 80),
                y: 300
            })
        })

        // Add parents
        parents.forEach((parent, index) => {
            allMembers.push({
                id: `parent-${index}`,
                name: parent.name,
                relationship: 'parent',
                gender: parent.gender,
                x: 350 + (index * 100),
                y: 150
            })
        })

        setMembers(allMembers)
        toast.success("Genograma generado")
    }

    const handleSave = () => {
        if (onSave) onSave(members)
        toast.success("Genograma guardado")
    }

    const renderNode = (member: FamilyMember) => {
        const isPatient = member.relationship === 'patient'
        return (
            <g key={member.id} transform={`translate(${member.x},${member.y})`}>
                {member.gender === 'male' ? (
                    <rect
                        x="-20" y="-20" width="40" height="40"
                        fill={isPatient ? "#0d9488" : "white"}
                        stroke={isPatient ? "#0d9488" : "#334155"}
                        strokeWidth={isPatient ? 3 : 2}
                    />
                ) : (
                    <circle
                        r="20"
                        fill={isPatient ? "#0d9488" : "white"}
                        stroke={isPatient ? "#0d9488" : "#334155"}
                        strokeWidth={isPatient ? 3 : 2}
                    />
                )}
                <text
                    y="40"
                    textAnchor="middle"
                    className="text-xs font-medium fill-slate-700 select-none"
                >
                    {member.name}
                </text>
            </g>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left: Form */}
            <div className="space-y-6 overflow-y-auto pr-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Construir Genograma Familiar</CardTitle>
                        <CardDescription>Responde las preguntas para construir el árbol familiar automáticamente</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Patient Info */}
                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="w-5 h-5 text-teal-600" />
                                <span className="font-semibold text-teal-900">Paciente</span>
                            </div>
                            <p className="text-sm text-teal-700">{patientName} ({patientGender === 'male' ? 'Masculino' : 'Femenino'})</p>
                        </div>

                        {/* Spouse */}
                        {!hasSpouse && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-pink-600" />
                                    <Label className="font-semibold">¿Tiene pareja?</Label>
                                </div>
                                <Input
                                    placeholder="Nombre de la pareja"
                                    value={spouseName}
                                    onChange={(e) => setSpouseName(e.target.value)}
                                />
                                <RadioGroup value={spouseGender} onValueChange={(v) => setSpouseGender(v as any)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="spouse-male" />
                                        <Label htmlFor="spouse-male">Masculino</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="spouse-female" />
                                        <Label htmlFor="spouse-female">Femenino</Label>
                                    </div>
                                </RadioGroup>
                                <Button onClick={addSpouse} size="sm" className="w-full">
                                    <Plus className="w-4 h-4 mr-2" /> Agregar Pareja
                                </Button>
                            </div>
                        )}

                        {/* Children */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Baby className="w-5 h-5 text-blue-600" />
                                    <Label className="font-semibold">Hijos ({children.length})</Label>
                                </div>
                                <Button onClick={addChild} size="sm" variant="outline">
                                    <Plus className="w-4 h-4 mr-2" /> Agregar Hijo/a
                                </Button>
                            </div>
                            {children.map((child, index) => (
                                <div key={index} className="flex gap-2 items-center p-2 bg-slate-50 rounded">
                                    <Input
                                        value={child.name}
                                        onChange={(e) => {
                                            const newChildren = [...children]
                                            newChildren[index].name = e.target.value
                                            setChildren(newChildren)
                                        }}
                                        className="flex-1"
                                    />
                                    <select
                                        value={child.gender}
                                        onChange={(e) => {
                                            const newChildren = [...children]
                                            newChildren[index].gender = e.target.value as any
                                            setChildren(newChildren)
                                        }}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="male">♂</option>
                                        <option value="female">♀</option>
                                    </select>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setChildren(children.filter((_, i) => i !== index))}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Siblings */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    <Label className="font-semibold">Hermanos ({siblings.length})</Label>
                                </div>
                                <Button onClick={addSibling} size="sm" variant="outline">
                                    <Plus className="w-4 h-4 mr-2" /> Agregar Hermano/a
                                </Button>
                            </div>
                            {siblings.map((sibling, index) => (
                                <div key={index} className="flex gap-2 items-center p-2 bg-slate-50 rounded">
                                    <Input
                                        value={sibling.name}
                                        onChange={(e) => {
                                            const newSiblings = [...siblings]
                                            newSiblings[index].name = e.target.value
                                            setSiblings(newSiblings)
                                        }}
                                        className="flex-1"
                                    />
                                    <select
                                        value={sibling.gender}
                                        onChange={(e) => {
                                            const newSiblings = [...siblings]
                                            newSiblings[index].gender = e.target.value as any
                                            setSiblings(newSiblings)
                                        }}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="male">♂</option>
                                        <option value="female">♀</option>
                                    </select>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setSiblings(siblings.filter((_, i) => i !== index))}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Parents */}
                        <div className="space-y-3">
                            <Label className="font-semibold">Padres</Label>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => addParent('father')}
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                    disabled={parents.some(p => p.gender === 'male')}
                                >
                                    Agregar Padre
                                </Button>
                                <Button
                                    onClick={() => addParent('mother')}
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                    disabled={parents.some(p => p.gender === 'female')}
                                >
                                    Agregar Madre
                                </Button>
                            </div>
                            {parents.map((parent, index) => (
                                <div key={index} className="flex gap-2 items-center p-2 bg-slate-50 rounded">
                                    <Input
                                        value={parent.name}
                                        onChange={(e) => {
                                            const newParents = [...parents]
                                            newParents[index].name = e.target.value
                                            setParents(newParents)
                                        }}
                                        className="flex-1"
                                    />
                                    <span className="text-sm">{parent.gender === 'male' ? '♂' : '♀'}</span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setParents(parents.filter((_, i) => i !== index))}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button onClick={generateGenogram} className="flex-1 bg-teal-600 hover:bg-teal-700">
                                Generar Genograma
                            </Button>
                            <Button onClick={handleSave} variant="outline" className="flex-1">
                                <Save className="w-4 h-4 mr-2" /> Guardar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Preview */}
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-lg">Vista Previa del Genograma</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                    <svg className="w-full h-full border border-slate-200 rounded-lg bg-slate-50" viewBox="0 0 800 600">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="28" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                            </marker>
                        </defs>
                        {members.map(renderNode)}
                    </svg>
                </CardContent>
            </Card>
        </div>
    )
}
