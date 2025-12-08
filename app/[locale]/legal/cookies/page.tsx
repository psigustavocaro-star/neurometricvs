import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { useTranslations } from "next-intl"

export default function CookiesPage() {
    const t = useTranslations('Legal.Cookies');
    const tCommon = useTranslations('Legal');

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50/30">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('title')}</h1>
                        <p className="text-slate-500 mb-8 pb-8 border-b border-slate-100">{tCommon('last_updated')}</p>

                        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600">
                            <h3>{t('what_title')}</h3>
                            <p>{t('what_body')}</p>

                            <h3>{t('how_title')}</h3>
                            <p>{t('how_body')}</p>
                            <ul>
                                <li>{t('list_1')}</li>
                                <li>{t('list_2')}</li>
                                <li>{t('list_3')}</li>
                            </ul>

                            <h3>{t('types_title')}</h3>
                            <p><strong>{t('essential').split(':')[0]}:</strong>{t('essential').split(':')[1]}</p>
                            <p><strong>{t('analytical').split(':')[0]}:</strong>{t('analytical').split(':')[1]}</p>

                            <h3>{t('control_title')}</h3>
                            <p>{t('control_body')}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
