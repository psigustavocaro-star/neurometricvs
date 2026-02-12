'use client'

import { createPatient } from '../actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from 'react'
import { useAdminStore } from '@/lib/stores/admin-store'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
    User,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Hospital,
    GraduationCap,
    Briefcase,
    Users,
    Heart,
    AlertCircle,
    Network,
    Activity,
    Pill,
    IdCard,
    ChevronRight,
    Search
} from 'lucide-react'
import { cn } from '@/lib/utils'

const FormField = ({ id, label, icon: Icon, type = "text", placeholder, name, required = false, value, onChange, itemVariant }: any) => (
    <motion.div variants={itemVariant} className="space-y-2">
        <Label htmlFor={id} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wide">
            <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-500" />
            {label}
            {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="relative group">
            <Input
                id={id}
                name={name || id}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-cyan-500"
            />
        </div>
    </motion.div>
)

export function NewPatientForm({
    initialSpecialty,
    onSuccess,
    onCancel
}: {
    initialSpecialty?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}) {
    const t = useTranslations('Patients.new')
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { fillFormTrigger, currentRole, isSimulating } = useAdminStore()

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        birthDate: '',
        email: '',
        gender: 'other',
        rut: '',
        age: '',
        phone: '',
        address: '',
        clinic: '',
        education: '',
        occupation: '',
        companion: '',
        emergencyContact: '',
        genogram: '',
        diagnoses: '',
        medications: '',
        school: '',
        grade: '',
        physical_status: '',
        reason_for_consultation: '',
        family_history: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Determine active role (simulated or real)
    const activeRole = isSimulating ? currentRole : (
        initialSpecialty?.toLowerCase().includes('psiquiatra') ? 'psychiatrist' :
            initialSpecialty?.toLowerCase().includes('neurólog') ? 'neurologist' :
                initialSpecialty?.toLowerCase().includes('médic') ? 'physician' :
                    initialSpecialty?.toLowerCase().includes('fonoaudiólog') ? 'speech_therapist' :

                        initialSpecialty?.toLowerCase().includes('terapeuta') ? 'occupational_therapist' :
                            initialSpecialty?.toLowerCase().includes('nutricion') ? 'nutritionist' :
                                'psychologist'
    )

    const isMedical = ['psychiatrist', 'neurologist', 'physician', 'nutritionist'].includes(activeRole)
    const isAcademic = ['speech_therapist'].includes(activeRole)
    const isPhysical = ['occupational_therapist'].includes(activeRole)
    const isPsych = ['psychologist', 'psychiatrist'].includes(activeRole)

    useEffect(() => {
        if (fillFormTrigger > 0) {
            setFormData(prev => ({
                ...prev,
                fullName: t('mock_data.name'),
                birthDate: "1990-05-15",
                email: "prueba@neurometrics.lat",
                gender: "male",
                rut: "12.345.678-9",
                age: "35",
                phone: "+56 9 1234 5678",
                address: t('mock_data.address'),
                clinic: "Centro Médico Cordillera",
                education: t('mock_data.education'),
                occupation: t('mock_data.occupation'),
                companion: t('mock_data.companion'),
                emergencyContact: t('mock_data.emergency_contact'),
                genogram: t('mock_data.genogram'),
                diagnoses: t('mock_data.diagnoses'),
                medications: t('mock_data.medications'),
                school: t('mock_data.school'),
                grade: t('mock_data.grade'),
                physical_status: t('mock_data.physical_status'),
                reason_for_consultation: t('mock_data.reason_for_consultation'),
                family_history: t('mock_data.family_history')
            }))
            toast.info(t('mock_injected'))
        }
    }, [fillFormTrigger])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const form = new FormData(event.currentTarget)
        const result = await createPatient(form)

        if (result?.error) {
            setError(result.error)
            toast.error(result.error)
            setIsSubmitting(false)
        } else {
            toast.success(t('success'))
            if (onSuccess) {
                onSuccess()
            }
        }
    }

    const container = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const item = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    }

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="w-full max-w-5xl"
        >
            <Card className="border-none shadow-2xl bg-white dark:bg-slate-950 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500"></div>
                <CardHeader className="pb-6 pt-8 px-8 text-center md:text-left border-b border-slate-100 dark:border-slate-800/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                                {t('title')}
                            </CardTitle>
                            <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                                {t('subtitle')}
                            </CardDescription>
                        </div>
                        <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-2xl border border-teal-100 dark:border-teal-800 hidden md:block">
                            <User className="w-6 h-6 text-teal-600 dark:text-cyan-400" />
                        </div>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="p-8 space-y-8">
                        {/* Section 1: Personal Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <Users className="w-4 h-4 text-teal-600 dark:text-cyan-500" />
                                <h3 className="font-bold text-slate-700 dark:text-slate-200 tracking-wider uppercase text-xs">
                                    {t('personal_info')}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="md:col-span-2 lg:col-span-1">
                                    <FormField
                                        id="fullName"
                                        label={t('fields.name')}
                                        icon={User}
                                        required
                                        placeholder={t('placeholders.name')}
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        itemVariant={item}
                                    />
                                </div>
                                <FormField
                                    id="rut"
                                    label={t('fields.rut')}
                                    icon={IdCard}
                                    placeholder={t('placeholders.rut')}
                                    value={formData.rut}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                                <FormField
                                    id="age"
                                    label={t('fields.age')}
                                    icon={Activity}
                                    type="number"
                                    placeholder={t('placeholders.age')}
                                    value={formData.age}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                                <FormField
                                    id="birthDate"
                                    label={t('fields.birth_date')}
                                    icon={Calendar}
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                                <FormField
                                    id="education"
                                    label={t('fields.education')}
                                    icon={GraduationCap}
                                    placeholder={t('placeholders.education')}
                                    value={formData.education}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                                <FormField
                                    id="occupation"
                                    label={t('fields.occupation')}
                                    icon={Briefcase}
                                    placeholder={t('placeholders.occupation')}
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                                <motion.div variants={item} className="space-y-2 lg:col-span-1">
                                    <Label className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wide">
                                        <Activity className="w-3.5 h-3.5 text-primary" />
                                        {t('fields.gender')}
                                    </Label>
                                    <RadioGroup
                                        value={formData.gender}
                                        onValueChange={(v) => setFormData(p => ({ ...p, gender: v }))}
                                        name="gender"
                                        className="flex gap-4 pt-1"
                                    >
                                        {['male', 'female', 'other'].map((g) => (
                                            <div key={g} className="flex items-center space-x-2 bg-muted/40 px-3 py-2 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                                                <RadioGroupItem value={g} id={g} className="text-primary border-muted-foreground/40" />
                                                <Label htmlFor={g} className="capitalize cursor-pointer text-sm font-medium text-foreground">
                                                    {t(`gender_labels.${g}`)}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </motion.div>
                            </div>
                        </div>

                        {/* Section 2: Contact & Location */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <MapPin className="w-4 h-4 text-teal-600 dark:text-cyan-500" />
                                <h3 className="font-bold text-slate-700 dark:text-slate-200 tracking-wider uppercase text-xs">
                                    {t('contact_info')}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormField
                                    id="email"
                                    label={t('fields.email')}
                                    icon={Mail}
                                    type="email"
                                    placeholder={t('placeholders.email')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                                <FormField
                                    id="phone"
                                    label={t('fields.phone')}
                                    icon={Phone}
                                    placeholder={t('placeholders.phone')}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                                <div className="md:col-span-1">
                                    <FormField
                                        id="address"
                                        label={t('fields.address')}
                                        icon={MapPin}
                                        placeholder={t('placeholders.address')}
                                        value={formData.address}
                                        onChange={handleChange}
                                        itemVariant={item}
                                    />
                                </div>
                                <FormField
                                    id="clinic"
                                    label={t('fields.clinic')}
                                    icon={Hospital}
                                    placeholder={t('placeholders.clinic')}
                                    value={formData.clinic}
                                    onChange={handleChange}
                                    itemVariant={item}
                                />
                            </div>
                        </div>

                        {/* Section 3: Clinical & Support */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Clinical Info Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    <Activity className="w-4 h-4 text-teal-600 dark:text-cyan-500" />
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 tracking-wider uppercase text-xs">
                                        {t('clinical_info')}
                                    </h3>
                                </div>
                                <motion.div variants={item} className="space-y-2">
                                    <Label htmlFor="reason_for_consultation" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wide">
                                        <Search className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-500" />
                                        {t('fields.reason_for_consultation')}
                                    </Label>
                                    <Textarea
                                        id="reason_for_consultation"
                                        name="reason_for_consultation"
                                        placeholder={t('placeholders.reason_for_consultation')}
                                        value={formData.reason_for_consultation}
                                        onChange={handleChange}
                                        className="min-h-[80px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-cyan-500"
                                    />
                                </motion.div>

                                {(isMedical || isPsych) && (
                                    <motion.div variants={item} className="space-y-2">
                                        <Label htmlFor="diagnoses" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wide">
                                            <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-500" />
                                            {t('fields.diagnoses')}
                                        </Label>
                                        <Textarea
                                            id="diagnoses"
                                            name="diagnoses"
                                            placeholder={t('placeholders.diagnoses')}
                                            value={formData.diagnoses}
                                            onChange={handleChange}
                                            className="min-h-[80px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-cyan-500"
                                        />
                                    </motion.div>
                                )}

                                {isMedical && (
                                    <motion.div variants={item} className="space-y-2">
                                        <Label htmlFor="medications" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wide">
                                            <Pill className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-500" />
                                            {t('fields.medications')}
                                        </Label>
                                        <Textarea
                                            id="medications"
                                            name="medications"
                                            placeholder={t('placeholders.medications')}
                                            value={formData.medications}
                                            onChange={handleChange}
                                            className="min-h-[80px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-cyan-500"
                                        />
                                    </motion.div>
                                )}

                                {isAcademic && (
                                    <>
                                        <FormField
                                            id="school"
                                            label={t('fields.school')}
                                            icon={Hospital}
                                            placeholder={t('placeholders.school')}
                                            value={formData.school}
                                            onChange={handleChange}
                                            itemVariant={item}
                                        />
                                        <FormField
                                            id="grade"
                                            label={t('fields.grade')}
                                            icon={GraduationCap}
                                            placeholder={t('placeholders.grade')}
                                            value={formData.grade}
                                            onChange={handleChange}
                                            itemVariant={item}
                                        />
                                    </>
                                )}

                                {isPhysical && (
                                    <motion.div variants={item} className="space-y-2">
                                        <Label htmlFor="physical_status" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wide">
                                            <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-500" />
                                            {t('fields.physical_status')}
                                        </Label>
                                        <Textarea
                                            id="physical_status"
                                            name="physical_status"
                                            placeholder={t('placeholders.physical_status')}
                                            value={formData.physical_status}
                                            onChange={handleChange}
                                            className="min-h-[80px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-cyan-500"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            {/* Support Info Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    <Heart className="w-4 h-4 text-teal-600 dark:text-cyan-500" />
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 tracking-wider uppercase text-xs">
                                        {t('support_info')}
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <FormField
                                        id="companion"
                                        label={t('fields.companion')}
                                        icon={Users}
                                        placeholder={t('placeholders.companion')}
                                        value={formData.companion}
                                        onChange={handleChange}
                                        itemVariant={item}
                                    />
                                    <FormField
                                        id="emergencyContact"
                                        label={t('fields.emergency_contact')}
                                        icon={AlertCircle}
                                        placeholder={t('placeholders.emergency_contact')}
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        itemVariant={item}
                                    />
                                    <motion.div variants={item} className="space-y-2">
                                        <Label htmlFor="genogram" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wide">
                                            <Network className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-500" />
                                            {t('fields.genogram')}
                                        </Label>
                                        <Textarea
                                            id="genogram"
                                            name="genogram"
                                            placeholder={t('placeholders.genogram')}
                                            value={formData.genogram}
                                            onChange={handleChange}
                                            className="h-24 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-cyan-500"
                                        />
                                    </motion.div>
                                    <motion.div variants={item} className="space-y-2">
                                        <Label htmlFor="family_history" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wide">
                                            <Users className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-500" />
                                            {t('fields.family_history')}
                                        </Label>
                                        <Textarea
                                            id="family_history"
                                            name="family_history"
                                            placeholder={t('placeholders.family_history')}
                                            value={formData.family_history}
                                            onChange={handleChange}
                                            className="h-24 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-cyan-500"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </motion.div>
                        )}
                    </CardContent>
                    <CardFooter className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="w-full md:w-auto"
                        >
                            {t('cancel') || 'Regresar'}
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto md:ml-auto gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white border-0"
                        >
                            {isSubmitting ? (
                                <>
                                    <Search className="w-4 h-4 animate-spin" />
                                    {t('loading')}
                                </>
                            ) : (
                                <>
                                    {t('submit')}
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    )
}
