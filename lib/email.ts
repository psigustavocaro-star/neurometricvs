
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtppro.zoho.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
})

type SendEmailParams = {
    to: string
    subject: string
    html: string
    from?: string // Optional override
}

export async function sendEmail({ to, subject, html, from }: SendEmailParams) {
    // If credentials are missing, log error but don't crash dev environment unless strictly needed
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        console.warn('⚠️ SMTP credentials missing. Email not sent.')
        return { success: false, error: 'SMTP credentials missing' }
    }

    try {
        const info = await transporter.sendMail({
            from: from || `"Neurometrics" <${process.env.SMTP_USER}>`, // Default to env user
            to,
            subject,
            html,
        })
        console.log('Message sent: %s', info.messageId)
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error }
    }
}
