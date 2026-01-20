'use client'

import { useTranslations } from 'next-intl'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ClipboardList, Play } from 'lucide-react'
import { TestDefinition } from '@/types/test'
import { StepByStepTestRunner } from './step-by-step-test-runner'

import { standardTests } from '@/lib/tests-registry'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

const AVAILABLE_TESTS: TestDefinition[] = Object.values(standardTests)

interface InSessionTestRunnerProps {
    patientId: string
    sessionId?: string
    onTestComplete?: (result: any) => void
}

export function InSessionTestRunner({ patientId, sessionId, onTestComplete }: InSessionTestRunnerProps) {
    const t = useTranslations('Dashboard.Tests.Catalog')
    const tCats = useTranslations('Dashboard.Tests.Catalog.Categories')

    const [open, setOpen] = useState(false)
    const [selectedTest, setSelectedTest] = useState<TestDefinition | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    // Helper to categorize tests
    const getCategory = (test: TestDefinition): string => {
        const title = test.title.toLowerCase()
        const id = test.id.toLowerCase()

        if (id.includes('phq') || id.includes('gds') || id.includes('ces-d') || title.includes('depresión') || title.includes('depression')) return 'depression'
        if (id.includes('gad') || id.includes('scared') || id.includes('psa') || title.includes('ansiedad') || title.includes('anxiety') || title.includes('pánico')) return 'anxiety'
        if (id.includes('adhd') || id.includes('snap') || id.includes('asrs') || id.includes('wurs') || id.includes('vanderbilt') || id.includes('conners') || title.includes('tdah') || title.includes('atención')) return 'adhd_behavior'
        if (id.includes('autism') || id.includes('chat') || id.includes('cast') || title.includes('autismo') || title.includes('tea')) return 'autism_neuro'
        if (id.includes('bipolar') || id.includes('mdq') || id.includes('bsds') || id.includes('altman') || title.includes('manía') || title.includes('bipolar')) return 'bipolar'
        if (id.includes('cognitive') || id.includes('moca') || id.includes('mmse') || id.includes('mini-cog') || id.includes('ad8') || id.includes('pfeiffer') || id.includes('slums') || id.includes('ace') || title.includes('cognitivo') || title.includes('demencia') || title.includes('memoria')) return 'geriatrics'
        if (id.includes('alcohol') || id.includes('drug') || id.includes('audit') || id.includes('dast') || id.includes('cage') || id.includes('crafft') || id.includes('tweak') || id.includes('fagerstrom') || title.includes('adicción') || title.includes('consumo')) return 'addictions'
        if (id.includes('ptsd') || id.includes('pcl') || id.includes('ies') || title.includes('trauma') || title.includes('estrés')) return 'trauma'
        if (id.includes('sleep') || id.includes('isi') || id.includes('stop') || title.includes('sueño') || title.includes('insomnio')) return 'sleep'
        if (id.includes('sexual') || id.includes('iief') || id.includes('fsfi') || title.includes('sexual')) return 'sexual_health'
        if (id.includes('quality') || id.includes('eq-5d') || id.includes('swls') || id.includes('who-5') || title.includes('calidad de vida') || title.includes('bienestar')) return 'quality_life'
        if (id.includes('family') || id.includes('apgar') || id.includes('zarit') || id.includes('dyadic') || title.includes('familiar') || title.includes('pareja')) return 'family'

        return 'others'
    }

    // Process and categorize tests
    const categories = Array.from(new Set(AVAILABLE_TESTS.map(getCategory))).sort()

    const filteredTests = AVAILABLE_TESTS.filter(test =>
        (test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory === 'all' || getCategory(test) === selectedCategory)
    )

    // Group for display when 'all' is selected, or just list
    const groupedDisplay = selectedCategory === 'all'
        ? categories.reduce((acc, cat) => {
            const output = filteredTests.filter(t => getCategory(t) === cat)
            if (output.length > 0) acc[cat] = output
            return acc
        }, {} as Record<string, TestDefinition[]>)
        : { [selectedCategory]: filteredTests }

    const handleComplete = (result: any) => {
        setOpen(false)
        setSelectedTest(null)
        if (onTestComplete) onTestComplete(result)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 text-muted-foreground border-border hover:bg-accent hover:text-foreground">
                    <ClipboardList className="w-4 h-4" />
                    {t('start_evaluation')}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[95vw] lg:max-w-5xl h-[90vh] lg:h-[85vh] overflow-hidden flex flex-col p-0 gap-0 bg-slate-50 dark:bg-slate-950 rounded-xl">
                {!selectedTest ? (
                    <div className="flex flex-col h-full overflow-hidden">
                        {/* Header Section */}
                        <div className="p-4 lg:p-6 border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-10">
                            <div className="flex justify-between items-start mb-4 lg:mb-6">
                                <div>
                                    <DialogTitle className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-1">
                                        {t('catalog_title')}
                                    </DialogTitle>
                                    <DialogDescription className="text-xs lg:text-sm text-slate-500">
                                        {t('catalog_subtitle')}
                                    </DialogDescription>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] lg:text-xs font-semibold text-slate-600 dark:text-slate-400">
                                    {t('instruments_count', { count: AVAILABLE_TESTS.length })}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder={t('search_placeholder')}
                                        className="pl-9 bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-primary/20"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Category Tabs */}
                            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide mask-fade-right -mx-4 px-4 lg:mx-0 lg:px-0">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${selectedCategory === 'all'
                                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/80'}`}
                                >
                                    {tCats('all')}
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${selectedCategory === cat
                                            ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-600/20 dark:bg-cyan-600 dark:ring-cyan-600/20'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/80'}`}
                                    >
                                        {tCats(cat as any)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* List content */}
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-50/50 dark:bg-slate-950/50">
                            {Object.entries(groupedDisplay).map(([category, tests]) => (
                                <div key={category} className="mb-8 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-cyan-500"></span>
                                        {tCats(category as any)}
                                        <span className="text-xs font-normal text-slate-400 ml-auto">{tests.length}</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {tests.map(test => (
                                            <div
                                                key={test.id}
                                                className="flex flex-col p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:border-teal-500/30 dark:hover:border-cyan-500/30 hover:shadow-md cursor-pointer transition-all group relative overflow-hidden"
                                                onClick={() => setSelectedTest(test)}
                                            >
                                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-teal-700 dark:group-hover:text-cyan-400 transition-colors pr-2">
                                                            {test.title}
                                                        </h4>
                                                        {test.id.length < 5 && (
                                                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-mono uppercase flex-shrink-0">
                                                                {test.id}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                                                        {test.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/50">
                                                    <div className="flex -space-x-1">
                                                        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] text-slate-500 z-10 border border-white dark:border-slate-900">
                                                            {test.questions.length}
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] text-slate-400">{t('items')}</span>

                                                    <div className="ml-auto text-xs font-medium text-teal-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                        {t('start_protocol')} <Play className="w-3 h-3 fill-current" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {filteredTests.length === 0 && (
                                <div className="text-center py-20 flex flex-col items-center justify-center text-slate-400">
                                    <Search className="w-12 h-12 mb-4 opacity-20" />
                                    <p className="text-lg font-medium text-slate-600 dark:text-slate-300">{t('no_results')}</p>
                                    <p className="text-sm">{t('try_search')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedTest(null)}
                                className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                            >
                                ← {t('back_to_list')}
                            </Button>
                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate max-w-md">
                                {selectedTest.title}
                            </h3>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <StepByStepTestRunner
                                test={selectedTest}
                                patientId={patientId}
                                sessionId={sessionId}
                                onComplete={handleComplete}
                            />
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
