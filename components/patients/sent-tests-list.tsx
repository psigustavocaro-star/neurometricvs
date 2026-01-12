'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Copy, Check, ExternalLink, RefreshCw } from "lucide-react"
import { assignTest } from '@/app/[locale]/tests/remote-actions'
import { useRouter } from "@/i18n/navigation"
import { toast } from "sonner"
import { useTranslations, useFormatter } from 'next-intl'

interface TestAssignment {
    id: string
    test_id: string
    status: 'pending' | 'completed'
    created_at: string
    token: string
}

export function SentTestsList({ assignments, patientId }: { assignments: TestAssignment[], patientId: string }) {
    const t = useTranslations('Dashboard.Patients.Remote')
    const tc = useTranslations('Dashboard.Tests.Catalog.Tests')
    const format = useFormatter()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTest, setSelectedTest] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [copiedToken, setCopiedToken] = useState<string | null>(null)
    const router = useRouter()

    const AVAILABLE_TESTS = [
        { id: 'phq9', name: tc('phq9.name') },
        { id: 'gad7', name: tc('gad7.name') },
        { id: 'bdiii', name: tc('bdiii.name') },
        { id: 'scl90', name: tc('scl90.name') },
    ]

    // toast is imported directly

    const handleAssign = async () => {
        if (!selectedTest) return
        setLoading(true)
        try {
            const res = await assignTest(patientId, selectedTest)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success(t('messages.assigned'), { description: t('messages.assigned_desc') })
                setIsOpen(false)
                setSelectedTest('')
                router.refresh()
            }
        } catch (e) {
            console.error(e)
            toast.error(t('messages.error'), { description: t('messages.error_desc') })
        } finally {
            setLoading(false)
        }
    }

    const copyLink = (token: string) => {
        // Construct full URL. Assuming window.location.origin is available in client
        const url = `${window.location.origin}/t/${token}`
        navigator.clipboard.writeText(url)
        setCopiedToken(token)
        toast.success(t('messages.copied'), { description: t('messages.copied_desc') })
        setTimeout(() => setCopiedToken(null), 2000)
    }

    const getTestName = (id: string) => AVAILABLE_TESTS.find(t => t.id === id)?.name || id

    return (
        <Card className="mb-6 border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-lg font-bold text-slate-800">{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            {t('new_assignment')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('modal_title')}</DialogTitle>
                            <DialogDescription>
                                {t('modal_description')}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Select onValueChange={setSelectedTest} value={selectedTest}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('select_placeholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_TESTS.map(test => (
                                        <SelectItem key={test.id} value={test.id}>{test.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>{t('cancel')}</Button>
                            <Button onClick={handleAssign} disabled={!selectedTest || loading} className="bg-teal-600 text-white">
                                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : t('generate_link')}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {assignments.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                        {t('empty')}
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('table.test')}</TableHead>
                                <TableHead>{t('table.status')}</TableHead>
                                <TableHead>{t('table.created')}</TableHead>
                                <TableHead className="text-right">{t('table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignments.map((assignment) => (
                                <TableRow key={assignment.id}>
                                    <TableCell className="font-medium">{getTestName(assignment.test_id)}</TableCell>
                                    <TableCell>
                                        <Badge variant={assignment.status === 'completed' ? 'default' : 'outline'} className={assignment.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'text-slate-500 border-slate-300'}>
                                            {assignment.status === 'completed' ? t('status.completed') : t('status.pending')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {format.dateTime(new Date(assignment.created_at), { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {assignment.status === 'pending' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => copyLink(assignment.token)}
                                                title={t('copy_link')}
                                            >
                                                {copiedToken === assignment.token ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-slate-400" />}
                                            </Button>
                                        )}
                                        {assignment.status === 'completed' && (
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                                                <Check className="h-4 w-4 text-green-600" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}
