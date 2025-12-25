/**
 * Shared Plan Configuration
 * This file defines all plan features and pricing data.
 * Used across: Pricing Page, Landing Section, Onboarding, Workstation.
 */

export type PlanId = 'free' | 'basic' | 'clinical' | 'pro'

export interface PlanFeature {
    text: string
    included: boolean
}

export interface PlanConfig {
    id: PlanId
    name: string
    subtitle: string
    priceUSD: number
    period: 'month' | 'year'
    features: string[]
    excludedFeatures?: string[]
    badge?: string
    highlight?: boolean
    savingsPercent?: number
    equivalentMonthly?: number
    priceIdEnvKey?: string
}

export const PLAN_CONFIGS: PlanConfig[] = [
    {
        id: 'free',
        name: 'Gratuita',
        subtitle: 'Modo Lectura / Exploración',
        priceUSD: 0,
        period: 'month',
        features: [
            'Ver biblioteca de tests',
            'Filtrado por profesión',
        ],
        excludedFeatures: [
            'Uso de tests y corrección',
        ],
        highlight: false,
    },
    {
        id: 'basic',
        name: 'Básico',
        subtitle: 'Para iniciar',
        priceUSD: 10,
        period: 'month',
        features: [
            'Acceso total a todos los tests',
            'Tabulación automática',
            'PDF con firma profesional',
            'Enviar tests a pacientes',
        ],
        excludedFeatures: [
            'Ficha clínica',
            'Gestión de pacientes',
        ],
        priceIdEnvKey: 'NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC',
        highlight: false,
    },
    {
        id: 'clinical',
        name: 'Clínico',
        subtitle: 'Profesionales',
        priceUSD: 15,
        period: 'month',
        features: [
            'Todo lo del Básico',
            'Gestión de Pacientes',
            'Ficha clínica completa',
            'Recursos de aplicación en consulta',
        ],
        badge: 'MÁS POPULAR',
        priceIdEnvKey: 'NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL',
        highlight: true,
    },
    {
        id: 'pro',
        name: 'Pro Anual',
        subtitle: 'Ahorra 65%',
        priceUSD: 65,
        period: 'year',
        features: [
            'Todo lo del Clínico',
            'Soporte VIP',
            '4 meses gratis',
        ],
        badge: 'RECOMENDADO',
        priceIdEnvKey: 'NEXT_PUBLIC_PADDLE_PRICE_ID_PRO',
        savingsPercent: 65,
        equivalentMonthly: 5.41,
        highlight: false,
    },
]

export function getPlanById(id: PlanId): PlanConfig | undefined {
    return PLAN_CONFIGS.find(p => p.id === id)
}

export function canAccessPatients(plan: PlanId | string | undefined): boolean {
    return plan === 'clinical' || plan === 'pro'
}

export function canAccessTests(plan: PlanId | string | undefined): boolean {
    return plan === 'basic' || plan === 'clinical' || plan === 'pro'
}
