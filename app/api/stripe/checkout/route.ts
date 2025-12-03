import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const PLAN_PRICES = {
        basic: process.env.STRIPE_PRICE_ID_BASIC,
        clinical: process.env.STRIPE_PRICE_ID_CLINICAL,
        pro: process.env.STRIPE_PRICE_ID_PRO,
    };
    try {
        const { plan, email, userId } = await req.json();

        if (!plan || !email) {
            return new NextResponse('Missing plan or email', { status: 400 });
        }

        const priceId = PLAN_PRICES[plan as keyof typeof PLAN_PRICES];

        if (!priceId) {
            return new NextResponse('Invalid plan or missing Price ID configuration', { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
                plan,
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[STRIPE_CHECKOUT_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
