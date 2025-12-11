import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function POST(req: NextRequest) {
    try {
        const url_params = new URL(req.url).searchParams;
        const topic = url_params.get('topic') || url_params.get('type');
        const id = url_params.get('id') || url_params.get('data.id');

        if (topic === 'payment' && id) {
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: id });

            if (paymentData.status === 'approved') {
                const userId = paymentData.metadata.user_id;
                const planId = paymentData.metadata.plan_id;

                if (userId) {
                    // Use Service Role Key for Admin access (bypass RLS)
                    const { createClient } = require('@supabase/supabase-js');
                    const supabase = createClient(
                        process.env.NEXT_PUBLIC_SUPABASE_URL!,
                        process.env.SUPABASE_SERVICE_ROLE_KEY!
                    );


                    const { error } = await supabase
                        .from('subscriptions')
                        .upsert({
                            user_id: userId,
                            status: 'active',
                            plan_id: planId,
                            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Dummy 30 days, real logic differs
                            payment_provider: 'mercadopago',
                            payment_id: id
                        });

                    if (error) {
                        console.error("Error updating subscription:", error);
                        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
                    }
                }
            }
        }

        return NextResponse.json({ status: 'OK' });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
