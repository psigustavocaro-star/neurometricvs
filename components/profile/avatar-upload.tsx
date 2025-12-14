'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "@/i18n/navigation"

interface AvatarUploadProps {
    uid: string
    url: string | null
    size?: number
    onUploadComplete?: (url: string) => void
}

export function AvatarUpload({ uid, url, size = 150, onUploadComplete }: AvatarUploadProps) {
    const supabase = createClient()
    const router = useRouter()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("Debes seleccionar una imagen para subir.")
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}-${Math.random()}.${fileExt}`

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            // 3. Update Profile
            // TODO: Ideally this should be a server action, or we update the user metadata directly if using that
            // Updating profiles table for now as per schema
            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({ id: uid, avatar_url: publicUrl, updated_at: new Date().toISOString() })

            if (updateError) {
                throw updateError
            }

            // Also update Auth Metadata for broader access if needed, though profile table is safer source of truth
            await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            })

            setAvatarUrl(publicUrl)
            if (onUploadComplete) onUploadComplete(publicUrl)

            toast.success("Foto de perfil actualizada exitosamente")
            router.refresh()

        } catch (error: any) {
            toast.error(error.message || "Error al subir la imagen")
        } finally {
            setUploading(false)
        }
    }

    const triggerUpload = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={triggerUpload} style={{ width: size, height: size }}>
                <Avatar className="w-full h-full border-4 border-white shadow-lg transition-transform group-hover:scale-105">
                    <AvatarImage src={avatarUrl || ''} className="object-cover" />
                    <AvatarFallback className="text-4xl bg-slate-100 text-slate-300">
                        <Upload className="w-12 h-12" />
                    </AvatarFallback>
                </Avatar>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-8 h-8 text-white" />
                </div>

                {uploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center z-10">
                        <Loader2 className="w-10 h-10 text-white animate-spin" />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={triggerUpload}
                    disabled={uploading}
                >
                    Cambiar Foto
                </Button>
                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    ref={fileInputRef}
                    className="hidden"
                />
            </div>
        </div>
    )
}
