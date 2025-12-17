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
                return // User cancelled selection
            }

            const file = event.target.files[0]

            // Validation
            if (file.size > 5 * 1024 * 1024) {
                throw new Error("La imagen no debe pesar más de 5MB")
            }
            if (!file.type.startsWith('image/')) {
                throw new Error("El archivo debe ser una imagen")
            }

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
            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({ id: uid, avatar_url: publicUrl, updated_at: new Date().toISOString() })

            if (updateError) {
                throw updateError
            }

            // Also update Auth Metadata for broader access 
            await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            })

            setAvatarUrl(publicUrl)
            if (onUploadComplete) onUploadComplete(publicUrl)

            toast.success("Foto de perfil actualizada")
            router.refresh()

        } catch (error: any) {
            console.error("Upload Error:", error)
            toast.error(error.message || "Error al subir la imagen")
        } finally {
            setUploading(false)
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const triggerUpload = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div
                className="relative group cursor-pointer rounded-full transition-all duration-300 hover:ring-4 hover:ring-teal-100 dark:hover:ring-teal-900/30"
                onClick={triggerUpload}
                style={{ width: size, height: size }}
            >
                <Avatar className="w-full h-full border-4 border-slate-100 dark:border-slate-800 shadow-xl transition-transform group-hover:scale-105">
                    <AvatarImage src={avatarUrl || undefined} className="object-cover" />
                    <AvatarFallback className="text-4xl bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center">
                        <Upload className="w-12 h-12" />
                    </AvatarFallback>
                </Avatar>

                {/* Overlay with Camera Icon */}
                <div className="absolute inset-0 bg-slate-900/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Upload className="w-8 h-8 text-white mb-1" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Cambiar</span>
                </div>

                {uploading && (
                    <div className="absolute inset-0 bg-slate-950/80 rounded-full flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                        <Loader2 className="w-10 h-10 text-teal-400 animate-spin mb-2" />
                        <span className="text-xs font-medium text-white">Subiendo...</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                    Máximo 5MB (JPG, PNG)
                </p>
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
