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

async function createUserSubscription() {
    const email = 'psi.gustavocaro@gmail.com'
    console.log(`Processing user: ${email}`)

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

    // 2. Create Profile
    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            full_name: 'Gustavo Caro',
            registry_number: 'Pending',
            specialty: 'Psicología',
            signature_url: ''
        })

    if (profileError) {
        console.error('Error creating profile:', profileError)
    } else {
        console.log('Profile created/updated successfully.')
    }

    // 3. Create Subscription
    // Assuming 'pro' is the plan for 'Anual'
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    const { error: subError } = await supabase
        .from('subscriptions')
        .upsert({
            user_id: user.id,
            plan: 'pro',
            status: 'active'
        })

    if (subError) {
        console.error('Error creating subscription:', subError)
    } else {
        console.log('Subscription created/updated successfully (Plan: Anual/Pro).')
    }
}

createUserSubscription()
    .then(() => console.log('Script finished.'))
    .catch(err => console.error('Script failed:', err))
