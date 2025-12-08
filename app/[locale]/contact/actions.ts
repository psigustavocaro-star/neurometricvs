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
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error("RESEND_API_KEY is missing");
        // In production, you might want to return a generic error or log this silently
        return {
            success: false,
            message: 'Error de configuración del servidor (API Key faltante).'
        };
    }

    try {
        const { Resend } = await import('resend');
        const resend = new Resend(apiKey);

        // Send email to the company/support
        const { data, error } = await resend.emails.send({
            from: 'Neurometrics Contact <onboarding@resend.dev>', // Use your verified domain here in production
            to: ['contacto@neurometrics.com'], // Replace with your actual receiving email
            replyTo: email,
            subject: `[Contacto Web] ${subject} - ${name} ${lastname || ''}`,
            html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${name} ${lastname || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <h3>Mensaje:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `
        });

        if (error) {
            console.error("Resend Error:", error);
            return {
                success: false,
                message: 'Hubo un error al enviar el correo. Por favor intenta nuevamente.'
            };
        }

        return {
            success: true,
            message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
        }
    } catch (err) {
        console.error("Server Action Error:", err);
        return {
            success: false,
            message: 'Error interno del servidor.'
        }
    }
}
