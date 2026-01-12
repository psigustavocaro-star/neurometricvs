import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { ShieldCheck, Lock, Server } from "lucide-react"
import { useTranslations } from "next-intl"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export default function SecurityPage() {
    const t = useTranslations('Legal.Security');

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50/30 dark:bg-slate-950">
            <VerticalNavbar />
            <main className="flex-1 pt-40 pb-20">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto relative z-10">
                    <ScrollAnimation animation="fade-up">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">{t('title')}</h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto">{t('subtitle')}</p>
                        </div>
                    </ScrollAnimation>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t('encryption_title')}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('encryption_desc')}</p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Server className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t('infra_title')}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('infra_desc')}</p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t('compliance_title')}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('compliance_desc')}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400">
                            <h3>{t('access_title')}</h3>
                            <p>{t('access_body')}</p>

                            <h3>{t('backup_title')}</h3>
                            <p>{t('backup_body')}</p>

                            <h3>{t('report_title')}</h3>
                            <p>{t('report_body')}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
