export type QuestionType = 'single_choice' | 'multiple_choice' | 'scale' | 'text'

export interface Option {
    label: string
    value: number | string
}

export interface Question {
    id: string
    text: string
    type: QuestionType
    options?: Option[]
    min?: number
    max?: number
}

export interface ScoringRange {
    min: number
    max: number
    label: string
    color: string
}

export interface Subscale {
    id: string
    name: string
    questionIds: string[]
    scoringType?: 'sum' | 'average'
    ranges: ScoringRange[]
}

export interface TestDefinition {
    id: string
    title: string
    description: string
    questions: Question[]
    scoring?: {
        type?: 'sum' | 'average'
        ranges: ScoringRange[]
    }
    subscales?: Subscale[]
}
