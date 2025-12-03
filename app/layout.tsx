import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { createClient } from "@/lib/supabase/server";
import { AIChatSupport } from "@/components/layout/ai-chat-support";
import { AdminMenu } from "@/components/admin/admin-menu";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neurometrics",
  description: "Plataforma de gestión clínica para psicólogos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user?.id)
    .single();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <Navbar user={user} plan={subscription?.plan} />
        <AIChatSupport user={user} />
        {user?.email === 'psi.gustavocaro@gmail.com' && <AdminMenu />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
