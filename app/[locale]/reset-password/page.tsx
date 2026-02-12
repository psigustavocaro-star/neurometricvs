'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { PasswordInput } from '@/components/ui/password-input'
import { CheckCircle2, Loader2, Lock } from 'lucide-react'

export default function ResetPasswordPage() {
    const t = useTranslations('ResetPassword')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError(t('error_mismatch'))
            return
        }

        setIsLoading(true)
        setError(null)

        const supabase = createClient()
        const { error: updateError } = await supabase.auth.updateUser({
            password: password
        })

        if (updateError) {
            setError(updateError.message)
            setIsLoading(false)
            return
        }

        setIsSuccess(true)
        setIsLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8 pt-28 md:pt-24 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] sm:-top-[30%] -left-[15%] w-[80%] sm:w-[60%] h-[60%] rounded-full bg-teal-500/15 blur-[80px] sm:blur-[120px] animate-pulse" />
                <div className="absolute -bottom-[10%] sm:-bottom-[30%] -right-[15%] w-[80%] sm:w-[60%] h-[60%] rounded-full bg-indigo-500/15 blur-[80px] sm:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <Card className="w-full max-w-md relative z-10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl border-slate-200/60 dark:border-slate-800/60 shadow-2xl shadow-slate-300/50 dark:shadow-black/50 rounded-3xl mx-auto">
                <CardHeader className="text-center pb-4 pt-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Link href="/" className="group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-teal-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full scale-150" />
                                <Image
                                    src="/logo.png"
                                    alt="Neurometrics"
                                    width={180}
                                    height={50}
                                    className="h-12 w-auto relative z-10 dark:brightness-0 dark:invert transition-transform group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {isSuccess ? (
                        <>
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                                {t('success_title')}
                            </CardTitle>
                            <CardDescription className="text-base text-slate-600 dark:text-slate-400 mt-2">
                                {t('success_message')}
                            </CardDescription>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                                    <Lock className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                                {t('title')}
                            </CardTitle>
                            <CardDescription className="text-base text-slate-600 dark:text-slate-400 mt-2">
                                {t('description')}
                            </CardDescription>
                        </>
                    )}
                </CardHeader>

                {isSuccess ? (
                    <CardFooter className="flex flex-col gap-4 pt-2 pb-8">
                        <Link href="/login" className="w-full">
                            <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20 border-0 h-11">
                                {t('go_to_login')}
                            </Button>
                        </Link>
                    </CardFooter>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">{t('password_label')}</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">{t('confirm_label')}</Label>
                                <PasswordInput
                                    id="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500/20 ${confirmPassword && password !== confirmPassword ? 'border-red-500' : ''
                                        }`}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading || !password || !confirmPassword}
                                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20 border-0 h-11"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('submit_button')}
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </div>
    )
}
