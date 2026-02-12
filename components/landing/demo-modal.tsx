'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DemoPlayer } from "@/components/landing/demo-player"
import { Play } from "lucide-react"
import { Link } from "@/i18n/navigation"

interface DemoModalProps {
    children: React.ReactNode
}

import { useTranslations } from "next-intl"

export function DemoModal({ children }: DemoModalProps) {
    const t = useTranslations('DemoModal');

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[92vw] sm:max-w-[800px] p-0 overflow-hidden bg-slate-50 dark:bg-slate-950 border-none shadow-2xl rounded-2xl sm:rounded-3xl">
                <div className="p-4 md:p-6 pb-0">
                    <DialogHeader className="mb-2 md:mb-4">
                        <DialogTitle className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                            {t('title')}
                        </DialogTitle>
                        <DialogDescription className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            {t('subtitle')}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-4 md:p-6 pt-0">
                    <DemoPlayer />
                </div>

                <div className="bg-white dark:bg-slate-900/60 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex gap-2">
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('preview')}</span>
                    </div>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-full">
                        <Link href="/onboarding">
                            {t('cta')}
                        </Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
