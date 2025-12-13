'use server'

import { z } from 'zod'

const ContactSchema = z.object({
    name: z.string().min(2, { message: "El nombre es requerido" }),
    lastname: z.string().optional(),
    email: z.string().email({ message: "Email inválido" }),
    subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres" }),
    message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
})

export type ContactState = {
    success?: boolean
    errors?: {
        name?: string[]
        lastname?: string[]
        email?: string[]
        subject?: string[]
        message?: string[]
    }
    message?: string
}

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Por favor revisa los campos del formulario.',
            success: false
        }
    }

    const { name, lastname, email, subject, message } = validatedFields.data;
    // Simulation only (Resend removed as requested)
    console.log('[Contact Form] Simulation:', { name, lastname, email, subject, message })

    // In a real implementation with Workspace, we would use nodemailer here.
    // For now, return success so the UI feedback works.

    return {
        success: true,
        message: '¡Mensaje enviado (Simulación)! En producción esto se conectará a tu Google Workspace.'
    }
}
