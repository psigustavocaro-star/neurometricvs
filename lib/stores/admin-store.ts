import { create } from 'zustand'

export type UserRole = 'psychologist' | 'psychiatrist' | 'neurologist' | 'physician' | 'occupational_therapist' | 'speech_therapist' | 'psychopedagogue' | 'nutritionist'

export type SubscriptionPlan = 'free' | 'basic' | 'clinical' | 'pro'

interface AdminState {
    currentRole: UserRole
    currentPlan: SubscriptionPlan
    setRole: (role: UserRole) => void
    setPlan: (plan: SubscriptionPlan) => void
    isSimulating: boolean
    toggleSimulation: () => void
    fillFormTrigger: number
    triggerFillForm: () => void
}

export const useAdminStore = create<AdminState>((set) => ({
    currentRole: 'psychologist', // Default
    currentPlan: 'pro', // Default to pro for viewing everything
    isSimulating: false,
    fillFormTrigger: 0,
    setRole: (role) => set({ currentRole: role, isSimulating: true }),
    setPlan: (plan) => set({ currentPlan: plan, isSimulating: true }),
    toggleSimulation: () => set((state) => ({ isSimulating: !state.isSimulating })),
    triggerFillForm: () => set({ fillFormTrigger: Date.now() })
}))
