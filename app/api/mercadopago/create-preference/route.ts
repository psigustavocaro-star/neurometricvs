import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function POST(req: NextRequest) {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        console.error("Mercado Pago Access Token not found");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { planId, price, title } = body;

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: planId,
                        title: title,
                        quantity: 1,
                        unit_price: Number(price),
                        currency_id: 'CLP',
                    }
                ],
                payer: {
                    email: user.email!,
                },
                back_urls: {
                    success: `${req.nextUrl.origin}/dashboard/subscription?status=success`,
                    failure: `${req.nextUrl.origin}/dashboard/subscription?status=failure`,
                    pending: `${req.nextUrl.origin}/dashboard/subscription?status=pending`,
                },
                auto_return: 'approved',
                metadata: {
                    user_id: user.id,
                    plan_id: planId
                }
            }
        });

        return NextResponse.json({ init_point: result.init_point, id: result.id });
    } catch (error) {
        console.error("Error creating Mercado Pago preference:", error);
        return NextResponse.json({ error: "Failed to create payment preference" }, { status: 500 });
    }
}
