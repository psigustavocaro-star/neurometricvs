import { login, signup, resendConfirmation } from './actions'
import { Link } from '@/i18n/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { GoogleLoginButton } from '@/components/auth/google-login-button'
import { PasswordInput } from '@/components/ui/password-input'
import { LoginPageForm } from '@/components/auth/login-page-form'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string, error: string }>
}) {
    const t = await getTranslations('Login')
    const searchParams = await props.searchParams

    const translatedMessage = searchParams.message ? t(searchParams.message as any) : null

    return (
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8 pt-28 md:pt-24 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-x-hidden">

            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] sm:-top-[30%] -left-[15%] w-[80%] sm:w-[60%] h-[60%] rounded-full bg-teal-500/15 blur-[80px] sm:blur-[120px] animate-pulse" />
                <div className="absolute -bottom-[10%] sm:-bottom-[30%] -right-[15%] w-[80%] sm:w-[60%] h-[60%] rounded-full bg-indigo-500/15 blur-[80px] sm:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <Card className="w-full max-w-md relative z-10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl border-slate-200/60 dark:border-slate-800/60 shadow-2xl shadow-slate-300/50 dark:shadow-black/50 rounded-3xl mx-auto">
                <CardHeader className="text-center pb-4 pt-8">
                    {/* Official Neurometrics Logo */}
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
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                        {t('title')}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400 mt-2">
                        {t('description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {searchParams?.error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {t('error_prefix')}: {searchParams.error}
                        </div>
                    )}
                    {translatedMessage && (
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-300 px-4 py-3 rounded-lg text-sm" role="alert">
                            {translatedMessage}
                        </div>
                    )}

                    <LoginPageForm />
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pt-2">
                    <div className="relative w-full py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-transparent px-2 text-slate-500 dark:text-slate-400 font-medium">{t('continue_with')}</span>
                        </div>
                    </div>

                    <GoogleLoginButton
                        label={t('google_login')}
                        className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 h-11 text-slate-700 dark:text-slate-300"
                    />

                    <Link href="/onboarding" className="w-full">
                        <Button variant="outline" className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 h-11 text-slate-700 dark:text-slate-300">
                            {t('create_account')}
                        </Button>
                    </Link>

                    <form action={resendConfirmation} className="w-full">
                        <Button type="submit" variant="link" className="w-full text-xs text-slate-500 hover:text-teal-600 dark:hover:text-teal-400">
                            {t('resend_confirmation')}
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )

}
