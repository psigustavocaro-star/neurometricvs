import { useTranslations } from "next-intl"

export default function ResourcesPage() {
    const t = useTranslations('Pricing.Dashboard.Resources')
    return (
        <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-8 h-8 text-teal-600" />
                    {t('title')}
                </h1>
                <p className="text-slate-600 max-w-2xl">
                    {t('description')}
                </p>
            </div>

            <ResourceGrid />
        </div>
    )
}
