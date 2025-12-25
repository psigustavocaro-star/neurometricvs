import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
import { ConditionalNavbar } from "@/components/layout/conditional-navbar";
import { createClient } from "@/lib/supabase/server";
// import { AdminMenu } from "@/components/admin/admin-menu";
import { Toaster } from "@/components/ui/sonner";
import { AdminTools } from "@/components/admin/admin-tools";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Neurometrics",
  description: "Plataforma de gestión clínica para psicólogos",
  openGraph: {
    title: "Neurometrics - Gestión Clínica Inteligente",
    description: "Plataforma integral para psicólogos y psiquiatras. Gestión de pacientes, tests automatizados y asistente IA.",
    url: "https://neurometricslatam.com",
    siteName: "Neurometrics",
    locale: "es_ES",

    type: "website",
  },
  icons: {
    icon: "/neurometrics-logo-small.png",
    shortcut: "/neurometrics-logo-small.png",
    apple: "/neurometrics-logo-small.png",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Provide all messages to the client
  const messages = await getMessages();

  // Supabase logic
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  let subscription = null;

  if (user) {
    const [profileRes, subscriptionRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('subscriptions').select('plan').eq('user_id', user.id).single()
    ]);
    profile = profileRes.data;
    subscription = subscriptionRes.data;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${fontSans.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ConditionalNavbar user={user} plan={subscription?.plan} profile={profile} />
            {/* {user?.email === 'psi.gustavocaro@gmail.com' && <AdminMenu />} */}
            <main className="transition-all duration-300">
              {children}
            </main>
            {user?.email === 'psi.gustavocaro@gmail.com' && <div className="fixed bottom-4 right-4 z-50"><AdminTools /></div>}
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
