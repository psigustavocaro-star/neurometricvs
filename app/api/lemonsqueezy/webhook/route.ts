import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const text = await req.text();
        const hmac = crypto.createHmac(
            "sha256",
            process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ""
        );
        const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
        const signature = Buffer.from(
            (await headers()).get("x-signature") || "",
            "utf8"
        );

        if (!crypto.timingSafeEqual(digest, signature)) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const payload = JSON.parse(text);
        const eventName = payload.meta.event_name;
        const customData = payload.meta.custom_data;
        const userId = customData?.user_id;

        if (!userId) {
            // Some events might not have user_id if it wasn't passed in custom_data or if it's a store-level event
            return NextResponse.json({ message: "No user_id found, ignoring" }, { status: 200 });
        }

        // Initialize Supabase Admin Client
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const attributes = payload.data.attributes;

        if (eventName === "subscription_created" || eventName === "subscription_updated" || eventName === "subscription_payment_success") {
            const status = attributes.status; // active, past_due, etc.
            const endsAt = attributes.ends_at;
            const planName = customData?.plan_name || 'unknown'; // You might want to map variant_id to plan name if custom_data isn't reliable for updates

            // Update user subscription
            const { error } = await supabase
                .from("subscriptions")
                .upsert({
                    user_id: userId,
                    stripe_customer_id: attributes.customer_id.toString(), // Storing LS customer ID in the same column for now, or create a new column
                    stripe_subscription_id: attributes.identifier, // LS Subscription ID
                    status: status,
                    plan: planName,
                    current_period_end: endsAt ? new Date(endsAt).toISOString() : null,
                });

            if (error) {
                console.error("Supabase Error:", error);
                return NextResponse.json({ error: "Database update failed" }, { status: 500 });
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Webhook Error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}
