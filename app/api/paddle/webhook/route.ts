import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { paddle } from "@/lib/paddle"
import { createClient } from "@supabase/supabase-js"
import { PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from "@/lib/config"

export const dynamic = 'force-dynamic'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
    const signature = (await headers()).get("Paddle-Signature") || ""
    const body = await req.text()

    try {
        if (process.env.PADDLE_WEBHOOK_SECRET) {
            const eventData = await paddle.webhooks.unmarshal(body, process.env.PADDLE_WEBHOOK_SECRET, signature);
            const eventType = eventData?.eventType;
            const data = eventData?.data as any;

            if (eventType === 'subscription.created' || eventType === 'subscription.updated' || eventType === 'subscription.activated') {
                const userId = data.customData?.userId;

                // If userId is missing (e.g. on update), try to find by subscription_id if needed, 
                // but for now we assume customData is preserved or we rely on upsert by subscription_id if possible.
                // However, Supabase upsert usually needs the primary key or a unique constraint.
                // The subscriptions table likely has user_id as unique or PK.

                if (!userId) {
                    console.error('Missing userId in Paddle webhook event');
                    return new NextResponse("Missing userId", { status: 400 });
                }

                // Map Price ID to Plan
                // Assuming items[0] is the main subscription item
                const priceId = data.items[0]?.price?.id;
                let planName = 'basic';

                if (priceId === PRICE_ID_PRO) planName = 'pro';
                else if (priceId === PRICE_ID_CLINICAL) planName = 'clinical';
                else if (priceId === PRICE_ID_BASIC) planName = 'basic';

                // Upsert to Supabase
                // NOTE: We are reusing 'stripe_' columns for Paddle data to avoid database schema migration.
                const { error } = await supabaseAdmin
                    .from("subscriptions")
                    .upsert({
                        user_id: userId,
                        stripe_subscription_id: data.id,
                        stripe_customer_id: data.customerId,
                        stripe_price_id: priceId,
                        stripe_current_period_end: data.currentBillingPeriod?.end,
                        plan: planName,
                        status: data.status,
                    }, { onConflict: 'user_id' });

                if (error) {
                    console.error('Supabase error:', error);
                    return new NextResponse("Database Error", { status: 500 });
                }
            }
        } else {
            console.error('Missing PADDLE_WEBHOOK_SECRET');
            return new NextResponse("Server Configuration Error", { status: 500 });
        }
    } catch (e) {
        console.error('Webhook verification failed:', e);
        return new NextResponse("Invalid signature", { status: 401 });
    }

    return new NextResponse("OK", { status: 200 });
}
