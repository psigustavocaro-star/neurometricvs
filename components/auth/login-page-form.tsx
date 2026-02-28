'use client'

import { useState, useEffect } from 'react'
import { login } from '@/app/[locale]/login/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from '@/components/ui/password-input'
import { useTranslations } from 'next-intl'

export function LoginPageForm() {
    const t = useTranslations('Login')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const savedEmail = localStorage.getItem('remembered_email')
        if (savedEmail) {
            setEmail(savedEmail)
        }
    }, [])

    const handleFormAction = async (formData: FormData) => {
        const remember = formData.get('remember') === 'on'
        const emailValue = formData.get('email') as string

        if (remember) {
            localStorage.setItem('remembered_email', emailValue)
        } else {
            localStorage.removeItem('remembered_email')
        }

        await login(formData)
    }

    return (
        <form action={handleFormAction}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">{t('email_label')}</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t('email_placeholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500/20"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">{t('password_label')}</Label>
                    </div>
                    <PasswordInput
                        id="password"
                        name="password"
                        required
                        className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500/20"
                    />
                </div>

                <div className="flex items-center space-x-2 py-1">
                    <input
                        type="checkbox"
                        id="remember-login"
                        name="remember"
                        defaultChecked={!!email}
                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-teal-600 focus:ring-teal-500 dark:bg-slate-950 transition-colors cursor-pointer"
                    />
                    <Label htmlFor="remember-login" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none font-medium">
                        {t('remember_me')}
                    </Label>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20 border-0 h-11">
                    {t('submit_button')}
                </Button>
            </div>
        </form>
    )
}
