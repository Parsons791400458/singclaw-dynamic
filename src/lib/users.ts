import { getSupabaseAdmin } from '@/lib/supabase/admin'

type ClerkEmail = {
  id?: string
  emailAddress?: string
}

type ClerkUserLike = {
  firstName?: string | null
  lastName?: string | null
  username?: string | null
  imageUrl?: string | null
  primaryEmailAddressId?: string | null
  emailAddresses?: ClerkEmail[]
}

type ProfileSyncResult = {
  ok: boolean
  storage: 'supabase' | 'disabled'
  message: string
}

export async function syncUserProfile(
  clerkUserId: string,
  user: ClerkUserLike,
): Promise<ProfileSyncResult> {
  const supabase = getSupabaseAdmin()

  if (!supabase) {
    return {
      ok: false,
      storage: 'disabled',
      message: 'Supabase is not configured yet. Add env values to enable durable user storage.',
    }
  }

  const primaryEmail =
    user.emailAddresses?.find(email => email.id === user.primaryEmailAddressId)?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    null

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || null

  const { error } = await supabase
    .from('app_users')
    .upsert(
      {
        clerk_user_id: clerkUserId,
        email: primaryEmail,
        name: fullName,
        avatar_url: user.imageUrl || null,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: 'clerk_user_id' },
    )

  if (error) {
    return {
      ok: false,
      storage: 'supabase',
      message: `Supabase profile sync failed: ${error.message}`,
    }
  }

  return {
    ok: true,
    storage: 'supabase',
    message: 'Profile synced to Supabase.',
  }
}
