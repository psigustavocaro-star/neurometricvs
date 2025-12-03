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

async function checkUserPlan() {
    const email = 'psi.gustavocaro@gmail.com'
    console.log(`Checking plan for user: ${email}`)

    // 1. Get User ID
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
        console.error('Error fetching users:', userError)
        return
    }

    const user = users.find(u => u.email === email)

    if (!user) {
        console.error('User not found')
        return
    }

    console.log(`Found user ID: ${user.id}`)

    // 2. Get ANY Subscription to see schema
    const { data: anySub, error: anySubError } = await supabase
        .from('subscriptions')
        .select('*')
        .limit(1)

    if (anySubError) {
        console.error('Error fetching any subscription:', anySubError)
    } else {
        console.log('Sample Subscription Structure:', anySub)
    }
}

checkUserPlan()
