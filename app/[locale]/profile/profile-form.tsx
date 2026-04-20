'use client'

import { updateProfile, deleteAccount, cancelSubscription } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from "next-themes"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { SubscribeButton } from "@/components/dashboard/subscription/subscribe-button"
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
    Crown,
    Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function ProfileForm({ profile, subscription, user, initialTab = 'profile' }: { profile: any, subscription?: any, user?: any, initialTab?: string }) {
    const t = useTranslations('Profile')

    const currentPlan = subscription?.plan || 'free'
    const [fullName, setFullName] = useState(profile?.full_name || '')
    const [specialty, setSpecialty] = useState(profile?.specialty || '')
    const [registry, setRegistry] = useState(profile?.registry_number || '')
    const [phone, setPhone] = useState(profile?.phone || '')
    const [signature, setSignature] = useState(profile?.signature_url || '')
    const [avatarUrl, setAvatarUrl] = useState(getUserDisplayData(user, profile).avatarUrl || '')

    // Auth State
    const [email, setEmail] = useState(user?.email || '')
    const [password, setPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [isCancelingAuth, setIsCancelingAuth] = useState(false)
    const [showCancelAlert, setShowCancelAlert] = useState(false)

    // Derived states
    const isFreeActive = subscription?.plan === 'free' || !subscription
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [pendingSpecialty, setPendingSpecialty] = useState('')
    const [selectedPlan, setSelectedPlan] = useState(currentPlan)
    const [activeTab, setActiveTab] = useState(initialTab)
    const [isTabLoading, setIsTabLoading] = useState(false)

    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    const handleSpecialtyChange = (value: string) => {
        setPendingSpecialty(value)
        setIsAlertOpen(true)
    }

    const handleTabChange = (value: string) => {
        setIsTabLoading(true)
        // Set a brief authentic-feeling pause before actually switching content
        setTimeout(() => {
            setActiveTab(value)
            setIsTabLoading(false)
        }, 300)
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
        formData.append('avatarUrl', avatarUrl)

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
        setIsTabLoading(false)
    }

    const handleDeleteAccount = async () => {
        setIsDeleting(true)
        const result = await deleteAccount()
        if (result.error) {
            toast.error(result.error)
            setIsDeleting(false)
        } else {
            toast.success("Cuenta eliminada exitosamente")
            window.location.href = '/' // force full reload to clean cache and session and redirect
        }
    }

    const handleCancelSubscription = async () => {
        setIsCancelingAuth(true)
        const result = await cancelSubscription()
        if (result.error) {
            toast.error(result.error)
            setIsCancelingAuth(false)
        } else {
            toast.success("Suscripción cancelada exitosamente")
            window.location.reload()
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
        <div className="space-y-8 animate-in fade-in duration-500 w-full mb-32">
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-2 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                        <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">{t('title')}</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none capitalize">
                        {fullName || getUserDisplayData(user, profile).displayName}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">{t('subtitle')}</p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full relative min-h-[500px]">
                <div className="overflow-x-auto -mx-4 px-4 scrollbar-none">
                    <TabsList className="w-full sm:w-auto inline-flex items-center justify-start sm:justify-center p-1.5 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl sm:rounded-full gap-2 mb-8 mt-6 overflow-x-auto scrollbar-none shadow-inner border border-slate-200/50 dark:border-slate-800/50">
                        <TabsTrigger
                            value="profile"
                            className="flex-1 sm:flex-none rounded-xl sm:rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-200/50 dark:data-[state=active]:ring-teal-500/20 px-5 sm:px-8 py-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all whitespace-nowrap"
                        >
                            {t('tabs.profile')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="flex-1 sm:flex-none rounded-xl sm:rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-200/50 dark:data-[state=active]:ring-teal-500/20 px-5 sm:px-8 py-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all whitespace-nowrap"
                        >
                            {t('tabs.security')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="billing"
                            className="flex-1 sm:flex-none rounded-xl sm:rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-200/50 dark:data-[state=active]:ring-teal-500/20 px-5 sm:px-8 py-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all whitespace-nowrap"
                        >
                            {t('tabs.billing')}
                        </TabsTrigger>
                    </TabsList>
                </div>

                <form onSubmit={handleSubmit} className="relative">
                    {/* Fake Loading Overlay during Tab Change */}
                    {isTabLoading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-sm rounded-3xl animate-in fade-in duration-200">
                            <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
                        </div>
                    )}

                    {/* PROFILE TAB */}
                    <TabsContent value="profile" className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto">
                            {/* Avatar Column */}
                            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
                                <div className="mt-4">
                                    <AvatarUpload uid={user?.id} url={avatarUrl} onUploadComplete={setAvatarUrl} />
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
                                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('basic_info')}</CardTitle>
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
                                                        <SelectItem value="Psicólogo/a">{t('specialties.psychologist')}</SelectItem>
                                                        <SelectItem value="Psiquiatra">{t('specialties.psychiatrist')}</SelectItem>
                                                        <SelectItem value="Neurólogo/a">{t('specialties.neurologist')}</SelectItem>
                                                        <SelectItem value="Médico General">{t('specialties.physician')}</SelectItem>
                                                        <SelectItem value="Terapeuta Ocupacional">{t('specialties.occupational_therapist')}</SelectItem>
                                                        <SelectItem value="Fonoaudiólogo/a">{t('specialties.speech_therapist')}</SelectItem>
                                                        <SelectItem value="Nutricionista">{t('specialties.nutritionist')}</SelectItem>
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
                                        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center min-h-[180px] shadow-sm relative overflow-hidden transition-all duration-300">
                                            {/* Paper Texture */}
                                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/ag-square.png')]"></div>

                                            <div className="w-32 h-px bg-slate-900/10 dark:bg-slate-100/10 mb-3"></div>
                                            <div className="font-serif text-center space-y-1 z-10 w-full px-2">
                                                <p className="font-bold text-sm text-slate-900 dark:text-white">
                                                    {fullName || getUserDisplayData(user, profile).displayName}
                                                </p>
                                                <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">{specialty}</p>
                                                <p className="text-[11px] text-slate-600 dark:text-slate-400">{t('reg_short')}: {registry}</p>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-2 whitespace-pre-wrap leading-tight mx-auto">{signature}</p>
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
                    <TabsContent value="security" className="mt-6">
                        <div className="max-w-4xl mx-auto space-y-10">
                            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50">
                                <CardHeader>
                                    <CardTitle className="text-xl">{t('security_title')}</CardTitle>
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
                                                <PasswordInput
                                                    id="currentPassword"
                                                    name="currentPassword"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    className="pl-10"
                                                    placeholder={t('current_password_placeholder')}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="password">{t('new_password')}</Label>
                                                <div className="relative">
                                                    <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                    <PasswordInput
                                                        id="password"
                                                        name="password"
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
                                                    <PasswordInput
                                                        id="confirmPassword"
                                                        name="confirmPassword"
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

                            <div className="space-y-4 pt-4">
                                <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 px-1">
                                    <Shield className="w-5 h-5" /> {t('account_actions.danger_zone')}
                                </h3>
                                <Card className="border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 shadow-none">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                            <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                                                <p className="font-bold text-slate-900 dark:text-rose-50 text-base">{t('account_actions.delete_account_title')}</p>
                                                <p className="leading-relaxed max-w-xl" dangerouslySetInnerHTML={{ __html: t.raw('account_actions.delete_account_desc') }} />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                className="shrink-0 w-full sm:w-auto font-bold shadow-sm"
                                                onClick={() => setShowDeleteAlert(true)}
                                            >
                                                {t('account_actions.delete_account_btn')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{t('account_actions.delete_confirm_title')}</AlertDialogTitle>
                                    <AlertDialogDescription className="space-y-3">
                                        <p>{t('account_actions.delete_confirm_desc_1')}</p>

                                        {!isFreeActive ? (
                                            <p className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-800 dark:text-rose-400 rounded-lg text-sm font-semibold" dangerouslySetInnerHTML={{ __html: t.raw('account_actions.delete_confirm_desc_2_paid') }} />
                                        ) : (
                                            <p className="font-medium text-rose-600 dark:text-rose-400">
                                                {t('account_actions.delete_confirm_desc_2_free')}
                                            </p>
                                        )}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{t('account_actions.cancel')}</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-600"
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? t('account_actions.deleting') : t('account_actions.delete_yes')}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TabsContent>

                    {/* BILLING TAB */}
                    <TabsContent value="billing" className="mt-6 sm:mt-8 px-1 sm:px-2 pb-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto py-4">
                            {/* Basic */}
                            <motion.div
                                onClick={() => setSelectedPlan('free')}
                                initial={false}
                                animate={{
                                    scale: selectedPlan === 'free' ? 1.05 : 1,
                                    zIndex: selectedPlan === 'free' ? 20 : 10
                                }}
                                whileHover={{ scale: selectedPlan === 'free' ? 1.07 : 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="group relative"
                            >
                                <Card className={`flex flex-col h-full transition-all cursor-pointer relative border-slate-200/60 dark:border-slate-800/60 ${selectedPlan === 'free' ? 'ring-4 ring-teal-500/50 shadow-[0_8px_30px_rgb(20,184,166,0.2)] bg-white dark:bg-slate-900 translate-y-[-8px]' : 'hover:shadow-xl opacity-80 hover:opacity-100 shadow-md bg-slate-50/50 dark:bg-slate-900/50'}`}>
                                    {/* Selection Glow */}
                                    {selectedPlan === 'free' && (
                                        <div className="absolute inset-0 bg-teal-500/5 blur-2xl rounded-2xl -z-10 animate-pulse" />
                                    )}

                                    <CardHeader className="relative">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${currentPlan === 'free' ? 'bg-teal-500' : 'bg-slate-300'}`} />
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-teal-500 transition-colors">Digital Entry</span>
                                                </div>
                                                <CardTitle className="text-xl font-black tracking-tight">{t('billing.basic.name')}</CardTitle>
                                                <CardDescription className="font-bold text-[10px] mt-1 text-slate-500">Para quienes inician con corazón</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 relative">
                                        <div className="mb-4 flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-slate-900 dark:text-white">$10</span>
                                            <span className="text-slate-500 font-bold text-xs">/ {t('billing.monthly')}</span>
                                        </div>
                                        <ul className="space-y-3 text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-6">
                                            {(t.raw('billing.basic.features') as string[]).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 group/item">
                                                    <Check className="w-3.5 h-3.5 mt-0.5 text-teal-500 shrink-0" />
                                                    <span className="leading-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="relative z-30 pt-0">
                                        <SubscribeButton
                                            planId="basic"
                                            price={10}
                                            planName="Basic"
                                            currentPlan={currentPlan}
                                            className={`w-full h-10 rounded-xl font-black tracking-wider text-[10px] uppercase shadow-md transition-all ${selectedPlan === 'free' ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20' : 'bg-slate-800 hover:bg-slate-900'}`}
                                            userId={user?.id}
                                            userEmail={user?.email}
                                        />
                                    </CardFooter>
                                </Card>
                            </motion.div>

                            {/* Clinical */}
                            <motion.div
                                onClick={() => setSelectedPlan('clinical')}
                                initial={false}
                                animate={{
                                    scale: selectedPlan === 'clinical' ? 1.05 : 1,
                                    zIndex: selectedPlan === 'clinical' ? 20 : 10
                                }}
                                whileHover={{ scale: selectedPlan === 'clinical' ? 1.07 : 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="group relative"
                            >
                                <Card className={`flex flex-col h-full transition-all cursor-pointer relative border-teal-500/20 ${selectedPlan === 'clinical' ? 'ring-4 ring-teal-500/50 shadow-[0_8px_30px_rgb(20,184,166,0.3)] bg-white dark:bg-slate-900 translate-y-[-8px]' : 'hover:shadow-xl opacity-80 hover:opacity-100 bg-slate-50/50 dark:bg-slate-900/50 shadow-md'}`}>

                                    <CardHeader className="relative">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Zap className="w-2.5 h-2.5 text-teal-500 fill-teal-500" />
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-600 animate-pulse">Advanced Practice</span>
                                                </div>
                                                <CardTitle className="text-xl font-black tracking-tight">{t('billing.clinical.name')}</CardTitle>
                                                <CardDescription className="font-bold text-[10px] mt-1 text-teal-600/80">Potencia tu impacto real</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 relative">
                                        <div className="mb-4 flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-slate-900 dark:text-white">$15</span>
                                            <span className="text-slate-500 font-bold text-xs">/ {t('billing.monthly')}</span>
                                        </div>
                                        <ul className="space-y-3 text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-6">
                                            {(t.raw('billing.clinical.features') as string[]).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 group/item">
                                                    <Check className="w-3.5 h-3.5 mt-0.5 text-teal-500 shrink-0" />
                                                    <span className="leading-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="relative z-30 pt-0">
                                        <SubscribeButton
                                            planId="clinical"
                                            price={15}
                                            planName="Clinical"
                                            currentPlan={currentPlan}
                                            className={`w-full h-10 rounded-xl font-black tracking-wider text-[10px] uppercase shadow-lg transition-all ${selectedPlan === 'clinical' ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20' : 'bg-slate-800 hover:bg-slate-900'}`}
                                            userId={user?.id}
                                            userEmail={user?.email}
                                        />
                                    </CardFooter>
                                </Card>
                            </motion.div>

                            {/* Pro */}
                            <motion.div
                                onClick={() => setSelectedPlan('pro')}
                                initial={false}
                                animate={{
                                    scale: selectedPlan === 'pro' ? 1.05 : 1,
                                    zIndex: selectedPlan === 'pro' ? 20 : 10
                                }}
                                whileHover={{ scale: selectedPlan === 'pro' ? 1.07 : 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="group relative"
                            >
                                <Card className={`flex flex-col h-full bg-slate-950 text-white border-none transition-all cursor-pointer relative overflow-hidden shadow-xl ${selectedPlan === 'pro' ? 'ring-4 ring-teal-400/50 shadow-[0_8px_30px_rgb(45,212,191,0.3)] translate-y-[-8px]' : 'opacity-80 hover:opacity-100'}`}>
                                    {/* Premium Cosmic Decoration */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />

                                    <CardHeader className="relative">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Crown className="w-2.5 h-2.5 text-teal-400 fill-teal-400" />
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400">Professional Excellence</span>
                                                </div>
                                                <CardTitle className="text-xl font-black tracking-tight text-white">{t('billing.pro.name')}</CardTitle>
                                                <CardDescription className="text-slate-400 font-bold text-[10px] mt-1">Liderazgo y Gestión Total</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 relative">
                                        <div className="mb-4 flex flex-col">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-black text-white">$65</span>
                                                <span className="text-slate-400 font-bold text-xs">/ {t('billing.yearly')}</span>
                                            </div>
                                            <p className="text-[9px] text-teal-400 font-black uppercase tracking-widest mt-1 opacity-80">{t('billing.monthly_equivalent')}</p>
                                        </div>
                                        <ul className="space-y-3 text-[11px] font-bold text-slate-300 mb-6">
                                            {(t.raw('billing.pro.features') as string[]).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 group/item">
                                                    <Check className="w-3.5 h-3.5 mt-0.5 text-teal-400 shrink-0" />
                                                    <span className="leading-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="relative z-30 pt-0">
                                        <SubscribeButton
                                            planId="pro"
                                            price={65}
                                            planName="Pro Anual"
                                            currentPlan={currentPlan}
                                            variant="secondary"
                                            userId={user?.id}
                                            userEmail={user?.email}
                                            className={`w-full h-10 rounded-xl font-black tracking-wider text-[10px] uppercase shadow-xl transition-all ${selectedPlan === 'pro' ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-800 text-white'}`}
                                        />
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </div>

                        {!isFreeActive && currentPlan !== 'free' && (
                            <div className="mt-8 max-w-5xl mx-auto">
                                <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 shadow-none">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div className="space-y-1 text-sm text-amber-900/80 dark:text-amber-500/80">
                                                <p className="font-semibold text-amber-700 dark:text-amber-500">{t('account_actions.cancel_sub_title')}</p>
                                                <p>{t('account_actions.cancel_sub_desc')}</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="shrink-0 w-full sm:w-auto border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/50"
                                                onClick={() => setShowCancelAlert(true)}
                                            >
                                                {t('account_actions.cancel_sub_btn')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        <AlertDialog open={showCancelAlert} onOpenChange={setShowCancelAlert}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{t('account_actions.cancel_sub_confirm_title')}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t('account_actions.cancel_sub_confirm_desc')}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{t('account_actions.cancel_sub_back')}</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-600"
                                        onClick={handleCancelSubscription}
                                        disabled={isCancelingAuth}
                                    >
                                        {isCancelingAuth ? t('account_actions.processing') : t('account_actions.cancel_sub_yes')}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TabsContent>

                    {/* Common Action Bar */}
                    <div className="mt-8 flex justify-end border-t border-slate-200 dark:border-slate-800 pt-6 pb-12 max-w-5xl mx-auto">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white min-w-[200px] h-12 rounded-xl shadow-lg shadow-black/10 dark:shadow-teal-900/20 text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 active:translate-y-0"
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
