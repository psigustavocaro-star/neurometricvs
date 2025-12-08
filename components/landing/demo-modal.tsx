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
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-slate-50 border-none shadow-2xl">
                <div className="p-6 pb-0">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-bold text-slate-900">
                            {t('title')}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            {t('subtitle')}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 pt-0">
                    <DemoPlayer />
                </div>

                <div className="bg-white p-4 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex gap-2">
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{t('preview')}</span>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                        {t('cta')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
