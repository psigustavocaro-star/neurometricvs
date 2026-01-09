import { VerticalNavbar } from "@/components/layout/vertical-navbar"
import { Footer } from "@/components/layout/footer"
import { useTranslations } from "next-intl"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export default function AboutPage() {
    const t = useTranslations('About');

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50/30">
            <VerticalNavbar />
            <main className="flex-1 pt-40 pb-20 relative">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <ScrollAnimation animation="fade-up">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">{t('title')}</h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </ScrollAnimation>
                    </div>

                    <div className="max-w-4xl mx-auto mb-24 bg-white dark:bg-slate-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-none">
                                <div className="h-16 w-16 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl">
                                    🩺
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('story_title')}</h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                    {t('story_p1')}
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                    {t('story_p2')}
                                </p>
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                                    <p className="font-handwriting text-2xl text-teal-600 dark:text-teal-400 transform -rotate-2">
                                        Gustavo Caro
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{t('founder_title')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center">{t('philosophy.title')}</h2>
                        <div className="grid sm:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                                <div className="text-4xl mb-4 bg-blue-50 dark:bg-blue-900/20 w-12 h-12 flex items-center justify-center rounded-xl">🔬</div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{t('philosophy.scientific_rigor.title')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t('philosophy.scientific_rigor.desc')}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                                <div className="text-4xl mb-4 bg-teal-50 dark:bg-teal-900/20 w-12 h-12 flex items-center justify-center rounded-xl">🔒</div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{t('philosophy.total_privacy.title')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t('philosophy.total_privacy.desc')}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                                <div className="text-4xl mb-4 bg-amber-50 dark:bg-amber-900/20 w-12 h-12 flex items-center justify-center rounded-xl">💡</div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{t('philosophy.constant_innovation.title')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t('philosophy.constant_innovation.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
