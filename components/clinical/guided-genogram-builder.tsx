'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, Users, Heart, Baby, User, HelpCircle, Download, Network, RotateCcw, Move } from 'lucide-react'
import { toast } from 'sonner'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { GenogramLegend } from './genogram-legend'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface FamilyMember {
    id: string
    name: string
    relationship: 'patient' | 'spouse' | 'child' | 'sibling' | 'parent' | 'grandparent' | 'uncle' | 'aunt' | 'cousin'
    gender: 'male' | 'female'
    side?: 'paternal' | 'maternal'
    age?: number
    deceased?: boolean
    x: number
    y: number
}

interface FamilyRelationship {
    id: string
    from: string
    to: string
    type: 'marriage' | 'cohabitation' | 'separation' | 'divorce' | 'parent-child' | 'sibling' | 'extended'
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

    const { resolvedTheme } = useTheme()
    const [showLegend, setShowLegend] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [zoom, setZoom] = useState(1)
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Extended Family State
    const [grandparents, setGrandparents] = useState<Array<{ side: 'paternal' | 'maternal'; gender: 'male' | 'female'; deceased: boolean; name: string }>>([])
    const [uncles, setUncles] = useState<Array<{ side: 'paternal' | 'maternal'; gender: 'male' | 'female'; deceased: boolean; name: string }>>([])

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
            // Paternal on left (or first), Maternal on right (or second)
            // Ideally should check gender but simplifying for index: 0=Father, 1=Mother usually
            // Adjust X for correct side: Father (left) ~300, Mother (right) ~500
            const parentX = parent.gender === 'male' ? 300 : 500

            allMembers.push({
                id: parentId,
                name: parent.name || (parent.gender === 'male' ? 'Padre' : 'Madre'),
                relationship: 'parent',
                gender: parent.gender,
                deceased: parent.deceased,
                x: parentX,
                y: 160
            })
            allRelationships.push({
                id: `parent-relation-${index}`,
                from: parentId,
                to: 'patient',
                type: 'parent-child'
            })
        })

        // Add Grandparents
        grandparents.forEach((gp, index) => {
            const gpId = `grandparent-${index}`
            // Paternal side (left of father), Maternal side (right of mother)
            // Father is at 300, Mother at 500
            // Paternal GP: 250 (GF), 350 (GM)
            // Maternal GP: 450 (GF), 550 (GM)

            let gpX = 0
            if (gp.side === 'paternal') {
                gpX = gp.gender === 'male' ? 250 : 350
            } else {
                gpX = gp.gender === 'male' ? 450 : 550
            }

            allMembers.push({
                id: gpId,
                name: gp.name || (gp.gender === 'male' ? 'Abuelo' : 'Abuela'),
                relationship: 'grandparent',
                gender: gp.gender,
                deceased: gp.deceased,
                side: gp.side,
                x: gpX,
                y: 80
            })

            // Connect to relevant parent if exists
            const parent = parents.find(p => (gp.side === 'paternal' && p.gender === 'male') || (gp.side === 'maternal' && p.gender === 'female'))
            if (parent) {
                // Find parent ID - this is a bit tricky as we regenerate IDs. 
                // Assuming order 0=Father, 1=Mother or finding by gender in allMembers
                const parentMember = allMembers.find(m => m.relationship === 'parent' && m.gender === (gp.side === 'paternal' ? 'male' : 'female'))
                if (parentMember) {
                    allRelationships.push({
                        id: `gp-parent-${index}`,
                        from: gpId,
                        to: parentMember.id,
                        type: 'parent-child'
                    })
                }
            }
        })

        // Add Uncles/Aunts
        uncles.forEach((uncle, index) => {
            const uncleId = `uncle-${index}`
            // Paternal siblings: Left of father (< 300)
            // Maternal siblings: Right of mother (> 500)

            let uncleX = 0
            if (uncle.side === 'paternal') {
                uncleX = 150 - (index * 80) // Spreading to left
            } else {
                uncleX = 650 + (index * 80) // Spreading to right
            }

            allMembers.push({
                id: uncleId,
                name: uncle.name || (uncle.gender === 'male' ? 'Tío' : 'Tía'),
                relationship: uncle.gender === 'male' ? 'uncle' : 'aunt',
                gender: uncle.gender,
                deceased: uncle.deceased,
                side: uncle.side,
                x: uncleX,
                y: 160
            })

            // Connect to Grandparents (if they exist) to show sibling relationship with parent?
            // Or just visual placement. For now, visual placement is key. 
            // Ideally connected to same grandparents as parents, making them siblings of parents.
            // Simplified: Connect to "Grandparent pair" center? 
            // For now, let's just place them.
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

        // Connect paternal grandparents if both exist
        const paternalGPs = allMembers.filter(m => m.relationship === 'grandparent' && m.side === 'paternal')
        if (paternalGPs.length === 2) {
            allRelationships.push({
                id: 'paternal-gp-marriage',
                from: paternalGPs[0].id,
                to: paternalGPs[1].id,
                type: 'marriage'
            })
        }

        // Connect maternal grandparents if both exist
        const maternalGPs = allMembers.filter(m => m.relationship === 'grandparent' && m.side === 'maternal')
        if (maternalGPs.length === 2) {
            allRelationships.push({
                id: 'maternal-gp-marriage',
                from: maternalGPs[0].id,
                to: maternalGPs[1].id,
                type: 'marriage'
            })
        }

        return { members: allMembers, relationships: allRelationships }
    }, [patientName, patientGender, hasSpouse, spouseName, spouseGender, spouseDeceased, maritalStatus, children, siblings, parents, grandparents, uncles])

    const addGrandparent = (side: 'paternal' | 'maternal', gender: 'male' | 'female') => {
        setGrandparents(prev => [...prev, { side, gender, deceased: false, name: '' }])
    }

    const addUncle = (side: 'paternal' | 'maternal') => {
        setUncles(prev => [...prev, { side, gender: 'male', deceased: false, name: '' }])
    }

    const addChild = () => {
        setChildren(prev => [...prev, { name: '', gender: 'male', deceased: false }])
    }

    const addSibling = () => {
        setSiblings(prev => [...prev, { name: '', gender: 'male', deceased: false, emotional: 'normal' }])
    }

    const resetAll = () => {
        setSpouseName('')
        setSpouseGender(patientGender === 'male' ? 'female' : 'male')
        setMaritalStatus('marriage')
        setHasSpouse(false)
        setSpouseDeceased(false)
        setChildren([])
        setSiblings([])
        setParents([])
        setGrandparents([])
        setUncles([])
        toast.success('Genograma restaurado')
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

    const handleDownloadPDF = async () => {
        const element = document.getElementById('genogram-container')
        if (!element) return

        try {
            toast.loading("Generando PDF...")
            const canvas = await html2canvas(element, {
                scale: 2, // Higher quality
                backgroundColor: null // Transparent background if possible, or matches theme
            })

            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            })

            const imgProps = pdf.getImageProperties(imgData)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save(`genograma_${patientName.replace(/\s+/g, '_')}.pdf`)
            toast.dismiss()
            toast.success("PDF descargado correctamente")
        } catch (error) {
            console.error("Error generating PDF:", error)
            toast.dismiss()
            toast.error("Error al generar el PDF")
        }
    }


    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return

        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y

        // Simple constraints to keep content somewhat in view (assuming 700x500 viewBox)
        // Limits: +/- 2000px
        const clampedX = Math.max(-2000, Math.min(2000, newX))
        const clampedY = Math.max(-2000, Math.min(2000, newY))

        setPan({
            x: clampedX,
            y: clampedY
        })
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2))
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5))
    const handleResetView = () => {
        setZoom(1)
        setPan({ x: 0, y: 0 })
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
                    className="text-[10px] font-medium select-none"
                    fill={isMounted && resolvedTheme === 'dark' ? '#cbd5e1' : '#334155'}
                >
                    {member.name}
                </text>
                {member.relationship !== 'patient' && (
                    <text
                        y="46"
                        textAnchor="middle"
                        className="text-[8px] select-none"
                        fill={isMounted && resolvedTheme === 'dark' ? '#64748b' : '#94a3b8'}
                    >
                        {member.relationship === 'spouse' && 'Pareja'}
                        {member.relationship === 'child' && 'Hijo/a'}
                        {member.relationship === 'sibling' && 'Hermano/a'}
                        {member.relationship === 'parent' && (member.gender === 'male' ? 'Padre' : 'Madre')}
                        {member.relationship === 'grandparent' && (member.gender === 'male' ? 'Abuelo' : 'Abuela')}
                        {(member.relationship === 'uncle' || member.relationship === 'aunt') && (member.gender === 'male' ? 'Tío' : 'Tía')}
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

            {/* Extended Family Section */}
            <div className="space-y-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600" />
                    <Label className="font-semibold text-sm">Familia Extendida</Label>
                </div>

                {/* Grandparents */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium text-slate-500">Abuelos</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Button onClick={() => addGrandparent('paternal', 'male')} size="sm" variant="outline" className="h-8 text-[10px] w-full">
                            <Plus className="w-3 h-3 mr-1 shrink-0" /> Pat. Abuelo
                        </Button>
                        <Button onClick={() => addGrandparent('paternal', 'female')} size="sm" variant="outline" className="h-8 text-[10px] w-full">
                            <Plus className="w-3 h-3 mr-1 shrink-0" /> Pat. Abuela
                        </Button>
                        <Button onClick={() => addGrandparent('maternal', 'male')} size="sm" variant="outline" className="h-8 text-[10px] w-full">
                            <Plus className="w-3 h-3 mr-1 shrink-0" /> Mat. Abuelo
                        </Button>
                        <Button onClick={() => addGrandparent('maternal', 'female')} size="sm" variant="outline" className="h-8 text-[10px] w-full">
                            <Plus className="w-3 h-3 mr-1 shrink-0" /> Mat. Abuela
                        </Button>
                    </div>
                    {grandparents.map((gp, index) => (
                        <div key={index} className="flex gap-1 items-center p-2 bg-white dark:bg-slate-700 rounded border">
                            <span className="text-[10px] w-8 font-bold text-slate-400">{gp.side === 'paternal' ? 'Pat' : 'Mat'}</span>
                            <Input
                                value={gp.name}
                                placeholder={gp.gender === 'male' ? 'Abuelo' : 'Abuela'}
                                onChange={(e) => {
                                    const newGP = [...grandparents]
                                    newGP[index].name = e.target.value
                                    setGrandparents(newGP)
                                }}
                                className="flex-1 h-7 text-xs"
                            />
                            <span className="text-sm">{gp.gender === 'male' ? '♂' : '♀'}</span>
                            <label className="flex items-center text-[10px]">
                                <input type="checkbox" checked={gp.deceased} onChange={(e) => {
                                    const newGP = [...grandparents]
                                    newGP[index].deceased = e.target.checked
                                    setGrandparents(newGP)
                                }} className="rounded mr-1" />
                                ✝
                            </label>
                            <Button size="sm" variant="ghost" onClick={() => setGrandparents(grandparents.filter((_, i) => i !== index))} className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Uncles/Aunts */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium text-slate-500">Tíos y Tías</Label>
                    <div className="flex gap-2">
                        <Button onClick={() => addUncle('paternal')} size="sm" variant="outline" className="flex-1 h-6 text-[10px]">
                            <Plus className="w-3 h-3 mr-1" /> Tío/a Paterno
                        </Button>
                        <Button onClick={() => addUncle('maternal')} size="sm" variant="outline" className="flex-1 h-6 text-[10px]">
                            <Plus className="w-3 h-3 mr-1" /> Tío/a Materno
                        </Button>
                    </div>
                    {uncles.map((uncle, index) => (
                        <div key={index} className="flex gap-1 items-center p-2 bg-white dark:bg-slate-700 rounded border">
                            <span className="text-[10px] w-8 font-bold text-slate-400">{uncle.side === 'paternal' ? 'Pat' : 'Mat'}</span>
                            <Input
                                value={uncle.name}
                                placeholder="Nombre"
                                onChange={(e) => {
                                    const newUncles = [...uncles]
                                    newUncles[index].name = e.target.value
                                    setUncles(newUncles)
                                }}
                                className="flex-1 h-7 text-xs"
                            />
                            <Select value={uncle.gender} onValueChange={(v) => {
                                const newUncles = [...uncles]
                                newUncles[index].gender = v as any
                                setUncles(newUncles)
                            }}>
                                <SelectTrigger className="w-14 h-7 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">♂</SelectItem>
                                    <SelectItem value="female">♀</SelectItem>
                                </SelectContent>
                            </Select>
                            <label className="flex items-center text-[10px]">
                                <input type="checkbox" checked={uncle.deceased} onChange={(e) => {
                                    const newUncles = [...uncles]
                                    newUncles[index].deceased = e.target.checked
                                    setUncles(newUncles)
                                }} className="rounded mr-1" />
                                ✝
                            </label>
                            <Button size="sm" variant="ghost" onClick={() => setUncles(uncles.filter((_, i) => i !== index))} className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full bg-teal-600 hover:bg-teal-700 h-8 text-sm">
                <Save className="w-4 h-4 mr-2" /> Guardar Genograma
            </Button>
        </div>
    )

    const previewContent = (
        <div className="relative h-full select-none">
            {/* Controls Toolbar */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 items-end">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-white/80 dark:bg-slate-800/80 backdrop-blur" onClick={handleDownloadPDF}>
                        <Download className="w-3 h-3 mr-1" /> PDF
                    </Button>
                    <Popover open={showLegend} onOpenChange={setShowLegend}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 text-xs bg-white/80 dark:bg-slate-800/80 backdrop-blur">
                                <HelpCircle className="w-3 h-3 mr-1" /> Leyenda
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0" align="end">
                            <GenogramLegend compact />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Zoom Controls */}
                <div className="flex flex-col gap-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur p-1 rounded-lg border shadow-sm">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={handleZoomIn} title="Acercar">
                        <Plus className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={handleZoomOut} title="Alejar">
                        <Move className="w-3 h-3 rotate-45" /> {/* Using Move icon rotated as pseudo-minus or keep standard */}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={handleResetView} title="Resetear Vista">
                        <RotateCcw className="w-3 h-3" />
                    </Button>
                </div>
            </div>

            <div
                id="genogram-container"
                className={`h-full w-full rounded-lg overflow-hidden cursor-${isDragging ? 'grabbing' : 'grab'}`}
                style={{ backgroundColor: isMounted && resolvedTheme === 'dark' ? '#0f172a' : '#f8fafc' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <svg
                    className="w-full h-full border border-slate-200 dark:border-slate-700 rounded-lg touch-none"
                    viewBox="0 0 700 500"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`} style={{ transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                        {/* Render relationship lines first (behind nodes) */}
                        {relationships.map(renderRelationshipLine)}
                        {/* Render nodes on top */}
                        {members.map(renderNode)}
                    </g>
                </svg>
            </div>
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
    const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Mobile Tab Switcher */}
            <div className="lg:hidden flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
                <button
                    onClick={() => setActiveTab('form')}
                    className={`flex-1 py-3 px-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'form'
                        ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-500'
                        : 'text-slate-500 dark:text-slate-400'
                        }`}
                >
                    <Users className="w-4 h-4 inline mr-2" />
                    Datos
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 py-3 px-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'preview'
                        ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-500'
                        : 'text-slate-500 dark:text-slate-400'
                        }`}
                >
                    <Network className="w-4 h-4 inline mr-2" />
                    Árbol
                </button>
            </div>

            {/* Mobile Content */}
            <div className="lg:hidden flex-1 overflow-hidden">
                {activeTab === 'form' ? (
                    <div className="h-full overflow-y-auto p-4">
                        <div className="space-y-3">
                            <div className="text-center pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-8" />
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Genograma Familiar</h2>
                                    <Button variant="ghost" size="sm" onClick={resetAll} className="w-8 h-8 p-0 text-slate-500 hover:text-red-500">
                                        <RotateCcw className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Agrega familiares para crear el árbol</p>
                            </div>
                            {formContent}
                        </div>
                    </div>
                ) : (
                    <div className="h-full p-4">
                        {previewContent}
                    </div>
                )}
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 h-full p-6 overflow-x-hidden">
                {/* Left: Form */}
                <div className="overflow-y-auto pr-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">Construir Genograma Familiar</CardTitle>
                                    <CardDescription className="text-sm">Responde las preguntas para construir el árbol familiar automáticamente</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" onClick={resetAll} className="gap-2 text-slate-500 hover:text-red-500 hover:border-red-200">
                                    <RotateCcw className="w-4 h-4" />
                                    Restaurar
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            {formContent}
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Preview */}
                <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg">Vista Previa del Genograma</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)]">
                        {previewContent}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
