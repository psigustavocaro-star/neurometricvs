export type QuestionType = 'single_choice' | 'multiple_choice' | 'scale' | 'text' | 'info'

export interface Option {
    label: string
    value: number | string
}

export interface Question {
    id: string
    text: string
    type?: QuestionType
    options?: Option[]
    min?: number
    max?: number
}

export interface ScoringRange {
    min: number
    max: number
    label: string
    color: string
    description?: string
}

export interface Subscale {
    id: string
    name: string
    questionIds: string[]
    scoringType?: 'sum' | 'average'
    ranges?: ScoringRange[]
    description?: string
}

export type UIType = 'list' | 'blocks' | 'story' | 'custom'

export interface TestDefinition {
    id: string
    title: string
    description: string
    instructions?: string
    authors?: string
    reference?: string
    category?: 'neurology' | 'psychiatry' | 'psychology' | 'geriatrics' | 'pediatrics' | 'other'
    duration?: string
    uiType?: UIType
    questions: Question[]
    scoring?: {
        type?: 'sum' | 'average'
        ranges?: ScoringRange[]
        interpretation?: string
        calculate?: (answers: Record<string, number>) => number | any
        interpret?: (result: number | any) => string
    }
    subscales?: Subscale[]
    reportConfig?: {
        chartType?: 'bar' | 'radar' | 'line'
        showResponseTable?: boolean
        customInterpretationTemplate?: string
        apaCategory?: string
    }
}
