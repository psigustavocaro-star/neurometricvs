'use client'

import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Loader2, CheckCircle2 } from "lucide-react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { submitContactForm } from "./actions"
import { useEffect, useRef } from "react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { useTranslations } from "next-intl"

function SubmitButton() {
    const { pending } = useFormStatus()
    const t = useTranslations('Contact.form')
    return (
        <Button disabled={pending} type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('sending')}
                </>
            ) : (
                t('submit')
            )}
        </Button>
    )
}

export default function ContactPage() {
    const t = useTranslations('Contact')
    const [state, formAction] = useActionState(submitContactForm, { message: '', errors: {} })
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <VerticalNavbar />
            <main className="flex-1 pt-40 pb-20">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
                        <ScrollAnimation animation="fade-up">
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">{t('title')}</h1>
                                <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
                                    {t('subtitle')}
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                                            <p className="text-slate-600 dark:text-slate-300">contacto@neurometricslatam.com</p>
                                            <p className="text-slate-600 dark:text-slate-300">soporte@neurometricslatam.com</p>
                                        </div>
                                    </div>




                                </div>
                            </div>

                            <ScrollAnimation animation="fade-up" delay={200}>
                                <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                                    {state.success ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('form.success_title')}</h3>
                                            <p className="text-slate-600 mb-6">{state.message}</p>
                                            <Button onClick={() => window.location.reload()} variant="outline">
                                                {t('form.send_another')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <form ref={formRef} action={formAction} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">{t('form.name')}</Label>
                                                    <Input id="name" name="name" placeholder={t('form.name_placeholder')} required aria-describedby="name-error" />
                                                    {state.errors?.name && <p id="name-error" className="text-sm text-red-500">{state.errors.name[0]}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastname">{t('form.lastname')}</Label>
                                                    <Input id="lastname" name="lastname" placeholder={t('form.lastname_placeholder')} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">{t('form.email')}</Label>
                                                <Input id="email" name="email" type="email" placeholder={t('form.email_placeholder')} required aria-describedby="email-error" />
                                                {state.errors?.email && <p id="email-error" className="text-sm text-red-500">{state.errors.email[0]}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subject">{t('form.subject')}</Label>
                                                <Input id="subject" name="subject" placeholder={t('form.subject_placeholder')} required aria-describedby="subject-error" />
                                                {state.errors?.subject && <p id="subject-error" className="text-sm text-red-500">{state.errors.subject[0]}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message">{t('form.message')}</Label>
                                                <Textarea id="message" name="message" placeholder={t('form.message_placeholder')} className="min-h-[120px]" required aria-describedby="message-error" />
                                                {state.errors?.message && <p id="message-error" className="text-sm text-red-500">{state.errors.message[0]}</p>}
                                            </div>
                                            <div className="text-sm text-red-500">{state.message && !state.success && state.message}</div>
                                            <SubmitButton />
                                        </form>
                                    )}
                                </div>
                            </ScrollAnimation>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
