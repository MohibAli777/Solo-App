import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing Supabase URL or Publishable Key')
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)