import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Brain, Home, ArrowLeft, Search } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
    const t = await getTranslations('NotFound')

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[60%] rounded-full bg-teal-500/10 blur-[120px] animate-pulse" />
                <div className="absolute -bottom-[30%] -right-[15%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 text-center max-w-lg mx-auto">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-teal-500/30">
                        <Brain className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Error Code */}
                <div className="relative mb-6">
                    <h1 className="text-[120px] sm:text-[180px] font-black tracking-tighter leading-none bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-700 dark:to-slate-900 bg-clip-text text-transparent select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Search className="w-16 h-16 text-teal-500/50 dark:text-teal-400/50" />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    {t('title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                    {t('description')}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20 h-12 px-8 rounded-2xl font-bold">
                        <Link href="/">
                            <Home className="w-4 h-4 mr-2" />
                            {t('go_home')}
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-2xl font-bold border-slate-200 dark:border-slate-800">
                        <Link href="/dashboard">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('go_dashboard')}
                        </Link>
                    </Button>
                </div>

                {/* Footer */}
                <div className="mt-12 flex items-center justify-center gap-2 opacity-40">
                    <Brain className="w-4 h-4 text-teal-500" />
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase text-slate-600 dark:text-slate-400">NEUROMETRICS</span>
                </div>
            </div>
        </div>
    )
}
