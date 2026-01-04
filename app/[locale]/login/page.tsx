import { login, signup, resendConfirmation } from './actions'
import { Link } from '@/i18n/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslations } from 'next-intl/server'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string, error: string }>
}) {
    const t = await getTranslations('Login')
    const searchParams = await props.searchParams

    const translatedMessage = searchParams.message ? t(searchParams.message as any) : null

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden relative">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[100px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px]" />
                <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[80px]" />
            </div>

            <Card className="w-full max-w-md relative z-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30 ring-4 ring-white/50 dark:ring-white/10">
                            <img
                                src="/neurometrics-logo-small.png"
                                alt="Logo"
                                className="w-10 h-10 object-contain brightness-0 invert"
                            />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                        {t('title')}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                        {t('description')}
                    </CardDescription>
                </CardHeader>
                <form>
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
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">{t('email_label')}</Label>
                            <Input
                                id="email" name="email" type="email" required placeholder={t('email_placeholder')}
                                className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">{t('password_label')}</Label>
                            </div>
                            <Input
                                id="password" name="password" type="password" required
                                className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500/20"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-2">
                        <Button formAction={login} className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20 border-0 h-11">
                            {t('submit_button')}
                        </Button>

                        <div className="relative w-full py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent px-2 text-slate-500 dark:text-slate-400 font-medium">{t('continue_with')}</span>
                            </div>
                        </div>

                        <Link href="/onboarding" className="w-full">
                            <Button variant="outline" className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 h-11 text-slate-700 dark:text-slate-300">
                                {t('create_account')}
                            </Button>
                        </Link>

                        <Button formAction={resendConfirmation} variant="link" className="w-full text-xs text-slate-500 hover:text-teal-600 dark:hover:text-teal-400">
                            {t('resend_confirmation')}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )

}
