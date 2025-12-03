import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

// Initialize Supabase Admin client to bypass RLS
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === "checkout.session.completed") {
        // Retrieve the subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 })
        }

        // Map Stripe Price ID to Plan Name
        let planName = 'basic'
        const priceId = subscription.items.data[0].price.id

        if (priceId === process.env.STRIPE_PRICE_ID_PRO) planName = 'pro'
        else if (priceId === process.env.STRIPE_PRICE_ID_CLINICAL) planName = 'clinical'
        else if (priceId === process.env.STRIPE_PRICE_ID_BASIC) planName = 'basic'

        // Upsert subscription data into Supabase
        const { error } = await supabaseAdmin
            .from("subscriptions")
            .upsert({
                user_id: session.metadata.userId,
                stripe_subscription_id: subscription.id,
                stripe_customer_id: subscription.customer as string,
                stripe_price_id: priceId,
                stripe_current_period_end: new Date(
                    subscription.current_period_end * 1000
                ).toISOString(),
                plan: planName,
                status: subscription.status,
            })

        if (error) {
            console.error('Error updating subscription:', error)
            return new NextResponse("Database Error", { status: 500 })
        }
    }

    if (event.type === "invoice.payment_succeeded") {
        // Handle recurring payments
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        const { error } = await supabaseAdmin
            .from("subscriptions")
            .update({
                stripe_price_id: subscription.items.data[0].price.id,
                stripe_current_period_end: new Date(
                    subscription.current_period_end * 1000
                ).toISOString(),
                status: subscription.status,
            })
            .eq("stripe_subscription_id", subscription.id)

        if (error) {
            console.error('Error updating recurring subscription:', error)
            return new NextResponse("Database Error", { status: 500 })
        }
    }

    return new NextResponse(null, { status: 200 })
}
