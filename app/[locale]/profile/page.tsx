import { createClient } from '@/lib/supabase/server'
import { redirect } from '@/i18n/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { Separator } from "@/components/ui/separator"

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch Profile Data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const fullName = profile?.full_name || user.user_metadata?.full_name || ''
    const email = user.email || ''
    const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || null

    return (
        <div className="container max-w-2xl pt-24 pb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Mi Perfil</h1>
            <p className="text-slate-500 mb-8">Administra tu información personal y apariencia.</p>

            <div className="grid gap-8">
                {/* Avatar Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Foto de Perfil</CardTitle>
                        <CardDescription>
                            Esta imagen será visible para tus pacientes y en tu dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                        <AvatarUpload uid={user.id} url={avatarUrl} />
                    </CardContent>
                </Card>

                {/* Personal Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                        <CardDescription>
                            Datos básicos de tu cuenta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nombre Completo</Label>
                            <Input defaultValue={fullName} readOnly className="bg-slate-50" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input defaultValue={email} readOnly className="bg-slate-50" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
