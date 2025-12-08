import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard } from "lucide-react"
import { getTranslations } from 'next-intl/server'

export default async function SubscriptionPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const t = await getTranslations('Dashboard.Subscription')

    let currentPlan = 'basic'

    if (user) {
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('plan, status')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single()

        if (subscription) {
            currentPlan = subscription.plan
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t('title')}</h1>
                <p className="text-slate-500">{t('subtitle')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Basic Plan */}
                <Card className={`${currentPlan === 'basic' ? 'border-teal-500 border-2 relative' : ''}`}>
                    {currentPlan === 'basic' && (
                        <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs px-2 py-1 rounded-bl">{t('active_badge')}</div>
                    )}
                    <CardHeader>
                        <CardTitle>{t('Plans.Basic.name')}</CardTitle>
                        <CardDescription>{t('Plans.Basic.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$10<span className="text-sm font-normal text-slate-500">{t('month')}</span></div>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Basic.features.all_tests')}
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Basic.features.pdfs')}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant={currentPlan === 'basic' ? 'outline' : 'default'} disabled={currentPlan === 'basic'} className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-transparent">
                            {currentPlan === 'basic' ? t('current_plan') : `${t('change_plan')} ${t('Plans.Basic.name')}`}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Clinical Plan */}
                <Card className={`${currentPlan === 'clinical' ? 'border-teal-500 border-2 relative' : ''}`}>
                    {currentPlan === 'clinical' && (
                        <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs px-2 py-1 rounded-bl">{t('active_badge')}</div>
                    )}
                    <CardHeader>
                        <CardTitle>{t('Plans.Clinical.name')}</CardTitle>
                        <CardDescription>{t('Plans.Clinical.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$15<span className="text-sm font-normal text-slate-500">{t('month')}</span></div>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Clinical.features.basic_includes')}
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Clinical.features.patient_mgmt')}
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Clinical.features.history')}
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Clinical.features.automation')}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant={currentPlan === 'clinical' ? 'outline' : 'default'} disabled={currentPlan === 'clinical'} className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-transparent">
                            {currentPlan === 'clinical' ? t('current_plan') : `${t('change_plan')} ${t('Plans.Clinical.name')}`}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Anual Plan */}
                <Card className={`${currentPlan === 'pro' ? 'border-teal-500 border-2 relative' : 'border-green-200 bg-green-50/50'}`}>
                    {currentPlan === 'pro' && (
                        <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs px-2 py-1 rounded-bl">{t('active_badge')}</div>
                    )}
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{t('Plans.Pro.name')}</CardTitle>
                                <CardDescription>{t('Plans.Pro.desc')}</CardDescription>
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                64% OFF
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$65<span className="text-sm font-normal text-slate-500">{t('year')}</span></div>
                        <ul className="mt-4 space-y-2 mb-4">
                            <li className="flex items-center text-sm text-slate-700">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> {t('Plans.Pro.features.promo_1')}
                            </li>
                            <li className="flex items-center text-sm text-slate-700">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> {t('Plans.Pro.features.promo_2')}
                            </li>
                            <li className="flex items-center text-sm text-slate-700">
                                <Check className="h-4 w-4 text-green-500 mr-2" /> {t('Plans.Pro.features.promo_3')}
                            </li>
                        </ul>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Pro.features.clinical_includes')}
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Pro.features.billing')}
                            </li>
                            <li className="flex items-center text-sm text-slate-600">
                                <Check className="h-4 w-4 text-teal-500 mr-2" /> {t('Plans.Pro.features.vip_support')}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant={currentPlan === 'pro' ? 'outline' : 'default'}
                            disabled={currentPlan === 'pro'}
                            className={`w-full ${currentPlan !== 'pro' ? 'bg-green-600 hover:bg-green-700' : 'disabled:bg-transparent'}`}
                        >
                            {currentPlan === 'pro' ? t('current_plan') : `${t('change_plan')} ${t('Plans.Pro.name')}`}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('PaymentMethod.title')}</CardTitle>
                    <CardDescription>{t('PaymentMethod.desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-100 p-2 rounded">
                                <CreditCard className="h-6 w-6 text-slate-600" />
                            </div>
                            <div>
                                <p className="font-medium">Visa terminada en 4242</p>
                                <p className="text-sm text-slate-500">{t('PaymentMethod.expires')} 12/2025</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
