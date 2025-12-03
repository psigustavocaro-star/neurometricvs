import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function upgradeUser() {
    // Get the user ID (hardcoded for now or passed as arg)
    // Since we don't know the exact ID, we'll fetch the most recently created subscription
    // or just update ALL subscriptions to 'pro' for this dev environment

    console.log('Upgrading all users to PRO plan...')

    const { data, error } = await supabase
        .from('subscriptions')
        .update({ plan: 'pro' })
        .neq('plan', 'pro') // Update only if not already pro
        .select()

    if (error) {
        console.error('Error upgrading users:', error)
    } else {
        console.log(`Successfully upgraded ${data.length} users to PRO plan.`)
    }
}

upgradeUser()
