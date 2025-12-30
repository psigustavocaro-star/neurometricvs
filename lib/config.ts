export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Paddle Configuration
export const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '';
export const PADDLE_ENV = (process.env.NEXT_PUBLIC_PADDLE_ENV?.toLowerCase() || 'sandbox') as 'production' | 'sandbox';

// Price IDs
export const PRICE_ID_BASIC = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC || '';
export const PRICE_ID_CLINICAL = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CLINICAL || '';
export const PRICE_ID_PRO = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_PRO || '';
