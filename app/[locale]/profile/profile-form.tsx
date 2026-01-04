'use client'

import { updateProfile } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { getUserDisplayData } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    User,
    Briefcase,
    IdCard,
    Phone,
    Mail,
    Calendar,
    Moon,
    Sun,
    CreditCard,
    Settings,
    PenTool,
    Check,
    KeyRound,
    Loader2,
    Copy,
    Shield,
    Crown
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ProfileForm({ profile, subscription, user }: { profile: any, subscription?: any, user?: any }) {
    const t = useTranslations('Profile')

    const currentPlan = subscription?.plan || 'basic'
    const [fullName, setFullName] = useState(profile?.full_name || '')
    const [specialty, setSpecialty] = useState(profile?.specialty || '')
    const [registry, setRegistry] = useState(profile?.registry_number || '')
    const [phone, setPhone] = useState(profile?.phone || '')
    const [signature, setSignature] = useState(profile?.signature_url || '')

    // Auth State
    const [email, setEmail] = useState(user?.email || '')
    const [password, setPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [pendingSpecialty, setPendingSpecialty] = useState('')

    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    const handleSpecialtyChange = (value: string) => {
        setPendingSpecialty(value)
        setIsAlertOpen(true)
    }

    const confirmSpecialtyChange = () => {
        setSpecialty(pendingSpecialty)
        setIsAlertOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (password && password !== confirmPassword) {
            toast.error(t('password_mismatch'))
            setLoading(false)
            return
        }

        const formData = new FormData(e.currentTarget)
        formData.append('currentPassword', currentPassword)

        const result = await updateProfile(formData)

        setLoading(false)
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success(t('update_success'))
            if (result?.emailChanged) {
                toast.info(t('email_change_info'))
            }
            if (password) {
                setPassword('') // Clear password field after success
                toast.success(t('password_success'))
            }
        }
    }



    const copyId = () => {
        if (user?.id) {
            navigator.clipboard.writeText(user.id)
            toast.success(t('id_copied'))
        }
    }

    if (!mounted) return null

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('alert.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t.rich('alert.description', {
                                old: specialty,
                                new: pendingSpecialty,
                                b: (chunks) => <span className="font-bold text-slate-900 dark:text-white">{chunks}</span>,
                                teal: (chunks) => <span className="font-bold text-teal-600 dark:text-teal-400">{chunks}</span>
                            })}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('alert.cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmSpecialtyChange}
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                            {t('alert.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t('title')}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t('subtitle')}</p>
                </div>
                <div
                    onClick={copyId}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 w-fit"
                >
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">ID: {user?.id?.substring(0, 12)}...</span>
                    <Copy className="w-3 h-3 text-slate-400" />
                </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full justify-start border-b border-slate-200 dark:border-slate-800 bg-transparent p-0 h-auto rounded-none space-x-6">
                    <TabsTrigger
                        value="profile"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent px-2 py-3 text-slate-500 data-[state=active]:text-teal-600 font-medium text-sm transition-all"
                    >
                        {t('tabs.profile')}
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent px-2 py-3 text-slate-500 data-[state=active]:text-teal-600 font-medium text-sm transition-all"
                    >
                        {t('tabs.security')}
                    </TabsTrigger>
                    <TabsTrigger
                        value="billing"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent px-2 py-3 text-slate-500 data-[state=active]:text-teal-600 font-medium text-sm transition-all"
                    >
                        {t('tabs.billing')}
                    </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="mb-32">
                    {/* PROFILE TAB */}
                    <TabsContent value="profile" className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {/* Avatar Column */}
                            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
                                <div className="mt-4">
                                    <AvatarUpload uid={user?.id} url={profile?.avatar_url} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                                        {fullName || getUserDisplayData(user, profile).displayName}
                                    </h3>
                                    <p className="text-teal-600 dark:text-teal-400 font-medium text-sm">{specialty || 'Especialidad'}</p>
                                </div>
                            </div>

                            {/* Form Column */}
                            <div className="md:col-span-8 space-y-6">
                                <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/20">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">{t('basic_info')}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 gap-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName">{t('full_name')}</Label>
                                                <Input
                                                    id="fullName"
                                                    name="fullName"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className="bg-white dark:bg-slate-950"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="specialty">{t('specialty')}</Label>
                                                <Select name="specialty" value={specialty} onValueChange={handleSpecialtyChange}>
                                                    <SelectTrigger className="bg-white dark:bg-slate-950">
                                                        <SelectValue placeholder={t('specialty_placeholder')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Psicólogo">{t('specialties.psychologist')}</SelectItem>
                                                        <SelectItem value="Psiquiatra">{t('specialties.psychiatrist')}</SelectItem>
                                                        <SelectItem value="Neurólogo">{t('specialties.neurologist')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {/* Hidden input to ensure value is picked up by FormData in onSubmit if needed, although we could also use the state */}
                                                <input type="hidden" name="specialty" value={specialty} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="registryNumber">{t('registry_number')}</Label>
                                                <Input
                                                    id="registryNumber"
                                                    name="registryNumber"
                                                    value={registry}
                                                    onChange={(e) => setRegistry(e.target.value)}
                                                    className="bg-white dark:bg-slate-950"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Signature Preview */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-slate-500 uppercase">{t('signature_preview')}</Label>
                                        <div className="bg-white p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center min-h-[180px] shadow-sm relative overflow-hidden">
                                            {/* Paper Texture */}
                                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/ag-square.png')]"></div>

                                            <div className="w-32 h-px bg-slate-900/10 mb-3"></div>
                                            <div className="font-serif text-center space-y-1 z-10 w-full px-2">
                                                <p className="font-bold text-sm text-slate-900">
                                                    {fullName || getUserDisplayData(user, profile).displayName}
                                                </p>
                                                <p className="text-[11px] text-slate-600 italic">{specialty}</p>
                                                <p className="text-[11px] text-slate-600">{t('reg_short')}: {registry}</p>
                                                <p className="text-[10px] text-slate-500 mt-2 whitespace-pre-wrap leading-tight mx-auto">{signature}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Signature Edit */}
                                    <div className="space-y-2">
                                        <Label htmlFor="signatureUrl" className="text-xs font-semibold text-slate-500 uppercase">{t('additional_credentials')}</Label>
                                        <Textarea
                                            id="signatureUrl"
                                            name="signatureUrl"
                                            value={signature}
                                            onChange={(e) => setSignature(e.target.value)}
                                            className="min-h-[180px] resize-none bg-white dark:bg-slate-950 font-sans text-xs leading-relaxed"
                                            placeholder={t('additional_placeholder')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* SECURITY TAB */}
                    <TabsContent value="security" className="mt-6 max-w-2xl">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">{t('security_title')}</CardTitle>
                                <CardDescription>{t('security_desc')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('email_label')}</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                        <p className="text-[11px] text-slate-500">{t('email_hint')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('phone_label')}</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="pl-10"
                                                placeholder={t('phone_placeholder')}
                                            />
                                        </div>
                                        <p className="text-[11px] text-slate-500">{t('phone_hint')}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{t('change_password')}</h4>

                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">{t('current_password')}</Label>
                                        <div className="relative">
                                            <Shield className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="currentPassword"
                                                name="currentPassword"
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="pl-10 max-w-md"
                                                placeholder={t('current_password_placeholder')}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">{t('new_password')}</Label>
                                            <div className="relative">
                                                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="pl-10"
                                                    placeholder={t('new_password_placeholder')}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
                                            <div className="relative">
                                                <Check className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="pl-10"
                                                    placeholder={t('confirm_password_placeholder')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-500">{t('password_hint')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* BILLING TAB */}
                    <TabsContent value="billing" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Basic */}
                            <Card className={`flex flex-col transition-all cursor-pointer ${currentPlan === 'basic' ? 'ring-2 ring-teal-500 border-transparent shadow-md' : 'hover:border-teal-300 dark:hover:border-teal-700'}`}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{t('billing.basic.name')}</CardTitle>
                                            <CardDescription>{t('billing.basic.desc')}</CardDescription>
                                        </div>
                                        {currentPlan === 'basic' && <Badge className="bg-teal-500 text-white border-none">{t('billing.current_badge')}</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold">$10</span>
                                        <span className="text-slate-500">{t('billing.monthly')}</span>
                                    </div>
                                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                                        {(t.raw('billing.basic.features') as string[]).map((feature, i) => (
                                            <li key={i} className="flex items-center"><Check className="w-4 h-4 mr-2 text-teal-500 shrink-0" /> {feature}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <SubscribeButton
                                        planId="basic"
                                        price={10}
                                        planName="Basic"
                                        currentPlan={currentPlan}
                                        className="w-full"
                                        userId={user?.id}
                                    />
                                </CardFooter>
                            </Card>

                            {/* Clinical */}
                            <Card className={`flex flex-col transition-all cursor-pointer ${currentPlan === 'clinical' ? 'ring-2 ring-teal-500 border-transparent shadow-md' : 'hover:border-teal-300 dark:hover:border-teal-700'}`}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{t('billing.clinical.name')}</CardTitle>
                                            <CardDescription>{t('billing.clinical.desc')}</CardDescription>
                                        </div>
                                        {currentPlan === 'clinical' && <Badge className="bg-teal-500 text-white border-none">{t('billing.current_badge')}</Badge>}
                                        {currentPlan !== 'clinical' && <Badge variant="outline" className="text-[10px] border-teal-500/30 text-teal-600">{t('billing.popular_badge')}</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold">$15</span>
                                        <span className="text-slate-500">{t('billing.monthly')}</span>
                                    </div>
                                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                                        {(t.raw('billing.clinical.features') as string[]).map((feature, i) => (
                                            <li key={i} className="flex items-center"><Check className="w-4 h-4 mr-2 text-teal-500 shrink-0" /> {feature}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <SubscribeButton
                                        planId="clinical"
                                        price={15}
                                        planName="Clinical"
                                        currentPlan={currentPlan}
                                        className="w-full"
                                        userId={user?.id}
                                    />
                                </CardFooter>
                            </Card>

                            {/* Pro */}
                            <Card className={`flex flex-col bg-slate-900 text-white border-none transition-all cursor-pointer ${currentPlan === 'pro' ? 'ring-2 ring-teal-500 shadow-xl' : 'hover:bg-slate-800'}`}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-white">{t('billing.pro.name')}</CardTitle>
                                            <CardDescription className="text-slate-400">{t('billing.pro.desc')}</CardDescription>
                                        </div>
                                        {currentPlan === 'pro' ? (
                                            <Badge className="bg-teal-500 text-white border-none">{t('billing.current_badge')}</Badge>
                                        ) : (
                                            <Badge className="bg-teal-500 text-white border-none text-[10px]">{t('billing.recommended_badge')}</Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold">$65</span>
                                        <span className="text-slate-400">{t('billing.yearly')}</span>
                                        <p className="text-[10px] text-teal-400 font-bold mt-1">{t('billing.monthly_equivalent')}</p>
                                    </div>
                                    <ul className="space-y-3 text-sm text-slate-300 mb-6 font-medium">
                                        {(t.raw('billing.pro.features') as string[]).map((feature, i) => (
                                            <li key={i} className="flex items-center"><Check className="w-4 h-4 mr-2 text-teal-400 shrink-0" /> {feature}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <SubscribeButton
                                        planId="pro"
                                        price={65}
                                        planName="Pro Anual"
                                        currentPlan={currentPlan}
                                        variant="secondary"
                                        userId={user?.id}
                                        className="w-full disabled:bg-slate-800 disabled:text-slate-200 disabled:opacity-100 disabled:border disabled:border-slate-700"
                                    />
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Common Action Bar */}
                    <div className="mt-12 flex justify-end border-t border-slate-200 dark:border-slate-800 pt-8 pb-10">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 hover:bg-slate-800 text-white min-w-[200px] h-12 rounded-full shadow-lg text-base"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {t('saving')}
                                </>
                            ) : (
                                <>
                                    {t('save_changes')}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Tabs>
        </div>
    )
}
