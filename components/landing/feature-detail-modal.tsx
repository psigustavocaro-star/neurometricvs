'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight, Check, X } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface FeatureDetailModalProps {
    featureKey: string
    icon: LucideIcon
    iconColor: string
    iconBg: string
    children: React.ReactNode
}

export function FeatureDetailModal({
    featureKey,
    icon: Icon,
    iconColor,
    iconBg,
    children
}: FeatureDetailModalProps) {
    const t = useTranslations('FeaturesPage')
    const tModal = useTranslations('FeatureModal')
    const [isOpen, setIsOpen] = useState(false)

    // Get benefits from translations (array of strings)
    const benefits = tModal.raw(`${featureKey}.benefits`) as string[] | undefined

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl bg-transparent"
                overlayClassName="backdrop-blur-xl bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70"
                showCloseButton={false}
            >
                {/* Bokeh effect circles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-teal-500/20 blur-[80px] animate-pulse" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-[100px] animate-pulse animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-teal-400/10 blur-[60px] animate-pulse animation-delay-4000" />
                </div>

                {/* Modal content with glass effect */}
                <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl">
                    {/* Close button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </button>

                    {/* Header */}
                    <div className="p-8 pb-6">
                        <DialogHeader className="space-y-4">
                            <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center shadow-lg`}>
                                <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={1.5} />
                            </div>
                            <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                {t(`${featureKey}.title`)}
                            </DialogTitle>
                            <DialogDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                {tModal(`${featureKey}.detailed_description`)}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Benefits section */}
                    <div className="px-8 pb-6">
                        <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                            {tModal('benefits_title')}
                        </h4>
                        <ul className="space-y-3">
                            {Array.isArray(benefits) && benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="mt-0.5 p-1 rounded-full bg-teal-500/20">
                                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer with CTA */}
                    <div className="px-8 py-6 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-700/50 rounded-b-2xl">
                        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {tModal('cta_hint')}
                            </p>
                            <Button
                                asChild
                                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 shadow-lg shadow-teal-600/20 group"
                            >
                                <Link href="/onboarding">
                                    {tModal('cta_button')}
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
