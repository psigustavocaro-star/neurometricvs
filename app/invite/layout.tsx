import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Evaluación - Neurometrics',
    description: 'Complete su evaluación clínica de forma segura',
}

export default function InviteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
