import { createClient } from "@/lib/supabase/server";
import { lemonSqueezyApiInstance } from "@/lib/lemonsqueezy";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        const { plan, userId: reqUserId, email: reqEmail, name: reqName } = reqData;

        let variantId;
        switch (plan) {
            case 'basic':
                variantId = process.env.LEMONSQUEEZY_VARIANT_ID_BASIC;
                break;
            case 'clinical':
                variantId = process.env.LEMONSQUEEZY_VARIANT_ID_CLINICAL;
                break;
            case 'pro':
                variantId = process.env.LEMONSQUEEZY_VARIANT_ID_PRO;
                break;
            default:
                return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        if (!variantId) {
            console.error(`Missing Variant ID for plan: ${plan}`);
            return NextResponse.json(
                { error: "Server configuration error: Missing Variant ID" },
                { status: 500 }
            );
        }

        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Use authenticated user OR provided details (for onboarding)
        const userId = user?.id || reqUserId;
        const userEmail = user?.email || reqEmail;

        if (!userId || !userEmail) {
            return NextResponse.json(
                { error: "User information required" },
                { status: 401 }
            );
        }

        // Get user details for pre-filling if logged in, otherwise use provided name
        let userName = reqName;
        if (user) {
            const { data: userData } = await supabase
                .from("users")
                .select("full_name")
                .eq("id", user.id)
                .single();
            userName = userData?.full_name;
        }

        const newCheckout = {
            productOptions: {
                enabledVariants: [parseInt(variantId)],
                redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
                receiptButtonText: 'Ir al Dashboard',
                receiptThankYouNote: '¡Gracias por suscribirte a Neurometrics!',
            },
            checkoutData: {
                email: userEmail,
                name: userName || userEmail,
                custom: {
                    user_id: userId,
                    plan_name: plan,
                },
            },
        };

        const response = await lemonSqueezyApiInstance.post("/checkouts", {
            data: {
                type: "checkouts",
                attributes: newCheckout,
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: process.env.LEMONSQUEEZY_STORE_ID,
                        },
                    },
                    variant: {
                        data: {
                            type: "variants",
                            id: variantId,
                        },
                    },
                },
            },
        });

        const checkoutUrl = response.data.data.attributes.url;

        return NextResponse.json({ url: checkoutUrl });
    } catch (error: any) {
        console.error("Lemon Squeezy Checkout Error:", error?.response?.data || error);
        return NextResponse.json(
            { error: "Error creating checkout session" },
            { status: 500 }
        );
    }
}
