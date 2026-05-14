import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null | undefined

function hasRealValue(value: string | undefined, placeholder: string) {
  return Boolean(value && value.trim() && !value.includes(placeholder))
}

export function getSupabaseAdmin() {
  if (cachedClient !== undefined) {
    return cachedClient
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!hasRealValue(url, 'your-project') || !hasRealValue(serviceRoleKey, 'your-service-role-key')) {
    cachedClient = null
    return cachedClient
  }

  cachedClient = createClient(url!, serviceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return cachedClient
}
