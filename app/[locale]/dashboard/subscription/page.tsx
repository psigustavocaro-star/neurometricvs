import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { SubscribeButton } from "@/components/dashboard/subscription/subscribe-button"
import { SubscriptionStatusAlert } from "@/components/dashboard/subscription/subscription-status-alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard } from "lucide-react"
import { getTranslations } from 'next-intl/server'
import { cn } from "@/lib/utils"

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
            <SubscriptionStatusAlert />
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
                <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Basic Plan */}
                <Card className={cn(
                    "transition-all duration-300",
                    currentPlan === 'basic' ? 'border-primary border-2 relative scale-105 z-10' : ''
                )}>
                    {currentPlan === 'basic' && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl">{t('active_badge')}</div>
                    )}
                    <CardHeader>
                        <CardTitle>{t('Plans.Basic.name')}</CardTitle>
                        <CardDescription>{t('Plans.Basic.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4 text-foreground">$10<span className="text-sm font-normal text-muted-foreground">{t('month')}</span></div>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Basic.features.all_tests')}
                            </li>
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Basic.features.pdfs')}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <SubscribeButton
                            planId="basic"
                            price={10}
                            planName={t('Plans.Basic.name')}
                            currentPlan={currentPlan}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-transparent"
                        />
                    </CardFooter>
                </Card>

                {/* Clinical Plan */}
                <Card className={cn(
                    "transition-all duration-300",
                    currentPlan === 'clinical' ? 'border-primary border-2 relative scale-105 z-10' : ''
                )}>
                    {currentPlan === 'clinical' && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl">{t('active_badge')}</div>
                    )}
                    <CardHeader>
                        <CardTitle>{t('Plans.Clinical.name')}</CardTitle>
                        <CardDescription>{t('Plans.Clinical.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4 text-foreground">$15<span className="text-sm font-normal text-muted-foreground">{t('month')}</span></div>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Clinical.features.basic_includes')}
                            </li>
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Clinical.features.patient_mgmt')}
                            </li>
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Clinical.features.history')}
                            </li>
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Clinical.features.automation')}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <SubscribeButton
                            planId="clinical"
                            price={15}
                            planName={t('Plans.Clinical.name')}
                            currentPlan={currentPlan}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-transparent"
                        />
                    </CardFooter>
                </Card>

                {/* Pro Anual Plan */}
                <Card className={cn(
                    "transition-all duration-300 hover:shadow-xl",
                    currentPlan === 'pro'
                        ? 'ring-2 ring-primary border-transparent relative scale-105 z-10 shadow-[0_0_20px_rgba(var(--primary),0.15)]'
                        : 'border-primary/10 bg-primary/5'
                )}>
                    {currentPlan === 'pro' && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-bl-xl font-bold">{t('active_badge')}</div>
                    )}
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{t('Plans.Pro.name')}</CardTitle>
                                <CardDescription>{t('Plans.Pro.desc')}</CardDescription>
                            </div>
                            <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
                                64% OFF
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4 text-foreground">$65<span className="text-sm font-normal text-muted-foreground">{t('year')}</span></div>
                        <ul className="mt-4 space-y-2 mb-4">
                            <li className="flex items-center text-sm text-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Pro.features.promo_1')}
                            </li>
                            <li className="flex items-center text-sm text-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Pro.features.promo_2')}
                            </li>
                            <li className="flex items-center text-sm text-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Pro.features.promo_3')}
                            </li>
                        </ul>
                        <ul className="space-y-2 border-t border-border pt-4 mt-4">
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Pro.features.clinical_includes')}
                            </li>
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Pro.features.billing')}
                            </li>
                            <li className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary mr-2" /> {t('Plans.Pro.features.vip_support')}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <SubscribeButton
                            planId="pro"
                            price={65}
                            planName={t('Plans.Pro.name')}
                            currentPlan={currentPlan}
                            className={`w-full ${currentPlan !== 'pro' ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20' : 'disabled:bg-transparent'}`}
                        />
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('PaymentMethod.title')}</CardTitle>
                    <CardDescription>{t('PaymentMethod.desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between border border-border p-4 rounded-xl bg-card transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-muted p-2 rounded-lg">
                                <CreditCard className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Visa terminada en 4242</p>
                                <p className="text-sm text-muted-foreground">{t('PaymentMethod.expires')} 12/2025</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-accent text-muted-foreground hover:text-foreground">Editar</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
