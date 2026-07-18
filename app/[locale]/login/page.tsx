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
    const translatedError = searchParams.error
        ? (t.has(`errors.${searchParams.error}` as any) ? t(`errors.${searchParams.error}` as any) : t('errors.unknown' as any))
        : null

    return (
        <div className="grid min-h-screen lg:grid-cols-[1.15fr_.85fr] bg-[#eef4f3] dark:bg-[#050a12]">
            <div className="relative hidden overflow-hidden bg-slate-950 lg:block">
                <Image src="/neurometrics-clinical-intelligence.png" alt="Neurometrics Clinical OS" fill priority className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/10" />
                <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
                    <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-slate-950/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-xl">
                        <span className="size-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_rgba(94,234,212,0.8)]" /> Clinical intelligence OS
                    </div>
                </div>
            </div>
            <div className="relative flex items-center justify-center p-5 sm:p-8 md:p-12">
                <div aria-hidden className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.035)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-20" />
            <Card className="w-full max-w-md relative z-10 border-0 bg-transparent shadow-none backdrop-blur-none mx-auto dark:bg-transparent">
                <CardHeader className="text-center pb-4 pt-8">
                    {/* Official Neurometrics Logo */}
                    <div className="flex justify-center mb-6">
                        <Link href="/" className="group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-teal-400 blur-xl opacity-15 group-hover:opacity-30 transition-opacity rounded-full scale-150" />
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
                    <div className="nm-eyebrow justify-center">Secure clinical access</div>
                    <CardTitle className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">
                        {t('title')}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400 mt-2">
                        {t('description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {translatedError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {translatedError}
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
        </div>
    )

}
