import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { useTranslations } from "next-intl"

export default function PrivacyPage() {
    const t = useTranslations('Legal.Privacy');
    const tCommon = useTranslations('Legal');

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50/30">
            <VerticalNavbar />
            <main className="flex-1 pt-40 pb-20">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">{t('title')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800 font-medium">{tCommon('last_updated')}</p>

                        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400">
                            <h3>{t('intro_title')}</h3>
                            <p>{t('intro_body')}</p>

                            <h3>{t('info_title')}</h3>
                            <p>{t('info_body')}</p>

                            <h3>{t('usage_title')}</h3>
                            <p>{t('usage_body')}</p>

                            <h3>{t('security_title')}</h3>
                            <p>{t('security_body')}</p>

                            <h3>{t('rights_title')}</h3>
                            <p>{t('rights_body')}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
