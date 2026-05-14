import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import TradingMissionDesk from '@/components/TradingMissionDesk'
import { dailyTradingDesk } from '@/lib/trading-desk'
import { syncUserProfile } from '@/lib/users'
import { isClerkFullyConfigured } from '@/lib/clerk-config'

export const dynamic = 'force-dynamic'

const clerkConfigured = isClerkFullyConfigured()

export default async function DashboardPage() {
  if (!clerkConfigured) {
    return (
      <TradingMissionDesk
        desk={dailyTradingDesk}
        displayName="demo trader"
        profileSync={{
          ok: false,
          storage: 'disabled',
          message: '本地演示模式：配置 Clerk 和 Supabase 后会启用真实账号记录。',
        }}
      />
    )
  }

  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const user = await currentUser()
  const profileSync = user
    ? await syncUserProfile(userId, user)
    : { ok: false, storage: 'disabled' as const, message: 'Clerk user profile was not available.' }

  const displayName =
    user?.firstName ||
    user?.username ||
    user?.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress ||
    'trader'

  return (
    <TradingMissionDesk
      desk={dailyTradingDesk}
      displayName={displayName}
      profileSync={profileSync}
    />
  )
}
