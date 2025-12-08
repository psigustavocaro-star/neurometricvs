import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { useTranslations } from "next-intl"

export default function PrivacyPage() {
    const t = useTranslations('Legal.Privacy');
    const tCommon = useTranslations('Legal');

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50/30">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('title')}</h1>
                        <p className="text-slate-500 mb-8 pb-8 border-b border-slate-100">{tCommon('last_updated')}</p>

                        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
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
