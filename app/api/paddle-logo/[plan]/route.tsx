import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ plan: string }> } | any
) {
    const { plan } = await context.params;

    let title = 'Plan Básico';
    if (plan === 'clinical') title = 'Plan Clínico';
    if (plan === 'pro') title = 'Plan Pro Anual';

    // We can load the image from the public folder dynamically
    const url = new URL(request.url);
    const logoUrl = `${url.origin}/logo-brain-clear.png`;

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                }}
            >
                <img
                    src={logoUrl}
                    style={{
                        width: '400px',
                        height: '350px',
                        objectFit: 'contain',
                        marginBottom: '10px',
                    }}
                />
                <div
                    style={{
                        fontSize: '56px',
                        fontWeight: '900',
                        color: '#0f766e', // teal-700
                        fontFamily: 'Inter, sans-serif',
                        textAlign: 'center',
                        letterSpacing: '-1.5px',
                        textTransform: 'uppercase'
                    }}
                >
                    {title}
                </div>
            </div>
        ),
        {
            width: 500,
            height: 500,
        }
    );
}
