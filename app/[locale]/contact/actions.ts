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

    // Send email to Support (The App Owner)
    // We send FROM the user (via our system) TO our support email
    // But since we can only send FROM our verified domain, we set 'from' correctly inside sendEmail logic (default)
    // and use the user's email as Reply-To (if we supported it, but our simple logic doesn't yet).
    // For now, simpler: Send TO support, with user details in body.

    // We import sendEmail dynamically or top-level. (Going to add import top level first)
    const { sendEmail } = await import('@/lib/email')

    await sendEmail({
        to: 'contacto@neurometricslatam.com',
        subject: `[Web Contacto] ${subject}`,
        html: `
            <h3>Nuevo mensaje de contacto web</h3>
            <p><strong>De:</strong> ${name} ${lastname || ''} (${email})</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <hr />
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    })

    return {
        success: true,
        message: '¡Mensaje enviado correctamente! Te responderemos a la brevedad.'
    }
}
