"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { NewPatientForm } from "@/app/[locale]/patients/new/patient-form"
import { useTranslations } from "next-intl"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface NewPatientDialogProps {
    trigger?: React.ReactNode
    initialSpecialty?: string
}

export function NewPatientDialog({ trigger, initialSpecialty }: NewPatientDialogProps) {
    const t = useTranslations('Dashboard')
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="h-8 md:h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 border-0 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95">
                        <Plus className="w-3.5 h-3.5 mr-2" />
                        {t('cta.new')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                overlayClassName="backdrop-blur-md bg-black/40"
                className="max-w-[95vw] md:max-w-5xl p-0 overflow-hidden border-none bg-transparent shadow-none"
            >
                <VisuallyHidden>
                    <DialogTitle>Nuevo Paciente</DialogTitle>
                </VisuallyHidden>
                <ScrollArea className="max-h-[90vh] w-full">
                    <div className="p-1">
                        <NewPatientForm
                            initialSpecialty={initialSpecialty}
                            onSuccess={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                        />
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
