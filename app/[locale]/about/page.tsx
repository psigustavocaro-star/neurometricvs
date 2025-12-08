import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { useTranslations } from "next-intl"

export default function AboutPage() {
    const t = useTranslations('About');

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50/30">
            <VerticalNavbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">{t('title')}</h1>
                        <p className="text-xl text-slate-500 leading-relaxed font-light">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto mb-24 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-none">
                                <div className="h-16 w-16 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl">
                                    🩺
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-800">{t('story_title')}</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {t('story_p1')}
                                </p>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {t('story_p2')}
                                </p>
                                <div className="pt-4 border-t border-slate-100 mt-6">
                                    <p className="font-handwriting text-2xl text-teal-600 transform -rotate-2">
                                        Gustavo Caro
                                    </p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Founder & CEO</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">{t('philosophy.title')}</h2>
                        <div className="grid sm:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-xl">🔬</div>
                                <h3 className="font-bold text-slate-900 text-lg mb-2">{t('philosophy.scientific_rigor.title')}</h3>
                                <p className="text-slate-500 leading-relaxed">{t('philosophy.scientific_rigor.desc')}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4 bg-teal-50 w-12 h-12 flex items-center justify-center rounded-xl">🔒</div>
                                <h3 className="font-bold text-slate-900 text-lg mb-2">{t('philosophy.total_privacy.title')}</h3>
                                <p className="text-slate-500 leading-relaxed">{t('philosophy.total_privacy.desc')}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4 bg-amber-50 w-12 h-12 flex items-center justify-center rounded-xl">💡</div>
                                <h3 className="font-bold text-slate-900 text-lg mb-2">{t('philosophy.constant_innovation.title')}</h3>
                                <p className="text-slate-500 leading-relaxed">{t('philosophy.constant_innovation.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
