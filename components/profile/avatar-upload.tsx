'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, Trash2, X } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "@/i18n/navigation"

interface AvatarUploadProps {
    uid: string
    url: string | null
    size?: number
    onUploadComplete?: (url: string) => void
}

export function AvatarUpload({ uid, url, size = 200, onUploadComplete }: AvatarUploadProps) {
    const supabase = createClient()
    const router = useRouter()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            if (!event.target.files || event.target.files.length === 0) {
                return
            }

            const file = event.target.files[0]

            if (file.size > 5 * 1024 * 1024) {
                toast.error("La imagen excede el límite de 5MB")
                return
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
            if (!allowedTypes.includes(file.type)) {
                toast.error("Formato no soportado. Usa JPG, PNG o WEBP")
                return
            }

            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}-${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            setAvatarUrl(publicUrl)
            if (onUploadComplete) onUploadComplete(publicUrl)

            toast.info("Foto cargada localmente. ¡Recuerda presionar Guardar Cambios para finalizar!")

        } catch (error: any) {
            console.error("Upload Error Stringified:", JSON.stringify(error, null, 2))
            const errorMsg = error.message || error.error_description || JSON.stringify(error) || "Ocurrió un error al subir tu fotografía.";
            toast.error(errorMsg)
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const deleteAvatar = async (e: React.MouseEvent) => {
        e.stopPropagation()
        try {
            setUploading(true)

            setAvatarUrl(null)
            if (onUploadComplete) onUploadComplete('')
            toast.info("Foto eliminada localmente. ¡Recuerda presionar Guardar Cambios para finalizar!")
        } catch (error: any) {
            toast.error("Error al eliminar la imagen")
        } finally {
            setUploading(false)
        }
    }

    const triggerUpload = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="w-full max-w-[240px] flex flex-col items-center group/container">
            {/* Image Container */}
            <div className="relative w-60 h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all group-hover/container:shadow-md">
                {avatarUrl ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={avatarUrl}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/container:scale-105"
                        />
                        <button
                            type="button"
                            onClick={deleteAvatar}
                            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover/container:opacity-100 border border-white/20 shadow-lg"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full">
                            <Upload className="w-8 h-8 opacity-20" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Sin fotografía</span>
                    </div>
                )}

                {uploading && (
                    <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center z-10 backdrop-blur-sm">
                        <Loader2 className="w-10 h-10 text-white animate-spin" />
                    </div>
                )}
            </div>

            {/* Action Bar */}
            <div className="w-full mt-3 p-2 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 rounded-xl">
                <Button
                    type="button"
                    variant="outline"
                    onClick={triggerUpload}
                    disabled={uploading}
                    className="w-full bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 h-10 text-xs font-bold uppercase tracking-tight shadow-sm"
                >
                    Subir Fotografía
                </Button>
            </div>

            <p className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter opacity-60">
                JPG, PNG • Máx 5MB
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
    )
}
